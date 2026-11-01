// Mağaza ekran görüntüleri (1080x1920, TR ve EN). Kullanım: BASE=https://... node .github/ekran.mjs
import { chromium } from "playwright";
import fs from "fs";
const BASE = process.env.BASE || "https://me7rt.github.io/Rota-Cepte/";
const b = await chromium.launch();
const idx = await (await fetch(BASE + "data/index.json")).json();
const sec = { istanbul: 12, nevsehir: 8, izmir: 6, antalya: 6, balikesir: 4, ankara: 5, mardin: 4, trabzon: 3, denizli: 3, mugla: 4, canakkale: 3, bursa: 3, samsun: 2, rize: 2, van: 2 };
const git = [];
for (const [s, n] of Object.entries(sec)) {
  const d = await (await fetch(`${BASE}data/il/${s}.json?v=${idx.surum}`)).json();
  const goruldu = new Set();
  for (const y of d.yerler) { if (git.filter((x) => x.s === s).length >= n) break; if (goruldu.has(y.i) && Math.random() < 0.6) continue; goruldu.add(y.i); git.push({ q: y.q, s, ad: y.ad, il: d.ad, k: y.k, f: y.f, t: Date.now() - Math.floor(Math.random() * 200) * 864e5 }); }
}
const surum = (await (await fetch(BASE + "app.js")).text()).match(/const SURUM = "([^"]+)"/)[1];
for (const dil of ["tr", "en"]) {
  const OUT = `ekran/${dil}`; fs.mkdirSync(OUT, { recursive: true });
  const ctx = await b.newContext({ viewport: { width: 360, height: 640 }, deviceScaleFactor: 3, locale: dil === "en" ? "en-US" : "tr-TR", timezoneId: "Europe/Istanbul", isMobile: true, hasTouch: true });
  // Gündüz saati: selamlama "Günaydın" olsun, gece karanlık görüntü çıkmasın
  await ctx.clock.install({ time: new Date("2026-11-05T08:30:00Z") });
  await ctx.addInitScript(([g, d, v]) => { for (const [k, x] of [["gezi-tanitim", "1"], ["gezi-konum-kapali", "1"], ["gezi-gittim", g], ["gezi-dil", d], ["gezi-yenilik", v], ["gezi-acilis-gordu", "1"]]) localStorage.setItem(k, x); }, [JSON.stringify(git), dil, surum]);
  const p = await ctx.newPage();
  const bekle = (ms) => p.waitForTimeout(ms);
  const resimler = async () => { await p.evaluate(async () => { await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 10000); }))); }); await bekle(900); };
  const cek = async (ad) => { await resimler(); await p.screenshot({ path: `${OUT}/${ad}.png` }); console.log(dil, "çekildi", ad); };
  const git_ = async (h, ms = 3000) => { await p.evaluate((x) => { location.hash = x; }, h); await bekle(ms); await p.evaluate(() => scrollTo(0, 0)); };
  const kaydir = async (sel, ust = 70) => { await p.evaluate(([s, u]) => { const e = document.querySelector(s); if (e) { e.scrollIntoView({ block: "start" }); scrollBy(0, -u); } }, [sel, ust]); await bekle(600); };
  const dene = async (ad, fn) => { try { await fn(); } catch (e) { console.log(dil, "HATA", ad, e.message.split("\n")[0]); } };
  await p.goto(BASE); await bekle(5000);
  await dene("ana", () => cek("01-ana"));
  await dene("yer", async () => { await git_("#/il/nevsehir/yer/Q217265", 4000); await cek("02-yer"); });
  await dene("ataturk", async () => { await p.evaluate(() => history.back()); await bekle(800); await git_("#/ataturk", 3500); await cek("03-ataturk"); });
  await dene("pasaport", async () => { await git_("#/rozetler", 3000); await kaydir("#pasSec", 64); await cek("04-pasaport"); });
  await dene("harita", async () => { await git_("#/rozetler", 2500); await cek("05-harita"); });
  await dene("oyun", async () => { await git_("#/oyun", 4500); await cek("06-oyun"); });
  await dene("yol", async () => { await git_("#/yol/izmir/antalya", 5000); await cek("07-yol"); });
  await dene("il", async () => { await git_("#/il/mugla", 4000); await cek("08-il"); });
  await dene("rota", async () => { await git_("#/rota/kapadokya", 3500); await cek("09-rota"); });
  await dene("tema", async () => { await git_("#/tema/selale", 3500); await cek("10-tema"); });
  await dene("kartlar", async () => { await git_("#/kartlar", 4000); await cek("11-kartlar"); });
  await dene("kacamak", async () => { await git_("#/kacamak/1", 3500); await cek("12-kacamak"); });
  await ctx.close();
}
await b.close();
