import { Express } from "express";
import admin from "./admin";
import AuthRoute from "./AuthRoute";
import QrRoute from "./QrRoute";

const routes = (app: Express) => {
  app.use(AuthRoute);
  app.use("/admin", admin);
  app.use("/qr", QrRoute);
};

export default routes;
