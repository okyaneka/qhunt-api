import { Router } from "express";
import { handler } from "~/helpers";
import { ValidationMiddleware } from "~/middlewares";
import uploadFile from "~/plugins/uploadFile";
import { FeaturePayloadValidator } from "~/validators/feature";
import {
  FeatureCreate,
  FeatureDelete,
  FeatureDetail,
  FeatureList,
  FeatureUpdate,
} from "qhunt-lib/services/feature-service";
import sharp from "sharp";
import { FeaturePayload } from "qhunt-lib";

const path = {
  list: "/list",
  create: "/create",
  detail: "/:id/detail",
  update: "/:id/update",
  delete: "/:id/delete",
} as const;

const getPayload = async (
  payload: Omit<FeaturePayload, "featuredImage">,
  file?: Express.Multer.File
): Promise<FeaturePayload> => {
  const processedBuffer = file
    ? await sharp(file.buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .png({ quality: 80 })
        .toBuffer()
    : null;
  const featuredImage =
    file && processedBuffer
      ? {
          buffer: processedBuffer,
          filename: file.originalname,
          mimetype: file.mimetype,
        }
      : null;

  return { ...payload, featuredImage };
};

const FeatureRoute = Router();

FeatureRoute.get(
  path.list,
  handler(async (req, res) => {
    return FeatureList(req.query);
  })
);

FeatureRoute.post(
  path.create,
  uploadFile.single("featuredImage"),
  ValidationMiddleware({ body: FeaturePayloadValidator }),
  handler(async (req, res) => {
    const body = await FeaturePayloadValidator.validateAsync(req.body);
    const file = req.file;

    const payload = await getPayload(body, file);

    return await FeatureCreate(payload);
  })
);

FeatureRoute.get(
  path.detail,
  handler(async (req, res) => {
    const item = await FeatureDetail(req.params.id);
    return item;
  })
);

FeatureRoute.put(
  path.update,
  uploadFile.single("featuredImage"),
  ValidationMiddleware({ body: FeaturePayloadValidator }),
  handler(async (req, res) => {
    const body = await FeaturePayloadValidator.validateAsync(req.body);
    const file = req.file;

    const payload = await getPayload(body, file);

    return await FeatureUpdate(req.params.id, payload);
  })
);

FeatureRoute.delete(
  path.delete,
  handler(async (req, res) => {
    await FeatureDelete(req.params.id);
    return {};
  })
);

export default FeatureRoute;
