import { Router } from "express";
import { response } from "qhunt-lib/helpers";
import { AuthMiddleware, ValidationMiddleware } from "~/middlewares";
import { StageService } from "qhunt-lib/services";
import {
  StagePayloadValidator,
  StageListParamsValidator,
} from "~/validators/stage";

const path = {
  list: "/list",
  create: "/create",
  detail: "/:id/detail",
  update: "/:id/update",
  delete: "/:id/delete",
} as const;

const StageRoute = Router();

StageRoute.use(AuthMiddleware);

StageRoute.get(
  path.list,
  ValidationMiddleware({ query: StageListParamsValidator }),
  async (req, res) => {
    const { value: params } = StageListParamsValidator.validate(req.query);

    const data = await StageService.list(params);

    res.json(response.success(data));
  }
);

StageRoute.post(
  path.create,
  ValidationMiddleware({ body: StagePayloadValidator }),
  async (req, res, next) => {
    const { value } = StagePayloadValidator.validate(req.body);

    const item = await StageService.create(value).catch((err: Error) => err);
    if (item instanceof Error) return next(item);

    res.json(response.success(item));
  }
);

StageRoute.get(path.detail, async (req, res) => {
  const id = req.params.id;

  const item = await StageService.detail(id).catch((err: Error) => err);

  if (item instanceof Error) {
    res.status(400).json(response.error({}, "item not found"));
    return;
  }

  res.json(response.success(item));
});

StageRoute.put(
  path.update,
  ValidationMiddleware({ body: StagePayloadValidator }),
  async (req, res, next) => {
    const { value } = StagePayloadValidator.validate(req.body);
    const id = req.params.id;

    const item = await StageService.update(id, value).catch(
      (err: Error) => err
    );

    if (item instanceof Error) return next(item);

    res.json(response.success(item));
  }
);

StageRoute.delete(path.delete, async (req, res) => {
  const id = req.params.id;

  const item = await StageService.delete(id).catch((err: Error) => err);

  if (item instanceof Error) {
    res.status(400).json(response.error({}, item.message));
    return;
  }

  res.json(response.success(null, "item deleted"));
});

export default StageRoute;
