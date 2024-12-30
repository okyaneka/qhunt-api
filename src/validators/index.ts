import Joi from "joi";

export interface DefaultListParams {
  page: number;
  limit: number;
  search: string;
}

export const DefaultListParamsFields = {
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
  search: Joi.string().allow("").default(""),
};
