import mongoose from "mongoose";
import { ToObject } from "~/helpers/schema";
import { IdName, idNameSchema, Timestamps } from "~/models";

export interface Qr extends Timestamps {
  code: string;
  stage: IdName | null;
  challenge: IdName | null;
  isUsed: boolean;
  accessCount: number | null;
}

const qrSchema = new mongoose.Schema<Qr>(
  {
    code: { type: String, default: "" },
    stage: { type: idNameSchema, default: null },
    challenge: { type: idNameSchema, default: null },
    isUsed: { type: Boolean, default: false },
    accessCount: { type: Number, default: 0 },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

qrSchema.set("toObject", ToObject);
qrSchema.set("toJSON", ToObject);

export const Qr = mongoose.model<Qr>("Qr", qrSchema);

export default Qr;
