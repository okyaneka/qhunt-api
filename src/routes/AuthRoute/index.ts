import { Router } from "express";
import { response } from "qhunt-lib/helpers";
import { AuthMiddleware } from "~/middlewares";
import ValidationMiddleware from "~/middlewares/ValidationMiddleware";
import { UserPayloadValidator } from "qhunt-lib/validators/UserValidator";
import { UserService } from "qhunt-lib/services";
import cookies from "~/configs/cookies";
import { env } from "~/configs";

const AuthRoute = Router();

AuthRoute.get("/profile", AuthMiddleware, async (req, res, next) => {
  const auth = res.locals.user;

  const user = await UserService.detail(auth?.id as string).catch(
    (err: Error) => err
  );

  if (user instanceof Error) return next(user);

  res.json(response.success(user));
});

AuthRoute.post(
  "/login",
  ValidationMiddleware({ body: UserPayloadValidator }),
  async (req, res) => {
    const { value } = UserPayloadValidator.validate(req.body);

    const data = await UserService.login(value, env.JWT_SECRET).catch(
      (err) => err
    );

    if (data instanceof Error) {
      res.status(400).json(response.error({}, data.message));
      return;
    }

    const { TID, ...user } = data;

    res.cookie(cookies.TID, TID, cookies.options);

    res.json(response.success(user));
  }
);

AuthRoute.post(
  "/register",
  ValidationMiddleware({ body: UserPayloadValidator }),
  async (req, res) => {
    const { value } = UserPayloadValidator.validate(req.body);

    const user = await UserService.register(value, res.locals.TID).catch(
      (err) => err
    );

    if (user instanceof Error) {
      res.status(400).json(response.error({}, user.message));
      return;
    }

    res.json(response.success({}, "register success"));
  }
);

export default AuthRoute;
