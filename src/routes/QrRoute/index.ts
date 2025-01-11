import { Router } from "express";
import { response } from "qhunt-lib/helpers";
import { QrService } from "qhunt-lib/services";

const path = {
  verify: "/verify/:code",
} as const;

const QrRoute = Router();

QrRoute.get(path.verify, async (req, res, next) => {
  const code = req.params.code;

  const item = await QrService.verify(code, res.locals.TID as string).catch(
    (err: Error) => err
  );

  if (item instanceof Error) return next(item);

  res.json(response.success(item));
});

export default QrRoute;
