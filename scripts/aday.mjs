// Geçici: fotosuz ve kısa yazılı yerler için aday toplama
import fs from "node:fs";
import { execSync } from "node:child_process";
const UA = "RotaCepte/1.0 (https://github.com/me7rt/Rota-Cepte; aday)";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function api(host, params, d = 0) {
  const body = new URLSearchParams({ format: "json", formatversion: "2", ...params });
  try {
    const r = await fetch(`https://${host}/w/api.php`, { method: "POST", headers: { "User-Agent": UA, "Api-User-Agent": UA, "Content-Type": "application/x-www-form-urlencoded" }, body });
    if (r.ok) { const j = await r.json(); if (!j.error) return j; }
    else console.log("HTTP", r.status, host, (await r.text()).slice(0, 200));
  } catch (e) { console.log("HATA", host, String(e).slice(0, 200)); }
  if (d < 6) { await sleep(4000 * (d + 1)); return api(host, params, d + 1); }
  console.log("VAZGECILDI", host, JSON.stringify(params).slice(0, 200));
  return {};
}
const parca = (a, n) => { const o = []; for (let i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; };
const L = JSON.parse(fs.readFileSync("aday-liste.json", "utf8"));
const hepsi = new Map(); for (const x of [...L.foto, ...L.kisa]) hepsi.set(x.q, x);
// 1. Wikidata
const WD = new Map();
for (const p of parca([...hepsi.keys()].filter((q) => /^Q\d+$/.test(q)), 40)) {
  await sleep(1500);
  const j = await api("www.wikidata.org", { action: "wbgetentities", ids: p.join("|"), props: "sitelinks|claims|descriptions|labels", languages: "tr|en|de" });
  for (const [q, e] of Object.entries(j.entities || {})) {
    const c = e.claims || {}; const v = (k) => (c[k] || []).map((s) => s.mainsnak && s.mainsnak.datavalue && s.mainsnak.datavalue.value).filter(Boolean);
    WD.set(q, { sl: Object.fromEntries(Object.entries(e.sitelinks || {}).map(([k, s]) => [k, s.title])), p18: v("P18"), cat: v("P373")[0] || "", p31: v("P31").map((x) => x.id), ack: Object.fromEntries(Object.entries(e.descriptions || {}).map(([k, s]) => [k, s.value])) });
  }
}
console.log("WD", WD.size);
const sinif = new Set(); for (const w of WD.values()) w.p31.forEach((x) => sinif.add(x));
const SINIF = {};
for (const p of parca([...sinif], 50)) { const j = await api("www.wikidata.org", { action: "wbgetentities", ids: p.join("|"), props: "labels", languages: "tr|en" }); for (const [q, e] of Object.entries(j.entities || {})) SINIF[q] = (e.labels.tr || e.labels.en || {}).value || q; }
// 2. Kısa yazılılar: diğer dillerdeki giriş metinleri
const kisa = [];
for (const x of L.kisa) {
  const w = WD.get(x.q) || { sl: {}, p31: [], ack: {} }; const o = { ...x, sl: Object.keys(w.sl).length, sinif: w.p31.map((c) => SINIF[c]), ack: w.ack, metin: {} };
  for (const dil of ["tr", "en", "de", "fr"]) {
    const t = w.sl[dil + "wiki"]; if (!t) continue;
    const j = await api(dil + ".wikipedia.org", { action: "query", prop: "extracts", explaintext: "1", exintro: "1", titles: t, redirects: "1" });
    const pg = j.query && j.query.pages && j.query.pages[0];
    if (pg && pg.extract) o.metin[dil] = { t: pg.title, x: pg.extract.slice(0, 2500) };
  }
  kisa.push(o);
}
// 3. Fotosuzlar: aday fotoğraflar
const km = (a, b, c, d) => { const r = Math.PI / 180; const x = (d - b) * r * Math.cos(((a + c) / 2) * r), y = (c - a) * r; return Math.sqrt(x * x + y * y) * 6371; };
const foto = [];
fs.mkdirSync("out/k", { recursive: true });
for (const x of L.foto) {
  const w = WD.get(x.q) || { sl: {}, p18: [], cat: "", p31: [], ack: {} };
  const ad = new Map(); const ekle = (a, k) => { a = a.replace(/^File:/, "").replace(/_/g, " "); if (!ad.has(a)) ad.set(a, k); };
  w.p18.forEach((a) => ekle(a, "wikidata"));
  let j = await api("commons.wikimedia.org", { action: "query", list: "search", srnamespace: "6", srlimit: "10", srsearch: `haswbstatement:P180=${x.q}` }); (j.query?.search || []).forEach((s) => ekle(s.title, "depicts"));
  for (const dil of ["en", "de", "fr", "tr", "ru"]) { const t = w.sl[dil + "wiki"]; if (!t) continue; j = await api(dil + ".wikipedia.org", { action: "query", prop: "pageimages", piprop: "name", titles: t, redirects: "1" }); const pi = j.query?.pages?.[0]?.pageimage; if (pi) ekle(pi, dil + "wiki"); }
  if (w.cat) { j = await api("commons.wikimedia.org", { action: "query", list: "categorymembers", cmtitle: "Category:" + w.cat, cmtype: "file", cmlimit: "15" }); (j.query?.categorymembers || []).forEach((s) => ekle(s.title, "kategori")); }
  j = await api("commons.wikimedia.org", { action: "query", list: "search", srnamespace: "6", srlimit: "8", srsearch: x.ad }); (j.query?.search || []).forEach((s) => ekle(s.title, "arama"));
  j = await api("commons.wikimedia.org", { action: "query", list: "geosearch", gsnamespace: "6", gscoord: `${x.lat}|${x.lng}`, gsradius: "1500", gslimit: "20" }); (j.query?.geosearch || []).forEach((s) => ekle(s.title, "yakın" + Math.round(s.dist) + "m"));
  const adaylar = [];
  for (const p of parca([...ad.keys()], 50)) {
    j = await api("commons.wikimedia.org", { action: "query", titles: p.map((a) => "File:" + a).join("|"), prop: "imageinfo|coordinates", iiprop: "url|size|mime|extmetadata", iiurlwidth: "300", iiextmetadatafilter: "Artist|LicenseShortName|DateTimeOriginal|DateTime|ImageDescription" });
    for (const pg of j.query?.pages || []) {
      const ii = pg.imageinfo && pg.imageinfo[0]; if (!ii) continue;
      const a = pg.title.replace(/^File:/, ""); const em = ii.extmetadata || {};
      const lis = (em.LicenseShortName?.value || "").replace(/<[^>]+>/g, "").trim();
      if (ii.mime !== "image/jpeg" || ii.width < 500 || ii.height < 300 || /^GFDL/i.test(lis) || /NC|ND/.test(lis)) continue;
      const k = pg.coordinates?.[0];
      adaylar.push({ a, kay: ad.get(a), w: ii.width, h: ii.height, lis, yil: (/(?:18|19|20)\d\d/.exec((em.DateTimeOriginal || em.DateTime || {}).value || "") || [""])[0], ack: (em.ImageDescription?.value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160), km: k ? +km(x.lat, x.lng, k.lat, k.lon).toFixed(2) : null, th: ii.thumburl });
    }
  }
  const sira = ["wikidata", "depicts", "enwiki", "dewiki", "frwiki", "trwiki", "ruwiki", "kategori", "arama"];
  adaylar.sort((m, n) => (sira.indexOf(m.kay) + 1 || 50 + (+m.kay.slice(5, -1) / 100)) - (sira.indexOf(n.kay) + 1 || 50 + (+n.kay.slice(5, -1) / 100)));
  const sec = adaylar.slice(0, 12);
  for (const [i, c] of sec.entries()) {
    try { const r = await fetch(c.th, { headers: { "User-Agent": UA } }); if (r.ok) fs.writeFileSync(`out/k/${x.q}-${i}.jpg`, Buffer.from(await r.arrayBuffer())); } catch (e) {}
    await sleep(150);
  }
  foto.push({ ...x, sl: Object.keys(w.sl).length, sinif: w.p31.map((c) => SINIF[c]), ack: w.ack, aday: sec });
  console.log(x.il, x.ad, sec.length);
}
fs.writeFileSync("out/foto.json", JSON.stringify(foto, null, 1));
fs.writeFileSync("out/kisa.json", JSON.stringify(kisa, null, 1));
execSync("pip install --quiet pillow && python3 scripts/pafta.py", { stdio: "inherit" });
execSync(`cd out && rm -rf k && git init -q -b veri-aday-sonuc && git config user.name "Mert Turanlıoğlu" && git config user.email "me7rtt@gmail.com" && git add -A && git commit -q -m "Aday" && git push -f "https://x-access-token:${process.env.TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git" veri-aday-sonuc`, { stdio: "inherit" });
