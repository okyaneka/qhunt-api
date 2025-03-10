import { TriviaPayload } from "qhunt-lib";

const questions: Pick<TriviaPayload, "question" | "options">[] = [
  // Berhitung
  {
    question: "Berapa hasil 1+1x0?",
    options: [
      { text: "0", isCorrect: false, point: 0 },
      { text: "1", isCorrect: true, point: 100 },
      { text: "-1", isCorrect: false, point: 0 },
      { text: "2", isCorrect: false, point: 0 },
    ],
  },
  {
    question: "Berapa hasil 1(1x1)-1?",
    options: [
      { isCorrect: false, point: 0, text: "-1" },
      { isCorrect: false, point: 0, text: "1" },
      { isCorrect: false, point: 0, text: "2" },
      { isCorrect: true, point: 100, text: "0" },
    ],
  },
  {
    question: "Berapa hasil (2+1)2?",
    options: [
      { isCorrect: false, point: 0, text: "2" },
      { isCorrect: false, point: 0, text: "4" },
      { isCorrect: true, point: 100, text: "6" },
      { isCorrect: false, point: 0, text: "1" },
    ],
  },
  {
    question: "Berapa hasil 1+1:1?",
    options: [
      { isCorrect: false, point: 0, text: "1" },
      { isCorrect: true, point: 100, text: "2" },
      { isCorrect: false, point: 0, text: "3" },
      { isCorrect: false, point: 0, text: "0" },
    ],
  },
  {
    question: "Berapa hasil 6:2(1+2)?",
    options: [
      { isCorrect: false, point: 0, text: "1" },
      { isCorrect: true, point: 100, text: "9" },
      { isCorrect: false, point: 0, text: "3" },
      { isCorrect: false, point: 0, text: "6" },
    ],
  },
  // Sejarah
  {
    question:
      "Indonesia pernah dijajah oleh pangsa dagang besar dari belanda bernama VOC. Apa kepanjangan VOC?",
    options: [
      { isCorrect: true, point: 100, text: "Verenigde Oostindische Compagnie" },
      { isCorrect: false, point: 0, text: "Vereenigde Oostindische Compagnie" },
      { isCorrect: false, point: 0, text: "Vereenigde Oostindische Company" },
      { isCorrect: false, point: 0, text: "Verenigde Oostindische Company" },
    ],
  },
  {
    question:
      "Berikut merupakan negara-negara yang pernah menjajah Indonesia, kecuali?",
    options: [
      { isCorrect: false, point: 0, text: "Belanda" },
      { isCorrect: false, point: 0, text: "Jepang" },
      { isCorrect: false, point: 0, text: "Inggris" },
      { isCorrect: true, point: 100, text: "Jerman" },
    ],
  },
  {
    question:
      "Ir Soekarno merupakan presiden pertama Indonesia. Tanggal berapakah Ir Soekarno lahir?",
    options: [
      { isCorrect: true, point: 100, text: "6 Juni 1901" },
      { isCorrect: false, point: 0, text: "6 Juni 1902" },
      { isCorrect: false, point: 0, text: "6 Juni 1903" },
      { isCorrect: false, point: 0, text: "6 Juni 1904" },
    ],
  },
  {
    question: "Dimanakah Ir Soekarno lahir?",
    options: [
      { isCorrect: true, point: 100, text: "Blitar" },
      { isCorrect: false, point: 0, text: "Surabaya" },
      { isCorrect: false, point: 0, text: "Yogyakarta" },
      { isCorrect: false, point: 0, text: "Bandung" },
    ],
  },
  {
    question:
      "Sri Sultan Hamengkubuwono merupakan gelar yang dikasih kepada para raja Keraton Ngayogyakarta Hadiningrat. Berapakah jumlah raja yang pernah memerintah di Keraton Ngayogyakarta Hadiningrat?",
    options: [
      { isCorrect: false, point: 0, text: "IX" },
      { isCorrect: true, point: 100, text: "X" },
      { isCorrect: false, point: 0, text: "XI" },
      { isCorrect: false, point: 0, text: "XII" },
    ],
  },
  // Film
  {
    question:
      "Dalam film Finding Nemo, ayah Nemo bertemu dengan sekelompok penyu. Siapakah nama ayah Nemo?",
    options: [
      { isCorrect: false, point: 0, text: "Crush" },
      { isCorrect: true, point: 100, text: "Marlin" },
      { isCorrect: false, point: 0, text: "Squirt" },
      { isCorrect: false, point: 0, text: "Dori" },
    ],
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
  },
  {
    question:
      "Dalam film Up, siapakah nama karakter yang menjadi teman karib dari Carl?",
    options: [
      { isCorrect: true, point: 100, text: "Russel" },
      { isCorrect: false, point: 0, text: "Dug" },
      { isCorrect: false, point: 0, text: "Kevin" },
      { isCorrect: false, point: 0, text: "Charles" },
    ],
  },
  {
    question:
      "You Are the Apple of My Eye merupakan sebuah judul yang pernah dibuat di berbagai negara. Berikut negara yang pernah membuat judul film tersebut, kecuali?",
    options: [
      { isCorrect: false, point: 0, text: "Taiwan" },
      { isCorrect: true, point: 100, text: "Hongkong" },
      { isCorrect: false, point: 0, text: "Jepang" },
      { isCorrect: false, point: 0, text: "Korea" },
    ],
  },
  // General
  {
    question:
      "Bunga Raflesia merupakan bunga terbesar di dunia. Pada tahun berapa bunga ini ditemukan?",
    options: [
      { isCorrect: true, point: 100, text: "1818" },
      { isCorrect: false, point: 0, text: "1819" },
      { isCorrect: false, point: 0, text: "1918" },
      { isCorrect: false, point: 0, text: "1919" },
    ],
  },
  {
    question:
      "Candi Borobudur dan Candi Prambanan merupakan beberapa candi besar di Indonesia. Terletak dimanakah candi Borobudur?",
    options: [
      { isCorrect: false, point: 0, text: "Yogyakarta" },
      { isCorrect: true, point: 100, text: "Magelang" },
      { isCorrect: false, point: 0, text: "Klaten" },
      { isCorrect: false, point: 0, text: "Solo" },
    ],
  },
  {
    question:
      "Tari Gong merupakan tarian khas suku Dayak yang berasal dari Kalimantan Timur. Tarian ini diabadikan dalam uang kertas. Pada nominal berapakah tarian ini?",
    options: [
      { isCorrect: false, point: 0, text: "10.000" },
      { isCorrect: true, point: 200, text: "20.000" },
      { isCorrect: false, point: 0, text: "50.000" },
      { isCorrect: false, point: 0, text: "5000" },
    ],
  },
  {
    question:
      "Batam terletak di provinsi Kepulauan Riau. Sebagai provinsi kepulauan, Kep. Riau memiliki banyak pulau. Pulau terbesar dari provinsi tersebut adalah?",
    options: [
      { isCorrect: false, point: 0, text: "Batam" },
      { isCorrect: false, point: 0, text: "Anambas" },
      { isCorrect: false, point: 0, text: "Karimun" },
      { isCorrect: true, point: 200, text: "Bintan" },
    ],
  },
  {
    question: "Manakah dari provinsi berikut yang memiliki lautan paling luas?",
    options: [
      { isCorrect: true, point: 200, text: "Maluku" },
      { isCorrect: false, point: 0, text: "Bangka Belitung" },
      { isCorrect: false, point: 0, text: "Sulawesi Utara" },
      { isCorrect: false, point: 0, text: "Kepulauan Riau" },
    ],
  },
];

