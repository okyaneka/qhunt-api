import mongoose from "mongoose";
import { ToObject } from "~/helpers/schema";
import { IdName, idNameSchema } from "~/models";

export interface Qr {
  id: string;
  code: string;
  stage: IdName | null;
  challenge: IdName | null;
  isUsed: boolean;
  accessCount: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const qrSchema = new mongoose.Schema<Qr>(
  {
    code: { type: String, default: "" },
    stage: { type: idNameSchema, default: null },
    challenge: { type: idNameSchema, default: null },
    isUsed: { type: Boolean, default: false },
    accessCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

qrSchema.set("toObject", ToObject);
qrSchema.set("toJSON", ToObject);

export const Qr = mongoose.model<Qr>("Qr", qrSchema);

export default Qr;
