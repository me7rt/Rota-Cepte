// Geçici: özel gün kartları için serbest lisanslı (kamu malı, CC0, CC BY) fotoğraflar. CC BY-SA ve GFDL alınmaz.
import fs from "node:fs";
const UA = "RotaCepte/6.5 (mertturanlioglu.apps@gmail.com)";
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
const al = async (p) => { const u = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({ format: "json", formatversion: "2", ...p }); for (let i = 0; i < 4; i++) { try { const r = await fetch(u, { headers: { "User-Agent": UA } }); if (r.ok) return r.json(); } catch (e) {} await bekle(2000 * (i + 1)); } return {}; };
const indir = async (url, yol) => { for (let i = 0; i < 3; i++) { try { const r = await fetch(url, { headers: { "User-Agent": UA } }); if (r.ok) { fs.writeFileSync(yol, Buffer.from(await r.arrayBuffer())); return true; } } catch (e) {} await bekle(3000); } return false; };
const izinli = (lis) => /^(cc0|public domain|pd|cc[ -]by[ -]\d|cc[ -]by$)/i.test(lis.trim()) && !/sa/i.test(lis.replace(/^public/i, ""));
const EM = "Artist|LicenseShortName|LicenseUrl|AttributionRequired|DateTimeOriginal|ImageDescription|Credit|Categories|UsageTerms";
const temiz = (em, k) => (em[k] ? String(em[k].value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "");
const out = "out"; fs.mkdirSync(out + "/b", { recursive: true });

// 1) Seçilen dosyaları büyük boy indir (kısa kenar ~1500 px; şimdilik veri denetimi için birkaç dosya)
const SECILEN = {};
const bilgi = {};
for (const [no, ad] of Object.entries(SECILEN)) {
  const j = await al({ action: "query", titles: "File:" + ad, prop: "imageinfo", iiprop: "url|size|extmetadata", iiextmetadatafilter: EM });
  const pg = j.query && j.query.pages && j.query.pages[0], ii = pg && pg.imageinfo && pg.imageinfo[0];
  if (!ii) { console.log("YOK", no, ad); continue; }
  const em = ii.extmetadata || {};
  const gen = Math.min(ii.width, Math.round(ii.width * 1500 / Math.min(ii.width, ii.height) * (ii.width < ii.height ? 1 : ii.width / ii.width)));
  const k = await al({ action: "query", titles: "File:" + ad, prop: "imageinfo", iiprop: "url", iiurlwidth: String(ii.width >= ii.height ? Math.min(ii.width, Math.round(ii.width * 1500 / ii.height)) : Math.min(ii.width, 1500)) });
  const kk = k.query.pages[0].imageinfo[0];
  const ok = await indir(kk.thumburl || kk.url, `${out}/b/${no}.jpg`);
  bilgi[no] = { ad, ok, w: ii.width, h: ii.height, lis: temiz(em, "LicenseShortName"), lisUrl: temiz(em, "LicenseUrl"), yazar: temiz(em, "Artist"), kredi: temiz(em, "Credit").slice(0, 200), tarih: temiz(em, "DateTimeOriginal"), atif: temiz(em, "AttributionRequired"), sayfa: ii.descriptionurl, izinli: izinli(temiz(em, "LicenseShortName")) };
  console.log(no, ok, bilgi[no].lis, bilgi[no].yazar);
  await bekle(400);
}
fs.writeFileSync(`${out}/secilen.json`, JSON.stringify(bilgi, null, 1));

// 2) Ek arama: yeni tasarımlar için aday fotoğraflar
const QI = ' incategory:"Quality_images"', FP = ' incategory:"Featured_pictures_on_Wikimedia_Commons"';
const TEMA = { tuz: { hepsi: true, kat: ["Lake Tuz", "Tuz Gölü Special Environmental Protection Area"], ara: ["Tuz Gölü", "Lake Tuz", "Tuz Gölü Aksaray", "Tuz Gölü Şereflikoçhisar"] } };
const sonuc = {};
for (const [tema, t] of Object.entries(TEMA)) {
  const adlar = new Set();
  for (const k of t.kat) { const j = await al({ action: "query", list: "categorymembers", cmtitle: "Category:" + k, cmtype: "file", cmlimit: "100" }); for (const x of (j.query && j.query.categorymembers) || []) adlar.add(x.title); await bekle(300); }
  for (const q of t.ara) { const j = await al({ action: "query", list: "search", srnamespace: "6", srlimit: "40", srsearch: q + " filetype:bitmap" }); for (const x of (j.query && j.query.search) || []) adlar.add(x.title); await bekle(300); }
  const aday = [], liste = [...adlar].filter((a) => /\.jpe?g$/i.test(a));
  for (let i = 0; i < liste.length; i += 50) {
    const j = await al({ action: "query", titles: liste.slice(i, i + 50).join("|"), prop: "imageinfo", iiprop: "url|size|extmetadata", iiurlwidth: "360", iiextmetadatafilter: EM });
    for (const pg of (j.query && j.query.pages) || []) {
      const ii = pg.imageinfo && pg.imageinfo[0]; if (!ii) continue;
      const em = ii.extmetadata || {}, lis = temiz(em, "LicenseShortName");
      if (!(t.hepsi ? !/gfdl/i.test(lis) && lis : izinli(lis)) || ii.width < 1500 || ii.height < 1000) continue;
      const qi = /Quality images|Featured pictures|Valued images/i.test(temiz(em, "Categories"));
      aday.push({ ad: pg.title.replace(/^File:/, ""), lis, yazar: temiz(em, "Artist").slice(0, 90), tarih: temiz(em, "DateTimeOriginal").slice(0, 10), aciklama: temiz(em, "ImageDescription").slice(0, 160), w: ii.width, h: ii.height, qi, kucuk: ii.thumburl, sayfa: ii.descriptionurl });
    }
    await bekle(300);
  }
  aday.sort((a, b) => (b.qi ? 1 : 0) - (a.qi ? 1 : 0) || b.w * b.h - a.w * a.h);
  sonuc[tema] = aday.slice(0, 48);
  let n = 0;
  for (const a of sonuc[tema]) { a.no = `${tema}-${String(++n).padStart(2, "0")}`; await indir(a.kucuk, `${out}/${a.no}.jpg`); await bekle(150); }
  console.log(tema, "aday", liste.length, "izinli", aday.length);
}
fs.writeFileSync(`${out}/aday.json`, JSON.stringify(sonuc, null, 1));
