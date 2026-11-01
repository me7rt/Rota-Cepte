// Geçici: v6.4 (canlı site) ile v6.5 (bu dal) ekran görüntülerini gerçek fotoğraflarla çeker.
// Çıktı: <cikti>/*.jpg ve liste.json (sıra ve başlıklar)
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const KOK = process.argv[2], CIKTI = process.argv[3];
const ONCE = process.env.ONCE || "https://me7rt.github.io/Rota-Cepte/index.html", SONRA = "http://localhost:8765/index.html";
fs.mkdirSync(CIKTI, { recursive: true });

// gerçek yerlerden bir "gittiğim yerler" listesi (ilk yerlere puan ve not)
const idx = JSON.parse(fs.readFileSync(path.join(KOK, "docs/data/index.json"), "utf8"));
const ilAd = Object.fromEntries(idx.iller.map((i) => [i.s, i.ad]));
const GIT = []; let t0 = Date.parse("2026-10-20T10:00:00+03:00");
const NOTLAR = ["Gün batımında git, manzara inanılmaz.", "Kahvaltısı efsane, mutlaka uğra.", "Sabah erken git, kalabalık yok."];
for (const [s, n] of [["istanbul", 4], ["nevsehir", 3], ["izmir", 2], ["antalya", 3], ["mardin", 2], ["trabzon", 2], ["mugla", 2], ["kars", 1], ["ankara", 2], ["edirne", 1], ["bursa", 2], ["canakkale", 1], ["kirklareli", 1], ["tekirdag", 1], ["kocaeli", 1], ["yalova", 1], ["sakarya", 1], ["bilecik", 1], ["balikesir", 1], ["rize", 1], ["samsun", 1]]) {
  const d = JSON.parse(fs.readFileSync(path.join(KOK, `docs/data/il/${s}.json`), "utf8"));
  d.yerler.slice(0, n).forEach((y, i) => {
    const e = { q: y.q, s, ad: y.ad, il: ilAd[s], k: y.k, f: y.f, t: t0 };
    if (i === 0 && GIT.length < 40) { e.p = GIT.length % 3 === 2 ? 4 : 5; if (GIT.length < 9) e.n = NOTLAR[GIT.length % 3]; }
    GIT.push(e); t0 -= 16 * 864e5;
  });
}
const DETAY = GIT[0]; // İstanbul'un ilk yeri: puanlı ve notlu

