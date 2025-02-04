import { Router } from "express";
import { response } from "qhunt-lib/helpers";
import { ValidationMiddleware } from "~/middlewares";
import { UserStageService } from "qhunt-lib/services";
import { UserStageListParamsValidator } from "qhunt-lib/validators/user-stage";

const path = { list: "/list", detail: "/:id/detail" } as const;

const StageRoute = Router();

StageRoute.get(
  path.list,
  ValidationMiddleware({ query: UserStageListParamsValidator }),
  async (req, res) => {
    const value = await UserStageListParamsValidator.validateAsync(req.body);

    const data = await UserStageService.list(value, res.locals.TID as string);

    res.json(response.success(data));
  }
);

StageRoute.get(path.detail, async (req, res, next) => {
  const id = req.params.id;

  const data = await UserStageService.detail(
    id,
    res.locals.TID as string
  ).catch((err: Error) => err);

  if (data instanceof Error) return next(data);

  res.json(response.success(data));
});

export default StageRoute;
