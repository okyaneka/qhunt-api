import { model, Schema } from "mongoose";
import { UserPublic, UserPublicGender } from "./types";
import { idNameSchema } from "..";
import { ToObject } from "~/helpers/schema";

const UserPublicSchema = new Schema<UserPublic>(
  {
    user: { type: idNameSchema, default: null },
    code: { type: String, required: true },
    name: { type: String, default: "" },
    dob: { type: Date, default: null },
    gender: {
      type: String,
      enum: Object.values(UserPublicGender),
      default: null,
    },
    phone: { type: String, default: "" },
    deletedAt: { type: Date, default: null },
    lastAccessedAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

UserPublicSchema.set("toJSON", ToObject);
UserPublicSchema.set("toObject", ToObject);

const UserPublic = model<UserPublic>(
  "UserPublic",
  UserPublicSchema,
  "usersPublic"
);

export * from "./types";

export default UserPublic;
