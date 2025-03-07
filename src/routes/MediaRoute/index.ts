import { Router } from "express";
import { urlToBuffer } from "qhunt-lib/helpers";
import { S3ServiceGet } from "qhunt-lib/services/s3-service";
import sharp from "sharp";
import { handler } from "~/helpers";

const path = { detail: "/:key" } as const;

const MediaRoute = Router();

MediaRoute.get(path.detail, async (req, res, next) => {
  const query = req.query;

  const item = await S3ServiceGet(req.params.key).catch(() => null);

  if (!item) return next(new Error("s3.file_not_found"));

  const { buffer, mimetype } = await urlToBuffer(item.fileUrl);

  const isImage = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ].includes(mimetype);

  const metadata = isImage ? await sharp(buffer).metadata() : undefined;
  const sharped = isImage
    ? await sharp(buffer)
        .resize({
          width: query.width ? Number(query.width) : undefined,
          height: query.height ? Number(query.height) : undefined,
          fit: "inside",
        })
        .toFormat(metadata?.format || "jpeg")
        .toBuffer()
    : buffer;

  res.setHeader("Content-Type", mimetype).send(sharped);
});

export default MediaRoute;
