import cookies from "~/configs/cookies";
import { RequestHandler } from "express";
import { UserPublicService, UserService } from "qhunt-lib/services";
import { UserPublic } from "qhunt-lib";
import { response } from "qhunt-lib/helpers";
import { env } from "~/configs";
import { verify } from "jsonwebtoken";

const CookiesMiddleware: RequestHandler = async (req, res, next) => {
  const TOKEN = req.cookies[cookies.TOKEN];
  const TID = req.cookies[cookies.TID_API];

  let user: UserPublic | null = null;

  if (TOKEN) {
    const decoded = verify(TOKEN, env.JWT_SECRET) as { id: string };
    if (decoded?.id) {
      user = await UserPublicService.verify(decoded.id).catch(() => null);
      if (!user) res.clearCookie(cookies.TOKEN);
      const parentUser = await UserService.detail(decoded.id).catch(() => null);
      if (!parentUser) {
        res.status(401).json(response.error({}, "invalid auth", 401));
        return;
      }
      res.locals.user = { id: parentUser.id, role: parentUser.role };
    }
  } else if (TID) {
    user = await UserPublicService.verify(TID).catch(() => null);
    if (!user || user.user?.id) {
      res.clearCookie(cookies.TID_SOCKET);
      res.clearCookie(cookies.TID_API);
      user = null;
    }
  }

  if (!user) user = await UserPublicService.setup();
  if (!user) {
    res.status(401).json(response.error({}, "invalid public auth", 401));
    return;
  }

  res.cookie(cookies.TID_API, user.code, cookies.options);
  res.cookie(cookies.TID_SOCKET, user.code, cookies.options);
  res.locals.TID = user.code;

  next();
};

export default CookiesMiddleware;
