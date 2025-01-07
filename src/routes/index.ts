import { Express } from "express";
import admin from "./admin";
import AuthRoute from "./AuthRoute";
import QrRoute from "./QrRoute";
import StageRoute from "./StageRoute";

const routes = (app: Express) => {
  app.use(AuthRoute);
  app.use("/admin", admin);
  app.use("/qr", QrRoute);
  app.use("/stage", StageRoute);
};

export default routes;