const liste = [], bilgi = [];
const ekle = (ad, grup, baslik, cift) => liste.push({ ad, grup, baslik, cift: cift || null });
async function sayfa(b, { yenilik = "6.5", git = false, konum = false, saat = null, dil = "tr", saygi = true, tema = "light" } = {}) {
  const ctx = await b.newContext({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "tr-TR", timezoneId: "Europe/Istanbul", colorScheme: tema, acceptDownloads: true,
    ...(konum ? { geolocation: { latitude: 41.0082, longitude: 28.9784 }, permissions: ["geolocation"] } : {}) });
  await ctx.addInitScript(([yenilik, git, dil, saygi]) => {
    try {
      localStorage.setItem("gezi-acilis-gordu", "1"); localStorage.setItem("gezi-dil", dil);
      localStorage.setItem("gezi-puan", JSON.stringify({ n: 0, t: Date.now() }));
      sessionStorage.setItem("gezi-acilis-atla", "1");
      localStorage.setItem("gezi-tanitim", "1");
      if (yenilik) localStorage.setItem("gezi-yenilik", yenilik);
      if (saygi) localStorage.setItem("gezi-saygi", "2026");
      if (git && !localStorage.getItem("gezi-gittim")) localStorage.setItem("gezi-gittim", git);
    } catch (e) {}
  }, [yenilik, git ? JSON.stringify(GIT) : "", dil, saygi]);
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
const gizleBar = (pg) => pg.addStyleTag({ content: "#tabbar{visibility:hidden!important}" }).catch(() => {});
const cek = async (pg, ad, kirp) => { await pg.screenshot({ path: path.join(CIKTI, ad + ".jpg"), type: "jpeg", quality: 80, ...(kirp ? { clip: kirp } : {}) }); bilgi.push("ok " + ad); };
const cekEl = async (pg, sec, ad) => {
  const el = typeof sec === "string" ? await pg.$(sec) : sec; if (!el) { bilgi.push("yok " + ad); return false; }
  await el.scrollIntoViewIfNeeded().catch(() => {}); await bekle(pg, 500); await resimler(pg);
  await el.screenshot({ path: path.join(CIKTI, ad + ".jpg"), type: "jpeg", quality: 82 }); bilgi.push("ok " + ad); return true;
};
async function onizlemeKaydet(pg, ad) { // .karnek img (data URL) → PNG
  try { await pg.waitForSelector(".karnek img", { timeout: 20000 }); } catch (e) { bilgi.push("önizleme yok " + ad); return false; }
  await bekle(pg, 600);
  const src = await pg.$eval(".karnek img", (i) => i.src).catch(() => "");
  if (!src.startsWith("data:")) { bilgi.push("önizleme veri değil " + ad); return false; }
  fs.writeFileSync(path.join(CIKTI, ad + ".png"), Buffer.from(src.split(",")[1], "base64")); bilgi.push("ok " + ad);
  await pg.evaluate(() => document.querySelectorAll(".tanit").forEach((x) => x.remove())); return true;
}
const ortala = (pg, sec) => pg.evaluate((s) => { const e = document.querySelector(s); if (e) e.scrollIntoView({ block: "start" }); scrollBy(0, -70); }, sec);

(async () => {
  const b = await chromium.launch();
  // ===== önce / sonra =====
  for (const [on, URL] of [["once", ONCE], ["sonra", SONRA]]) {
    let { ctx, pg } = await sayfa(b, { git: true, saat: "2026-11-02T11:00:00+03:00" });
    await pg.goto(URL); await pg.clock.runFor(3000); await bekle(pg, 3000); await resimler(pg); await cek(pg, `${on}-ana`);
    await pg.evaluate(() => scrollBy(0, 760)); await bekle(pg, 700); await resimler(pg); await cek(pg, `${on}-ana2`);
    await pg.evaluate(() => scrollBy(0, 760)); await bekle(pg, 700); await resimler(pg); await cek(pg, `${on}-ana3`);
    // il sayfası ve hava kutusu
    await pg.goto(URL + "#/il/istanbul"); await bekle(pg, 3500); await resimler(pg); await cek(pg, `${on}-il`);
    await gizleBar(pg);
    const h = await pg.$("#hava");
    if (h) { try { await pg.waitForFunction(() => document.querySelector("#hava .hgun"), null, { timeout: 25000 }); } catch (e) { bilgi.push("hava gelmedi " + on); } await cekEl(pg, h, `${on}-hava`); }
    // gidilmiş bir yerin kartı (puan ve not)
    await pg.goto(URL + `#/il/istanbul/yer/${DETAY.q}`); await bekle(pg, 3500); await resimler(pg); await cek(pg, `${on}-detay`);
    await pg.evaluate(() => { const s = document.querySelector("#sheet .card"); if (s) s.scrollTop = 420; }); await bekle(pg, 700); await cek(pg, `${on}-detay2`);
    if (on === "sonra" && await pg.isVisible("#dFotoPay")) { await pg.click("#dFotoPay"); if (await onizlemeKaydet(pg, "foto-kart")) ekle("foto-kart.png", "Paylaşım", "Fotoğraflı yer paylaşımı"); }
    // gezilerim / pasaport
    await pg.goto(URL + "#/rozetler"); await bekle(pg, 3500); await resimler(pg); await cek(pg, `${on}-gezilerim`);
    await pg.evaluate(() => scrollBy(0, 760)); await bekle(pg, 700); await resimler(pg); await cek(pg, `${on}-gezilerim2`);
    await ctx.close();
  }
  ekle("ana", "Ana sayfa", "Ana sayfa", "once-ana"); ekle("ana2", "Ana sayfa", "Ana sayfa, aşağısı", "once-ana2"); ekle("ana3", "Ana sayfa", "Ana sayfa, daha aşağısı", "once-ana3");
  ekle("il", "İl sayfası", "İl sayfası", "once-il"); ekle("hava", "İl sayfası", "Hava durumu", "once-hava");
  ekle("detay", "Yer kartı", "Gittiğin yerin kartı", "once-detay"); ekle("detay2", "Yer kartı", "Kartın devamı", "once-detay2");
  ekle("gezilerim", "Gezilerim", "Gezilerim", "once-gezilerim"); ekle("gezilerim2", "Gezilerim", "Gezilerim, aşağısı", "once-gezilerim2");

  // ===== yalnızca v6.5 =====
  let { ctx, pg } = await sayfa(b, { git: true, saat: "2026-11-02T11:00:00+03:00" });
  await pg.goto(SONRA); await pg.clock.runFor(3000); await bekle(pg, 3000);
  // yenilikler kartı
  const yb = await pg.$("#yeniBtn"); if (yb) { await yb.click(); await bekle(pg, 1200); await cek(pg, "yeni-kart"); ekle("yeni-kart", "Yenilikler", "Sürüm 6.5'te yeni kartı"); await pg.evaluate(() => document.querySelectorAll(".tanit").forEach((x) => x.remove())); }
  // ayın kartı, sana özel, pasaport özeti
  await pg.goto(SONRA); await bekle(pg, 3000);
  if (await cekEl(pg, "#ozelSec", "sana-ozel")) ekle("sana-ozel", "Ana sayfa", "Sana özel öneriler");
  if (await cekEl(pg, "#pasOzet", "pas-ozet")) ekle("pas-ozet", "Ana sayfa", "Pasaport özeti");
  if (await cekEl(pg, "#mevsim", "ay-kart")) ekle("ay-kart", "Ana sayfa", "Kasım'da nereye?");
  // pasaport
  await pg.goto(SONRA + "#/rozetler"); await bekle(pg, 3000); await gizleBar(pg);
  if (await cekEl(pg, "#pasKapak", "pas-kapak")) ekle("pas-kapak", "Gezi pasaportu", "Pasaport kapağı ve unvan");
  for (const [i, ad] of [[0, "Marmara"], [4, "Karadeniz"]]) {
    await pg.click(`#pasBolge [data-sayfa="${i}"]`).catch(() => {}); await bekle(pg, 900);
    if (await cekEl(pg, `#pasSayfa .pyaprak:nth-child(${i + 1})`, `pas-sayfa${i}`)) ekle(`pas-sayfa${i}`, "Gezi pasaportu", `${ad} sayfası`);
  }
  if (await cekEl(pg, "#pasSira", "pas-sira")) ekle("pas-sira", "Gezi pasaportu", "Sıradaki damga");
  if (await cekEl(pg, "#sevSec", "sevdik")) ekle("sevdik", "Gezilerim", "En sevdiğin yerler");
  if (await pg.isVisible("#pasPay")) {
    const [dl] = await Promise.all([pg.waitForEvent("download", { timeout: 20000 }).catch(() => null), pg.click("#pasPay")]);
    if (dl) { await dl.saveAs(path.join(CIKTI, "pas-paylas.png")); ekle("pas-paylas.png", "Gezi pasaportu", "Paylaşım görseli"); bilgi.push("ok pas-paylas"); }
  }
  await pg.goto(SONRA + "#/il/istanbul"); await bekle(pg, 3000); await gizleBar(pg);
  if (await cekEl(pg, "#ilDamga", "il-damga")) ekle("il-damga", "Gezi pasaportu", "İl sayfasında damga");
  // Atatürk'ün izinde
  await pg.goto(SONRA + "#/ataturk"); await bekle(pg, 3500); await resimler(pg); await cek(pg, "ata1");
  await pg.evaluate(() => scrollBy(0, 800)); await bekle(pg, 700); await resimler(pg); await cek(pg, "ata2");
  await ortala(pg, ".atev"); await bekle(pg, 700); await resimler(pg); await cek(pg, "ata3");
  await pg.evaluate(() => scrollTo(0, document.body.scrollHeight)); await bekle(pg, 700); await cek(pg, "ata4");
  ekle("ata1", "Atatürk'ün izinde", "Sayfanın başı"); ekle("ata2", "Atatürk'ün izinde", "Tarih sıralı duraklar"); ekle("ata3", "Atatürk'ün izinde", "Atatürk evleri"); ekle("ata4", "Atatürk'ün izinde", "Sayfanın sonu");
  // Hangi ilde?
  await pg.goto(SONRA + "#/oyun"); await bekle(pg, 3500); await resimler(pg); await cek(pg, "oyun1"); ekle("oyun1", "Hangi ilde?", "Soru");
  for (let i = 0; i < 10; i++) {
    const s = await pg.$("#oyunKutu [data-il]:not([disabled])"); if (!s) break;
    await s.click(); await bekle(pg, 900);
    if (i === 0) { await resimler(pg); await cek(pg, "oyun2"); ekle("oyun2", "Hangi ilde?", "Cevaptan sonra"); }
    const n = await pg.$('#oyunKutu [data-k="sonraki"]'); if (n) { await n.click(); await bekle(pg, 900); }
  }
  await bekle(pg, 1200); await pg.evaluate(() => scrollTo(0, 0)); await bekle(pg, 500); await cek(pg, "oyun3"); ekle("oyun3", "Hangi ilde?", "Sonuç");
  await ctx.close();

  // şans çarkı ve yol molası
  ({ ctx, pg } = await sayfa(b, { konum: true, saat: "2026-11-02T11:00:00+03:00" }));
  await pg.goto(SONRA + "#/cark"); await pg.clock.runFor(2000); await bekle(pg, 2500); await cek(pg, "cark1"); ekle("cark1", "Şans çarkı", "Çark");
  const cv = await pg.$("#cark .btn.primary, #carkCevir, [data-k=cevir]");
  if (cv) { await cv.click(); await pg.clock.runFor(6000); await bekle(pg, 2500); await resimler(pg); await cek(pg, "cark2"); ekle("cark2", "Şans çarkı", "Çıkan il");
    await pg.evaluate(() => scrollBy(0, 600)); await bekle(pg, 600); await resimler(pg); await cek(pg, "cark3"); ekle("cark3", "Şans çarkı", "Çıkan ilin kartı"); }
  await pg.goto(SONRA + "#/yol/istanbul/antalya"); await bekle(pg, 3500);
  if (await cekEl(pg, "#yolMola", "yol-mola")) ekle("yol-mola", "Yol üstü keşif", "Mola planı");
  await ctx.close();

  // hava: altın saat sırasında (akşamüstü)
  ({ ctx, pg } = await sayfa(b, { saat: "2026-11-02T16:40:00+03:00" }));
  await pg.goto(SONRA + "#/il/antalya"); await pg.clock.runFor(3000); await bekle(pg, 3000); await gizleBar(pg);
  try { await pg.waitForFunction(() => document.querySelector("#hava .hgun"), null, { timeout: 25000 }); } catch (e) {}
  if (await cekEl(pg, "#hava", "hava-altin")) ekle("hava-altin", "İl sayfası", "Altın saat sırasında hava kutusu");
  await ctx.close();

  // ===== özel günler (tarih taklidi) =====
  const GUN = [
    ["2026-11-10T09:10:00+03:00", "10 Kasım: saygı kartı", true],
    ["2026-11-10T12:00:00+03:00", "10 Kasım: ana sayfa şeridi"],
    ["2026-11-24T10:00:00+03:00", "24 Kasım Öğretmenler Günü"],
    ["2026-12-10T10:00:00+03:00", "Regaip Kandili"],
    ["2027-01-04T10:00:00+03:00", "Miraç Kandili"],
    ["2027-01-22T10:00:00+03:00", "Berat Kandili"],
    ["2027-02-06T10:00:00+03:00", "6 Şubat anma günü"],
    ["2027-02-15T10:00:00+03:00", "Ramazan ayı"],
    ["2027-03-05T10:00:00+03:00", "Kadir Gecesi"],
    ["2027-03-09T10:00:00+03:00", "Ramazan Bayramı"],
    ["2027-03-12T10:00:00+03:00", "İstiklal Marşı'nın kabulü"],
    ["2027-03-18T10:00:00+03:00", "18 Mart Çanakkale Zaferi"],
    ["2027-04-23T10:00:00+03:00", "23 Nisan"],
    ["2027-05-09T10:00:00+03:00", "Anneler Günü"],
    ["2027-05-19T10:00:00+03:00", "19 Mayıs ve Kurban Bayramı"],
    ["2027-08-30T10:00:00+03:00", "30 Ağustos Zafer Bayramı"],
    ["2027-10-29T10:00:00+03:00", "29 Ekim Cumhuriyet Bayramı"]
  ];
  for (const [i, [saat, ad, kart]] of GUN.entries()) {
    ({ ctx, pg } = await sayfa(b, { saat, saygi: !kart }));
    await pg.goto(SONRA); await pg.clock.runFor(4000); await bekle(pg, 2500);
    if (kart) { await pg.clock.runFor(4000); await bekle(pg, 1500); }
    await resimler(pg); const dosya = `gun${String(i).padStart(2, "0")}`;
    await cek(pg, dosya, kart ? null : { x: 0, y: 0, width: 393, height: 520 }); ekle(dosya, "Özel günler", ad);
    const og = kart ? null : await pg.$(".ogpay");
    if (og) { await og.click({ timeout: 8000 }).catch(() => {}); if (await onizlemeKaydet(pg, "kart" + dosya.slice(3))) ekle("kart" + dosya.slice(3) + ".png", "Tebrik kartları", ad.replace(/^10 Kasım: .*/, "10 Kasım")); }
    await ctx.close();
  }
  await b.close();
  fs.writeFileSync(path.join(CIKTI, "liste.json"), JSON.stringify(liste, null, 1));
  fs.writeFileSync(path.join(CIKTI, "bilgi.txt"), bilgi.join("\n"));
  console.log(bilgi.join("\n"));
})();
