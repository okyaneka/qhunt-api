import Joi from "joi";
import schema from "~/helpers/schema";

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

export const DefaultListQueryFields = {
  page: schema.number({ defaultValue: 1 }),
  limit: schema.number({ defaultValue: 1 }),
  search: schema.string({ defaultValue: "", allow: "" }),
};
