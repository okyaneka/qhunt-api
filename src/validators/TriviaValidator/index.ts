import Joi from "joi";
import schema from "~/helpers/schema";
import { TriviaOption, TriviaPayload } from "~/models/Trivia";
import { ChallengeFeedbackValidator } from "~/validators/ChallengeValidator";

export const TriviaOptionValidator = schema.generate<TriviaOption>({
  isCorrect: schema.boolean({ defaultValue: false }),
  point: schema.number({ defaultValue: 0 }),
  text: schema.string({ required: true }),
});

export const TriviaOptionsValidator = schema
  .array(TriviaOptionValidator, {
    required: true,
  })
  .custom((value, helpers) => {
    const hasCorrect = value.some((option: any) => option.isCorrect === true);
    return hasCorrect ? value : helpers.error("array.hasCorrect");
  })
  .messages({
    "array.hasCorrect":
      "{#label} at least one option must have `isCorrect` set to true.",
  });

export const TriviaPayloadValidator = schema.generate<TriviaPayload>({
  id: schema.string(),
  question: schema.string({ required: true }),
  feedback: ChallengeFeedbackValidator,
  allowMultiple: schema.boolean({ defaultValue: false }),
  options: TriviaOptionsValidator,
});

export const TriviaItemsPayloadValidator = schema.generate<{
  items: TriviaPayload[];
}>({
  items: schema.array(TriviaPayloadValidator, {
    required: true,
  }),
});
