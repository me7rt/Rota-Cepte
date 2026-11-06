/* Rota Cepte · © 2026 Mert Turanlıoğlu · Çevrimdışı açılış (önce internet, yavaşsa ya da yoksa kayıtlı kopya) */
const C = "gezi-6.4";
const IND = "gezi-indir"; // "İnternetsiz kullan" ile indirilen il verisi ve fotoğraflar (sürüm değişse de silinmez)
// Uygulamanın iskeleti: ilk kurulumda kaydedilir, böylece ilk ziyaretten sonra internetsiz de açılır
const ISKELET = ["./", "index.html", "style.css?v=6.4", "app.js?v=6.4", "i18n.js?v=6.4", "vendor/lucide.js?v=6.4", "vendor/leaflet.js", "vendor/leaflet.css",
  "vendor/font/manrope-latin-wght-normal.woff2", "vendor/font/manrope-latin-ext-wght-normal.woff2", "icon-192.png", "manifest.webmanifest",
  "gizlilik.html", "lisanslar.html", "kosullar.html", "belge.css?v=6.3"];
self.addEventListener("install", (e) => e.waitUntil(
  caches.open(C).then((c) => c.addAll(ISKELET)).catch((err) => console.warn("iskelet kaydedilemedi", err)).then(() => self.skipWaiting())));
self.addEventListener("activate", (e) => e.waitUntil(
  caches.keys().then((k) => Promise.all(k.filter((x) => x !== C && x !== IND).map((x) => caches.delete(x)))).then(() => self.clients.claim())));
const kayitli = async (r) => (await caches.match(r)) || (await caches.match(r, { ignoreSearch: true }));
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  // Fotoğraflar: indirilmişse telefondan, değilse internetten
  if (u.hostname === "upload.wikimedia.org") {
    e.respondWith(caches.open(IND).then((c) => c.match(r.url, { ignoreVary: true })).then((m) => m || fetch(r)));
    return;
  }
  if (u.origin !== location.origin) return;
  const sayfa = r.mode === "navigate";
  const ag = fetch(r).then((res) => {
    if (res.ok) { const k = res.clone(); e.waitUntil(caches.open(C).then((c) => c.put(r, k)).catch(() => {})); }
    return res;
  });
  e.respondWith(new Promise((bitti) => {
    let oldu = false;
    const ver = (x) => { if (!oldu && x) { oldu = true; bitti(x); } };
    // İnternet 4 saniyede cevap vermezse ve kayıtlı kopya varsa onu göster; yoksa internet beklenir
    const t = setTimeout(() => kayitli(r).then(ver), 4000);
    ag.then((res) => { clearTimeout(t); ver(res); }).catch(async () => {
      clearTimeout(t);
      const m = await kayitli(r);
      if (m) return ver(m);
      if (sayfa) return ver((await caches.match("./")) || (await caches.match("index.html")) || Response.error());
      ver(Response.error());
    });
  }));
});
