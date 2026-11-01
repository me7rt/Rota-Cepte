// Geçici: Atatürk günleri kartları için kamu malı Atatürk fotoğraflarını Commons'ta arar (1915-1930 yılı kategorileri ve konu aramaları),
// küçük hallerini ve lisans bilgisini kart-foto dalına koyar
import fs from "node:fs";
const UA = "RotaCepte/6.5 (mertturanlioglu.apps@gmail.com)";
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
const api = async (p) => { const u = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({ format: "json", formatversion: "2", ...p }); for (let i = 0; i < 4; i++) { try { const r = await fetch(u, { headers: { "User-Agent": UA } }); if (r.ok) return r.json(); } catch (e) {} await bekle(2000 * (i + 1)); } return {}; };
const ORT = { prop: "imageinfo|templates|categories", iiprop: "url|size|mime|extmetadata", iiurlwidth: "420", iiextmetadatafilter: "LicenseShortName|License|Artist|DateTimeOriginal|ImageDescription|Restrictions|Credit", tlnamespace: "10", tllimit: "max", cllimit: "max", clshow: "!hidden" };
const KAYNAK = [];
for (let y = 1915; y <= 1930; y++) KAYNAK.push(["yil" + y, { generator: "categorymembers", gcmtitle: `Category:Mustafa Kemal Atatürk in ${y}`, gcmtype: "file", gcmlimit: "60" }]);
for (const [ad, q] of [["cocuk", "Atatürk children"], ["cocuk", "Atatürk çocuklar"], ["harf", "Atatürk alphabet"], ["harf", "Atatürk harf inkılabı"], ["harf", "Atatürk blackboard"], ["portre", "Mustafa Kemal portrait 1923"], ["portre", "Mustafa Kemal Pasha portrait"], ["samsun", "Mustafa Kemal 1919 Sivas Kongresi"], ["zafer", "Mustafa Kemal Paşa 1922 Başkomutan"], ["canakkale", "Mustafa Kemal Bey 1915 Anafartalar"]])
  KAYNAK.push([ad, { generator: "search", gsrsearch: q + " filetype:bitmap", gsrnamespace: "6", gsrlimit: "30" }]);
const out = "out"; fs.mkdirSync(out + "/k", { recursive: true });
const sonuc = [], gor = new Set();
for (const [grup, p] of KAYNAK) {
  const j = await api({ action: "query", ...p, ...ORT });
  let say = 0;
  for (const pg of (j.query && j.query.pages) || []) {
    const ii = pg.imageinfo && pg.imageinfo[0]; if (!ii || gor.has(pg.title)) continue;
    const em = ii.extmetadata || {}, v = (k) => (em[k] ? String(em[k].value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "");
    const lis = v("LicenseShortName"), tpl = (pg.templates || []).map((t) => t.title.replace("Template:", "")).filter((t) => /^PD|^Cc-zero|^CC0|^Cc-by|^CC-BY/i.test(t));
    if (!/jpeg|png|tiff/.test(ii.mime) || ii.width < 600) continue;
    gor.add(pg.title); say++;
    const dosya = `k/${String(sonuc.length).padStart(3, "0")}.jpg`;
    try { const r = await fetch(ii.thumburl || ii.url, { headers: { "User-Agent": UA } }); if (r.ok) fs.writeFileSync(`${out}/${dosya}`, Buffer.from(await r.arrayBuffer())); } catch (e) {}
    sonuc.push({ grup, dosya, title: pg.title, lis, tpl, kat: (pg.categories || []).map((c) => c.title.replace("Category:", "")).slice(0, 12), artist: v("Artist").slice(0, 160), tarih: v("DateTimeOriginal").slice(0, 60), aciklama: v("ImageDescription").slice(0, 240), kisit: v("Restrictions"), w: ii.width, h: ii.height, url: ii.url, sayfa: ii.descriptionurl });
    await bekle(250);
  }
  console.log(grup, say);
}
fs.writeFileSync(`${out}/liste.json`, JSON.stringify(sonuc, null, 1));
