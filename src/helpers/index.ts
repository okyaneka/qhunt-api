import { NextFunction, Request, RequestHandler, Response } from "express";
import validator from "./validator";

type OpsHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const handler = (ops: OpsHandler): RequestHandler => {
  return async (req, res, next) => {
    return ops(req, res, next).catch((err) => next(err));
  };
};

export { validator };

const helpers = { validator } as const;

export default helpers;
