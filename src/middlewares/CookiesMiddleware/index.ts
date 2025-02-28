import cookies from "~/configs/cookies";
import { RequestHandler, Response } from "express";
import { UserPublicService, UserService } from "qhunt-lib/services";
import { UserPublic } from "qhunt-lib";
import { response } from "qhunt-lib/helpers";
import { env } from "~/configs";
import { verify } from "jsonwebtoken";

const setupUser = async (res: Response, user?: UserPublic | null) => {
  user = user || (await UserPublicService.setup());

  res.cookie(cookies.TID_API, user.code, cookies.options);
  res.cookie(cookies.TID_SOCKET, user.code, cookies.options);
  res.locals.TID = user.code;
};

const CookiesMiddleware: RequestHandler = async (req, res, next) => {
  Promise.resolve()
    .then(async () => {
      const TOKEN = req.cookies[cookies.TOKEN];
      const TID = req.cookies[cookies.TID_API];

      let user: UserPublic | null = null;

      if (TOKEN) {
        const decoded = verify(TOKEN, env.JWT_SECRET) as { id: string };

        if (decoded?.id) {
          user = await UserPublicService.verify(decoded.id);
          const parentUser = await UserService.detail(decoded.id);
          res.locals.user = { id: parentUser.id, role: parentUser.role };
        }
      } else if (TID) {
        user = await UserPublicService.verify(TID);
      }

      await setupUser(res, user);
      next();
    })
    .catch(async (err) => {
      res.clearCookie(cookies.TID_API);
      res.clearCookie(cookies.TID_SOCKET);
      res.clearCookie(cookies.TOKEN);
      res.locals.status = 401;

      next(err);
    });
};

export default CookiesMiddleware;