const starter: Pick<TriviaPayload, "question" | "options">[] = [
  {
    question: "Rose is a red, violets are?",
    options: [{ isCorrect: true, point: 100, text: "Blue" }],
  },
  //
  {
    question: "Benarkah serangga bernafas dengan paru-paru?",
    options: [
      { isCorrect: false, point: 0, text: "Benar" },
      { isCorrect: true, point: 100, text: "Salah" },
    ],
  },
  {
    question: "Benarkah bumi berbentuk bulat?",
    options: [
      { isCorrect: true, point: 100, text: "Benar" },
      { isCorrect: false, point: 0, text: "Salah" },
    ],
  },
  {
    question: "Benarkah bumi planet terbesar kelima di tatasurya?",
    options: [
      { isCorrect: true, point: 100, text: "Benar" },
      { isCorrect: false, point: 0, text: "Salah" },
    ],
  },
  //
  {
    question: "Seberapa yakin kamu bisa menggunakan aplikasi ini?",
    options: [
      { isCorrect: true, point: 100, text: "Sangat Yakin" },
      { isCorrect: true, point: 100, text: "Yakin" },
      { isCorrect: true, point: 100, text: "Kurang Yakin" },
      { isCorrect: true, point: 100, text: "Tidak Yakin" },
    ],
  },
  {
    question: "Seberapa yakin kamu bisa merekomendasikan aplikasi ini?",
    options: [
      { isCorrect: true, point: 100, text: "Sangat Yakin" },
      { isCorrect: true, point: 100, text: "Yakin" },
      { isCorrect: true, point: 100, text: "Kurang Yakin" },
      { isCorrect: true, point: 100, text: "Tidak Yakin" },
    ],
  },
  {
    question: "Seberapa yakin kamu akan menggunakan aplikasi ini?",
    options: [
      { isCorrect: true, point: 100, text: "Sangat Yakin" },
      { isCorrect: true, point: 100, text: "Yakin" },
      { isCorrect: true, point: 100, text: "Kurang Yakin" },
      { isCorrect: true, point: 100, text: "Tidak Yakin" },
    ],
  },
];

