// Geçici: veri denemesinde düşen iki popüler yer için teşhis (Çankırı Tuz Mağarası fotoğraf adayları, Göynük Kanyonu Wikidata kaydı)
import fs from "node:fs";
const UA = "RotaCepte/6.5 (mertturanlioglu.apps@gmail.com)";
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
const al = async (host, p) => { const u = `https://${host}/w/api.php?` + new URLSearchParams({ format: "json", formatversion: "2", ...p }); for (let i = 0; i < 4; i++) { try { const r = await fetch(u, { headers: { "User-Agent": UA } }); if (r.ok) return r.json(); } catch (e) {} await bekle(2000 * (i + 1)); } return {}; };
const out = "out"; fs.mkdirSync(out, { recursive: true });
const sonuc = { tuz: [], wd: {} };

// 1) Çankırı Tuz Mağarası: Commons'ta arama ve kategori
const adlar = new Set(["ÇANKIRI Salt Cave, YERALTI TUZ ŞEHRİ - Murat Özsoy 04.jpg"]);
for (const q of ["Çankırı tuz mağarası", "Cankiri salt cave", "Çankırı Salt Cave", "Çankırı tuz", "Tuz Mağarası Çankırı", "YERALTI TUZ ŞEHRİ"]) {
  const j = await al("commons.wikimedia.org", { action: "query", list: "search", srnamespace: "6", srlimit: "30", srsearch: q });
  for (const x of (j.query && j.query.search) || []) adlar.add(x.title.replace(/^File:/, ""));
  await bekle(400);
}
for (const c of ["Çankırı Salt Cave", "Çankırı salt mine", "Çankırı Tuz Mağarası", "Salt caves in Turkey"]) {
  const j = await al("commons.wikimedia.org", { action: "query", list: "categorymembers", cmtitle: "Category:" + c, cmtype: "file", cmlimit: "100" });
  for (const x of (j.query && j.query.categorymembers) || []) adlar.add(x.title.replace(/^File:/, ""));
  await bekle(400);
}
const liste = [...adlar].filter((a) => /\.(jpe?g)$/i.test(a)).slice(0, 60);
let n = 0;
for (let i = 0; i < liste.length; i += 40) {
  const p = liste.slice(i, i + 40);
  const j = await al("commons.wikimedia.org", { action: "query", titles: p.map((a) => "File:" + a).join("|"), prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: "400", iiextmetadatafilter: "Artist|LicenseShortName|DateTimeOriginal|ImageDescription" });
  for (const pg of (j.query && j.query.pages) || []) {
    const ii = pg.imageinfo && pg.imageinfo[0]; if (!ii) continue;
    const em = ii.extmetadata || {}, v = (k) => (em[k] ? String(em[k].value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "");
    const no = String(++n).padStart(2, "0");
    try { const r = await fetch(ii.thumburl || ii.url, { headers: { "User-Agent": UA } }); if (r.ok) fs.writeFileSync(`${out}/tuz-${no}.jpg`, Buffer.from(await r.arrayBuffer())); } catch (e) {}
    sonuc.tuz.push({ no, ad: pg.title.replace(/^File:/, ""), lis: v("LicenseShortName"), yazar: v("Artist").slice(0, 80), tarih: v("DateTimeOriginal"), aciklama: v("ImageDescription").slice(0, 200), w: ii.width, h: ii.height, mime: ii.mime });
    await bekle(300);
  }
}

// 2) Wikidata kayıtları: neden aday olmadıkları
for (const q of ["Q6058426", "Q139437289", "Q975280"]) {
  const j = await al("www.wikidata.org", { action: "wbgetentities", ids: q, props: "labels|claims|sitelinks", languages: "tr|en" });
  const e = j.entities && j.entities[q]; if (!e) continue;
  const c = (p) => ((e.claims && e.claims[p]) || []).map((x) => { const d = x.mainsnak && x.mainsnak.datavalue; return d ? (d.value.id || d.value.latitude !== undefined ? (d.value.id || `${d.value.latitude},${d.value.longitude}`) : d.value) : null; });
  sonuc.wd[q] = { ad: e.labels && (e.labels.tr || e.labels.en || {}).value, P31: c("P31"), P625: c("P625"), P131: c("P131"), P18: c("P18"), P373: c("P373"), site: Object.keys(e.sitelinks || {}).length, trwiki: e.sitelinks && e.sitelinks.trwiki && e.sitelinks.trwiki.title };
  await bekle(400);
}
fs.writeFileSync(`${out}/sorgu.json`, JSON.stringify(sonuc, null, 1));
console.log(sonuc.tuz.length, "dosya;", JSON.stringify(sonuc.wd));
