import { model, Schema } from "mongoose";
import { UserTrivia } from "./types";
import { ToObject } from "~/helpers/schema";

const ChallengeSchema = new Schema<UserTrivia["userChallenge"]>(
  {
    id: { type: String, required: true },
    challengeId: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false, versionKey: false }
);

const UserPublicSchema = new Schema<UserTrivia["userPublic"]>(
  {
    id: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, default: "" },
  },
  { _id: false, versionKey: false }
);

const TriviaOption = new Schema<UserTrivia["content"]["options"][number]>(
  {
    text: { type: String, required: true },
  },
  { _id: false, versionKey: false }
);

const TriviaContentSchema = new Schema<UserTrivia["content"]>(
  {
    id: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: [TriviaOption], required: true },
    allowMultiple: { type: Boolean, default: false },
  },

  { _id: false, versionKey: false }
);

const UserTriviaSchema = new Schema<UserTrivia>(
  {
    userPublic: { type: UserPublicSchema, required: true },
    userChallenge: { type: ChallengeSchema, required: true },
    content: { type: TriviaContentSchema, required: true },
    answer: { type: String, default: null },
    isDone: { type: Boolean, default: false },
    point: { type: Number, default: null },
  },
  { timestamps: true }
);

UserTriviaSchema.set("toJSON", ToObject);
UserTriviaSchema.set("toObject", ToObject);

const UserTrivia = model("UserTrivia", UserTriviaSchema, "usersTrivia");

export * from "./types";

export default UserTrivia;
