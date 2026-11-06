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
  ["Hüsamettin Koçan", "huːsɑːmɛtˈtiːn kɒˈtʃɑːn"],
  ["Rabia Bala Hatun", "rɑːbiːˈɑː bɑːˈlɑː hɑːˈtuːn"],
  ["Yıldırım Bayezid", "jəldəˈrəm bɑːjɛˈziːd"],
  ["Hasankeyf Höyük", "hɑːsɑːnˈkeɪf hɜːˈjuːk"],
  ["Küçük Menderes", "kuːˈtʃuːk mɛndɛˈrɛs"],
  ["Büyük Menderes", "buːˈjuːk mɛndɛˈrɛs"],
  ["Afyonkarahisar", "ɑːfjɒnkɑːrɑːhɪˈsɑːr"],
  ["Fatin Uluengin", "fɑːˈtiːn uːluːɛnˈɡiːn"],
  ["Bayburt Hisarı", "baɪˈbuːrt hɪsɑːˈrə"],
  ["Kavaklı Burun", "kɑːvɑːkˈlə buːˈruːn"],
  ["Kahramanmaraş", "kɑːrɑːmɑːnmɑːˈrɑːʃ"],
  ["Mustafa Kemal", "muːstɑːˈfɑː kɛˈmɑːl"],
  ["Emir Bayındır", "ɛˈmɪr bɑːjənˈdər"],
  ["Ertuğrul Gazi", "ɛrtuːˈruːl ɡɑːˈziː"],
  ["abdigör köfte", "ɑːbdiːˈɡɜːr kɜːfˈteɪ"],
  ["Zincirli Han", "zɪndʒɪrˈliː hɑːn"],
  ["Hüsrev Tayla", "huːsˈrɛv taɪˈlɑː"],
  ["Ahmed-i Hani", "ɑːhˈmɛdiː hɑːˈniː"],
  ["Güzelcehisar", "ɡuːzɛldʒɛhɪˈsɑːr"],
  ["Kabayanidis", "kæbæjæˈniːdɪs"],
  ["Dede Korkut", "dɛˈdeɪ kɒrˈkuːt"],
  ["Doğubayazıt", "dɒuːbɑːjɑːˈzət"],
  ["Taksiyarhis", "tɑːksiːjɑːrˈhɪs"],
  ["lor dolması", "lɒr dɒlmɑːˈsə"],
  ["Güzelçamlı", "ɡuːˈzɛltʃɑːmlə"],
  ["Sarayburnu", "sɑːˈraɪbʊrnuː"],
  ["Döşemealtı", "dɜːʃɛmɛɑːlˈtə"],
  ["Hazeranlar", "hɑːzɛrɑːnˈlɑːr"],
  ["Köprüpazar", "kɜːpruːpɑːˈzɑːr"],
  ["Orhan Arda", "ɒrˈhɑːn ɑːrˈdɑː"],
  ["Sultanhanı", "suːltɑːnhɑːˈnə"],
  ["Yassıhüyük", "jɑːssəhuːˈjuːk"],
  ["Yeşilırmak", "jɛʃɪlərˈmɑːk"],
  ["kaz tiridi", "kɑːz tɪrɪˈdiː"],
  ["Çatalhöyük", "tʃɑːtɑːlhɜːˈjuːk"],
  ["Güllübahçe", "ɡuːlluːbɑːhˈtʃeɪ"],
  ["Kartalkaya", "kɑːrtɑːlkɑːˈjɑː"],
  ["Kenan Erim", "kɛˈnɑːn ɛˈrɪm"],
  ["Kuşcenneti", "kuːʃdʒɛnnɛˈtiː"],
  ["Orhan Gazi", "ɒrˈhɑːn ɡɑːˈziː"],
  ["Osman Gazi", "ɒsˈmɑːn ɡɑːˈziː"],
  ["Serincegöl", "sɛrɪndʒɛˈɡɜːl"],
  ["Yedigöller", "jɛdiːɡɜːlˈlɛr"],
  ["Zeynel Bey", "zeɪˈnɛl beɪ"],
  ["içli köfte", "ɪtʃˈliː kɜːfˈteɪ"],
  ["Şahin Bey", "ʃɑːhɪn ˈbeɪ"],
  ["Altındere", "ɑːltəndɛˈreɪ"],
  ["Gaziantep", "ɡɑːziːɑːnˈtɛp"],
  ["Anıtkabir", "ɑːˈnətkɑːbɪr"],
  ["Belisırma", "bɛlɪsərˈmɑː"],
  ["Emin Onat", "ɛˈmiːn ɒˈnɑːt"],
  ["Helvadere", "hɛlvɑːdɛˈreɪ"],
  ["Karahisar", "kɑːrɑːhɪˈsɑːr"],
  ["Yılankale", "jəlɑːnkɑːˈleɪ"],
  ["bici bici", "bɪdʒiː bɪˈdʒiː"],
  ["Üçkapılar", "uːtʃkɑːpəˈlɑːr"],
  ["çiğ köfte", "tʃiː kɜːfˈteɪ"],
  ["Adilcevaz", "ɑːdɪldʒɛˈvɑːz"],
  ["Aydıntepe", "aɪdəntɛˈpeɪ"],
  ["Ağrı Dağı", "ɑːˈrə dɑːˈə"],
  ["Bayraktar", "baɪrɑːkˈtɑːr"],
  ["Burhaniye", "buːrhɑːniːˈjeɪ"],
  ["Hasankeyf", "hɑːsɑːnˈkeɪf"],
  ["Malazgirt", "mɑːlɑːzˈɡɪrt"],
  ["Çekiciler", "tʃɛkɪdʒɪˈlɛr"],
  ["İlyas Bey", "ɪlˈjɑːs beɪ"],
  ["Akçaabat", "ˈɑːktʃɑːbɑːt"],
  ["Arsameia", "ɑːrsɑːˈmeɪɑː"],
  ["Kumbahçe", "kʊmbɑːˈtʃeɪ"],
  ["Aydınlık", "aɪdənˈlək"],
  ["Şahinbey", "ʃɑːhɪnˈbeɪ"],
  ["bedesten", "bɛdɛsˈtɛn"],
  ["Hezarfen", "hɛzɑːˈfɛn"],
  ["Adıyaman", "ɑːˈdəjɑːmɑːn"],
  ["Akçakale", "ɑːktʃɑːkɑːˈleɪ"],
  ["Atpazarı", "ɑːtpɑːzɑːˈrə"],
  ["Hacıkırı", "hɑːdʒəkəˈrə"],
  ["Kapıkaya", "kɑːpəkɑːˈjɑː"],
  ["Kocatepe", "kɒdʒɑːtɛˈpeɪ"],
  ["Kurşunlu", "kuːrʃuːnˈluː"],
  ["Melendiz", "mɛlɛnˈdiːz"],
  ["Taşköprü", "tɑːʃkɜːpˈruː"],
  ["Yanartaş", "jɑːnɑːrˈtɑːʃ"],
  ["Şahmeran", "ʃɑːhmɛˈrɑːn"],
  ["Bandırma", "bɑːndərˈmɑː"],
  ["Büyükgöl", "buːjuːkˈɡɜːl"],
  ["Deringöl", "dɛrɪnˈɡɜːl"],
  ["Hazarşah", "hɑːzɑːrˈʃɑːh"],
  ["Kafkasör", "kɑːfkɑːˈsɜːr"],
  ["Karacasu", "kɑːrɑːdʒɑːˈsuː"],
  ["Nazlıgöl", "nɑːzləˈɡɜːl"],
  ["Osmaneli", "ɒsmɑːnɛˈliː"],
  ["Seringöl", "sɛrɪnˈɡɜːl"],
  ["Sormagir", "sɒrmɑːˈɡɪr"],
  ["Varzahan", "vɑːrzɑːˈhɑːn"],
  ["Cendere", "dʒɛndɛˈreɪ"],
  ["Boztepe", "bɒztɛˈpeɪ"],
  ["Şirince", "ʃɪˈrɪndʒeɪ"],
  ["Karakuş", "kɑːrɑːˈkʊʃ"],
  ["Soğuksu", "sɔːˈʊksuː"],
  ["Trabzon", "træbˈzɒn"],
  ["İçmeler", "ɪtʃmɛˈlɛr"],
  ["Antakya", "ænˈtɑːkjə"],
  ["Harbiye", "hɑːrbiːˈjeɪ"],
  ["Karadağ", "kɑːrɑːˈdɑː"],
  ["Üsküdar", "ˈʊskʊdɑː"],
  ["Salacak", "sɑːlɑːˈdʒɑːk"],
  ["Antalya", "ɑːnˈtɑːljɑː"],
  ["Ardahan", "ɑːrdɑːˈhɑːn"],
  ["Atatürk", "ˈɑːtɑːtɜːrk"],
  ["Ayazini", "ɑːjɑːzɪˈniː"],
  ["Bayezid", "bɑːjɛˈziːd"],
  ["Boraboy", "bɒrɑːˈbɔɪ"],
  ["Erciyes", "ɛrdʒɪˈjɛs"],
  ["Harşena", "hɑːrʃɛˈnɑː"],
  ["Kaleiçi", "kɑːˈleɪɪtʃiː"],
  ["Polatlı", "pɒˈlɑːtlə"],
  ["Sakarya", "sɑːˈkɑːrjɑː"],
  ["gözleme", "ɡɜːzlɛˈmeɪ"],
  ["kadayıf", "kɑːdɑːˈjəf"],
  ["Ayvalık", "aɪvɑːˈlək"],
  ["Ağlasun", "ɑːlɑːˈsuːn"],
  ["Bayburt", "baɪˈbuːrt"],
  ["Bilecik", "bɪlɛˈdʒɪk"],
  ["Edebali", "ɛdɛbɑːˈliː"],
  ["Edincik", "ɛdɪnˈdʒɪk"],
  ["Edremit", "ɛdrɛˈmɪt"],
  ["Kapıdağ", "kɑːpəˈdɑː"],
  ["Karagöl", "kɑːrɑːˈɡɜːl"],
  ["Kurugöl", "kuːruːˈɡɜːl"],
  ["Köroğlu", "kɜːrɒˈluː"],
  ["Mudurnu", "muːduːrˈnuː"],
  ["keledoş", "kɛlɛˈdɒʃ"],
  ["İncegöl", "ɪndʒɛˈɡɜːl"],
  ["Göreme", "ɡəˈrɛmeɪ"],
  ["Nemrut", "ˈnɛmruːt"],
  ["Selçuk", "sɛlˈtʃuːk"],
  ["künefe", "kuːnɛˈfeɪ"],
  ["Bodrum", "ˈbɒdrʊm"],
  ["Mehmed", "mɛˈmɛd"],
  ["Çelebi", "tʃɛlɛˈbiː"],
  ["Evliya", "ɛvliːˈjɑː"],
  ["Akkale", "ɑːkkɑːˈleɪ"],
  ["Amasya", "ɑːˈmɑːsjɑː"],
  ["Ankara", "ˈɑːŋkɑːrɑː"],
  ["Ceyhan", "dʒeɪˈhɑːn"],
  ["Güllük", "ɡuːlˈluːk"],
  ["Ihlara", "əhlɑːˈrɑː"],
  ["Karain", "kɑːrɑːˈiːn"],
  ["Selime", "sɛliːˈmeɪ"],
  ["Seyhan", "seɪˈhɑːn"],
  ["keşkek", "kɛʃˈkɛk"],
  ["misket", "mɪsˈkɛt"],
  ["Çıldır", "tʃəlˈdər"],
  ["Çıralı", "tʃərɑːˈlə"],
  ["şalgam", "ʃɑːlˈɡɑːm"],
  ["şırdan", "ʃərˈdɑːn"],
  ["Alibey", "ɑːliːˈbeɪ"],
  ["Amasra", "ɑːˈmɑːsrɑː"],
  ["Artvin", "ɑːrtˈviːn"],
  ["Badlis", "bɑːdˈliːs"],
  ["Bartın", "bɑːrˈtən"],
  ["Batman", "bɑːtˈmɑːn"],
  ["Bingöl", "bɪnˈɡɜːl"],
  ["Bitlis", "bɪtˈliːs"],
  ["Borçka", "bɒrtʃˈkɑː"],
  ["Burdur", "buːrˈduːr"],
  ["Efeler", "ɛfɛˈlɛr"],
  ["Kemere", "kɛmɛˈreɪ"],
  ["Livane", "liːvɑːˈneɪ"],
  ["Manyas", "mɑːnˈjɑːs"],
  ["Mengen", "mɛnˈɡɛn"],
  ["Sahara", "sɑːhɑːˈrɑː"],
  ["Solhan", "sɒlˈhɑːn"],
  ["Süphan", "suːpˈhɑːn"],
  ["Tatvan", "tɑːtˈvɑːn"],
  ["büryan", "buːrˈjɑːn"],
  ["İnkumu", "ɪnkuːˈmuː"],
  ["İnsuyu", "ɪnsuːˈjuː"],
  ["Şavşat", "ʃɑːvˈʃɑːt"],
  ["Kahta", "kɑːˈtɑː"],
  ["Zelve", "ˈzɛlveɪ"],
  ["Niğde", "ˈniːdeɪ"],
  ["Maçka", "mɑːtʃˈkɑː"],
  ["Hatay", "hɑːˈtaɪ"],
  ["Antep", "ɑːnˈtɛp"],
  ["Adana", "ˈɑːdɑːnɑː"],
  ["Afyon", "ɑːfˈjɒn"],
  ["Damal", "dɑːˈmɑːl"],
  ["Düden", "duːˈdɛn"],
  ["Hasan", "hɑːˈsɑːn"],
  ["Konya", "ˈkɒnjɑː"],
  ["Misis", "mɪˈsiːs"],
  ["Perre", "pɛrˈreɪ"],
  ["Varda", "vɑːrˈdɑː"],
  ["ayran", "aɪˈrɑːn"],
  ["kaşar", "kɑːˈʃɑːr"],
  ["mahya", "mɑːhˈjɑː"],
  ["sucuk", "suːˈdʒuːk"],
  ["çörek", "tʃɜːˈrɛk"],
  ["Abant", "ɑːˈbɑːnt"],
  ["Ahlat", "ɑːhˈlɑːt"],
  ["Aygır", "aɪˈɡər"],
  ["Baksı", "bɑːkˈsə"],
  ["Cunda", "dʒuːnˈdɑː"],
  ["Dilek", "dɪˈlɛk"],
  ["Ilısu", "ələˈsuː"],
  ["Kırat", "kəˈrɑːt"],
  ["Lefke", "lɛfˈkeɪ"],
  ["Söğüt", "sɜːˈjuːt"],
  ["Tbeti", "ˈtbɛtiː"],
  ["Çoruh", "tʃɒˈruːh"],
  ["İshak", "ɪsˈhɑːk"],
  ["Kura", "kuːˈrɑː"],
  ["Ulus", "uːˈluːs"],
  ["Ağrı", "ɑːˈrə"],
  ["Bolu", "bɒˈluː"],
  ["Ören", "ɜːˈrɛn"],
  ["Tuz", "tuːz"],
  ["Kaz", "kɑːz"],
  ["Kuş", "kuːʃ"],
  ["Kös", "kɜːs"],
  ["Van", "vɑːn"],
];
// Yöntem C: ad, İngilizce yazımla okutulur
const YAZIM = { Arsameia: "Ar sa may ah", Nemrut: "Nem root", Cendere: "Jen deh ray", Zelve: "Zel vay", "Göreme": "Gur reh may", "Akçaabat": "Ak chah ah baht", "Karakuş": "Kah rah koosh", Kahta: "Kah tah", "Altındere": "Al tun deh ray", Boztepe: "Boz teh pay", "Şirince": "Shih rin jay", "Selçuk": "Sel chook", Trabzon: "Trab zon", "Soğuksu": "Soh ook soo" };
// en-US sesi uzunluk işareti ve ɒ tanımaz; en-GB sesi ɛ yerine e kullanır
const sesBirim = (ipa, cins) => cins === "k" ? ipa.replace(/ɛ/g, "e") : ipa.replace(/ː/g, "").replace(/ɒ/g, "ɑ");
const xml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// Paragraf ve kart cümleleri arasında kısa durak
const durak = (s) => s.replace(/\n+/g, ' <break time="700ms"/> ');
function ic(metin, dil, cins, yontem = "ipa") {
  let t = xml(metin);
  if (dil !== "en") return `<lang xml:lang="tr-TR">${durak(t)}</lang>`;
  const parca = t.split(new RegExp(`(${TELAFFUZ.map(([a]) => a).join("|")})`));
  t = parca.map((p) => {
    const b = TELAFFUZ.find(([a]) => a === p);
    if (!b) return p;
    if (yontem === "yazim" && YAZIM[p]) return `<sub alias="${YAZIM[p]}">${p}</sub>`;
    return `<phoneme alphabet="ipa" ph="${sesBirim(b[1], cins)}">${p}</phoneme>`;
  }).join("");
  return durak(t);
}
function ssml(metin, dil, cins, ses, yontem) {
  const [ad, lang] = SES[dil + "-" + cins];
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang}"><voice name="${ses || ad}"><prosody rate="-4%">${ic(metin, dil, cins, yontem)}</prosody></voice></speak>`;
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
  // varyant yoksa kadın ve erkek ses; varsa yalnız istenen denemeler
  const liste = x.varyant || [{ cins: "k", etiket: "kadin" }, { cins: "e", etiket: "erkek", ses: x.dil === "en" ? process.env.EN_ERKEK : undefined }];
  for (const v of liste) {
    const cins = v.cins, ad = `${x.id}_${v.etiket}`, govde = ssml(x.metin, x.dil, cins, v.ses, v.yontem);
    if (harf + x.metin.length > SINIR) { console.error("HARF SINIRI doldu, durdu:", harf); process.exitCode = 1; break; }
    harf += x.metin.length;
    fs.writeFileSync(path.join(CIKTI, ad + ".xml"), govde);
    try { console.log(ad, await seslendir(govde, path.join(CIKTI, ad + ".mp3"))); }
    catch (e) { hata++; console.error("HATA", ad, e.message); }
  }
}
console.log(`toplam ${harf} harf`);
if (hata) process.exitCode = 1;
