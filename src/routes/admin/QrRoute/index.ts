import { Router } from "express";
import { QrService } from "qhunt-lib/services";
import { response } from "qhunt-lib/helpers";
import {
  QrDeleteBulkPayloadValidator,
  QrGeneratePayloadValidator,
  QrListParamsValidator,
  QrUpdatePayloadValidator,
} from "qhunt-lib/validators/QrValidator";
import { AuthMiddleware } from "~/middlewares";
import ValidationMiddleware from "~/middlewares/ValidationMiddleware";

const path = {
  list: "/list",
  generate: "/generate",
  detail: "/detail/:id",
  update: "/update/:id",
  delete: "/delete/:id",
  deleteBulk: "/delete/bulk",
} as const;

const QrRoute = Router();

QrRoute.use(AuthMiddleware);

QrRoute.get(
  path.list,
  ValidationMiddleware({ query: QrListParamsValidator }),
  async (req, res) => {
    const { value } = QrListParamsValidator.validate(req.query);
    const data = await QrService.list(value);

    res.json(response.success(data));
  }
);

QrRoute.post(
  path.generate,
  ValidationMiddleware({ body: QrGeneratePayloadValidator }),
  async (req, res) => {
    const { value } = QrGeneratePayloadValidator.validate(req.body);

    const items = await QrService.generate(value.amount);

    res.json(response.success(`${items.length} QR generated`));
  }
);

QrRoute.get(path.detail, async (req, res) => {
  const id = req.params.id;

  const item = await QrService.detail(id).catch((err: Error) => err);

  if (item instanceof Error) {
    res.status(400).json(response.error({}, item.message));
    return;
  }

  res.json(response.success(item));
});

QrRoute.put(
  path.update,
  ValidationMiddleware({ body: QrUpdatePayloadValidator }),
  async (req, res) => {
    const id = req.params.id;

    const { value } = QrUpdatePayloadValidator.validate(req.body);

    const item = await QrService.update(id, value).catch((err: Error) => err);
    if (item instanceof Error) {
      res.status(400).json(response.error({}, item.message));
      return;
    }

    res.json(response.success(item));
  }
);

QrRoute.delete(path.delete, async (req, res) => {
  const id = req.params.id;

  const item = await QrService.delete(id).catch((err: Error) => err);
  if (item instanceof Error) {
    res.status(400).json(response.error({}, item.message));
    return;
  }

  res.json(response.success({}, "item deleted"));
});

QrRoute.post(
  path.deleteBulk,
  ValidationMiddleware({ body: QrDeleteBulkPayloadValidator }),
  async (req, res) => {
    const { value } = QrDeleteBulkPayloadValidator.validate(req.body);

    const items = await QrService.deleteMany(value.ids).catch(
      (err: Error) => err
    );

    if (items instanceof Error) {
      res.status(400).json(response.error({}, items.message));
      return;
    }

    res.json(response.success({}, `${items.modifiedCount} items deleted`));
  }
);

export default QrRoute;
