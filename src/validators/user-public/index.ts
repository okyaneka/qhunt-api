import Joi from "joi";
import validator from "~/helpers/validator";
import {
  UserPasswordPayload,
  UserPublicForeign,
  UserPublicPayload,
} from "qhunt-lib";
import { USER_PUBLIC_GENDER } from "qhunt-lib/constants";

export const UserPublicForeignValidator = validator.generate<UserPublicForeign>(
  {
    id: validator.string({ required: true }),
    code: validator.string({ required: true }),
    name: validator.string({ required: true, allow: "" }),
  }
);

export const UserPasswordPayloadValidator =
  validator.generate<UserPasswordPayload>({
    old_password: validator.string({ required: false, allow: null }),
    new_password: validator
      .string({ required: true })
      .invalid(Joi.ref("old_password")),
    confirm_password: validator
      .string({ required: true })
      .valid(Joi.ref("new_password")),
  });

export const UserPublicPayloadValidator = validator.generate<UserPublicPayload>(
  {
    name: validator.string({ required: true }),
    phone: validator.string({ required: true }),
    gender: validator
      .string({ required: true })
      .valid(...Object.values(USER_PUBLIC_GENDER)),
    dob: validator.string({ required: true }),
  }
);

const UserPublicValidator = {
  UserPublicForeignValidator,
  UserPublicPayloadValidator,
};

export default UserPublicValidator;
