// Geçici: özel gün kartları için serbest lisanslı (kamu malı, CC0, CC BY) fotoğraf adayları. CC BY-SA ve GFDL alınmaz.
import fs from "node:fs";
const UA = "RotaCepte/6.5 (mertturanlioglu.apps@gmail.com)";
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
const al = async (p) => { const u = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({ format: "json", formatversion: "2", ...p }); for (let i = 0; i < 4; i++) { try { const r = await fetch(u, { headers: { "User-Agent": UA } }); if (r.ok) return r.json(); } catch (e) {} await bekle(2000 * (i + 1)); } return {}; };
const QI = ' incategory:"Quality_images"';
const TEMA = {
  kandil: { kat: ["Mahya", "Kandil simidi", "Sultan Ahmed Mosque at night", "Süleymaniye Mosque at night", "New Mosque (Istanbul) at night", "Ortaköy Mosque at night"],
    ara: ["mahya", "kandil simidi", "mosque night Istanbul" + QI, "Ortaköy mosque night", "Süleymaniye night", "Selimiye night Edirne", "mosque lamps chandelier Turkey"] },
  ramazan: { kat: ["Ramadan in Turkey", "Ramadan in Istanbul", "Iftar in Turkey", "Pide (Ramadan)", "Güllaç", "Ramadan drummers in Turkey"],
    ara: ["ramazan pidesi", "iftar Istanbul", "güllaç", "ramadan Istanbul mahya", "Sultanahmet Ramadan", "iftar table Turkey", "hurma dates plate"] },
  kadir: { kat: ["Selimiye Mosque at night", "Sultan Ahmed Mosque interior", "Mosque lamps in Turkey"],
    ara: ["Selimiye mosque night" + QI, "Sultan Ahmed mosque night" + QI, "mosque interior lamps Istanbul" + QI, "Süleymaniye mosque interior" + QI, "Blue mosque night"] },
  bayram: { kat: ["Turkish delight", "Lokum", "Baklava", "Akide şekeri", "Mosques at sunrise", "Sultan Ahmed Mosque at sunrise"],
    ara: ["lokum", "Turkish delight" + QI, "baklava" + QI, "akide şekeri", "bayram şekeri", "mosque sunrise Istanbul", "Süleymaniye sunrise", "Eyüp Sultan mosque"] },
  yilbasi: { kat: ["Fireworks in Istanbul", "New Year in Istanbul", "Cappadocia in winter", "Snow in Istanbul", "Galata Tower in winter"],
    ara: ["fireworks Istanbul", "fireworks Bosphorus", "Cappadocia snow", "Cappadocia winter balloons", "Galata tower snow", "Istanbul snow" + QI, "New Year Taksim"] },
  anneler: { kat: ["Emirgan Park tulips", "Istanbul Tulip Festival", "Tulips in Istanbul", "Tulip fields in Turkey", "Carnations (flowers)"],
    ara: ["Emirgan tulips", "tulip festival Istanbul", "lale Emirgan", "tulips Istanbul" + QI, "carnation bouquet", "flower bouquet pink" + QI, "Konya tulip field"] },
  babalar: { kat: ["Fishermen on Galata Bridge", "Fishing on Galata Bridge", "Roads in Cappadocia", "Roads in Turkey"],
    ara: ["Galata bridge fishermen sunset", "Galata bridge fishing" + QI, "father son silhouette sunset", "fishing pier sunset Turkey", "road Cappadocia", "mountain road Turkey" + QI, "Sumela road"] },
  demokrasi: { kat: ["15 July Martyrs Bridge at night", "15 July Martyrs Bridge", "Bosphorus Bridge at night", "Flags of Turkey in Istanbul"],
    ara: ["15 Temmuz Şehitler Köprüsü", "Bosphorus bridge night" + QI, "15 July Martyrs Bridge night", "Turkish flags Istanbul", "Turkish flag sky" + QI, "15 Temmuz Demokrasi"] }
};
const izinli = (lis) => /^(cc0|public domain|pd|cc[ -]by[ -]\d|cc[ -]by$)/i.test(lis.trim()) && !/sa/i.test(lis.replace(/^public/i, ""));
const out = "out"; fs.mkdirSync(out, { recursive: true });
const sonuc = {};
for (const [tema, t] of Object.entries(TEMA)) {
  const adlar = new Set();
  for (const k of t.kat) {
    const j = await al({ action: "query", list: "categorymembers", cmtitle: "Category:" + k, cmtype: "file", cmlimit: "150" });
    for (const x of (j.query && j.query.categorymembers) || []) adlar.add(x.title);
    await bekle(300);
  }
  for (const q of t.ara) {
    const j = await al({ action: "query", list: "search", srnamespace: "6", srlimit: "50", srsearch: q + " filetype:bitmap" });
    for (const x of (j.query && j.query.search) || []) adlar.add(x.title);
    await bekle(300);
  }
  const aday = [];
  const liste = [...adlar].filter((a) => /\.jpe?g$/i.test(a));
  for (let i = 0; i < liste.length; i += 50) {
    const j = await al({ action: "query", titles: liste.slice(i, i + 50).join("|"), prop: "imageinfo|categories", clshow: "!hidden", cllimit: "max", iiprop: "url|size|mime|extmetadata", iiurlwidth: "360", iiextmetadatafilter: "Artist|LicenseShortName|DateTimeOriginal|ImageDescription|Credit|Categories" });
    for (const pg of (j.query && j.query.pages) || []) {
      const ii = pg.imageinfo && pg.imageinfo[0]; if (!ii) continue;
      const em = ii.extmetadata || {}, v = (k) => (em[k] ? String(em[k].value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "");
      const lis = v("LicenseShortName");
      if (!izinli(lis) || ii.width < 1500 || ii.height < 1000) continue;
      const qi = /Quality images|Featured pictures|Valued images/i.test(v("Categories"));
      aday.push({ ad: pg.title.replace(/^File:/, ""), lis, yazar: v("Artist").slice(0, 90), tarih: v("DateTimeOriginal").slice(0, 10), aciklama: v("ImageDescription").slice(0, 160), w: ii.width, h: ii.height, qi, kucuk: ii.thumburl, sayfa: ii.descriptionurl });
    }
    await bekle(300);
  }
  aday.sort((a, b) => (b.qi ? 1 : 0) - (a.qi ? 1 : 0) || b.w * b.h - a.w * a.h);
  sonuc[tema] = aday.slice(0, 48);
  let n = 0;
  for (const a of sonuc[tema]) {
    a.no = `${tema}-${String(++n).padStart(2, "0")}`;
    try { const r = await fetch(a.kucuk, { headers: { "User-Agent": UA } }); if (r.ok) fs.writeFileSync(`${out}/${a.no}.jpg`, Buffer.from(await r.arrayBuffer())); } catch (e) {}
    await bekle(150);
  }
  console.log(tema, "aday dosya", liste.length, "| izinli", aday.length);
}
fs.writeFileSync(`${out}/aday.json`, JSON.stringify(sonuc, null, 1));
