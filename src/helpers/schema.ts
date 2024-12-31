import Joi from "joi";
import mongoose from "mongoose";

export const generate = <T>(
  fields: Record<keyof T, Joi.Schema>
): Joi.ObjectSchema<T> => Joi.object(fields);

export const ToObject: mongoose.ToObjectOptions = {
  transform: (doc, ret) => {
    const { _id, deletedAt, __v, ...rest } = ret;
    return { id: _id, ...rest };
  },
};

const schema = { generate };

export default schema;
