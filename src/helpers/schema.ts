import Joi from "joi";

export const generate = <T>(
  fields: Record<keyof T, Joi.Schema>
): Joi.ObjectSchema<T> => Joi.object(fields);

const schema = { generate };

export default schema;
