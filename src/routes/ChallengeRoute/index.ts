import { Router } from "express";
import { response } from "qhunt-lib/helpers";
import { ValidationMiddleware } from "~/middlewares";
import {
  UserChallengeService,
  UserTriviaService,
  UserPhotoHuntService,
} from "qhunt-lib/services";
import { UserChallengeParamsValidator } from "qhunt-lib/validators/user-challenge";
import { CHALLENGE_TYPES, ChallengeType } from "qhunt-lib";

const path = {
  list: "/list",
  detail: "/:id/detail",
  // detailContent: "/:id/detail-content",
  details: "/:id/:type",
  submit: "/:id/submit",
} as const;

const ChallengeRoute = Router();

ChallengeRoute.get(
  path.list,
  ValidationMiddleware({ query: UserChallengeParamsValidator }),
  async (req, res, next) => {
    if (!res.locals.TID) return next(new Error("error"));

    const { value } = UserChallengeParamsValidator.validate(req.query);

    const data = await UserChallengeService.list(value, res.locals.TID).catch(
      (err) => err
    );
    if (data instanceof Error) return next(data);

    res.json(response.success(data));
  }
);

ChallengeRoute.get(path.detail, async (req, res, next) => {
  if (!res.locals.TID) return next(new Error("error"));
  const id = req.params.id;

  const data = await UserChallengeService.detail(id, res.locals.TID).catch(
    (err: Error) => err
  );

  if (data instanceof Error) return next(data);

  res.json(response.success(data));
});

ChallengeRoute.get(path.details, async (req, res, next) => {
  if (!res.locals.TID) return next(new Error("error"));
  const id = req.params.id;
  const type = req.params.type as ChallengeType;
  if (!Object.values(CHALLENGE_TYPES).includes(type)) {
    next(new Error("unknown type"));
    return;
  }

  const services = {
    [CHALLENGE_TYPES.PhotoHunt]: UserPhotoHuntService,
    [CHALLENGE_TYPES.Trivia]: UserTriviaService,
  };

  const userChallenge = await UserChallengeService.detail(id, res.locals.TID);
  const data = await services[type]
    .details(userChallenge.contents, res.locals.TID)
    .catch((err: Error) => err);

  if (data instanceof Error) return next(data);

  res.json(response.success(data));
});

export default ChallengeRoute;
