import Joi from "joi";
import schema from "~/helpers/schema";
import { StageListParams, StagePayload, StageStatus } from "~/models/Stage";
import { DefaultListQueryFields } from "..";

export const StageListParamsValidator = schema.generate<StageListParams>({
  ...DefaultListQueryFields,
  status: schema.string({ allow: null }).valid(...Object.values(StageStatus)),
});

export const StagePayloadValidator = schema.generate<StagePayload>({
  name: schema.string({ required: true }),
  storyline: schema.array(Joi.string()).default([]),
});
