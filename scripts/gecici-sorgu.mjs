// Geçici: kötü fotoğraflı yerler için Commons'ta aday fotoğraf araması (sonuç veri-deneme dalına)
import fs from "node:fs";
const UA = "RotaCepte/6.5 (mertturanlioglu.apps@gmail.com)";
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
const al = async (p) => { const u = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({ format: "json", formatversion: "2", ...p }); for (let i = 0; i < 4; i++) { try { const r = await fetch(u, { headers: { "User-Agent": UA } }); if (r.ok) return r.json(); } catch (e) {} await bekle(2000 * (i + 1)); } return {}; };
const HEDEF = [
  { k: "bergama", ara: ["Pergamon acropolis", "Pergamon theatre", "Trajaneum Pergamon", "Bergama akropol"], kat: ["Acropolis of Pergamon", "Theatre of Pergamon", "Trajaneum"] },
  { k: "hadrianapolis", ara: ["Hadrianapolis Eskipazar", "Hadrianapolis mosaic", "Hadrianapolis Karabük"], kat: ["Hadrianapolis (Paphlagonia)"] },
  { k: "acigol", ara: ["Acıgöl Afyon", "Acıgöl lake Denizli", "Lake Acıgöl"], kat: ["Acıgöl (Denizli)", "Lake Acıgöl"] },
  { k: "uzunkemer", ara: ["Uzunkemer aqueduct", "Uzun Kemer Kemerburgaz", "Mağlova aqueduct"], kat: ["Uzunkemer Aqueduct", "Mağlova Aqueduct"] },
  { k: "sirnak", ara: ["Cizre castle", "Cudi mountain Şırnak", "Kırmızı Medrese Cizre", "Şırnak landscape", "Cizre Tigris"], kat: ["Cizre", "Mount Judi", "Şırnak Province"] },
];
const out = "out"; fs.mkdirSync(out, { recursive: true });
const sonuc = {};
for (const h of HEDEF) {
  const adlar = new Set();
  for (const q of h.ara) { const j = await al({ action: "query", list: "search", srnamespace: "6", srlimit: "15", srsearch: q }); for (const x of (j.query && j.query.search) || []) adlar.add(x.title.replace(/^File:/, "")); await bekle(300); }
  for (const c of h.kat) { const j = await al({ action: "query", list: "categorymembers", cmtitle: "Category:" + c, cmtype: "file", cmlimit: "40" }); for (const x of (j.query && j.query.categorymembers) || []) adlar.add(x.title.replace(/^File:/, "")); await bekle(300); }
  const liste = [...adlar].filter((a) => /\.(jpe?g)$/i.test(a)).slice(0, 40);
  sonuc[h.k] = []; let n = 0;
  for (let i = 0; i < liste.length; i += 20) {
    const p = liste.slice(i, i + 20);
    const j = await al({ action: "query", titles: p.map((a) => "File:" + a).join("|"), prop: "imageinfo", iiprop: "url|size|extmetadata", iiurlwidth: "320", iiextmetadatafilter: "Artist|LicenseShortName" });
    for (const pg of (j.query && j.query.pages) || []) {
      const ii = pg.imageinfo && pg.imageinfo[0]; if (!ii) continue;
      const em = ii.extmetadata || {}, v = (x) => (em[x] ? String(em[x].value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "");
      const lis = v("LicenseShortName"); if (!/CC0|CC BY|Public domain|PD/i.test(lis) || /NC|ND/.test(lis)) continue;
      if (ii.width < 1200) continue;
      const no = String(++n).padStart(2, "0");
      try { const r = await fetch(ii.thumburl, { headers: { "User-Agent": UA } }); if (r.ok) fs.writeFileSync(`${out}/${h.k}-${no}.jpg`, Buffer.from(await r.arrayBuffer())); } catch (e) {}
      sonuc[h.k].push({ no, ad: pg.title.replace(/^File:/, ""), lis, yazar: v("Artist").slice(0, 60), w: ii.width, h: ii.height });
      await bekle(250);
    }
  }
  console.log(h.k, sonuc[h.k].length);
}
fs.writeFileSync(`${out}/sorgu.json`, JSON.stringify(sonuc, null, 1));
