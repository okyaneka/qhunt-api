import db from "~/helpers/db";
import StageService from "../StageService";
import UserChallengeService from "../UserChallengeService";
import UserPublicService from "../UserPublicService";
import UserStage, { UserStage as IUserStage } from "~/models/UserStage";
import { StageForeignValidator } from "~/validators/StageValidator";
import { UserChallenge } from "~/models/UserChallenge";
import { UserPublicForeignValidator } from "~/validators/UserPublicValidator";

export const setup = async (
  code: string,
  stageId: string,
  defaultChallenge?: string
): Promise<IUserStage | UserChallenge> => {
  const userStageExists = await UserStage.findOne({
    "userPublic.code": code,
    "stage.id": stageId,
    deletedAt: null,
  });
  if (userStageExists) return userStageExists.toObject();

  const userPublicData = await UserPublicService.verify(code);
  const stageData = await StageService.detail(stageId);

  /**
   * FIXME: enhance validation
   *
   * 1. check config stage canStartFromChallenges
   * 2. check userStage exists:
   *    - if userStage not exist yet and canStartFromChallenges
   *      - then setup userStage
   *      - else throw error("user stage has not been found yet")
   * 4.
   */

  const userPublic = await UserPublicForeignValidator.validateAsync(
    userPublicData,
    { convert: true, abortEarly: false, stripUnknown: true }
  );

  const stage = await StageForeignValidator.validateAsync(stageData, {
    convert: true,
    abortEarly: false,
    stripUnknown: true,
  });

  const userStageData = await UserStage.create({ userPublic, stage });

  const contents = stageData.contents.map((challengeId) =>
    UserChallengeService.setup(
      code,
      challengeId,
      defaultChallenge == challengeId
    )
  );
  const contentsData = await Promise.all(contents);

  if (defaultChallenge) {
    const data = contentsData.find(
      (item) => item.challenge.id == defaultChallenge
    );
    if (!data) throw new Error("challenge not found");
    return data;
  }

  return userStageData.toObject();
};

const UserStageService = { setup };

export default UserStageService;
