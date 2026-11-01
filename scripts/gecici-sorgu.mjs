// Geçici: seçilen kamu malı Atatürk fotoğraflarının 1400 piksellik hallerini ve lisans bilgisini kart-foto dalına koyar
import fs from "node:fs";
const UA = "RotaCepte/6.5 (mertturanlioglu.apps@gmail.com)";
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
const api = async (p) => { const u = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({ format: "json", formatversion: "2", ...p }); for (let i = 0; i < 4; i++) { try { const r = await fetch(u, { headers: { "User-Agent": UA } }); if (r.ok) return r.json(); } catch (e) {} await bekle(2000 * (i + 1)); } return {}; };
const SEC = {
  canakkale: "File:Turkish trenches at Gallipoli.jpg",
  samsun: "File:9. Ordu Müfettişi Mustafa Kemal Paşa.png",
  zafer: "File:Mustapha Kemal généralissime des armées Kémalistes (gros plan) - btv1b9053984d.jpg",
  harf: "File:Mustafa Kemal harf devriminde.jpg",
  cocuk: "File:Sigirtmac Mustafa.jpg",
  cumhuriyet: "File:Mustafa Kemal Atatürk (white balance).png",
  cumhuriyet2: "File:Ghazi Moustapha Kemal Pasha LCCN2014716853 (cropped).jpg",
  cumhuriyet3: "File:Mustafa Kemal Atatürk.png"
};
const out = "out"; fs.mkdirSync(out, { recursive: true });
const sonuc = [];
for (const [ad, t] of Object.entries(SEC)) {
  const j = await api({ action: "query", titles: t, prop: "imageinfo|templates", iiprop: "url|size|mime|extmetadata", iiurlwidth: "1400", tlnamespace: "10", tllimit: "max" });
  const pg = j.query && j.query.pages && j.query.pages[0], ii = pg && pg.imageinfo && pg.imageinfo[0];
  if (!ii) { console.log("yok", t); continue; }
  const em = ii.extmetadata || {}, v = (k) => (em[k] ? String(em[k].value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "");
  try { const r = await fetch(ii.thumburl || ii.url, { headers: { "User-Agent": UA } }); if (r.ok) fs.writeFileSync(`${out}/${ad}.${/png/.test(ii.thumburl || ii.url) ? "png" : "jpg"}`, Buffer.from(await r.arrayBuffer())); } catch (e) {}
  sonuc.push({ ad, title: t, lis: v("LicenseShortName"), tpl: (pg.templates || []).map((x) => x.title.replace("Template:", "")).filter((x) => /^PD|^Cc|^CC/i.test(x)), artist: v("Artist"), tarih: v("DateTimeOriginal"), credit: v("Credit").slice(0, 300), aciklama: v("ImageDescription").slice(0, 400), w: ii.width, h: ii.height, sayfa: ii.descriptionurl });
  await bekle(500);
}
fs.writeFileSync(`${out}/secilen.json`, JSON.stringify(sonuc, null, 1));
