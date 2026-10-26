/* Rota Cepte · © 2026 Mert Turanlıoğlu · Tüm hakları saklıdır. İzinsiz kopyalanamaz ve yayınlanamaz.
   Rota Cepte: 81 il, tüm ilçeler, canlı konum.
   Veri docs/data altında; GitHub Actions'ta Wikidata, Vikipedi ve Commons'tan hazırlanır (scripts/uret.mjs). */
(function () {
  "use strict";
  const SURUM = "6.4";
  if (window.ikDoldur) ikDoldur();
  // MapTiler harita anahtarı (boşsa OpenStreetMap kullanılır)
  const HARITA_ANAHTAR = "pI5pMuHAI4gLw3aqy35G";

  // Kategori ikonları (Lucide)
  const KIK = { t: "castle", d: "mountain", m: "landmark", c: "store", s: "building", y: "map-pin" };
  const icon = (k, size = 18) => ik(KIK[k] || k || "map-pin", size);
  const OKIK = ik("chevron-right", 18, "okik");
  const CATS = {
    t: { ad: T("Tarihi"), renk: "var(--k-t)" },
    d: { ad: T("Doğa & Manzara"), renk: "var(--k-d)" },
    m: { ad: T("Müze"), renk: "var(--k-m)" },
    c: { ad: T("Çarşı & Lezzet"), renk: "var(--k-c)" },
    s: { ad: T("Şehir & Semt"), renk: "var(--k-s)" }
  };
  const BOLGE_RENK = "var(--k-y)";
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const sade = (s) => String(s).toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");
  const nf = (n) => Number(n).toLocaleString(DIL === "en" ? "en-US" : "tr-TR");
  // İngilizce modda İngilizce Vikipedi adı yoksa Türkçe adın genel kelimesini çevir: "Erzurum Kalesi" -> "Erzurum Castle"
  const AD_EN = [
    [/^(.+) Ulu Camii?$/, "$1 Grand Mosque"], [/^Ulu Camii?$/, "Grand Mosque"], [/ Camii?$/, " Mosque"], [/ Mescidi$/, " Masjid"],
    [/ Arkeoloji ve Etnografya Müzesi$/, " Archaeology and Ethnography Museum"], [/ Arkeoloji Müzesi$/, " Archaeology Museum"],
    [/ Etnografya Müzesi$/, " Ethnography Museum"], [/ (Kent|Şehir) (Tarih[iî]? )?Müzesi$/, " City Museum"], [/ Evi Müzesi$/, " House Museum"], [/ Müzesi$/, " Museum"],
    [/ Kilisesi$/, " Church"], [/ Su Kemeri$/, " Aqueduct"], [/ Köprüsü$/, " Bridge"], [/ Saat Kulesi$/, " Clock Tower"], [/ Kulesi$/, " Tower"],
    [/ Tabiat Parkı$/, " Nature Park"], [/ Tarih[iî] Mill[iî] Parkı$/, " Historical National Park"], [/ Mill[iî] Parkı$/, " National Park"], [/ Parkı$/, " Park"],
    [/ (Türbesi|Kümbeti)$/, " Tomb"], [/ Hamamı$/, " Hamam"], [/ Çeşmesi$/, " Fountain"],
    [/ Tren İstasyonu$/, " Railway Station"], [/ Garı$/, " Station"], [/ Gölü$/, " Lake"],
    [/ Şelaleleri$/, " Waterfalls"], [/ Şelalesi$/, " Waterfall"], [/ Mağaraları$/, " Caves"], [/ Mağarası$/, " Cave"],
    [/ Kanyonu$/, " Canyon"], [/ Vadisi$/, " Valley"], [/ Yaylası$/, " Plateau"], [/ (Kervansarayı|Hanı)$/, " Caravanserai"],
    [/ Medresesi$/, " Madrasa"], [/ Manastırı$/, " Monastery"], [/ Külliyesi$/, " Complex"], [/ Höyüğü$/, " Mound"],
    [/ Yeraltı Şehri$/, " Underground City"], [/ Antik Kenti$/, " Ancient City"], [/ Antik Tiyatrosu$/, " Ancient Theatre"],
    [/ Tiyatrosu$/, " Theatre"], [/ Ören Yeri$/, " Archaeological Site"], [/ Kaya Mezarları$/, " Rock Tombs"], [/ Kaya Kabartması$/, " Rock Relief"],
    [/ Sarayı$/, " Palace"], [/ Köşkü$/, " Pavilion"], [/ Konağı$/, " Mansion"], [/ Evi$/, " House"], [/ Adaları$/, " Islands"], [/ Adası$/, " Island"],
    [/ Koyu$/, " Bay"], [/ Plajı$/, " Beach"], [/ (Deniz )?Feneri$/, " Lighthouse"], [/ Tepesi$/, " Hill"], [/ Anıtı$/, " Monument"],
    [/ Heykeli$/, " Statue"], [/ (Barajı|Bendi)$/, " Dam"], [/ Kaplıcaları?$/, " Hot Springs"], [/ Çarşısı$/, " Bazaar"], [/ Tapınağı$/, " Temple"],
    [/ Sarnıcı$/, " Cistern"], [/ Mezarlığı$/, " Cemetery"], [/ Şehitliği$/, " Martyrs' Cemetery"], [/ Kalıntıları$/, " Ruins"],
    [/ Ormanı$/, " Forest"], [/ Lagünü$/, " Lagoon"], [/ (Obruğu|Düdeni)$/, " Sinkhole"], [/ Kalesi$/, " Castle"],
    [/^(.+) Dağı$/, "Mount $1"], [/^(.+) Burnu$/, "Cape $1"]
  ];
  // Geri kalan kısımda Türkçe tanım kelimesi varsa yarım çeviri yapma ("Atatürk ve Çocuk Museum" olmasın), Türkçe adı bırak
  const AD_TR_KELIME = /(^| )(ve|ile|Müze|Müzesi|Evi|Açık|Hava|Tarihi|Kültür|Sanat|Sanatları|Devlet|Resim|Heykel|Galerisi|Kahramanlık|Panoraması|Savunması|Geleneksel|El|Oyun|Oyuncak|Doğa|Hayvan|Sanayi|Teknoloji|Üniversitesi|Fakültesi|Ziraat|Deprem|Anma|Kurtuluş|Savaşı|Mezarı|Eserleri|Cephesi|Karargahı|Çocuk|Mücadele|Vapuru|Kaya|Yaşayan|Bilim|Merkezi|Arkeoloji|Etnografya|Kent|Şehir|Tarih|Tarihî|Camii|Kalesi|Köprüsü|Kilisesi|Parkı|Vadisi|Şelalesi|Mağarası|Mağaraları|Dağı|Dağları|Gölü|Adası|Sarayı|Kulesi|Hanı|Medresesi|Türbesi|Çeşmesi|Hamamı|Millî|Milli|Tabiat|Antik|Kenti|Yeri|Ören)( |$)/;
  function adEn(ad) {
    const m = /^(.+?)(, [^,]+)?$/.exec(ad), bas = m[1], son = m[2] || "";
    for (const [r, y] of AD_EN) if (r.test(bas)) {
      const kalan = bas.replace(r, "");
      return AD_TR_KELIME.test(kalan) ? ad : bas.replace(r, y) + son;
    }
    return ad;
  }
  const adi = (p) => (DIL === "en" ? p.ae || adEn(p.ad) : p.ad);
  // Yapım/kuruluş tarihi Wikidata'dan Türkçe biçimde gelir ("15. yüzyıl", "MÖ 330"): İngilizce modda çevir
  function yilYaz(y) {
    if (DIL !== "en" || !y) return y;
    const sira = (n) => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");
    const m = /^(MÖ )?(\d+)(\. yüzyıl|\. binyıl|'ler)?$/.exec(y); if (!m) return y;
    const n = +m[2], mo = m[1] ? " BC" : "";
    if (m[3] === ". yüzyıl") return sira(n) + " century" + mo;
    if (m[3] === ". binyıl") return sira(n) + " millennium" + mo;
    if (m[3] === "'ler") return n + "s" + mo;
    return n + mo;
  }
  function km(a, b) {
    const R = 6371, r = (x) => (x * Math.PI) / 180;
    const dLa = r(b.lat - a.lat), dLo = r(b.lng - a.lng);
    const h = Math.sin(dLa / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLo / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  const fmt = (d) => (d < 1 ? Math.round(d * 100) * 10 + " m" : d < 100 ? (DIL === "en" ? d.toFixed(1) : d.toFixed(1).replace(".", ",")) + " km" : nf(Math.round(d)) + " km");
  function toast(msg, ms = 3500) {
    const t = document.createElement("div");
    t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg; document.body.appendChild(t);
    setTimeout(() => t.remove(), ms);
  }

  // ---------- fotoğraf ve bağlantılar ----------
  const COM = "https://upload.wikimedia.org/wikipedia/commons/";
  // Küçük resim yüklenmezse orijinal dosyayı dene, o da olmazsa kaldır
  window.fotoHata = (img) => {
    if (!img.dataset.y && img.src.includes("/thumb/")) { img.dataset.y = 1; img.src = img.src.replace("/thumb/", "/").replace(/\/[^/]+$/, ""); }
    else img.remove();
  };
  function foto(f, W) {
    if (!f || !f.p) return "";
    const p = f.p.split("?")[0];
    if (f.w <= W) return COM + p;
    return `${COM}thumb/${p}/${W}px-${p.split("/").pop()}`;
  }
  function wikiUrl(w) {
    if (!w) return "";
    const i = w.indexOf(":");
    return `https://${w.slice(0, i)}.wikipedia.org/wiki/${encodeURIComponent(w.slice(i + 1).replace(/ /g, "_"))}`;
  }
  // Fotoğraf atfı: yazar · lisans · Wikimedia Commons. Dokununca dosyanın Commons sayfası açılır
  // (CC lisansları lisansa ya da kaynak sayfaya bağlantı ister; tam lisans orada yazar).
  function comSayfa(f) {
    let ad = f.p.split("?")[0].split("/").pop();
    try { ad = decodeURIComponent(ad); } catch (e) {}
    return "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(ad);
  }
  // Commons'tan gelen yazar/lisans metnindeki İngilizce kalıpları sadeleştir (Türkçe modda Türkçeye çevir)
  const VIKI_DIL = { Turkish: "Türkçe", English: "İngilizce", German: "Almanca", French: "Fransızca", Kurdish: "Kürtçe", Russian: "Rusça", Italian: "İtalyanca", Polish: "Lehçe", Dutch: "Felemenkçe", Spanish: "İspanyolca", Armenian: "Ermenice", Greek: "Yunanca", Persian: "Farsça", Arabic: "Arapça", tr: "Türkçe", en: "İngilizce", de: "Almanca", fr: "Fransızca" };
  const LIS_TR = { "Public domain": "Kamu malı", "No restrictions": "Kısıtlama yok", "Copyrighted free use": "Serbest kullanım", Attribution: "Atıf" };
  function atifYaz(a) {
    const en = DIL === "en";
    return a.replace(/&amp;/g, "&").split(" · ").map((k, i) => {
      if (i) return en ? k : LIS_TR[k] || k;
      k = k.replace(/^[^:]*\.(jpe?g|png|gif|tiff?|svg)\s*:\s*/i, "").replace(/^No machine-readable author provided\. (.+?) assumed.*$/, "$1").replace(/\bUser:/g, "").replace(/ from [^·]+$/, "");
      if (/^(Unknown author)+$/i.test(k)) return en ? "Unknown author" : "Bilinmeyen yazar";
      if (k === "Public domain") return en ? k : "Kamu malı";
      const m = /^(?:The )?[Oo]riginal uploader was (.+?) at (\w+)(?:[ .]wikipedia)?\.?$/i.exec(k) || /^(.+?) at (\w+) Wikipedia\.?$/.exec(k);
      if (m) { const d = VIKI_DIL[m[2]]; return en ? `${m[1]} (${d ? m[2] + (m[2].length === 2 ? ".wikipedia" : " Wikipedia") : "Wikipedia"})` : `${m[1]} (${d ? d + " " : ""}Vikipedi)`; }
      return k.replace(/ at (?:https?:\/\/)?(?:www\.)?([\w.-]+\.\w+)\/?$/, " ($1)");
    }).join(" · ");
  }
  function fotoAtif(f, on) {
    if (!f || !f.p) return "";
    const yazi = T("Fotoğraf:") + " " + (f.a ? atifYaz(f.a) + " · " : "") + "Wikimedia Commons";
    return (on ? esc(on) + " · " : "") + `<a href="${comSayfa(f)}" target="_blank" rel="noopener">${esc(yazi)}</a>`;
  }
  // Vikipedi metinleri CC BY-SA 4.0: lisans adı + bağlantı + değişiklik notu
  function metinLisans(el, var_, ceviri) {
    el.hidden = !var_;
    el.innerHTML = var_ ? (ceviri ? TL("Metin: İngilizce Vikipedi'den çevrilmiştir", "Text: translated from Turkish Wikipedia") : TL("Metin: Vikipedi", "Text: Wikipedia")) + ` · <a href="https://creativecommons.org/licenses/by-sa/4.0/${DIL === "en" ? "" : "deed.tr"}" target="_blank" rel="noopener">CC BY-SA 4.0</a> · ` + TL("kısaltılmıştır", "shortened") : "";
  }
  // Fotoğraf yüklenemezse altındaki kategori simgesi görünür kalır.
  function thumb(f, k, W, cls) {
    const src = foto(f, W || 250);
    const renk = CATS[k] ? CATS[k].renk : BOLGE_RENK;
    return `<span class="${cls || "thumb"}" style="--c:${renk}">${icon(k, cls === "cover" ? 34 : 22)}${src ? `<img src="${src}" alt="" loading="lazy" decoding="async" onerror="fotoHata(this)">` : ""}</span>`;
  }

  // ---------- veri ----------
  let IDX = null;
  const IL = new Map();
  let ARA = null, araYukleniyor = false;
  async function getJSON(url, opt) {
    const r = await fetch(url, opt);
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
  }
  async function loadIndex() {
    const x = await getJSON(`data/index.json?v=${SURUM}`, { cache: "no-cache" });
    x.iller.forEach((il) => il.ilceler.forEach((z) => { z[0] = z[0].replace(/ \(.*\)$/, ""); }));
    x.ilBy = new Map(x.iller.map((i) => [i.s, i]));
    IDX = x;
    const s = IDX.surum || "";
    $("ver").textContent = TL(`Sürüm ${SURUM} · Veri ${s.slice(6, 8)}.${s.slice(4, 6)}.${s.slice(0, 4)} · ${nf(IDX.iller.reduce((t, i) => t + i.n, 0))} yer, ${nf(IDX.iller.reduce((t, i) => t + i.ilceler.length, 0))} ilçe`, `Version ${SURUM} · Data ${s.slice(6, 8)}.${s.slice(4, 6)}.${s.slice(0, 4)} · ${nf(IDX.iller.reduce((t, i) => t + i.n, 0))} places, ${nf(IDX.iller.reduce((t, i) => t + i.ilceler.length, 0))} districts`);
  }
  const ilYukleniyor = new Map();
  function loadIl(s) {
    if (IL.has(s)) return Promise.resolve(IL.get(s));
    if (!ilYukleniyor.has(s)) ilYukleniyor.set(s, ilGetir(s).finally(() => ilYukleniyor.delete(s)));
    return ilYukleniyor.get(s);
  }
  async function ilGetir(s) {
    const d = await getJSON(`data/il/${s}.json?v=${IDX.surum}`);
    d.ilceler.forEach((z) => { z.ad = z.ad.replace(/ \(.*\)$/, ""); });
    d.yerler.forEach((y, j) => { y.j = j; y.il = d.ad; y.ilS = d.s; y.ilce = y.i >= 0 && d.ilceler[y.i] ? d.ilceler[y.i].ad : ""; });
    if (DIL === "en") {
      const en = await getJSON(`data/en/${s}.json?v=${IDX.surum}`).catch((e) => { console.warn("İngilizce veri yok:", s, e); return null; });
      if (en) {
        // Vikipedi girişlerindeki parantezleri (okunuş, Türkçe adı) at: "Cappadocia (; Turkish: Kapadokya) is..." -> "Cappadocia is..."
        // Okunuş parantezlerini at; Vikipedi özeti bazen kapanmayan parantez bırakır: "Cyzicus ( SIZ-ik-əs; ...; was an ..."
        const sade = (t) => (t || "").replace(/\s*\([^()]*\)/g, "").replace(/\s*\((?![^()]*\))[^()]*?;\s+(?=[a-z])/, " ").replace(/\s+([,.])/g, "$1");
        d.me = sade(en.m); d.we = en.w;
        // e[3] = 1: Türkçe Vikipedi metninin İngilizce çevirisi (bağlantı Türkçe maddeye gider)
        d.yerler.forEach((y) => { const e = en.y && en.y[y.q]; if (e) { if (e[0]) y.ae = e[0]; y.me = e[3] ? e[1] : sade(e[1]); y.we = e[2] ? (e[3] ? "tr:" : "en:") + e[2] : ""; if (e[3]) y.cve = 1; } });
      }
    }
    IL.set(s, d);
    return d;
  }
  let araSoz = null;
  // Arama listesindeki yerin gösterilecek adı (İngilizce modda İngilizce adı)
  const araAd = (x) => (DIL === "en" ? x[9] : x[1]);
  // Kaydedilmiş listelerdeki (Türkçe) adın İngilizce modda gösterilecek hali
  function kayitAd(x) {
    if (DIL !== "en") return x.ad;
    const r = ARA && ARA.find((y) => y[2] === x.s && y[1] === x.ad);
    return r ? r[9] : adEn(x.ad);
  }
  function loadAra() {
    if (ARA) return Promise.resolve();
    if (araSoz) return araSoz;
    araSoz = getJSON(`data/ara.json?v=${IDX.surum}-2`).then((a) => {
      ARA = a.map(([ad, s, j, lat, lng, k, f, p, ae]) => { const en = ae || adEn(ad); return [sade(ad), ad, s, j, lat, lng, k, f, p || 0, en, sade(en)]; });
      if (view && view.mode === "tema") renderTema();
      if (view && view.mode === "rota") renderRota();
      if (!$("listem").hidden) renderFav();
      if (!$("home").hidden && $("search").value.trim().length >= 2) renderHome();
    }).catch(() => { araSoz = null; });
    return araSoz;
  }

  // ---------- durum ----------
  let me = null, watchId = null, konumBekleyen = [];
  let view = { mode: "home" };
  let places = [], cat = "hepsi", sortMode = "oner", shown = 60;
  let map = null, layer = null, meMarker = null, fitted = false;
  let open = null, sheetPushed = false, bekleyenYer = null, homeMe = null, sonSira = 0, routeNo = 0;

  // ---------- konum ----------
  document.querySelector("#locBtn .locik").innerHTML = ik("locate-fixed", 16);
  function stopLocation() {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    watchId = null; me = null; homeMe = null; konumBekleyen = [];
    try { localStorage.setItem("gezi-konum-kapali", "1"); } catch (e) {}
    $("locBtn").classList.remove("on");
    $("locText").textContent = T("Konum kapalı");
    $("nearSub").textContent = T("Konumunu aç, sana en yakın gezilecek yerleri sıralayalım");
    if (meMarker && layer) { layer.removeLayer(meMarker); meMarker = null; }
    if (open) renderFacts(open);
    if (view && view.mode === "tema") renderTema();
    else if (!$("home").hidden) renderHome();
    else if (!$("city").hidden && view.d) { if (sortMode === "yakin") sortMode = "oner"; renderSort(); renderList(); if (!$("tabIlce").hidden) renderIlceList(view.d); }
    toast(T("Konum kapatıldı"));
  }
  function startLocation(cb) {
    try { localStorage.removeItem("gezi-konum-kapali"); } catch (e) {}
    if (!navigator.geolocation) { toast(T("Bu cihaz konumu desteklemiyor.")); return; }
    if (watchId !== null) { if (cb) { if (me) cb(); else konumBekleyen.push(cb); } return; }
    if (cb) konumBekleyen.push(cb);
    let first = true;
    $("locText").textContent = T("Konum aranıyor…");
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        me = { lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy };
        $("locBtn").classList.add("on");
        $("locText").textContent = T("Konum açık");
        $("nearSub").textContent = T("Sana en yakın gezilecek yerler, canlı mesafeyle");
        if (first) { first = false; if (view.mode !== "home") sortMode = "yakin"; onMove(true); konumBekleyen.splice(0).forEach((f) => f()); }
        else onMove(false);
      },
      (err) => {
        // Yalnızca izin reddedilince izlemeyi bırak; zaman aşımı ya da geçici sinyal kaybında izleme sürer
        if (err.code !== 1) { if (!me) toast(T("Konum bulunamadı, tekrar dene.")); return; }
        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
        watchId = null; me = null; homeMe = null; konumBekleyen = [];
        $("locBtn").classList.remove("on");
        $("locText").textContent = T("Konum kapalı");
        toast(T("Konum izni verilmedi. Ayarlardan izin verebilirsin."));
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 }
    );
  }
  let moveTimer = null;
  function onMove(hemen) {
    clearTimeout(moveTimer);
    moveTimer = setTimeout(() => {
      if (!me) return;
      if (!$("city").hidden) {
        drawMe();
        if (hemen || (sortMode === "yakin" && Date.now() - sonSira > 15000)) { sonSira = Date.now(); renderSort(); renderList(); }
        else updateKm();
        if (hemen && !$("tabIlce").hidden && view.d) renderIlceList(view.d);
      }
      if (open) renderFacts(open);
      if (!$("home").hidden && (!homeMe || km(homeMe, me) > 2)) { homeMe = me; renderHome(); }
      if (!$("listem").hidden) renderFav();
      if (!kesifYakin && !$("home").hidden) gununKesfi();
      if (hemen && view && view.mode === "tema") renderTema();
    }, hemen ? 0 : 400);
  }
  function updateKm() {
    for (const el of document.querySelectorAll("#list .row")) {
      const d = IL.get(el.dataset.s); const p = d && d.yerler[+el.dataset.j];
      if (p) el.querySelector(".km").textContent = fmt(km(me, p));
    }
    for (const el of document.querySelectorAll("#ilceList .km")) el.textContent = fmt(km(me, { lat: +el.dataset.lat, lng: +el.dataset.lng }));
  }

  // ---------- yönlendirme (#/il/istanbul, #/il/istanbul/ilceler, #/il/istanbul/ilce/3, #/yakin) ----------
  function show(v) {
    const degisti = $(v).hidden;
    $("home").hidden = v !== "home";
    $("tema").hidden = v !== "tema";
    $("rota").hidden = v !== "rota";
    $("rozet").hidden = v !== "rozet";
    $("listem").hidden = v !== "listem";
    $("city").hidden = v !== "city";
    $("indirSec").hidden = true;
    $("plan").hidden = true;
    $("back").hidden = v === "home" || v === "listem" || v === "rozet" || (view && view.mode === "near");
    if (degisti || v === "city") window.scrollTo(0, 0);
    navAktif();
  }
  // Alt menü: hangi sekmedeyiz
  function navAktif() {
    const m = view && view.mode, k = m === "home" ? "home" : m === "near" ? "near" : m === "listem" ? "listem" : m === "rozet" ? "rozet" : "";
    for (const a of document.querySelectorAll("#tabbar a")) { const on = a.dataset.nav === k; a.classList.toggle("on", on); if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); }
  }
  async function route() {
    const no = ++routeNo;
    hideSheet();
    let h = [];
    try {
      h = location.hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
      if (!IDX) await loadIndex();
      if (h[0] === "il" && IDX.ilBy.has(h[1])) {
        const ozet = IDX.ilBy.get(h[1]);
        if (!IL.has(h[1])) {
          show("city"); $("eyebrow").textContent = T("İl"); $("title").textContent = ozet.ad;
          $("hero").hidden = true; $("tabs").hidden = true; $("tabIlce").hidden = true; $("tabYer").hidden = false;
          $("chips").innerHTML = ""; $("count").textContent = ""; $("moreBtn").hidden = true;
          $("list").innerHTML = `<li class="empty">${T("Yükleniyor…")}</li>`;
        }
        const d = await loadIl(h[1]);
        if (no !== routeNo) return;
        if (h[2] === "ilce" && d.ilceler[+h[3]]) showIlce(d, +h[3]);
        else showIl(d, h[2] === "ilceler" ? "ilce" : "yer");
        if (h[2] === "yer") { const p = d.yerler.find((y) => y.q === h[3]); history.replaceState(null, "", "#/il/" + d.s); if (p) openDetail(p); }
        if (bekleyenYer && bekleyenYer.s === d.s) { const p = d.yerler[bekleyenYer.j]; bekleyenYer = null; if (p) openDetail(p); }
        else bekleyenYer = null;
        return;
      }
      if (h[0] === "yakin") return await showNear(no);
      if (h[0] === "tema" && TEMA[h[1]]) return showTema(h[1]);
      if (h[0] === "rota") return await showRota(h[1], no);
      if (h[0] === "rozetler") { view = { mode: "rozet" }; show("rozet"); $("eyebrow").textContent = T("Gezi haritan ve rozetler"); $("title").textContent = T("Gezilerim"); renderGez(); return; }
      if (h[0] === "listem") { view = { mode: "listem" }; show("listem"); $("eyebrow").textContent = "Rota Cepte"; $("title").textContent = T("Gideceğim yerler"); renderFav(); return; }
      showHome();
    } catch (e) {
      console.error(e);
      if (no !== routeNo) return;
      show("home"); $("homeMain").hidden = false; $("results").hidden = true;
      $("ilGrid").innerHTML = TL('<li class="empty">Veriler yüklenemedi. İnternet bağlantını kontrol edip <button class="linkbtn" id="retry">tekrar dene</button>.</li>', '<li class="empty">Couldn\'t load data. Check your connection and <button class="linkbtn" id="retry">try again</button>.</li>');
      $("retry").onclick = route;
    }
  }
  const git = (h) => { if (location.hash === h) route(); else location.hash = h; };

  // ---------- ana sayfa ----------
  function showHome() {
    view = { mode: "home" }; show("home");
    $("eyebrow").textContent = "Rota Cepte"; $("title").textContent = T("Nereye gidiyorsun?");
    renderHome();
  }
  // ---------- gideceğim yerler (favoriler) ----------
  const FAV = "gezi-fav";
  function favs() { try { return JSON.parse(localStorage.getItem(FAV)) || []; } catch (e) { return []; } }
  function favYaz(a) { try { localStorage.setItem(FAV, JSON.stringify(a)); } catch (e) {} }
  const ayni = (x, p) => x.q === p.q && x.s === p.ilS;
  const favMi = (p) => favs().some((x) => ayni(x, p));
  function favDegis(p) {
    let a = favs(), eklendi = false;
    if (favMi(p)) a = a.filter((x) => !ayni(x, p));
    else { a.unshift({ q: p.q, s: p.ilS, ad: p.ad, il: [...new Set([p.ilce, p.il].filter(Boolean))].join(", "), k: p.k, f: p.f, lat: p.lat, lng: p.lng }); eklendi = true; }
    favYaz(a); favBtn(p); renderFav();
    if (eklendi) setTimeout(bildirimTeklif, 700);
  }
  function favBtn(p) {
    const on = favMi(p), b = $("dFav");
    b.classList.toggle("on", on); b.setAttribute("aria-pressed", on);
    b.setAttribute("aria-label", on ? T("Listemden çıkar") : T("Gideceğim yerlere ekle"));
  }
  function renderFav() {
    const a = favs();
    $("favSec").hidden = !a.length; $("favBos").hidden = !!a.length;
    const kon = (x) => {
      if (x.lat != null) return x;
      const r = ARA && ARA.find((y) => y[2] === x.s && y[1] === x.ad);
      return r ? { ...x, lat: r[4], lng: r[5] } : null;
    };
    if (a.some((x) => x.lat == null) && !ARA && IDX) loadAra();
    const nok = a.map(kon).filter(Boolean);
    $("favList").innerHTML = a.map((x) => {
      const n = kon(x);
      return `<li><button class="row" data-go="#/il/${x.s}/yer/${x.q}">${thumb(x.f, x.k)}<span class="rt"><b>${esc(kayitAd(x))}</b><small>${esc(x.il)}</small></span><span class="km">${me && n ? fmt(km(me, n)) : OKIK}</span></button></li>`;
    }).join("");
    // Kendi rotan: en yakından başlayıp hep bir sonraki en yakın yere giden sıra (en fazla 10 durak)
    const b = $("favRota");
    if (nok.length < 2) { b.hidden = true; return; }
    let kalan = nok.slice(), sira = [], cur = me || null, top = 0;
    while (kalan.length && sira.length < 10) {
      let bi = 0;
      if (cur) kalan.forEach((x, i) => { if (km(cur, x) < km(cur, kalan[bi])) bi = i; });
      const x = kalan.splice(bi, 1)[0];
      if (cur && (sira.length || me)) top += km(cur, x);
      sira.push(x); cur = x;
    }
    // 2-opt: sırada birbirini kesen yolları açarak toplam yolu kısalt (en fazla 10 durak, anında biter)
    const yolUz = (r) => r.reduce((t, x, i) => t + (i ? km(r[i - 1], x) : me ? km(me, x) : 0), 0);
    for (let iyi = true, tur = 0; iyi && tur < 50; tur++) {
      iyi = false;
      for (let i = 0; i < sira.length - 1; i++) for (let j = i + 1; j < sira.length; j++) {
        const yeni = sira.slice(0, i).concat(sira.slice(i, j + 1).reverse(), sira.slice(j + 1));
        if (yolUz(yeni) < yolUz(sira) - 1e-6) { sira = yeni; iyi = true; }
      }
    }
    top = yolUz(sira);
    const nk = (x) => x.lat + "," + x.lng, son = sira[sira.length - 1], ara = sira.slice(0, -1).map(nk).join("|");
    b.href = `https://www.google.com/maps/dir/?api=1&destination=${nk(son)}${ara ? "&waypoints=" + encodeURIComponent(ara) : ""}&travelmode=driving`;
    b.innerHTML = TL(`<span>${ik("route", 18)} Listemden rota yap</span><small>${sira.length} durak · ~${fmt(top * 1.3)} · en kısa sırayla</small>`, `<span>${ik("route", 18)} Make a route from my list</span><small>${sira.length} stops · ~${fmt(top * 1.3)} · shortest order</small>`);
    b.hidden = false;
  }
  // ---------- gittiğim yerler ----------
  const GIT = "gezi-gittim";
  function gittiklerim() { try { return JSON.parse(localStorage.getItem(GIT)) || []; } catch (e) { return []; } }
  const gittimMi = (p) => gittiklerim().some((x) => ayni(x, p));
  function gitDegis(p) {
    let a = gittiklerim();
    const vardi = gittimMi(p), onceki = new Set(rozetler().filter((r) => r.tamam).map((r) => r.ad)), oncekiIl = buYil(a).il;
    if (vardi) a = a.filter((x) => !ayni(x, p));
    else a.unshift({ q: p.q, s: p.ilS, ad: p.ad, il: [...new Set([p.ilce, p.il].filter(Boolean))].join(", "), k: p.k, f: p.f, t: Date.now() });
    try { localStorage.setItem(GIT, JSON.stringify(a)); } catch (e) {}
    gitBtn(p);
    if (!vardi) {
      const iller = new Set(a.map((x) => x.s)).size;
      const yeni = rozetler().find((r) => r.tamam && !onceki.has(r.ad));
      if (hedefKontrol(oncekiIl)) { /* yıllık hedef kutlandı */ }
      else if (yeni) rozetKutla(yeni);
      else toast(TL(`Harika! Gezdiğin il: ${iller}/81 · Gittiğin yer: ${a.length}`, `Great! Provinces visited: ${iller}/81 · Places: ${a.length}`));
    }
  }
  function gitBtn(p) {
    const on = gittimMi(p), b = $("dGit");
    b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); b.querySelector("span").textContent = on ? T("Gittim") : T("Buraya gittim");
  }
  function renderGez() {
    const a = gittiklerim();
    $("gezSec").hidden = false; renderHarita(); renderRozet(); renderHedef();
    $("gezBtn").hidden = $("karneBtn").hidden = !a.length;
    if (!a.length) { $("gezList").hidden = true; return; }
    const iller = new Set(a.map((x) => x.s)).size;
    $("gezSay").textContent = TL(`Gezdiğin iller: ${iller} / 81`, `Provinces visited: ${iller} / 81`);
    $("gezAlt").textContent = TL(`${a.length} yere gittin · listeyi gör`, `${a.length} places visited · see the list`);
    $("gezBar").style.width = Math.max(3, Math.round((iller / 81) * 100)) + "%";
    $("gezList").innerHTML = a.map((x) =>
      `<li><button class="row" data-go="#/il/${x.s}/yer/${x.q}">${thumb(x.f, x.k)}<span class="rt"><b>${esc(kayitAd(x))}</b><small>${esc(x.il)}${x.t ? " · " + new Date(x.t).toLocaleDateString(DIL === "en" ? "en-GB" : "tr-TR", { day: "numeric", month: "long", year: "numeric" }) : ""}</small></span><span class="km ok">${ik("circle-check", 20)}</span></button></li>`).join("");
  }
  // ---------- rozetler ----------
  const BOLGE = {
    "Marmara": "istanbul edirne kirklareli tekirdag canakkale kocaeli yalova sakarya bilecik bursa balikesir",
    "Ege": "izmir manisa aydin denizli mugla afyonkarahisar kutahya usak",
    "Akdeniz": "antalya isparta burdur mersin adana hatay osmaniye kahramanmaras",
    "İç Anadolu": "ankara konya kayseri eskisehir sivas kirikkale aksaray karaman kirsehir nigde nevsehir yozgat cankiri",
    "Karadeniz": "zonguldak bartin karabuk duzce bolu kastamonu sinop samsun ordu giresun trabzon rize artvin gumushane bayburt corum amasya tokat",
    "Doğu Anadolu": "erzurum erzincan kars agri igdir ardahan van mus bitlis bingol tunceli elazig malatya hakkari",
    "Güneydoğu": "gaziantep sanliurfa diyarbakir mardin batman siirt sirnak adiyaman kilis"
  };
  const temaSay = (a, anahtar, kat) => a.filter((x) => (!kat || x.k === kat) && anahtar.some((w) => (" " + sade(x.ad) + " ").includes(w))).length;
  function rozetler() {
    const a = gittiklerim(), il = new Set(a.map((x) => x.s));
    const R = [
      ["👣", "footprints", T("İlk adım"), T("İlk yerine gittin"), a.length, 1],
      ["🎒", "backpack", T("Gezgin"), T("10 yere git"), a.length, 10],
      ["🧭", "compass", T("Kâşif"), T("25 yere git"), a.length, 25],
      ["🌟", "star", T("Efsane gezgin"), T("50 yere git"), a.length, 50],
      ["🗺️", "map", T("Yola düştün"), T("5 ile git"), il.size, 5],
      ["🚗", "car", T("Uzun yolcu"), T("20 ile git"), il.size, 20],
      ["🇹🇷", "flag", T("Türkiye'yi gezdim"), T("81 ilin hepsine git"), il.size, 81],
      ["💧", "droplets", T("Şelale avcısı"), T("3 şelaleye git"), temaSay(a, ["selale"]), 3],
      ["🕳️", "mountain-snow", T("Mağara kâşifi"), T("3 mağaraya git"), temaSay(a, ["magara"]), 3],
      ["🏰", "castle", T("Kale fatihi"), T("5 kaleye git"), temaSay(a, ["kale"]), 5],
      ["🌊", "waves-horizontal", T("Göl sevdalısı"), T("3 göle git"), temaSay(a, ["golu", "gol "], "d"), 3],
      ["🌲", "trees", T("Doğa dostu"), T("3 milli park ya da tabiat parkına git"), temaSay(a, ["milli park", "tabiat park"]), 3],
      ["🏛️", "landmark", T("Müze kurdu"), T("5 müzeye git"), a.filter((x) => x.k === "m" || sade(x.ad).includes("muze")).length, 5],
      ["🔥", "flame", T("Seri gezgin"), T("3 ay üst üste en az bir yere git"), seri(a), 3]
    ];
    for (const [b, iller] of Object.entries(BOLGE)) {
      const l = iller.split(" ");
      R.push(["🏅", "medal", TL(b + " fatihi", T(b) + " conqueror"), TL(`${b} bölgesinin ${l.length} ilinin hepsine git`, `Visit all ${l.length} provinces of the ${T(b)} region`), l.filter((s) => il.has(s)).length, l.length]);
    }
    return R.map(([e, ikon, ad, acik, n, hedef]) => ({ e, ikon, ad, acik, n: Math.min(n, hedef), hedef, tamam: n >= hedef }));
  }
  // ---------- yıllık gezi hedefi ve seri ----------
  const HEDEF = "gezi-hedef";
  function hedefOku() { try { const h = JSON.parse(localStorage.getItem(HEDEF)); return h && h.y === new Date().getFullYear() && h.n > 0 ? h : null; } catch (e) { return null; } }
  // Seri: bu aydan (bu ay henüz gidilmediyse geçen aydan) geriye, her ay en az bir yere gidilen ay sayısı
  function seri(a) {
    const ay = new Set(a.filter((x) => x.t).map((x) => { const d = new Date(x.t); return d.getFullYear() * 12 + d.getMonth(); }));
    const n = new Date(); let m = n.getFullYear() * 12 + n.getMonth(), say = 0;
    if (!ay.has(m)) m--;
    while (ay.has(m)) { say++; m--; }
    return say;
  }
  function buYil(a) {
    const y = new Date().getFullYear(), l = a.filter((x) => x.t && new Date(x.t).getFullYear() === y);
    return { il: new Set(l.map((x) => x.s)).size, yer: l.length };
  }
  function renderHedef() {
    const kutu = $("hedefSec"); if (!kutu) return;
    const a = gittiklerim(), yil = new Date().getFullYear(), h = hedefOku(), b = buYil(a), sr = seri(a);
    const buAy = a.some((x) => x.t && new Date(x.t).getMonth() === new Date().getMonth() && new Date(x.t).getFullYear() === yil);
    const seriHtml = sr ? `<p class="seri">${ik("flame", 18)} ${TL(`${sr} ay üst üste gezdin`, `${sr}-month travel streak`)}${!buAy ? TL(" · bu ay da bir yere git, serin sürsün", " · visit somewhere this month to keep it") : ""}</p>` : "";
    const secim = [3, 5, 10, 20].map((n) => `<button data-hedef="${n}">${n} ${TL("il", n > 1 ? "provinces" : "province")}</button>`).join("");
    if (!h) {
      kutu.innerHTML = `<span class="hbas">${ik("target", 20)} ${TL(`${yil} gezi hedefin`, `Your ${yil} travel goal`)}</span><p>${TL("Bu yıl kaç il gezmek istersin? Hedef koy, \"Buraya gittim\" dedikçe ilerle.", "How many provinces do you want to visit this year? Set a goal and track it with \"I've been here\".")}</p><div class="hsec">${secim}</div>${seriHtml}`;
      return;
    }
    const tamam = b.il >= h.n, yuzde = Math.min(100, Math.round((b.il / h.n) * 100));
    kutu.innerHTML = `<span class="hbas">${ik(tamam ? "trophy" : "target", 20)} ${TL(`${yil} gezi hedefin`, `Your ${yil} travel goal`)}</span>
      <div class="hsay"><b>${TL(`${b.il} / ${h.n} il`, `${b.il} / ${h.n} provinces`)}</b><small>${TL(`Bu yıl ${b.yer} yer`, `${b.yer} places this year`)}</small></div>
      <span class="bar"><i style="width:${Math.max(3, yuzde)}%"></i></span>
      <p>${tamam ? TL("Hedefini tamamladın, tebrikler! Yeni bir hedef koyabilirsin.", "Goal complete, congratulations! You can set a new one.") : TL(`Hedefine ${h.n - b.il} il kaldı.`, `${h.n - b.il} more to reach your goal.`)}</p>
      ${seriHtml}<button class="linkbtn" data-hedef="0">${TL("Hedefi değiştir", "Change goal")}</button>`;
  }
  function hedefKontrol(onceki) {
    const h = hedefOku(); if (!h) return false;
    const simdi = buYil(gittiklerim()).il;
    if (onceki < h.n && simdi >= h.n) { rozetKutla({ ikon: "trophy", ad: TL("Yıllık hedef tamam!", "Yearly goal reached!"), acik: TL(`Bu yıl ${simdi} il gezdin.`, `You've visited ${simdi} provinces this year.`) }); return true; }
    return false;
  }
  function rozetKutla(r) {
    const d = document.createElement("div"); d.className = "tanit";
    d.innerHTML = `<div class="tkart rkutla"><div class="temo altin">${ik(r.ikon, 40)}</div><small>${T("Yeni rozet!")}</small><h2>${esc(r.ad)}</h2><p>${esc(r.acik)}</p><div class="tbtn" style="justify-content:center"><button class="btn primary">${T("Süper!")}</button></div></div>`;
    d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("button")) { d.classList.add("out"); setTimeout(() => d.remove(), 300); } });
    document.body.appendChild(d);
  }
  function renderRozet() {
    const R = rozetler(), k = R.filter((r) => r.tamam).length;
    $("rozetSay").textContent = `${k} / ${R.length}`;
    $("rozetList").innerHTML = R.sort((x, y) => (y.tamam - x.tamam) || (y.n / y.hedef - x.n / x.hedef)).map((r) =>
      `<li class="rozet${r.tamam ? " on" : ""}" title="${esc(r.acik)}"><i>${ik(r.ikon, 26)}</i><b>${esc(r.ad)}</b><small>${r.tamam ? T("Kazandın") : `${r.n}/${r.hedef}`}</small><span class="rbar"><span style="width:${Math.round((r.n / r.hedef) * 100)}%"></span></span></li>`).join("");
  }
  // ---------- hava durumu ----------
  const HAVA = { 0: ["sun", T("Açık")], 1: ["cloud-sun", T("Az bulutlu")], 2: ["cloud-sun", T("Parçalı bulutlu")], 3: ["cloud", T("Kapalı")], 45: ["cloud-fog", T("Sisli")], 48: ["cloud-fog", T("Sisli")],
    51: ["cloud-drizzle", T("Çisenti")], 53: ["cloud-drizzle", T("Çisenti")], 55: ["cloud-drizzle", T("Çisenti")], 56: ["cloud-rain", T("Dondurucu çisenti")], 57: ["cloud-rain", T("Dondurucu çisenti")],
    61: ["cloud-rain", T("Hafif yağmur")], 63: ["cloud-rain", T("Yağmurlu")], 65: ["cloud-rain", T("Kuvvetli yağmur")], 66: ["cloud-rain", T("Dondurucu yağmur")], 67: ["cloud-rain", T("Dondurucu yağmur")],
    71: ["cloud-snow", T("Hafif kar")], 73: ["cloud-snow", T("Karlı")], 75: ["snowflake", T("Yoğun kar")], 77: ["cloud-snow", T("Kar")], 80: ["cloud-drizzle", T("Sağanak")], 81: ["cloud-rain", T("Sağanak")], 82: ["cloud-lightning", T("Kuvvetli sağanak")],
    85: ["cloud-snow", T("Kar sağanağı")], 86: ["snowflake", T("Kar sağanağı")], 95: ["cloud-lightning", T("Gök gürültülü")], 96: ["cloud-lightning", T("Dolu")], 99: ["cloud-lightning", T("Dolu")] };
  const havaOnbellek = new Map();
  async function havaGoster(il) {
    const kutu = $("hava"); kutu.hidden = true; kutu.innerHTML = "";
    if (!il || il.lat == null) return;
    const s = il.s;
    try {
      let d = havaOnbellek.get(s);
      if (!d) {
        const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${il.lat}&longitude=${il.lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FIstanbul&forecast_days=3`);
        if (!r.ok) return;
        d = (await r.json()).daily; havaOnbellek.set(s, d);
      }
      if (!view || !view.d || view.d.s !== s) return;
      const gunler = [T("Bugün"), T("Yarın")];
      kutu.innerHTML = `<small>${TL(esc(il.ad) + " hava durumu", "Weather in " + esc(il.ad))}</small><div class="hgun">` + d.time.map((t, i) => {
        const [hik, ad] = HAVA[d.weathercode[i]] || ["thermometer", ""];
        const g = gunler[i] || new Date(t + "T12:00").toLocaleDateString(DIL === "en" ? "en-GB" : "tr-TR", { weekday: "long" });
        return `<span><em>${g}</em><i>${ik(hik, 28)}</i><b>${Math.round(d.temperature_2m_max[i])}° <small>${Math.round(d.temperature_2m_min[i])}°</small></b><small>${ad}</small></span>`;
      }).join("") + `</div><a class="hkaynak" href="https://open-meteo.com/" target="_blank" rel="noopener">${TL("Hava durumu verisi: Open-Meteo.com", "Weather data by Open-Meteo.com")}</a>`;
      kutu.hidden = false;
    } catch (e) {}
  }
  // ---------- meşhur yemekler ----------
  function ekDe(ad) {
    const k = ad.toLocaleLowerCase("tr"), sesli = k.match(/[aıoueiöü]/g) || ["a"];
    const ince = "eiöü".includes(sesli[sesli.length - 1]), sert = "fstkçşhp".includes(k[k.length - 1]);
    return "'" + (sert ? "t" : "d") + (ince ? "e" : "a");
  }
  let YEMEK = null, yemekSoz = null;
  // yemek.json: il -> Türkçe yemek adları; "_en": Türkçe ad -> İngilizce karşılığı
  const yemekAd = (y) => (DIL === "en" && YEMEK && YEMEK._en && YEMEK._en[y]) || y;
  function yemekYukle() {
    if (!yemekSoz) yemekSoz = getJSON(`yemek.json?v=${SURUM}`).then((y) => (YEMEK = y)).catch((e) => { yemekSoz = null; throw e; });
    return yemekSoz;
  }
  async function yemekGoster(d) {
    const kutu = $("yemek"); kutu.hidden = true;
    try {
      const Y = await yemekYukle();
      const liste = Y[d.s]; if (!liste || !liste.length) return;
      if (!view || !view.d || view.d.s !== d.s) return;
      kutu.innerHTML = `<h3>${TL(esc(d.ad) + ekDe(d.ad) + " ne yenir?", "What to eat in " + esc(d.ad))}</h3><div class="ychips">` + liste.map((y) =>
        `<a class="ychip" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(y + " " + d.ad)}"><span>${ik("utensils", 18)} ${esc(yemekAd(y))}</span><small>${T("En iyi yerleri bul")} ${ik("chevron-right", 14)}</small></a>`).join("") + "</div>";
      kutu.hidden = false;
    } catch (e) {}
  }
  // ---------- dinle (sesli okuma) ----------
  // Android uygulamasında telefonun kendi ses motoru (Google, Samsung...) eklentiyle kullanılır; tarayıcıda Web Speech.
  const NTTS = window.Capacitor && window.Capacitor.getPlatform && window.Capacitor.getPlatform() !== "web" && window.Capacitor.Plugins && window.Capacitor.Plugins.TextToSpeech;
  const webSes = "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
  const sesVar = !!NTTS || webSes;
  const IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const HIZ = 0.95; // biraz sakin, anlatıcı gibi
  let dinleNo = 0, konusuyor = false; // dinleNo: durdurulan okumanın geç gelen "bitti" haberini yok saymak için
  function dinleDurdur() { dinleNo++; if (NTTS) NTTS.stop().catch(() => {}); else if (webSes) speechSynthesis.cancel(); dinleYaz(false); }
  function dinleYaz(on) { konusuyor = on; const b = $("dDinle"); b.classList.toggle("on", on); b.innerHTML = ik(on ? "square" : "volume-2", 22) + `<span>${on ? T("Durdur") : T("Dinle")}</span>`; }
  // Telefondaki en doğal sesi seç: Premium / geliştirilmiş / doğal sesler öne, robotik ve şaka sesleri (iPhone'daki Albert, Zarvox...) sona
  const ROBOT = /compact|espeak|robot|\b(albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|fred|kathy|princess|eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley)\b/;
  const IYI = /premium|enhanced|geliştirilmiş|gelişmiş|neural|natural|doğal|wavenet|online/;
  function enIyiSes() {
    const dil = DIL === "en" ? /^en/i : /^tr/i;
    const v = speechSynthesis.getVoices().filter((x) => dil.test(x.lang));
    const puan = (x) => { const n = (x.name + " " + (x.voiceURI || "")).toLowerCase(); let p = 0;
      if (/premium/.test(n)) p += 3;
      if (IYI.test(n)) p += 6;
      if (/google/.test(n)) p += 3;
      if (DIL === "en" && /^en[-_]gb/i.test(x.lang)) p += 2;
      if (DIL === "en" && /\b(daniel|samantha|karen|serena|kate|arthur|martha|moira|tessa)\b/.test(n)) p += 2;
      if (!x.localService) p += 1;
      if (ROBOT.test(n)) p -= 10;
      return p; };
    return v.sort((x, y) => puan(y) - puan(x))[0] || null;
  }
  // Kısaltmaları açık oku, parantezleri atla: kulağa daha doğal gelsin
  function okunur(t) {
    return t.replace(/^\(İngilizce kaynaktan\) /, "").replace(/\s*\([^)]*\)/g, "")
      .replace(/(^|\s)MÖ(?=[\s.,])/g, "$1milattan önce").replace(/\bMS\b/g, "milattan sonra")
      .replace(/(\d)\s*km\b/g, "$1 kilometre").replace(/(\d)\s*m\b/g, "$1 metre")
      .replace(/\byy\.?/g, "yüzyıl").replace(/\bvb\.?/g, "ve benzeri").replace(/\s{2,}/g, " ").trim();
  }
  // iPhone'da yalnızca basit (robotik) ses varsa, daha doğal sesi nasıl indireceğini bir kez söyle
  function sesIpucu(ses) {
    if (!IOS || (ses && IYI.test((ses.name + " " + (ses.voiceURI || "")).toLowerCase()))) return;
    try { if (localStorage.getItem("gezi-ses-ipucu")) return; localStorage.setItem("gezi-ses-ipucu", "1"); } catch (e) {}
    setTimeout(() => toast(TL("Daha doğal bir ses için: Ayarlar › Erişilebilirlik › Seslendirilen İçerik › Sesler › Türkçe bölümünden geliştirilmiş sesi indir.", "For a more natural voice: Settings › Accessibility › Spoken Content › Voices › English, then download an Enhanced or Premium voice."), 9000), 1500);
  }
  function webOku(cumleler, no) {
    const hepsi = speechSynthesis.getVoices(), ses = enIyiSes();
    // Cihazda bu dilde hiç ses yoksa yabancı sesle okumak kötü durur: okumayız
    if (hepsi.length && !ses) { toast(TL("Bu cihazda Türkçe ses yüklü değil. Telefonunun ayarlarından Türkçe sesi indirebilirsin.", "No English voice is installed on this device.")); return dinleYaz(false); }
    speechSynthesis.cancel();
    cumleler.forEach((c, i) => {
      const u = new SpeechSynthesisUtterance(c);
      u.lang = ses ? ses.lang : DIL === "en" ? "en-GB" : "tr-TR"; u.rate = HIZ; u.pitch = 1; if (ses) u.voice = ses;
      if (i === cumleler.length - 1) u.onend = () => { if (no === dinleNo) dinleYaz(false); };
      u.onerror = (e) => { if (e.error !== "interrupted" && e.error !== "canceled" && no === dinleNo) dinleDurdur(); };
      speechSynthesis.speak(u);
    });
    sesIpucu(ses);
  }
  async function yerelOku(cumleler, no) {
    const lang = DIL === "en" ? "en-GB" : "tr-TR";
    try {
      const r = await NTTS.isLanguageSupported({ lang });
      if (r && r.supported === false) {
        toast(TL("Telefonunda Türkçe ses paketi yok. Açılan ekrandan Türkçe sesi indirebilirsin.", "Your phone has no English voice data. You can download it from the screen that opens."), 6000);
        NTTS.openInstall().catch(() => {});
        return dinleYaz(false);
      }
    } catch (e) {}
    // Cümle cümle, sırayla: her cümleden sonra doğal bir durak olur
    for (const c of cumleler) {
      if (no !== dinleNo) return;
      try { await NTTS.speak({ text: c, lang, rate: HIZ, pitch: 1, volume: 1, category: "playback" }); } catch (e) { break; }
    }
    if (no === dinleNo) dinleYaz(false);
  }
  function dinle() {
    if (!sesVar || !open) return;
    if (konusuyor) return dinleDurdur();
    const metin = DIL === "en" ? $("dText").textContent.replace(/\s*\([^)]*\)/g, "") : okunur($("dText").textContent);
    const cumleler = (adi(open) + ". " + metin).split(/(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ])/).map((c) => c.trim()).filter(Boolean);
    const no = ++dinleNo;
    dinleYaz(true);
    if (NTTS) yerelOku(cumleler, no); else webOku(cumleler, no);
  }
  if (webSes && !NTTS) speechSynthesis.getVoices();
  // ---------- keşfet: tema listeleri (Türkiye geneli) ----------
  const TEMA = {
    selale: { ad: T("Şelaleler"), e: "droplets", k: ["selale"] },
    magara: { ad: T("Mağaralar"), e: "mountain-snow", k: ["magara"] },
    kanyon: { ad: T("Kanyon ve vadiler"), e: "mountain", k: ["kanyon", "vadi"] },
    gol: { ad: T("Göller"), e: "waves-horizontal", k: ["golu", "gol "], d: 1 },
    ada: { ad: T("Adalar ve koylar"), e: "tree-palm", k: ["adasi", "koyu", "plaj"] },
    park: { ad: T("Milli parklar"), e: "trees", k: ["milli park", "tabiat park"] },
    dag: { ad: T("Dağlar ve yaylalar"), e: "mountain-snow", k: ["dagi", "yayla"], d: 1 },
    kale: { ad: T("Kaleler"), e: "castle", k: ["kale"] },
    kopru: { ad: T("Tarihi köprüler"), e: "bridge", k: ["kopru"] },
    saray: { ad: T("Saraylar ve konaklar"), e: "crown", k: ["saray", "konag", "kosk"] },
    han: { ad: T("Han ve kervansaraylar"), e: "store", k: ["kervansaray", " hani", "bedesten"] },
    muze: { ad: T("Müzeler"), e: "landmark", k: ["muze"] }
  };
  // Mevsime göre öneri: ayına göre 4 tema
  const MEVSIM = [
    { ay: [12, 1, 2], e: "snowflake", ad: TL("Kış önerisi", "Winter picks"), not: TL("Soğukta içeride gezmelik: mağaralar, müzeler, saraylar ve kervansaraylar", "Indoor gems for cold days: caves, museums, palaces and caravanserais"), t: ["magara", "muze", "saray", "han"] },
    { ay: [3, 4, 5], e: "flower-2", ad: TL("İlkbahar önerisi", "Spring picks"), not: TL("Karlar eridi, şelaleler coştu, vadiler yeşerdi", "Snow has melted: waterfalls at full flow, green valleys"), t: ["selale", "kanyon", "park", "kopru"] },
    { ay: [6, 7, 8], e: "sun", ad: TL("Yaz önerisi", "Summer picks"), not: TL("Denize, göle ya da serin yaylalara kaç", "Head for the sea, a lake or the cool highlands"), t: ["ada", "gol", "dag", "kanyon"] },
    { ay: [9, 10, 11], e: "leaf", ad: TL("Sonbahar önerisi", "Autumn picks"), not: TL("Ormanlar renk renk, hava tam yürüyüşlük", "Colourful forests and perfect walking weather"), t: ["park", "gol", "selale", "kale"] }
  ];
  function mevsimKart() {
    const m = MEVSIM.find((x) => x.ay.includes(new Date().getMonth() + 1));
    $("mevsim").innerHTML = `<div class="mvust"><span class="mvik">${ik(m.e, 22)}</span><span><b>${esc(m.ad)}</b><small>${esc(m.not)}</small></span></div><div class="mvchips">${m.t.map((k) =>
      `<button class="tchip" data-go="#/tema/${k}"><i>${ik(TEMA[k].e, 20)}</i><span>${esc(TEMA[k].ad)}</span></button>`).join("")}</div>`;
  }
  function temaChips() {
    mevsimKart();
    $("temaChips").innerHTML = Object.entries(TEMA).map(([k, t]) =>
      `<button class="tchip" data-go="#/tema/${k}"><i>${ik(t.e, 20)}</i><span>${esc(t.ad)}</span></button>`).join("");
  }
  function showTema(k) {
    view = { mode: "tema", k }; show("tema");
    $("eyebrow").textContent = T("Türkiye geneli"); $("title").textContent = TEMA[k].ad;
    renderTema();
  }
  function renderTema() {
    if (!view || view.mode !== "tema") return;
    const t = TEMA[view.k];
    $("temaLoc").hidden = !!me;
    if (!ARA) { $("temaList").innerHTML = `<li class="empty">${T("Yükleniyor…")}</li>`; loadAra(); return; }
    let r = ARA.filter((x) => t.k.some((w) => (" " + x[0] + " ").includes(w)) && (!t.d || x[6] === "d"));
    if (me) r = r.map((x) => [km(me, { lat: x[4], lng: x[5] }), x]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
    else r.sort((a, b) => b[7] - a[7] || a[1].localeCompare(b[1], "tr"));
    $("temaSay").textContent = TL(`${r.length} yer` + (me ? " · sana en yakından uzağa" : " · konumunu açarsan yakından uzağa sıralarız"), `${r.length} places` + (me ? " · nearest first" : " · turn on location to sort by distance"));
    $("temaList").innerHTML = r.length ? r.map((x) => {
      const c = CATS[x[6]] || CATS.t, il = (IDX.ilBy.get(x[2]) || {}).ad || "";
      return `<li><button class="row res" data-yer="${x[2]}|${x[3]}">${x[8] ? thumb({ p: x[8], w: 1e5 }, x[6] || "t") : `<span class="thumb" style="--c:${c.renk}">${icon(x[6] || "t", 20)}</span>`}<span class="rt"><b>${esc(araAd(x))}</b><small>${esc(il)}</small></span><span class="km">${me ? fmt(km(me, { lat: x[4], lng: x[5] })) : OKIK}</span></button></li>`;
    }).join("") : `<li class="empty">${T("Bu türde yer bulunamadı.")}</li>`;
  }
  // ---------- internetsiz kullanım: ilin verisini ve fotoğraflarını telefona indir ----------
  const INDK = "gezi-indirilen", INDC = "gezi-indir";
  function indirilenler() { try { return JSON.parse(localStorage.getItem(INDK)) || {}; } catch (e) { return {}; } }
  function indirKaydet(o) { try { localStorage.setItem(INDK, JSON.stringify(o)); } catch (e) {} }
  let indiriliyor = null;
  function indirBtn() {
    const b = $("indirBtn"), k = $("indirSil");
    const olur = view && view.mode === "il" && "caches" in window && navigator.serviceWorker && navigator.serviceWorker.controller;
    $("indirSec").hidden = !olur;
    if (!olur || indiriliyor === view.d.s) return;
    const ind = indirilenler()[view.d.s];
    b.disabled = false; k.hidden = !ind;
    b.classList.toggle("hazir", !!ind);
    b.innerHTML = ind
      ? `<b>${ik("circle-check", 18)} ${TL("İnternetsiz hazır", "Ready offline")}</b><small>${TL(`${ind.n} fotoğraf · ${new Date(ind.t).toLocaleDateString("tr-TR")} · güncellemek için dokun`, `${ind.n} photos · ${new Date(ind.t).toLocaleDateString("en-GB")} · tap to update`)}</small>`
      : `<b>${ik("download", 18)} ${TL("İnternetsiz kullan", "Use offline")}</b><small>${TL("Bu ilin yerlerini ve fotoğraflarını telefona indir, çekmeyen yerde de aç", "Save this province's places and photos to your phone")}</small>`;
  }
  // İlk açılışta servis çalışanı sayfayı devralınca "İnternetsiz kullan" düğmesi hemen görünsün
  if (navigator.serviceWorker) navigator.serviceWorker.addEventListener("controllerchange", () => { try { indirBtn(); } catch (e) {} });
  async function ilIndir() {
    if (indiriliyor || !view || view.mode !== "il") return;
    const d = view.d, s = d.s, b = $("indirBtn");
    indiriliyor = s; b.disabled = true; $("indirSil").hidden = true;
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
    try {
      const c = await caches.open(INDC);
      // İl verisi ve dizin şart: inmezse "hazır" denmez, hata gösterilir
      for (const u of [`data/il/${s}.json?v=${IDX.surum}`, `data/index.json?v=${SURUM}`]) {
        const r = await fetch(u); if (!r.ok) throw new Error("HTTP " + r.status + " " + u); await c.put(u, r);
      }
      for (const u of [`data/en/${s}.json?v=${IDX.surum}`, `data/ara.json?v=${IDX.surum}-2`, `yemek.json?v=${SURUM}`]) {
        try { const r = await fetch(u); if (r.ok) await c.put(u, r); } catch (e) { console.warn("indirilemedi", u, e); }
      }
      const set = new Set();
      const ekle = (f, W) => { const u = foto(f, W); if (u) set.add(u); };
      ekle(d.f, 960); if (d.kapak) ekle(d.kapak, 960);
      d.yerler.forEach((y) => { ekle(y.f, 250); ekle(y.f, 960); (y.g || []).forEach((f) => { ekle(f, 250); ekle(f, 960); }); });
      d.ilceler.forEach((z) => ekle(z.f, 250));
      const list = [...set]; let i = 0, tamam = 0, ok = 0;
      const goster = () => { if (view && view.mode === "il" && view.d.s === s) b.innerHTML = `<b>${TL("İndiriliyor…", "Downloading…")} ${Math.round((tamam / list.length) * 100)}%</b><small>${tamam} / ${list.length} ${TL("fotoğraf", "photos")}</small><span class="bar"><i style="width:${(tamam / list.length) * 100}%"></i></span>`; };
      goster();
      const isci = async () => {
        while (i < list.length) {
          const u = list[i++];
          try {
            if (!(await c.match(u, { ignoreVary: true }))) {
              let r = await fetch(u, { mode: "cors" }).catch(() => null);
              if (!r || !r.ok) r = await fetch(u, { mode: "no-cors" });
              if (r.ok || r.type === "opaque") { await c.put(u, r); ok++; }
            } else ok++;
          } catch (e) {}
          tamam++; if (tamam % 3 === 0 || tamam === list.length) goster();
        }
      };
      await Promise.all([1, 2, 3, 4, 5, 6].map(isci));
      const o = indirilenler(); o[s] = { t: Date.now(), n: ok }; indirKaydet(o);
      toast(ok < list.length * 0.8 ? TL(`${d.ad} indirildi, ama ${list.length - ok} fotoğraf alınamadı. İnternet iyiyken tekrar dene.`, `${d.ad} saved, but ${list.length - ok} photos failed. Try again on a better connection.`)
        : TL(`${d.ad} artık internetsiz de açılır. Harita için yine internet gerekir.`, `${d.ad} now works offline. The map still needs internet.`));
    } catch (e) {
      console.error(e); toast(TL("İndirme olmadı, telefonda yer kalmamış olabilir.", "Download failed, your phone may be out of space."));
    }
    indiriliyor = null; indirBtn();
  }
  async function ilIndirSil() {
    if (!view || view.mode !== "il") return;
    const d = view.d;
    try {
      const c = await caches.open(INDC);
      const sil = new Set();
      d.yerler.forEach((y) => { sil.add(foto(y.f, 250)); sil.add(foto(y.f, 960)); });
      d.ilceler.forEach((z) => sil.add(foto(z.f, 250)));
      // Başka bir indirilmiş ilde de kullanılan fotoğraflar (ör. il kapağı) kalsın diye yalnızca bu ilinkileri sil
      await Promise.all([...sil].filter(Boolean).map((u) => c.delete(u, { ignoreVary: true })));
    } catch (e) {}
    const o = indirilenler(); delete o[d.s]; indirKaydet(o);
    toast(TL(`${d.ad} telefondan kaldırıldı.`, `${d.ad} removed from your phone.`));
    indirBtn();
  }
  // ---------- 1 günlük plan: ilin öne çıkan yerlerinden birbirine yakın 5 durak ----------
  let planBas = 0;
  function planYap(d) {
    // Semt/ilçe/bölge adları durak olmasın (ör. "Osmaneli", "Kapadokya")
    const genel = new Set([d.ad, "Kapadokya", ...d.ilceler.map((z) => z.ad)]);
    const ad = d.yerler.filter((y) => y.lat != null && y.f && y.k !== "s" && !genel.has(y.ad)).sort((a, b) => (b.one ? 1 : 0) - (a.one ? 1 : 0) || a.j - b.j).slice(0, 30);
    if (ad.length < 2) return null;
    for (let t = 0; t < ad.length; t++) {
      const bas = ad[(planBas + t) % ad.length];
      // Başlangıca en fazla 40 km uzaktakiler: bir günde gezilebilsin
      const kalan = ad.filter((x) => x !== bas && km(bas, x) <= 40), sira = [bas];
      let cur = bas;
      while (sira.length < 5 && kalan.length) {
        let bi = 0;
        kalan.forEach((x, i) => { if (km(cur, x) < km(cur, kalan[bi])) bi = i; });
        cur = kalan.splice(bi, 1)[0]; sira.push(cur);
      }
      if (sira.length >= 3 || (sira.length >= 2 && t === ad.length - 1)) { planBas = (planBas + t) % ad.length; return sira; }
    }
    return null;
  }
  async function planGoster(d) {
    const kutu = $("plan");
    const s = planYap(d);
    if (!s) { kutu.hidden = true; return; }
    try { await yemekYukle(); } catch (e) {}
    if (!view || view.mode !== "il" || view.d.s !== d.s) return;
    const yemek = YEMEK && YEMEK[d.s] && YEMEK[d.s][0];
    let top = 0; for (let i = 1; i < s.length; i++) top += km(s[i - 1], s[i]);
    const saat = ["09:00", "11:00", "14:00", "16:00", "18:00"];
    const nk = (x) => x.lat + "," + x.lng, son = s[s.length - 1], ara = s.slice(0, -1).map(nk).join("|");
    kutu.innerHTML = `<div class="plust"><h3>${ik("calendar-days", 20)} ${TL(esc(d.ad) + ekDe(d.ad) + " 1 günlük plan", "A day in " + esc(d.ad))}</h3><button class="linkbtn" id="planYeni">${ik("shuffle", 16)} ${TL("Başka plan", "Another plan")}</button></div>
      <small class="plalt">${TL(`${s.length} durak · aralarda toplam ~${fmt(top * 1.3)} yol`, `${s.length} stops · ~${fmt(top * 1.3)} of driving in between`)}</small>
      <ol class="plist">${s.map((p, i) => `${i === 2 ? `<li class="plyemek"><time>13:00</time><span>${ik("utensils", 16)} ${TL("Öğle arası", "Lunch break")}${yemek ? `: <b>${esc(yemekAd(yemek))}</b>${TL(" dene", "")}` : ""}</span></li>` : ""}<li><button class="row" data-s="${p.ilS}" data-j="${p.j}"><time>${saat[i]}</time>${thumb(p.f, p.k)}<span class="rt"><b>${esc(adi(p))}</b><small>${i ? fmt(km(s[i - 1], p) * 1.3) + TL(" yol", " drive") : esc(p.ilce || d.ad)}</small></span></button></li>`).join("")}</ol>
      <a class="btn primary rotaac" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${nk(son)}&waypoints=${encodeURIComponent(ara)}&travelmode=driving">${ik("navigation", 18)} ${TL("Planı Google Maps'te aç", "Open plan in Google Maps")}</a>`;
    kutu.hidden = false;
  }
  // ---------- uygulamayı paylaş + beğeni sorusu ----------
  const ANDROID = !!(window.Capacitor && window.Capacitor.getPlatform && window.Capacitor.getPlatform() === "android");
  const PLAY = "https://play.google.com/store/apps/details?id=io.github.me7rt.rotacepte";
  const SITE = "https://me7rt.github.io/Rota-Cepte/";
  function disAc(url) { const a = document.createElement("a"); a.href = url; a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove(); }
  async function uygulamaPaylas() {
    const link = ANDROID ? PLAY : SITE;
    const metin = TL("Türkiye'de gezilecek yerler için süper bir uygulama: Rota Cepte. 81 il, harita, hazır rotalar, internetsiz kullanım. ", "A great app for exploring Türkiye: Rota Cepte. 81 provinces, maps, ready-made routes, works offline. ");
    const P = window.Capacitor && window.Capacitor.Plugins;
    try {
      if (P && P.Share) return await P.Share.share({ title: "Rota Cepte", text: metin, url: link });
      if (navigator.share) return await navigator.share({ title: "Rota Cepte", text: metin, url: link });
      await navigator.clipboard.writeText(metin + link); toast(TL("Bağlantı kopyalandı, istediğin yere yapıştır.", "Link copied."));
    } catch (e) {}
  }
  function puanSor() {
    let o = { n: 0 };
    try { o = JSON.parse(localStorage.getItem("gezi-puan")) || o; } catch (e) { return; }
    o.n++;
    const kayit = () => { try { localStorage.setItem("gezi-puan", JSON.stringify(o)); } catch (e) {} };
    // 4. açılıştan sonra, listesine yer eklemiş ya da bir yere gitmiş kişiye bir kez sor; "Sonra" derse 6 açılış sonra tekrar
    if (o.bitti || o.n < (o.sonra || 4) || (!favs().length && !gittiklerim().length)) { kayit(); return; }
    kayit();
    setTimeout(() => {
      if (document.querySelector(".tanit") || !$("sheet").hidden) return;
      o.sonra = o.n + 6; kayit();
      const d = document.createElement("div"); d.className = "tanit";
      const kapat = () => { d.classList.add("out"); setTimeout(() => d.remove(), 300); };
      const adim1 = `<div class="tkart"><div class="temo kirmizi">${ik("heart", 36)}</div><h2>${TL("Rota Cepte'yi sevdin mi?", "Enjoying Rota Cepte?")}</h2><p>${TL("Bu uygulamayı tek başıma geliştiriyorum. Fikrin benim için çok değerli.", "I build this app on my own. Your opinion means a lot.")}</p><div class="tbtn"><button class="linkbtn" data-k="hayir">${TL("Pek değil", "Not really")}</button><button class="btn primary" data-k="evet">${TL("Evet, sevdim!", "Yes, I love it!")}</button></div><button class="linkbtn tsonra" data-k="sonra">${TL("Sonra sor", "Ask me later")}</button></div>`;
      d.innerHTML = adim1;
      d.addEventListener("click", (e) => {
        const k = e.target.closest("[data-k]"); if (e.target === d) return kapat(); if (!k) return;
        const v = k.dataset.k;
        if (v === "sonra" || v === "kapat") return kapat();
        if (v === "evet") {
          o.bitti = 1; kayit();
          d.innerHTML = `<div class="tkart"><div class="temo altin">${ik("star", 36)}</div><h2>${TL("Çok sevindim!", "Awesome!")}</h2><p>${ANDROID ? TL("Play Store'da 5 yıldız ve kısa bir yorum bırakırsan, başka gezginler de bizi bulur.", "A 5-star rating on Google Play helps other travellers find us.") : TL("Arkadaşlarınla paylaşırsan çok mutlu olurum.", "Sharing it with friends would make my day.")}</p><div class="tbtn"><button class="linkbtn" data-k="kapat">${T("Kapat")}</button><button class="btn primary" data-k="${ANDROID ? "yildiz" : "paylas"}">${ANDROID ? ik("star", 18) + " " + TL("Puan ver", "Rate") : ik("share-2", 18) + " " + TL("Paylaş", "Share")}</button></div></div>`;
        } else if (v === "hayir") {
          o.bitti = 1; kayit();
          d.innerHTML = `<div class="tkart"><div class="temo">${ik("message-circle-heart", 36)}</div><h2>${TL("Neyi düzeltelim?", "What should we improve?")}</h2><p>${TL("Eksik ya da hoşuna gitmeyen ne varsa yaz, ilk güncellemede bakayım.", "Tell me what's missing or annoying and I'll look at it in the next update.")}</p><div class="tbtn"><button class="linkbtn" data-k="kapat">${T("Kapat")}</button><button class="btn primary" data-k="yaz">${ik("mail", 18)} ${TL("Görüş yaz", "Send feedback")}</button></div></div>`;
        } else if (v === "yildiz") { disAc(PLAY); kapat(); }
        else if (v === "paylas") { uygulamaPaylas(); kapat(); }
        else if (v === "yaz") { location.href = `mailto:${ILETISIM}?subject=${encodeURIComponent(TL("Rota Cepte görüş", "Rota Cepte feedback"))}&body=${encodeURIComponent("\n\n(" + TL("Sürüm", "Version") + " " + SURUM + ")")}`; kapat(); }
      });
      document.body.appendChild(d);
    }, 25000);
  }
  // ---------- hazır gezi rotaları ----------
  let ROTA = null;
  const rt = (r, k) => (DIL === "en" && r[k + "_en"]) || r[k];
  function loadRota() {
    if (!ROTA) ROTA = getJSON(`rotalar.json?v=${SURUM}`).catch(() => { ROTA = null; return []; });
    return ROTA;
  }
  async function rotaKartlar() {
    const r = await loadRota();
    $("rotaSec").hidden = !r.length;
    $("rotaKart").innerHTML = r.map((x) =>
      `<button class="rkart" data-go="#/rota/${x.k}"><i>${ik("route", 22)}</i><b>${esc(rt(x, "ad"))}</b><small>${esc(rt(x, "sure"))} · ${x.d.length} ${TL("durak", "stops")}</small></button>`).join("");
  }
  async function showRota(k, no) {
    const r = (await loadRota()).find((x) => x.k === k);
    if (no !== routeNo) return;
    if (!r) return showHome();
    view = { mode: "rota", r }; show("rota");
    $("eyebrow").textContent = T("Hazır rota") + " · " + rt(r, "sure"); $("title").textContent = rt(r, "ad");
    renderRota();
  }
  function renderRota() {
    if (!view || view.mode !== "rota") return;
    const r = view.r;
    $("rotaNot").textContent = rt(r, "not");
    if (!ARA) { $("rotaList").innerHTML = `<li class="empty">${T("Yükleniyor…")}</li>`; $("rotaAc").hidden = true; loadAra(); return; }
    const g = gittiklerim();
    const ds = r.d.map(([s, ad]) => ARA.find((x) => x[2] === s && x[1] === ad)).filter(Boolean);
    let top = 0;
    ds.forEach((x, i) => { if (i) top += km({ lat: ds[i - 1][4], lng: ds[i - 1][5] }, { lat: x[4], lng: x[5] }); });
    const gid = ds.filter((x) => g.some((y) => y.s === x[2] && y.ad === x[1])).length;
    $("rotaSay").textContent = TL(`${ds.length} durak · duraklar arası yaklaşık ${fmt(top * 1.3)} yol` + (gid ? ` · ${gid}/${ds.length} gittin` : ""), `${ds.length} stops · about ${fmt(top * 1.3)} of driving` + (gid ? ` · ${gid}/${ds.length} visited` : ""));
    $("rotaList").innerHTML = ds.map((x, i) => {
      const il = (IDX.ilBy.get(x[2]) || {}).ad || "", ok = g.some((y) => y.s === x[2] && y.ad === x[1]);
      const ara = i ? `<span class="rara">${ik("arrow-down", 14)} ~${fmt(km({ lat: ds[i - 1][4], lng: ds[i - 1][5] }, { lat: x[4], lng: x[5] }) * 1.3)}</span>` : "";
      return `<li>${ara}<button class="row res" data-yer="${x[2]}|${x[3]}"><span class="rno${ok ? " on" : ""}">${ok ? ik("check", 18) : i + 1}</span><span class="rt"><b>${esc(araAd(x))}</b><small>${esc(il)}</small></span><span class="km">${me ? fmt(km(me, { lat: x[4], lng: x[5] })) : OKIK}</span></button></li>`;
    }).join("");
    const nk = (x) => x[4] + "," + x[5];
    const son = ds[ds.length - 1], ara = ds.slice(0, -1).map(nk).join("|");
    $("rotaAc").href = `https://www.google.com/maps/dir/?api=1&destination=${nk(son)}${ara ? "&waypoints=" + encodeURIComponent(ara) : ""}&travelmode=driving`;
    $("rotaAc").hidden = !ds.length;
  }
  // ---------- yer öner (e-posta taslağı açar) ----------
  const ILETISIM = "mertturanlioglu.apps@gmail.com";
  function yerOner() {
    const il = view && view.d ? view.d.ad : "";
    const d = document.createElement("div"); d.className = "tanit";
    d.innerHTML = `<form class="tkart oner"><div class="temo">${ik("map-pin-plus", 36)}</div><h2>${T("Yer öner")}</h2><p>${T("Uygulamada olmayan, gidip görülmeye değer bir yer mi biliyorsun? Yaz, inceleyip ekleyelim.")}</p>
      <label>${T("Yerin adı")}<input name="ad" required maxlength="80" placeholder="ör. Sütüven Şelalesi"></label>
      <label>${T("İl / ilçe")}<input name="il" maxlength="80" value="${esc(il)}" placeholder="ör. Balıkesir, Edremit"></label>
      <label>${T("Neden gidilmeli? (isteğe bağlı)")}<textarea name="not" rows="3" maxlength="500" placeholder="Kısa bir not, yol tarifi ipucu…"></textarea></label>
      <div class="tbtn"><button type="button" class="linkbtn" data-k="iptal">${T("Vazgeç")}</button><button class="btn primary">${T("Gönder")}</button></div></form>`;
    const kapat = () => { d.classList.add("out"); setTimeout(() => d.remove(), 300); };
    d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-k=iptal]")) kapat(); });
    d.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const govde = TL(`Yer: ${f.get("ad")}\nİl/ilçe: ${f.get("il")}\nNot: ${f.get("not")}\n\n(Rota Cepte uygulamasından gönderildi)`, `Place: ${f.get("ad")}\nProvince/district: ${f.get("il")}\nNote: ${f.get("not")}\n\n(Sent from the Rota Cepte app)`);
      location.href = `mailto:${ILETISIM}?subject=${encodeURIComponent(TL("Yer önerisi: ", "Place suggestion: ") + f.get("ad"))}&body=${encodeURIComponent(govde)}`;
      kapat(); toast(T("Teşekkürler! E-posta uygulaman açılıyor."));
    });
    document.body.appendChild(d);
    setTimeout(() => d.querySelector("input").focus(), 50);
  }
  // ---------- ilk açılış rehberi ----------
  function tanitim() {
    try { if (localStorage.getItem("gezi-tanitim")) return; } catch (e) { return; }
    const s = [
      ["map", T("81 ili keşfet"), T("Her ilde ve ilçede gezilecek yerler, fotoğraflar ve kısa bilgiler seni bekliyor.")],
      ["navigation", T("Yakınındakileri bul"), T("Konumunu açarsan sana en yakın şelaleleri, kaleleri, müzeleri sıralarız.")],
      ["circle-check", T("Gittiğin yerleri işaretle"), T("\"Buraya gittim\" de, 81 ilden kaçını gezdiğini gör. Beğendiklerini kalple kaydet.")]
    ];
    let i = 0;
    const d = document.createElement("div"); d.className = "tanit";
    const ciz = () => {
      d.innerHTML = `<div class="tkart"><div class="temo">${ik(s[i][0], 36)}</div><h2>${s[i][1]}</h2><p>${s[i][2]}</p>
        <div class="tnok">${s.map((_, j) => `<i class="${j === i ? "on" : ""}"></i>`).join("")}</div>
        <div class="tbtn"><button class="linkbtn" data-t="gec">${T("Geç")}</button><button class="btn primary" data-t="ileri">${i < s.length - 1 ? T("İleri") : T("Başlayalım")}</button></div></div>`;
    };
    const bitir = () => { try { localStorage.setItem("gezi-tanitim", "1"); } catch (e) {} d.classList.add("out"); setTimeout(() => d.remove(), 300); };
    d.addEventListener("click", (e) => {
      const b = e.target.closest("[data-t]"); if (!b) return;
      if (b.dataset.t === "gec" || i === s.length - 1) bitir(); else { i++; ciz(); }
    });
    ciz(); document.body.appendChild(d);
  }
  // ---------- keşif kartı: her açılışta rastgele, konum açıksa yakından ----------
  let kesifYuk = false, kesifYakin = false;
  async function gununKesfi() {
    if (kesifYuk && (kesifYakin || !me)) return;
    kesifYuk = true; kesifYakin = !!me;
    try {
      await loadAra(); if (!ARA) { kesifYuk = false; return; }
      let aday = ARA.filter((x) => x[7] === 1);
      if (me) {
        const u = aday.map((x) => [km(me, { lat: x[4], lng: x[5] }), x]).sort((a, b) => a[0] - b[0]);
        const yakin = u.filter((x) => x[0] <= 60);
        aday = (yakin.length >= 5 ? yakin : u.slice(0, 20)).map((x) => x[1]);
      }
      const x = aday[Math.floor(Math.random() * aday.length)]; if (!x) return;
      const d = await loadIl(x[2]); const p = d.yerler[x[3]]; if (!p) return;
      const k = foto(p.f, 960), k2 = foto(p.f, 500);
      const yer = esc([...new Set([p.ilce, p.il].filter(Boolean))].join(", "));
      $("gunun").innerHTML = `<button class="gunun" data-go="#/il/${d.s}/yer/${p.q}">${k ? `<img src="${k}" alt="" onerror="if(this.dataset.y){this.remove()}else{this.dataset.y=1;this.src='${k2}'}">` : ""}<span class="gtxt"><small>${me ? T("Yakınında keşfet") + " · " + fmt(km(me, p)) : T("Bugün keşfet")}</small><b>${esc(adi(p))}</b><span>${yer}</span></span></button>`;
    } catch (e) { kesifYuk = false; }
  }
  // ---------- gezi haritası: ilçelerini gezdikçe il boyanır ----------
  let HARITA = null, haritaSoz = null, HARITA_ORAN = new Map(), HARITA_KUTU = [80, 0, 1050, 585];
  async function renderHarita() {
    const kutu = $("gezHarita"); if (!kutu || !IDX) return;
    try {
      if (!HARITA) { haritaSoz = haritaSoz || getJSON("tr-harita.json?v=2"); HARITA = await haritaSoz; }
      const a = gittiklerim(), ilBy = new Map();
      for (const x of a) { if (!ilBy.has(x.s)) ilBy.set(x.s, []); ilBy.get(x.s).push(x); }
      const oran = new Map();
      for (const [s, liste] of ilBy) {
        const ozet = IDX.ilBy.get(s); if (!ozet) continue;
        let d = null; try { d = await loadIl(s); } catch (e) {}
        const toplam = ozet.ilceler.filter((z) => z[3] > 0).length || 1;
        const gidilen = new Set();
        for (const x of liste) { const y = d && d.yerler.find((t) => t.q === x.q); if (y && y.i >= 0) gidilen.add(y.i); }
        oran.set(s, Math.max(0.12, Math.min(1, gidilen.size / toplam)));
      }
      let tam = 0; HARITA_ORAN = oran;
      const yollar = Object.entries(HARITA).map(([s, d]) => {
        const il = IDX.ilBy.get(s); if (!il) return "";
        const o = oran.get(il.s) || 0; if (o >= 1) tam++;
        const renk = o >= 1 ? "var(--gez-tam)" : o > 0 ? `color-mix(in srgb,var(--gez-yari) ${Math.round(25 + o * 60)}%,var(--hbos))` : "var(--hbos)";
        return `<path d="${d}" style="fill:${renk}" data-go="#/il/${il.s}"><title>${esc(il.ad)}${o ? " · %" + Math.round(o * 100) : ""}</title></path>`;
      }).join("");
      kutu.innerHTML = `<svg viewBox="80 0 1050 585" class="trh" role="img" aria-label="${T("Gezi haritan")}">${yollar}</svg>
        <div class="hleg"><span><i style="background:var(--hbos)"></i>${T("Gitmedin")}</span><span><i style="background:color-mix(in srgb,var(--gez-yari) 45%,var(--hbos))"></i>${T("Başladın")}</span><span><i style="background:var(--gez-tam)"></i>${T("Tüm ilçeler")}</span></div>
        <p class="hnot">${a.length ? TL(`${ilBy.size} ile gittin${tam ? `, ${tam} ilin tüm ilçelerini gezdin` : ""}. Bir ilin ilçelerini gezdikçe rengi koyulaşır.`, `You've been to ${ilBy.size} provinces${tam ? `, all districts of ${tam}` : ""}. A province gets darker as you visit its districts.`) : TL(`Bir yere "Buraya gittim" dediğinde o il haritada yeşile boyanmaya başlar. İlçelerini gezdikçe rengi koyulaşır.`, `Tap "I've been here" on a place and its province turns green on the map. It gets darker as you visit its districts.`)}</p>`;
      try { const sv = kutu.querySelector("svg"), b = sv.getBBox(); if (b.width) { sv.setAttribute("viewBox", `${b.x - 4} ${b.y - 4} ${b.width + 8} ${b.height + 8}`); HARITA_KUTU = [b.x, b.y, b.width, b.height]; } } catch (e) {}
    } catch (e) {}
  }
  // ---------- gezi karnem: paylaşılabilir görsel ----------
  async function karne() {
    const a = gittiklerim(); if (!a.length) return;
    await renderHarita();
    try { await document.fonts.load("800 40px Manrope"); } catch (e) {}
    const W = 1080, H = 1920, c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"), F = (w, px) => `${w} ${px}px Manrope, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
    const bg = g.createLinearGradient(0, 0, W * 0.4, H); bg.addColorStop(0, "#1d4a9e"); bg.addColorStop(0.55, "#0f2c66"); bg.addColorStop(1, "#071634");
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    const isik = g.createRadialGradient(W * 0.85, 120, 0, W * 0.85, 120, 700); isik.addColorStop(0, "rgba(245,181,68,.35)"); isik.addColorStop(1, "rgba(245,181,68,0)");
    g.fillStyle = isik; g.fillRect(0, 0, W, H);
    g.textAlign = "center"; g.fillStyle = "#fff";
    try { const ik = new Image(); ik.src = "icon-192.png"; await ik.decode(); g.save(); g.beginPath(); g.roundRect(W / 2 - 150, 92, 64, 64, 16); g.clip(); g.drawImage(ik, W / 2 - 150, 92, 64, 64); g.restore(); } catch (e) {}
    g.font = F(800, 46); g.textAlign = "left"; g.fillText("Rota Cepte", W / 2 - 70, 140); g.textAlign = "center";
    g.font = F(800, 96); g.fillText(TL("Gezi Karnem", "My Travel Card"), W / 2, 300);
    const iller = new Set(a.map((x) => x.s)).size;
    g.textAlign = "left"; g.font = F(800, 230); const wN = g.measureText(String(iller)).width;
    g.font = F(700, 90); const w2 = g.measureText("/ 81").width, x0 = (W - wN - 24 - w2) / 2;
    g.font = F(800, 230); g.fillStyle = "#f5b544"; g.fillText(String(iller), x0, 540);
    g.font = F(700, 90); g.fillStyle = "rgba(255,255,255,.75)"; g.fillText("/ 81", x0 + wN + 24, 540); g.textAlign = "center";
    g.font = F(600, 44); g.fillStyle = "#fff"; g.fillText(TL("ili gezdim", "provinces visited"), W / 2, 620);
    // harita
    const [bx, by, bw, bh] = HARITA_KUTU, olc = 980 / bw, ox = (W - bw * olc) / 2, oy = 700;
    g.save(); g.translate(ox, oy); g.scale(olc, olc); g.translate(-bx, -by);
    for (const [s, d] of Object.entries(HARITA || {})) {
      const o = HARITA_ORAN.get(s) || 0, p = new Path2D(d);
      g.fillStyle = o >= 1 ? "#2fd17a" : o > 0 ? `rgba(47,209,122,${0.75 + o * 0.25})` : "rgba(255,255,255,.14)";
      g.fill(p); g.strokeStyle = "rgba(7,22,52,.9)"; g.lineWidth = 1.2 / olc * 1.6; g.stroke(p);
    }
    g.restore();
    // sayılar
    const R = rozetler(), rk = R.filter((x) => x.tamam);
    const kutu = (x, sayi, yazi) => {
      g.fillStyle = "rgba(255,255,255,.1)"; g.beginPath(); g.roundRect(x - 230, 1300, 460, 220, 36); g.fill();
      g.fillStyle = "#fff"; g.font = F(800, 96); g.fillText(sayi, x, 1420); g.font = F(600, 38); g.fillStyle = "rgba(255,255,255,.8)"; g.fillText(yazi, x, 1478);
    };
    kutu(W / 2 - 255, String(a.length), TL("yer gördüm", "places seen"));
    kutu(W / 2 + 255, `${rk.length}/${R.length}`, TL("rozet", "badges"));
    if (rk.length) { g.font = F(400, 64); g.fillStyle = "#fff"; g.fillText(rk.slice(0, 8).map((x) => x.e).join(" "), W / 2, 1640); }
    g.fillStyle = "#f5b544"; g.font = F(800, 50); g.fillText(T("Yol senin, rotan cepte!"), W / 2, 1770);
    g.fillStyle = "rgba(255,255,255,.75)"; g.font = F(600, 36); g.fillText(TL("Sen de gez: me7rt.github.io/Rota-Cepte", "Explore too: me7rt.github.io/Rota-Cepte"), W / 2, 1835);
    const url = c.toDataURL("image/png");
    // önizleme + paylaş
    const d = document.createElement("div"); d.className = "tanit";
    d.innerHTML = `<div class="tkart karnek"><img src="${url}" alt=""><div class="tbtn"><button class="linkbtn" data-k="kapat">${T("Kapat")}</button><button class="btn primary" data-k="paylas">${ik("share-2", 18)} ${TL("Paylaş", "Share")}</button></div></div>`;
    const kapat = () => { d.classList.add("out"); setTimeout(() => d.remove(), 300); };
    d.addEventListener("click", async (e) => {
      if (e.target === d || e.target.closest("[data-k=kapat]")) return kapat();
      if (!e.target.closest("[data-k=paylas]")) return;
      const metin = TL(`Türkiye'nin ${iller} ilini gezdim! Sen kaç ili gezdin? Rota Cepte ile bak: https://me7rt.github.io/Rota-Cepte/`, `I've visited ${iller} of Türkiye's 81 provinces! How many have you? https://me7rt.github.io/Rota-Cepte/`);
      const P = window.Capacitor && window.Capacitor.Plugins;
      try {
        if (P && P.Share && P.Filesystem) {
          const yaz = await P.Filesystem.writeFile({ path: "gezi-karnem.png", data: url.split(",")[1], directory: "CACHE" });
          await P.Share.share({ title: "Rota Cepte", text: metin, files: [yaz.uri] });
          return;
        }
        const blob = await (await fetch(url)).blob(), dosya = new File([blob], "gezi-karnem.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [dosya] })) { await navigator.share({ files: [dosya], text: metin }); return; }
        const l = document.createElement("a"); l.href = url; l.download = "gezi-karnem.png"; document.body.appendChild(l); l.click(); l.remove();
        toast(TL("Görsel indirildi. Galeriden paylaşabilirsin.", "Image saved. You can share it from your gallery."));
      } catch (err) { if (err && err.name !== "AbortError") toast(TL("Paylaşılamadı. Görsele basılı tutup kaydedebilirsin.", "Couldn't share. Long-press the image to save it.")); }
    });
    document.body.appendChild(d);
  }
  // ---------- paylaş ----------
  function paylas(p) {
    const url = `https://me7rt.github.io/Rota-Cepte/#/il/${p.ilS}/yer/${p.q}`;
    const yer = [...new Set([p.ilce, p.il].filter(Boolean))].join(", ");
    const metin = TL(`${p.ad} (${yer}) çok güzel bir yer, Rota Cepte uygulamasında buldum:`, `${adi(p)} (${yer}, Türkiye) is a beautiful place, I found it on Rota Cepte:`);
    if (navigator.share) navigator.share({ title: adi(p), text: metin, url }).catch(() => {});
    else window.open("https://wa.me/?text=" + encodeURIComponent(metin + " " + url), "_blank");
  }

  function renderHome() {
    if (!IDX) return;
    const q = $("search").value.trim();
    if (q.length >= 2) return renderSearch(q);
    gununKesfi();
    $("results").hidden = true; $("homeMain").hidden = false;
    const iller = IDX.iller.slice();
    if (me) iller.sort((a, b) => km(me, a) - km(me, b));
    $("ilGrid").innerHTML = iller.map((il) =>
      `<li><button class="ilcard" data-go="#/il/${il.s}">${thumb(il.f, "s", 500, "cover")}<span class="ilname"><b>${esc(il.ad)}</b><small>${me ? fmt(km(me, il)) + " · " : ""}${il.n} ${TL("yer", "places")} · ${il.ilceler.length} ${TL("ilçe", "districts")}</small></span></button></li>`).join("");
  }
  function renderSearch(q) {
    const s = sade(q);
    const res = [];
    for (const il of IDX.iller) {
      const a = sade(il.ad);
      if (a.includes(s)) res.push({ p: a.startsWith(s) ? 0 : 3, go: `#/il/${il.s}`, k: "s", ad: il.ad, alt: TL(`İl · ${il.n} yer · ${il.ilceler.length} ilçe`, `Province · ${il.n} places · ${il.ilceler.length} districts`) });
      il.ilceler.forEach((z, i) => {
        const b = sade(z[0]);
        if (b.includes(s)) res.push({ p: b.startsWith(s) ? 1 : 4, go: `#/il/${il.s}/ilce/${i}`, k: "y", ad: z[0], alt: TL(`${il.ad} ilçesi${z[3] ? " · " + z[3] + " yer" : ""}`, `District of ${il.ad}${z[3] ? " · " + z[3] + " places" : ""}`) });
      });
    }
    if (ARA) {
      for (const [b, ad, ils, j, , , k, , fp, en, be] of ARA) if (b.includes(s) || (DIL === "en" && be.includes(s))) res.push({ p: b.startsWith(s) || (DIL === "en" && be.startsWith(s)) ? 2 : 5, yer: `${ils}|${j}`, k: CATS[k] ? k : "t", fp, ad: DIL === "en" ? en : ad, alt: [(IDX.ilBy.get(ils) || {}).ad, CATS[k] && CATS[k].ad].filter(Boolean).join(" · ") });
    } else loadAra();
    res.sort((a, b) => a.p - b.p || a.ad.localeCompare(b.ad, "tr"));
    $("homeMain").hidden = true; $("results").hidden = false;
    $("results").innerHTML = res.length
      ? res.slice(0, 80).map((r) =>
        `<li><button class="row res" ${r.go ? `data-go="${r.go}"` : `data-yer="${r.yer}"`}>${r.fp ? thumb({ p: r.fp, w: 1e5 }, r.k) : `<span class="thumb" style="--c:${r.yer && CATS[r.k] ? CATS[r.k].renk : BOLGE_RENK}">${icon(r.k, 20)}</span>`}<span class="rt"><b>${esc(r.ad)}</b><small>${esc(r.alt)}</small></span><span class="km">${OKIK}</span></button></li>`).join("")
      : `<li class="empty">${ARA ? T("Sonuç bulunamadı.") : T("Aranıyor…")}</li>`;
  }

  // ---------- il / ilçe / yakın ekranları ----------
  function renderHero(h) {
    $("hero").hidden = false; $("hava").hidden = $("yemek").hidden = true;
    const src = foto(h.f, 960);
    $("heroImg").style.setProperty("--c", BOLGE_RENK);
    $("heroImg").innerHTML = icon("y", 40) + (src ? `<img src="${src}" alt="" onerror="fotoHata(this)">` : "");
    $("heroCredit").innerHTML = fotoAtif(h.f, h.kapak);
    $("heroFacts").innerHTML = h.facts.filter(Boolean).map(([k, v]) => `<span>${esc(k)} <strong>${esc(v)}</strong></span>`).join("");
    $("heroText").textContent = h.m || "";
    $("heroText").classList.add("clamp");
    $("heroText").hidden = !h.m;
    $("heroMore").hidden = !h.m || h.m.length < 240;
    $("heroWiki").hidden = !h.w;
    $("heroWiki").href = wikiUrl(h.w);
    $("heroWiki").textContent = h.w && h.w.startsWith("en:") ? T("Vikipedi (İngilizce)") : T("Vikipedi'de oku");
    metinLisans($("heroLis"), !!(h.m && h.w));
  }
  const nufusBilgi = (o) => (o.nuf ? [T("Nüfus") + (o.nufY ? ` (${o.nufY})` : ""), nf(o.nuf)] : null);
  const alanBilgi = (o) => (o.alan ? [T("Yüzölçümü"), nf(o.alan) + " km²"] : null);

  function showIl(d, tab) {
    view = { mode: "il", d };
    try { localStorage.setItem("gezi-son-il", d.s); } catch (e) {}
    show("city");
    $("eyebrow").textContent = d.plaka ? `${d.plaka} · ${T("İl")}` : T("İl");
    $("title").textContent = d.ad;
    const kapakYer = DIL === "en" && d.kapak && d.yerler.find((y) => y.ad === d.kapak);
    renderHero({ f: d.f, kapak: kapakYer ? adi(kapakYer) : d.kapak, m: DIL === "en" ? d.me : d.m, w: DIL === "en" ? d.we : d.w, facts: [nufusBilgi(d), alanBilgi(d), [TL("İlçe", "Districts"), d.ilceler.length], [T("Gezilecek yer"), d.yerler.length]] });
    $("tabs").hidden = false;
    $("tabBtnIlce").textContent = `${T("İlçeler")} (${d.ilceler.length})`;
    $("tabBtnYer").textContent = `${T("Gezilecek yerler")} (${d.yerler.length})`;
    havaGoster(IDX.ilBy.get(d.s) || d); yemekGoster(d);
    planBas = 0; planGoster(d);
    indirBtn();
    places = d.yerler; cat = "hepsi"; shown = 60; fitted = false;
    ilAraSifirla();
    sortMode = me ? "yakin" : "oner";
    setTab(tab);
  }
  function setTab(tab) {
    $("tabBtnYer").setAttribute("aria-selected", tab === "yer");
    $("tabBtnIlce").setAttribute("aria-selected", tab === "ilce");
    $("tabYer").hidden = tab !== "yer";
    $("tabIlce").hidden = tab !== "ilce";
    if (tab === "yer") { ensureMap(); renderAll(); }
    else renderIlceList(view.d);
  }
  function showIlce(d, i) {
    const z = d.ilceler[i];
    view = { mode: "ilce", d, i };
    show("city");
    $("eyebrow").textContent = `${d.ad} · ${T("İlçe")}`;
    $("title").textContent = z.ad;
    // Vikipedi metni olmayan ilçeler için kısa bilgi cümlesi
    const ilceMetin = DIL === "en"
      ? `${z.ad} is a district of ${d.ad} Province, Türkiye.${z.nuf ? ` Population: ${nf(z.nuf)}${z.nufY ? " (" + z.nufY + ")" : ""}.` : ""}`
      : z.m || `${z.ad}, ${d.ad} iline bağlı bir ilçedir.${z.nuf ? ` Nüfusu ${nf(z.nuf)}${z.nufY ? " (" + z.nufY + ")" : ""}.` : ""}${z.alan ? ` Yüzölçümü ${nf(z.alan)} km².` : ""}`;
    renderHero({ f: z.f, m: ilceMetin, w: DIL === "en" ? "" : z.w, facts: [nufusBilgi(z), alanBilgi(z), [T("Gezilecek yer"), z.n]] });
    $("tabs").hidden = true;
    places = d.yerler.filter((y) => y.i === i); cat = "hepsi"; shown = 60; fitted = false;
    // İlçede kayıtlı yer yoksa ilçe merkezine en yakın yerleri göster (35 km içinde)
    view.yakin = !places.length;
    if (view.yakin) places = d.yerler.map((y) => [y, km(z, y)]).filter((x) => x[1] < 35).sort((a, b) => a[1] - b[1]).slice(0, 15).map((x) => x[0]);
    ilAraSifirla();
    sortMode = me ? "yakin" : "oner";
    $("tabYer").hidden = false; $("tabIlce").hidden = true;
    ensureMap(); renderAll();
  }
  async function showNear(no) {
    view = { mode: "near" };
    show("city");
    $("eyebrow").textContent = T("Konumuna göre"); $("title").textContent = T("Yakınımdakiler");
    $("hero").hidden = true; $("tabs").hidden = true; $("tabYer").hidden = false; $("tabIlce").hidden = true;
    places = []; cat = "hepsi"; shown = 60; fitted = false; sortMode = "yakin";
    ilAraSifirla();
    ensureMap();
    if (!me) {
      renderAll();
      $("list").innerHTML = `<li class="empty">${T("Konumunu açınca sana en yakın yerleri burada canlı mesafeyle göreceksin.")}</li>`;
      startLocation(() => { if (view.mode === "near") route(); });
      return;
    }
    $("list").innerHTML = `<li class="empty">${T("Yükleniyor…")}</li>`;
    const yakin = IDX.iller.slice().sort((a, b) => km(me, a) - km(me, b)).slice(0, 3);
    const ds = await Promise.all(yakin.map((il) => loadIl(il.s)));
    if (no !== routeNo) return;
    places = ds.flatMap((d) => d.yerler).sort((a, b) => km(me, a) - km(me, b)).slice(0, 150);
    renderAll();
  }

  // ---------- liste ----------
  let ilAra = "";
  function visible() {
    let v = places;
    if (ilAra) v = v.filter((p) => sade(p.ad + " " + (p.ilce || "")).includes(ilAra));
    if (cat === "one") v = v.filter((p) => p.one);
    else if (cat !== "hepsi") v = v.filter((p) => p.k === cat);
    if (sortMode === "yakin" && me) v = v.slice().sort((a, b) => km(me, a) - km(me, b));
    else v = v.slice().sort((a, b) => (b.one || 0) - (a.one || 0) || b.sl - a.sl);
    return v;
  }
  function ilAraSifirla() { ilAra = ""; $("ilAra").value = ""; $("ilAraSil").hidden = true; }
  function renderAll() { renderChips(); renderSort(); renderList(); drawPins(); }
  function renderChips() {
    const say = (k) => places.filter((p) => (k === "one" ? p.one : p.k === k)).length;
    const items = [["hepsi", T("Hepsi"), places.length]];
    const one = say("one");
    if (one && one < places.length) items.push(["one", ik("star", 14) + " " + T("Öne çıkanlar"), one]);
    for (const k of Object.keys(CATS)) { const c = say(k); if (c) items.push([k, CATS[k].ad, c]); }
    $("chips").innerHTML = places.length ? items.map(([k, ad, c]) =>
      `<button data-k="${k}" aria-pressed="${cat === k}">${CATS[k] ? `<span class="dot" style="background:${CATS[k].renk}"></span>` : ""}${ad} <small>${c}</small></button>`).join("") : "";
  }
  function renderSort() {
    $("sortSeg").innerHTML = me && view.mode !== "near"
      ? `<button data-s="oner" aria-pressed="${sortMode !== "yakin"}">${T("Önerilen")}</button><button data-s="yakin" aria-pressed="${sortMode === "yakin"}">${T("En yakın")}</button>`
      : me ? T("En yakından uzağa") : T("Mesafe için konumu aç");
  }
  function altYazi(p) {
    if (view.mode === "near") return [...new Set([p.ilce, p.il].filter(Boolean))].join(", ");
    if (view.mode === "il") return [p.ilce, CATS[p.k].ad].filter(Boolean).join(" · ");
    return CATS[p.k].ad;
  }
  function renderList() {
    if (view.mode === "home") return;
    const v = visible();
    $("count").textContent = v.length ? `${v.length} ${TL("yer", "places")}` : "";
    if (!v.length) {
      $("list").innerHTML = view.mode === "ilce"
        ? `<li class="empty">${T("Bu ilçe için henüz fotoğraflı gezi noktası yok. İlin diğer yerlerine göz atabilirsin.")}</li>`
        : view.mode === "near" && !me ? $("list").innerHTML : ilAra ? `<li class="empty">${T("Bu isimde yer bulunamadı. Tüm Türkiye'de aramak için ana sayfadaki arama kutusunu kullan.")}</li>` : `<li class="empty">${T("Bu kategoride yer yok.")}</li>`;
      $("moreBtn").hidden = true;
      return;
    }
    const not = view.mode === "ilce" && view.yakin ? `<li class="empty">${TL("Bu ilçede kayıtlı gezi noktası yok. İlçe merkezine en yakın yerler:", "No places listed in this district yet. Nearest places to the district centre:")}</li>` : "";
    $("list").innerHTML = not + v.slice(0, shown).map((p) =>
      `<li><button class="row" data-s="${p.ilS}" data-j="${p.j}">${thumb(p.f, p.k)}<span class="rt"><b>${p.one ? `<i class="star" title="${T("Öne çıkan")}">${ik("star", 14)}</i>` : ""}${esc(adi(p))}</b><small>${esc(altYazi(p))}</small></span><span class="km">${me ? fmt(km(me, p)) : ""}</span></button></li>`).join("");
    $("moreBtn").hidden = v.length <= shown;
    $("moreBtn").textContent = `${T("Daha fazla göster")} (${v.length - shown})`;
  }
  function renderIlceList(d) {
    $("ilceList").innerHTML = d.ilceler.map((z, i) =>
      `<li><button class="row" data-go="#/il/${d.s}/ilce/${i}">${thumb(z.f, "y")}<span class="rt"><b>${esc(z.ad)}</b><small>${z.n ? z.n + TL(" gezilecek yer", " places") : T("İlçe bilgisi")}${z.nuf ? " · " + nf(z.nuf) + TL(" kişi", " people") : ""}</small></span><span class="km" data-lat="${z.lat}" data-lng="${z.lng}">${me ? fmt(km(me, z)) : OKIK}</span></button></li>`).join("");
  }

  // ---------- harita ----------
  function ensureMap() {
    if (map) { setTimeout(() => map.invalidateSize(), 60); return; }
    map = L.map("map", { zoomControl: false, attributionControl: true }).setView([39, 35], 6);
    L.control.zoom({ zoomInTitle: TL("Yakınlaştır", "Zoom in"), zoomOutTitle: TL("Uzaklaştır", "Zoom out") }).addTo(map);
    // Atıflar zorunlu: OSM (ODbL) ve MapTiler kullanım şartları; bağlantılar dış tarayıcıda açılır
    const OSM_ATIF = `<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap ${TL("katkıcıları", "contributors")}</a>`;
    map.attributionControl.setPrefix(`<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>`);
    const osm = () => L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: OSM_ATIF });
    if (HARITA_ANAHTAR) {
      // MapTiler çalışmazsa (kota, anahtar hatası) OpenStreetMap'e geç
      let hata = 0;
      const mt = L.tileLayer(`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${HARITA_ANAHTAR}`, { maxZoom: 19, attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank" rel="noopener">© MapTiler</a> ${OSM_ATIF}` });
      mt.on("tileload", () => { hata = 0; });
      mt.on("tileerror", () => { if (++hata === 6 && map.hasLayer(mt)) { map.removeLayer(mt); osm().addTo(map); } });
      mt.addTo(map);
    } else osm().addTo(map);
    layer = L.layerGroup().addTo(map);
  }
  function drawPins() {
    if (!map) return;
    layer.clearLayers();
    meMarker = null;
    const pts = [];
    for (const p of visible()) {
      const big = !!p.one, s = big ? 34 : 26;
      L.marker([p.lat, p.lng], {
        icon: L.divIcon({ className: "", html: `<div class="pin${big ? " big" : ""}" style="background:${CATS[p.k].renk}">${icon(p.k, big ? 16 : 13)}</div>`, iconSize: [s, s], iconAnchor: [s / 2, s / 2] }),
        title: adi(p), alt: adi(p), keyboard: false, zIndexOffset: big ? 500 : 0
      }).on("click", () => openDetail(p)).addTo(layer);
      pts.push([p.lat, p.lng]);
    }
    drawMe();
    if (!fitted) {
      if (view.mode === "near" && me) pts.push([me.lat, me.lng]);
      const merkez = view.mode === "ilce" ? view.d.ilceler[view.i] : view.d;
      if (pts.length > 1) map.fitBounds(pts, { padding: [28, 28], maxZoom: 14 });
      else if (pts.length) map.setView(pts[0], 13);
      else if (merkez) map.setView([merkez.lat, merkez.lng], view.mode === "ilce" ? 11 : 9);
      else if (me) map.setView([me.lat, me.lng], 11);
      fitted = true;
    }
    setTimeout(() => map.invalidateSize(), 60);
  }
  function drawMe() {
    if (!map || !me) return;
    if (!meMarker) meMarker = L.marker([me.lat, me.lng], { icon: L.divIcon({ className: "", html: '<div class="me"></div>', iconSize: [16, 16], iconAnchor: [8, 8] }), interactive: false, zIndexOffset: 1000 }).addTo(layer);
    else meMarker.setLatLng([me.lat, me.lng]);
  }

  // ---------- detay ----------
  function renderFacts(p) {
    const parts = [me ? `<span>${T("Uzaklık")} <strong>${fmt(km(me, p))}</strong></span>` : `<span>${T("Mesafe için konumu aç")}</span>`];
    parts.push(`<span>${esc([...new Set([p.ilce, p.il].filter(Boolean))].join(", "))}</span>`);
    if (p.yil) parts.push(`<span>${p.k === "d" ? T("Kuruluş") : T("Yapım")} <strong>${esc(yilYaz(p.yil))}</strong></span>`);
    if (p.rak) parts.push(`<span>${T("Rakım")} <strong>${nf(p.rak)} m</strong></span>`);
    if (p.un) parts.push(`<span class="badge">${T("UNESCO Dünya Mirası")}</span>`);
    $("dFacts").innerHTML = parts.join("");
  }
  function openDetail(p) {
    open = p;
    const c = CATS[p.k];
    $("dTitle").textContent = adi(p);
    $("dTag").textContent = c.ad; $("dTag").style.background = c.renk;
    $("dPhoto").style.setProperty("--c", c.renk);
    $("dIcon").innerHTML = icon(p.k, 54);
    const src = foto(p.f, 960);
    $("dImg").innerHTML = src ? `<img src="${src}" alt="${esc(p.ad)}" onerror="fotoHata(this)">` : "";
    $("dCredit").innerHTML = fotoAtif(p.f);
    // Galeri: öne çıkan yerlerde ek fotoğraflar (dokununca büyük fotoğraf değişir)
    const gal = p.f && p.g && p.g.length ? [p.f, ...p.g] : [];
    $("dGaleri").hidden = !gal.length;
    $("dGaleri").innerHTML = gal.map((f, i) => `<button class="gk${i ? "" : " on"}" data-i="${i}" aria-label="${TL("Fotoğraf", "Photo")} ${i + 1}"><img src="${foto(f, 250)}" alt="" loading="lazy" onerror="this.parentNode.remove()"></button>`).join("");
    renderFacts(p);
    favBtn(p); gitBtn(p); $("dFav").hidden = $("dShare").hidden = $("dGit").hidden = !p.q;
    dinleDurdur(); $("dDinle").hidden = !sesVar;
    const ip = DIL === "en" ? p.ipe : p.ip;
    $("dTip").hidden = !ip; $("dTip").innerHTML = ip ? `<b>${TL("İpucu:", "Tip:")}</b> ` + esc(ip) : "";
    const ilce = p.ilce && p.ilce !== p.il ? p.ilce : "";
    let txt;
    if (DIL === "en") txt = p.me || `${adi(p)} is one of the places worth seeing in ${ilce ? ilce + ", " : ""}${p.il} Province, Türkiye.`;
    else {
      txt = p.m ? (p.en ? "(İngilizce kaynaktan) " : "") + p.m : "";
      if (!txt && p.ac) txt = `${p.ad}: ${p.ac}.`;
      if (!txt) txt = `${p.ad}, ${p.il} ilinin ${ilce ? ilce + " ilçesinde" : "sınırları içinde"} görülmeye değer yerlerden biridir.`;
    }
    $("dText").textContent = txt;
    const q = `${p.lat},${p.lng}`;
    const hedef = p.gq ? encodeURIComponent(p.gq) : q;
    $("dMap").href = `https://www.google.com/maps/search/?api=1&query=${hedef}`;
    $("dDir").href = `https://www.google.com/maps/dir/?api=1&destination=${hedef}`;
    // Müze ve tarihi yerlerde güncel ziyaret saatleri ve giriş ücreti (bilgiyi biz tutmuyoruz, her zaman güncel kaynağa gider)
    const saat = p.k === "m" || p.k === "t" ? `<a class="ykn" target="_blank" rel="noopener" href="https://www.google.com/search?q=${encodeURIComponent(`${p.ad} ${p.il} ${TL("ziyaret saatleri giriş ücreti", "opening hours ticket price")}`)}">${ik("clock", 16)} ${TL("Saatler ve giriş ücreti", "Hours & tickets")}</a>` : "";
    $("dYakin").innerHTML = saat + [["utensils", T("Yemek"), "restoran"], ["coffee", T("Kafe"), "kafe"], ["bed", T("Konaklama"), "otel"], ["fuel", T("Benzin"), "benzin istasyonu"], ["square-parking", T("Otopark"), "otopark"]].map(([e, ad, ara]) =>
      `<a class="ykn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/${encodeURIComponent(ara)}/@${p.lat},${p.lng},15z">${ik(e, 16)} ${ad}</a>`).join("");
    // Yakındaki gezilecek yerler (aynı ilde, 25 km içinde, en yakın 5)
    const il = IL.get(p.ilS);
    const cevre = il ? il.yerler.filter((y) => y !== p).map((y) => [y, km(p, y)]).filter((x) => x[1] < 25).sort((a, b) => a[1] - b[1]).slice(0, 5) : [];
    $("dCevreBas").hidden = !cevre.length;
    $("dCevreBas").textContent = TL("Yakındaki gezilecek yerler", "Nearby places to see");
    $("dCevre").innerHTML = cevre.map(([y, d]) => `<li><button class="row" data-s="${y.ilS}" data-j="${y.j}">${thumb(y.f, y.k)}<span class="rt"><b>${y.one ? `<i class="star">${ik("star", 14)}</i>` : ""}${esc(adi(y))}</b><small>${esc(CATS[y.k].ad)}</small></span><span class="km">${fmt(d)}</span></button></li>`).join("");
    const wk = DIL === "en" ? p.we || p.w : p.w;
    $("dWiki").hidden = !wk;
    $("dWiki").href = wikiUrl(wk);
    $("dWiki").textContent = wk && wk.startsWith("en:") ? T("Vikipedi'de (İngilizce) oku") : DIL === "en" && wk ? "Read more on Wikipedia (Turkish)" : T("Vikipedi'de devamını oku");
    metinLisans($("dLis"), !!(DIL === "en" ? p.me && p.we : p.m && p.w), DIL === "en" ? p.cve : p.cv);
    $("sheet").querySelector(".card").scrollTop = 0;
    if ($("sheet").hidden) { history.pushState({ sheet: 1 }, "", location.href); sheetPushed = true; acan = document.activeElement; }
    $("sheet").hidden = false; arkaPlan(true);
    $("dClose").focus({ preventScroll: true });
  }
  // Detay kartı açıkken arka plan ekran okuyucu ve klavyeden gizlenir; kapanınca odak açan satıra döner
  let acan = null;
  function arkaPlan(kapali) { for (const el of document.querySelectorAll("body > header, body > main, #tabbar")) el.inert = kapali; }
  function hideSheet() {
    const vardi = !$("sheet").hidden;
    dinleDurdur(); $("sheet").hidden = true; open = null; sheetPushed = false; arkaPlan(false);
    if (vardi && acan && document.contains(acan)) acan.focus({ preventScroll: true });
    acan = null;
  }
  function closeDetail() {
    if ($("sheet").hidden) return;
    const geri = sheetPushed;
    hideSheet();
    if (geri) history.back();
  }

  // ---------- olaylar ----------
  let araZaman = null;
  function araTemizle() { $("search").value = ""; $("araSil").hidden = true; renderHome(); }
  $("search").addEventListener("input", () => { $("araSil").hidden = !$("search").value; clearTimeout(araZaman); araZaman = setTimeout(renderHome, 120); });
  $("araSil").addEventListener("click", () => { araTemizle(); $("search").blur(); window.scrollTo(0, 0); });
  $("results").addEventListener("click", (e) => { if (e.target.closest("[data-go],[data-yer]")) setTimeout(araTemizle, 0); });
  $("search").addEventListener("focus", () => { if (IDX) loadAra(); });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-go]");
    if (b) { git(b.dataset.go); return; }
    const y = e.target.closest("[data-yer]");
    if (y) { const [s, j] = y.dataset.yer.split("|"); bekleyenYer = { s, j: +j }; git(`#/il/${s}`); }
  });
  $("ilAra").addEventListener("input", () => { ilAra = sade($("ilAra").value.trim()); $("ilAraSil").hidden = !ilAra; shown = 60; renderList(); drawPins(); });
  $("ilAraSil").addEventListener("click", () => { ilAraSifirla(); renderList(); drawPins(); $("ilAra").focus(); });
  $("nearBtn").addEventListener("click", () => git("#/yakin"));
  $("dilYazi").textContent = TL("Language: English", "Dil: Türkçe");
  $("dilBtn").addEventListener("click", () => dilDegistir(TL("en", "tr")));
  // ---------- tema (renk paleti): varsayılan Gün Batımı, Ayarlar'dan değişir ----------
  const TEMALAR = [
    { k: "gunbatimi", ad: TL("Gün Batımı", "Sunset"), not: TL("Kum, gün batımı turuncusu, dağ laciverdi", "Sand, sunset orange, mountain navy"), r: ["#f6eee7", "#d13415", "#1f2d5c"], koyu: "#11131f" },
    { k: "ege", ad: TL("Ege", "Aegean"), not: TL("Turkuaz deniz, beyaz kıyı, mercan", "Turquoise sea, white shore, coral"), r: ["#def7f9", "#107d98", "#d13415"], koyu: "#0b161a" },
    { k: "karadeniz", ad: TL("Karadeniz", "Black Sea"), not: TL("Yeşil yayla, orman, turuncu ikindi", "Green highlands, forest, warm orange"), r: ["#e9f6e9", "#2a7e3b", "#cc4e00"], koyu: "#0e1511" }
  ];
  let tema = "gunbatimi";
  try { const t = localStorage.getItem("gezi-tema"); if (TEMALAR.some((x) => x.k === t)) tema = t; } catch (e) {}
  function temaUygula(k) {
    const t = TEMALAR.find((x) => x.k === k) || TEMALAR[0];
    tema = t.k;
    if (t.k === "gunbatimi") document.documentElement.removeAttribute("data-tema");
    else document.documentElement.setAttribute("data-tema", t.k);
    const m = document.querySelectorAll('meta[name="theme-color"]');
    if (m[0]) m[0].content = t.r[0];
    if (m[1]) m[1].content = t.koyu;
    $("temaYazi").innerHTML = `${TL("Tema", "Theme")}: <b>${esc(t.ad)}</b>`;
  }
  function temaSec() {
    const d = document.createElement("div"); d.className = "tanit";
    const secenek = (t) => `<button class="tsec" role="radio" aria-checked="${t.k === tema}" data-tema="${t.k}"><span class="tornek" aria-hidden="true"><i class="tz" style="--sw-a:${t.r[0]};--sw-k:${t.koyu}"></i><i style="background:${t.r[1]}"></i><i style="background:${t.r[2]}"></i></span><span class="tad"><b>${esc(t.ad)}</b><small>${esc(t.not)}</small></span><i class="tisaret" aria-hidden="true">${ik("check", 16)}</i></button>`;
    d.innerHTML = `<div class="tkart"><div class="temo">${ik("palette", 36)}</div><h2>${TL("Tema", "Theme")}</h2><p>${TL("Uygulamanın renklerini seç. Karanlık mod telefonunun ayarına göre açılır.", "Pick the app colours. Dark mode follows your phone's setting.")}</p>
      <div class="temalar" role="radiogroup" aria-label="${TL("Tema", "Theme")}">${TEMALAR.map(secenek).join("")}</div>
      <div class="tbtn" style="justify-content:center"><button class="btn primary" data-k="kapat">${TL("Tamam", "Done")}</button></div></div>`;
    const kapat = () => { d.classList.add("out"); setTimeout(() => d.remove(), 300); $("temaBtn").focus(); };
    d.addEventListener("click", (e) => {
      const b = e.target.closest(".tsec");
      if (b) {
        temaUygula(b.dataset.tema);
        try { localStorage.setItem("gezi-tema", tema); } catch (er) {}
        d.querySelectorAll(".tsec").forEach((x) => x.setAttribute("aria-checked", String(x === b)));
        return;
      }
      if (e.target === d || e.target.closest("[data-k=kapat]")) kapat();
    });
    document.body.appendChild(d);
    setTimeout(() => { const s = d.querySelector('[aria-checked="true"]'); if (s) s.focus(); }, 50);
  }
  temaUygula(tema);
  $("temaBtn").addEventListener("click", temaSec);
  $("locBtn").addEventListener("click", () => { if (watchId !== null) stopLocation(); else startLocation(); });
  $("temaLoc").addEventListener("click", () => startLocation());
  $("back").addEventListener("click", () => {
    if (view.mode === "ilce") git(`#/il/${view.d.s}/ilceler`);
    else git("#/");
  });
  $("tabs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tab]"); if (!b || !view.d) return;
    history.replaceState(null, "", `#/il/${view.d.s}${b.dataset.tab === "ilce" ? "/ilceler" : ""}`);
    setTab(b.dataset.tab);
  });
  $("chips").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; cat = b.dataset.k; shown = 60; fitted = false; renderChips(); renderList(); drawPins(); });
  $("sortSeg").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; sortMode = b.dataset.s; renderSort(); renderList(); });
  $("moreBtn").addEventListener("click", () => { shown += 60; renderList(); });
  $("list").addEventListener("click", (e) => {
    const b = e.target.closest(".row"); if (!b) return;
    const d = IL.get(b.dataset.s); if (d) openDetail(d.yerler[+b.dataset.j]);
  });
  $("heroMore").addEventListener("click", () => { $("heroText").classList.remove("clamp"); $("heroMore").hidden = true; });
  $("dClose").addEventListener("click", closeDetail);
  $("dGaleri").addEventListener("click", (e) => {
    const b = e.target.closest(".gk"); if (!b || !open) return;
    const gal = [open.f, ...(open.g || [])]; const f = gal[+b.dataset.i]; if (!f) return;
    $("dImg").innerHTML = `<img src="${foto(f, 960)}" alt="${esc(adi(open))}" onerror="fotoHata(this)">`;
    $("dCredit").innerHTML = fotoAtif(f);
    for (const x of $("dGaleri").children) x.classList.toggle("on", x === b);
  });
  $("dCevre").addEventListener("click", (e) => {
    const b = e.target.closest(".row"); if (!b) return;
    const d = IL.get(b.dataset.s); if (d) { dinleDurdur(); openDetail(d.yerler[+b.dataset.j]); }
  });
  $("sheet").addEventListener("click", (e) => { if (e.target === $("sheet")) closeDetail(); });
  // Kartı aşağı kaydırınca kapat (kart en üstteyken)
  (function () {
    const kart = $("sheet").querySelector(".card");
    let y0 = null, dy = 0;
    kart.addEventListener("touchstart", (e) => { y0 = kart.scrollTop <= 0 ? e.touches[0].clientY : null; dy = 0; }, { passive: true });
    kart.addEventListener("touchmove", (e) => {
      if (y0 == null) return;
      dy = e.touches[0].clientY - y0;
      if (dy > 0) { kart.style.transition = "none"; kart.style.transform = `translateY(${dy}px)`; } else { y0 = null; kart.style.transform = ""; }
    }, { passive: true });
    kart.addEventListener("touchend", () => {
      kart.style.transition = ""; kart.style.transform = "";
      if (y0 != null && dy > 110) closeDetail();
      y0 = null; dy = 0;
    });
  })();
  $("dFav").addEventListener("click", () => { if (open) favDegis(open); });
  $("dShare").addEventListener("click", () => { if (open) paylas(open); });
  $("dGit").addEventListener("click", () => { if (open) gitDegis(open); });
  // Bilgi yanlış ya da eksik mi: yer adı ve kimliği hazır yazılmış e-posta
  $("dYanlis").addEventListener("click", () => {
    const p = open; if (!p) return;
    const yer = [...new Set([p.ilce, p.il].filter(Boolean))].join(", ");
    const konu = TL("Bilgi düzeltme: ", "Correction: ") + adi(p) + " (" + p.il + ")";
    const govde = TL(`Yer: ${p.ad}\nİl / ilçe: ${yer}\nKimlik: ${p.q || "-"}\n\nNe yanlış ya da eksik? (Fotoğraf, bilgi, konum…)\n\n\n(Sürüm ${SURUM})`,
      `Place: ${adi(p)}\nProvince / district: ${yer}\nID: ${p.q || "-"}\n\nWhat is wrong or missing? (Photo, text, location…)\n\n\n(Version ${SURUM})`);
    location.href = `mailto:${ILETISIM}?subject=${encodeURIComponent(konu)}&body=${encodeURIComponent(govde)}`;
  });
  document.querySelectorAll(".onerbtn").forEach((b) => b.addEventListener("click", yerOner));
  $("dDinle").addEventListener("click", dinle);
  $("gezBtn").addEventListener("click", () => { $("gezList").hidden = !$("gezList").hidden; });
  $("karneBtn").addEventListener("click", karne);
  $("hedefSec").addEventListener("click", (e) => {
    const b = e.target.closest("[data-hedef]"); if (!b) return;
    const n = +b.dataset.hedef;
    try { if (n) localStorage.setItem(HEDEF, JSON.stringify({ y: new Date().getFullYear(), n })); else localStorage.removeItem(HEDEF); } catch (err) {}
    renderHedef();
    if (n) toast(TL(`Hedefin: bu yıl ${n} il. Hadi yola!`, `Goal set: ${n} provinces this year. Let's go!`));
  });
  $("indirBtn").addEventListener("click", ilIndir);
  $("plan").addEventListener("click", (e) => {
    if (e.target.closest("#planYeni")) { planBas++; planGoster(view.d); return; }
    const b = e.target.closest(".row"); if (!b) return;
    const d = IL.get(b.dataset.s); if (d) openDetail(d.yerler[+b.dataset.j]);
  });
  $("paylasBtn").addEventListener("click", uygulamaPaylas);
  puanSor();
  $("indirSil").addEventListener("click", ilIndirSil);
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const m = document.querySelector(".tanit");
    if (m) { const k = m.querySelector('[data-t="gec"],[data-k="kapat"],[data-k="sonra"],[data-k="iptal"],.btn'); if (k) k.click(); else m.remove(); return; }
    closeDetail();
  });
  // Açılan pencereleri (tanıtım, öneri, rozet) ekran okuyucuya pencere olarak bildir
  new MutationObserver((l) => l.forEach((m) => m.addedNodes.forEach((n) => {
    if (n.classList && n.classList.contains("tanit")) { const k = n.querySelector(".tkart"); if (k) { k.setAttribute("role", "dialog"); k.setAttribute("aria-modal", "true"); const h = k.querySelector("h2"); if (h) { h.id = h.id || "tanitBaslik"; k.setAttribute("aria-labelledby", h.id); } } }
  }))).observe(document.body, { childList: true });
  window.addEventListener("popstate", () => { if (!$("sheet").hidden) hideSheet(); });
  window.addEventListener("hashchange", route);

  // ---------- Android geri tuşu (yalnızca uygulama içinde) ----------
  const CapApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
  if (CapApp && CapApp.addListener) {
    let cikisZamani = 0;
    CapApp.addListener("backButton", (e) => {
      const modal = document.querySelector(".tanit");
      if (modal) { const k = modal.querySelector('[data-t="gec"],[data-k="kapat"],[data-k="sonra"],[data-k="iptal"]'); if (k) k.click(); else modal.remove(); return; }
      if (!$("sheet").hidden) { closeDetail(); return; }
      const ev = !location.hash || location.hash === "#/" || location.hash === "#";
      if (!ev) { if (e && e.canGoBack) history.back(); else git("#/"); return; }
      if ($("search").value) { araTemizle(); return; }
      if (Date.now() - cikisZamani < 2000) { CapApp.exitApp(); return; }
      cikisZamani = Date.now(); toast(T("Çıkmak için tekrar geri bas"));
    });
  }
  // ---------- hafta sonu önerisi: her Cuma 18:00'de telefonda hazırlanan yerel bildirim (yalnızca uygulamada) ----------
  const LN = window.Capacitor && window.Capacitor.getPlatform && window.Capacitor.getPlatform() !== "web" && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications;
  const BILDIRIM = "gezi-bildirim", HS_ID = 7001;
  const bildirimAcik = () => { try { return localStorage.getItem(BILDIRIM) === "1"; } catch (e) { return false; } };
  // Her açılışta yeniden kurulur: öneriler o anki konuma ya da son bakılan ile göre, gidilmemiş ve fotoğraflı 3 yer
  async function haftaSonuKur() {
    if (!LN) return;
    try {
      await LN.cancel({ notifications: [{ id: HS_ID }] });
      if (!bildirimAcik()) return;
      if ((await LN.checkPermissions()).display !== "granted") return;
      await loadAra(); if (!ARA) return;
      const gidilen = new Set(gittiklerim().map((x) => x.s + "|" + x.ad));
      let aday = ARA.filter((x) => x[7] === 1 && !gidilen.has(x[2] + "|" + x[1])), merkez = me;
      if (!merkez) { let s = null; try { s = localStorage.getItem("gezi-son-il"); } catch (e) {} const il = s && IDX && IDX.ilBy.get(s); if (il && il.lat != null) merkez = { lat: il.lat, lng: il.lng }; }
      if (merkez) {
        const u = aday.map((x) => [km(merkez, { lat: x[4], lng: x[5] }), x]).sort((a, b) => a[0] - b[0]);
        const yakin = u.filter((x) => x[0] <= 150);
        aday = (yakin.length >= 6 ? yakin : u).slice(0, 15).map((x) => x[1]);
      }
      const sec = [];
      while (aday.length && sec.length < 3) sec.push(aday.splice(Math.floor(Math.random() * aday.length), 1)[0]);
      if (!sec.length) return;
      const adlar = sec.map((x) => (DIL === "en" ? x[9] : x[1])).join(", ");
      let hedef = "#/yakin";
      try { const d = await loadIl(sec[0][2]); const p = d.yerler[sec[0][3]]; if (p && p.q) hedef = `#/il/${d.s}/yer/${p.q}`; } catch (e) {}
      await LN.schedule({ notifications: [{
        id: HS_ID,
        title: TL("Bu hafta sonu nereye?", "Where to this weekend?"),
        body: TL(`${merkez ? "Sana yakın" : "Senin için"} 3 öneri: ${adlar}`, `3 ideas ${merkez ? "near you" : "for you"}: ${adlar}`),
        schedule: { on: { weekday: 6, hour: 18, minute: 0 }, allowWhileIdle: true },
        extra: { git: hedef }
      }] });
    } catch (e) {}
  }
  function bildirimYazi() {
    const b = $("bildirimBtn"); if (!b) return;
    b.hidden = !LN;
    $("bildirimYazi").textContent = bildirimAcik() ? TL("Hafta sonu önerisi: Açık (Cuma 18:00)", "Weekend ideas: On (Fridays 6 pm)") : TL("Hafta sonu önerisi: Kapalı", "Weekend ideas: Off");
  }
  async function bildirimAc(ac) {
    if (!LN) return;
    if (ac) {
      let izin = "denied";
      try { izin = (await LN.requestPermissions()).display; } catch (e) {}
      if (izin !== "granted") {
        try { localStorage.setItem(BILDIRIM, "0"); } catch (e) {}
        bildirimYazi(); toast(TL("Bildirim izni verilmedi. Telefonunun ayarlarından açabilirsin.", "Notifications aren't allowed. You can turn them on in your phone settings."));
        return;
      }
    }
    try { localStorage.setItem(BILDIRIM, ac ? "1" : "0"); } catch (e) {}
    bildirimYazi(); await haftaSonuKur();
    toast(ac ? TL("Tamam! Her Cuma 18:00'de hafta sonu için 3 öneri gelecek.", "Done! Every Friday at 6 pm you'll get 3 weekend ideas.") : TL("Hafta sonu önerisi kapatıldı.", "Weekend ideas turned off."));
  }
  // Listeye ilk yer eklendiğinde bir kez sorulur; "Şimdi değil" denirse bir daha sorulmaz (ayarlardan açılabilir)
  function bildirimTeklif() {
    if (!LN || document.querySelector(".tanit")) return;
    try { if (localStorage.getItem(BILDIRIM) != null) return; } catch (e) { return; }
    const d = document.createElement("div"); d.className = "tanit";
    d.innerHTML = `<div class="tkart"><div class="temo">${ik("bell", 36)}</div><h2>${TL("Hafta sonu önerisi ister misin?", "Want weekend ideas?")}</h2><p>${TL("Her Cuma akşamı sana yakın 3 gezilecek yer önerelim. Öneri telefonunda hazırlanır, hiçbir bilgi bize gelmez. İstediğin zaman kapatabilirsin.", "Every Friday evening we'll suggest 3 places near you. It's prepared on your phone and nothing is sent to us. You can turn it off anytime.")}</p><div class="tbtn"><button class="linkbtn" data-k="sonra">${TL("Şimdi değil", "Not now")}</button><button class="btn primary" data-k="evet">${TL("Evet, gönder", "Yes, please")}</button></div></div>`;
    const kapat = () => { d.classList.add("out"); setTimeout(() => d.remove(), 300); };
    d.addEventListener("click", (e) => {
      const b = e.target.closest("[data-k]");
      if (e.target === d || (b && b.dataset.k === "sonra")) { try { localStorage.setItem(BILDIRIM, "0"); } catch (err) {} bildirimYazi(); kapat(); }
      else if (b && b.dataset.k === "evet") { kapat(); bildirimAc(true); }
    });
    document.body.appendChild(d);
  }
  if (LN) {
    $("bildirimBtn").addEventListener("click", () => bildirimAc(!bildirimAcik()));
    if (LN.addListener) LN.addListener("localNotificationActionPerformed", (a) => { const g = a && a.notification && a.notification.extra && a.notification.extra.git; if (g) git(g); });
    bildirimYazi();
    setTimeout(haftaSonuKur, 4000);
  }
  // ---------- özel günler: milli bayramlar, anma günleri, dini bayramlar ----------
  async function ozelGun() {
    try {
      const o = await getJSON(`ozel-gunler.json?v=${SURUM}`);
      const n = new Date(), iki = (x) => String(x).padStart(2, "0");
      const gun = `${n.getFullYear()}-${iki(n.getMonth() + 1)}-${iki(n.getDate())}`;
      const g = o.sabit[gun.slice(5)] || (o.degisken || []).find((x) => gun >= x.bas && gun <= x.bit);
      if (!g) return;
      const msj = TL(g.tr, g.en || g.tr);
      // açılış ekranı
      const t2 = document.querySelector(".sp-tag2"); if (t2) { t2.textContent = `${g.e} ${msj}`; t2.classList.add("sp-ozel"); }
      if (g.yas) document.documentElement.classList.add("yas");
      // ana sayfa şeridi
      const b = $("ozelGun");
      b.innerHTML = `<i>${g.e}</i><span><b>${esc(msj)}</b>${g.bayram ? `<small>${TL("Bayram tatili için hazır rotalara göz at ›", "Browse ready-made routes for the holiday ›")}</small>` : ""}</span>`;
      b.classList.toggle("yas", !!g.yas); b.hidden = false;
      if (g.bayram) b.onclick = () => { const r = $("rotaSec"); if (r) r.scrollIntoView({ behavior: "smooth", block: "start" }); };
    } catch (e) {}
  }
  // Sayfa başlığı ekrana göre değişsin (sekme, geçmiş, ekran okuyucu)
  new MutationObserver(() => { const t = $("title").textContent; document.title = t && view.mode !== "home" ? `${t} · Rota Cepte` : TL("Rota Cepte · Türkiye Gezi Rehberi", "Rota Cepte · Türkiye Travel Guide"); }).observe($("title"), { childList: true, characterData: true, subtree: true });
  ozelGun();
  temaChips();
  rotaKartlar();
  route();
  setTimeout(tanitim, 5200);
  // Konum izni daha önce verildiyse sessizce başlat
  let kapali = false; try { kapali = !!localStorage.getItem("gezi-konum-kapali"); } catch (e) {}
  if (!kapali && navigator.permissions) navigator.permissions.query({ name: "geolocation" }).then((s) => { if (s.state === "granted") startLocation(); }).catch(() => {});
})();
