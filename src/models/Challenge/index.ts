import { model, Schema } from "mongoose";
import { ToObject } from "~/helpers/schema";
import {
  Challenge,
  ChallengeFeedback,
  ChallengeSetting,
  ChallengeType,
} from "./types";
import { idNameSchema } from "..";

export const ChallengeFeedbackSchema = new Schema<ChallengeFeedback>(
  {
    positive: { type: String, default: "" },
    negative: { type: String, default: "" },
  },
  { _id: false, versionKey: false }
);

const ChallengeSettingSchema = new Schema<ChallengeSetting>(
  {
    type: { type: String, enum: Object.values(ChallengeType), required: true },
    duration: { type: Number },
    clue: { type: String },
    feedback: { type: ChallengeFeedbackSchema },
  },
  { _id: false, versionKey: false }
);

const ChallengeSchema = new Schema<Challenge>(
  {
    name: { type: String, required: true },
    storyline: { type: [String] },
    stage: { type: idNameSchema, required: true },
    setting: { type: ChallengeSettingSchema, default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

ChallengeSchema.set("toJSON", ToObject);
ChallengeSchema.set("toObject", ToObject);

const Challenge = model<Challenge>("Challenge", ChallengeSchema);

export * from "./types";

export default Challenge;
