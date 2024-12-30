import mongoose from "mongoose";
import { ToObject } from "~/helpers/schema";

export interface Stage {
  id: string;
  name: string;
  storyline: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const stageSchema = new mongoose.Schema<Stage>(
  {
    name: { type: String, required: true },
    storyline: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

stageSchema.set("toObject", ToObject);
stageSchema.set("toJSON", ToObject);

const Stage = mongoose.model<Stage>("Stage", stageSchema);

export default Stage;
