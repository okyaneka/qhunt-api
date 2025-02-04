import { Request, Router } from "express";
import { response } from "qhunt-lib/helpers";
import { TriviaService } from "qhunt-lib/services";
import { ValidationMiddleware } from "~/middlewares";
import { TriviaItemsPayloadValidator } from "qhunt-lib/validators/trivia";

type Params = {
  id: string;
};

const path = { details: "/details", sync: "/sync" } as const;

const TriviaRoute = Router({ mergeParams: true });

TriviaRoute.get(path.details, async (req: Request<Params>, res, next) => {
  const id = req.params.id;

  const data = await TriviaService.details(id).catch((err) => err);

  if (data instanceof Error) return next(data);

  res.json(response.success({ items: data, totalItem: data.length }));
});

TriviaRoute.put(
  path.sync,
  ValidationMiddleware({ body: TriviaItemsPayloadValidator }),
  async (req: Request<Params>, res, next) => {
    const id = req.params.id;

    const payload = await TriviaItemsPayloadValidator.validateAsync(req.body);

    const data = await TriviaService.sync(id, payload).catch((err) => err);

    if (data instanceof Error) return next(data);

    res.json(response.success({ items: data, totalItem: data.length }));
  }
);

export default TriviaRoute;
