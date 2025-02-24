import { Request, Router } from "express";
import { response } from "qhunt-lib/helpers";
import { PhotoHuntService } from "qhunt-lib/services";
import { ValidationMiddleware } from "~/middlewares";
import { PhotoHuntPayloadValidator } from "~/validators/photo-hunt";

type Params = {
  id: string;
};

const path = { details: "/details", sync: "/sync" } as const;

const PhotoHuntRoute = Router({ mergeParams: true });

PhotoHuntRoute.get(path.details, async (req: Request<Params>, res, next) => {
  const id = req.params.id;

  const data = await PhotoHuntService.details(id).catch((err) => err);

  if (data instanceof Error) return next(data);

  res.json(response.success({ items: data, totalItem: data.length }));
});

PhotoHuntRoute.put(
  path.sync,
  ValidationMiddleware({ body: PhotoHuntPayloadValidator }),
  async (req: Request<Params>, res, next) => {
    const id = req.params.id;

    const payload = await PhotoHuntPayloadValidator.validateAsync(req.body);

    const data = await PhotoHuntService.sync(id, payload).catch((err) => err);

    if (data instanceof Error) return next(data);

    res.json(response.success({ items: data, totalItem: data.length }));
  }
);

export default PhotoHuntRoute;
