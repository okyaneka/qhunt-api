import ChallengeService from "../ChallengeService";
import UserChallenge, {
  UserChallengeForeign,
  UserChallengeStatus,
} from "~/models/UserChallenge";
import UserPublicService from "../UserPublicService";
import UserStageService from "../UserStageService";
import UserTriviaService from "../UserTriviaService";
import { ChallengeForeignValidator } from "~/validators/ChallengeValidator";
import { ChallengeType } from "~/models/Challenge";
import { UserPublicForeignValidator } from "~/validators/UserPublicValidator";
import StageService from "../StageService";

export const verify = async (code: string, challengeId: string) => {
  const item = await UserChallenge.findOne({
    "userPublic.code": code,
    "challenge.id": challengeId,
    deletedAt: null,
  });
  if (!item) throw new Error("user challenge undiscovered yet");
  return item.toObject();
};

export const discover = async (id: string) => {
  const item = await UserChallenge.findOneAndUpdate(
    { _id: id, deletedAt: null },
    {
      $set: { status: UserChallengeStatus.OnGoing },
    },
    { new: true }
  );
  if (!item) throw new Error("user challenge undiscovered yet");
  return item.toObject();
};

export const setup = async (
  code: string,
  challengeId: string,
  isDiscover?: boolean
) => {
  const exist = await verify(code, challengeId).catch(() => null);
  if (exist) return await discover(exist.id);

  const userPublicData = await UserPublicService.verify(code);
  const challengeData = await ChallengeService.detail(challengeId);

  const stageId = challengeData.stage?.id;
  const userStageData = stageId
    ? await UserStageService.verify(code, stageId).catch(() => null)
    : null;

  if (stageId && !userStageData) {
    const stageData = await StageService.detail(stageId);
    if (!stageData.settings.canStartFromChallenges)
      throw new Error("user stage not discovered yet");

    await UserStageService.setup(code, stageId);
    return await verify(code, challengeId);
  }

  const userStage = userStageData
    ? {
        id: userStageData.id,
        stageId: userStageData.stage.id,
        name: userStageData.stage.name,
      }
    : null;

  const userPublic = await UserPublicForeignValidator.validateAsync(
    userPublicData,
    {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    }
  );

  const challenge = await ChallengeForeignValidator.validateAsync(
    challengeData,
    {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    }
  );

  const userChallengeData = await UserChallenge.create({
    userStage,
    challenge,
    userPublic,
    status: isDiscover
      ? UserChallengeStatus.OnGoing
      : UserChallengeStatus.Undiscovered,
  });

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
      await userChallengeData.save();
      break;

    default:
      break;
  }

  return userChallengeData.toObject();
};

const UserChallengeService = { verify, setup };

export default UserChallengeService;
