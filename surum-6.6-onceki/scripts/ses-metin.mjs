// Seslendirilecek metinleri hazırlar: her il, ilçe ve yer için Türkçe ve İngilizce okunacak metin.
// Çıktı: ses-metin/<il>.json  ->  [{ id, dil, metin }]   (id: il | ilce-<no> | <Wikidata Q>)
// Kullanım: node scripts/ses-metin.mjs [çıktı klasörü]
import fs from "node:fs";
import path from "node:path";

const VERI = "docs/data";
const CIKTI = process.argv[2] || "ses-metin";
fs.mkdirSync(CIKTI, { recursive: true });

// app.js'teki İngilizce ad çevirisini aynen kullan (uygulamada görünen adla aynı okunsun)
const app = fs.readFileSync("docs/app.js", "utf8");
const parca = app.slice(app.indexOf("const AD_EN = ["), app.indexOf("const adi = (p)"));
const adEn = new Function(parca + "; return adEn;")();

const enSade = (t) => (t || "").replace(/\s*\([^()]*\)/g, "").replace(/\s*\((?![^()]*\))[^()]*?;\s+(?=[a-z])/, " ").replace(/\s+([,.])/g, "$1");

// "II. Bayezid" -> "İkinci Bayezid", "XVI. yüzyıl" -> "On altıncı yüzyıl"
const ROMA = { I: 1, V: 5, X: 10, L: 50, C: 100 };
const BIR = ["", "birinci", "ikinci", "üçüncü", "dördüncü", "beşinci", "altıncı", "yedinci", "sekizinci", "dokuzuncu"];
const ON = ["", "onuncu", "yirminci", "otuzuncu"], ONK = ["", "on", "yirmi", "otuz"];
function sira(n) { const o = Math.floor(n / 10), b = n % 10; return b ? (ONK[o] ? ONK[o] + " " : "") + BIR[b] : ON[o]; }
function romaSayi(r) { let t = 0; for (let i = 0; i < r.length; i++) { const a = ROMA[r[i]], b = ROMA[r[i + 1]] || 0; t += a < b ? -a : a; } return t; }
const romaTr = (t) => t.replace(/(^|[\s,;:"“])([IVXL]{1,6})\.(?=\s)/g, (all, on, r) => {
  const n = romaSayi(r); if (!n || n > 39) return all;
  return on + sira(n);
});

// Kulağa doğal gelsin: parantezleri at, kısaltma ve birimleri açık yaz
function trOkunur(t) {
  return romaTr(t)
    .replace(/^\(İngilizce kaynaktan\) /, "")
    .replace(/\s*\([^()]*\)/g, "").replace(/\s*\[[^\]]*\]/g, "")
    .replace(/(^|[\s(])MÖ(?=[\s.,])/g, "$1milattan önce").replace(/(^|[\s(])M[ÖS]\.? ?(\d)/g, (a, b, c) => b + (a.includes("Ö") ? "milattan önce " : "milattan sonra ") + c)
    .replace(/\bMS\b/g, "milattan sonra")
    .replace(/(\d)\s*km²/g, "$1 kilometrekare").replace(/(\d)\s*m²/g, "$1 metrekare").replace(/(\d)\s*m³/g, "$1 metreküp")
    .replace(/(\d)\s*km\b/g, "$1 kilometre").replace(/(\d)\s*cm\b/g, "$1 santimetre").replace(/(\d)\s*m\b/g, "$1 metre").replace(/(\d)\s*ha\b/g, "$1 hektar")
    .replace(/\s*\d+°[\d′″'".,\s]*[KGNS]\.?,?\s?\d+°[\d′″'".,\s]*[DBEW]\b\.?/g, "")
    .replace(/(\d)\s*°C/g, "$1 derece").replace(/(\d)\s*°/g, "$1 derece")
    .replace(/\byy\.?/g, "yüzyıl").replace(/\bvb\.?/g, "ve benzeri").replace(/\bvs\.?/g, "ve saire").replace(/\bbkz\.?/gi, "")
    .replace(/\bHz\. ?/g, "Hazreti ").replace(/\bDr\. ?/g, "Doktor ").replace(/\bProf\. ?/g, "Profesör ").replace(/\bAv\. ?/g, "Avukat ")
    .replace(/\bT\.C\.\s?/g, "Türkiye Cumhuriyeti ").replace(/\bTBMM\b/g, "Türkiye Büyük Millet Meclisi")
    .replace(/\s*[\n\r]+\s*/g, " ").replace(/\s{2,}/g, " ").replace(/\s+([,.;:])/g, "$1").trim();
}
function enOkunur(t) {
  return enSade(t)
    .replace(/\s*\[[^\]]*\]/g, "")
    .replace(/(\d)\s*km²/g, "$1 square kilometres").replace(/(\d)\s*m²/g, "$1 square metres")
    .replace(/(\d)\s*km\b/g, "$1 kilometres").replace(/(\d)\s*m\b/g, "$1 metres").replace(/(\d)\s*°C/g, "$1 degrees Celsius")
    .replace(/\bc\. (?=\d)/g, "circa ").replace(/\s*(at )?\d+°[\d′″'".,\s]*[NS],?\s?\d+°[\d′″'".,\s]*[EW]\b/g, "")
    .replace(/\s*[\n\r]+\s*/g, " ").replace(/\s{2,}/g, " ").replace(/\s+([,.;:])/g, "$1").trim();
}
const nokta = (s) => (/[.!?]$/.test(s) ? s : s + ".");

let topTr = 0, topEn = 0, adet = 0;
for (const dosya of fs.readdirSync(path.join(VERI, "il")).sort()) {
  const d = JSON.parse(fs.readFileSync(path.join(VERI, "il", dosya), "utf8"));
  let en = null;
  try { en = JSON.parse(fs.readFileSync(path.join(VERI, "en", dosya), "utf8")); } catch (e) {}
  const ilceAd = (i) => (i >= 0 && d.ilceler[i] ? d.ilceler[i].ad.replace(/ \(.*\)$/, "") : "");
  const liste = [];
  const ekle = (id, dil, metin) => { if (!metin) return; liste.push({ id, dil, metin }); if (dil === "tr") topTr += metin.length; else topEn += metin.length; adet++; };

  // İl
  if (d.m) ekle("il", "tr", nokta(d.ad) + " " + trOkunur(d.m));
  if (en && en.m) ekle("il", "en", nokta(d.ad) + " " + enOkunur(en.m));
  // İlçeler (yalnız Türkçe metin var)
  d.ilceler.forEach((z, i) => { if (z.m) ekle("ilce-" + i, "tr", nokta(ilceAd(i)) + " " + trOkunur(z.m)); });
  // Yerler: uygulamadaki detay metniyle aynı kurallar (openDetail)
  for (const y of d.yerler) {
    const ilce = ilceAd(y.i), ilceYaz = ilce && ilce !== d.ad ? ilce : "";
    let tr = y.m || (y.ac ? `${y.ad}: ${y.ac}.` : "") || `${y.ad}, ${d.ad} ilinin ${ilceYaz ? ilceYaz + " ilçesinde" : "sınırları içinde"} görülmeye değer yerlerden biridir.`;
    ekle(y.q, "tr", nokta(y.ad) + " " + trOkunur(tr));
    const e = en && en.y && en.y[y.q];
    const ae = (e && e[0]) || adEn(y.ad);
    const me = e ? (e[3] ? e[1] : enSade(e[1])) : "";
    ekle(y.q, "en", nokta(ae) + " " + enOkunur(me || `${ae} is one of the places worth seeing in ${ilceYaz ? ilceYaz + ", " : ""}${d.ad} Province, Türkiye.`));
  }
  fs.writeFileSync(path.join(CIKTI, d.s + ".json"), JSON.stringify(liste));
}
console.log(`metin: ${adet} · Türkçe ${topTr} harf · İngilizce ${topEn} harf · iki sesle toplam ${2 * (topTr + topEn)} harf`);
