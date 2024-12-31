import { model, Schema } from "mongoose";
import { IdName, idNameSchema, Timestamps } from "~/models";
import { ToObject } from "~/helpers/schema";

export enum ChallengeType {
  Trivia = "trivia",
}

export interface ChallengeFeedback {
  positive: string;
  negative: string;
}

export interface ChallengeSetting {
  type: ChallengeType;
  duration: number;
  clue: string;
  feedback: ChallengeFeedback;
}

export interface Challenge extends Timestamps {
  name: string;
  storyline: string[];
  stage: IdName;
  setting: ChallengeSetting;
}

const ChallengeFeedbackSchema = new Schema<ChallengeFeedback>(
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

export default Challenge;
