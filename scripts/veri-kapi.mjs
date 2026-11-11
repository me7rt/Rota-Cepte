// Rota Cepte · © 2026 Mert Turanlıoğlu
// Veri kalite kapısı: yeni üretilen veri öncekinden belirgin şekilde azaldıysa main'e yazmayı durdurur.
// Ayrıca HTML etiketi ya da Vikipedi şablonu artığı kalan metinleri de durdurur.
// Vikipedi/Wikidata geçici olarak hata verirse yüzlerce yer sessizce kaybolmasın diye.
// Bilerek yapılan büyük bir azaltma için workflow'u elle "zorla" göreviyle çalıştır.
import fs from "node:fs";
import { execSync } from "node:child_process";

const yeni = JSON.parse(fs.readFileSync("docs/data/index.json", "utf8"));
let eski;
try {
  eski = JSON.parse(execSync("git show HEAD:docs/data/index.json", { encoding: "utf8", maxBuffer: 1e8 }));
} catch (e) {
  console.log("Önceki veri bulunamadı, kapı atlandı.");
  process.exit(0);
}

const sayilar = (d) => new Map(d.iller.map((i) => [i.s, i.n || 0]));
const E = sayilar(eski), Y = sayilar(yeni);
// Elle çıkarılan yerler (data/foto-duzelt.json "cikar") bilerek yapılan azaltmadır: önceki sayıdan düşülür
let CIKAR = new Set();
try { CIKAR = new Set(JSON.parse(fs.readFileSync("data/foto-duzelt.json", "utf8")).cikar || []); } catch (e) {}
let bilerek = 0;
for (const [s, n] of E) {
  try {
    const d = JSON.parse(execSync(`git show HEAD:docs/data/il/${s}.json`, { encoding: "utf8", maxBuffer: 1e8 }));
    const c = d.yerler.filter((y) => CIKAR.has(y.q)).length;
    if (c) { E.set(s, n - c); bilerek += c; }
  } catch (e) {}
}
if (bilerek) console.log(`Elle çıkarılan ${bilerek} yer hesaba katıldı.`);
const toplam = (m) => [...m.values()].reduce((a, b) => a + b, 0);
const te = toplam(E), ty = toplam(Y);
const hatalar = [];

if (Y.size !== 81) hatalar.push(`İl sayısı ${Y.size} (81 olmalı)`);
if (ty < te * 0.97) hatalar.push(`Toplam yer ${te} → ${ty} (%${((1 - ty / te) * 100).toFixed(1)} azaldı, sınır %3)`);
for (const [s, n] of E) {
  const m = Y.get(s) || 0;
  if (n > 0 && m === 0) hatalar.push(`${s}: ${n} → 0 yer`);
  else if (n >= 10 && m < n * 0.7) hatalar.push(`${s}: ${n} → ${m} yer (%30'dan fazla azaldı)`);
}

// Metin temizliği: HTML etiketi veya Vikipedi şablonu artığı içeren metin uygulamaya gitmesin
const kirli = [];
const tara = (v, yol) => {
  if (typeof v === "string") { if (/<|\{\{/.test(v)) kirli.push(`${yol}: ${v.slice(0, 60)}`); }
  else if (Array.isArray(v)) v.forEach((x, i) => tara(x, `${yol}[${i}]`));
  else if (v && typeof v === "object") for (const k in v) tara(v[k], `${yol}.${k}`);
};
tara(yeni, "index");
for (const f of fs.readdirSync("docs/data/il")) if (f.endsWith(".json")) tara(JSON.parse(fs.readFileSync(`docs/data/il/${f}`, "utf8")), f);
if (kirli.length) hatalar.push(`${kirli.length} metinde "<" veya "{{" kaldı, ilk örnekler:\n   ${kirli.slice(0, 5).join("\n   ")}`);

// Elle eklenen MüzeKart verisi silinmemiş ve açılabiliyor olmalı (uygulamada MüzeKart sayfası bunu okur)
try {
  const mk = JSON.parse(fs.readFileSync("docs/data/muzekart.json", "utf8"));
  if (!mk || !mk.il || !Object.keys(mk.il).length) hatalar.push("docs/data/muzekart.json boş ya da bozuk.");
} catch (e) {
  hatalar.push("docs/data/muzekart.json yok ya da açılamıyor: " + e.message);
}
console.log(`Toplam yer: ${te} → ${ty} (${ty - te >= 0 ? "+" : ""}${ty - te})`);
if (hatalar.length) {
  console.log("VERİ KAPISI: yeni veride sorun var, main'e yazılmadı.");
  for (const h of hatalar) console.log(" - " + h);
  console.log('Bilerek yapılan bir azaltmaysa (metin sorunu değilse) "Veri hazirla" workflow\'unu elle "zorla" göreviyle çalıştır.');
  process.exit(1);
}
console.log("Veri kapısı geçti.");
