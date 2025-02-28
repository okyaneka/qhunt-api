import validator from "~/helpers/validator";
import { DefaultListParamsFields } from "~/helpers/validator";
import { UserListParams, UserLoginPayload, UserPayload } from "qhunt-lib";
import { USER_ROLES } from "qhunt-lib/constants";

export const UserLoginPayloadValidator = validator.generate<UserLoginPayload>({
  email: validator.string({ required: true }).email().lowercase(),
  password: validator.string({ required: true }),
});

export const UserPayloadValidator = validator.generate<UserPayload>({
  name: validator.string({ required: true }),
  email: validator.string({ required: true }).email().lowercase(),
  password: validator.string({ required: true }),
});

export const UserListParamsValidator = validator.generate<UserListParams>({
  ...DefaultListParamsFields,
  role: validator
    .string({ defaultValue: null })
    .valid(...Object.values(USER_ROLES)),
});

const UserValidator = {
  UserPayloadValidator,
  UserListParamsValidator,
};

export default UserValidator;
