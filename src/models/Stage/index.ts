import { PeriodSchema, ToObject } from "~/helpers/schema";
import { Stage, StageStatus } from "./types";
import { model, Schema } from "mongoose";

const StageSettingsSchema = new Schema<Stage["settings"]>(
  {
    canDoRandomChallenges: { type: Boolean, default: false },
    canStartFromChallenges: { type: Boolean, default: false },
    periode: { type: PeriodSchema, default: null },
  },
  { _id: false }
);

const StageSchema = new Schema<Stage>(
  {
    name: { type: String, required: true },
    storyline: { type: [String], default: [] },
    status: {
      type: String,
      enum: Object.values(StageStatus),
      default: StageStatus.Draft,
    },
    settings: { type: StageSettingsSchema, required: true },
    contents: { type: [String], default: [] },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

StageSchema.set("toObject", ToObject);
StageSchema.set("toJSON", ToObject);

const Stage = model<Stage>("Stage", StageSchema);

export * from "./types";

export default Stage;
