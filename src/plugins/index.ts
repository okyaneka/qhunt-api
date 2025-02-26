import cookieParser from "cookie-parser";
import { urlencoded, Express, json } from "express";
import { CookiesMiddleware } from "~/middlewares";
import limiter from "./limiter";
import mongoose from "./mongoose";
import cors from "~/configs/cors";
import "./redis";
import "./s3";

const plugins = (app: Express) => {
  mongoose();
  app.use(urlencoded({ extended: true }));
  app.use(limiter());
  app.use(json());
  app.use(cookieParser());
  app.use(cors());
  app.use(CookiesMiddleware);
};

export default plugins;
