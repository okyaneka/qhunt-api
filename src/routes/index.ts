import { Express } from "express";
import AuthRoute from "./AuthRoute";
import StageRoute from "./StageRoute";
import QrRoute from "./QrRoute";
import ChallengeRoute from "./ChallengeRoute";

const routes = (app: Express) => {
  app.use(AuthRoute);
  app.use("/stage", StageRoute);
  app.use("/challenge", ChallengeRoute);
  app.use("/qr", QrRoute);
};

export default routes;
