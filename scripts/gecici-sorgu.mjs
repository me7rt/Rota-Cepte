// Geçici: tebrik kartları için kamu malı (PD) Atatürk fotoğraflarını Commons'ta arar, küçük hallerini ve lisans bilgisini kart-foto dalına koyar
import fs from "node:fs";
const UA = "RotaCepte/6.5 (mertturanlioglu.apps@gmail.com)";
const api = async (p) => { const u = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({ format: "json", formatversion: "2", ...p }); for (let i = 0; i < 4; i++) { try { const r = await fetch(u, { headers: { "User-Agent": UA } }); if (r.ok) return r.json(); } catch (e) {} await new Promise((r) => setTimeout(r, 2000 * (i + 1))); } return {}; };
const ARA = {
  cocuk: ["Atatürk children", "Atatürk çocuk", "Atatürk çocuklarla", "Atatürk with children", "Atatürk Ülkü"],
  ogretmen: ["Atatürk alphabet", "Atatürk harf devrimi", "Atatürk Sarayburnu 1928", "Atatürk teaching", "Atatürk Başöğretmen", "Atatürk kara tahta"],
  samsun: ["Atatürk 1919", "Mustafa Kemal Samsun 1919", "Mustafa Kemal Havza", "Atatürk Erzurum Kongresi", "Atatürk Sivas 1919"],
  zafer: ["Atatürk 1922", "Mustafa Kemal Başkomutan", "Atatürk Dumlupınar", "Mustafa Kemal 1921 Sakarya", "Mustafa Kemal Kocatepe"],
  cumhuriyet: ["Atatürk 1923", "Atatürk portrait", "Mustafa Kemal Atatürk portrait", "Atatürk 1930", "Atatürk 10. yıl nutku"],
  canakkale: ["Mustafa Kemal 1915", "Mustafa Kemal Anafartalar", "Mustafa Kemal Gallipoli", "Mustafa Kemal Bey 1915"]
};
const out = "out"; fs.mkdirSync(out, { recursive: true });
const sonuc = []; const gor = new Set();
for (const [grup, sorgular] of Object.entries(ARA)) {
  let say = 0;
  for (const q of sorgular) {
    const j = await api({ action: "query", generator: "search", gsrsearch: q, gsrnamespace: "6", gsrlimit: "40", prop: "imageinfo|templates", iiprop: "url|size|mime|extmetadata", iiurlwidth: "1080", iiextmetadatafilter: "LicenseShortName|License|Artist|DateTimeOriginal|ImageDescription|Restrictions|Credit", tlnamespace: "10", tllimit: "max" });
    for (const pg of (j.query && j.query.pages) || []) {
      const ii = pg.imageinfo && pg.imageinfo[0]; if (!ii || gor.has(pg.title)) continue;
      const em = ii.extmetadata || {}, v = (k) => (em[k] ? String(em[k].value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "");
      const lis = v("LicenseShortName"), tpl = (pg.templates || []).map((t) => t.title.replace("Template:", "")).filter((t) => /^PD|^Cc-zero|^CC0/i.test(t));
      if (!/public domain|^pd|cc0/i.test(lis + " " + v("License"))) continue;
      if (!/jpeg|png/.test(ii.mime) || ii.width < 700) continue;
      gor.add(pg.title); say++;
      const no = String(sonuc.length).padStart(3, "0"), dosya = `${grup}-${no}.jpg`;
      try { const r = await fetch(ii.thumburl || ii.url, { headers: { "User-Agent": UA } }); if (r.ok) fs.writeFileSync(`${out}/${dosya}`, Buffer.from(await r.arrayBuffer())); } catch (e) {}
      sonuc.push({ grup, dosya, title: pg.title, lis, tpl, artist: v("Artist").slice(0, 120), tarih: v("DateTimeOriginal").slice(0, 40), aciklama: v("ImageDescription").slice(0, 200), kisit: v("Restrictions"), w: ii.width, h: ii.height, url: ii.url, sayfa: ii.descriptionurl });
      await new Promise((r) => setTimeout(r, 300));
    }
    if (say >= 14) break;
  }
  console.log(grup, say);
}
fs.writeFileSync(`${out}/liste.json`, JSON.stringify(sonuc, null, 1));
