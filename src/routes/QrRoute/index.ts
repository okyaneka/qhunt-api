import { Router } from "express";
import CryptoJS from "crypto-js";
import response from "~/helpers/response";
import {
  QrDeleteBulkPayloadSchema,
  QrGeneratePayloadSchema,
  QrListParamsSchema,
} from "~/validators/QrValidator";
import { AuthMiddleware } from "~/middlewares";
import Qr from "~/models/Qr";

const QrRoute = Router();

QrRoute.use(AuthMiddleware);

QrRoute.get("/list", async (req, res) => {
  const { value: params, error } = QrListParamsSchema.validate(req.query);

  if (error) {
    const validation = error?.details.reduce((car, cur) => {
      return { ...car, [cur.context?.key as string]: cur.message };
    }, {});

    res.status(400).json(response.error({ validation }, "validation error"));
    return;
  }

  const skip = (params.page - 1) * params.limit;
  const filter: any = { deletedAt: null };
  if (params.isUsed != null) filter.isUsed = params.isUsed;
  const list = await Qr.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await Qr.countDocuments({ deletedAt: null });
  const totalPages = Math.ceil(totalItems / params.limit);

  res.json(
    response.success({
      list: list.map((item) =>
        item.toJSON({
          transform: (doc, ret) => {
            const { _id, storyline, deletedAt, ...etc } = ret;
            return { id: _id, ...etc };
          },
        })
      ),
      page: params.page,
      totalItems,
      totalPages,
    })
  );
});

QrRoute.post("/generate", async (req, res) => {
  const { value, error } = QrGeneratePayloadSchema.validate(req.body);

  if (error) {
    const validation = error?.details.reduce((car, cur) => {
      return { ...car, [cur.context?.key as string]: cur.message };
    }, {});

    res.status(400).json(response.error({ validation }, "validation error"));
    return;
  }

  const items = new Array(value.amount).fill({}).map((item, i) => {
    const salt = Math.floor(Math.random() * Math.pow(16, 8))
      .toString(16)
      .padStart(8, "0");
    return {
      code: CryptoJS.SHA256(`${Date.now()}${salt}`).toString(CryptoJS.enc.Hex),
    };
  });

  await Qr.insertMany(items);

  res.json(response.success(`${value.amount} QR generated`));
});

QrRoute.get("/detail/:id", async (req, res) => {
  const id = req.params.id;

  const item = await Qr.findById(id).catch(() => {});

  if (!item) {
    res.status(400).json(response.error({}, "item not found"));
    return;
  }

  res.json(response.success(item.toJSON()));
});

QrRoute.put("/update/:id", async (req, res) => {
  res.json(response.success("soon"));
});

QrRoute.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const item = await Qr.findOne({
    _id: id,
    deletedAt: null,
  }).catch(() => {});

  if (!item) {
    res.status(400).json(response.error({}, "item not found"));
    return;
  }

  await item.updateOne({ deletedAt: new Date() });

  res.json(response.success(null, "item deleted"));
});

QrRoute.post("/delete/bulk", async (req, res) => {
  const {
    value: { ids },
    error,
  } = QrDeleteBulkPayloadSchema.validate(req.body);

  if (error) {
    const validation = error?.details.reduce((car, cur) => {
      return { ...car, [cur.context?.key as string]: cur.message };
    }, {});

    res.status(400).json(response.error({ validation }, "validation error"));
    return;
  }

  const items = await Qr.updateMany(
    {
      _id: { $in: ids },
      deletedAt: null,
    },
    { $set: { deletedAt: new Date() } }
  ).catch(() => {});

  if (!items) {
    res.status(400).json(response.error({}, "items not found"));
    return;
  }

  if (items.modifiedCount == 0) {
    res.status(400).json(response.error({}, "items not found"));
    return;
  }

  res.json(response.success(null, `${items.modifiedCount} items deleted`));
});

export default QrRoute;
