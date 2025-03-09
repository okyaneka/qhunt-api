import { PhotoHuntPayload } from "qhunt-lib";

const hints: string[] = [
  "Di bawah kursi",
  "Di bawah meja",
  "Di papan tulis",
  "Ada di belakang pintu",
  "Ada di tembok",
];

export const Photohunt1: PhotoHuntPayload[] = Array.from(
  { length: 5 },
  (_, i) => ({
    hint: hints[i],
    feedback: "Nice 👍",
    score: 100,
  })
);

const photohunts: PhotoHuntPayload[] = [
  { hint: "Cari aja sampai ketemu!", feedback: "Keren", score: 100 },
  { hint: "Cari aja sampai ketemu!", feedback: "Keren", score: 100 },
  { hint: "Cari aja sampai ketemu!", feedback: "Keren", score: 100 },
  { hint: "Cari aja sampai ketemu!", feedback: "Keren", score: 100 },
  { hint: "Cari aja sampai ketemu!", feedback: "Keren", score: 100 },
  { hint: "Cari aja sampai ketemu!", feedback: "Keren", score: 100 },
  { hint: "Cari aja sampai ketemu!", feedback: "Keren", score: 100 },
  { hint: "Cari aja sampai ketemu!", feedback: "Keren", score: 100 },
  { hint: "Cari aja sampai ketemu!", feedback: "Keren", score: 100 },
  { hint: "Cari aja sampai ketemu!", feedback: "Keren", score: 100 },
];

export default photohunts;
