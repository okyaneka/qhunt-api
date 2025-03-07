import { Router } from "express";
import { S3Foreign, S3Payload } from "qhunt-lib";
import {
  S3ServiceDelete,
  S3ServiceGet,
  S3ServiceSet,
} from "qhunt-lib/services/s3-service";
import sharp from "sharp";
import { handler } from "~/helpers";
import { ValidationMiddleware } from "~/middlewares";
import uploadFile from "~/plugins/uploadFile";
import { MediaDeletePayloadValidator } from "~/validators/media";

const path = {
  upload: "/upload",
  get: "/:key",
  delete: "/delete",
} as const;

const MediaRoute = Router();

MediaRoute.post(
  path.upload,
  uploadFile.array("files"),
  handler(async (req, res) => {
    const auth = res.locals.user;
    const files = req.files as Express.Multer.File[];

    if (!files) throw new Error("files is required");

    const { width, height, path } = req.body;

    const items = await Promise.all(
      files.map(async (file) => {
        const metadata = await sharp(file.buffer).metadata();
        const processedBuffer = await sharp(file.buffer)
          .resize({
            width:
              metadata.width && width
                ? Math.min(Number(width), metadata.width)
                : width,
            height:
              metadata.height && height
                ? Math.min(Number(height), metadata.height)
                : height,
            fit: "inside",
          })
          .toFormat(metadata.format || "jpeg")
          // .jpeg({ quality: 70 })
          .toBuffer();

        const payload: S3Payload = {
          buffer: processedBuffer,
          filename: (path ? `${path}/` : "") + file.originalname,
          mimetype: "image/jpeg",
        };

        return await S3ServiceSet(payload);
      })
    );

    return items.map<S3Foreign>((item) => ({
      fileName: item.fileName,
      fileSize: item.fileSize,
      fileUrl: item.fileUrl,
    }));
  })
);

MediaRoute.get(
  path.get,
  handler(async (req, res) => {
    const { key } = req.params;
    return await S3ServiceGet(key);
  })
);

MediaRoute.post(
  path.delete,
  ValidationMiddleware({ body: MediaDeletePayloadValidator }),
  handler(async (req, res) => {
    const { keys } = await MediaDeletePayloadValidator.validateAsync(req.body);
    const results = await Promise.all(
      keys.map(async (key) => {
        return await S3ServiceDelete(key);
      })
    );
    return results;
  })
);

export default MediaRoute;
