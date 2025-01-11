import { RequestHandler } from "express";
import { Schema } from "joi";
import { response } from "qhunt-lib/helpers";

type Validators = {
  body?: Schema;
  query?: Schema;
};

const ValidationMiddleware =
  ({ body, query }: Validators): RequestHandler =>
  (req, res, next) => {
    if (query) {
      const { error } = query.validate(req.query, { abortEarly: false });

      if (error) {
        res.status(400).json(response.errorValidation(error));
        return;
      }
    }

    if (body) {
      const { error } = body.validate(req.body, { abortEarly: false });

      if (error) {
        res.status(400).json(response.errorValidation(error));
        return;
      }
    }

    next();
  };

export default ValidationMiddleware;
