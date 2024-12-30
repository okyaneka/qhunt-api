import { Express } from "express";
import AuthRoute from "./AuthRoute";
import StageRoute from "./StageRoute";
import QrRoute from "./QrRoute";

const routes = (app: Express) => {
  app.use(AuthRoute);
  app.use("/stage", StageRoute);
  app.use("/qr", QrRoute);
};

export default routes;
