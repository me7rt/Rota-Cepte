// Rota Cepte · © 2026 Mert Turanlıoğlu
// Veri kalite kapısı: yeni üretilen veri öncekinden belirgin şekilde azaldıysa main'e yazmayı durdurur.
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

console.log(`Toplam yer: ${te} → ${ty} (${ty - te >= 0 ? "+" : ""}${ty - te})`);
if (hatalar.length) {
  console.log("VERİ KAPISI: yeni veri öncekinden belirgin şekilde az, main'e yazılmadı.");
  for (const h of hatalar) console.log(" - " + h);
  console.log('Bilerek yapılan bir azaltmaysa "Veri hazirla" workflow\'unu elle "zorla" göreviyle çalıştır.');
  process.exit(1);
}
console.log("Veri kapısı geçti.");
