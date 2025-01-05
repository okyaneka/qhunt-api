import { ChallengeType } from "~/models/Challenge";
import UserChallenge from "~/models/UserChallenge";
import ChallengeService from "../ChallengeService";
import UserPublicService from "../UserPublicService";
import UserTriviaService from "../UserTriviaService";

export const sync = async (code: string, challengeId: string) => {
  const user = await UserPublicService.verify(code);
  const challenge = await ChallengeService.detail(challengeId);

  const userChallenge = await UserChallenge.findOneAndUpdate(
    { "userPublic.code": code, "challenge.id": challengeId, deletedAt: null },
    {
      $set: {
        stage: challenge.stage,
        challenge: {
          id: challenge.id,
          name: challenge.name,
          storyline: challenge.storyline,
          setting: {
            type: challenge.setting.type,
            duration: challenge.setting.duration,
          },
        },
        userPublic: {
          id: user.id,
          name: user.name,
          code: user.code,
        },
      },
    },
    { new: true, upsert: true }
  );

  switch (challenge.setting.type) {
    case ChallengeType.Trivia:
      const triviaContent = await UserTriviaService.setup(
        user,
        userChallenge,
        challenge.content
      );

      userChallenge.contents = triviaContent;
      await userChallenge.save();
      break;

    default:
      break;
  }

  return userChallenge.toObject();
};

const UserChallengeService = { sync };

export default UserChallengeService;
