/*
 * Checks the Indonesian copy against the rules in skills.md.
 *
 * The old rule ("localise, don't translate word-for-word") was true but
 * untestable, so nothing stopped English sentence rhythm from creeping in
 * wearing Indonesian words. These checks are the same rule with numbers on it.
 *
 * Reference points came from how Indonesian product copy actually reads:
 * Midtrans averages roughly 8-15 words a sentence, Mekari 12-18, and both
 * almost never use an em dash.
 *
 * Usage: node tools/check-id-copy.js
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const translations = eval(
  fs.readFileSync(path.join(root, "translations.js"), "utf8") + ";translations"
);
const id = translations.id;

const MAX_WORDS = 20; // a sentence longer than this is a paragraph in disguise
const MAX_AVG = 16;

// Constructions that only make sense because the English does.
const CALQUES = [
  [/berjalan di atas/i, 'harfiah "ran on" — pakai "bergantung pada" atau "dijalankan pakai"'],
  [/sepotong demi sepotong/i, 'harfiah "piece by piece" — pakai "bertahap" atau "satu per satu"'],
  [/duduk di antara/i, 'harfiah "sits between" — pakai "menjembatani"'],
  [/\buzur\b/i, '"uzur" untuk orang, bukan software'],
  [/di penghujung hari/i, 'harfiah "at the end of the day"'],
  [/pada akhirnya,/i, 'sering sisa "ultimately," dari bahasa Inggris'],
];

// Text-bearing keys only; labels and nav items are meant to be terse.
const isProse = (k) =>
  /\.(desc|lead|body|p1|p2|p3|intro|note|tier1_note)$/.test(k) ||
  k === "work.tier1_note";

const strip = (s) =>
  s.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, "'").replace(/\s+/g, " ").trim();

let problems = 0;
const lengths = [];

for (const [key, raw] of Object.entries(id)) {
  const text = strip(raw);

  for (const [re, why] of CALQUES) {
    if (re.test(text)) {
      console.log(`  X ${key}: ${why}`);
      problems++;
    }
  }

  // Em dashes: English punctuation habit, rare in Indonesian product copy.
  const dashes = (text.match(/—/g) || []).length;
  if (dashes) {
    console.log(`  X ${key}: ${dashes} em dash — ganti koma atau titik`);
    problems++;
  }

  // Software referred to as a person.
  if (/\b[Dd]ia (menyadari|bersuara|mengejar|menampung|duduk|menyapa)/.test(text)) {
    console.log(`  X ${key}: software disebut "dia" — tulis langsung tindakannya`);
    problems++;
  }

  if (!isProse(key)) continue;

  const sentences = text.split(/(?<=[.!?])\s+/).filter((s) => s.length > 1);
  for (const s of sentences) {
    const n = s.split(/\s+/).length;
    lengths.push(n);
    if (n > MAX_WORDS) {
      console.log(`  X ${key}: kalimat ${n} kata (maks ${MAX_WORDS}) — "${s.slice(0, 55)}..."`);
      problems++;
    }
  }

  // Every sentence opening the same way reads like a list of I-did-this.
  const saya = sentences.filter((s) => /^Saya\b/.test(s)).length;
  if (sentences.length >= 4 && saya / sentences.length > 0.6) {
    console.log(`  X ${key}: ${saya}/${sentences.length} kalimat dibuka "Saya" — variasikan`);
    problems++;
  }
}

const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
console.log(`\nkalimat prosa   : ${lengths.length}`);
console.log(`rata-rata kata  : ${avg.toFixed(1)} (target <= ${MAX_AVG})`);
console.log(`terpanjang      : ${Math.max(...lengths)} kata`);

if (avg > MAX_AVG) {
  console.log(`  X rata-rata terlalu panjang`);
  problems++;
}

console.log(problems ? `\n${problems} masalah` : `\nOK copy ID lolos semua aturan`);
process.exit(problems ? 1 : 0);
