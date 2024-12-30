import mongoose from "mongoose";

export interface User {
  email: string;
  username: string;
  password: string;
}

const ToObject: mongoose.ToObjectOptions = {
  versionKey: false,
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
    virtuals: true,
    versionKey: false,
  }
);

userSchema.set("toJSON", ToObject);
userSchema.set("toObject", ToObject);

const User = mongoose.model<User>("User", userSchema);

export default User;
