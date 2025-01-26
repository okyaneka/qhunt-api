import { Router } from "express";
import StageRoute from "./StageRoute";
import ChallengeRoute from "./ChallengeRoute";
import QrRoute from "./QrRoute";

const admin = Router();

admin.use("/stage", StageRoute);
admin.use("/challenge", ChallengeRoute);
admin.use("/qr", QrRoute);

export default admin;
