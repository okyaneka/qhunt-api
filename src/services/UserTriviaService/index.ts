import Trivia from "~/models/Trivia";
import { UserChallenge } from "~/models/UserChallenge";
import { UserPublic } from "~/models/UserPublic";
import UserTrivia from "~/models/UserTrivia";

export const setup = async (
  userPublic: UserPublic,
  userChallenge: UserChallenge,
  content: string[]
): Promise<string[]> => {
  const trivias = await Trivia.find({ _id: { $in: content } });

  const payload = trivias
    .map((item) => item.toObject())
    .map((item) => {
      return UserTrivia.findOneAndUpdate(
        { "content.id": item.id },
        {
          $setOnInsert: {
            userPublic: {
              id: userPublic.id,
              name: userPublic.name,
              code: userPublic.code,
            },
            userChallenge: {
              id: userChallenge.id,
              challengeId: userChallenge.challenge.id,
              name: userChallenge.challenge.name,
            },
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
