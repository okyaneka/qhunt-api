import { TriviaPayload } from "qhunt-lib/models/TriviaModel";

const trivias: TriviaPayload[] = [
  {
    question: "1(1x1)-1?",
    options: [
      { isCorrect: false, point: 0, text: "-1" },
      { isCorrect: false, point: 0, text: "1" },
      { isCorrect: false, point: 0, text: "2" },
      { isCorrect: true, point: 100, text: "0" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question: "(2+1)2?",
    options: [
      { isCorrect: false, point: 0, text: "2" },
      { isCorrect: false, point: 0, text: "4" },
      { isCorrect: true, point: 100, text: "6" },
      { isCorrect: false, point: 0, text: "1" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question: "1+1:1?",
    options: [
      { isCorrect: false, point: 0, text: "1" },
      { isCorrect: true, point: 100, text: "2" },
      { isCorrect: false, point: 0, text: "3" },
      { isCorrect: false, point: 0, text: "0" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question: "1-1:1?",
    options: [
      { isCorrect: false, point: 0, text: "1" },
      { isCorrect: false, point: 0, text: "2" },
      { isCorrect: false, point: 0, text: "3" },
      { isCorrect: true, point: 100, text: "0" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question: "6:2(1+2)?",
    options: [
      { isCorrect: false, point: 0, text: "1" },
      { isCorrect: true, point: 100, text: "9" },
      { isCorrect: false, point: 0, text: "3" },
      { isCorrect: false, point: 0, text: "6" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  //
  {
    question: "Berikut ini adalah hewan laut yang bertelur, kecuali?",
    options: [
      { isCorrect: false, point: 0, text: "Hiu" },
      { isCorrect: false, point: 0, text: "Tuna" },
      { isCorrect: true, point: 100, text: "Orca" },
      { isCorrect: false, point: 0, text: "Kerapu" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question:
      "Jarum panjang sebuah jam dinding menunjukan ke arah angka 10 dan jarum pendeknya mendekati angka 12. Pukul berapakah yang ditunjukkan jam tersebut?",
    options: [
      { isCorrect: false, point: 0, text: "12:50" },
      { isCorrect: false, point: 0, text: "12:10" },
      { isCorrect: true, point: 100, text: "11:50" },
      { isCorrect: false, point: 0, text: "11:10" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question: "Gas yang paling banyak tersebar di atmosfer adalah?",
    options: [
      { isCorrect: false, point: 0, text: "Oksigen" },
      { isCorrect: true, point: 100, text: "Nitrogen" },
      { isCorrect: false, point: 0, text: "Hidrogen" },
      { isCorrect: false, point: 0, text: "Ozon" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question:
      "Setetes darah diberikan reagen Anti-A dan Anti-B tidak menggumpal, apa golongan darah tersebut?",
    options: [
      { isCorrect: false, point: 0, text: "A" },
      { isCorrect: false, point: 0, text: "B" },
      { isCorrect: false, point: 0, text: "AB" },
      { isCorrect: true, point: 100, text: "O" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question: "Planet terkecil kedua dalam tata surya adalah?",
    options: [
      { isCorrect: false, point: 0, text: "Venus" },
      { isCorrect: false, point: 0, text: "Bumi" },
      { isCorrect: true, point: 100, text: "Mars" },
      { isCorrect: false, point: 0, text: "Merkurius" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  //
  {
    question:
      "Tari Gong merupakan tarian khas suku Dayak yang berasal dari Kalimantan Timur. Tarian ini diabadikan dalam uang kertas. Pada nominal berapakah tarian ini?",
    options: [
      { isCorrect: false, point: 0, text: "10.000" },
      { isCorrect: true, point: 100, text: "20.000" },
      { isCorrect: false, point: 0, text: "50.000" },
      { isCorrect: false, point: 0, text: "5000" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question:
      "Batam terletak di provinsi Kepulauan Riau. Sebagai provinsi kepulauan, Kep. Riau memiliki banyak pulau. Pulau terbesar dari provinsi tersebut adalah?",
    options: [
      { isCorrect: false, point: 0, text: "Batam" },
      { isCorrect: false, point: 0, text: "Anambas" },
      { isCorrect: false, point: 0, text: "Karimun" },
      { isCorrect: true, point: 100, text: "Bintan" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question: "Provinsi paling luas di pulau jawa adalah?",
    options: [
      { isCorrect: false, point: 0, text: "DKI Jakarta" },
      { isCorrect: false, point: 0, text: "Jawa Barat" },
      { isCorrect: true, point: 100, text: "Jawa Tengah" },
      { isCorrect: false, point: 0, text: "Jawa Timur" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question:
      "Indonesia merupakan negara kepulauan, sebagai negara kepulauan Indonesia memiliki garis pantai terpanjang kedua di dunia. Namun ada satu provinsi di Indonesia yang tidak memiliki garis pantai, provinsi manakah itu?",
    options: [
      { isCorrect: false, point: 0, text: "Kalimantan Tengah" },
      { isCorrect: false, point: 0, text: "Sulawesi Tengah" },
      { isCorrect: true, point: 100, text: "Papua Pegunungan" },
      { isCorrect: false, point: 0, text: "Jambi" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question:
      "Dalam film Finding Nemo, ayah Nemo bertemu dengan sekelompok penyu. Siapakah nama ayah Nemo?",
    options: [
      { isCorrect: false, point: 0, text: "Crush" },
      { isCorrect: true, point: 100, text: "Marlin" },
      { isCorrect: false, point: 0, text: "Squirt" },
      { isCorrect: false, point: 0, text: "Dori" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question:
      "Manakah dari provinsi berikut yang memiliki luas laut palin luas?",
    options: [
      { isCorrect: true, point: 100, text: "Maluku" },
      { isCorrect: false, point: 0, text: "Bangka Belitung" },
      { isCorrect: false, point: 0, text: "Sulawesi Utara" },
      { isCorrect: false, point: 0, text: "Kepulauan Riau" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question:
      "Crayon Shinchan merupakan serial animasi jepang yang masih tayang sampai saat ini. Pada tahun berapakah serial Crayon Shinchan pertama mengudara?",
    options: [
      { isCorrect: false, point: 0, text: "1990" },
      { isCorrect: false, point: 0, text: "1991" },
      { isCorrect: true, point: 100, text: "1992" },
      { isCorrect: false, point: 0, text: "1993" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question:
      "Dalam beberapa seri dari film Disney ada seorang Cowboy yang terkenal, siapakah nama kuda Cowboy tersebut?",
    options: [
      { isCorrect: false, point: 0, text: "Woody" },
      { isCorrect: false, point: 0, text: "Buzz" },
      { isCorrect: false, point: 0, text: "Jessie" },
      { isCorrect: true, point: 100, text: "Bullseye" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question:
      "Selain Cut Nyak Dhien, siapakah pahlawan Aceh yang pernah diabadikan dalam uang rupiah?",
    options: [
      { isCorrect: true, point: 100, text: "Cut Nyak Meutia" },
      { isCorrect: false, point: 0, text: "Teuku Umar" },
      { isCorrect: false, point: 0, text: "Sultan Iskandar Muda" },
      { isCorrect: false, point: 0, text: "Sultan Mahmud Badaruddin II" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question: "10+1x0(5x2)?",
    options: [
      { isCorrect: false, point: 0, text: "0" },
      { isCorrect: true, point: 100, text: "10" },
      { isCorrect: false, point: 0, text: "20" },
      { isCorrect: false, point: 0, text: "11" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
];

export default trivias;
