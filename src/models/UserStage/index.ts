import { model, Schema } from "mongoose";
import { UserStage, UserStageStatus } from "./types";
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
    name: { type: String, required: true },
    storyline: { type: [String], default: [] },
    settings: { type: StageSettingsSchema, required: true },
  },
  { _id: false, versionKey: false }
);

const UserPublicSchema = new Schema<UserStage["userPublic"]>(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String },
  },
  { _id: false }
);

const UserStageSchema = new Schema<UserStage>(
  {
    stage: { type: StageSchema, required: true },
    userPublic: { type: UserPublicSchema, required: true },
    status: {
      type: String,
      enum: Object.values(UserStageStatus),
      default: UserStageStatus.OnGoing,
    },
    score: { type: Number, default: null },
    contents: { type: [String], default: [] },
  },
  { timestamps: true }
);

UserStageSchema.set("toJSON", ToObject);
UserStageSchema.set("toObject", ToObject);

const UserStage = model("UserStage", UserStageSchema, "usersStage");

export * from "./types";

export default UserStage;
