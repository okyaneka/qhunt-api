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
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    res.status(401).json(response.error({}, "unauthorized", 401));
    return;
  }

  const token = bearer?.split(" ")[1];

  verify(token, env.JWT_SECRET, (err) => {
    if (err) {
      res.status(401).json(response.error({}, err.message, 401));
      return;
    }
  });

  const { id } = decode(token) as { id: string };
  const user = await UserService.detail(id).catch((err: Error) => err);
  if (!user || user instanceof Error) {
    res.status(401).json(response.error({}, "invalid auth", 401));
    return;
  }

  res.cookie(cookies.TID, user.meta.code, cookies.options);
  res.locals.TID = user.meta.code;
  res.locals.user = { id: user.id, role: user.role };

  next();
};

export default AuthMiddleware;
