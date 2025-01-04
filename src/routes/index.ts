import { Express } from "express";
import AuthRoute from "./AuthRoute";
import admin from "./admin";

const routes = (app: Express) => {
  app.use(AuthRoute);
  app.use("/admin", admin);
};

export default routes;
