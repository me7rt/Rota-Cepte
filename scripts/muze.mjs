// muze.gov.tr'den (robots.txt izin veriyor) müze listesi ve detay sayfalarının metni. Çıktı muze-ham dalına gider,
// asıl ayrıştırma docs/data/muzekart.json üretiminde yapılır.
import fs from "node:fs";
const OUT = "muze-cikti", K = "https://muze.gov.tr"; fs.mkdirSync(OUT, { recursive: true });
const UA = "RotaCepte-veri/1.0 (+https://me7rt.github.io/Rota-Cepte/)";
let cerez = "";
const cerezAl = (r) => { const s = r.headers.getSetCookie ? r.headers.getSetCookie() : []; if (s.length) cerez = [cerez, ...s.map((x) => x.split(";")[0])].filter(Boolean).join("; "); };
const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
async function al(u, govde) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(u, govde ? { method: "POST", headers: { "User-Agent": UA, Cookie: cerez, "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "X-Requested-With": "XMLHttpRequest" }, body: new URLSearchParams(govde), signal: AbortSignal.timeout(40000) } : { headers: { "User-Agent": UA, Cookie: cerez }, signal: AbortSignal.timeout(40000) });
      cerezAl(r); const t = await r.text(); if (r.ok) return t;
    } catch (e) {}
    await bekle(1500 * (i + 1));
  }
  return "";
}
const coz = (s) => s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const metin = (h) => coz(h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<br\s*\/?>|<\/p>|<\/li>|<\/h\d>|<\/div>|<\/tr>/gi, "\n").replace(/<[^>]+>/g, " ")).replace(/[ \t]+/g, " ").replace(/\n\s*\n+/g, "\n").trim();
const ana = await al(K + "/muzeler");
const token = (ana.match(/name="__RequestVerificationToken"[^>]*value="([^"]+)"/) || [])[1] || "";
const iller = [...ana.matchAll(/<option value="(\d+)">([^<]+)/g)].map((m) => ({ id: m[1], ad: coz(m[2]).trim() }));
console.log("token", !!token, "il", iller.length);
const muzeler = new Map();
for (const il of iller) {
  const h = await al(K + "/Museums/GetSections", { __RequestVerificationToken: token, provinceId: il.id, sections: "" });
  if (il.id === "6") fs.writeFileSync(`${OUT}/il-ankara.html`, h);
  for (const m of h.matchAll(/<article[\s\S]*?<\/article>/g)) {
    const a = m[0], l = (a.match(/href="([^"]*muze-detay[^"]*)"/) || [])[1]; if (!l) continue;
    const u = K + coz(l), ad = coz((a.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || "").trim(), foto = (a.match(/data-progressive="([^"]+)"/) || [])[1] || "";
    if (!muzeler.has(u)) muzeler.set(u, { u, il: il.ad, ilId: il.id, ad, kart: metin(a).slice(0, 400), foto: !!foto });
  }
  await bekle(300);
}
console.log("muze", muzeler.size);
const liste = [...muzeler.values()]; let i = 0, ilk = true;
// Site sayfa başına ~10 sn yanıt veriyor: 4 istek aynı anda
async function isci() {
  while (i < liste.length) {
    const m = liste[i++]; const h = await al(m.u);
    if (ilk && h) { fs.writeFileSync(`${OUT}/detay-ornek.html`, h); ilk = false; }
    const govde = h.split(/<footer/i)[0]; const bas = govde.search(/<h1/i);
    m.metin = metin(bas > 0 ? govde.slice(bas) : govde).slice(0, 6000);
    if (i % 25 === 0) console.log(i, "/", liste.length);
    await bekle(200);
  }
}
await Promise.all([isci(), isci(), isci(), isci()]);
fs.writeFileSync(`${OUT}/muzeler.json`, JSON.stringify({ tarih: new Date().toISOString(), iller, muzeler: liste }, null, 1));
fs.writeFileSync(`${OUT}/log.txt`, `token ${!!token}\nil ${iller.length}\nmuze ${liste.length}\nbos ${liste.filter((m) => !m.metin).length}\n`);
