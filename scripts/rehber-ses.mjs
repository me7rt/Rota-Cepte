// Yaşayan Rehber ses denemesi: hikâye metinlerini iki sesle okur, Türkçe adları doğru telaffuz ettirir.
// node scripts/rehber-ses.mjs <metin.json> <çıktı klasörü>
import fs from "node:fs";
import path from "node:path";

const [, , METIN, CIKTI] = process.argv;
const KEY = process.env.AZURE_SPEECH_KEY, REGION = process.env.AZURE_SPEECH_REGION;
if (!KEY || !REGION) throw new Error("Azure anahtarı yok");

const SES = {
  "tr-k": ["en-US-AvaMultilingualNeural", "tr-TR"],
  "tr-e": ["en-US-AndrewMultilingualNeural", "tr-TR"],
  "en-k": ["en-GB-SoniaNeural", "en-GB"],
  "en-e": ["en-US-AndrewMultilingualNeural", "en-US"],
};
// İngilizce metindeki Türkçe adlar: çok dilli seste Türkçe okunur, Sonia'da IPA ile
const TELAFFUZ = [
  ["Hezarfen Ahmed Çelebi", "hɛzɑːˈfɛn ɑːˈmɛd tʃɛlɛˈbiː"],
  ["Evliya Çelebi", "ɛvliˈjɑː tʃɛlɛˈbiː"],
  ["Zincirli Han", "zɪndʒɪrˈliː hɑːn"],
  ["Hezarfen", "hɛzɑːˈfɛn"],
  ["Üsküdar", "ˈʊskʊdɑː"],
  ["Sarayburnu", "sɑˈraɪbʊrnuː"],
  ["Salacak", "sæləˈdʒɑːk"],
  ["Mehmed", "mɛˈmɛd"],
  ["bedesten", "bɛdɛsˈtɛn"],
];
const xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function ic(metin, dil, cins) {
  let t = xml(metin);
  if (dil !== "en") return `<lang xml:lang="tr-TR">${t}</lang>`;
  const ipa = cins === "k";
  const parca = t.split(new RegExp(`(${TELAFFUZ.map(([a]) => a).join("|")})`));
  t = parca.map((p) => {
    const b = TELAFFUZ.find(([a]) => a === p);
    if (!b) return p;
    return ipa ? `<phoneme alphabet="ipa" ph="${b[1]}">${p}</phoneme>` : `</lang><lang xml:lang="tr-TR">${p}</lang><lang xml:lang="en-US">`;
  }).join("");
  return ipa ? t : `<lang xml:lang="en-US">${t}</lang>`.replace(/<lang xml:lang="en-US"><\/lang>/g, "");
}
function ssml(metin, dil, cins) {
  const [ad, lang] = SES[dil + "-" + cins];
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang}"><voice name="${ad}"><prosody rate="-4%">${ic(metin, dil, cins)}</prosody></voice></speak>`;
}
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
async function seslendir(govde, dosya) {
  for (let deneme = 1; deneme <= 6; deneme++) {
    const r = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: "POST",
      headers: { "Ocp-Apim-Subscription-Key": KEY, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3", "User-Agent": "rota-cepte" },
      body: govde, signal: AbortSignal.timeout(60000),
    }).catch(() => null);
    if (!r || r.status === 429 || r.status >= 500) { await bekle(2000 * deneme); continue; }
    if (!r.ok) throw new Error(r.status + " " + (await r.text()).slice(0, 300));
    const b = Buffer.from(await r.arrayBuffer());
    if (b.length < 1000) throw new Error("boş ses");
    fs.writeFileSync(dosya, b);
    return b.length;
  }
  throw new Error("cevap yok");
}

fs.mkdirSync(CIKTI, { recursive: true });
// Harcama koruması: bu kadar harften fazlasını asla seslendirme
const SINIR = Number(process.env.HARF_SINIRI || 50000);
let harf = 0, hata = 0;
for (const x of JSON.parse(fs.readFileSync(METIN, "utf8"))) {
  for (const cins of ["k", "e"]) {
    const ad = `${x.id}-${x.dil}-${cins}`, govde = ssml(x.metin, x.dil, cins);
    if (harf + x.metin.length > SINIR) { console.error("HARF SINIRI doldu, durdu:", harf); process.exitCode = 1; break; }
    harf += x.metin.length;
    fs.writeFileSync(path.join(CIKTI, ad + ".xml"), govde);
    try { console.log(ad, await seslendir(govde, path.join(CIKTI, ad + ".mp3"))); }
    catch (e) { hata++; console.error("HATA", ad, e.message); }
  }
}
console.log(`toplam ${harf} harf`);
if (hata) process.exitCode = 1;
