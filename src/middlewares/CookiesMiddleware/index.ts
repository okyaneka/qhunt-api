import cookies from "~/configs/cookies";
import { RequestHandler } from "express";
import { UserPublicService } from "qhunt-lib/services";
import { UserPublic } from "qhunt-lib";
import { response } from "qhunt-lib/helpers";
import { env } from "~/configs";

const CookiesMiddleware: RequestHandler = async (req, res, next) => {
  const TID = req.cookies[cookies.TID_API];

  let user: UserPublic | null = null;

  if (TID) {
    user = await UserPublicService.verify(TID).catch(() => null);
    if (!user) {
      res.clearCookie(cookies.TID_SOCKET);
      res.clearCookie(cookies.TID_API);
    }
  }

  if (!user) user = await UserPublicService.setup();
  if (!user) {
    res.status(401).json(response.error({}, "invalid public auth", 401));
    return;
  }

  res.cookie(cookies.TID_API, user.code, cookies.options(env.DOMAIN_API));
  res.cookie(cookies.TID_SOCKET, user.code, cookies.options(env.DOMAIN_SOCKET));
  res.locals.TID = user.code;

  next();
};

export default CookiesMiddleware;
