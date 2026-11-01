// Geçici: v6.4 (canlı site) ile v6.5 (bu dal) ekran görüntülerini gerçek fotoğraflarla çeker.
// Çıktı: <cikti>/*.png
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const KOK = process.argv[2], CIKTI = process.argv[3];
const ONCE = process.env.ONCE || "https://me7rt.github.io/Rota-Cepte/index.html", SONRA = "http://localhost:8765/index.html";
fs.mkdirSync(CIKTI, { recursive: true });

// gerçek yerlerden bir "gittiğim yerler" listesi
const idx = JSON.parse(fs.readFileSync(path.join(KOK, "docs/data/index.json"), "utf8"));
const ilAd = Object.fromEntries(idx.iller.map((i) => [i.s, i.ad]));
const GIT = []; let t0 = Date.parse("2026-10-20T10:00:00+03:00");
for (const [s, n] of [["istanbul", 4], ["nevsehir", 3], ["izmir", 2], ["antalya", 3], ["mardin", 2], ["trabzon", 2], ["mugla", 2], ["kars", 1], ["ankara", 2]]) {
  const d = JSON.parse(fs.readFileSync(path.join(KOK, `docs/data/il/${s}.json`), "utf8"));
  for (const y of d.yerler.slice(0, n)) { GIT.push({ q: y.q, s, ad: y.ad, il: ilAd[s], k: y.k, f: y.f, t: t0 }); t0 -= 16 * 864e5; }
}

const bilgi = [];
async function sayfa(b, { tanitimli = true, yenilik = "6.5", git = false, konum = false, saat = null } = {}) {
  const ctx = await b.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "tr-TR", timezoneId: "Europe/Istanbul",
    ...(konum ? { geolocation: { latitude: 41.0082, longitude: 28.9784 }, permissions: ["geolocation"] } : {}) });
  await ctx.addInitScript(([tanitimli, yenilik, git]) => {
    try {
      localStorage.setItem("gezi-acilis-gordu", "1"); localStorage.setItem("gezi-dil", "tr");
      localStorage.setItem("gezi-puan", JSON.stringify({ n: 0, t: Date.now() }));
      sessionStorage.setItem("gezi-acilis-atla", "1");
      if (tanitimli) localStorage.setItem("gezi-tanitim", "1");
      if (yenilik) localStorage.setItem("gezi-yenilik", yenilik);
      if (git && !localStorage.getItem("gezi-gittim")) localStorage.setItem("gezi-gittim", git);
    } catch (e) {}
  }, [tanitimli, yenilik, git ? JSON.stringify(GIT) : ""]);
  const pg = await ctx.newPage();
  pg.on("pageerror", (e) => bilgi.push("HATA " + e.message));
  if (saat) await pg.clock.install({ time: new Date(saat) });
  return { ctx, pg };
}
const bekle = (pg, ms) => pg.waitForTimeout(ms);
async function resimler(pg) { // görünen fotoğraflar yüklensin
  try { await pg.waitForFunction(() => [...document.images].filter((i) => i.getBoundingClientRect().top < innerHeight && i.getBoundingClientRect().bottom > 0).every((i) => i.complete), null, { timeout: 15000 }); } catch (e) {}
  await bekle(pg, 800);
}
const cek = async (pg, ad) => { await pg.screenshot({ path: path.join(CIKTI, ad + ".png") }); bilgi.push("ok " + ad); };

