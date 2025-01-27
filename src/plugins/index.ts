import cookieParser from "cookie-parser";
import { Express, json } from "express";
import { CookiesMiddleware } from "~/middlewares";
import cors from "cors";
import limiter from "./limiter";
import mongoose from "./mongoose";
import { env } from "~/configs";

const plugins = (app: Express) => {
  mongoose();
  app.use(limiter());
  app.use(json());
  app.use(cookieParser());
  app.use(CookiesMiddleware);
  app.use(
    cors({
      origin: env.APP_URL,
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
};

export default plugins;
