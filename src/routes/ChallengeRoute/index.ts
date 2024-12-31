import response from "~/helpers/response";
import { Router } from "express";
import { AuthMiddleware } from "~/middlewares";
import {
  ChallengeCreatePayloadSchema,
  ChallengeListParamsSchema,
  ChallengeUpdatePayloadSchema,
} from "~/validators/ChallengeValidator";
import Challenge from "~/models/Challenge";
import Stage from "~/models/Stage";

const ChallengeRoute = Router();

ChallengeRoute.use(AuthMiddleware);

ChallengeRoute.get("/list", async (req, res) => {
  const { value: params, error } = ChallengeListParamsSchema.validate(
    req.query
  );

  if (error) {
    const validation = error?.details.reduce((car, cur) => {
      return { ...car, [cur.context?.key as string]: cur.message };
    }, {});

    res.status(400).json(response.error({ validation }, "validation error"));
    return;
  }

  const skip = (params.page - 1) * params.limit;
  const filter: any = { deletedAt: null };
  if (params.stageId) filter["stage.id"] = params.stageId;
  const list = await Challenge.find(filter)
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 });

  const totalItems = await Challenge.countDocuments({ deletedAt: null });
  const totalPages = Math.ceil(totalItems / params.limit);

  res.json(
    response.success({
      list: list.map((item) => item.toJSON()),
      page: params.page,
      totalItems,
      totalPages,
    })
  );
});

ChallengeRoute.post("/create", async (req, res) => {
  const { value, error } = ChallengeCreatePayloadSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const validation = error?.details.reduce((car, cur) => {
      return { ...car, [cur.context?.key as string]: cur.message };
    }, {});

    res.status(400).json(response.error({ validation }, "validation error"));
    return;
  }

  const stage = await Stage.findOne({ _id: value.stageId, deletedAt: null });

  if (!stage) {
    res.status(400).json(response.error("stage not found"));
    return;
  }

  const item = new Challenge({
    name: value.name,
    storyline: value.storyline,
    stage: {
      id: stage.id,
      name: stage.name,
    },
  });
  await item.save();

  res.json(response.success(item));
});

ChallengeRoute.get("/detail/:id", async (req, res) => {
  const id = req.params.id;

  const item = await Challenge.findOne({ _id: id, deletedAt: null });
  if (!item) {
    res.status(400).json(response.error("item not found"));
    return;
  }

  res.json(response.success(item.toJSON()));
});

ChallengeRoute.put("/update/:id", async (req, res) => {
  const { value, error } = ChallengeUpdatePayloadSchema.validate(req.body);

  if (error) {
    const validation = error?.details.reduce((car, cur) => {
      return { ...car, [cur.context?.key as string]: cur.message };
    }, {});

    res.status(400).json(response.error({ validation }, "validation error"));
    return;
  }

  const id = req.params.id;

  const item = await Challenge.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: value },
    { new: true }
  );
  if (!item) {
    res.status(400).json(response.error("item not found"));
    return;
  }

  res.json(response.success(item.toJSON()));
});

ChallengeRoute.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const item = await Challenge.updateOne(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: new Date() } }
  ).catch(() => {});

  if (!item || !item.matchedCount) {
    res.status(400).json(response.error({}, "item not found"));
    return;
  }

  res.json(response.success("item deleted"));
});

export default ChallengeRoute;
