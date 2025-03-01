import { Router } from "express";
import { response } from "qhunt-lib/helpers";
import { AuthMiddleware } from "~/middlewares";
import ValidationMiddleware from "~/middlewares/ValidationMiddleware";
import {
  UserLoginPayloadValidator,
  UserPayloadValidator,
} from "~/validators/user";
import { UserPublicService, UserService } from "qhunt-lib/services";
import cookies, { getCookiesOptions } from "~/configs/cookies";
import { env } from "~/configs";
import { handler } from "~/helpers";
import { UserPublicPayloadValidator } from "~/validators/user-public";
import uploadFile from "~/plugins/uploadFile";
import sharp from "sharp";
import { S3Payload } from "qhunt-lib";

const path = {
  me: "/me",
  profile: "/profile",
  edit: "/profile/edit",
  photo: "/profile/photo",
  login: "/login",
  register: "/register",
  google: "/google-sign",
  logout: "/logout",
} as const;

const AuthRoute = Router();

AuthRoute.get(
  path.me,
  handler(async (req, res) => {
    const TID = res.locals.TID;
    if (!TID) throw new Error("token invalid");

    const user = await UserPublicService.verify(TID);

    return user;
  })
);

AuthRoute.post(
  path.login,
  ValidationMiddleware({ body: UserLoginPayloadValidator }),
  handler(async (req, res) => {
    const value = await UserLoginPayloadValidator.validateAsync(req.body);

    const data = await UserService.login(value, "email", env.JWT_SECRET);

    const { TID, ...user } = data;

    res.cookie(cookies.TID_API, TID, getCookiesOptions());
    res.cookie(cookies.TID_SOCKET, TID, getCookiesOptions());
    res.cookie(cookies.TOKEN, data.token, getCookiesOptions());

    return user;
  })
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
      res.cookie(cookies.TOKEN, getCookiesOptions(true));
      return next(userData);
    }

    const data = await UserService.login(value, "email", env.JWT_SECRET).catch(
      (err) => err
    );

    if (data instanceof Error) {
      res.cookie(cookies.TOKEN, getCookiesOptions(true));
      return next(data);
    }

    const { TID, ...user } = data;

    res.cookie(cookies.TOKEN, data.token, getCookiesOptions());

    res.json(response.success(user, "register success"));
  }
);

AuthRoute.post(
  path.google,
  handler(async (req, res) => {
    const userSign = await UserService.googleSign(
      req.body,
      String(res.locals.TID)
    );

    if (!userSign) throw new Error("user.failed_register");

    const data = await UserService.login(
      { email: userSign.email, password: null },
      "google",
      env.JWT_SECRET
    );

    const { TID, ...user } = data;

    res.cookie(cookies.TOKEN, data.token, getCookiesOptions());

    return user;
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

AuthRoute.put(
  path.edit,
  AuthMiddleware,
  ValidationMiddleware({ body: UserPublicPayloadValidator }),
  handler(async (req, res) => {
    const payload = await UserPublicPayloadValidator.validateAsync(req.body);
    const auth = res.locals.user;
    const userData = await UserService.update(auth?.id, payload);
    return userData;
  })
);

AuthRoute.put(
  path.photo,
  AuthMiddleware,
  uploadFile.single("file"),
  handler(async (req, res) => {
    const auth = res.locals.user;
    const file = req.file;

    if (!file) throw new Error("file is required");

    const processedBuffer = await sharp(file.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .jpeg({ quality: 70 })
      .toBuffer();

    const payload: S3Payload = {
      buffer: processedBuffer,
      filename: file.originalname.replace(/\.\w+$/, ".jpg"),
      mimetype: "image/jpeg",
    };

    return await UserService.updatePhoto(auth?.id, payload);
  })
);

AuthRoute.post(
  path.logout,
  AuthMiddleware,
  handler(async (req, res) => {
    res.clearCookie(cookies.TID_API, getCookiesOptions(true));
    res.clearCookie(cookies.TID_SOCKET, getCookiesOptions(true));
    res.clearCookie(cookies.TOKEN, getCookiesOptions(true));

    return {};
  })
);

export default AuthRoute;
