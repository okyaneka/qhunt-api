import mongoose from "mongoose";
import { Timestamps } from "..";

export interface User extends Timestamps {
  email: string;
  username: string;
  password: string;
}

const ToObject: mongoose.ToObjectOptions = {
  transform: (doc, ret) => {
    const { _id, password, ...rest } = ret;
    return { id: _id, ...rest };
  },
};

const userSchema = new mongoose.Schema<User>(
  {
    username: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", ToObject);
userSchema.set("toObject", ToObject);

const User = mongoose.model<User>("User", userSchema);

export default User;
