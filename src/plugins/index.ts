import cookieParser from "cookie-parser";
import { Express, json } from "express";
import { CookiesMiddleware } from "~/middlewares";

const plugins = (app: Express) => {
  app.use(json());
  app.use(cookieParser());
  app.use(CookiesMiddleware);
};

export default plugins;
