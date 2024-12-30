import Joi from "joi";
import schema from "~/helpers/schema";

export interface AuthRegisterPayload {
  email: string;
  password: string;
}

export interface AuthLoginPayload {
  email: string;
  password: string;
}

export const AuthRegisterPayloadSchema = schema.generate<AuthRegisterPayload>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const AuthLoginPayloadSchema = schema.generate<AuthLoginPayload>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
