import { Router } from "express";
import response from "~/helpers/response";
import { AuthMiddleware, ValidationMiddleware } from "~/middlewares";
import StageService from "~/services/StageService";
import {
  StagePayloadValidator,
  StageListParamsValidator,
} from "~/validators/StageValidator";

const path = { list: "/list" } as const;

const StageRoute = Router();

StageRoute.use(AuthMiddleware);

StageRoute.get(
  "/list",
  ValidationMiddleware({ query: StageListParamsValidator }),
  async (req, res) => {
    const { value: params } = StageListParamsValidator.validate(req.query);

    const data = await StageService.list(params);

    res.json(response.success(data));
  }
);

StageRoute.post(
  "/create",
  ValidationMiddleware({ body: StagePayloadValidator }),
  async (req, res) => {
    const { value } = StagePayloadValidator.validate(req.body);

    const item = await StageService.create(value).catch((err: Error) => err);
    if (item instanceof Error) {
      res.json(response.error());
      return;
    }

    res.json(response.success(item));
  }
);

StageRoute.get("/detail/:id", async (req, res) => {
  const id = req.params.id;

  const item = await StageService.detail(id).catch((err: Error) => err);

  if (item instanceof Error) {
    res.status(400).json(response.error({}, "item not found"));
    return;
  }

  res.json(response.success(item));
});

StageRoute.put(
  "/update/:id",
  ValidationMiddleware({ body: StagePayloadValidator }),
  async (req, res) => {
    const { value } = StagePayloadValidator.validate(req.body);
    const id = req.params.id;

    const item = await StageService.update(id, value).catch(
      (err: Error) => err
    );

    if (item instanceof Error) {
      res.status(400).json(response.error({}, item.message));
      return;
    }

    res.json(response.success(item));
  }
);

StageRoute.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const item = await StageService.delete(id).catch((err: Error) => err);

  if (item instanceof Error) {
    res.status(400).json(response.error({}, item.message));
    return;
  }

  res.json(response.success(null, "item deleted"));
});

export default StageRoute;
