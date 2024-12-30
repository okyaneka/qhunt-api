import schema from "~/helpers/schema";
import { DefaultListParams, DefaultListParamsFields } from "..";
import Joi from "joi";

export interface ChallengeListParams extends DefaultListParams {
  stageId: string;
}

export interface ChallengeCreatePayload {
  name: string;
  storyline: string[];
  stageId: string;
}

export interface ChallengeUpdatePayload
  extends Omit<ChallengeCreatePayload, "stageId"> {}

export const ChallengeListParamsSchema = schema.generate<ChallengeListParams>({
  ...DefaultListParamsFields,
  stageId: Joi.string().allow("").default(""),
});

export const ChallengeCreatePayloadSchema =
  schema.generate<ChallengeCreatePayload>({
    name: Joi.string().required(),
    storyline: Joi.array().items(Joi.string()).default([]),
    stageId: Joi.string().required(),
  });

export const ChallengeUpdatePayloadSchema =
  schema.generate<ChallengeUpdatePayload>({
    name: Joi.string().required(),
    storyline: Joi.array().items(Joi.string()).default([]),
  });
