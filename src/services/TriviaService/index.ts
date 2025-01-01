import { Challenge } from "~/models/Challenge";
import Trivia, { TriviaPayload } from "~/models/Trivia";

export const sync = async (
  challenge: Challenge,
  items: TriviaPayload[]
): Promise<string[]> => {
  const idName = { id: challenge.id, name: challenge.name };
  const create = items
    .filter((item) => !item.id)
    .map((item) => ({ ...item, challenge: idName }));
  const update = items.filter((item) => item.id);

  const actCreate = Trivia.insertMany(create);
  const actUpdate = update.map((item) =>
    Trivia.findOneAndUpdate({ _id: item.id }, { $set: item }, { new: true })
  );

  const [resCreate, ...resUpdate] = await Promise.all([
    actCreate,
    ...actUpdate,
  ]);

  return resUpdate
    .map((item) => item?._id.toString())
    .concat(...resCreate.map((item) => item._id.toString()))
    .filter((v) => v != undefined);
};

export const content = async (challenge: Challenge) => {
  const items = await Trivia.find({ "challenge.id": challenge.id });
  return items.map((item) => item.toObject());
};

const TriviaService = { sync, content };

export default TriviaService;
