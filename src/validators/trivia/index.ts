import validator from "~/helpers/validator";
import { FeedbackValidator } from "~/helpers/validator";
import {
  TriviaForeign,
  TriviaForeignOption,
  TriviaOption,
  TriviaPayload,
} from "qhunt-lib/types";

export const TriviaOptionValidator = validator.generate<TriviaOption>({
  isCorrect: validator.boolean({ defaultValue: false }),
  point: validator.number({ defaultValue: 0 }),
  text: validator.string({ required: true }),
});

export const TriviaOptionsValidator = validator
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

export const TriviaPayloadValidator = validator.generate<TriviaPayload>({
  id: validator.string(),
  question: validator.string({ required: true }),
  feedback: FeedbackValidator,
  allowMultiple: validator.boolean({ defaultValue: false }),
  options: TriviaOptionsValidator,
});

export const TriviaItemsPayloadValidator = validator.array(
  TriviaPayloadValidator,
  {
    required: true,
  }
);

const TriviaForeignOptionValidator = validator.generate<TriviaForeignOption>({
  text: validator.string({ required: true }),
});

export const TriviaForeignValidator = validator.generate<TriviaForeign>({
  id: validator.string({ required: true }),
  question: validator.string({ required: true }),
  allowMultiple: validator.boolean({ required: true }),
  options: validator.array(TriviaForeignOptionValidator, { required: true }),
});

const TriviaValidator = {
  TriviaOptionValidator,
  TriviaOptionsValidator,
  TriviaPayloadValidator,
  TriviaItemsPayloadValidator,
  TriviaForeignValidator,
};

export default TriviaValidator;
