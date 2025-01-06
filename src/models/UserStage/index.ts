import { model, Schema } from "mongoose";
import { UserStage } from "./types";
import { PeriodSchema, ToObject } from "~/helpers/schema";

const StageSettingsSchema = new Schema<UserStage["stage"]["settings"]>(
  {
    periode: { type: PeriodSchema, default: null },
  },
  { _id: false }
);

const StageSchema = new Schema<UserStage["stage"]>(
  {
    id: { type: String, required: true },
    storyline: { type: [String], default: [] },
    name: { type: String, required: true },
    settings: { type: StageSettingsSchema, required: true },
  },
  { _id: false, versionKey: false }
);

const UserPublicSchema = new Schema<UserStage["userPublic"]>({
  id: { type: String, required: true },
  code: { type: String, required: true },
  name: { type: String },
});

const UserStageSchema = new Schema<UserStage>(
  {
    stage: { type: StageSchema, required: true },
    userPublic: { type: UserPublicSchema, required: true },
    storylinePassed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserStageSchema.set("toJSON", ToObject);
UserStageSchema.set("toObject", ToObject);

const UserStage = model("UserStage", UserStageSchema, "usersStage");

export * from "./types";

export default UserStage;
