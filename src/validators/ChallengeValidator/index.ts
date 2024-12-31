import Joi from "joi";
import schema from "~/helpers/schema";
import { ChallengeSetting, ChallengeType } from "~/models/Challenge";
import { DefaultListParams, DefaultListParamsFields } from "~/validators";

export interface ChallengeListParams extends DefaultListParams {
  stageId: string;
}

export interface ChallengeCreatePayload {
  name: string;
  storyline: string[];
  stageId: string;
  setting: ChallengeSetting;
}

export interface ChallengeSettingPayload extends ChallengeSetting {}

export const ChallengeListParamsSchema = schema.generate<ChallengeListParams>({
  ...DefaultListParamsFields,
  stageId: Joi.string().allow("").default(""),
});

export const ChallengeCreatePayloadSchema =
  schema.generate<ChallengeCreatePayload>({
    name: Joi.string().required(),
    storyline: Joi.array().items(Joi.string()).default([]),
    stageId: Joi.string().required(),
    setting: schema
      .generate<ChallengeSettingPayload>({
        clue: Joi.string().default(""),
        duration: Joi.number().default(0),
        type: Joi.string()
          .valid(...Object.values(ChallengeType))
          .required(),
        feedback: schema
          .generate<ChallengeSettingPayload["feedback"]>({
            positive: Joi.string().default(""),
            negative: Joi.string().default(""),
          })
          .default({
            positive: "",
            negative: "",
          }),
      })
      .required(),
  });

export const ChallengeUpdatePayloadSchema = ChallengeCreatePayloadSchema;
