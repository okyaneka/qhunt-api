import { Router } from "express";
import StageRoute from "./StageRoute";
import ChallengeRoute from "./ChallengeRoute";
import QrRoute from "./QrRoute";
import FeatureRoute from "./FeatureRoute";
import MediaRoute from "./MediaRoute";

const admin = Router();

admin.use("/stage", StageRoute);
admin.use("/challenge", ChallengeRoute);
admin.use("/qr", QrRoute);
admin.use("/feature", FeatureRoute);
admin.use("/media", MediaRoute);

export default admin;
