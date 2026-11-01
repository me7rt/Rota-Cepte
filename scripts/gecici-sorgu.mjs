// Geçici: Atatürk'ün imzasının SVG dosyasını (kamu malı) ve lisans bilgisini Commons'tan alır, kart-foto dalına koyar
import fs from "node:fs";
const UA = "RotaCepte/6.5 (mertturanlioglu.apps@gmail.com)";
const api = async (p) => { const u = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({ format: "json", formatversion: "2", ...p }); for (let i = 0; i < 4; i++) { try { const r = await fetch(u, { headers: { "User-Agent": UA } }); if (r.ok) return r.json(); } catch (e) {} await new Promise((r) => setTimeout(r, 2000 * (i + 1))); } return {}; };
const out = "out"; fs.mkdirSync(out, { recursive: true });
const sonuc = [];
for (const q of ["Atatürk signature", "Atatürk imza", "Mustafa Kemal Atatürk signature svg", "Ataturk Signature"]) {
  const j = await api({ action: "query", generator: "search", gsrsearch: q + " filetype:drawing", gsrnamespace: "6", gsrlimit: "20", prop: "imageinfo|templates", iiprop: "url|size|mime|extmetadata", iiextmetadatafilter: "LicenseShortName|License|Artist|ImageDescription", tlnamespace: "10", tllimit: "max" });
  for (const pg of (j.query && j.query.pages) || []) {
    const ii = pg.imageinfo && pg.imageinfo[0]; if (!ii || !/svg/.test(ii.mime) || sonuc.some((x) => x.title === pg.title)) continue;
    const em = ii.extmetadata || {}, v = (k) => (em[k] ? String(em[k].value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "");
    const dosya = `imza-${sonuc.length}.svg`;
    try { const r = await fetch(ii.url, { headers: { "User-Agent": UA } }); if (r.ok) fs.writeFileSync(`${out}/${dosya}`, Buffer.from(await r.arrayBuffer())); } catch (e) {}
    sonuc.push({ dosya, title: pg.title, lis: v("LicenseShortName"), tpl: (pg.templates || []).map((t) => t.title.replace("Template:", "")).filter((t) => /^PD|^Cc|^CC|trademark|Insignia/i.test(t)), artist: v("Artist").slice(0, 100), aciklama: v("ImageDescription").slice(0, 160), w: ii.width, h: ii.height, url: ii.url, sayfa: ii.descriptionurl });
  }
}
console.log(sonuc.length);
fs.writeFileSync(`${out}/imza.json`, JSON.stringify(sonuc, null, 1));
