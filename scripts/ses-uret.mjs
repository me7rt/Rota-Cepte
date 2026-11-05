// Hazır metinleri Azure ile seslendirir.
// node scripts/ses-uret.mjs <metin klasörü> <çıktı klasörü> [il1,il2,...|dene]
// Dosya adı: <id>-<dil>-<k|e>.mp3  (k: kadın, e: erkek). Var olan dosyalar atlanır.
import fs from "node:fs";
import path from "node:path";

const [, , METIN, CIKTI, SECIM = ""] = process.argv;
const KEY = process.env.AZURE_SPEECH_KEY, REGION = process.env.AZURE_SPEECH_REGION;
if (!KEY || !REGION) throw new Error("Azure anahtarı yok");

const SES = {
  "tr-k": ["en-US-AvaMultilingualNeural", "tr-TR"],
  "tr-e": ["en-US-AndrewMultilingualNeural", "tr-TR"],
  "en-k": ["en-GB-SoniaNeural", "en-GB"],
  "en-e": ["en-US-AndrewMultilingualNeural", "en-US"],
};
const xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function ssml(metin, dil, cins) {
  const [ad, lang] = SES[dil + "-" + cins];
  const ic = ad.includes("Multilingual") ? `<lang xml:lang="${lang}">${xml(metin)}</lang>` : xml(metin);
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang}"><voice name="${ad}"><prosody rate="-4%">${ic}</prosody></voice></speak>`;
}
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
async function seslendir(metin, dil, cins, dosya) {
  for (let deneme = 1; deneme <= 6; deneme++) {
    try {
      const r = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: "POST",
        headers: { "Ocp-Apim-Subscription-Key": KEY, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3", "User-Agent": "rota-cepte" },
        body: ssml(metin, dil, cins),
        signal: AbortSignal.timeout(60000),
      });
      if (r.status === 429 || r.status >= 500) { await bekle(2000 * deneme); continue; }
      if (!r.ok) throw new Error(r.status + " " + (await r.text()).slice(0, 200));
      const b = Buffer.from(await r.arrayBuffer());
      if (b.length < 1000) throw new Error("boş ses");
      fs.writeFileSync(dosya, b);
      return b.length;
    } catch (e) {
      if (deneme === 6) throw e;
      await bekle(2000 * deneme);
    }
  }
}

// Ne seslendirilecek
let isler = [];
const dosyalar = fs.readdirSync(METIN).filter((f) => f.endsWith(".json")).sort();
if (SECIM === "dene") {
  // Zor cümleleri içeren birkaç örnek: sayı, yüzyıl, Roma rakamı, milattan önce
  const hepsi = dosyalar.flatMap((f) => JSON.parse(fs.readFileSync(path.join(METIN, f), "utf8")).map((x) => ({ ...x, il: f.slice(0, -5) })));
  const bul = (dil, r) => hepsi.find((x) => x.dil === dil && r.test(x.metin) && x.metin.length < 600);
  const ornek = [bul("tr", /milattan önce \d/), bul("tr", /\b(ikinci|üçüncü) [A-ZÇĞİÖŞÜ]/), bul("tr", /\d{1,2}\. yüzyıl/), bul("tr", /\d\.\d{3}/), bul("tr", /kilometrekare/), bul("en", /\bB\.C\.|BCE/), bul("en", /square kilometres/)].filter(Boolean);
  for (const x of ornek) for (const cins of ["k", "e"]) isler.push({ ...x, cins, ad: `dene-${isler.length}-${x.dil}-${cins}.mp3` });
  fs.mkdirSync(CIKTI, { recursive: true });
  fs.writeFileSync(path.join(CIKTI, "metinler.txt"), ornek.map((x, i) => `${i * 2}/${i * 2 + 1}: ${x.metin}`).join("\n\n"));
} else {
  const iller = SECIM ? SECIM.split(",") : dosyalar.map((f) => f.slice(0, -5));
  for (const il of iller) {
    const liste = JSON.parse(fs.readFileSync(path.join(METIN, il + ".json"), "utf8"));
    for (const x of liste) for (const cins of ["k", "e"]) isler.push({ ...x, il, cins, ad: path.join(il, `${x.id}-${x.dil}-${cins}.mp3`) });
  }
}

const atla = new Set(process.env.ATLA && fs.existsSync(process.env.ATLA) ? fs.readFileSync(process.env.ATLA, "utf8").split("\n").filter(Boolean) : []);
let harf = 0, bayt = 0, yapilan = 0, atlanan = 0, hata = 0;
const kuyruk = isler.slice();
async function isci() {
  for (let x; (x = kuyruk.shift()); ) {
    const dosya = path.join(CIKTI, x.ad);
    if (atla.has(path.basename(x.ad)) || fs.existsSync(dosya)) { atlanan++; continue; }
    fs.mkdirSync(path.dirname(dosya), { recursive: true });
    try { bayt += await seslendir(x.metin, x.dil, x.cins, dosya); harf += x.metin.length; yapilan++; }
    catch (e) { hata++; console.error("HATA", x.ad, e.message); }
    if ((yapilan + hata) % 200 === 0) console.log(`${yapilan} ses, ${hata} hata, kalan ${kuyruk.length}`);
  }
}
await Promise.all(Array.from({ length: 8 }, isci));
console.log(`bitti: ${yapilan} ses · ${atlanan} atlandı · ${hata} hata · ${harf} harf · ${(bayt / 1e6).toFixed(1)} MB`);
if (hata) process.exitCode = 1;
