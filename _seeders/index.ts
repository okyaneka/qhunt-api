import dayjs from "dayjs";
import {
  ChallengeService,
  PhotoHuntService,
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
import { StageStatus, StageStatusValues } from "qhunt-lib/models/StageModel";
import {
  ChallengeStatus,
  ChallengeStatusValues,
  ChallengeType,
  ChallengeTypeValues,
} from "qhunt-lib/models/ChallengeModel";
import {
  Qr,
  QrContent,
  QrContentType,
  QrStatus,
  QrStatusValues,
} from "qhunt-lib/models/QrModel";
import trivias from "./trivias";
import { QrListParamsValidator } from "qhunt-lib/validators/QrValidator";
import photohunts from "./photohunts";

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

  await QrService.generate(10).then(() => console.log("10 QR Generated"));

  // const challenges =  await Promise.all()
  const stage = await StageService.create({
    name: "Kerja kerjaan",
    contents: [],
    settings: {
      canDoRandomChallenges: false,
      canStartFromChallenges: true,
      periode: {
        startDate: dayjs("2024-01-01").toDate(),
        endDate: dayjs("2024-01-30").toDate(),
      },
    },
    status: StageStatusValues.Draft,
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
    status: ChallengeStatusValues.Draft,
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
      type: ChallengeTypeValues.Trivia,
    },
  });

  const challenge2 = await ChallengeService.create({
    name: "Task 2",
    stageId: stage.id,
    status: ChallengeStatusValues.Draft,
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
      type: ChallengeTypeValues.Trivia,
    },
  });

  const challenge3 = await ChallengeService.create({
    name: "Task 3",
    stageId: stage.id,
    status: ChallengeStatusValues.Draft,
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
      type: ChallengeTypeValues.Trivia,
    },
  });
  const challenge4 = await ChallengeService.create({
    name: "Task 4",
    stageId: stage.id,
    status: ChallengeStatusValues.Draft,
    storyline: [
      "Task Keempat",
      "Kalian cukup cari barang yang ada stiker kode QR nya",
      "Mudah kan?",
      "Tapi kamu harus bisa menemukannya dalam waktu 5 menut",
      "Setiap barang yang ditemukan akan mendapatkan 100 poin",
      "Jika kamu bisa menemukan semua barang, kamu juga akan mendapatkan bonus",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Hahahaha. Kalah", positive: "Wow, bagus" },
      type: ChallengeTypeValues.PhotoHunt,
    },
  });

  await TriviaService.sync(challenge1.id, trivias.slice(0, 5)).then(() =>
    console.log("Syncing trivia to Challente 1")
  );
  await TriviaService.sync(challenge2.id, trivias.slice(5, 10)).then(() =>
    console.log("Syncing trivia to Challente 2")
  );
  await TriviaService.sync(challenge3.id, trivias.slice(10, 20)).then(() =>
    console.log("Syncing trivia to Challente 3")
  );
  await PhotoHuntService.sync(challenge4.id, photohunts).then(() =>
    console.log("Syncing photo hunt to Challente 4")
  );

  const qr = await QrService.generate(5);

  const QrContents: QrContent[] = [
    { type: QrContentType.Stage, refId: stage.id },
    { type: QrContentType.Challenge, refId: challenge1.id },
    { type: QrContentType.Challenge, refId: challenge2.id },
    { type: QrContentType.Challenge, refId: challenge3.id },
    { type: QrContentType.Challenge, refId: challenge4.id },
  ];

  const qrs = await Promise.all(
    QrContents.map((content, i) =>
      QrService.update(qr[i].id, {
        content,
        location: null,
        status: QrStatusValues.Draft,
      })
    )
  );

  qrs.forEach((item: Qr) => {
    console.log(`QR Assigned to ${item.content?.type}`);
  });

  console.log();
  console.log("Publishing...");

  await StageModel.updateOne(
    { _id: stage.id },
    {
      status: StageStatusValues.Publish,
    }
  ).then(() => console.log("Stage published"));

  await ChallengeModel.updateMany(
    {
      _id: {
        $in: [challenge1.id, challenge2.id, challenge3.id, challenge4.id],
      },
    },
    {
      status: ChallengeStatusValues.Publish,
    }
  ).then(() => console.log("Challenges published"));

  await QrModel.updateMany(
    { content: { $ne: null } },
    { status: QrStatusValues.Publish }
  ).then((res) => {
    console.log("QRs published");
    return res;
  });

  const codes = await QrService.list(
    await QrListParamsValidator.validateAsync({
      status: QrStatusValues.Publish,
    })
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
