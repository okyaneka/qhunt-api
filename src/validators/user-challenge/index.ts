import validator from "~/helpers/validator";
import { DefaultListParamsFields } from "~/helpers/validator";
import {
  UserChallengeForeign,
  UserChallengeParams,
  USER_CHALLENGE_STATUS,
} from "qhunt-lib/types";

export const UserChallengeForeignValidator =
  validator.generate<UserChallengeForeign>({
    id: validator.string({ required: true }),
    challengeId: validator.string({ required: true }),
    name: validator.string({ required: true }),
  });

export const UserChallengeParamsValidator =
  validator.generate<UserChallengeParams>({
    ...DefaultListParamsFields,
    userStageId: validator.string({ allow: "" }),
    status: validator
      .string({ allow: "" })
      .valid(...Object.values(USER_CHALLENGE_STATUS)),
  });

const UserChallengeValidator = {
  UserChallengeForeignValidator,
  UserChallengeParamsValidator,
};

export default UserChallengeValidator;
