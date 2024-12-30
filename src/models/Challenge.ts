import mongoose from "mongoose";
import { IdName, idNameSchema, Timestamps } from ".";
import { ToObject } from "~/helpers/schema";

export interface Challenge extends Timestamps {
  id: string;
  name: string;
  storyline: string[];
  stage: IdName;
  content: any;
}

const challengeSchema = new mongoose.Schema<Challenge>(
  {
    name: { type: String, required: true },
    storyline: { type: [String], default: [] },
    stage: { type: idNameSchema, required: true },
    content: { type: Object, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);

challengeSchema.set("toJSON", ToObject);
challengeSchema.set("toObject", ToObject);

const Challenge = mongoose.model<Challenge>("Challenge", challengeSchema);

export default Challenge;
