import cookieParser from "cookie-parser";
import { Express, json } from "express";
import { CookiesMiddleware } from "~/middlewares";
import limiter from "./limiter";
import mongoose from "./mongoose";
import cors from "~/configs/cors";
import redis from "./redis";

const plugins = (app: Express) => {
  mongoose();
  redis();
  app.use(limiter());
  app.use(json());
  app.use(cookieParser());
  app.use(cors());
  app.use(CookiesMiddleware);
};

export default plugins;
