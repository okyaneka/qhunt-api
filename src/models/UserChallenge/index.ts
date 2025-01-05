import { model, Schema } from "mongoose";
import { ToObject } from "~/helpers/schema";
import { UserChallenge, UserChallengeState } from "./types";
import { ChallengeType } from "../Challenge";

const StageSchema = new Schema<UserChallenge["stage"]>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false, versionKey: false }
);

const ChallengeSettingsSchema = new Schema<
  UserChallenge["challenge"]["settings"]
>({
  type: { type: String, enum: Object.values(ChallengeType), required: true },
  duration: { type: Number },
});

const ChallengeSchema = new Schema<UserChallenge["challenge"]>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    storyline: { type: [String], required: true },
    settings: { type: ChallengeSettingsSchema, required: true },
  },
  { _id: false, versionKey: false }
);

const UserPublicSchema = new Schema<UserChallenge["userPublic"]>(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, default: "" },
  },
  { _id: false, versionKey: false }
);

const UserChallengeSchema = new Schema<UserChallenge>(
  {
    stage: { type: StageSchema, default: null },
    challenge: { type: ChallengeSchema, required: true },
    userPublic: { type: UserPublicSchema, required: true },
    state: {
      type: String,
      enum: Object.values(UserChallengeState),
      default: UserChallengeState.Storyline,
    },
    contents: { type: [String], default: [] },
    score: { type: Number, default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

UserChallengeSchema.set("toJSON", ToObject);
UserChallengeSchema.set("toObject", ToObject);

const UserChallenge = model(
  "UserChallenge",
  UserChallengeSchema,
  "usersChallenge"
);

export * from "./types";

export default UserChallenge;
