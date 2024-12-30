import Joi from "joi";
import schema from "~/helpers/schema";
import { DefaultListParams, DefaultListParamsFields } from "~/validators";

export interface QrListParams extends DefaultListParams {
  isUsed: boolean | null;
}

export interface QrGeneratePayload {
  amount: number;
}

export interface QrDeleteBulkPayload {
  ids: string[];
}

export const QrListParamsSchema = schema.generate<QrListParams>({
  ...DefaultListParamsFields,
  isUsed: Joi.boolean().default(null),
});

export const QrGeneratePayloadSchema = schema.generate<QrGeneratePayload>({
  amount: Joi.number().required(),
});

export const QrDeleteBulkPayloadSchema = schema.generate<QrDeleteBulkPayload>({
  ids: Joi.array().items(Joi.string()).required(),
});
