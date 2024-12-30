import Joi from "joi";
import mongoose from "mongoose";

export const generate = <T>(
  fields: Record<keyof T, Joi.Schema>
): Joi.ObjectSchema<T> => Joi.object(fields);

const schema = { generate };

export default schema;

export const ToObject: mongoose.ToObjectOptions = {
  transform: (doc, ret) => {
    const { _id, deletedAt, ...rest } = ret;
    return { id: _id, ...rest };
  },
};
