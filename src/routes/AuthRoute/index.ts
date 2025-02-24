import { Router } from "express";
import { response } from "qhunt-lib/helpers";
import { AuthMiddleware } from "~/middlewares";
import ValidationMiddleware from "~/middlewares/ValidationMiddleware";
import { UserPayloadValidator } from "~/validators/user";
import { UserPublicService, UserService } from "qhunt-lib/services";
import cookies from "~/configs/cookies";
import { env } from "~/configs";
import { handler } from "~/helpers";
import redis from "~/plugins/redis";
import { UserPublicPayloadValidator } from "~/validators/user-public";

const path = {
  me: "/me",
  profile: "/profile",
  edit: "/profile/edit",
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

AuthRoute.post(
  path.login,
  ValidationMiddleware({ body: UserPayloadValidator }),
  async (req, res) => {
    const value = await UserPayloadValidator.validateAsync(req.body);

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
  async (req, res, next) => {
    const { value } = UserPayloadValidator.validate(req.body);

    const userData = await UserService.register(
      value,
      String(res.locals.TID)
    ).catch((err) => err);

    if (userData instanceof Error) {
      res.clearCookie(cookies.TOKEN);
      next(userData);
      return;
    }

    const data = await UserService.login(value, env.JWT_SECRET).catch(
      (err) => err
    );

    if (data instanceof Error) {
      res.clearCookie(cookies.TOKEN);
      next(data);
      return;
    }

    const { TID, ...user } = data;

    redis().pub("update-user", userData);

    res.cookie(cookies.TOKEN, data.token, cookies.options);

    res.json(response.success(user, "register success"));
  }
);

AuthRoute.get(path.profile, AuthMiddleware, async (req, res, next) => {
  const auth = res.locals.user;

  const user = await UserService.detail(auth?.id as string).catch(
    (err: Error) => err
  );

  if (user instanceof Error) return next(user);

  res.json(response.success(user));
});

AuthRoute.put(
  path.edit,
  AuthMiddleware,
  ValidationMiddleware({ body: UserPublicPayloadValidator }),
  handler(async (req, res) => {
    const payload = await UserPublicPayloadValidator.validateAsync(req.body);
    const auth = res.locals.user;

    return await UserService.update(auth?.id, payload);
  })
);

export default AuthRoute;
