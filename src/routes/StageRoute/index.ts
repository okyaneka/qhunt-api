import { Router } from "express";
import response from "~/helpers/response";
import { AuthMiddleware } from "~/middlewares";
import { Stage } from "~/models";
import {
  StageCreatePayload,
  StageListParamsSchema,
  StageUpdatePayload,
} from "~/validators/StageValidator";

const StageRoute = Router();

StageRoute.use(AuthMiddleware);

StageRoute.get("/list", async (req, res) => {
  const { value: params, error } = StageListParamsSchema.validate(req.query);

  if (error) {
    const validation = error?.details.reduce((car, cur) => {
      return { ...car, [cur.context?.key as string]: cur.message };
    }, {});

    res.status(400).json(response.error({ validation }, "validation error"));
    return;
  }

  const skip = (params.page - 1) * params.limit;
  const list = await Stage.find({
    deletedAt: null,
    name: { $regex: params.search, $options: "i" },
  })
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await Stage.countDocuments({ deletedAt: null });
  const totalPages = Math.ceil(totalItems / params.limit);

  res.json(
    response.success({
      list: list.map((stage) =>
        stage.toJSON({
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

StageRoute.post("/create", (req, res) => {
  const { value, error } = StageCreatePayload.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const validation = error?.details.reduce((car, cur) => {
      return { ...car, [cur.context?.key as string]: cur.message };
    }, {});

    res.status(400).json(response.error({ validation }, "validation error"));
    return;
  }

  const stage = new Stage(value);
  stage.save();

  res.json(response.success(stage.toJSON()));
});

StageRoute.get("/detail/:id", async (req, res) => {
  const id = req.params.id;

  const stage = await Stage.findById(id).catch(() => {});

  if (!stage) {
    res.status(400).json(response.error({}, "item not found"));
    return;
  }

  res.json(response.success(stage.toJSON()));
});

StageRoute.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  const { value, error } = StageUpdatePayload.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const validation = error?.details.reduce((car, cur) => {
      return { ...car, [cur.context?.key as string]: cur.message };
    }, {});

    res.status(400).json(response.error({ validation }, "validation error"));
    return;
  }

  const stage = await Stage.findById(id).catch(() => {});

  if (!stage) {
    res.status(400).json(response.error({}, "item not found"));
    return;
  }

  stage.name = value.name;
  stage.storyline = value.storyline;
  await stage.save();

  res.json(response.success(stage.toJSON()));
});

StageRoute.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const stage = await Stage.findOne({ _id: id, deletedAt: null }).catch(
    () => {}
  );

  if (!stage) {
    res.status(400).json(response.error({}, "item not found"));
    return;
  }

  await stage.updateOne({ deletedAt: new Date() });

  res.json(response.success(null, "item deleted"));
});

export default StageRoute;
