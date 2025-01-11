import cookies from "~/configs/cookies";
import { RequestHandler } from "express";
import { UserPublicService } from "qhunt-lib/services";

const CookiesMiddleware: RequestHandler = async (req, res, next) => {
  const TID = req.cookies[cookies.TID];
  if (TID) {
    const user = await UserPublicService.verify(TID).catch(() => null);
    if (user) return next();
    res.clearCookie(cookies.TID);
  }

  const user = await UserPublicService.setup();
  res.cookie(cookies.TID, user.code);
  res.locals.TID = user.code;

  next();
};

export default CookiesMiddleware;
