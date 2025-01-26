import dayjs from "dayjs";
import {
  ChallengeService,
  QrService,
  StageService,
  TriviaService,
} from "qhunt-lib/services";
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
import { StageStatus } from "qhunt-lib/models/StageModel";
import {
  Challenge,
  ChallengePayload,
  ChallengeStatus,
  ChallengeType,
} from "qhunt-lib/models/ChallengeModel";
import { QrContent, QrContentType, QrStatus } from "qhunt-lib/models/QrModel";
import trivias from "./trivias";
import { QrListParamsValidator } from "qhunt-lib/validators/QrValidator";

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
  await UserModel.deleteMany({}).then(() => console.log("UserModel truncated"));
  await UserPublicModel.deleteMany({}).then(() =>
    console.log("UserPublicModel truncated")
  );
  await UserStageModel.deleteMany({}).then(() =>
    console.log("UserStageModel truncated")
  );
  await UserTriviaModel.deleteMany({}).then(() =>
    console.log("UserTriviaModel truncated")
  );

  await QrService.generate(10).then(() => console.log("10 QR Generated"));

  // const challenges =  await Promise.all()
  const stage = await StageService.create({
    name: "Kerja kerjaan",
    contents: [],
    settings: {
      canDoRandomChallenges: false,
      canStartFromChallenges: false,
      periode: {
        startDate: dayjs("2024-01-01").toDate(),
        endDate: dayjs("2024-01-30").toDate(),
      },
    },
    status: StageStatus.Draft,
    storyline: [
      "Ah",
      "Menjalani rutinitas yang membosankan",
      "Daripada ngeluh terus",
      "Mari kita main",
    ],
  });

  const challenge1 = await ChallengeService.create({
    name: "Task 1",
    stageId: stage.id,
    status: ChallengeStatus.Draft,
    storyline: [
      "Task Pertama",
      "Tenang, task ini gak susah-susah amat kok",
      "Dalam task ini, kamu cuma dituntut untuk mengerjakan 5 trivia singkat",
      "Setiap trivia yang terjawab benar akan mendapatkan poin 100",
      "Tidak hanya itu, jika kamu bisa menjawabnya dengan cepat maka kamu akan mendapat bonus",
      "Oh iya, satu lagi. Kamu gak akan bisa mengulangi task ini lagi. Jadi telitilah sebelum menjawab",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Hahahaha. Kalah", positive: "Wow, bagus" },
      type: ChallengeType.Trivia,
    },
  });

  const challenge2 = await ChallengeService.create({
    name: "Task 2",
    stageId: stage.id,
    status: ChallengeStatus.Draft,
    storyline: [
      "Task Kedua",
      "Kalau kamu sudah bisa membuka task ini artinya kamu sudah mengerjakan Task Pertama",
      "Gimana menurutmu?",
      "Asyik kan?",
      "Task Kedua ini gak kalah asyik",
      "Seperti di Task Pertama, kamu cuma cukup mengerjakan 5 trivia singkat",
      "Setiap trivia yang terjawab benar akan mendapatkan poin 100",
      "Tidak hanya itu, jika kamu bisa menjawabnya dengan cepat maka kamu akan mendapat bonus",
      "Oh iya, satu lagi. Kamu gak akan bisa mengulangi task ini lagi. Jadi telitilah sebelum menjawab",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Hahahaha. Kalah", positive: "Wow, bagus" },
      type: ChallengeType.Trivia,
    },
  });

  const challenge3 = await ChallengeService.create({
    name: "Task 3",
    stageId: stage.id,
    status: ChallengeStatus.Draft,
    storyline: [
      "Task Ketiga",
      "Wow, kamu sudah bisa melangkah sejauh ini",
      "Aku tidak akan menanyakan bagaimana Task Pertama dan Task Kedua karena Aku yakin Kamu sangat menikmatinya",
      "Dan juga, Aku yakin kamu juga sudah tidak sabar untuk Task Ketiga",
      "Tidak seperti di Task Pertama dan Task Kedua, kamu di sini harus mengerjakan 10 trivia",
      "Poin yang didapatkan pun akan naik menjadi 200 poin setiap trivia terjawab benar",
      "Dan juga, jika kamu bisa menjawabnya dengan cepat, maka kamu akan mendapat bonus",
      "Oh iya, satu lagi. Kamu gak akan bisa mengulangi task ini lagi. Jadi telitilah sebelum menjawab",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Hahahaha. Kalah", positive: "Wow, bagus" },
      type: ChallengeType.Trivia,
    },
  });

  await TriviaService.sync(challenge1, trivias.slice(0, 5)).then(() =>
    console.log("Syncing trivia to Challente 1")
  );
  await TriviaService.sync(challenge2, trivias.slice(5, 10)).then(() =>
    console.log("Syncing trivia to Challente 2")
  );
  await TriviaService.sync(challenge3, trivias.slice(10, 20)).then(() =>
    console.log("Syncing trivia to Challente 3")
  );

  const qr = await QrService.generate(4);

  const QrContents: QrContent[] = [
    { type: QrContentType.Stage, refId: stage.id },
    { type: QrContentType.Challenge, refId: challenge1.id },
    { type: QrContentType.Challenge, refId: challenge2.id },
    { type: QrContentType.Challenge, refId: challenge3.id },
  ];

  const qrs = await Promise.all(
    QrContents.map((content, i) =>
      QrService.update(qr[i].id, {
        content,
        location: null,
        status: QrStatus.Draft,
      })
    )
  );

  qrs.forEach((item) => {
    console.log(`QR Assigned to ${item.content?.type}`);
  });

  console.log();
  console.log("Publishing...");

  await StageModel.updateOne(
    { _id: stage.id },
    {
      status: StageStatus.Publish,
    }
  ).then(() => console.log("Stage published"));

  await ChallengeModel.updateMany(
    { _id: { $in: [challenge1.id, challenge2.id, challenge3.id] } },
    {
      status: ChallengeStatus.Publish,
    }
  ).then(() => console.log("Challenges published"));

  await QrModel.updateMany(
    { content: { $ne: null } },
    { status: QrStatus.Publish }
  ).then((res) => {
    console.log("QRs published");
    return res;
  });

  const codes = await QrService.list(
    await QrListParamsValidator.validateAsync({ status: QrStatus.Publish })
  );
  console.log("codes");
  console.log(
    codes.list
      .map((item, i) => `${i + 1}. ${item.code} ${item.content?.type}`)
      .join("\n")
  );

  console.log("Bye...");
  await db.disconnect();

  return;
};

seeders();

export default seeders;
