import { NextFunction, Request, RequestHandler, Response } from "express";
import validator from "./validator";
import { response } from "qhunt-lib/helpers";

type OpsHandler<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;

export const handler = <T>(ops: OpsHandler<T>): RequestHandler => {
  return (req, res, next) => {
    ops(req, res, next)
      .then((data) => {
        res.json(response.success(data));
      })
      .catch((err) => next(err));
  };
};

export { validator };

const helpers = { validator } as const;

export default helpers;
