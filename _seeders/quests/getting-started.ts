import {
  ChallengeService,
  StageService,
  TriviaService,
} from "qhunt-lib/services";
import {
  StartedQuestion,
  Trivias1,
  Trivias2,
  Trivias3,
  Trivias4,
} from "../trivias";
import { Photohunt1 } from "../photohunts";
import {
  CHALLENGE_STATUS,
  CHALLENGE_TYPES,
  STAGE_STATUS,
} from "qhunt-lib/constants";

const GettingStarted = async () => {
  const quest = await StageService.create({
    contents: [],
    epilogue: [],
    prologue: [],
    settings: {
      unlockAll: true,
      canDoRandomChallenges: false,
      canStartFromChallenges: false,
      periode: null,
    },
    status: STAGE_STATUS.Draft,
    name: "Awal Perjalanan",
    storyline: [
      "Selamat datang Petualang!",
      "Selamat datang di dunia Utaraa!",
      "Sebelum memulai petualanganmu, Aku ingin memberikan sedikit informasi tentang cara menggunakan Utaraa",
      "Jadi tolong untuk disimak dengan baik",
      "Oke 👌?",
      "Utaraa merupakan sebuah platform game petualangan berbasis real-world interactive",
      "Yang mengajak pemain untuk menjelajah, menyelesaikan quest seru, dan menaklukkan berbagai tantangan di dunia nyata!",
      "Setiap quest memiliki beberapa tantangan",
      "Dan setiap tantangan secara bawaan masih terkunci",
      "Untuk membukanya, kamu harus mencari kode QR yang tersebar di sekitarmu kemudian memindainya",
      "Setiap tantangan yang kamu kerjakan dan selesai, kamu akan mendapatkan poin",
      "Poin yang kamu dapatkan akan diakumulasikan menjadi skor akhir",
      "Yang kemudian akan menentukan posisimu di leaderboard",
      "Ini adalah quest Awal Perjalananmu. Jadi Aku akan membuka semua tantangan untukmu!",
      "Aku mengucapkan selamat berpetualang dan semoga beruntung!",
    ],
  });

  const challenge1 = await ChallengeService.create({
    name: "Langkah Pertama",
    stageId: quest.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Pertama-tama, Aku akan memberikan tantangan yang sederhana",
      "Kamu cukup menjawab 1 pertanyaan trivia",
      "Setiap pertanyaan yang terjawab benar akan mendapatkan 100 poin",
      "Jika kamu bisa menjawabnya dengan cepat, kamu akan mendapat bonus",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Eh salah 🤭", positive: "Wow, bagus" },
      type: CHALLENGE_TYPES.Trivia,
    },
  });

  const challenge2 = await ChallengeService.create({
    name: "Langkah Petualangan",
    stageId: quest.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Kerja bagus Petualang!",
      "Sepertinya kamu dengan mudah menyelesaikan Langkah Pertamamu",
      "Selanjutnya, untuk menyelesaikan Langkah Petualangan",
      "Kamu harus menjawab 3 pertanyaan trivia",
      "Setiap pertanyaan yang terjawab benar akan mendapatkan 100 poin",
      "Jika kamu bisa menjawabnya dengan cepat, kamu akan mendapat bonus",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Eh salah 🤭", positive: "Wow, bagus" },
      type: CHALLENGE_TYPES.Trivia,
    },
  });

  const challenge3 = await ChallengeService.create({
    name: "Langkah Kejayaan",
    stageId: quest.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Kerja bagus Petualang!",
      "Aku bangga dengan pencapaianmu",
      "Sepertinya kamu sudah siap untuk berpetualang lebih jauh",
      "Satu langkah lagi untuk menuju kejayaan",
      "Kamu harus menjawab 3 pertanyaan trivia",
      "Setiap pertanyaan yang terjawab benar akan mendapatkan 100 poin",
      "Jika kamu bisa menjawabnya dengan cepat, kamu akan mendapat bonus",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Eh salah 🤭", positive: "Wow, bagus" },
      type: CHALLENGE_TYPES.Trivia,
    },
  });

  await TriviaService.sync(challenge1.id, StartedQuestion.slice(0, 1));
  console.log("Syncing trivia to", challenge1.name);

  await TriviaService.sync(challenge2.id, StartedQuestion.slice(1, 3));
  console.log("Syncing trivia to", challenge2.name);

  await TriviaService.sync(challenge3.id, StartedQuestion.slice(4, 7));
  console.log("Syncing trivia to", challenge3.name);

  console.log();
  console.log("Publishing...");

  await StageService.publish(quest.id);
  console.log("Stage published");
};

export default GettingStarted;
