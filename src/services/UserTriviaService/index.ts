import Trivia from "~/models/Trivia";
import { UserChallengeForeign } from "~/models/UserChallenge";
import { UserPublicForeign } from "~/models/UserPublic";
import UserTrivia from "~/models/UserTrivia";

export const setup = async (
  userPublic: UserPublicForeign,
  userChallenge: UserChallengeForeign,
  content: string[]
): Promise<string[]> => {
  const trivias = await Trivia.find({ _id: { $in: content } });

  const payload = trivias
    .map((item) => item.toObject())
    .map((item) => {
      return UserTrivia.findOneAndUpdate(
        { "userPublic.code": userPublic.code, "content.id": item.id },
        {
          $setOnInsert: {
            userPublic,
            userChallenge,
            content: {
              id: item.id,
              question: item.question,
              options: item.options.map(({ text }) => ({ text })),
              allowMultiple: item.allowMultiple,
            },
          },
        },
        { new: true, upsert: true }
      );
    });

  const items = await Promise.all(payload);

  return items.map((item) => item.toObject().id);
};

const UserTriviaService = { setup };

export default UserTriviaService;
