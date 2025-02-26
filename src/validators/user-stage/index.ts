import validator from "~/helpers/validator";
import { DefaultListParamsFields } from "~/helpers/validator";
import {
  UserStageForeign,
  UserStageListParams,
  UserStageStatus,
} from "qhunt-lib";

export const UserStageForeignValidator = validator.generate<UserStageForeign>({
  id: validator.string({ required: true }),
  stageId: validator.string({ required: true }),
  name: validator.string({ required: true }),
});

export const UserStageListParamsValidator =
  validator.generate<UserStageListParams>({
    ...DefaultListParamsFields,
    status: validator
      .string({ allow: "" })
      .valid(...Object.values(UserStageStatus)),
  });

const UserStageValidator = {
  UserStageForeignValidator,
  UserStageListParamsValidator,
};

export default UserStageValidator;
