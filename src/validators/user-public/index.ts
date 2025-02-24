import validator from "~/helpers/validator";
import { UserPublicForeign } from "qhunt-lib/types";

export const UserPublicForeignValidator = validator.generate<UserPublicForeign>(
  {
    id: validator.string({ required: true }),
    code: validator.string({ required: true }),
    name: validator.string({ required: true, allow: "" }),
  }
);

const UserPublicValidator = { UserPublicForeignValidator };

export default UserPublicValidator;
