import mongoose from "../src/plugins/mongoose";
import {
  ChallengeModel,
  QrModel,
  StageModel,
  TriviaModel,
  UserChallengeModel,
  UserModel,
  UserPublicModel,
  UserStageModel,
  UserTriviaModel,
} from "qhunt-lib/models";
import SebelumFajar from "./quests/test-sebelum-fajar";
import GettingStarted from "./quests/getting-started";

const seeders = async () => {
  const db = await mongoose();

  await ChallengeModel.deleteMany({}).then(() =>
    console.log("ChallengeModel truncated")
  );
  await QrModel.deleteMany({}).then(() => console.log("QrModel truncated"));
  await StageModel.deleteMany({}).then(() =>
    console.log("StageModel truncated")
  );
  await TriviaModel.deleteMany({}).then(() =>
    console.log("TriviaModel truncated")
  );
  await UserChallengeModel.deleteMany({}).then(() =>
    console.log("UserChallengeModel truncated")
  );
  // await UserModel.deleteMany({}).then(() => console.log("UserModel truncated"));
  // await UserPublicModel.deleteMany({}).then(() =>
  //   console.log("UserPublicModel truncated")
  // );
  await UserStageModel.deleteMany({}).then(() =>
    console.log("UserStageModel truncated")
  );
  await UserTriviaModel.deleteMany({}).then(() =>
    console.log("UserTriviaModel truncated")
  );

  await GettingStarted();
  await SebelumFajar();
  // const challenges =  await Promise.all()

  console.log("Bye...");
  await db.disconnect();

  return;
};

seeders();

export default seeders;
