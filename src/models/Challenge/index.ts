import { model, Schema } from "mongoose";
import { IdName, idNameSchema, Timestamps } from "~/models";
import { ToObject } from "~/helpers/schema";

export interface Challenge extends Timestamps {
  name: string;
  storyline: string[];
  stage: IdName;
}

const challengeSchema = new Schema<Challenge>(
  {
    name: { type: String, required: true },
    storyline: { type: [String], default: [] },
    stage: { type: idNameSchema, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

challengeSchema.set("toJSON", ToObject);
challengeSchema.set("toObject", ToObject);

const Challenge = model<Challenge>("Challenge", challengeSchema);

export default Challenge;
