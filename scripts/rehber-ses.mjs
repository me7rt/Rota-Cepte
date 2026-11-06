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
// İngilizce metindeki Türkçe adlar: iki seste de IPA ile okunur (yalnız İngilizce ses birimleri)
const TELAFFUZ = [
  ["Küçük Menderes", "kuːˈtʃuːk mɛndɛˈrɛs"],
  ["Büyük Menderes", "buːˈjuːk mɛndɛˈrɛs"],
  ["Kavaklı Burun", "kɑːvɑːkˈlə buːˈruːn"],
  ["Kahramanmaraş", "kɑːrɑːmɑːnmɑːˈrɑːʃ"],
  ["Zincirli Han", "zɪndʒɪrˈliː hɑːn"],
  ["Kabayanidis", "kæbæjæˈniːdɪs"],
  ["Güzelçamlı", "ɡuːˈzɛltʃɑːmlə"],
  ["Sarayburnu", "sɑːˈraɪbʊrnuː"],
  ["Şahin Bey", "ʃɑːhɪn ˈbeɪ"],
  ["Altındere", "ɑːltəndɛˈrɛ"],
  ["Gaziantep", "ɡɑːziːɑːnˈtɛp"],
  ["Akçaabat", "ˈɑːktʃɑːbɑːt"],
  ["Arsameia", "ɑːsəˈmeɪə"],
  ["Kumbahçe", "kʊmbɑːˈtʃɛ"],
  ["Aydınlık", "aɪdənˈlək"],
  ["Şahinbey", "ʃɑːhɪnˈbeɪ"],
  ["bedesten", "bɛdɛsˈtɛn"],
  ["Hezarfen", "hɛzɑːˈfɛn"],
  ["Cendere", "dʒɛndɛˈrɛ"],
  ["Boztepe", "bɒztɛˈpɛ"],
  ["Şirince", "ʃɪˈrɪndʒɛ"],
  ["Karakuş", "kɑːrɑːˈkʊʃ"],
  ["Soğuksu", "sɔːˈʊksuː"],
  ["Trabzon", "træbˈzɒn"],
  ["İçmeler", "ɪtʃmɛˈlɛr"],
  ["Antakya", "ænˈtɑːkjə"],
  ["Harbiye", "hɑːrbiːˈjɛ"],
  ["Karadağ", "kɑːrɑːˈdɑː"],
  ["Üsküdar", "ˈʊskʊdɑː"],
  ["Salacak", "sɑːlɑːˈdʒɑːk"],
  ["Göreme", "ɡəˈrɛmɛ"],
  ["Nemrut", "nɛmˈruːt"],
  ["Selçuk", "sɛlˈtʃuːk"],
  ["künefe", "kuːnɛˈfɛ"],
  ["Bodrum", "ˈbɒdrʊm"],
  ["Mehmed", "mɛˈmɛd"],
  ["Çelebi", "tʃɛlɛˈbiː"],
  ["Evliya", "ɛvliːˈjɑː"],
  ["Kahta", "kɑːˈtɑː"],
  ["Zelve", "zɛlˈvɛ"],
  ["Niğde", "ˈniːdɛ"],
  ["Maçka", "mɑːtʃˈkɑː"],
  ["Hatay", "hɑːˈtaɪ"],
  ["Antep", "ɑːnˈtɛp"],
];
// en-US sesi uzunluk işareti ve ɒ tanımaz; en-GB sesi ɛ yerine e kullanır
const sesBirim = (ipa, cins) => cins === "k" ? ipa.replace(/ɛ/g, "e") : ipa.replace(/ː/g, "").replace(/ɒ/g, "ɑ");
const xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// Paragraf ve kart cümleleri arasında kısa durak
const durak = (s) => s.replace(/\n+/g, ' <break time="700ms"/> ');
function ic(metin, dil, cins) {
  let t = xml(metin);
  if (dil !== "en") return `<lang xml:lang="tr-TR">${durak(t)}</lang>`;
  const parca = t.split(new RegExp(`(${TELAFFUZ.map(([a]) => a).join("|")})`));
  t = parca.map((p) => {
    const b = TELAFFUZ.find(([a]) => a === p);
    return b ? `<phoneme alphabet="ipa" ph="${sesBirim(b[1], cins)}">${p}</phoneme>` : p;
  }).join("");
  return durak(t);
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
    const ad = `${x.id}_${cins === "k" ? "kadin" : "erkek"}`, govde = ssml(x.metin, x.dil, cins);
    if (harf + x.metin.length > SINIR) { console.error("HARF SINIRI doldu, durdu:", harf); process.exitCode = 1; break; }
    harf += x.metin.length;
    fs.writeFileSync(path.join(CIKTI, ad + ".xml"), govde);
    try { console.log(ad, await seslendir(govde, path.join(CIKTI, ad + ".mp3"))); }
    catch (e) { hata++; console.error("HATA", ad, e.message); }
  }
}
console.log(`toplam ${harf} harf`);
if (hata) process.exitCode = 1;
