import { Express } from "express";
import LogMiddleware from "./LogMiddleware";
import ErrorMiddleware from "./ErrorMiddleware";
import AuthMiddleware from "./AuthMiddleware";

const middleware = (app: Express) => {
  app.use(ErrorMiddleware);
  app.use(LogMiddleware);
};

export { LogMiddleware, ErrorMiddleware, AuthMiddleware };

export default middleware;
