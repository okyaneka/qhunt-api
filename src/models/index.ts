import { Schema } from "mongoose";

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IdName {
  id: string;
  name: string;
}

export const idNameSchema = new Schema<IdName>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);
