import {
  ChallengeService,
  PhotoHuntService,
  StageService,
  TriviaService,
} from "qhunt-lib/services";
import { Trivias1, Trivias2, Trivias3, Trivias4 } from "../trivias";
import { Photohunt1 } from "../photohunts";
import {
  CHALLENGE_STATUS,
  CHALLENGE_TYPES,
  STAGE_STATUS,
} from "qhunt-lib/constants";
import dayjs from "dayjs";

const SebelumFajar = async () => {
  const stage = await StageService.create({
    epilogue: [],
    prologue: [],
    contents: [],
    settings: {
      unlockAll: false,
      canDoRandomChallenges: false,
      canStartFromChallenges: true,
      periode: {
        startDate: dayjs("2024-03-10").toDate(),
        endDate: dayjs("2024-03-14").toDate(),
      },
    },
    status: STAGE_STATUS.Draft,
    name: "[TEST] Sebelum Fajar",
    storyline: [
      "Langit masih gelap. Hanya desiran angin yang terdengar",
      "Detik terus berdetak, waktu semakin menipis",
      "Tugas ini harus diselesaikan",
      "Apakah kamu bisa menyelesaikannya?",
      "Inilah dia. [TEST] Sebelum Fajar",
    ],
  });

  const challenge1 = await ChallengeService.create({
    name: "4:00 AM - Menghitung Mundur",
    stageId: stage.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Waktu menunjukkan pukul 4:00 AM",
      "Kamu harus berhitung di sini",
      "Selama 5 menit, kamu harus bisa menyelesaikan 5 pertanyaan trivia",
      "Topik trivia adalah tentang berhitung (sederhana)",
      "Setiap pertanyaan yang terjawab benar akan mendapatkan 100 poin",
      "Jika kamu bisa menjawabnya dengan cepat, kamu akan mendapat bonus",
      "Dan satu hal. Kamu gak akan bisa mengulangi tantangan ini lagi. Jadi telitilah sebelum menjawab",
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
    name: "4:20 AM - Memori",
    stageId: stage.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Waktu menunjukkan pukul 4:20 AM",
      "Kamu harus mengingat di sini",
      "Akan ada 5 pertanyaan tentang sejarah besar yang pernah terjadi di dunia",
      "Selama 5 menit, kamu harus bisa menjawabnya",
      "Setiap pertanyaan yang terjawab benar akan mendapatkan 100 poin",
      "Jika kamu bisa menjawabnya dengan cepat, kamu akan mendapat bonus",
      "Dan satu hal. Kamu gak akan bisa mengulangi tantangan ini lagi. Jadi telitilah sebelum menjawab",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Hehe 🤭", positive: "Wow, bagus" },
      type: CHALLENGE_TYPES.Trivia,
    },
  });

  const challenge3 = await ChallengeService.create({
    name: "4:40 AM - Pencarian",
    stageId: stage.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Waktu menunjukkan pukul 4:40 AM",
      "Kamu harus mencari di sini",
      "Tantangan ini akan sedikit berbeda",
      "Terdapat beberapa barang mempunyai kode QR khusus yang harus kamu cari",
      "Total ada 5 barang yang tersebar",
      "Selama 10 menit, kamu harus bisa menemukan semuanya",
      "Setiap barang yang ditemukan akan mendapatkan 100 poin",
      "Akan ada bonus skor jika kamu bisa menemukan semuanya",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 10 * 60,
      feedback: { negative: "Hahahaha. Kalah", positive: "Good" },
      type: CHALLENGE_TYPES.PhotoHunt,
    },
  });

  const challenge4 = await ChallengeService.create({
    name: "5:30 AM - Layar Perak",
    stageId: stage.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Waktu menunjukkan pukul 5:30 AM",
      "Memori memanggil tentang apa yang kamu lihat semalam",
      "Kamu harus menjawab semua hal tentang layar perak mancanegara",
      "Selama 5 menit, kamu harus bisa menyelesaikan 5 pertanyaan trivia tentang perfilman",
      "Setiap pertanyaan yang terjawab benar akan mendapatkan 100 poin",
      "Jika kamu bisa menjawabnya dengan cepat, kamu akan mendapat bonus",
      "Dan satu hal. Kamu gak akan bisa mengulangi tantangan ini lagi. Jadi telitilah sebelum menjawab",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Hahahaha. Salah", positive: "Keren" },
      type: CHALLENGE_TYPES.Trivia,
    },
  });

  const challenge5 = await ChallengeService.create({
    name: "5:59 AM - Pagi",
    stageId: stage.id,
    status: CHALLENGE_STATUS.Draft,
    storyline: [
      "Waktu sudah habis",
      "Sebenarnya. Inilah tantangan terakhir yang harus kamu selesaikan",
      "5 pertanyaan tentang pengetahuan umum di Indonesia",
      "Kamu harus bisa menyelesaikannya dalam waktu 5 menit",
      "Setiap pertanyaan yang terjawab benar akan mendapatkan 100 poin",
      "Jika kamu bisa menjawabnya dengan cepat, maka kamu akan mendapat bonus",
      "Satu hal, kamu tidak bisa mengulangi tantangan ini. Jadi telitilah sebelum menjawab",
      "Apakah kamu sudah siap?",
    ],
    settings: {
      clue: "",
      duration: 5 * 60,
      feedback: { negative: "Hmm 🧐", positive: "Nice 👍" },
      type: CHALLENGE_TYPES.Trivia,
    },
  });

  await TriviaService.sync(challenge1.id, Trivias1).then(() =>
    console.log("Syncing trivia to Challente 1")
  );
  await TriviaService.sync(challenge2.id, Trivias2).then(() =>
    console.log("Syncing trivia to Challente 2")
  );
  await PhotoHuntService.sync(challenge3.id, Photohunt1).then(() =>
    console.log("Syncing trivia to Challente 3")
  );
  await TriviaService.sync(challenge4.id, Trivias3).then(() =>
    console.log("Syncing photo hunt to Challente 4")
  );
  await TriviaService.sync(challenge5.id, Trivias4).then(() =>
    console.log("Syncing photo hunt to Challente 5")
  );

  console.log();

  console.log("Publishing...");
  await StageService.publish(stage.id);
  console.log("Stage published");
};

export default SebelumFajar;
