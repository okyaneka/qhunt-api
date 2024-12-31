import mongoose from "mongoose";
import { ToObject } from "~/helpers/schema";
import { Timestamps } from "..";

enum StageStatus {
  Draft = "draft",
  Publish = "publish",
}

export interface Stage extends Timestamps {
  name: string;
  storyline: string[];
  status: StageStatus;
  settings: {};
}

const stageSchema = new mongoose.Schema<Stage>(
  {
    name: { type: String, required: true },
    storyline: { type: [String], default: [] },
    status: {
      type: String,
      enum: Object.values(StageStatus),
      default: StageStatus.Draft,
    },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

stageSchema.set("toObject", ToObject);
stageSchema.set("toJSON", ToObject);

const Stage = mongoose.model<Stage>("Stage", stageSchema);

export default Stage;
