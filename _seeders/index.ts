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
  UserStageModel,
  UserTriviaModel,
} from "qhunt-lib/models";
import {
  QR_STATUS,
  STAGE_STATUS,
  CHALLENGE_STATUS,
  QR_CONTENT_TYPES,
  CHALLENGE_TYPES,
  Qr,
  QrContent,
} from "qhunt-lib";
import trivias from "./trivias";
import { QrListParamsValidator } from "qhunt-lib/validators/qr";
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

  await QrService.generate(100).then(() => console.log("100 QR Generated"));

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
    status: STAGE_STATUS.Draft,
    storyline: [
      "Ah",
      "Menjalani rutinitas yang membosankan",
      "Daripada ngeluh terus",
      "Mari kita main",
    ],
  });

  const challenge1 = await ChallengeService.create({
    name: "Tantangan 1",
    stageId: stage.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Tantangan Pertama",
      "Tenang, tantangan ini gak susah-susah amat kok",
      "Dalam tantangan ini, kamu cuma dituntut untuk mengerjakan 5 trivia singkat",
      "Setiap trivia yang terjawab benar akan mendapatkan poin 100",
      "Tidak hanya itu, jika kamu bisa menjawabnya dengan cepat maka kamu akan mendapat bonus",
      "Oh iya, satu lagi. Kamu gak akan bisa mengulangi tantangan ini lagi. Jadi telitilah sebelum menjawab",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Hahahaha. Kalah", positive: "Wow, bagus" },
      type: CHALLENGE_TYPES.Trivia,
    },
  });

  const challenge2 = await ChallengeService.create({
    name: "Tantangan 2",
    stageId: stage.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Tantangan Kedua",
      "Kalau kamu sudah bisa membuka tantangan ini artinya kamu sudah mengerjakan Tantangan Pertama",
      "Gimana menurutmu?",
      "Asyik kan?",
      "Tantangan Kedua ini gak kalah asyik",
      "Seperti di Tantangan Pertama, kamu cuma cukup mengerjakan 5 trivia singkat",
      "Setiap trivia yang terjawab benar akan mendapatkan poin 100",
      "Tidak hanya itu, jika kamu bisa menjawabnya dengan cepat maka kamu akan mendapat bonus",
      "Oh iya, satu lagi. Kamu gak akan bisa mengulangi tantangan ini lagi. Jadi telitilah sebelum menjawab",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Hahahaha. Kalah", positive: "Wow, bagus" },
      type: CHALLENGE_TYPES.Trivia,
    },
  });

  const challenge3 = await ChallengeService.create({
    name: "Tantangan 3",
    stageId: stage.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Tantangan Ketiga",
      "Wow, kamu sudah bisa melangkah sejauh ini",
      "Aku tidak akan menanyakan bagaimana Tantangan Pertama dan Tantangan Kedua karena Aku yakin Kamu sangat menikmatinya",
      "Dan juga, Aku yakin kamu juga sudah tidak sabar untuk Tantangan Ketiga",
      "Tidak seperti di Tantangan Pertama dan Tantangan Kedua, kamu di sini harus mengerjakan 10 trivia",
      "Poin yang didapatkan pun akan naik menjadi 200 poin setiap trivia terjawab benar",
      "Dan juga, jika kamu bisa menjawabnya dengan cepat, maka kamu akan mendapat bonus",
      "Oh iya, satu lagi. Kamu gak akan bisa mengulangi tantangan ini lagi. Jadi telitilah sebelum menjawab",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Hahahaha. Kalah", positive: "Wow, bagus" },
      type: CHALLENGE_TYPES.Trivia,
    },
  });
  const challenge4 = await ChallengeService.create({
    name: "Tantangan 4",
    stageId: stage.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Tantangan Keempat",
      "Kalian cukup cari barang yang ada stiker kode QR nya",
      "Mudah kan?",
      "Tapi kamu harus bisa menemukannya dalam waktu 5 menit",
      "Setiap barang yang ditemukan akan mendapatkan 100 poin",
      "Jika kamu bisa menemukan semua barang, kamu juga akan mendapatkan bonus",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Hahahaha. Kalah", positive: "Wow, bagus" },
      type: CHALLENGE_TYPES.PhotoHunt,
    },
  });
  const challenge5 = await ChallengeService.create({
    name: "Tantangan 5",
    stageId: stage.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Tantangan Kelima",
      "Kalian cukup cari barang yang ada stiker kode QR nya",
      "Mudah kan?",
      "Tapi kamu harus bisa menemukannya dalam waktu 5 menit",
      "Setiap barang yang ditemukan akan mendapatkan 100 poin",
      "Jika kamu bisa menemukan semua barang, kamu juga akan mendapatkan bonus",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Hahahaha. Kalah", positive: "Wow, bagus" },
      type: CHALLENGE_TYPES.PhotoHunt,
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
  await PhotoHuntService.sync(challenge4.id, photohunts.slice(0, 5)).then(() =>
    console.log("Syncing photo hunt to Challente 4")
  );
  await PhotoHuntService.sync(challenge5.id, photohunts.slice(5, 10)).then(() =>
    console.log("Syncing photo hunt to Challente 5")
  );

  const QrContents: QrContent[] = [
    { type: QR_CONTENT_TYPES.Stage, refId: stage.id },
    { type: QR_CONTENT_TYPES.Challenge, refId: challenge1.id },
    { type: QR_CONTENT_TYPES.Challenge, refId: challenge2.id },
    { type: QR_CONTENT_TYPES.Challenge, refId: challenge3.id },
    { type: QR_CONTENT_TYPES.Challenge, refId: challenge4.id },
    { type: QR_CONTENT_TYPES.Challenge, refId: challenge5.id },
  ];
  const qr = await QrService.generate(QrContents.length);

  const qrs = await Promise.all(
    QrContents.map((content, i) =>
      QrService.update(qr[i].id, {
        content,
        location: null,
        status: QR_STATUS.Draft,
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
      status: STAGE_STATUS.Publish,
    }
  ).then(() => console.log("Stage published"));

  await ChallengeModel.updateMany(
    {
      _id: {
        $in: [
          challenge1.id,
          challenge2.id,
          challenge3.id,
          challenge4.id,
          challenge5.id,
        ],
      },
    },
    {
      status: CHALLENGE_STATUS.Publish,
    }
  ).then(() => console.log("Challenges published"));

  await QrModel.updateMany(
    { content: { $ne: null } },
    { status: QR_STATUS.Publish }
  ).then((res) => {
    console.log("QRs published");
    return res;
  });

  const codes = await QrService.list(
    await QrListParamsValidator.validateAsync({
      status: QR_STATUS.Publish,
      limit: 100,
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
