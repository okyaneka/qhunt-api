import cookieParser from "cookie-parser";
import { Express, json } from "express";
import { CookiesMiddleware } from "~/middlewares";
import cors from "cors";
import limiter from "./limiter";

const plugins = (app: Express) => {
  app.use(limiter());
  app.use(json());
  app.use(cookieParser());
  app.use(CookiesMiddleware);
  app.use(
    cors({
      origin: /^https?:\/\/localhost:\d+$/,
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
};

export default plugins;
