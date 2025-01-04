import response from "~/helpers/response";
import { Router } from "express";
import { AuthMiddleware, ValidationMiddleware } from "~/middlewares";
import ChallengeService from "~/services/ChallengeService";
import TriviaService from "~/services/TriviaService";
import { ChallengeType } from "~/models/Challenge";
import {
  ChallengeListParamsValidator,
  ChallengePayloadValidator,
} from "~/validators/ChallengeValidator";
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

ChallengeRoute.get(
  path.list,
  ValidationMiddleware({ query: ChallengeListParamsValidator }),
  async (req, res) => {
    const { value: params } = ChallengeListParamsValidator.validate(req.query);

    const data = await ChallengeService.list(params);

    res.json(response.success(data));
  }
);

ChallengeRoute.post(
  path.create,
  ValidationMiddleware({ body: ChallengePayloadValidator }),
  async (req, res) => {
    const { value } = ChallengePayloadValidator.validate(req.body);

    const item = await ChallengeService.create(value).catch(
      (err: Error) => err
    );

    if (item instanceof Error) {
      res.status(400).json(response.error(item.message));
      return;
    }

    res.json(response.success(item));
  }
);

ChallengeRoute.get(path.detail, async (req, res) => {
  const id = req.params.id;

  const item = await ChallengeService.detail(id).catch((err: Error) => err);
  if (item instanceof Error) {
    res.status(400).json(response.error(item.message));
    return;
  }

  res.json(response.success(item));
});

ChallengeRoute.get(path.detailContent, async (req, res) => {
  const id = req.params.id;

  const item = await ChallengeService.detail(id).catch((err: Error) => err);
  if (item instanceof Error) {
    res.status(400).json(response.error(item.message));
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

ChallengeRoute.put(
  path.update,
  ValidationMiddleware({ body: ChallengePayloadValidator }),
  async (req, res) => {
    const { value } = ChallengePayloadValidator.validate(req.body);

    const id = req.params.id;

    const item = await ChallengeService.update(id, value).catch(
      (err: Error) => err
    );

    if (item instanceof Error) {
      res.status(400).json(response.error(item.message));
      return;
    }

    res.json(response.success(item));
  }
);

ChallengeRoute.put(path.updateContent, async (req, res) => {
  const id = req.params.id;

  const item = await ChallengeService.detail(id);
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

  const item = await ChallengeService.delete(id).catch((err: Error) => err);
  if (item instanceof Error) {
    res.status(400).json(response.error({}, item.message));
    return;
  }

  res.json(response.success("item deleted"));
});

export default ChallengeRoute;
