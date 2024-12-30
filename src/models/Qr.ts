import mongoose, { ToObjectOptions } from "mongoose";
import { IdName, idNameSchema } from ".";

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

const toObjectOptions: ToObjectOptions = {
  transform: (doc, ret) => {
    const { _id, deletedAt, ...rest } = ret;
    return { id: _id, ...rest };
  },
};

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

qrSchema.virtual("id").get(function () {
  return this._id.toString();
});
qrSchema.set("toObject", toObjectOptions);
qrSchema.set("toJSON", toObjectOptions);

export const Qr = mongoose.model<Qr>("Qr", qrSchema);

export default Qr;
