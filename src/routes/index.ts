import { Express } from "express";
import admin from "./admin";
import AuthRoute from "./AuthRoute";
import QrRoute from "./QrRoute";
import StageRoute from "./StageRoute";
import ChallengeRoute from "./ChallengeRoute";
import MediaRoute from "./MediaRoute";
import FeatureRoute from "./FeatureRoute";

const routes = (app: Express) => {
  app.use(AuthRoute);
  app.use("/admin", admin);
  app.use("/qr", QrRoute);
  app.use("/stage", StageRoute);
  app.use("/challenge", ChallengeRoute);
  app.use("/media", MediaRoute);
  app.use("/feature", FeatureRoute);
};

export default routes;
