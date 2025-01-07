import { enc, lib, SHA256 } from "crypto-js";
import { RequestHandler } from "express";
import cookies from "~/configs/cookies";
import { UserPublicService } from "~/services";

const CookiesMiddleware: RequestHandler = async (req, res, next) => {
  const timestamp = Date.now();
  const salt = lib.WordArray.random(4).toString(enc.Hex);
  const TID: string =
    req.cookies.TID || SHA256(`${timestamp}${salt}`).toString(enc.Hex);
  res.cookie(cookies.TID, TID, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3),
  });

  await UserPublicService.sync(TID);
  res.locals.TID = TID;

  next();
};

export default CookiesMiddleware;
