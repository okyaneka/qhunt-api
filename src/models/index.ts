import { Schema } from "mongoose";

export { default as User } from "./User";
export { default as Stage } from "./Stage";

export interface IdName {
  id: string;
  name: string;
}

export const idNameSchema = new Schema<IdName>({
  id: { type: String, required: true },
  name: { type: String, required: true },
});