export const StartedQuestion = starter.map<TriviaPayload>((item) => {
  return {
    allowMultiple: false,
    feedback: { negative: "Ouch", positive: "Nice" },
    options: item.options,
    question: item.question,
  };
});

export const Trivias1: TriviaPayload[] = Array.from({
  length: 5,
}).map<TriviaPayload>((_, i) => ({
  allowMultiple: false,
  feedback: { negative: "Ouch", positive: "Nice" },
  options: questions[i].options,
  question: questions[i].question,
}));

export const Trivias2: TriviaPayload[] = Array.from({
  length: 5,
}).map<TriviaPayload>((_, i) => ({
  allowMultiple: false,
  feedback: { negative: "Ouch", positive: "Nice" },
  options: questions[i + 5].options,
  question: questions[i + 5].question,
}));

export const Trivias3: TriviaPayload[] = Array.from({
  length: 5,
}).map<TriviaPayload>((_, i) => ({
  allowMultiple: false,
  feedback: { negative: "Ouch", positive: "Nice" },
  options: questions[i + 5 * 2].options,
  question: questions[i + 5 * 2].question,
}));

export const Trivias4: TriviaPayload[] = Array.from({
  length: 5,
}).map<TriviaPayload>((_, i) => ({
  allowMultiple: false,
  feedback: { negative: "Ouch", positive: "Nice" },
  options: questions[i + 5 * 3].options,
  question: questions[i + 5 * 3].question,
}));

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
      { isCorrect: true, point: 200, text: "20.000" },
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
      { isCorrect: true, point: 200, text: "Bintan" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question: "Provinsi paling luas di pulau jawa adalah?",
    options: [
      { isCorrect: false, point: 0, text: "DKI Jakarta" },
      { isCorrect: false, point: 0, text: "Jawa Barat" },
      { isCorrect: true, point: 200, text: "Jawa Tengah" },
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
      { isCorrect: true, point: 200, text: "Papua Pegunungan" },
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
      { isCorrect: true, point: 200, text: "Marlin" },
      { isCorrect: false, point: 0, text: "Squirt" },
      { isCorrect: false, point: 0, text: "Dori" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question: "Manakah dari provinsi berikut yang memiliki lautan paling luas?",
    options: [
      { isCorrect: true, point: 200, text: "Maluku" },
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
      { isCorrect: true, point: 200, text: "1992" },
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
      { isCorrect: true, point: 200, text: "Bullseye" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
  {
    question:
      "Selain Cut Nyak Dhien, siapakah pahlawan Aceh yang pernah diabadikan dalam uang rupiah?",
    options: [
      { isCorrect: true, point: 200, text: "Cut Nyak Meutia" },
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
      { isCorrect: true, point: 200, text: "10" },
      { isCorrect: false, point: 0, text: "20" },
      { isCorrect: false, point: 0, text: "11" },
    ],
    allowMultiple: false,
    feedback: { negative: "Aduh", positive: "Nice" },
  },
];

export default trivias;
