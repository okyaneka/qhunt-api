import { response } from "qhunt-lib/helpers";
import { Router } from "express";
import { AuthMiddleware, ValidationMiddleware } from "~/middlewares";
import { ChallengeService } from "qhunt-lib/services";
import {
  ChallengeListParamsValidator,
  ChallengePayloadValidator,
} from "qhunt-lib/validators/ChallengeValidator";
import TriviaRoute from "./TriviaRoute";
import PhotoHuntRoute from "./PhotoHuntRoute";

const path = {
  list: "/list",
  create: "/create",
  detail: "/:id/detail",
  update: "/:id/update",
  delete: "/:id/delete",
  trivia: "/:id/trivia",
  photoHunt: "/:id/photohunt",
} as const;

const ChallengeRoute = Router();

ChallengeRoute.use(AuthMiddleware);

ChallengeRoute.use(path.trivia, TriviaRoute);
ChallengeRoute.use(path.photoHunt, PhotoHuntRoute);

ChallengeRoute.get(
  path.list,
  ValidationMiddleware({ query: ChallengeListParamsValidator }),
  async (req, res, next) => {
    const params = await ChallengeListParamsValidator.validateAsync(req.query);

    const data = await ChallengeService.list(params).catch((err) => err);

    if (data instanceof Error) return next(data);

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
