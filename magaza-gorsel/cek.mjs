// Mağaza görselleri için 6.6 ekranlarını telefon boyutunda çeker (390x844, 3x).
import { chromium } from "playwright";
import fs from "fs";
const BASE = "http://localhost:8000/";
const b = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
const idx = await (await fetch(BASE + "data/index.json")).json();
const il = async (s) => (await fetch(`${BASE}data/il/${s}.json?v=${idx.surum}`)).json();
const ist = await il("istanbul"), nev = await il("nevsehir");
const bul = (d, re) => d.yerler.find((y) => re.test(y.ad) && y.f);
const surum = (await (await fetch(BASE + "app.js")).text()).match(/const SURUM = "([^"]+)"/)[1];
const kayit = (y, d) => ({ q: y.q, s: d.s, ad: y.ad, il: [...new Set([y.ilce, d.ad].filter(Boolean))].join(", "), k: y.k, f: y.f, lat: y.lat, lng: y.lng });
const g1 = [/Ayasofya/, /Sultanahmet Camii|Mavi Camii/, /Topkapı Sarayı/, /Yerebatan/].map((r) => bul(ist, r)).filter(Boolean).map((y) => kayit(y, ist));
const g2 = [/Galata Kulesi/, /Kız Kulesi/, /Dolmabahçe Sarayı/, /Ortaköy/].map((r) => bul(ist, r)).filter(Boolean).map((y) => kayit(y, ist));
const g3 = [/Göreme/, /Uçhisar/, /Paşabağ/, /Derinkuyu/].map((r) => bul(nev, r)).filter(Boolean).map((y) => kayit(y, nev));
const plan = [{ id: "p1", ad: "November trip", u: Date.now() - 3e8, g: [g1, g2, g3], kon: [{ ad: "İstanbul", s: "istanbul", lat: 41.01, lng: 28.97 }, { ad: "İstanbul", s: "istanbul", lat: 41.01, lng: 28.97 }, { ad: "Nevşehir", s: "nevsehir", lat: 38.62, lng: 34.71 }] }];
fs.mkdirSync("cikti", { recursive: true });
fs.writeFileSync("cikti/secim.json", JSON.stringify({ g1, g2, g3 }, null, 1));
const ayasofya = bul(ist, /Ayasofya/), goreme = bul(nev, /Göreme/), galata = bul(ist, /Galata Kulesi/);
for (const dil of ["en"]) for (const planli of [true]) {
  const OUT = `cikti/${dil}${planli ? "-plan" : ""}`; fs.mkdirSync(OUT, { recursive: true });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, locale: dil === "en" ? "en-US" : "tr-TR", timezoneId: "Europe/Istanbul", isMobile: true, hasTouch: true, geolocation: { latitude: 41.0059, longitude: 28.9772, accuracy: 15 }, permissions: ["geolocation"] });
  await ctx.clock.install({ time: new Date("2026-11-05T08:30:00Z") });
  await ctx.addInitScript(([d, v, pl]) => { for (const [k, x] of [["gezi-tanitim", "1"], ["gezi-dil", d], ["gezi-yenilik", v], ["gezi-acilis-gordu", "1"], ["gezi-isaret-soru", "1"], ["gezi-puan", '{"n":1,"bitti":1}']]) localStorage.setItem(k, x); if (pl) localStorage.setItem("gezi-plan", pl); }, [dil, surum, planli ? JSON.stringify(plan) : ""]);
  const p = await ctx.newPage();
  const bekle = (ms) => p.waitForTimeout(ms);
  const resimler = async () => { await p.evaluate(async () => { await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 10000); }))); }); await bekle(1500); };
  const cek = async (ad) => { await resimler(); await p.screenshot({ path: `${OUT}/${ad}.png` }); console.log(OUT, ad); };
  const git_ = async (h, ms = 3500) => { await p.evaluate((x) => { location.hash = x; }, h); await bekle(ms); await p.evaluate(() => scrollTo(0, 0)); };
  const kaydir = async (sel, ust = 70) => { await p.evaluate(([s, u]) => { const e = document.querySelector(s); if (e) { e.scrollIntoView({ block: "start" }); scrollBy(0, -u); } }, [sel, ust]); await bekle(1200); };
  const dene = async (ad, fn) => { try { await fn(); } catch (e) { console.log(OUT, "HATA", ad, e.message.split("\n")[0]); } };
  await p.goto(BASE); await bekle(7000);
  await dene("ana", () => cek("01-ana"));
  await dene("ana2", async () => { await p.evaluate(() => scrollBy(0, 520)); await bekle(1000); await cek("01-ana-asagi"); await p.evaluate(() => scrollTo(0, 0)); });
  if (planli) {
    await dene("plan", async () => { await git_("#/plan/p1", 4000); await cek("04-plan"); });
    await dene("plan2", async () => { await p.evaluate(() => scrollBy(0, 600)); await bekle(1000); await cek("04-plan-asagi"); });
    await dene("planliste", async () => { await git_("#/plan", 3000); await cek("04-planlar"); });
    await ctx.close(); continue;
  }
  for (const [ad, y, s] of [["ayasofya", ayasofya, "istanbul"], ["goreme", goreme, "nevsehir"], ["galata", galata, "istanbul"]]) {
    if (!y) continue;
    await dene("yer " + ad, async () => {
      await git_(`#/il/${s}/yer/${y.q}`, 5000); await cek(`02-yer-${ad}`);
      await p.click("#dDinle", { timeout: 4000 }); await bekle(3500); await cek(`02-yer-${ad}-dinle`);
      await p.click("#dDinle", { timeout: 4000 }).catch(() => {}); await p.evaluate(() => history.back()); await bekle(1200);
    });
  }
  await dene("etraf", async () => { await git_("#/", 3500); await p.click('[data-gm="etraf"]', { timeout: 5000 }); await bekle(9000); await cek("03-etraf"); await bekle(6000); await cek("03-etraf-2"); await p.keyboard.press("Escape"); });
  await dene("yakin", async () => { await p.goto(BASE + "#/yakin"); await bekle(7000); await cek("05-yakin"); });
  for (const s of ["nevsehir", "istanbul", "mugla"]) await dene("il " + s, async () => { await git_(`#/il/${s}`, 6000); await cek(`06-il-${s}`); await kaydir("#map", 90); await bekle(2500); await cek(`05-harita-${s}`); });
  await dene("indir", async () => { await git_("#/il/nevsehir", 5000); await kaydir("#indirSec", 300); await cek("07-indir-once"); await p.click("#indirBtn", { timeout: 4000 }); for (let i = 0; i < 40; i++) { await bekle(2000); if (await p.evaluate(() => document.querySelector("#indirBtn")?.classList.contains("hazir"))) break; } await kaydir("#indirSec", 300); await cek("07-indir-hazir"); });
  await ctx.close();
}
await b.close();
