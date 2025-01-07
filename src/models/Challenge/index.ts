import { model, Schema } from "mongoose";
import { ToObject } from "~/helpers/schema";
import {
  Challenge,
  ChallengeFeedback,
  ChallengeSettings,
  ChallengeStatus,
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

const ChallengeSettingsSchema = new Schema<ChallengeSettings>(
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
    stage: { type: idNameSchema, default: null },
    storyline: { type: [String] },
    status: {
      type: String,
      enum: Object.values(ChallengeStatus),
      default: ChallengeStatus.Draft,
    },
    settings: { type: ChallengeSettingsSchema, default: null },
    contents: { type: [String] },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

ChallengeSchema.set("toJSON", ToObject);
ChallengeSchema.set("toObject", ToObject);

const Challenge = model<Challenge>("Challenge", ChallengeSchema);

export * from "./types";

export default Challenge;
