import { Router } from "express";
import { response } from "qhunt-lib/helpers";
import { AuthMiddleware } from "~/middlewares";
import ValidationMiddleware from "~/middlewares/ValidationMiddleware";
import { UserPayloadValidator } from "qhunt-lib/validators/user";
import { UserPublicService, UserService } from "qhunt-lib/services";
import cookies from "~/configs/cookies";
import { env } from "~/configs";
import { handler } from "~/helpers";

const path = {
  me: "/me",
  profile: "/profile",
  login: "/login",
  register: "/register",
} as const;

const AuthRoute = Router();

AuthRoute.get(
  path.me,
  handler(async (req, res, next) => {
    const TID = res.locals.TID;
    if (!TID) throw new Error("token invalid");

    const data = await UserPublicService.verify(TID);

    res.json(response.success(data));
  })
);

AuthRoute.get(path.profile, AuthMiddleware, async (req, res, next) => {
  const auth = res.locals.user;

  const user = await UserService.detail(auth?.id as string).catch(
    (err: Error) => err
  );

  if (user instanceof Error) return next(user);

  res.json(response.success(user));
});

AuthRoute.post(
  path.login,
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

    res.cookie(cookies.TID_API, TID, cookies.options);
    res.cookie(cookies.TID_SOCKET, TID, cookies.options);

    res.json(response.success(user));
  }
);

AuthRoute.post(
  path.register,
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