(async () => {
  const b = await chromium.launch();
  for (const [ön, URL] of [["once", ONCE], ["sonra", SONRA]]) {
    // ana sayfa
    let { ctx, pg } = await sayfa(b);
    await pg.goto(URL); await bekle(pg, 3000); await resimler(pg); await cek(pg, `${ön}-ana`);
    await pg.evaluate(() => scrollBy(0, 700)); await bekle(pg, 600); await resimler(pg); await cek(pg, `${ön}-ana2`);
    // il sayfası: hava kutusu
    await pg.goto(URL + "#/il/istanbul"); await bekle(pg, 3500); await resimler(pg); await cek(pg, `${ön}-il`);
    const h = await pg.$("#hava");
    if (h) {
      await h.scrollIntoViewIfNeeded();
      try { await pg.waitForFunction(() => document.querySelector("#hava .hgun"), null, { timeout: 25000 }); } catch (e) { bilgi.push("hava gelmedi " + ön); }
      await bekle(pg, 1500); await resimler(pg);
      await pg.addStyleTag({ content: "#tabbar{visibility:hidden!important}" });
      await h.screenshot({ path: path.join(CIKTI, `${ön}-hava.png`) }); bilgi.push("ok hava " + ön);
    }
    // gezilerim / pasaport
    await ctx.close(); ({ ctx, pg } = await sayfa(b, { git: true }));
    await pg.goto(URL + "#/rozetler"); await bekle(pg, 3500); await resimler(pg); await cek(pg, `${ön}-gezilerim`);
    await ctx.close();
  }
  // --- yalnızca v6.5 ---
  let { ctx, pg } = await sayfa(b, { yenilik: "" });
  await pg.goto(SONRA); await bekle(pg, 8000); await cek(pg, "sonra-yenilik");
  await ctx.close();

  ({ ctx, pg } = await sayfa(b));
  await pg.goto(SONRA + "#/kartlar"); await bekle(pg, 3000); await resimler(pg); await cek(pg, "sonra-kartlar");
  const k = await pg.$(".kkart.ust");
  if (k) {
    const bb = await k.boundingBox();
    await pg.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await pg.mouse.down();
    await pg.mouse.move(bb.x + bb.width / 2 + 70, bb.y + bb.height / 2 - 10, { steps: 6 }); await bekle(pg, 300);
    await cek(pg, "sonra-kartlar-kaydir");
    await pg.mouse.move(bb.x + bb.width / 2 + 180, bb.y + bb.height / 2, { steps: 6 }); await pg.mouse.up(); await bekle(pg, 1200);
    for (let i = 0; i < 3; i++) { await pg.click("#kBeg"); await bekle(pg, 900); }
  }
  await pg.goto(SONRA + "#/listem"); await bekle(pg, 2500); await resimler(pg); await cek(pg, "sonra-listem");
  const kod = await pg.evaluate(() => { try { return JSON.parse(localStorage.getItem("gezi-fav")).map((x) => `${x.s}~${String(x.q).slice(1)}`).join(","); } catch (e) { return ""; } });
  await pg.evaluate(() => localStorage.removeItem("gezi-fav"));
  await pg.goto(SONRA + "#/liste/" + kod); await bekle(pg, 3000); await resimler(pg); await cek(pg, "sonra-paylasilan-liste");
  await pg.goto(SONRA + "#/il/istanbul"); await bekle(pg, 3000);
  const aile = await pg.$('#chips [data-k="aile"]');
  if (aile) { await aile.click(); await bekle(pg, 800); await pg.evaluate(() => { const c = document.getElementById("chips"); if (c) c.scrollIntoView(); scrollBy(0, -80); }); await bekle(pg, 600); await resimler(pg); await cek(pg, "sonra-cocuklarla"); }
  await pg.goto(SONRA + "#/yol/istanbul/antalya"); await bekle(pg, 3500); await resimler(pg); await cek(pg, "sonra-yol");
  await pg.evaluate(() => scrollBy(0, 600)); await bekle(pg, 600); await resimler(pg); await cek(pg, "sonra-yol2");
  await ctx.close();

  ({ ctx, pg } = await sayfa(b, { konum: true }));
  await pg.goto(SONRA + "#/kacamak"); await bekle(pg, 3500);
  const kl = await pg.$("#kacLoc"); if (kl && await kl.isVisible()) { await kl.click(); await bekle(pg, 2500); }
  await resimler(pg); await cek(pg, "sonra-kacamak");
  await ctx.close();

  // bayram geri sayımı (tarih 1 Şubat 2027 gibi davranır)
  ({ ctx, pg } = await sayfa(b, { saat: "2027-02-01T10:00:00+03:00" }));
  await pg.goto(SONRA); await pg.clock.runFor(3000); await bekle(pg, 1500); await resimler(pg); await cek(pg, "sonra-bayram");
  await ctx.close();

  // yılın özeti (tarih 5 Aralık 2026 gibi davranır)
  ({ ctx, pg } = await sayfa(b, { git: true, saat: "2026-12-05T12:00:00+03:00" }));
  await pg.goto(SONRA + "#/rozetler"); await pg.clock.runFor(3000); await bekle(pg, 1500);
  if (await pg.isVisible("#ozetBtn")) {
    await pg.evaluate(() => document.getElementById("ozetBtn").scrollIntoView({ block: "center" })); await bekle(pg, 500); await cek(pg, "sonra-ozet-buton");
    await pg.click("#ozetBtn"); await pg.clock.runFor(1500); await bekle(pg, 1500);
    const src = await pg.$eval(".karnek img", (i) => i.src).catch(() => "");
    if (src) { fs.writeFileSync(path.join(CIKTI, "sonra-ozet-gorsel.png"), Buffer.from(src.split(",")[1], "base64")); bilgi.push("ok sonra-ozet-gorsel"); }
  }
  await ctx.close();
  await b.close();
  fs.writeFileSync(path.join(CIKTI, "bilgi.txt"), bilgi.join("\n"));
  console.log(bilgi.join("\n"));
})();
