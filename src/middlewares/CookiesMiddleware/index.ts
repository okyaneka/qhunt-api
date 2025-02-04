import cookies from "~/configs/cookies";
import { RequestHandler } from "express";
import { UserPublicService } from "qhunt-lib/services";
import { UserPublic } from "qhunt-lib";
import { response } from "qhunt-lib/helpers";

const CookiesMiddleware: RequestHandler = async (req, res, next) => {
  const TID = req.cookies[cookies.TID];

  let user: UserPublic | null = null;

  if (TID) {
    user = await UserPublicService.verify(TID).catch(() => null);
    if (!user) res.clearCookie(cookies.TID);
  }

  if (!user) user = await UserPublicService.setup();
  if (!user) {
    res.status(401).json(response.error({}, "invalid public auth", 403));
    return;
  }

  res.cookie(cookies.TID, user.code, cookies.options);
  res.locals.TID = user.code;

  next();
};

export default CookiesMiddleware;
