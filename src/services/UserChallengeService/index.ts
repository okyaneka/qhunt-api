import db from "~/helpers/db";
import ChallengeService from "../ChallengeService";
import UserChallenge, { UserChallengeForeign } from "~/models/UserChallenge";
import UserPublicService from "../UserPublicService";
import UserStageService from "../UserStageService";
import UserTriviaService from "../UserTriviaService";
import { ChallengeForeignValidator } from "~/validators/ChallengeValidator";
import { ChallengeForeign, ChallengeType } from "~/models/Challenge";
import { UserPublicForeignValidator } from "~/validators/UserPublicValidator";
import { StageForeignValidator } from "~/validators/StageValidator";
import { UserStage, UserStageForeign } from "~/models/UserStage";
import { UserStageForeignValidator } from "~/validators/UserStageValidator";
import { UserPublicForeign } from "~/models/UserPublic";

export const setup = async (
  code: string,
  challengeId: string,
  founded: boolean = true
) => {
  return db.transaction(async (session) => {
    const userChallengeExists = await UserChallenge.findOne({
      "userPublic.code": code,
      "challenge.id": challengeId,
      deletedAt: null,
    });

    if (userChallengeExists) {
      userChallengeExists.founded = true;
      await userChallengeExists.save();
      return userChallengeExists.toObject();
    }

    const userPublicData = await UserPublicService.verify(code);
    const challengeData = await ChallengeService.detail(challengeId);

    const stageId = challengeData.stage?.id;

    const stageData = stageId
      ? await UserStageService.setup(code, stageId)
      : null;

    const stage: UserStageForeign | null = stageId
      ? await UserStageForeignValidator.validateAsync({
          id: stageData?.id,
          stageId: stageData?.stage?.id,
          name: stageData?.stage?.name,
        })
      : null;

    const userPublic: UserPublicForeign =
      await UserPublicForeignValidator.validateAsync(userPublicData, {
        abortEarly: false,
        stripUnknown: true,
        convert: true,
      });

    const challenge: ChallengeForeign =
      await ChallengeForeignValidator.validateAsync(challengeData, {
        abortEarly: false,
        stripUnknown: true,
        convert: true,
      });

    const [userChallengeData] = await UserChallenge.create(
      [
        {
          stage,
          challenge,
          userPublic,
          founded,
        },
      ],
      { session }
    );

    const userChallenge: UserChallengeForeign = {
      id: userChallengeData.id,
      challengeId: userChallengeData.challenge.id,
      name: userChallengeData.challenge.name,
    };

    switch (challenge.settings.type) {
      case ChallengeType.Trivia:
        const triviaContent = await UserTriviaService.setup(
          userPublic,
          userChallenge,
          challengeData.contents
        );

        userChallengeData.contents = triviaContent;
        await userChallengeData.save({ session });
        break;

      default:
        break;
    }

    return userChallengeData.toObject();
  });
};

const UserChallengeService = { setup };

export default UserChallengeService;
