import Joi from "joi";
import mongoose, { Schema } from "mongoose";

export interface Periode {
  startDate: Date;
  endDate: Date;
}

interface ValidatorOption<T = unknown> {
  required?: boolean;
  defaultValue?: T;
  allow?: T;
}

export const PeriodSchema = new Schema<Periode>(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { _id: false }
);

const createValidator = <T = unknown>(
  base: Joi.Schema<T>,
  option?: ValidatorOption<T>
) => {
  let v = base;
  if (option?.required) v = v.required();
  if (option?.allow !== undefined) v = v.allow(option.allow);
  if (option?.defaultValue !== undefined) v = v.default(option.defaultValue);
  return v;
};

export const string = (option?: ValidatorOption<string | null>) =>
  createValidator(Joi.string().trim(), option) as Joi.StringSchema;

export const number = (option?: ValidatorOption<number | null>) =>
  createValidator(Joi.number(), option) as Joi.NumberSchema;

export const boolean = (option?: ValidatorOption<boolean | null>) =>
  createValidator(Joi.boolean(), option) as Joi.BooleanSchema;

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

export const PeriodeValidator = generate<Periode>({
  startDate: Joi.date().required().greater("now"),
  endDate: Joi.date().required().greater(Joi.ref("startDate")),
});

export const ToObject: mongoose.ToObjectOptions = {
  transform: (doc, ret) => {
    const { _id, deletedAt, __v, ...rest } = ret;
    return { id: _id.toString(), ...rest };
  },
};

const schema = {
  string,
  number,
  boolean,
  array,
  generate,
  ToObject,
  PeriodeValidator,
  PeriodSchema,
};

export default schema;
