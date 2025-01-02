import { NextFunction, Request, RequestHandler, Response } from "express";
import response from "~/helpers/response";
import { decode, verify } from "jsonwebtoken";
import { ENV } from "~/configs";
import UserService from "~/services/UserService";

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

  verify(token, ENV.JWT_SECRET, (err) => {
    if (err) {
      res.status(401).json(response.error({}, err.message, 401));
      return;
    }
  });

  const { id } = decode(token) as { id: string };
  const user = await UserService.detail(id);
  if (!user || user instanceof Error) {
    res.status(401).json(response.error({}, "invalid auth", 401));
    return;
  }

  res.locals.user = { id: user._id, role: user.role };

  next();
};

export default AuthMiddleware;
