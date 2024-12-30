import Joi from "joi";
import schema from "~/helpers/schema";
import { DefaultListParams, DefaultListParamsFields } from "~/validators";

export interface StageListParams extends DefaultListParams {}

export interface StageCreatePayload {
  name: string;
  storyline: string[];
}

export interface StageUpdatePayload {
  name: string;
  storyline: string[];
}

export const StageListParamsSchema = schema.generate<StageListParams>({
  ...DefaultListParamsFields,
});

export const StageCreatePayload = schema.generate<StageCreatePayload>({
  name: Joi.string().required(),
  storyline: Joi.array().items(Joi.string()).default([]),
});

export const StageUpdatePayload =
  StageCreatePayload as Joi.ObjectSchema<StageUpdatePayload>;
