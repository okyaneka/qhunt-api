import { NextFunction, Request, RequestHandler, Response } from "express";
import { response } from "qhunt-lib/helpers";
import { decode, verify } from "jsonwebtoken";
import { cookies, env } from "~/configs";
import { UserService } from "qhunt-lib/services";

const AuthMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve()
    .then(async () => {
      const token = req.cookies[cookies.TOKEN] as string;

      verify(token, env.JWT_SECRET);

      const { id } = decode(token) as { id: string };
      const user = await UserService.detail(id);

      res.locals.user = { id: user.id, role: user.role };

      next();
    })
    .catch((err) => {
      res.clearCookie(cookies.TOKEN);
      res.locals.status = 401;

      next(err);
    });
};

export default AuthMiddleware;
