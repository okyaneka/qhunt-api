import Joi from "joi";
import mongoose from "mongoose";

interface ValidatorOption<T = unknown> {
  required?: boolean;
  defaultValue?: T;
  allow?: T;
}

const createValidator = <T = unknown>(
  base: Joi.Schema<T> | Joi.ArraySchema<T>,
  option?: ValidatorOption<T>
): Joi.Schema<T> | Joi.ArraySchema<T> => {
  let v = base;
  if (option?.required) v = v.required();
  if (option?.allow !== undefined) v = v.allow(option.allow);
  if (option?.defaultValue !== undefined) v = v.default(option.defaultValue);
  return v;
};

export const string = (option?: ValidatorOption<string | null>) =>
  createValidator(Joi.string(), option);

export const number = (option?: ValidatorOption<number | null>) =>
  createValidator(Joi.number(), option);

export const boolean = (option?: ValidatorOption<boolean | null>) =>
  createValidator(Joi.boolean(), option);

export const array = <T = unknown>(
  item: Joi.Schema<T>,
  options?: ValidatorOption<T>
) => {
  let v = createValidator<T | null>(
    Joi.array<T>().items(item),
    options
  ) as Joi.ArraySchema<T>;
  if (options?.required) v = v.min(1);
  return v;
};

export const generate = <T>(
  fields: Record<keyof T, Joi.Schema>
): Joi.ObjectSchema<T> => Joi.object(fields);

export const ToObject: mongoose.ToObjectOptions = {
  transform: (doc, ret) => {
    const { _id, deletedAt, __v, ...rest } = ret;
    return { id: _id, ...rest };
  },
};

const schema = { string, number, boolean, array, generate, ToObject };

export default schema;
