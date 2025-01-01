import response from "~/helpers/response";
import { Router } from "express";
import { AuthMiddleware } from "~/middlewares";
import {
  ChallengeCreatePayloadSchema,
  ChallengeListParamsSchema,
  ChallengeUpdatePayloadSchema,
} from "~/validators/ChallengeValidator";
import Challenge, { ChallengeType } from "~/models/Challenge";
import Stage from "~/models/Stage";
import TriviaService from "~/services/TriviaService";
import { TriviaItemsPayloadValidator } from "~/validators/TriviaValidator";

const ChallengeRoute = Router();

ChallengeRoute.use(AuthMiddleware);

const path = {
  list: "/list",
  create: "/create",
  detail: "/detail/:id",
  detailContent: "/detail/:id/content",
  update: "/update/:id",
  updateContent: "/update/:id/content",
  delete: "/delete/:id",
} as const;

ChallengeRoute.get(path.list, async (req, res) => {
  const { value: params, error } = ChallengeListParamsSchema.validate(
    req.query
  );

  if (error) {
    res.status(400).json(response.errorValidation(error));
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

ChallengeRoute.post(path.create, async (req, res) => {
  const { value, error } = ChallengeCreatePayloadSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json(response.errorValidation(error));
    return;
  }

  const stage = await Stage.findOne({ _id: value.stageId, deletedAt: null });

  if (!stage) {
    res.status(400).json(response.error("stage not found"));
    return;
  }

  const item = new Challenge({
    ...value,
    stage: {
      id: stage.id,
      name: stage.name,
    },
  });
  await item.save();

  res.json(response.success(item));
});

ChallengeRoute.get(path.detail, async (req, res) => {
  const id = req.params.id;

  const item = await Challenge.findOne({ _id: id, deletedAt: null });
  if (!item) {
    res.status(400).json(response.error("item not found"));
    return;
  }

  res.json(response.success(item.toJSON()));
});

ChallengeRoute.get(path.detailContent, async (req, res) => {
  const id = req.params.id;

  const item = await Challenge.findOne({ _id: id, deletedAt: null });
  if (!item) {
    res.status(400).json(response.error("item not found"));
    return;
  }

  switch (item.setting.type) {
    case ChallengeType.Trivia:
      const triviaContent = await TriviaService.content(item);
      res.json(response.success(triviaContent));
      return;
    default:
      res.json();
      return;
  }
});

ChallengeRoute.put(path.update, async (req, res) => {
  const { value, error } = ChallengeUpdatePayloadSchema.validate(req.body);

  if (error) {
    res.status(400).json(response.errorValidation(error));
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

ChallengeRoute.put(path.updateContent, async (req, res) => {
  const id = req.params.id;

  const item = await Challenge.findOne({ _id: id, deletedAt: null });
  if (!item) {
    res.status(400).json(response.error("item not found"));
    return;
  }

  switch (item.setting.type) {
    case ChallengeType.Trivia:
      const { value: triviaValue, error: triviaError } =
        TriviaItemsPayloadValidator.validate(req.body, { abortEarly: false });

      if (triviaError) {
        res.status(400).json(response.errorValidation(triviaError));
        return;
      }

      await TriviaService.sync(item, triviaValue.items);
      break;

    default:
      break;
  }

  res.json(response.success("content synced"));
});

ChallengeRoute.delete(path.delete, async (req, res) => {
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
