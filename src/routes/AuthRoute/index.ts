import { Router } from "express";
import response from "~/helpers/response";
import jwt from "jsonwebtoken";
import { AuthMiddleware } from "~/middlewares";
import User from "~/models/User";
import ValidationMiddleware from "~/middlewares/ValidationMiddleware";
import { UserPayloadValidator } from "~/validators/UserValidator";
import UserService from "~/services/UserService";

const AuthRoute = Router();

AuthRoute.get("/profile", AuthMiddleware, async (req, res) => {
  const auth = res.locals.user;

  const user = await UserService.detail(auth?.id as string);

  if (!user || user instanceof Error) {
    res.status(401).json(response.error({}, "unauthorized", 401));
    return;
  }

  res.json(response.success(user.toObject()));
});

AuthRoute.post(
  "/login",
  ValidationMiddleware({ body: UserPayloadValidator }),
  async (req, res) => {
    const { value } = UserPayloadValidator.validate(req.body);

    const data = await UserService.login(value);

    if (data instanceof Error) {
      res.status(400).json(response.error({}, data.message));
      return;
    }

    res.json(response.success(data));
  }
);

AuthRoute.post(
  "/register",
  ValidationMiddleware({ body: UserPayloadValidator }),
  async (req, res) => {
    const { value } = UserPayloadValidator.validate(req.body);

    const user = await UserService.register(value);

    if (user instanceof Error) {
      res.status(400).json(response.error({}, user.message));
      return;
    }

    res.json(response.success({}, "register success"));
  }
);

export default AuthRoute;
