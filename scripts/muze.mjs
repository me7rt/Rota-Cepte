// muze.gov.tr'den müze listesi, ziyaret saati, ücret ve MüzeKart geçerliliği (keşif aşaması: ham sayfaları kaydeder)
import fs from "node:fs";
const OUT = "muze-cikti"; fs.mkdirSync(OUT, { recursive: true });
const UA = { "User-Agent": "RotaCepte-veri/1.0 (+https://me7rt.github.io/Rota-Cepte/)" };
const al = async (u) => { try { const r = await fetch(u, { headers: UA }); return { u, s: r.status, t: await r.text() }; } catch (e) { return { u, s: 0, t: String(e) }; } };
const sayfalar = ["https://muze.gov.tr/robots.txt", "https://muze.gov.tr/", "https://muze.gov.tr/muzeler", "https://muze.gov.tr/muzekart", "https://muze.gov.tr/sitemap.xml"];
const log = [];
for (const u of sayfalar) {
  const r = await al(u); log.push(`${r.s} ${u} ${r.t.length}`);
  fs.writeFileSync(`${OUT}/${u.replace(/^https:\/\//, "").replace(/[^a-z0-9]+/gi, "_")}.html`, r.t);
}
// listede geçen ilk birkaç müze bağlantısını da indir
const liste = fs.readFileSync(`${OUT}/muze_gov_tr_muzeler.html`, "utf8");
const linkler = [...new Set([...liste.matchAll(/href="([^"]*muze-detay[^"]*)"/gi)].map((m) => m[1]))].slice(0, 3);
for (const l of linkler) { const u = new URL(l, "https://muze.gov.tr/").href; const r = await al(u); log.push(`${r.s} ${u} ${r.t.length}`); fs.writeFileSync(`${OUT}/detay_${linkler.indexOf(l)}.html`, r.t); }
fs.writeFileSync(`${OUT}/log.txt`, log.join("\n") + "\n");
console.log(log.join("\n"));
