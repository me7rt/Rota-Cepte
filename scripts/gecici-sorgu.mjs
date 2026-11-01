// Geçici: kartlardaki sözlerin tam metnini doğrulamak için Vikikaynak, Vikisöz ve Vikipedi'den ilgili sayfaların metnini alır
import fs from "node:fs";
const UA = "RotaCepte/6.5 (mertturanlioglu.apps@gmail.com)";
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
const api = async (site, p) => { const u = `https://${site}/w/api.php?` + new URLSearchParams({ format: "json", formatversion: "2", ...p }); for (let i = 0; i < 4; i++) { try { const r = await fetch(u, { headers: { "User-Agent": UA } }); if (r.ok) return r.json(); } catch (e) {} await bekle(2000 * (i + 1)); } return {}; };
const out = "out/metin"; fs.mkdirSync(out, { recursive: true });
const ARA = ["Gençliğe Hitabe", "İstiklâl Marşı", "Çanakkale Şehitlerine", "Onuncu Yıl Nutku", "Nutuk", "en hakiki mürşit", "fikri hür, vicdanı hür, irfanı hür", "Küçük hanımlar, küçük beyler", "İlk hedefiniz Akdeniz", "Yeni nesil sizin eseriniz", "Muallimler Birliği", "Yurtta sulh, cihanda sulh"];
const SAYFA = new Map();
for (const site of ["tr.wikisource.org", "tr.wikiquote.org"]) {
  for (const q of ARA) {
    const j = await api(site, { action: "query", list: "search", srsearch: `"${q}"`, srlimit: "8", srwhat: "text" });
    const s = ((j.query && j.query.search) || []).map((x) => ({ t: x.title, snip: x.snippet.replace(/<[^>]+>/g, "") }));
    fs.appendFileSync(`${out}/arama.txt`, `\n### ${site} :: ${q}\n` + s.map((x) => `- ${x.t} :: ${x.snip}`).join("\n") + "\n");
    for (const x of s.slice(0, 4)) SAYFA.set(site + "|" + x.t, 1);
    await bekle(300);
  }
}
for (const t of ["Gençliğe Hitabe", "İstiklal Marşı", "Onuncu Yıl Nutku", "Çanakkale Şehitlerine", "Nutuk", "Mustafa Kemal Atatürk"]) SAYFA.set("tr.wikipedia.org|" + t, 1);
SAYFA.set("tr.wikiquote.org|Mustafa Kemal Atatürk", 1);
let no = 0;
for (const k of SAYFA.keys()) {
  const [site, t] = k.split("|");
  const j = await api(site, { action: "parse", page: t, prop: "wikitext", redirects: "1" });
  const w = j.parse && j.parse.wikitext; if (!w) continue;
  fs.writeFileSync(`${out}/${String(no++).padStart(2, "0")}-${site.split(".")[1]}-${t.replace(/[^\p{L}\p{N}]+/gu, "_").slice(0, 60)}.txt`, `# ${site} :: ${t}\n\n` + w);
  await bekle(300);
}
console.log("sayfa", no);
