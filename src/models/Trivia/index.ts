import { model, Schema } from "mongoose";
import { ToObject } from "~/helpers/schema";
import { Trivia, TriviaOption } from "./types";
import { ChallengeFeedbackSchema } from "../Challenge";
import { idNameSchema } from "..";

const TriviaOptionSchema = new Schema<TriviaOption>(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    point: { type: Number, default: 0 },
  },
  { _id: false, versionKey: false }
);

const TriviaSchema = new Schema<Trivia>(
  {
    challenge: { type: idNameSchema, default: null },
    question: { type: String, required: true },
    feedback: { type: ChallengeFeedbackSchema, default: {} },
    allowMultiple: { type: Boolean, default: false },
    options: { type: [TriviaOptionSchema], required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

TriviaSchema.set("toObject", ToObject);
TriviaSchema.set("toJSON", ToObject);

const Trivia = model("Trivia", TriviaSchema);

export * from "./types";

export default Trivia;
