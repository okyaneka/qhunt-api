import Joi from "joi";
import schema from "~/helpers/schema";
import {
  ChallengeFeedback,
  ChallengeListParams,
  ChallengePayload,
  ChallengeSettings,
  ChallengeType,
} from "~/models/Challenge";
import { DefaultListParams, DefaultListParamsFields } from "~/validators";

export const ChallengeListParamsValidator =
  schema.generate<ChallengeListParams>({
    ...DefaultListParamsFields,
    stageId: Joi.string().allow("").default(""),
  });

export const ChallengeFeedbackValidator = schema
  .generate<ChallengeFeedback>({
    positive: schema.string({ allow: "", defaultValue: "" }),
    negative: schema.string({ allow: "", defaultValue: "" }),
  })
  .default({ positive: "", negative: "" });

export const ChallengePayloadValidator = schema.generate<ChallengePayload>({
  name: Joi.string().required(),
  storyline: Joi.array().items(Joi.string()).default([]),
  stageId: Joi.string().required(),
  settings: schema
    .generate<ChallengeSettings>({
      clue: Joi.string().default(""),
      duration: Joi.number().default(0),
      type: Joi.string()
        .valid(...Object.values(ChallengeType))
        .required(),
      feedback: ChallengeFeedbackValidator,
    })
    .required(),
});
