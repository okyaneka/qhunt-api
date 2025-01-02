import { Router } from "express";
import QrService from "~/services/QrService";
import response from "~/helpers/response";
import {
  QrDeleteBulkPayloadValidator,
  QrGeneratePayloadValidator,
  QrListQueryValidator,
  QrUpdatePayloadValidator,
} from "~/validators/QrValidator";
import { AuthMiddleware } from "~/middlewares";
import ValidationMiddleware from "~/middlewares/ValidationMiddleware";

const path = {
  public: "/public/:code",
  list: "/list",
  generate: "/generate",
  detail: "/detail/:id",
  update: "/update/:id",
  delete: "/delete/:id",
  deleteBulk: "/delete/bulk",
} as const;

const QrRoute = Router();

QrRoute.get(path.public, async (req, res) => {
  const code = req.params.code;

  const item = await QrService.detailPublic(code);

  if (!item) {
    res.status(400).json(response.error({}, "item not found"));
    return;
  }

  res.json(response.success(item));
});

QrRoute.use(AuthMiddleware);

QrRoute.get(
  path.list,
  ValidationMiddleware({ query: QrListQueryValidator }),
  async (req, res) => {
    const { value } = QrListQueryValidator.validate(req.query);
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

  const item = await QrService.detail(id);

  if (!item) {
    res.status(400).json(response.error({}, "item not found"));
    return;
  }

  res.json(response.success(item.toJSON()));
});

QrRoute.put(
  path.update,
  ValidationMiddleware({ body: QrUpdatePayloadValidator }),
  async (req, res) => {
    const id = req.params.id;

    const { value } = QrUpdatePayloadValidator.validate(req.body);

    const item = await QrService.update(id, value).catch(() => {});
    if (!item) {
      res.status(400).json(response.error({}, "item not found"));
      return;
    }

    res.json(response.success(item?.toJSON()));
  }
);

QrRoute.delete(path.delete, async (req, res) => {
  const id = req.params.id;

  const item = await QrService.delete(id);
  if (!item) {
    res.status(400).json(response.error({}, "item not found"));
    return;
  }

  res.json(response.success(null, "item deleted"));
});

QrRoute.post(
  path.deleteBulk,
  ValidationMiddleware({ body: QrDeleteBulkPayloadValidator }),
  async (req, res) => {
    const { value } = QrDeleteBulkPayloadValidator.validate(req.body);

    const items = await QrService.deleteMany(value.ids);

    if (!items || items.modifiedCount == 0) {
      res.status(400).json(response.error({}, "items not found"));
      return;
    }

    res.json(response.success(null, `${items.modifiedCount} items deleted`));
  }
);

export default QrRoute;
