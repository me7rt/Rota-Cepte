/* Rota Cepte · © 2026 Mert Turanlıoğlu · Tüm hakları saklıdır. İzinsiz kopyalanamaz ve yayınlanamaz.
   Rota Cepte: 81 il, tüm ilçeler, canlı konum.
   Veri docs/data altında; GitHub Actions'ta Wikidata, Vikipedi ve Commons'tan hazırlanır (scripts/uret.mjs). */
(function () {
  "use strict";
  const SURUM = "6.5";
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
      ARA = a.map(([ad, s, j, lat, lng, k, f, p, ae, one]) => { const en = ae || adEn(ad); return [sade(ad), ad, s, j, lat, lng, k, f, p || 0, en, sade(en), one ? 1 : 0]; });
      if (view && view.mode === "tema") renderTema();
      if (view && view.mode === "rota") renderRota();
      if (view && view.mode === "kacamak") renderKacamak();
      if (!$("listem").hidden) renderFav();
      if (!$("home").hidden && $("search").value.trim().length >= 2) renderHome();
    }).catch(() => { araSoz = null; });
    return araSoz;
  }

  // ---------- durum ----------
  let me = null, watchId = null, konumBekleyen = [];
  let view = { mode: "home" };
  let places = [], cat = "hepsi", sortMode = "oner", shown = 60;
  let map = null, layer = null, meMarker = null, fitted = false, kanvas = null;
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
    else if (view && view.mode === "kacamak") renderKacamak();
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
      if (hemen && view && view.mode === "kacamak") renderKacamak();
      if (hemen && view && view.mode === "cark") carkKonum();
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
    $("yol").hidden = v !== "yol";
    for (const x of ["plist", "kacamak", "kartlar", "oyun", "cark"]) $(x).hidden = v !== x;
    $("ataturk").hidden = v !== "ataturk";
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
      if (h[0] === "ataturk") return await showAtaturk();
      if (h[0] === "rota") return await showRota(h[1], no);
      if (h[0] === "yol") return showYol(h[1], h[2]);
      if (h[0] === "liste") return await showListe(h[1], no);
      if (h[0] === "kacamak") return showKacamak(h[1]);
      if (h[0] === "kartlar") return await showKartlar();
      if (h[0] === "oyun") return await showOyun();
      if (h[0] === "cark") return showCark();
      if (h[0] === "ozet") { history.replaceState(null, "", "#/rozetler"); route(); setTimeout(() => yilOzeti(+h[1] || 0), 600); return; }
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
    $("eyebrow").textContent = selam(); $("title").textContent = T("Nereye gidiyorsun?");
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
    if (view && view.d && view.d.s === p.ilS) ilDamga(view.d);
    if (!vardi) {
      const iller = new Set(a.map((x) => x.s)).size;
      const yeni = rozetler().find((r) => r.tamam && !onceki.has(r.ad));
      const yeniIl = a.filter((x) => x.s === p.ilS).length === 1;
      if (hedefKontrol(oncekiIl)) { /* yıllık hedef kutlandı */ }
      else if (yeniIl && IDX && IDX.ilBy.has(p.ilS)) pasAc(p.ilS, true, yeni);
      else if (yeni) rozetKutla(yeni);
      else toast(TL(`Harika! Gezdiğin il: ${iller}/81 · Gittiğin yer: ${a.length}`, `Great! Provinces visited: ${iller}/81 · Places: ${a.length}`));
    }
  }
  function gitBtn(p) {
    const on = gittimMi(p), b = $("dGit");
    b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); b.querySelector("span").textContent = on ? T("Gittim") : T("Buraya gittim");
    notSatir(p);
  }
  function renderGez() {
    renderSevdik();
    const a = gittiklerim();
    $("gezSec").hidden = false; renderHarita(); renderRozet(); renderHedef(); renderPasaport();
    $("gezBtn").hidden = $("karneBtn").hidden = !a.length; ozetBtn();
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
    konfeti();
  }
  function renderRozet() {
    const R = rozetler(), k = R.filter((r) => r.tamam).length;
    $("rozetSay").textContent = `${k} / ${R.length}`;
    $("rozetList").innerHTML = R.sort((x, y) => (y.tamam - x.tamam) || (y.n / y.hedef - x.n / x.hedef)).map((r) =>
      `<li class="rozet${r.tamam ? " on" : ""}" title="${esc(r.acik)}"><i>${ik(r.ikon, 26)}</i><b>${esc(r.ad)}</b><small>${r.tamam ? T("Kazandın") : `${r.n}/${r.hedef}`}</small><span class="rbar"><span style="width:${Math.round((r.n / r.hedef) * 100)}%"></span></span></li>`).join("");
  }
  // ---------- gezi pasaportu: gidilen her il için bir damga ----------
  const DAMGA_RENK = { "Marmara": "#2c4fa3", "Ege": "#0b7a83", "Akdeniz": "#c4441b", "İç Anadolu": "#8b5a24", "Karadeniz": "#2f7a35", "Doğu Anadolu": "#6b3fa0", "Güneydoğu": "#b3243c" };
  const IL_BOLGE = new Map(Object.entries(BOLGE).flatMap(([b, l]) => l.split(" ").map((s) => [s, b])));
  const tarihYaz = (t, ay) => new Date(t).toLocaleDateString(DIL === "en" ? "en-GB" : "tr-TR", { day: "numeric", month: ay || "long", year: "numeric" });
  // Her il için ilk ziyaret tarihi ve gidilen yer sayısı
  function damgalar() {
    const m = new Map();
    for (const x of gittiklerim()) {
      const d = m.get(x.s) || { t: Infinity, n: 0 };
      d.n++; if (x.t && x.t < d.t) d.t = x.t;
      m.set(x.s, d);
    }
    for (const d of m.values()) if (d.t === Infinity) d.t = null;
    return m;
  }
  // Damga çizimi (SVG): bölge rengi, ilin adı, plaka, ilk ziyaret tarihi; mürekkep dokusu SVG filtresiyle
  function damgaSvg(s, t, font) {
    const il = IDX.ilBy.get(s), r = DAMGA_RENK[IL_BOLGE.get(s)] || DAMGA_RENK.Marmara, no = +il.plaka || 1;
    const don = ((no * 37) % 13) - 6, ad = il.ad.toLocaleUpperCase("tr"), id = "dm" + s;
    const gun = t ? tarihYaz(t, "short").toLocaleUpperCase(DIL === "en" ? "en" : "tr") : "";
    const ff = font ? ` font-family="${font}"` : "";
    return `<svg class="damga" viewBox="0 0 240 240" width="240" height="240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(il.ad)}" style="transform:rotate(${don}deg)">
      <defs><filter id="${id}f" x="-4%" y="-4%" width="108%" height="108%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="${no}" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3 0 0 0 2.75" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>
      <path id="${id}u" d="M 40 120 A 80 80 0 0 1 200 120"/><path id="${id}a" d="M 31 120 A 89 89 0 0 0 209 120"/></defs>
      <g filter="url(#${id}f)" fill="${r}" stroke="${r}"${ff}>
        <circle cx="120" cy="120" r="113" fill="none" stroke-width="5"/><circle cx="120" cy="120" r="103" fill="none" stroke-width="1.6"/>
        <circle cx="120" cy="120" r="66" fill="none" stroke-width="1.6" stroke-dasharray="3 4"/>
        <text font-size="${ad.length > 11 ? 17 : 20}" font-weight="800" letter-spacing="2.5" stroke="none" text-anchor="middle"><textPath href="#${id}u" startOffset="50%">${esc(ad)}</textPath></text>
        <text font-size="12.5" font-weight="800" letter-spacing="3" stroke="none" text-anchor="middle"><textPath href="#${id}a" startOffset="50%">ROTA CEPTE${t ? " · " + new Date(t).getFullYear() : ""}</textPath></text>
        <text x="120" y="139" font-size="58" font-weight="800" text-anchor="middle" stroke="none">${esc(il.plaka)}</text>
        <text x="120" y="161" font-size="10.5" font-weight="800" letter-spacing="1.2" text-anchor="middle" stroke="none">${esc(gun)}</text>
        <text x="73" y="127" font-size="15" text-anchor="middle" stroke="none">★</text><text x="167" y="127" font-size="15" text-anchor="middle" stroke="none">★</text>
      </g></svg>`;
  }
  // Unvanlar: damga sayısına göre (81 ilin hepsi: Evliya Çelebi)
  const UNVAN = [
    [0, "footprints", TL("Yeni yolcu", "New traveller")], [1, "footprints", TL("Yolcu", "Traveller")], [5, "backpack", TL("Gezgin", "Wanderer")],
    [15, "compass", TL("Kâşif", "Explorer")], [30, "map", TL("Seyyah", "Voyager")], [50, "crown", TL("Usta seyyah", "Master voyager")], [81, "star", "Evliya Çelebi"]
  ];
  function unvanBul(n) {
    let i = 0; while (i + 1 < UNVAN.length && n >= UNVAN[i + 1][0]) i++;
    const [, ikon, ad] = UNVAN[i], sonraki = UNVAN[i + 1];
    return { ikon, ad, sonraki: sonraki ? { ad: sonraki[2], kalan: sonraki[0] - n, oran: (n - UNVAN[i][0]) / (sonraki[0] - UNVAN[i][0]) } : null };
  }
  const ayYil = (t) => new Date(t).toLocaleDateString(DIL === "en" ? "en-GB" : "tr-TR", { month: "short", year: "numeric" }).toLocaleUpperCase(DIL === "en" ? "en" : "tr").replace(".", "");
  // Bölge haritası (pasaport sayfasının filigranı): illerin sınır çizgilerinden kutu hesabı
  const BOLGE_KUTU = new Map();
  function bolgeHarita(b, D) {
    if (!HARITA) return "";
    const l = BOLGE[b].split(" ");
    if (!BOLGE_KUTU.has(b)) {
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      for (const s of l) { const n = (HARITA[s] || "").match(/-?\d+(\.\d+)?/g) || []; for (let i = 0; i + 1 < n.length; i += 2) { const x = +n[i], y = +n[i + 1]; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
      BOLGE_KUTU.set(b, [x0 - 4, y0 - 4, x1 - x0 + 8, y1 - y0 + 8].map((v) => Math.round(v)).join(" "));
    }
    return `<svg class="pyharita" viewBox="${BOLGE_KUTU.get(b)}" aria-hidden="true">${l.map((s) => HARITA[s] ? `<path d="${HARITA[s]}"${D.has(s) ? ' class="on"' : ""}/>` : "").join("")}</svg>`;
  }
  // Sıradaki damga: konum varsa en yakın damgasız il; yoksa tamamlanmaya en yakın bölge; yoksa son gidilen ile en yakın il
  function siradaki(D) {
    const kalan = IDX.iller.filter((i) => !D.has(i.s) && i.lat != null);
    if (!kalan.length) return null;
    const yakin = (o) => kalan.map((i) => [km(o, i), i]).sort((x, y) => x[0] - y[0])[0];
    const bolgeNot = (il) => {
      const b = IL_BOLGE.get(il.s), x = BOLGE[b].split(" "), eksik = x.filter((s) => !D.has(s)).length;
      return eksik === 1 ? TL(`Bu damgayla ${T(b)} sayfan tamamlanır!`, `This stamp completes your ${T(b)} page!`) : eksik <= 3 && x.length - eksik > 0 ? TL(`${T(b)} sayfasını tamamlamana ${eksik} il kaldı.`, `${eksik} provinces left to complete your ${T(b)} page.`) : "";
    };
    if (me) { const [m, il] = yakin(me); return { il, neden: TL(`Sana en yakın damgasız il · ${fmt(m)}`, `Nearest province without a stamp · ${fmt(m)}`), ek: bolgeNot(il) }; }
    const bolge = Object.entries(BOLGE).map(([b, l]) => { const x = l.split(" "); return { b, eksik: x.filter((s) => !D.has(s)), n: x.filter((s) => D.has(s)).length }; })
      .filter((r) => r.eksik.length && r.n && r.eksik.length <= 3).sort((x, y) => x.eksik.length - y.eksik.length)[0];
    const gidilen = gittiklerim().filter((x) => x.t).sort((x, y) => y.t - x.t);
    const son = gidilen.length ? IDX.ilBy.get(gidilen[0].s) : null;
    if (bolge) {
      const merkez = son || IDX.ilBy.get(BOLGE[bolge.b].split(" ").find((s) => D.has(s)));
      const il = bolge.eksik.map((s) => IDX.ilBy.get(s)).filter(Boolean).sort((x, y) => km(merkez, x) - km(merkez, y))[0];
      if (il) return { il, neden: TL(`${T(bolge.b)} sayfasını tamamlamana ${bolge.eksik.length} il kaldı`, `${bolge.eksik.length} more to complete your ${T(bolge.b)} page`), ek: "" };
    }
    let ref = son; if (!ref) { try { ref = IDX.ilBy.get(localStorage.getItem("gezi-son-il") || ""); } catch (e) {} }
    if (ref && !D.has(ref.s)) return { il: ref, neden: TL("En son baktığın il", "The province you viewed last"), ek: bolgeNot(ref) };
    if (ref) { const [m, il] = yakin(ref); return { il, neden: D.size ? TL(`Son gittiğin ${ref.ad} iline ${fmt(m)}`, `${fmt(m)} from ${ref.ad}, where you last went`) : TL(`En son baktığın ${ref.ad} iline ${fmt(m)}`, `${fmt(m)} from ${ref.ad}, which you viewed last`), ek: bolgeNot(il) }; }
    return null;
  }
  function renderPasaport() {
    const D = damgalar(), u = unvanBul(D.size), C = 2 * Math.PI * 52;
    if (!HARITA && !haritaSoz) { haritaSoz = getJSON("tr-harita.json?v=3"); }
    // harita sonradan gelirse sayfalara yalnızca filigranı ekle (gezi haritası da aynı dosyayı bekliyor olabilir)
    if (!HARITA && haritaSoz) haritaSoz.then((h) => {
      HARITA = HARITA || h; const D2 = damgalar(), bl = Object.keys(BOLGE);
      document.querySelectorAll("#pasSayfa .pyaprak").forEach((a, i) => { if (!a.querySelector(".pyharita") && bl[i]) a.insertAdjacentHTML("afterbegin", bolgeHarita(bl[i], D2)); });
    }).catch(() => {});
    // kapak
    $("pasKapak").innerHTML = `<div class="pkust"><small>ROTA CEPTE</small><b>${TL("GEZİ PASAPORTU", "TRAVEL PASSPORT")}</b><small>${TL("TRAVEL PASSPORT", "GEZİ PASAPORTU")}</small></div>
      <div class="pkorta"><svg class="phalka" viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="pkAltin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe3a3"/><stop offset="1" stop-color="#c9953f"/></linearGradient></defs><circle cx="60" cy="60" r="52" class="pz"/><circle cx="60" cy="60" r="52" class="pd" stroke-dasharray="${(C * D.size) / 81} ${C}"/></svg>
        <span class="phsay"><b>${D.size}</b><small>/ 81 ${TL("il", "provinces")}</small></span></div>
      <div class="pkunvan">${ik(u.ikon, 18)}<span><small>${TL("UNVAN", "TITLE")}</small><b>${esc(u.ad)}</b></span></div>
      ${u.sonraki ? `<p class="pksonraki">${esc(TL(`${u.sonraki.ad} unvanına ${u.sonraki.kalan} damga kaldı`, `${u.sonraki.kalan} more stamp${u.sonraki.kalan === 1 ? "" : "s"} to become ${u.sonraki.ad}`))}</p><span class="pkbar"><i style="width:${Math.max(4, Math.round(u.sonraki.oran * 100))}%"></i></span>` : `<p class="pksonraki">${TL("81 ilin hepsini gezdin. Sen bir Evliya Çelebi'sin!", "You've visited all 81 provinces. A true Evliya Çelebi!")}</p>`}`;
    // bölge sekmeleri ve sayfalar
    const B = Object.entries(BOLGE);
    $("pasBolge").innerHTML = B.map(([b, l], i) => {
      const x = l.split(" "), n = x.filter((s) => D.has(s)).length;
      return `<button class="pbolge${n === x.length ? " tam" : ""}" data-sayfa="${i}" style="--d:${DAMGA_RENK[b]}" role="tab" aria-selected="${i === 0}">${n === x.length ? ik("check", 13) : "<i></i>"}${esc(T(b))} <b>${n}/${x.length}</b></button>`;
    }).join("");
    $("pasSayfa").innerHTML = B.map(([b, l], i) => {
      const x = l.split(" ").map((s) => IDX.ilBy.get(s)).filter(Boolean).sort((p, q) => (+p.plaka) - (+q.plaka)), n = x.filter((il) => D.has(il.s)).length, tam = n === x.length;
      return `<article class="pyaprak" style="--d:${DAMGA_RENK[b]}" aria-label="${esc(T(b))}">${bolgeHarita(b, D)}
        <div class="pyust"><span>${TL("SAYFA", "PAGE")} ${i + 1}</span><b>${esc(T(b).toLocaleUpperCase(DIL === "en" ? "en" : "tr"))}</b><em>${n}/${x.length}</em></div>
        <ol class="pyizgara">${x.map((il) => {
          const d = D.get(il.s), no = +il.plaka || 1, r = ((no * 37) % 13) - 6;
          return d ? `<li><button class="pslot on" data-pas="${il.s}" style="--r:${r}deg" aria-label="${esc(il.ad)} · ${T("damga var")}"><span class="pmini"><b>${esc(il.plaka)}</b>${d.t ? `<small>${esc(ayYil(d.t))}</small>` : ""}</span><em>${esc(il.ad)}</em></button></li>`
            : `<li><button class="pslot" data-go="#/il/${il.s}" aria-label="${esc(il.ad)}"><span class="pmini"><b>${esc(il.plaka)}</b></span><em>${esc(il.ad)}</em></button></li>`;
        }).join("")}</ol>
        <div class="pyalt">${tam ? `<span class="pmuhur">${ik("check", 16)} ${TL("SAYFA TAMAM", "PAGE COMPLETE")}</span>` : `<small>${n ? TL(`Bu sayfayı tamamlamana ${x.length - n} il kaldı`, `${x.length - n} more to complete this page`) : TL("Bu sayfa ilk damganı bekliyor", "This page is waiting for its first stamp")}</small>`}</div>
      </article>`;
    }).join("");
    // sıradaki damga
    const sr = siradaki(D);
    $("pasSira").innerHTML = sr ? `<button class="psira" data-go="#/il/${sr.il.s}">${thumb(sr.il.f, "s", 250)}<span class="rt"><small>${D.size ? TL("Sıradaki damgan", "Your next stamp") : TL("İlk damgan", "Your first stamp")}</small><b>${esc(sr.il.ad)}</b><span>${esc(sr.neden)}${sr.ek ? " · " + esc(sr.ek) : ""}</span></span>${ik("chevron-right", 18)}</button>` : "";
    $("pasPay").hidden = !D.size;
    pasSekme();
  }
  // Kaydırınca etkin bölge sekmesi değişsin
  // Bir sayfanın kaydırma adımı (sayfa genişliği + aradaki boşluk)
  const pasAdim = (k) => (k.children[1] ? k.children[1].offsetLeft - k.children[0].offsetLeft : k.clientWidth) || 1;
  function pasSekme() {
    const k = $("pasSayfa"), i = Math.round(k.scrollLeft / pasAdim(k));
    document.querySelectorAll("#pasBolge [data-sayfa]").forEach((b) => {
      b.setAttribute("aria-selected", +b.dataset.sayfa === i);
      // seçili sekme görünür kalsın
      if (+b.dataset.sayfa === i) { const t = b.parentElement, x = b.offsetLeft - t.offsetLeft; if (x < t.scrollLeft + 16 || x + b.offsetWidth > t.scrollLeft + t.clientWidth - 16) t.scrollTo({ left: x - 16, behavior: "smooth" }); }
    });
  }
  // Ana sayfada küçük pasaport özeti (en az bir damga varsa)
  function renderPasOzet() {
    const k = $("pasOzet"); if (!k || !IDX) return;
    const D = damgalar(); if (!D.size) { k.hidden = true; return; }
    const u = unvanBul(D.size), sr = siradaki(D);
    k.innerHTML = `<button class="pozet" data-go="#/rozetler"><span class="pozik">${ik("stamp", 22)}</span><span class="rt"><small>${TL("Gezi pasaportun", "Your travel passport")} · ${esc(u.ad)}</small><b>${TL(`${D.size} / 81 il damgası`, `${D.size} / 81 province stamps`)}</b>${sr ? `<span>${esc(TL(`Sıradaki: ${sr.il.ad}`, `Next: ${sr.il.ad}`))} · ${esc(sr.neden)}</span>` : ""}</span>${ik("chevron-right", 18)}</button>`;
    k.hidden = false;
  }
  // İl sayfasında bu ilin damgası
  function ilDamga(d) {
    const k = $("ilDamga"); if (!k || !d || !IDX || !IDX.ilBy.has(d.s)) return;
    const il = IDX.ilBy.get(d.s), x = damgalar().get(d.s), no = +il.plaka || 1;
    k.style.setProperty("--d", DAMGA_RENK[IL_BOLGE.get(d.s)] || "#888"); k.style.setProperty("--r", ((no * 37) % 13) - 6 + "deg");
    k.classList.toggle("on", !!x);
    k.innerHTML = `<span class="pmini"><b>${esc(il.plaka)}</b>${x && x.t ? `<small>${esc(ayYil(x.t))}</small>` : ""}</span><span class="rt"><b>${x ? TL(`${il.ad} damgası pasaportunda`, `${il.ad} stamp collected`) : TL(`${il.ad} damgası seni bekliyor`, `The ${il.ad} stamp is waiting for you`)}</b><small>${x ? TL(`${x.n} yere gittin · büyütmek için dokun`, `${x.n} place${x.n === 1 ? "" : "s"} visited · tap to open`) : TL("Bu ilde bir yerin sayfasında \"Buraya gittim\" de, damga pasaportuna basılsın.", "Tap \"I've been here\" on any place in this province to get the stamp.")}</small></span>${x ? ik("chevron-right", 18) : ""}`;
    k.hidden = false;
  }
  // Tüm pasaportu tek görselde paylaş (hikâye boyutu)
  async function pasaportPaylas() {
    const D = damgalar(), u = unvanBul(D.size);
    try { await document.fonts.load("800 40px Manrope", "Rota ĞğŞşİıÇçÖöÜü"); await document.fonts.load("600 30px Manrope", "Rota ĞğŞşİıÇçÖöÜü"); } catch (e) {}
    const W = 1080, H = 1920, c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"), F = (w, px) => `${w} ${px}px Manrope, system-ui, sans-serif`;
    // kapak rengi üst bant ve krem sayfa
    const gr = g.createLinearGradient(0, 0, W, 420); gr.addColorStop(0, "#6d1424"); gr.addColorStop(1, "#4a0c18");
    g.fillStyle = "#f7f0e3"; g.fillRect(0, 0, W, H);
    g.fillStyle = gr; g.fillRect(0, 0, W, 430);
    g.strokeStyle = "rgba(240,207,134,.55)"; g.lineWidth = 3; g.strokeRect(28, 28, W - 56, 374);
    g.textAlign = "center"; g.fillStyle = "#f0cf86";
    g.font = F(700, 28); try { g.letterSpacing = "6px"; } catch (e) {} g.fillText("ROTA CEPTE", W / 2, 96); try { g.letterSpacing = "0px"; } catch (e) {}
    g.font = F(800, 64); g.fillText(TL("GEZİ PASAPORTUM", "MY TRAVEL PASSPORT"), W / 2, 178);
    g.font = F(800, 120); g.fillText(`${D.size}`, W / 2 - 70, 320); g.font = F(700, 44); g.textAlign = "left"; g.fillText(`/ 81 ${TL("il", "provinces")}`, W / 2 - 10, 318);
    g.textAlign = "center"; g.font = F(700, 34); g.fillText(TL(`Unvan: ${u.ad}`, `Title: ${u.ad}`), W / 2, 380);
    // 81 damga yuvası: plakaya göre 9x9
    const iller = IDX.iller.slice().sort((a, b) => (+a.plaka) - (+b.plaka)), hc = 108, x0 = (W - hc * 9) / 2 + hc / 2, y0 = 520;
    iller.forEach((il, i) => {
      const x = x0 + (i % 9) * hc, y = y0 + Math.floor(i / 9) * (hc + 6), d = D.get(il.s), renk = DAMGA_RENK[IL_BOLGE.get(il.s)] || "#888", no = +il.plaka || 1;
      g.save(); g.translate(x, y);
      if (d) {
        g.rotate((((no * 37) % 13) - 6) * Math.PI / 180); g.strokeStyle = g.fillStyle = renk; g.globalAlpha = 0.92;
        g.lineWidth = 5; g.beginPath(); g.arc(0, 0, 44, 0, Math.PI * 2); g.stroke();
        g.lineWidth = 2; g.beginPath(); g.arc(0, 0, 36, 0, Math.PI * 2); g.stroke();
        g.font = F(800, 34); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(il.plaka, 0, 2);
        // mürekkep dokusu
        let t = no * 7919; const rnd = () => ((t = (t * 16807) % 2147483647) / 2147483647);
        g.globalCompositeOperation = "destination-out"; g.globalAlpha = 1;
        for (let k = 0; k < 90; k++) { const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * 47; g.globalAlpha = 0.3 + rnd() * 0.6; g.beginPath(); g.arc(Math.cos(a) * r, Math.sin(a) * r, 0.5 + rnd() * 1.6, 0, Math.PI * 2); g.fill(); }
      } else {
        g.strokeStyle = "rgba(120,90,60,.35)"; g.setLineDash([6, 7]); g.lineWidth = 2.5; g.beginPath(); g.arc(0, 0, 40, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);
        g.fillStyle = "rgba(120,90,60,.45)"; g.font = F(700, 28); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(il.plaka, 0, 2);
      }
      g.restore();
    });
    g.globalCompositeOperation = "source-over"; g.globalAlpha = 1; g.textBaseline = "alphabetic";
    // bölgeler
    let y = y0 + 9 * (hc + 6) + 20;
    g.textAlign = "left"; g.font = F(700, 30);
    Object.entries(BOLGE).forEach(([b, l], i) => {
      const x = l.split(" "), n = x.filter((s) => D.has(s)).length, cx = 90 + (i % 2) * 470, cy = y + Math.floor(i / 2) * 52;
      g.fillStyle = DAMGA_RENK[b]; g.beginPath(); g.arc(cx, cy - 10, 11, 0, Math.PI * 2); g.fill();
      g.fillStyle = "#3b2e25"; g.fillText(`${T(b)}  ${n}/${x.length}${n === x.length ? " ✓" : ""}`, cx + 24, cy);
    });
    g.textAlign = "center"; g.fillStyle = "#c4441b"; sigdir(g, T("Yol senin, rotan cepte!"), W / 2, H - 110, W - 160, (px) => F(800, px), 46);
    g.fillStyle = "#5b4636"; g.font = F(600, 30); g.fillText("Rota Cepte · me7rt.github.io/Rota-Cepte", W / 2, H - 60);
    gorselPaylas(c.toDataURL("image/png"), "gezi-pasaportum.png", TL(`Gezi pasaportumda ${D.size} / 81 il damgası var, unvanım: ${u.ad}! Sen kaç il gezdin? Rota Cepte: https://me7rt.github.io/Rota-Cepte/`, `I've collected ${D.size} of 81 province stamps in my travel passport (${u.ad})! How many have you? Rota Cepte: https://me7rt.github.io/Rota-Cepte/`));
  }
  // Paylaşılan görsel için damgayı tuvale çiz (SVG resmi içinde yazı tipi geç yüklendiği için yazılar kayboluyordu)
  function damgaCiz(s, t, R) {
    const il = IDX.ilBy.get(s), renk = DAMGA_RENK[IL_BOLGE.get(s)] || DAMGA_RENK.Marmara, no = +il.plaka || 1, k = R / 113;
    const o = document.createElement("canvas"); o.width = o.height = Math.ceil(244 * k);
    const h = o.getContext("2d"), F = (px) => `800 ${px}px Manrope, system-ui, sans-serif`;
    h.translate(o.width / 2, o.height / 2); h.scale(k, k);
    h.strokeStyle = h.fillStyle = renk; h.textAlign = "center";
    const halka = (r, w, kesik) => { h.beginPath(); h.setLineDash(kesik || []); h.lineWidth = w; h.arc(0, 0, r, 0, Math.PI * 2); h.stroke(); };
    halka(113, 5); halka(103, 1.6); halka(66, 1.6, [3, 4]); h.setLineDash([]);
    const yay = (yazi, r, px, ara, ust) => {
      h.font = F(px); const w = [...yazi].map((c) => h.measureText(c).width + ara), top = w.reduce((a, b) => a + b, 0) - ara;
      let say = 0;
      [...yazi].forEach((c, i) => {
        const a = ust ? -Math.PI / 2 - top / 2 / r + (say + w[i] / 2) / r : Math.PI / 2 + top / 2 / r - (say + w[i] / 2) / r;
        h.save(); h.rotate(ust ? a + Math.PI / 2 : a - Math.PI / 2); h.fillText(c, 0, ust ? -r : r); h.restore();
        say += w[i];
      });
    };
    const ad = il.ad.toLocaleUpperCase("tr");
    yay(ad, 80, ad.length > 11 ? 17 : 20, 2.5, true);
    yay("ROTA CEPTE" + (t ? " · " + new Date(t).getFullYear() : ""), 89, 12.5, 3, false);
    h.font = F(58); h.fillText(il.plaka, 0, 19);
    if (t) { h.font = F(10.5); try { h.letterSpacing = "1.2px"; } catch (e) {} h.fillText(tarihYaz(t, "short").toLocaleUpperCase(DIL === "en" ? "en" : "tr"), 0, 41); try { h.letterSpacing = "0px"; } catch (e) {} }
    h.font = F(15); h.fillText("★", -47, 7); h.fillText("★", 47, 7);
    // mürekkep dokusu: ile özgü (plakaya göre sabit) küçük boşluklar
    let tohum = no * 9301 + 49297; const rnd = () => ((tohum = (tohum * 16807) % 2147483647) / 2147483647);
    h.globalCompositeOperation = "destination-out";
    for (let i = 0; i < 1100; i++) { const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * 118; h.globalAlpha = 0.35 + rnd() * 0.65; h.beginPath(); h.arc(Math.cos(a) * r, Math.sin(a) * r, 0.3 + rnd() * 1.3, 0, Math.PI * 2); h.fill(); }
    return o;
  }
  async function damgaPaylas(s) {
    const il = IDX.ilBy.get(s), D = damgalar(), d = D.get(s); if (!d) return;
    try { await document.fonts.load("800 40px Manrope", "Rota ĞğŞşİıÇçÖöÜü"); } catch (e) {}
    const img = damgaCiz(s, d.t, 370);
    const W = 1080, H = 1350, c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"), F = (w, px) => `${w} ${px}px Manrope, system-ui, sans-serif`;
    g.fillStyle = "#f7f0e3"; g.fillRect(0, 0, W, H);
    // pasaport sayfası çizgileri
    g.strokeStyle = "rgba(120,90,60,.10)"; g.lineWidth = 2;
    for (let y = 120; y < H; y += 48) { g.beginPath(); g.moveTo(60, y); g.lineTo(W - 60, y); g.stroke(); }
    g.strokeStyle = "rgba(120,90,60,.35)"; g.lineWidth = 3; g.strokeRect(36, 36, W - 72, H - 72);
    g.textAlign = "center"; g.fillStyle = "#5b4636"; g.font = F(800, 34);
    g.fillText(TL("GEZİ PASAPORTUM", "MY TRAVEL PASSPORT"), W / 2, 112);
    const don = ((+il.plaka * 37) % 13 - 6) * Math.PI / 180;
    g.save(); g.translate(W / 2, 560); g.rotate(don); g.globalAlpha = 0.92; g.drawImage(img, -img.width / 2, -img.height / 2); g.restore();
    g.fillStyle = "#2a211b"; g.font = F(800, 72); g.fillText(il.ad, W / 2, 1060);
    g.fillStyle = "#5b4636"; g.font = F(600, 36);
    g.fillText(TL(`${d.n} yer gördüm${d.t ? " · " + tarihYaz(d.t) : ""}`, `${d.n} place${d.n === 1 ? "" : "s"} seen${d.t ? " · " + tarihYaz(d.t) : ""}`), W / 2, 1120);
    g.fillText(TL(`Pasaportumda ${D.size} / 81 il damgası var`, `${D.size} of 81 province stamps collected`), W / 2, 1172);
    g.fillStyle = "#c4441b"; sigdir(g, T("Yol senin, rotan cepte!"), W / 2, 1250, W - 140, (px) => F(800, px), 40);
    g.fillStyle = "#5b4636"; g.font = F(600, 28); g.fillText("Rota Cepte · me7rt.github.io/Rota-Cepte", W / 2, 1294);
    gorselPaylas(c.toDataURL("image/png"), `damga-${s}.png`, TL(`${il.ad} damgası pasaportumda! Türkiye'nin ${D.size} ilini gezdim. Rota Cepte: https://me7rt.github.io/Rota-Cepte/`, `${il.ad} stamp collected! I've visited ${D.size} provinces of Türkiye. Rota Cepte: https://me7rt.github.io/Rota-Cepte/`));
  }
  function pasAc(s, yeni, rozet) {
    const il = IDX.ilBy.get(s), d = damgalar().get(s);
    if (!d) { git(`#/il/${s}`); return; }
    const m = document.createElement("div"); m.className = "tanit";
    m.innerHTML = `<div class="tkart pkart${yeni ? " yeni" : ""}"><small>${yeni ? T("Pasaportuna yeni damga!") : T("Gezi pasaportum")}</small><div class="psayfa">${damgaSvg(s, d.t)}</div><h2>${esc(il.ad)}</h2><p>${TL(`${d.n} yere gittin${d.t ? " · ilk ziyaret " + tarihYaz(d.t) : ""}`, `${d.n} place${d.n === 1 ? "" : "s"} visited${d.t ? " · first visit " + tarihYaz(d.t) : ""}`)}</p>${rozet ? `<p class="prozet">${ik(rozet.ikon, 18)} ${T("Yeni rozet")}: <b>${esc(rozet.ad)}</b></p>` : ""}<div class="tbtn"><button class="linkbtn" data-k="kapat">${T("Kapat")}</button><button class="btn primary" data-k="dpay">${ik("share-2", 18)} ${TL("Paylaş", "Share")}</button></div></div>`;
    const kapat = () => { m.classList.add("out"); setTimeout(() => m.remove(), 300); };
    m.addEventListener("click", (e) => {
      if (e.target === m || e.target.closest("[data-k=kapat]")) return kapat();
      if (e.target.closest("[data-k=dpay]")) damgaPaylas(s);
    });
    document.body.appendChild(m);
    if (yeni) setTimeout(konfeti, 380); // damga basılırken
  }
  // ---------- hava durumu ----------
  const HAVA = { 0: ["sun", T("Açık")], 1: ["cloud-sun", T("Az bulutlu")], 2: ["cloud-sun", T("Parçalı bulutlu")], 3: ["cloud", T("Kapalı")], 45: ["cloud-fog", T("Sisli")], 48: ["cloud-fog", T("Sisli")],
    51: ["cloud-drizzle", T("Çisenti")], 53: ["cloud-drizzle", T("Çisenti")], 55: ["cloud-drizzle", T("Çisenti")], 56: ["cloud-rain", T("Dondurucu çisenti")], 57: ["cloud-rain", T("Dondurucu çisenti")],
    61: ["cloud-rain", T("Hafif yağmur")], 63: ["cloud-rain", T("Yağmurlu")], 65: ["cloud-rain", T("Kuvvetli yağmur")], 66: ["cloud-rain", T("Dondurucu yağmur")], 67: ["cloud-rain", T("Dondurucu yağmur")],
    71: ["cloud-snow", T("Hafif kar")], 73: ["cloud-snow", T("Karlı")], 75: ["snowflake", T("Yoğun kar")], 77: ["cloud-snow", T("Kar")], 80: ["cloud-drizzle", T("Sağanak")], 81: ["cloud-rain", T("Sağanak")], 82: ["cloud-lightning", T("Kuvvetli sağanak")],
    85: ["cloud-snow", T("Kar sağanağı")], 86: ["snowflake", T("Kar sağanağı")], 95: ["cloud-lightning", T("Gök gürültülü")], 96: ["cloud-lightning", T("Dolu")], 99: ["cloud-lightning", T("Dolu")] };
  // Anlık hava: il başına 10 dakika saklanır; il sayfası açıkken dakikada bir bakılır, eskiyince yenilenir
  const HAVA_TAZE = 10 * 6e4;
  const havaOnbellek = new Map(); // il -> { d: 3 günlük, c: şu an, t: alındığı an }
  const havaHata = new Map(), havaYuk = new Map(); // son başarısız deneme; süren istek (aynı il için ikinci istek açılmasın)
  let havaSaat = 0, havaIl = null, havaGunH = ""; // dakikalık sayaç, kutusu açık olan il, ekrandaki güneş satırı
  // Sayaç dakika başında döndüğü için 30 sn pay: veri 10. dakikada yenilenir, 11.'yi beklemez
  const havaTaze = (v) => !!v && Date.now() - v.t < HAVA_TAZE - 3e4;
  // Gün doğumu ve batımı: internetsiz hesap (NOAA'nın sadeleştirilmiş güneş denklemi), Türkiye saatiyle
  function gunes(lat, lng, t) {
    const R = Math.PI / 180, J = t / 864e5 + 2440587.5, n = Math.round(J - 2451545 - 0.0009 - (-lng) / 360);
    const Js = 2451545 + 0.0009 + (-lng) / 360 + n, M = (357.5291 + 0.98560028 * (Js - 2451545)) % 360;
    const C = 1.9148 * Math.sin(M * R) + 0.02 * Math.sin(2 * M * R) + 0.0003 * Math.sin(3 * M * R);
    const L = (M + C + 180 + 102.9372) % 360, Jt = Js + 0.0053 * Math.sin(M * R) - 0.0069 * Math.sin(2 * L * R);
    const d = Math.asin(Math.sin(L * R) * Math.sin(23.44 * R));
    const w = Math.acos((Math.sin(-0.833 * R) - Math.sin(lat * R) * Math.sin(d)) / (Math.cos(lat * R) * Math.cos(d))) / R;
    const ms = (j) => (j - 2440587.5) * 864e5;
    return { dogus: ms(Jt - w / 360), batis: ms(Jt + w / 360) };
  }
  const saatYaz = (t) => new Date(t).toLocaleTimeString(DIL === "en" ? "en-GB" : "tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" });
  // Gün batımı için manzaralı yer: tepe, kale, burun, sahil, seyir terası...
  const MANZARA = /seyir|tepe|kalesi|burnu|feneri|sahil|teras|panorama|kordon|yayla|dagi/;
  // Türkiye saatiyle bugünün öğlesi (UTC+3): gece yarısından sonra da bugünün doğuş/batış saatleri hesaplansın
  const ogle = (t) => t - ((t + 108e5) % 864e5) + 432e5;
  // Altın saat (yaklaşık): gün doğumundan sonraki ve gün batımından önceki bir saat. Şu anki ya da sıradaki pencere seçilir.
  function altinSaat(il, simdi) {
    for (let k = 0; k < 2; k++) {
      const g = gunes(il.lat, il.lng, ogle(simdi) + k * 864e5); if (!isFinite(g.batis)) return null;
      for (const [a, b, sabah] of [[g.dogus, g.dogus + 36e5, true], [g.batis - 36e5, g.batis, false]]) if (b > simdi) return { a, b, sabah };
    }
    return null;
  }
  function gunesSatir(d, il) {
    const simdi = Date.now(), g = gunes(il.lat, il.lng, ogle(simdi)); if (!isFinite(g.batis)) return "";
    const kalan = g.batis - simdi, dk = Math.max(1, Math.round(kalan / 6e4)), sa = Math.floor(dk / 60), kd = dk % 60;
    const yer = d && d.yerler && (d.yerler.find((y) => y.one && MANZARA.test(sade(y.ad))) || d.yerler.find((y) => MANZARA.test(sade(y.ad))));
    const not = kalan > 0 && kalan < 3 * 36e5
      ? TL(`Gün batımına ${sa ? sa + " sa " : ""}${kd ? kd + " dk " : ""}var.`, `Sunset in ${[sa ? sa + " h" : "", kd ? kd + " min" : ""].filter(Boolean).join(" ")}.`)
      : "";
    const al = altinSaat(il, simdi);
    const ne = !al ? "" : al.a <= simdi ? TL("Şu an", "Right now") : !al.sabah ? TL("Bu akşam", "This evening") : al.a < ogle(simdi) + 432e5 ? TL("Bu sabah", "This morning") : TL("Yarın sabah", "Tomorrow morning");
    const altin = al ? `<div class="haltin${al.a <= simdi ? " on" : ""}" title="${TL("Yaklaşık değer: gerçek süre mevsime ve enleme göre değişir.", "Approximate: the real duration varies with season and latitude.")}"><i>${ik("camera", 17)}</i><span><span class="hasat"><b>${TL("Altın saat", "Golden hour")}</b><strong>${saatYaz(al.a)} – ${saatYaz(al.b)}</strong></span><small><em>${ne}</em> · ${TL("fotoğraf için en güzel ışık (yaklaşık)", "best light for photos (approx.)")}</small></span></div>` : "";
    return `<div class="gunes"><span>${ik("sunrise", 18)} ${TL("Gün doğumu", "Sunrise")} <b>${saatYaz(g.dogus)}</b></span><span>${ik("sunset", 18)} ${TL("Gün batımı", "Sunset")} <b>${saatYaz(g.batis)}</b></span></div>` + altin +
      (yer ? `<button class="honer gbyer" data-hy="${d.yerler.indexOf(yer)}">${ik("map-pin", 16)} <span>${not ? not + " " : ""}${TL("Gün batımı için güzel bir yer:", "A good spot for sunset:")} <b>${esc(adi(yer))}</b></span>${ik("chevron-right", 16)}</button>` : (not ? `<p class="hnot">${not}</p>` : ""));
  }
  // Havaya göre öneri: yağışta kapalı mekânlar, sıcakta serin yerler, güzel havada doğa
  const KAPALI = /muze|carsi|bedesten|hani|kervansaray|magara|saray|konag|kosk|hamam|kulliye|cami/, SERIN = /selale|magara|golu|gol |yayla|plaj|koy|kanyon|vadi|orman|kaynak/;
  function havaOneri(d, kod, max) {
    if (!d || !d.yerler) return "";
    let baslik, sec, ic = false;
    if (kod >= 51 || kod === 45 || kod === 48) { ic = true; baslik = TL("Bugün hava yağışlı: kapalı mekânlar iyi seçim", "Wet weather today: indoor places are a good pick"); sec = (y) => y.k === "m" || KAPALI.test(sade(y.ad)); }
    else if (max >= 31) { baslik = TL("Bugün sıcak: serin yerlere kaç", "Hot today: head somewhere cool"); sec = (y) => SERIN.test(sade(y.ad) + " "); }
    else if (kod <= 3 && max >= 12) { baslik = TL("Hava gezmeye çok uygun: açık havanın tadını çıkar", "Great weather for exploring: enjoy the outdoors"); sec = (y) => y.k === "d"; }
    else { baslik = TL("Serin bir gün: tarihi yerler ve çarşılar için ideal", "A cool day: ideal for historic sites and bazaars"); sec = (y) => y.k === "t" || y.k === "c" || y.k === "m"; }
    const r = d.yerler.filter((y) => y.f && sec(y)).sort((a, b) => (ic ? (b.k === "m") - (a.k === "m") : 0)).slice(0, 3);
    if (!r.length) return "";
    return `<div class="honerk"><small>${ik("lightbulb", 15)} ${baslik}</small><div class="honerl">${r.map((y) => `<button class="hyer" data-hy="${d.yerler.indexOf(y)}">${thumb(y.f, y.k)}<span>${esc(adi(y))}</span></button>`).join("")}</div></div>`;
  }
  // Kutunun açık olduğu il hâlâ ekranda mı (ilçe sayfasında kutu gizlidir)
  const havaAcik = (s) => !!(view && view.mode === "il" && view.d && view.d.s === s);
  // İnternet yoksa ya da hata olursa elde ne varsa o döner (eski veri, saatiyle); hatadan sonra yaklaşık 2 dakika yeniden denenmez
  function havaGetir(il) {
    const s = il.s, v = havaOnbellek.get(s);
    if (havaTaze(v)) return Promise.resolve(v);
    if (havaYuk.has(s)) return havaYuk.get(s);
    if (Date.now() - (havaHata.get(s) || 0) < 9e4) return Promise.resolve(v || null);
    const p = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${il.lat}&longitude=${il.lng}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FIstanbul&forecast_days=3`)
      .then((r) => { if (!r.ok) throw new Error("hava " + r.status); return r.json(); })
      .then((j) => {
        const g = j && j.daily;
        if (!g || !g.time || !g.weathercode || !g.temperature_2m_max || !g.temperature_2m_min) throw new Error("hava veri");
        const y = { d: j.daily, c: j.current || null, t: Date.now() };
        havaOnbellek.set(s, y); havaHata.delete(s); return y;
      })
      .catch(() => { havaHata.set(s, Date.now()); return v || null; })
      .finally(() => havaYuk.delete(s));
    havaYuk.set(s, p);
    return p;
  }
  // "Şu an" satırı: anlık sıcaklık, durum, hissedilen, rüzgâr ve güncellenme saati
  function havaSimdi(v) {
    const c = v.c; if (!c || c.temperature_2m == null) return "";
    const gece = c.is_day === 0;
    let [hik, ad] = HAVA[c.weather_code] || ["thermometer", ""];
    if (gece) hik = { sun: "moon", "cloud-sun": "cloud-moon" }[hik] || hik;
    const hs = c.apparent_temperature != null ? `<span>${TL("Hissedilen", "Feels like")} ${Math.round(c.apparent_temperature)}°</span>` : "";
    const rz = c.wind_speed_10m != null ? `<span title="${TL("Rüzgâr", "Wind")}">${ik("wind", 15)}<span class="hgizli">${TL("Rüzgâr", "Wind")}</span> ${Math.round(c.wind_speed_10m)} ${TL("km/sa", "km/h")}</span>` : "";
    return `<div class="hsimdi${gece ? " gece" : ""}"><div class="hsust"><span class="hcanli"><i></i>${TL("Şu an", "Now")}</span><small>${TL("Güncellendi", "Updated")} ${saatYaz(v.t)}</small></div>` +
      `<i class="hsik">${ik(hik, 40)}</i><b class="hsder">${Math.round(c.temperature_2m)}°</b><span class="hsyaz"><b>${ad}</b>${hs || rz ? `<small>${hs}${rz}</small>` : ""}</span></div>`;
  }
  // Kutuyu yeniden yazarken klavye odağı kaybolmasın
  function havaYaz(el, html) {
    const o = document.activeElement, hy = o && el.contains(o) && o.dataset ? o.dataset.hy : null;
    el.innerHTML = html;
    if (hy != null) { const b = el.querySelector(`[data-hy="${hy}"]`); if (b) b.focus(); }
  }
  function havaCiz(il, v) {
    const kutu = $("hava"), gun = gunesSatir(view.d, il), gunK = gun ? `<div class="hgunes">${gun}</div>` : "";
    havaGunH = gun;
    if (!v) { havaYaz(kutu, gunK); kutu.hidden = !gunK; return; }
    const d = v.d, gunler = [T("Bugün"), T("Yarın")];
    let html;
    try {
      html = `<small>${TL(esc(il.ad) + " hava durumu", "Weather in " + esc(il.ad))}</small>` + havaSimdi(v) + `<div class="hgun">` + d.time.map((t, i) => {
        const [hik, ad] = HAVA[d.weathercode[i]] || ["thermometer", ""];
        const g = gunler[i] || new Date(t + "T12:00").toLocaleDateString(DIL === "en" ? "en-GB" : "tr-TR", { weekday: "long" });
        return `<span><em>${g}</em><i>${ik(hik, 28)}</i><b>${Math.round(d.temperature_2m_max[i])}° <small>${Math.round(d.temperature_2m_min[i])}°</small></b><small>${ad}</small></span>`;
      }).join("") + `</div>` + havaOneri(view.d, d.weathercode[0], d.temperature_2m_max[0]) + gunK + `<a class="hkaynak" href="https://open-meteo.com/" target="_blank" rel="noopener">${TL("Hava durumu verisi: Open-Meteo.com", "Weather data by Open-Meteo.com")}</a>`;
    } catch (e) { return; } // beklenmedik veri: ekrandaki kutu olduğu gibi kalır
    havaYaz(kutu, html);
    kutu.hidden = false;
  }
  // Dakikalık bakım: gün batımı sayacı ve altın saat yeniden yazılır (internetsiz), veri eskidiyse yenisi çekilir
  function havaTazele(il) {
    const b = $("hava").querySelector(".hgunes");
    if (b) { const h = gunesSatir(view.d, il); if (h !== havaGunH) { havaYaz(b, h); havaGunH = h; } }
    const v = havaOnbellek.get(il.s);
    if (havaTaze(v) || havaYuk.has(il.s)) return;
    havaGetir(il).then((y) => { if (y && y !== v && havaAcik(il.s)) havaCiz(il, y); });
  }
  // Tek sayaç: her dakika başında çalışır; il sayfasından çıkılınca kendini durdurur, başka il açılınca sıfırlanır
  function havaSayac(il) {
    clearTimeout(havaSaat); havaIl = il;
    const sonraki = () => 60500 - (Date.now() % 6e4);
    const tik = () => {
      if (!havaAcik(il.s)) { havaSaat = 0; havaIl = null; return; }
      havaSaat = setTimeout(tik, sonraki());
      if (!document.hidden) havaTazele(il);
    };
    havaSaat = setTimeout(tik, sonraki());
  }
  // Uygulamaya geri dönünce (ya da internet gelince) beklemeden tazele
  function havaDon() { if (havaIl && !document.hidden && havaAcik(havaIl.s)) havaTazele(havaIl); }
  document.addEventListener("visibilitychange", havaDon);
  window.addEventListener("online", () => { havaHata.clear(); havaDon(); });
  // CapApp aşağıda tanımlanıyor; burada henüz kullanılamadığı için eklenti doğrudan alınır
  const havaUyg = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
  if (havaUyg && havaUyg.addListener) havaUyg.addListener("resume", havaDon);
  async function havaGoster(il) {
    const kutu = $("hava"); kutu.hidden = true; kutu.innerHTML = "";
    clearTimeout(havaSaat); havaSaat = 0; havaIl = null;
    if (!il || il.lat == null) return;
    const s = il.s;
    if (!havaAcik(s)) return;
    // Önce elde olanı göster (gün doğumu/batımı hemen, son veri varsa o da), sonra gerekirse yenisini çek
    havaCiz(il, havaOnbellek.get(s) || null);
    havaSayac(il);
    const v = havaOnbellek.get(s);
    if (havaTaze(v)) return;
    const y = await havaGetir(il);
    if (y && y !== v && havaAcik(s)) havaCiz(il, y);
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
  // ---------- Atatürk'ün izinde: Çanakkale'den Anıtkabir'e, tarih sırasıyla ----------
  // [il, yerin verideki adı, tarih [tr, en], başlık [tr, en], kısa bilgi [tr, en]]
  const ATA = [
    ["canakkale", "57. Alay Şehitliği", ["25 Nisan 1915", "25 April 1915"], ["Çanakkale Cephesi", "The Gallipoli front"],
      ["Conkbayırı'nda Yarbay Mustafa Kemal, 57. Alay'a “Ben size taarruzu emretmiyorum, ölmeyi emrediyorum” dedi. Çanakkale geçilmez oldu.", "At Conkbayırı, Lt. Col. Mustafa Kemal told the 57th Regiment: “I don't order you to attack, I order you to die.” The straits held."]],
    ["samsun", "Bandırma Vapuru", ["19 Mayıs 1919", "19 May 1919"], ["Samsun'a çıkış", "Landing at Samsun"],
      ["Mustafa Kemal, Bandırma Vapuru ile Samsun'a çıktı ve Millî Mücadele başladı. Bugün vapurun aslına uygun bir kopyası müze olarak geziliyor.", "Mustafa Kemal landed at Samsun aboard the Bandırma and the War of Independence began. A faithful replica of the ship is now a museum."]],
    ["samsun", "Gazi Müzesi", ["Mayıs 1919", "May 1919"], ["İlk karargâh", "The first headquarters"],
      ["Samsun'a çıktığında kaldığı eski Mıntıka Palas Oteli. Kaldığı oda ve eşyaları korunuyor.", "The former Mıntıka Palas hotel where he stayed after landing at Samsun. His room and belongings are preserved."]],
    ["sivas", "Sivas Atatürk ve Kongre Müzesi", ["4-11 Eylül 1919", "4-11 September 1919"], ["Sivas Kongresi", "The Sivas Congress"],
      ["Millî Mücadele'nin yol haritasını çizen Sivas Kongresi bu binada toplandı. Atatürk'ün çalışma odası ve yatak odası korunuyor.", "The Sivas Congress, which set the course of the national struggle, met in this building. His study and bedroom are preserved."]],
    ["ankara", "Kurtuluş Savaşı Müzesi", ["23 Nisan 1920", "23 April 1920"], ["Birinci Meclis", "The first Grand National Assembly"],
      ["Türkiye Büyük Millet Meclisi 23 Nisan 1920'de bu binada açıldı. Cumhuriyet de 29 Ekim 1923'te bu binada ilan edildi.", "The Grand National Assembly opened in this building on 23 April 1920, and the Republic was proclaimed here on 29 October 1923."]],
    ["ankara", "Atatürk Konutu ve Demiryolları Müzesi", ["1920-1921", "1920-1921"], ["Ankara'daki ilk evi", "His first home in Ankara"],
      ["Millî Mücadele'nin ilk yıllarında Ankara'da kaldığı istasyon binası. Sade odaları bugün de korunuyor.", "The railway station building where he lived in the first years of the struggle. His simple rooms are preserved."]],
    ["ankara", "Alagöz Karargâh Müzesi", ["Ağustos-Eylül 1921", "August-September 1921"], ["Sakarya Meydan Muharebesi", "The Battle of Sakarya"],
      ["Sakarya Meydan Muharebesi'nde Başkomutan Mustafa Kemal'in karargâh olarak kullandığı köy evi.", "The village house that served as Commander-in-Chief Mustafa Kemal's headquarters during the Battle of Sakarya."]],
    ["kastamonu", "Atatürk ve Şerife Bacı Anıtı", ["1921", "1921"], ["Cepheye cephane taşıyanlar", "Carrying ammunition to the front"],
      ["İnebolu'dan cepheye cephane taşırken donarak şehit düşen Şerife Bacı'nın ve Millî Mücadele'nin kadın kahramanlarının anısına.", "In memory of Şerife Bacı, who froze to death carrying ammunition from İnebolu to the front, and of the women heroes of the struggle."]],
    ["konya", "Batı Cephesi Karargahı Müzesi", ["1922", "1922"], ["Büyük Taarruz'a hazırlık", "Preparing the Great Offensive"],
      ["Akşehir'deki bu bina, Büyük Taarruz'un hazırlandığı Batı Cephesi karargâhıydı.", "This building in Akşehir was the Western Front headquarters where the Great Offensive was prepared."]],
    ["afyonkarahisar", "Büyük Taarruz Şehitliği", ["26 Ağustos 1922", "26 August 1922"], ["Büyük Taarruz", "The Great Offensive"],
      ["Büyük Taarruz 26 Ağustos sabahı Kocatepe'den başladı. Şehitlik, bu zafer için canını verenleri anıyor.", "The Great Offensive began at dawn on 26 August from Kocatepe. This memorial honours those who gave their lives for the victory."]],
    ["kutahya", "Dumlupınar Şehitliği", ["30 Ağustos 1922", "30 August 1922"], ["Başkomutanlık Meydan Muharebesi", "The Battle of Dumlupınar"],
      ["30 Ağustos'ta Dumlupınar'da kazanılan zafer her yıl Zafer Bayramı olarak kutlanıyor. Şehitlik ve Meçhul Asker Anıtı burada.", "The victory won at Dumlupınar on 30 August is celebrated every year as Victory Day. The memorial and the Unknown Soldier monument stand here."]],
    ["izmir", "İzmir Atatürk Müzesi", ["9 Eylül 1922", "9 September 1922"], ["İzmir'in kurtuluşu", "The liberation of İzmir"],
      ["Ordumuz 9 Eylül'de İzmir'e girdi. Atatürk'ün sonraki İzmir ziyaretlerinde kaldığı ev bugün müze.", "The army entered İzmir on 9 September. The house where Atatürk later stayed on his visits is now a museum."]],
    ["bursa", "Mudanya Mütareke Evi", ["11 Ekim 1922", "11 October 1922"], ["Mudanya Ateşkesi", "The Armistice of Mudanya"],
      ["Kurtuluş Savaşı'nın silahlı dönemini bitiren Mudanya Ateşkes Antlaşması bu evde imzalandı.", "The Armistice of Mudanya, which ended the armed phase of the War of Independence, was signed in this house."]],
    ["ankara", "Cumhuriyet Müzesi", ["15-20 Ekim 1927", "15-20 October 1927"], ["Nutuk", "The Great Speech"],
      ["İkinci Meclis binası. Atatürk, Millî Mücadele'yi anlattığı Nutuk'u 1927'de burada altı gün boyunca okudu.", "The second parliament building, where Atatürk delivered his Great Speech (Nutuk) over six days in 1927."]],
    ["istanbul", "Dolmabahçe Sarayı", ["10 Kasım 1938", "10 November 1938"], ["Saat 09.05", "09:05"],
      ["Atatürk, 10 Kasım 1938 sabahı saat 09.05'te Dolmabahçe Sarayı'nda hayata gözlerini yumdu. Her yıl o saatte bütün Türkiye saygı duruşunda bulunur.", "Atatürk passed away at 09:05 on 10 November 1938 in Dolmabahçe Palace. Every year at that minute, all of Türkiye stands in silence."]],
    ["ankara", "Anıtkabir", ["10 Kasım 1953", "10 November 1953"], ["Ebedî istirahatgâhı", "His eternal resting place"],
      ["Atatürk'ün naaşı 10 Kasım 1953'te Anıtkabir'e taşındı. Türkiye'nin her köşesinden gelenlerin ziyaret ettiği yer.", "Atatürk's remains were moved to Anıtkabir on 10 November 1953. People from every corner of Türkiye come to pay their respects."]]
  ];
  // Evleri ve köşkleri: [il, yerin verideki adı, kısa bilgi [tr, en] (boşsa genel cümle)]
  const ATA_EV = [
    ["ankara", "Atatürk Müze Köşkü", ["1921'de taşındığı Çankaya'daki bağ evi. Bugün Müze Köşk.", "The vineyard house in Çankaya he moved into in 1921, now a museum."]],
    ["yalova", "Yürüyen Köşk", ["Bir çınarın dalı köşke zarar verince Atatürk ağacı kestirmek yerine köşkü raylar üzerinde kaydırttı. Adı buradan geliyor.", "When a plane tree's branch threatened the house, Atatürk had the building moved on rails instead of cutting the tree. Hence the name."]],
    ["istanbul", "Florya Atatürk Deniz Köşkü", ["Atatürk'ün yaz günlerini geçirdiği, deniz üstüne kurulu köşk.", "The mansion built over the sea where Atatürk spent summer days."]],
    ["istanbul", "Atatürk Müzesi", ["Şişli'de annesi ve kız kardeşiyle kaldığı ev.", "The house in Şişli where he lived with his mother and sister."]],
    ["trabzon", "Atatürk Köşkü", ["Trabzonluların Atatürk'e armağan ettiği köşk.", "The mansion the people of Trabzon gave to Atatürk."]],
    ["yalova", "Yalova Atatürk Köşkü", ["", ""]], ["ankara", "Ankara Atatürk Evi Müzesi", ["", ""]], ["afyonkarahisar", "Şuhut Atatürk Evi", ["", ""]],
    ["adana", "Adana Atatürk Evi Müzesi", ["", ""]], ["antalya", "Antalya Atatürk Müzesi", ["", ""]], ["bursa", "Bursa Atatürk Müzesi", ["", ""]],
    ["kayseri", "Atatürk Evi Müzesi", ["", ""]], ["konya", "Atatürk Evi Müzesi", ["", ""]], ["mersin", "Mersin Atatürk Evi", ["", ""]],
    ["mersin", "Silifke Atatürk Evi", ["", ""]], ["rize", "Rize Atatürk Evi Müzesi", ["", ""]], ["giresun", "Şebinkarahisar Atatürk Evi Müzesi", ["", ""]],
    ["balikesir", "Karesi Atatürk Evi", ["", ""]], ["gaziantep", "Atatürk Anı Müzesi", ["", ""]], ["denizli", "Atatürk ve Etnografya Müzesi", ["", ""]]
  ];
  // Türk bayrağı (ay yıldız, bayrak kanunundaki oranlarla)
  const BAYRAK = `<svg class="atbayrak" viewBox="0 -30000 90000 60000" aria-hidden="true"><path fill="#e30a17" d="M0-30000h90000v60000H0z"/><path fill="#fff" d="m41750 0 13568-4408-8386 11541V-7133l8386 11541zm925 8021a15000 15000 0 1 1 0-16042 12000 12000 0 1 0 0 16042z"/></svg>`;
  async function showAtaturk() {
    view = { mode: "ataturk" }; show("ataturk");
    $("eyebrow").textContent = TL("Millî Mücadele rotası", "Independence route"); $("title").textContent = TL("Atatürk'ün izinde", "In Atatürk's footsteps");
    renderAtaturk();
    await loadAra(); renderAtaturk();
  }
  function renderAtaturk() {
    if (!view || view.mode !== "ataturk") return;
    const bul = (s, ad) => (ARA ? ARA.find((x) => x[2] === s && x[1] === ad) : null);
    const gidilen = new Set(gittiklerim().map((x) => x.s + "|" + x.ad));
    const ilAd = (s) => { const i = IDX.ilBy.get(s); return i ? i.ad : s; };
    const yerAd = (x, ad) => (x ? araAd(x) : ad);
    const uzak = (x) => (me && x ? " · " + fmt(km(me, { lat: x[4], lng: x[5] })) : "");
    const durak = ATA.map((a) => ({ a, x: bul(a[0], a[1]) })).filter((d) => d.x || !ARA);
    const ok = durak.filter((d) => gidilen.has(d.a[0] + "|" + d.a[1])).length;
    const kart = (x, s) => (x ? `data-yer="${x[2]}|${x[3]}"` : `data-go="#/il/${s}"`);
    $("ataturk").innerHTML = `<section class="athero">${BAYRAK}
      <h2>${TL("1915'ten Anıtkabir'e", "From 1915 to Anıtkabir")}</h2>
      <p>${TL("Çanakkale'den Samsun'a, Sivas'tan Ankara'ya: Millî Mücadele'nin ve Cumhuriyet'in yazıldığı yerleri tarih sırasıyla gez.", "From Çanakkale to Samsun, from Sivas to Ankara: visit the places where the War of Independence and the Republic were written, in order.")}</p>
      <div class="atsay"><b>${TL(`${ok} / ${durak.length} durak`, `${ok} / ${durak.length} stops`)}</b><span class="bar"><i style="width:${Math.max(3, Math.round((ok / (durak.length || 1)) * 100))}%"></i></span><small>${ok ? TL("Gittiğin duraklar işaretli. Devam!", "Stops you've visited are ticked. Keep going!") : TL("Bir durakta \"Buraya gittim\" de, burada işaretlensin.", "Tap \"I've been here\" at a stop to tick it off.")}</small></div>
    </section>
    <ol class="atzaman">${durak.map(({ a, x }) => {
      const on = gidilen.has(a[0] + "|" + a[1]);
      return `<li class="${on ? "on" : ""}"><span class="atnokta">${on ? ik("check", 14) : ""}</span><button class="atkart" ${kart(x, a[0], a[1])}>
        <span class="attarih">${esc(TL(a[2][0], a[2][1]))}</span><b class="atbas">${esc(TL(a[3][0], a[3][1]))}</b>
        <span class="atmetin">${esc(TL(a[4][0], a[4][1]))}</span>
        <span class="atyer">${x && x[8] ? thumb({ p: x[8], w: 1e5 }, x[6] || "t") : `<span class="thumb">${ik("landmark", 20)}</span>`}<span class="rt"><b>${esc(yerAd(x, a[1]))}</b><small>${esc(ilAd(a[0]))}${uzak(x)}</small></span>${on ? `<i class="atok">${ik("circle-check", 20)}</i>` : ik("chevron-right", 18)}</span>
      </button></li>`;
    }).join("")}</ol>
    <h2 class="sec">${TL("Evleri ve köşkleri", "His houses and mansions")}</h2>
    <p class="tsay">${TL("Atatürk'ün yaşadığı, ziyaretlerinde kaldığı ya da hatırasını yaşatan, bugün müze olan evler.", "Houses where Atatürk lived or stayed, or that keep his memory alive, now museums.")}</p>
    <ul class="list atev">${ATA_EV.map((a) => ({ a, x: bul(a[0], a[1]) })).filter((d) => d.x || !ARA).map(({ a, x }) => {
      const on = gidilen.has(a[0] + "|" + a[1]);
      const not = TL(a[2][0], a[2][1]) || TL("Atatürk'ün hatırasını yaşatan ev müze.", "A house museum keeping Atatürk's memory alive.");
      return `<li><button class="row res" ${kart(x, a[0], a[1])}>${x && x[8] ? thumb({ p: x[8], w: 1e5 }, x[6] || "m") : `<span class="thumb">${ik("house", 20)}</span>`}<span class="rt"><b>${esc(yerAd(x, a[1]))}</b><small>${esc(ilAd(a[0]))}${uzak(x)} · ${esc(not)}</small></span><span class="km${on ? " ok" : ""}">${on ? ik("circle-check", 20) : OKIK}</span></button></li>`;
    }).join("")}</ul>
    <blockquote class="atsoz">${esc(TL("“Beni görmek demek mutlaka yüzümü görmek değildir. Benim fikirlerimi, benim duygularımı anlıyorsanız ve hissediyorsanız bu kâfidir.”", "“To see me does not necessarily mean to see my face. To understand my ideas and my feelings is enough.”"))}<cite>Mustafa Kemal Atatürk</cite></blockquote>`;
  }
  // ---------- keşfet: tema listeleri (Türkiye geneli) ----------
  const TEMA = {
    aile: { ad: T("Çocuklarla gezi"), e: "heart-handshake", k: ["hayvanat", "akvaryum", "oyuncak", "bilim", "botanik", "teleferik", "rahmi m", "havacilik", "deniz muzesi", "millet bahcesi", "kent ormani", "tabiat park", "kus cenneti", "kelebek", "magara", "selale", "planetaryum", "lunapark", "plaj", "demiryolu", "miniaturk"] },
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
  const temaUyar = (t, x) => t.k.some((w) => (" " + x[0] + " ").includes(w)) && (!t.d || x[6] === "d");
  // Aylık öneri: "Kasım'da nereye?" başlığı, kısa not, 3-4 tema ve fotoğraflı yer şeridi
  const AYLAR = [
    { e: "snowflake", ad: TL("Ocak'ta nereye?", "Where to go in January?"), not: TL("Kısa, soğuk günler içeride gezmelik: müzeler, saraylar, kervansaraylar. Mağaraların içi yaz kış hemen hemen aynı ısıda.", "Short, cold days suit indoor sights: museums, palaces and caravanserais. Caves stay about the same temperature all year."), t: ["muze", "saray", "han", "magara"] },
    { e: "cloud-snow", ad: TL("Şubat'ta nereye?", "Where to go in February?"), not: TL("Kar yağınca kaleler ve tarihi köprüler kartpostala dönüşür; soğuk günler müze günü.", "After snowfall, castles and old bridges look like postcards; cold days are museum days."), t: ["kale", "kopru", "muze", "han"] },
    { e: "cloud-sun", ad: TL("Mart'ta nereye?", "Where to go in March?"), not: TL("Eriyen karlarla şelaleler canlanıyor, sahillerde bahar erken başlıyor. 18 Mart'ta Çanakkale şehitleri anılıyor.", "Melting snow brings waterfalls to life and spring comes early on the coasts. On 18 March, Türkiye remembers the fallen of Çanakkale."), t: ["selale", "park", "kale", "muze"] },
    { e: "flower-2", ad: TL("Nisan'da nereye?", "Where to go in April?"), not: TL("Vadiler yeşeriyor, şelaleler gürleşiyor; ılık hava yürüyüşe birebir. 23 Nisan'da Ulusal Egemenlik ve Çocuk Bayramı kutlanıyor.", "Valleys turn green and waterfalls swell; mild weather is perfect for walking. 23 April is National Sovereignty and Children's Day."), t: ["selale", "kanyon", "park", "kopru"] },
    { e: "trees", ad: TL("Mayıs'ta nereye?", "Where to go in May?"), not: TL("Kırlar çiçekte, günler uzun ve ılık: milli parklar ve göl kıyıları en güzel halinde. 19 Mayıs 1919'da Atatürk Samsun'a çıktı.", "Meadows in bloom, long mild days: national parks and lakesides at their best. On 19 May 1919, Atatürk landed at Samsun."), t: ["park", "gol", "kanyon", "ada"] },
    { e: "sun", ad: TL("Haziran'da nereye?", "Where to go in June?"), not: TL("Deniz ısınıyor, yaylalar yemyeşil, günler yılın en uzunu: bir koya ya da serin bir yaylaya kaç.", "The sea is warming up, the highlands are lush and the days are the longest of the year: escape to a cove or a cool plateau."), t: ["ada", "dag", "gol", "kanyon"] },
    { e: "sun", ad: TL("Temmuz'da nereye?", "Where to go in July?"), not: TL("Sıcaklar bastırdı; serinlik denizde, göl kıyısında, şelale başında ya da yüksek yaylalarda.", "The heat is on: cool off by the sea, at a lake, beside a waterfall or up in the highlands."), t: ["ada", "gol", "selale", "dag"] },
    { e: "sun", ad: TL("Ağustos'ta nereye?", "Where to go in August?"), not: TL("Deniz en sıcak halinde, yaylalar serin; kanyon yürüyüşleri için de güzel bir ay. 30 Ağustos'ta Zafer Bayramı kutlanıyor.", "The sea is at its warmest and the highlands stay cool; a good month for canyon walks too. 30 August is Victory Day."), t: ["ada", "dag", "kanyon", "gol"] },
    { e: "cloud-sun", ad: TL("Eylül'de nereye?", "Where to go in September?"), not: TL("Sıcaklar kırılıyor, kalabalık azalıyor, deniz hâlâ ılık. Kaleler ve tarihi köprüler için en rahat günler.", "The heat eases and the crowds thin out, while the sea stays warm. Comfortable days for castles and old bridges."), t: ["ada", "kale", "kopru", "gol"] },
    { e: "leaf", ad: TL("Ekim'de nereye?", "Where to go in October?"), not: TL("Ormanlar sararıp kızarıyor, hava tam yürüyüşlük; milli parklar ve göller en renkli halinde. 29 Ekim'de Cumhuriyet Bayramı kutlanıyor.", "Forests turn gold and red and the weather is perfect for walking; national parks and lakes are at their most colourful. 29 October is Republic Day."), t: ["park", "gol", "kanyon", "kale"] },
    { e: "leaf", ad: TL("Kasım'da nereye?", "Where to go in November?"), not: TL("Ormanlar sonbahar renginde, yağmurlarla şelaleler coşuyor; serin günlerde müzeler de güzel. 10 Kasım'da Atatürk'ü saygıyla anıyoruz.", "Forests wear their autumn colours and the rains bring waterfalls to life; on cool days, museums are lovely too. On 10 November we remember Atatürk."), t: ["park", "selale", "muze"], ata: 1 },
    { e: "snowflake", ad: TL("Aralık'ta nereye?", "Where to go in December?"), not: TL("Yılın en kısa günleri: müzeler ve saraylar sıcacık bir mola. Yükseklerde karlı manzaralar başlıyor.", "The shortest days of the year: museums and palaces make a cosy break. Snowy views begin up in the mountains."), t: ["muze", "saray", "magara", "dag"] }
  ];
  // Günün tohumu: aynı gün aynı sıra, ertesi gün yeni sıra (FNV-1a)
  function tohum(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  let ayAnahtar = "", ayBekle = false;
  function ayKart() {
    const n = new Date(), ay = n.getMonth(), m = AYLAR[ay], el = $("mevsim");
    if (el.dataset.ay !== String(ay)) {
      el.dataset.ay = ay; ayAnahtar = "";
      const chip = (go, e, ad, cls) => `<button class="tchip${cls || ""}" data-go="${go}"><i>${ik(e, 20)}</i><span>${esc(ad)}</span></button>`;
      // Çok dar ekranda uzun kelimeli tema adı ("kervansaraylar") varsa çipler tek sütun olur
      const uzun = m.t.some((k) => TEMA[k].ad.split(" ").some((w) => w.length > 11));
      el.innerHTML = `<div class="mvust"><span class="mvik">${ik(m.e, 22)}</span><span><b>${esc(m.ad)}</b><small>${esc(m.not)}</small></span></div>` +
        `<ul class="mvserit" id="aySerit" aria-label="${TL("Bu ay için öneriler", "Picks for this month")}">${'<li><span class="mvf yuk"></span></li>'.repeat(8)}</ul>` +
        `<div class="mvchips${uzun ? " uzun" : ""}">${(m.ata ? chip("#/ataturk", "footprints", TL("Atatürk'ün izinde", "In Atatürk's footsteps"), " ata") : "") + m.t.map((k) => chip(`#/tema/${k}`, TEMA[k].e, TEMA[k].ad)).join("")}</div>`;
    }
    const ul = $("aySerit");
    // Arama listesi gelmeden ana sayfayı bekletme: gelince şeridi doldur
    if (!ARA) {
      if (IDX && !ayBekle) { ayBekle = true; loadAra().then(() => { ayBekle = false; if (ARA) ayKart(); else ul.hidden = true; }); }
      return;
    }
    const gun = `${n.getFullYear()}-${ay + 1}-${n.getDate()}`;
    const anahtar = gun + (me ? `|${me.lat.toFixed(2)},${me.lng.toFixed(2)}` : "");
    if (anahtar === ayAnahtar) return;
    ayAnahtar = anahtar;
    // Aday sırası: konum açıksa önce 250 km içi; sonra öne çıkan (x[11]), ilin ilk 8 yeri, kalanlar; uzaktakiler yakından uzağa
    const gruplar = m.t.map((k) => ARA.filter((x) => x[7] === 1 && x[8] && temaUyar(TEMA[k], x)).map((x) => {
      const d = me ? km(me, { lat: x[4], lng: x[5] }) : 0, o = x[11] ? 0 : x[3] < 8 ? 1 : 2;
      return me && d > 250 ? { x, k, d, g: o < 2 ? 3 : 4, s: d } : { x, k, d, g: o, s: tohum(gun + "|" + x[2] + "|" + x[3]) };
    }));
    // Temalar sırayla birer yer verir, her ilden en fazla bir yer
    const secilen = [], iller = new Set(), bas = tohum(gun) % gruplar.length;
    for (let g = 0; g <= 4 && secilen.length < 8; g++) {
      const kuyruk = gruplar.map((l) => l.filter((c) => c.g === g).sort((a, b) => a.s - b.s));
      for (let ilerle = true; ilerle && secilen.length < 8;) {
        ilerle = false;
        for (let i = 0; i < kuyruk.length && secilen.length < 8; i++) {
          const q = kuyruk[(bas + i) % kuyruk.length];
          while (q.length) { const c = q.shift(); if (iller.has(c.x[2])) continue; secilen.push(c); iller.add(c.x[2]); ilerle = true; break; }
        }
      }
    }
    if (me) secilen.sort((a, b) => a.d - b.d);
    const sol = ul.scrollLeft;
    ul.innerHTML = secilen.map(({ x, k, d }) => {
      const il = (IDX.ilBy.get(x[2]) || {}).ad || "";
      return `<li><button class="mvf" data-yer="${x[2]}|${x[3]}" style="--c:${(CATS[x[6]] || CATS.t).renk}">${ik(TEMA[k].e, 30)}<img src="${esc(foto({ p: x[8], w: 1e5 }, 500))}" alt="" loading="lazy" decoding="async" onerror="fotoHata(this)">${me ? `<span class="mvkm">${ik("navigation", 12)}${fmt(d)}</span>` : ""}<span class="mvft"><b>${esc(araAd(x))}</b><small>${esc(il)}</small></span></button></li>`;
    }).join("");
    ul.hidden = !secilen.length; ul.scrollLeft = sol;
  }
  function temaChips() {
    ayKart();
    // Kasım kartında zaten Atatürk çipi varsa aşağıda tekrar gösterme
    const ataAy = (AYLAR[new Date().getMonth()] || {}).ata;
    $("temaChips").innerHTML = (ataAy ? "" : `<button class="tchip tata" data-go="#/ataturk"><i>${ik("footprints", 20)}</i><span>${TL("Atatürk'ün izinde", "In Atatürk's footsteps")}</span></button>`) + Object.entries(TEMA).map(([k, t]) =>
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
    let r = ARA.filter((x) => temaUyar(t, x));
    if (me) r = r.map((x) => [km(me, { lat: x[4], lng: x[5] }), x]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
    else r.sort((a, b) => b[7] - a[7] || a[1].localeCompare(b[1], "tr"));
    $("temaSay").textContent = TL(`${r.length} yer` + (me ? " · sana en yakından uzağa" : " · konumunu açarsan yakından uzağa sıralarız"), `${r.length} places` + (me ? " · nearest first" : " · turn on location to sort by distance"));
    $("temaList").innerHTML = r.length ? r.map((x) => {
      const c = CATS[x[6]] || CATS.t, il = (IDX.ilBy.get(x[2]) || {}).ad || "";
      return `<li><button class="row res" data-yer="${x[2]}|${x[3]}">${x[8] ? thumb({ p: x[8], w: 1e5 }, x[6] || "t") : `<span class="thumb" style="--c:${c.renk}">${icon(x[6] || "t", 20)}</span>`}<span class="rt"><b>${esc(araAd(x))}</b><small>${esc(il)}</small></span><span class="km">${me ? fmt(km(me, { lat: x[4], lng: x[5] })) : OKIK}</span></button></li>`;
    }).join("") : `<li class="empty">${T("Bu türde yer bulunamadı.")}</li>`;
  }
  // ---------- v6.5 gezi notu ve puan, en sevdiğin yerler, sana özel ----------
  // Puan (p: 1-5) ve not (n) yalnızca bu cihazda, "gezi-gittim" kaydının içinde durur; hiçbir yere gönderilmez.
  const NOT_UZ = 280;
  const gitKayit = (p) => gittiklerim().find((x) => ayni(x, p));
  // Gittiğin yerin kaydına puan / not yaz (boş değer alanı siler), diğer alanlara dokunma
  function gitGuncelle(p, alan) {
    try {
      const a = JSON.parse(localStorage.getItem(GIT)) || [], x = a.find((y) => ayni(y, p));
      if (!x) return false;
      for (const [k, v] of Object.entries(alan)) { if (v) x[k] = v; else delete x[k]; }
      localStorage.setItem(GIT, JSON.stringify(a));
      return true;
    } catch (e) { return false; }
  }
  const yildizlar = (n, boy) => [1, 2, 3, 4, 5].map((i) => `<i${i <= n ? ' class="on"' : ""}>${ik("star", boy)}</i>`).join("");
  // Detay kartı: "Gittim" işaretliyse 5 yıldız ve kısa not
  let notZaman = null, notBekleyen = null;
  function notSatir(p) {
    notYaz();
    const kutu = $("dNot"), x = p && p.q ? gitKayit(p) : null;
    kutu.hidden = !x;
    if (!x) { kutu.innerHTML = ""; return; }
    const puan = x.p || 0, not = x.n || "";
    kutu.innerHTML = `<div class="gpuan"><span id="dPuanBas">${TL("Puanın", "Your rating")}</span><div class="yildiz" role="group" aria-labelledby="dPuanBas">${[1, 2, 3, 4, 5].map((i) =>
      `<button type="button" data-p="${i}" style="--i:${i}"${i <= puan ? ' class="on"' : ""} aria-pressed="${i === puan}" aria-label="${TL(`${i} yıldız`, `${i} star${i > 1 ? "s" : ""}`)}">${ik("star", 26)}</button>`).join("")}</div></div>` +
      `<button type="button" class="gnotbtn" aria-expanded="${!!not}" aria-controls="dNotAlan">${ik("message-circle-heart", 18)}<span>${not ? TL("Notun", "Your note") : TL("Not ekle", "Add a note")}</span>${ik("chevron-down", 18, "gac")}</button>` +
      `<div class="gnotalan" id="dNotAlan"${not ? "" : " hidden"}><textarea id="dNotYazi" rows="3" maxlength="${NOT_UZ}" placeholder="${esc(TL("Burada neler yaşadın? Kendine kısa bir not bırak.", "What was it like? Leave yourself a short note."))}" aria-label="${esc(TL("Gezi notun", "Your trip note"))}">${esc(not)}</textarea><small class="gsay" id="dNotSay">${not.length} / ${NOT_UZ}</small></div>`;
  }
  // Yıldızları yeniden çizmeden güncelle (odak yerinde kalsın)
  function puanGoster(n) {
    for (const b of $("dNot").querySelectorAll("[data-p]")) {
      const i = +b.dataset.p;
      b.classList.toggle("on", i <= n); b.setAttribute("aria-pressed", i === n);
      b.classList.remove("pop"); if (i <= n) { void b.offsetWidth; b.classList.add("pop"); }
    }
  }
  // Notu kaydet: yazarken 0,7 sn bekleyerek, alandan çıkınca ve uygulama arka plana geçince hemen
  function notYaz() {
    clearTimeout(notZaman); notZaman = null;
    const b = notBekleyen; notBekleyen = null;
    if (!b) return;
    const n = b.v.trim().slice(0, NOT_UZ);
    if (!gitGuncelle(b.p, { n }) || open !== b.p || !$("dNotSay")) return;
    $("dNotSay").textContent = `${TL("Kaydedildi", "Saved")} · ${b.v.length} / ${NOT_UZ}`;
    $("dNot").querySelector(".gnotbtn span").textContent = n ? TL("Notun", "Your note") : TL("Not ekle", "Add a note");
  }
  $("dNot").addEventListener("click", (e) => {
    const y = e.target.closest("[data-p]");
    if (y && open) {
      const x = gitKayit(open); if (!x) return;
      // Aynı yıldıza tekrar dokununca puan silinir
      const n = +y.dataset.p === x.p ? 0 : +y.dataset.p;
      if (gitGuncelle(open, { p: n })) puanGoster(n);
      return;
    }
    const b = e.target.closest(".gnotbtn");
    if (b) {
      const alan = $("dNotAlan"), ac = alan.hidden;
      alan.hidden = !ac; b.setAttribute("aria-expanded", ac);
      if (ac) $("dNotYazi").focus();
    }
  });
  $("dNot").addEventListener("input", (e) => {
    if (e.target.id !== "dNotYazi" || !open) return;
    $("dNotSay").textContent = `${e.target.value.length} / ${NOT_UZ}`;
    notBekleyen = { p: open, v: e.target.value };
    clearTimeout(notZaman); notZaman = setTimeout(notYaz, 700);
  });
  $("dNot").addEventListener("focusout", (e) => { if (e.target.id === "dNotYazi") notYaz(); });
  addEventListener("pagehide", notYaz);
  document.addEventListener("visibilitychange", () => { if (document.hidden) notYaz(); });
  // Gezilerim: 4-5 yıldız verdiğin yerler (önce puan, sonra tarih)
  function renderSevdik() {
    const a = gittiklerim(), l = a.filter((x) => x.p >= 4).sort((x, y) => y.p - x.p || (y.t || 0) - (x.t || 0));
    $("sevSec").hidden = !a.length;
    $("sevSec").classList.toggle("ipucu", !l.length);
    $("sevBas").hidden = $("sevList").hidden = !l.length; $("sevIpucu").hidden = !!l.length;
    $("sevList").innerHTML = l.map((x) => {
      const ilk = String(x.n || "").split("\n").map((s) => s.trim()).find(Boolean) || "";
      return `<li><button class="row" data-go="#/il/${x.s}/yer/${x.q}">${thumb(x.f, x.k)}<span class="rt"><b>${esc(kayitAd(x))}</b><small><span class="sevy" role="img" aria-label="${TL(`${x.p} yıldız`, `${x.p} stars`)}">${yildizlar(x.p, 13)}</span>${esc(x.il)}</small>${ilk ? `<em>${esc(ilk)}</em>` : ""}</span>${OKIK}</button></li>`;
    }).join("");
  }
  // Sana özel: listendeki ve gittiğin yerlerden zevkini çıkar, her gün 6 yer öner (hesap cihazda yapılır)
  const OZ_TEMA = { aile: ["çocuklarla gezmeyi", "family days out"], selale: ["şelaleleri", "waterfalls"], magara: ["mağaraları", "caves"], kanyon: ["kanyonları", "canyons"], gol: ["gölleri", "lakes"], ada: ["adaları", "islands"], park: ["milli parkları", "national parks"], dag: ["dağları", "mountains"], kale: ["kaleleri", "castles"], kopru: ["tarihi köprüleri", "historic bridges"], saray: ["sarayları", "palaces"], han: ["kervansarayları", "caravanserais"], muze: ["müzeleri", "museums"] };
  const OZ_KAT = { t: ["tarihi yerleri", "historic sites"], d: ["doğayı", "nature"], m: ["müzeleri", "museums"], c: ["çarşıları", "bazaars"], s: ["şehir semtlerini", "city quarters"] };
  // Temanın zaten söylediği kategori ("şelaleleri ve doğayı" olmasın)
  const OZ_TK = { selale: "d", magara: "d", kanyon: "d", gol: "d", ada: "d", park: "d", dag: "d", kale: "t", kopru: "t", saray: "t", han: "t", muze: "m" };
  const temaUyarAd = (t, sadeAd, k) => TEMA[t].k.some((w) => (" " + sadeAd + " ").includes(w)) && (!TEMA[t].d || k === "d");
  // Bir yerin temaları (renderTema ile aynı anahtar kelimeler); "Çocuklarla gezi" yalnızca başka temaya girmeyen yerde sayılır
  function yerTema(sadeAd, k) {
    const l = Object.keys(TEMA).filter((t) => temaUyarAd(t, sadeAd, k)), o = l.filter((t) => t !== "aile");
    return o.length ? o : l;
  }
  function zevk() {
    const f = favs(), g = gittiklerim(), w = new Map();
    for (const x of f) w.set(x.s + "|" + x.q, [x, 1]);
    // Gittiğin yerde 4-5 yıldız iki kat, 1-2 yıldız eksi sayılır
    for (const x of g) w.set(x.s + "|" + x.q, [x, x.p >= 4 ? 2 : x.p > 0 && x.p <= 2 ? -1 : 1]);
    const tema = {}, kat = {}; let say = 0;
    for (const [x, a] of w.values()) {
      if (a > 0) say++;
      for (const t of yerTema(sade(x.ad || ""), x.k)) tema[t] = (tema[t] || 0) + a;
      if (CATS[x.k]) kat[x.k] = (kat[x.k] || 0) + a;
    }
    return { say, tema, kat, haric: new Set([...f, ...g].map((x) => x.s + "|" + x.ad)) };
  }
  // Güne bağlı sabit sayı (0-1): aynı gün aynı öneriler
  function gunSayi(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    h ^= h >>> 16; h = Math.imul(h, 2246822507); h ^= h >>> 13; h = Math.imul(h, 3266489909); h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }
  let ozelHtml = "";
  function ozelGizle() { $("ozelSec").hidden = true; $("ozelKart").innerHTML = ozelHtml = ""; }
  async function sanaOzel() {
    try {
      if (zevk().say < 3) return ozelGizle();
      await loadAra(); if (!ARA || !IDX) return;
      const z = zevk(); if (z.say < 3) return ozelGizle();
      const sira = (o) => Object.entries(o).filter((e) => e[1] > 0).sort((a, b) => b[1] - a[1]);
      const neden = sira(z.tema).slice(0, 2).map(([t]) => ({ t }));
      for (const [k] of sira(z.kat)) if (neden.length < 2 && !neden.some((n) => OZ_TK[n.t] === k || n.k === k)) neden.push({ k });
      if (!neden.length) return ozelGizle();
      // Öne çıkan yer işareti veride yoksa: fotoğraflı ve ilinin ilk 10 yerinden biri
      const oneVar = ARA.some((x) => x[11]), one = (x) => (oneVar ? x[11] : x[7] === 1 && x[8] && x[3] < 10);
      const g = new Date(), tohum = `${g.getFullYear()}-${g.getMonth() + 1}-${g.getDate()}|`;
      const listeler = neden.map((n) => ARA.filter((x) => !z.haric.has(x[2] + "|" + x[1]) && (n.t ? temaUyarAd(n.t, x[0], x[6]) : x[6] === n.k)).map((x) => {
        const r = gunSayi(tohum + x[2] + "|" + x[3]), s = one(x) ? 0 : x[8] ? 1 : 2, uz = me ? km(me, { lat: x[4], lng: x[5] }) : null;
        // Konum açıksa yakındakiler öne (gün içinde sabit küçük sapmayla), değilse öne çıkanlar güne göre karışık
        return { x, uz, v: me ? uz * (0.75 + r * 0.5) + [0, 60, 250][s] : s + r };
      }).sort((a, b) => a.v - b.v));
      // Temalardan sırayla birer yer al, her ilden en fazla bir yer
      const sec = [], il = new Set(), ix = listeler.map(() => 0);
      for (let ekledi = true; ekledi && sec.length < 6;) {
        ekledi = false;
        listeler.forEach((l, i) => {
          while (sec.length < 6 && ix[i] < l.length) {
            const c = l[ix[i]++];
            if (il.has(c.x[2])) continue;
            il.add(c.x[2]); sec.push(c); ekledi = true; break;
          }
        });
      }
      if (sec.length < 3) return ozelGizle();
      const ad = (n) => (n.t ? OZ_TEMA[n.t] : OZ_KAT[n.k]), tr = neden.map((n) => ad(n)[0]).join(" ve ");
      $("ozelNeden").textContent = TL(tr.charAt(0).toLocaleUpperCase("tr") + tr.slice(1) + " seviyorsun", "You love " + neden.map((n) => ad(n)[1]).join(" and "));
      const html = sec.map(({ x, uz }) => `<button class="ozk" data-yer="${x[2]}|${x[3]}">${thumb(x[8] ? { p: x[8], w: 1e5 } : null, x[6] || "t", 400, "cover")}${uz != null ? `<em class="ozkm">${ik("navigation", 11)}${fmt(uz)}</em>` : ""}<span class="ozkt"><b>${esc(araAd(x))}</b><small>${esc((IDX.ilBy.get(x[2]) || {}).ad || "")}</small></span></button>`).join("");
      if (html !== ozelHtml) { ozelHtml = html; $("ozelKart").innerHTML = html; }
      $("ozelSec").hidden = false;
    } catch (e) { console.warn("Sana özel:", e); }
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
  // ---------- yol üstü keşif: iki il arasındaki yolda mola verilecek yerler ----------
  // Yol, komşu illerin merkezlerinden geçen en kısa hattır (il-komsu.json, Natural Earth sınırlarından).
  // Gerçek karayoluna yakın bir tahmindir; ekranda da "yaklaşık" diye yazılır.
  const YOL = "gezi-yol", YOL_GENIS = [5, 15, 30], YOL_ILK = 6;
  let KOMSU = null, yolGenis = 15, yolAcik = new Set();
  try { const g = JSON.parse(localStorage.getItem(YOL) || "{}").g; if (YOL_GENIS.includes(g)) yolGenis = g; } catch (e) {}
  function loadKomsu() {
    if (!KOMSU) KOMSU = getJSON(`il-komsu.json?v=${SURUM}`).catch(() => { KOMSU = null; return null; });
    return KOMSU;
  }
  // 81 düğümlü küçük Dijkstra: ağırlık = il merkezleri arası kuş uçuşu mesafe
  function yolBul(K, a, b) {
    const d = new Map([[a, 0]]), once = new Map(), bitti = new Set();
    for (;;) {
      let u = null, m = Infinity;
      for (const [s, v] of d) if (!bitti.has(s) && v < m) { m = v; u = s; }
      if (u === null || u === b) break;
      bitti.add(u);
      const iu = IDX.ilBy.get(u);
      for (const v of K[u] || []) {
        const iv = IDX.ilBy.get(v); if (!iv || bitti.has(v)) continue;
        const n = m + km(iu, iv);
        if (!d.has(v) || n < d.get(v)) { d.set(v, n); once.set(v, u); }
      }
    }
    if (!d.has(b)) return null;
    const yol = [b];
    while (yol[0] !== a) yol.unshift(once.get(yol[0]));
    return yol;
  }
  // Her yerin hatta uzaklığı (sapma) ve hat boyunca konumu; başlangıç ve varış illerinin kendi yerleri hariç
  function yolYerleri(yol) {
    const KX = 111.32 * Math.cos((39 * Math.PI) / 180), KY = 110.57;
    const P = yol.map((s) => { const i = IDX.ilBy.get(s); return [i.lng * KX, i.lat * KY]; });
    const bir = [0];
    for (let i = 1; i < P.length; i++) bir.push(bir[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
    const uc = new Set([yol[0], yol[yol.length - 1]]), r = [];
    for (const x of ARA) {
      if (uc.has(x[2])) continue;
      const px = x[5] * KX, py = x[4] * KY;
      let sap = Infinity, konum = 0;
      for (let i = 1; i < P.length; i++) {
        const [ax, ay] = P[i - 1], dx = P[i][0] - ax, dy = P[i][1] - ay, L2 = dx * dx + dy * dy;
        const t = L2 ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L2)) : 0;
        const dd = Math.hypot(px - ax - t * dx, py - ay - t * dy);
        if (dd < sap) { sap = dd; konum = bir[i - 1] + t * Math.sqrt(L2); }
      }
      if (sap <= yolGenis) r.push({ x, sap, konum });
    }
    return { r, toplam: bir[bir.length - 1] };
  }
  const YOL_CARPAN = 1.2; // il merkezleri arası hat → karayolu için kaba düzeltme
  function yolDoldur(a, b) {
    const iller = IDX.iller.slice().sort((x, y) => x.ad.localeCompare(y.ad, "tr"));
    let kayit = {};
    try { kayit = JSON.parse(localStorage.getItem(YOL) || "{}"); } catch (e) {}
    const yakinIl = me ? IDX.iller.reduce((en, i) => (km(me, i) < km(me, en) ? i : en), IDX.iller[0]).s : null;
    let son = null; try { son = localStorage.getItem("gezi-son-il"); } catch (e) {}
    const var_ = (s) => s && IDX.ilBy.has(s);
    a = [a, kayit.a, yakinIl, son, "istanbul"].find(var_);
    b = [b, kayit.b, a === "ankara" ? "istanbul" : "ankara"].find((s) => var_(s) && s !== a) || "ankara";
    const sec = (v) => iller.map((i) => `<option value="${i.s}"${i.s === v ? " selected" : ""}>${esc(i.ad)}</option>`).join("");
    $("yolA").innerHTML = sec(a); $("yolB").innerHTML = sec(b);
    $("yolGenis").innerHTML = YOL_GENIS.map((g) => `<button data-g="${g}" aria-pressed="${g === yolGenis}">${g} km</button>`).join("");
  }
  function showYol(a, b) {
    view = { mode: "yol" }; show("yol");
    $("eyebrow").textContent = T("Yolculuk planı"); $("title").textContent = T("Yol üstü keşif");
    yolAcik = new Set();
    yolDoldur(a, b);
    renderYol();
  }
  async function renderYol() {
    if (!view || view.mode !== "yol") return;
    const a = $("yolA").value, b = $("yolB").value, ilAd = (s) => (IDX.ilBy.get(s) || {}).ad || s;
    try { localStorage.setItem(YOL, JSON.stringify({ a, b, g: yolGenis })); } catch (e) {}
    if (location.hash !== `#/yol/${a}/${b}`) history.replaceState(null, "", `#/yol/${a}/${b}`);
    for (const x of $("yolGenis").children) x.setAttribute("aria-pressed", String(+x.dataset.g === yolGenis));
    $("yolAc").hidden = true; $("yolMola").hidden = true;
    if (a === b) { $("yolSay").textContent = ""; $("yolHat").innerHTML = ""; $("yolList").innerHTML = `<li class="empty">${T("Nereden ve nereye için iki farklı il seç.")}</li>`; return; }
    if (!ARA || !KOMSU || typeof KOMSU.then === "function") {
      $("yolList").innerHTML = `<li class="empty">${T("Yükleniyor…")}</li>`;
      const [, k] = await Promise.all([loadAra(), loadKomsu()]);
      if (!ARA || !k) { $("yolList").innerHTML = `<li class="empty">${T("Yol bilgisi yüklenemedi. İnternet bağlantını kontrol et.")}</li>`; KOMSU = null; return; }
      KOMSU = k;
      return renderYol();
    }
    const yol = yolBul(KOMSU, a, b);
    if (!yol) { $("yolList").innerHTML = `<li class="empty">${T("Bu iki il arasında yol bulunamadı.")}</li>`; return; }
    const { r, toplam } = yolYerleri(yol);
    r.sort((p, q) => p.konum - q.konum);
    const grup = new Map();
    for (const y of r) { if (!grup.has(y.x[2])) grup.set(y.x[2], { konum: y.konum, l: [] }); grup.get(y.x[2]).l.push(y); }
    $("yolSay").textContent = TL(`Yaklaşık ${fmt(toplam * YOL_CARPAN)} yol · ${r.length} mola yeri · ${grup.size} ilde`, `About ${fmt(toplam * YOL_CARPAN)} of driving · ${r.length} stops · in ${grup.size} provinces`);
    $("yolHat").innerHTML = yol.map((s, i) => `<button class="yhil${i === 0 || i === yol.length - 1 ? " uc" : ""}" data-go="#/il/${s}">${esc(ilAd(s))}</button>`).join(`<i>${ik("chevron-right", 14)}</i>`);
    const g = gittiklerim();
    let html = "";
    for (const [s, { konum, l }] of grup) {
      // İl içinde önce öne çıkanlar, sonra fotoğraflılar, sonra yola en yakın olanlar
      l.sort((p, q) => (q.x[11] || 0) - (p.x[11] || 0) || (q.x[8] ? 1 : 0) - (p.x[8] ? 1 : 0) || p.sap - q.sap);
      const goster = yolAcik.has(s) ? l : l.slice(0, YOL_ILK);
      html += `<li class="yolil"><b>${esc(ilAd(s))}</b><small>${TL(`başlangıçtan ~${fmt(konum * YOL_CARPAN)}`, `~${fmt(konum * YOL_CARPAN)} from start`)}</small></li>`;
      html += goster.map(({ x, sap }) => {
        const c = CATS[x[6]] || CATS.t, ok = g.some((y) => y.s === x[2] && y.ad === x[1]);
        return `<li><button class="row res" data-yer="${x[2]}|${x[3]}">${x[8] ? thumb({ p: x[8], w: 1e5 }, x[6] || "t") : `<span class="thumb" style="--c:${c.renk}">${icon(x[6] || "t", 20)}</span>`}<span class="rt"><b>${x[11] ? `<i class="star" title="${T("Öne çıkan")}">${ik("star", 14)}</i>` : ""}${esc(araAd(x))}</b><small>${esc(c.ad)} · ${TL(`yoldan ~${fmt(sap)}`, `~${fmt(sap)} off the road`)}</small></span><span class="km${ok ? " ok" : ""}">${ok ? ik("circle-check", 20) : OKIK}</span></button></li>`;
      }).join("");
      if (l.length > goster.length) html += `<li><button class="linkbtn yolfazla" data-yolil="${s}">${TL(`${ilAd(s)}: ${l.length - goster.length} yer daha göster`, `Show ${l.length - goster.length} more in ${ilAd(s)}`)}</button></li>`;
    }
    molaGoster(yol, r, toplam);
    $("yolList").innerHTML = html || `<li class="empty">${TL("Bu yolun yakınında kayıtlı yer bulamadık. Yoldan sapma mesafesini artırmayı dene.", "No places found near this road. Try a wider distance.")}</li>`;
    const A = IDX.ilBy.get(a), B = IDX.ilBy.get(b);
    $("yolAc").href = `https://www.google.com/maps/dir/?api=1&origin=${A.lat},${A.lng}&destination=${B.lat},${B.lng}&travelmode=driving`;
    $("yolAc").hidden = false;
  }
  // ---------- listeyi linkle paylaş: liste linkin içinde taşınır, sunucu ya da hesap yok ----------
  const LISTE_EN_COK = 40;
  function metinPaylas(baslik, metin, url) {
    const P = window.Capacitor && window.Capacitor.Plugins;
    if (P && P.Share) { P.Share.share({ title: baslik, text: metin, url }).catch(() => {}); return; }
    if (navigator.share) { navigator.share({ title: baslik, text: metin, url }).catch(() => {}); return; }
    window.open("https://wa.me/?text=" + encodeURIComponent(metin + " " + url), "_blank");
  }
  function listePaylas() {
    const a = favs(); if (!a.length) return;
    const kod = a.slice(0, LISTE_EN_COK).map((x) => `${x.s}~${String(x.q).replace(/^Q/, "")}`).join(",");
    metinPaylas(TL("Gezi listem", "My travel list"), TL(`Gitmek istediğim ${a.length} yer, Rota Cepte'de hazırladım:`, `${a.length} places I want to visit in Türkiye, made with Rota Cepte:`), `https://me7rt.github.io/Rota-Cepte/#/liste/${kod}`);
  }
  let plYer = [];
  const favKayit = (p) => ({ q: p.q, s: p.ilS, ad: p.ad, il: [...new Set([p.ilce, p.il].filter(Boolean))].join(", "), k: p.k, f: p.f, lat: p.lat, lng: p.lng });
  async function showListe(kod, no) {
    view = { mode: "plist" }; show("plist");
    $("eyebrow").textContent = "Rota Cepte"; $("title").textContent = T("Paylaşılan liste");
    $("plSay").textContent = ""; $("plList").innerHTML = `<li class="empty">${T("Yükleniyor…")}</li>`; $("plEkle").hidden = true;
    const ogeler = String(kod || "").split(",").map((x) => x.split("~")).filter((x) => x.length === 2 && IDX.ilBy.has(x[0]) && /^\d+$/.test(x[1])).slice(0, LISTE_EN_COK);
    const sonuc = [];
    for (const [s, q] of ogeler) { try { const d = await loadIl(s); const p = d.yerler.find((y) => y.q === "Q" + q); if (p && !sonuc.includes(p)) sonuc.push(p); } catch (e) {} }
    if (no !== routeNo) return;
    plYer = sonuc;
    $("plSay").textContent = sonuc.length ? TL(`Sana ${sonuc.length} yerlik bir gezi listesi gönderildi. Beğendiklerini kendi listene ekleyebilirsin.`, `Someone shared a list of ${sonuc.length} places with you. Add the ones you like to your own list.`) : "";
    $("plList").innerHTML = sonuc.length ? sonuc.map((p, i) => `<li><button class="row" data-pl="${i}">${thumb(p.f, p.k)}<span class="rt"><b>${esc(adi(p))}</b><small>${esc(altYazi(p))}</small></span><span class="km">${me ? fmt(km(me, p)) : OKIK}</span></button></li>`).join("") : `<li class="empty">${T("Bu listedeki yerler bulunamadı.")}</li>`;
    plDurum();
  }
  function plDurum() {
    const b = $("plEkle"), hepsi = plYer.length > 0 && plYer.every(favMi);
    b.hidden = !plYer.length; b.disabled = hepsi;
    b.querySelector("span").textContent = hepsi ? T("Hepsi listende") : T("Hepsini listeme ekle");
  }
  function plEkle() {
    const a = favs(); let n = 0;
    for (const p of plYer) if (!a.some((x) => ayni(x, p))) { a.push(favKayit(p)); n++; }
    favYaz(a); renderFav(); plDurum();
    toast(TL(`${n} yer listene eklendi.`, `${n} places added to your list.`));
  }
  // ---------- hafta sonu kaçamağı: arabayla 1,5-4 saatlik iller; bayram için 3-4 günlük, daha uzak ----------
  let kacGun = 1;
  function showKacamak(g) {
    kacGun = g === "3" ? 3 : 1;
    view = { mode: "kacamak" }; show("kacamak");
    $("eyebrow").textContent = T("Kısa tatil önerisi"); $("title").textContent = kacGun === 3 ? T("Bayram kaçamağı") : T("Hafta sonu kaçamağı");
    renderKacamak();
  }
  const sureYaz = (saat) => { const t = Math.round(saat * 6) * 10, s = Math.floor(t / 60), d = t % 60; return TL(`~${s ? s + " sa" : ""}${d ? " " + d + " dk" : ""}`, `~${s ? s + " h" : ""}${d ? " " + d + " min" : ""}`).replace("~ ", "~"); };
  function renderKacamak() {
    if (!view || view.mode !== "kacamak") return;
    document.querySelectorAll("#kacSure [data-g]").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.g === kacGun));
    let o = me, sonIl = null;
    if (!o) { try { sonIl = IDX.ilBy.get(localStorage.getItem("gezi-son-il") || ""); } catch (e) {} o = sonIl; }
    $("kacLoc").hidden = !!me;
    if (!o) { $("kacSay").textContent = T("Nereden yola çıkacağını bilmemiz gerek: konumunu aç ya da önce bir ilin sayfasına gir."); $("kacList").innerHTML = ""; return; }
    if (!ARA) { $("kacList").innerHTML = `<li class="empty">${T("Yükleniyor…")}</li>`; loadAra(); return; }
    const [a, b] = kacGun === 3 ? [260, 720] : [90, 270]; // kuş uçuşu km
    const adaylar = IDX.iller.map((il) => ({ il, k: km(o, il) })).filter((x) => x.k >= a && x.k <= b);
    // yer sayısı çok olan iller öne, her hafta farklı bir karışım
    const hafta = Math.floor(Date.now() / 6048e5);
    const puan = (x) => Math.log(1 + x.il.n) + ((Math.sin(hafta * 12.9898 + (+x.il.plaka) * 78.233) * 43758.5453) % 1 + 1) % 1 * 1.5;
    const r = adaylar.sort((x, y) => puan(y) - puan(x)).slice(0, 6).sort((x, y) => x.k - y.k);
    $("kacSay").textContent = TL(`${sonIl && !me ? sonIl.ad + " çıkışlı" : "Bulunduğun yerden"} ${kacGun === 3 ? "3-4 günlük tatile uygun" : "hafta sonuna uygun"} ${r.length} il. Süreler tahminidir, yol tarifinden kontrol et.`, `${r.length} provinces for a ${kacGun === 3 ? "3-4 day holiday" : "weekend"}${sonIl && !me ? " from " + sonIl.ad : " from where you are"}. Drive times are estimates.`);
    $("kacList").innerHTML = r.length ? r.map(({ il, k }) => {
      const ilY = ARA.filter((x) => x[2] === il.s), one = (ilY.some((x) => x[11]) ? ilY.filter((x) => x[11]) : ilY.filter((x) => x[8])).slice(0, 3).map(araAd);
      return `<li><button class="kackart" data-go="#/il/${il.s}">${thumb(il.f, "s", 500, "cover")}<span class="kacb"><b>${esc(il.ad)}</b><small>${ik("car-front", 14)} ${sureYaz((k * 1.25) / 80)} · ${il.n} ${TL("yer", "places")}</small>${one.length ? `<em>${one.map(esc).join(" · ")}</em>` : ""}</span></button></li>`;
    }).join("") : `<li class="empty">${T("Bu mesafede il bulunamadı.")}</li>`;
  }
  // ---------- "Nereye gitsem?": fotoğraflı kartlar; sağa kaydır listene ekle, sola kaydır geç ----------
  let kDeste = [], kNo = 0, kBegen = 0;
  const KGOR = "gezi-kart-gor";
  async function showKartlar() {
    view = { mode: "kartlar" }; show("kartlar");
    $("eyebrow").textContent = T("Keşfet"); $("title").textContent = T("Nereye gitsem?");
    $("kDeste").innerHTML = `<p class="tsay">${T("Yükleniyor…")}</p>`;
    await loadAra(); if (!ARA || !view || view.mode !== "kartlar") return;
    let a = ARA.filter((x) => x[11] && x[8]); if (a.length < 60) a = ARA.filter((x) => x[8]);
    if (me) { const y = a.filter((x) => km(me, { lat: x[4], lng: x[5] }) <= 400); if (y.length >= 20) a = y; }
    let gor = []; try { gor = JSON.parse(localStorage.getItem(KGOR)) || []; } catch (e) {}
    const G = new Set(gor), b = a.filter((x) => !G.has(x[2] + "|" + x[1]));
    a = b.length >= 10 ? b : a;
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    kDeste = a.slice(0, 25); kNo = 0; kBegen = 0;
    kartCiz();
  }
  function kartHtml(x, ust) {
    const il = (IDX.ilBy.get(x[2]) || {}).ad || "", c = CATS[x[6]] || CATS.t;
    return `<div class="kkart${ust ? " ust" : " alt"}" style="--c:${c.renk}">${icon(x[6] || "t", 40)}<img src="${foto({ p: x[8], w: 1e5 }, 960)}" alt="" draggable="false" onerror="fotoHata(this)"><span class="kdamga kev">${T("LİSTEME")}</span><span class="kdamga khayir">${T("GEÇ")}</span><div class="kalt"><small>${esc(c.ad)}</small><b>${esc(araAd(x))}</b><span>${ik("map-pin", 14)} ${esc(il)}${me ? " · " + fmt(km(me, { lat: x[4], lng: x[5] })) : ""}</span></div></div>`;
  }
  function kartCiz() {
    const k = $("kDeste"); $("kSay").textContent = kBegen ? TL(`${kBegen} yer listene eklendi`, `${kBegen} added to your list`) : "";
    $("kBtn").hidden = kNo >= kDeste.length;
    if (kNo >= kDeste.length) {
      k.innerHTML = `<div class="kbitti"><span class="bosik">${ik("sparkles", 30)}</span><b>${T("Bu turluk bu kadar!")}</b><p>${kBegen ? TL(`Beğendiğin ${kBegen} yer listende. Listende 2 yer olunca rotanı da çizeriz.`, `The ${kBegen} places you liked are in your list.`) : TL("Yeni kartlarla bir tur daha atabilirsin.", "Try another round with new cards.")}</p><div class="tbtn"><a class="btn" href="#/listem">${T("Listeme git")}</a><button class="btn primary" data-k="yeni">${T("Yeni kartlar")}</button></div></div>`;
      return;
    }
    k.innerHTML = kartHtml(kDeste[kNo + 1] || kDeste[kNo], false) + kartHtml(kDeste[kNo], true);
    if (!kDeste[kNo + 1]) k.querySelector(".kkart.alt").remove();
    kartSurukle(k.querySelector(".kkart.ust"));
  }
  function kartSurukle(el) {
    let x0 = 0, y0 = 0, dx = 0, dy = 0, basili = false;
    el.addEventListener("pointerdown", (e) => { basili = true; x0 = e.clientX; y0 = e.clientY; dx = dy = 0; try { el.setPointerCapture(e.pointerId); } catch (er) {} el.style.transition = "none"; });
    el.addEventListener("pointermove", (e) => {
      if (!basili) return; dx = e.clientX - x0; dy = e.clientY - y0;
      el.style.transform = `translate(${dx}px, ${dy * 0.25}px) rotate(${dx / 16}deg)`;
      el.style.setProperty("--ev", Math.max(0, Math.min(1, dx / 90))); el.style.setProperty("--hayir", Math.max(0, Math.min(1, -dx / 90)));
    });
    const birak = () => {
      if (!basili) return; basili = false; el.style.transition = "";
      if (dx > 90) kartKarar(true); else if (dx < -90) kartKarar(false);
      else { el.style.transform = ""; el.style.setProperty("--ev", 0); el.style.setProperty("--hayir", 0); if (Math.abs(dx) < 6 && Math.abs(dy) < 6) kartAc(); }
    };
    el.addEventListener("pointerup", birak); el.addEventListener("pointercancel", birak);
  }
  async function kartAc() { const x = kDeste[kNo]; if (!x) return; try { const d = await loadIl(x[2]); const p = d.yerler[x[3]]; if (p) openDetail(p); } catch (e) {} }
  async function kartKarar(begen) {
    const x = kDeste[kNo], el = $("kDeste").querySelector(".kkart.ust"); if (!x || !el || el.dataset.gitti) return;
    el.dataset.gitti = 1;
    el.style.setProperty(begen ? "--ev" : "--hayir", 1);
    el.style.transition = "transform .35s ease, opacity .35s ease"; el.style.transform = `translate(${begen ? 130 : -130}%, 20px) rotate(${begen ? 20 : -20}deg)`; el.style.opacity = 0;
    try { const g = JSON.parse(localStorage.getItem(KGOR)) || []; g.push(x[2] + "|" + x[1]); localStorage.setItem(KGOR, JSON.stringify(g.slice(-400))); } catch (e) {}
    kNo++;
    if (begen) {
      try { const d = await loadIl(x[2]); const p = d.yerler[x[3]]; if (p && !favMi(p)) { const a = favs(); a.unshift(favKayit(p)); favYaz(a); kBegen++; } } catch (e) {}
    }
    setTimeout(kartCiz, 280);
  }
  // ---------- "Hangi ilde?": fotoğrafa bak, ili tahmin et (10 soru) ----------
  const OYUN_EN = "gezi-oyun-en", OYUN_GOR = "gezi-oyun-gor", OYUN_SORU = 10;
  // İl merkezinin halk arasındaki adı da cevabı ele verir ("Antep Kalesi", "İzmit Saat Kulesi")
  const IL_TAKMA = { gaziantep: "antep", kahramanmaras: "maras", sanliurfa: "urfa", afyonkarahisar: "afyon", kocaeli: "izmit", sakarya: "adapazari", hatay: "antakya" };
  const OYUN_ALKIS = [["Bildin!", "Correct!"], ["Harika!", "Great!"], ["Tam isabet!", "Spot on!"], ["Süpersin!", "Nice one!"]];
  let oyun = null;
  const ilAdi = (s) => (IDX.ilBy.get(s) || {}).ad || s;
  const karistir = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const oyunAnahtar = (x) => x[2] + "|" + x[1];
  // Yerin Türkçe ya da İngilizce adında ilin adı kelime olarak geçiyor mu
  function adaIlGeciyor(x, s) {
    return [sade(ilAdi(s)), IL_TAKMA[s]].some((a) => a && new RegExp(`(^|[^a-z])${a}([^a-z]|$)`).test(x[0] + " / " + x[10]));
  }
  // Yanlış şıklar doğru ilin yakınından: ilk sorularda biraz daha geniş çevre, sonra komşu iller
  function oyunSik(x, no) {
    const il = IDX.ilBy.get(x[2]);
    const yakin = IDX.iller.filter((b) => b !== il && !adaIlGeciyor(x, b.s)).sort((a, b) => km(il, a) - km(il, b));
    return karistir([il.s, ...karistir(yakin.slice(0, no < 3 ? 14 : no < 7 ? 10 : 7)).slice(0, 3).map((b) => b.s)]);
  }
  function oyunKur() {
    let gor = []; try { gor = JSON.parse(localStorage.getItem(OYUN_GOR)) || []; } catch (e) {}
    const G = new Set(gor);
    // Öne çıkan yerler yeterliyse onlar; yoksa her ilin listesindeki ilk (en bilinen) fotoğraflı yerler
    let a = ARA.filter((x) => x[11] && x[8]);
    if (a.length < 60) a = ARA.filter((x) => x[7] === 1 && x[8] && x[3] < 6);
    const grup = new Map();
    for (const x of a) if (IDX.ilBy.has(x[2]) && !adaIlGeciyor(x, x[2])) { if (!grup.has(x[2])) grup.set(x[2], []); grup.get(x[2]).push(x); }
    // Her il eşit şansla gelir, bir oyunda bir kez; son oyunlarda görülmemiş yeri olan iller öne
    const yeniVar = (s) => (grup.get(s).some((y) => !G.has(oyunAnahtar(y))) ? 1 : 0);
    const iller = karistir([...grup.keys()]).sort((p, q) => yeniVar(q) - yeniVar(p)).slice(0, OYUN_SORU);
    const sorular = iller.map((s, i) => {
      const l = karistir(grup.get(s).slice()), x = l.find((y) => !G.has(oyunAnahtar(y))) || l[0];
      return { x, sik: oyunSik(x, i), cevap: "", p: null };
    });
    oyun = sorular.length ? { sorular, no: 0, puan: 0, seri: 0, bitti: false } : null;
  }
  async function showOyun() {
    view = { mode: "oyun" }; show("oyun");
    $("eyebrow").textContent = TL("Mini oyun", "Mini game"); $("title").textContent = T("Hangi ilde?");
    if (oyun) return oyunCiz(); // yarım kalan oyuna (ya da sonuca) geri dön
    $("oyunKutu").innerHTML = `<p class="tsay">${T("Yükleniyor…")}</p>`;
    await loadAra(); if (!view || view.mode !== "oyun") return;
    if (ARA) oyunKur();
    if (!oyun) { $("oyunKutu").innerHTML = `<p class="tsay">${TL("Sorular yüklenemedi. İnternet bağlantını kontrol edip", "Couldn't load the questions. Check your connection and")} <button class="linkbtn" data-k="tekrar">${TL("tekrar dene", "try again")}</button>.</p>`; return; }
    oyunCiz();
  }
  function oyunDurum() {
    const o = oyun, n = o.sorular.length;
    return `<span class="osayac">${TL("Soru", "Question")} <b>${Math.min(o.no + 1, n)}</b>/${n}</span>` +
      (o.seri >= 2 ? `<span class="oseri" title="${TL("Üst üste doğru", "In a row")}">${ik("flame", 15)}<b>${o.seri}</b></span>` : "") +
      `<span class="opuan">${ik("star", 15)}<b>${o.puan}</b> ${TL("puan", o.puan === 1 ? "point" : "points")}</span>`;
  }
  const oyunAdim = () => oyun.sorular.map((r, i) => `<li class="${r.cevap ? (r.cevap === r.x[2] ? "ok" : "no") : i === oyun.no ? "simdi" : ""}"></li>`).join("");
  function oyunCiz() {
    const o = oyun;
    if (o.bitti) return oyunSonuc();
    const r = o.sorular[o.no], x = r.x, c = CATS[x[6]] || CATS.t;
    $("oyunKutu").innerHTML = `<div class="odurum" id="oDurum">${oyunDurum()}</div><ol class="oadim" id="oAdim" aria-hidden="true">${oyunAdim()}</ol>
      <figure class="ofoto" style="--c:${c.renk}">${icon(x[6] || "t", 44)}<img src="${foto({ p: x[8], w: 1e5 }, 960)}" alt="" onload="this.classList.add('on')" onerror="fotoHata(this)"><figcaption class="oalt"><small>${esc(c.ad)}</small><b>${esc(araAd(x))}</b><span>${TL("Bu yer hangi ilde?", "Which province is it in?")}</span></figcaption></figure>
      <p class="okredi" id="oKredi"></p>
      <div class="osecenek" role="group" aria-label="${TL("Şıklar", "Choices")}">${r.sik.map((s) => `<button class="osik" data-il="${s}"><span>${esc(ilAdi(s))}</span></button>`).join("")}</div>
      <div id="oCevap"></div>`;
    if (r.cevap) oyunGoster(false);
    oyunYerYukle(r);
    // Sonraki sorunun fotoğrafı şimdiden insin
    const n = o.sorular[o.no + 1]; if (n) new Image().src = foto({ p: n.x[8], w: 1e5 }, 960);
  }
  function oyunCevap(s) {
    const o = oyun, r = o && !o.bitti && o.sorular[o.no]; if (!r || r.cevap) return;
    r.cevap = s;
    if (s === r.x[2]) { o.puan++; o.seri++; } else o.seri = 0;
    try { const g = JSON.parse(localStorage.getItem(OYUN_GOR)) || []; g.push(oyunAnahtar(r.x)); localStorage.setItem(OYUN_GOR, JSON.stringify(g.slice(-80))); } catch (e) {}
    oyunGoster(true);
  }
  // Cevap: doğru şık yeşil, yanlış seçim kırmızı; altta yerin ili, kısa bilgi ve "Sonraki"
  function oyunGoster(yeni) {
    const o = oyun, r = o.sorular[o.no], x = r.x, dogru = r.cevap === x[2], son = o.no === o.sorular.length - 1;
    for (const b of document.querySelectorAll("#oyunKutu .osik")) {
      const s = b.dataset.il; b.disabled = true;
      b.classList.add(s === x[2] ? "dogru" : s === r.cevap ? "yanlis" : "soluk");
      if (yeni) b.classList.add("anim");
      if (s === x[2] || s === r.cevap) b.insertAdjacentHTML("beforeend", ik(s === x[2] ? "check" : "x", 20));
    }
    $("oDurum").innerHTML = oyunDurum(); $("oAdim").innerHTML = oyunAdim();
    if (yeni && dogru) $("oDurum").querySelector(".opuan").classList.add("zipla");
    const il = IDX.ilBy.get(x[2]), sec = IDX.ilBy.get(r.cevap);
    const alkis = o.seri >= 3 ? TL(`${o.seri} doğru üst üste!`, `${o.seri} in a row!`) : TL(...OYUN_ALKIS[(o.no + o.puan) % OYUN_ALKIS.length]);
    const uzak = sec ? nf(Math.round(km(il, sec))) + " km" : "";
    $("oCevap").innerHTML = `<div class="ocevap ${dogru ? "ok" : "no"}${yeni ? " yeni" : ""}" role="status">
      <b class="obas">${ik(dogru ? "circle-check" : "x", 22)}<span>${dogru ? alkis : TL("Olmadı", "Not quite")}</span></b>
      <p class="oyerad"><b>${esc(araAd(x))}</b> <span id="oYerIl">${esc(il.ad)}</span></p>
      <p class="onot" id="oNot" hidden></p>
      ${dogru || !sec ? "" : `<p class="onot">${TL(`Tahminin ${esc(sec.ad)}, kuş uçuşu ${uzak} ötede.`, `Your guess, ${esc(sec.ad)}, is ${uzak} away as the crow flies.`)}</p>`}
      <div class="obtn"><a class="btn" id="oAc" href="#/il/${x[2]}" data-oac="${o.no}">${TL("Bu yeri aç", "Open place")}</a><button class="btn primary" data-k="sonraki">${son ? TL("Sonucu gör", "See result") : TL("Sonraki", "Next")}${ik("chevron-right", 18)}</button></div></div>`;
    oyunDetay(r);
    if (!yeni) return;
    $("oCevap").querySelector("[data-k=sonraki]").focus({ preventScroll: true });
    // Küçük ekranda cevap kutusu alt menünün altında kalmasın
    const alt = $("oCevap").getBoundingClientRect().bottom, sinir = innerHeight - $("tabbar").offsetHeight - 12;
    if (alt > sinir) window.scrollBy({ top: alt - sinir, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  // İl verisi gelince: ilçe, kısa açıklama (Wikidata), fotoğraf atfı ve yerin bağlantısı
  async function oyunYerYukle(r) {
    if (!r.p) {
      try { const d = await loadIl(r.x[2]), y = d.yerler[r.x[3]]; r.p = y && y.ad === r.x[1] ? y : d.yerler.find((z) => z.ad === r.x[1]) || null; } catch (e) { return null; }
    }
    if (view && view.mode === "oyun") oyunDetay(r);
    return r.p;
  }
  function oyunDetay(r) {
    const p = r.p; if (!p || !oyun || oyun.sorular[oyun.no] !== r) return;
    const kr = $("oKredi"); if (kr && p.f && p.f.p === r.x[8]) kr.innerHTML = fotoAtif(p.f);
    // İlçe adı yerin adında zaten geçiyorsa tekrar yazma ("Mudurnu · Mudurnu, Bolu" olmasın)
    const il = $("oYerIl"); if (il && p.ilce && p.ilce !== p.il && !sade(p.ad).includes(sade(p.ilce))) il.textContent = `${p.ilce}, ${p.il}`;
    // Wikidata açıklaması bazen İngilizce kalmış ("castle in Muş, eastern Turkey"): onları gösterme
    const not = $("oNot"); if (not && DIL !== "en" && p.ac && !/(^|[\s(])(in|of|the|and|located|former|building|complex|village|lake|castle|church|beach|province|turkey)(?=[\s,.)]|$)/i.test(p.ac)) { not.textContent = p.ac.charAt(0).toLocaleUpperCase("tr") + p.ac.slice(1) + (/[.!?]$/.test(p.ac) ? "" : "."); not.hidden = false; }
    const a = $("oAc"); if (a && p.q) a.href = `#/il/${p.ilS}/yer/${p.q}`;
  }
  // Yer oyunun üstünde açılır; kapatınca oyun kaldığı yerden sürer
  async function oyunYerAc(i) {
    const r = oyun && oyun.sorular[i]; if (!r) return;
    const p = await oyunYerYukle(r);
    if (p) openDetail(p); else git(`#/il/${r.x[2]}`);
  }
  function oyunSonraki() {
    const o = oyun; if (!o || o.bitti || !o.sorular[o.no].cevap) return;
    o.no++;
    if (o.no >= o.sorular.length) oyunBitir();
    oyunCiz(); window.scrollTo(0, 0);
  }
  function oyunBitir() {
    const o = oyun; o.bitti = true; o.yeni = true;
    let en = null; try { en = localStorage.getItem(OYUN_EN); } catch (e) {}
    o.rekor = en != null && o.puan > +en; o.enIyi = Math.max(+en || 0, o.puan);
    if (en == null || o.puan > +en) try { localStorage.setItem(OYUN_EN, String(o.puan)); } catch (e) {}
    oyunRekorYaz();
  }
  // Puana göre unvan (10 soru üzerinden)
  function oyunUnvan(p, n) {
    const o = n ? (p * 10) / n : 0;
    if (o >= 9) return { ik: "crown", ad: TL("Türkiye uzmanı", "Türkiye expert"), not: TL("Muhteşem! Haritayı avucunun içi gibi biliyorsun.", "Amazing! You know the map like the back of your hand."), altin: 1 };
    if (o >= 7) return { ik: "compass", ad: T("Kâşif"), not: TL("Harika! Türkiye'nin dört bir yanını tanıyorsun.", "Great! You know every corner of Türkiye."), altin: 1 };
    if (o >= 4) return { ik: "backpack", ad: T("Gezgin"), not: TL("Fena değil! Birkaç tur daha atınca kâşif olursun.", "Not bad! A few more rounds and you'll be an explorer.") };
    return { ik: "footprints", ad: TL("Yola yeni çıktın", "Just setting off"), not: TL("Her büyük yolculuk ilk adımla başlar. Bir tur daha?", "Every great journey starts with a first step. Another round?") };
  }
  function oyunSonuc() {
    const o = oyun, n = o.sorular.length, u = oyunUnvan(o.puan, n);
    $("oyunKutu").innerHTML = `<div class="osonuc${o.yeni ? " yeni" : ""}"><div class="temo${u.altin ? " altin" : ""}">${ik(u.ik, 36)}</div>
      <small class="oetiket">${TL("Sonucun", "Your score")}</small><b class="oskor">${o.puan}<span>/${n}</span></b>
      <h2>${u.ad}</h2><p>${u.not}</p><ol class="oadim" aria-hidden="true">${oyunAdim()}</ol>
      <p class="oenl">${ik("trophy", 16)} ${o.rekor ? TL("Yeni rekor!", "New best score!") : TL(`En iyi skorun: ${o.enIyi}/${n}`, `Your best: ${o.enIyi}/${n}`)}</p>
      <div class="obtn"><button class="btn primary" data-k="tekrar">${ik("shuffle", 18)} ${TL("Tekrar oyna", "Play again")}</button><button class="btn" data-k="paylas">${ik("share-2", 18)} ${TL("Skorumu paylaş", "Share my score")}</button></div></div>
      <h2 class="sec">${TL("Bu turdaki yerler", "Places in this round")}</h2>
      <p class="tsay">${TL("Birine dokun, ayrıntısına bak; beğendiğini listene ekle.", "Tap one for details and save the ones you like.")}</p>
      <div class="oyerler">${o.sorular.map((r, i) => `<a class="oyer${r.cevap === r.x[2] ? "" : " no"}" href="#/il/${r.x[2]}" data-oac="${i}">${thumb({ p: r.x[8], w: 1e5 }, r.x[6], 500)}<i class="oisaret">${ik(r.cevap === r.x[2] ? "check" : "x", 14)}</i><b>${esc(araAd(r.x))}</b><small>${esc(ilAdi(r.x[2]))}</small></a>`).join("")}</div>`;
    o.yeni = false;
  }
  function oyunPaylas() {
    const o = oyun; if (!o || !o.bitti) return;
    const n = o.sorular.length, u = oyunUnvan(o.puan, n), kare = o.sorular.map((r) => (r.cevap === r.x[2] ? "🟩" : "🟥")).join("");
    metinPaylas(T("Hangi ilde?"), TL(`Rota Cepte'nin "Hangi ilde?" oyununda ${n} sorudan ${o.puan} doğru yaptım: ${u.ad}!\n${kare}\nSen kaç yaparsın?`, `I got ${o.puan}/${n} in the "Which province?" quiz on Rota Cepte: ${u.ad}!\n${kare}\nCan you beat me?`), ANDROID ? PLAY : SITE + "#/oyun");
  }
  // Ana sayfadaki düğmede en iyi skor
  function oyunRekorYaz() {
    let en = null; try { en = localStorage.getItem(OYUN_EN); } catch (e) {}
    if (en != null) $("oyunSub").textContent = TL(`En iyi skorun ${en}/${OYUN_SORU}. Rekorunu geçebilir misin?`, `Your best is ${en}/${OYUN_SORU}. Can you beat it?`);
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
    if (document.querySelector(".tanit")) { setTimeout(tanitim, 4000); return; }
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
  // ---------- güncellemeden sonra bir kez: bu sürümde yeni neler var ----------
  let ESKI = false; try { ESKI = !!localStorage.getItem("gezi-tanitim"); } catch (e) {}
  // zorla: ana sayfadaki "Bu sürümde neler yeni?" düğmesinden, istendiği zaman açılır
  function yenilikler(dene, zorla) {
    if (!zorla) {
      try { if (localStorage.getItem("gezi-yenilik") === SURUM) return; if (!ESKI) { localStorage.setItem("gezi-yenilik", SURUM); return; } } catch (e) { return; }
      if (document.querySelector(".tanit") || !$("sheet").hidden) { if ((dene || 0) < 5) setTimeout(() => yenilikler((dene || 0) + 1), 15000); return; }
    }
    let son = "istanbul"; try { son = localStorage.getItem("gezi-son-il") || son; } catch (e) {}
    // Her madde bir öğretici: dokununca o özellik açılır. Rotası olmayan madde yalnızca bilgi.
    const s = [
      ["footprints", TL("Atatürk'ün izinde", "In Atatürk's footsteps"), TL("1915 Çanakkale'den Anıtkabir'e 16 durak: Millî Mücadele'nin ve Cumhuriyet'in yerlerini tarih sırasıyla gez.", "16 stops from Gallipoli 1915 to Anıtkabir: visit the places of the War of Independence and the Republic in order."), "#/ataturk"],
      ["stamp", TL("Yeni gezi pasaportu", "New travel passport"), TL("Her il için bir damga, bölge bölge sayfalar ve Yeni yolcu'dan Evliya Çelebi'ye unvanlar. Bir yerde \"Buraya gittim\" de, damgan basılsın.", "A stamp for every province, region pages and titles from New traveller to Evliya Çelebi. Tap \"I've been here\" on a place to get your stamp."), "#/rozetler"],
      ["binoculars", TL("Hangi ilde?", "Which province?"), TL("Fotoğrafa bak, hangi ilde olduğunu tahmin et. 10 soruda kaç puan alacaksın?", "Look at a photo and guess the province. How many of 10 can you get?"), "#/oyun"],
      ["sparkles", TL("Sana özel", "For you"), TL("Beğendiğin ve gittiğin yerlere göre her gün yeni öneriler; her ayın en güzel yerleri de ana sayfada.", "New picks every day based on the places you liked and visited; each month's best places are on the home screen too."), ""],
      ["star", TL("Puan ve not", "Ratings and notes"), TL("Gittiğin yerlere yıldız ver, kendine not bırak; en sevdiklerin Gezilerim'de toplanır.", "Rate the places you visited and leave yourself a note; your favourites gather in My trips."), "#/rozetler"],
      ["cloud-sun", TL("Canlı hava ve altın saat", "Live weather and golden hour"), TL("Hava durumu anlık güncellenir. Fotoğraf için en güzel ışığın saati, gün batımı ve havaya göre öneriler il sayfasında.", "The weather updates live. The best light for photos, sunset times and weather-smart tips are on each province page."), `#/il/${son}`],
      ["camera", TL("Fotoğraflı paylaşım", "Photo sharing"), TL("Bir yeri fotoğraflı kartla paylaş; bayramlarda ve özel günlerde o güne özel çizilmiş tebrik kartı gönder.", "Share a place as a photo card, and send greeting cards drawn for each holiday and special day."), ""],
      ["flag", TL("Özel günler", "Special days"), TL("Millî bayramlarda kaçıncı yıl olduğunu, kandillerde ve bayramlarda tebrik mesajını ana sayfada görürsün. 10 Kasım'da saygı kartı açılır, uygulama gün boyu yas renklerine bürünür. Saat 09.05'te anma bildirimi gelir; uygulama açıksa bir dakikalık saygı duruşu sayacı başlar.", "National days show their anniversary, and religious holidays a greeting, on the home screen. On 10 November a remembrance card opens and the app turns to mourning colours for the day. At 9:05 am a notification arrives, and if the app is open a one-minute silence begins."), ""],
      ["car-front", TL("Yol üstü keşif", "Along the way"), TL("Yola çıkarken iki il seç; yol boyunca uğrayabileceğin yerleri ve mola önerilerini sırayla gösterelim.", "Pick two provinces before a road trip; we'll list the stops along the way and suggest breaks."), "#/yol"],
      ["shuffle", T("Nereye gitsem?"), TL("Fotoğraflı kartları kaydır: sağa kaydırdığın yer listene girer, sola kaydırdığını geçeriz.", "Swipe photo cards: right to save a place, left to skip."), "#/kartlar"],
      ["calendar-days", T("Hafta sonu kaçamağı"), TL("Arabayla birkaç saatlik illeri öneririz; bayramda 3-4 günlük rotalar.", "Provinces a few hours' drive away; longer trips for holidays."), "#/kacamak"],
      ["target", TL("Şans çarkı", "Luck wheel"), TL("Karar veremedin mi? Çarkı çevir, gideceğin il çıksın.", "Can't decide? Spin the wheel and let it pick a province."), "#/cark"],
      ["share-2", TL("Listeni linkle paylaş", "Share your list"), TL("Listem sekmesinde \"Listeyi linkle paylaş\": arkadaşın tek dokunuşla kendi listesine ekler.", "In My list, tap \"Share list as a link\": friends add it to theirs in one tap."), "#/listem"],
      ["mountain", TL("Daha güzel fotoğraflar", "Better photos"), TL("İl kapakları yenilendi; yanlış fotoğraflar ve gezilecek bir şeyi olmayan yerler çıkarıldı.", "New province covers; wrong photos and places with nothing to see were removed."), ""],
    ];
    const d = document.createElement("div"); d.className = "tanit";
    d.innerHTML = `<div class="tkart yenilik"><div class="temo altin">${ik("sparkles", 36)}</div><h2>${TL(`Sürüm ${SURUM}'te yeni`, `New in version ${SURUM}`)}</h2><p class="yalt">${TL("Denemek için birine dokun.", "Tap one to try it.")}</p><ul class="ylist">${s.map((x) => x[3] ? `<li><button class="ybtn" data-r="${x[3]}"><i>${ik(x[0], 22)}</i><span><b>${x[1]}</b><small>${x[2]}</small></span>${ik("chevron-right", 18)}</button></li>` : `<li><i>${ik(x[0], 22)}</i><span><b>${x[1]}</b><small>${x[2]}</small></span></li>`).join("")}</ul><div class="tbtn"><button class="linkbtn" data-k="kapat">${T("Kapat")}</button><button class="btn primary" data-k="dene">${ik("car-front", 18)} ${TL("Yol üstü keşfi dene", "Try Along the way")}</button></div></div>`;
    const kapat = () => { try { localStorage.setItem("gezi-yenilik", SURUM); } catch (e) {} d.classList.add("out"); setTimeout(() => d.remove(), 300); };
    d.addEventListener("click", (e) => {
      const k = e.target.closest("[data-k]"), r = e.target.closest("[data-r]"); if (e.target !== d && !k && !r) return;
      if (r) { kapat(); git(r.dataset.r); return; }
      kapat(); if (k && k.dataset.k === "dene") git("#/yol");
    });
    document.body.appendChild(d);
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
      // Öne çıkan (gezmeye değer) yerler varsa onlardan seç: ana sayfanın en büyük fotoğrafı höyük ya da semt olmasın
      const one = aday.filter((x) => x[11]); if (one.length >= (me ? 3 : 30)) aday = one;
      const x = aday[Math.floor(Math.random() * aday.length)]; if (!x) return;
      const d = await loadIl(x[2]); const p = d.yerler[x[3]]; if (!p) return;
      const k = foto(p.f, 960), k2 = foto(p.f, 500);
      const yer = esc([...new Set([p.ilce, p.il].filter(Boolean))].join(", "));
      $("gunun").innerHTML = `<button class="gunun" data-go="#/il/${d.s}/yer/${p.q}">${k ? `<img src="${k}" alt="" onerror="if(this.dataset.y){this.remove()}else{this.dataset.y=1;this.src='${k2}'}">` : ""}<span class="gtxt"><small>${me ? T("Yakınında keşfet") + " · " + fmt(km(me, p)) : T("Bugün keşfet")}</small><b>${esc(adi(p))}</b><span>${yer}</span></span></button>`;
    } catch (e) { kesifYuk = false; }
  }
  // ---------- gezi haritası: ilçelerini gezdikçe il boyanır ----------
  let HARITA = null, haritaSoz = null, HARITA_ORAN = new Map(), HARITA_KUTU = [0, 0, 1020, 456];
  async function renderHarita() {
    const kutu = $("gezHarita"); if (!kutu || !IDX) return;
    try {
      if (!HARITA) { haritaSoz = haritaSoz || getJSON("tr-harita.json?v=3"); HARITA = await haritaSoz; }
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
      kutu.innerHTML = `<svg viewBox="0 0 1020 456" class="trh" role="img" aria-label="${T("Gezi haritan")}">${yollar}</svg>
        <div class="hleg"><span><i style="background:var(--hbos)"></i>${T("Gitmedin")}</span><span><i style="background:color-mix(in srgb,var(--gez-yari) 45%,var(--hbos))"></i>${T("Başladın")}</span><span><i style="background:var(--gez-tam)"></i>${T("Tüm ilçeler")}</span></div>
        <p class="hnot">${a.length ? TL(`${ilBy.size} ile gittin${tam ? `, ${tam} ilin tüm ilçelerini gezdin` : ""}. Bir ilin ilçelerini gezdikçe rengi koyulaşır.`, `You've been to ${ilBy.size} provinces${tam ? `, all districts of ${tam}` : ""}. A province gets darker as you visit its districts.`) : TL(`Bir yere "Buraya gittim" dediğinde o il haritada yeşile boyanmaya başlar. İlçelerini gezdikçe rengi koyulaşır.`, `Tap "I've been here" on a place and its province turns green on the map. It gets darker as you visit its districts.`)}</p>`;
      try { const sv = kutu.querySelector("svg"), b = sv.getBBox(); if (b.width) { sv.setAttribute("viewBox", `${b.x - 4} ${b.y - 4} ${b.width + 8} ${b.height + 8}`); HARITA_KUTU = [b.x, b.y, b.width, b.height]; } } catch (e) {}
    } catch (e) {}
  }
  // ---------- gezi karnem: paylaşılabilir görsel ----------
  async function karne() {
    const a = gittiklerim(); if (!a.length) return;
    await renderHarita();
    try { await document.fonts.load("800 40px Manrope", "Rota ĞğŞşİıÇçÖöÜü"); } catch (e) {}
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
    g.fillStyle = "#f5b544"; sigdir(g, T("Yol senin, rotan cepte!"), W / 2, 1770, W - 100, (px) => F(800, px), 50);
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
      gorselPaylas(url, "gezi-karnem.png", metin);
    });
    document.body.appendChild(d);
  }
  // Yazıyı genişliğe sığdır (İngilizce slogan uzun)
  function sigdir(g, metin, x, y, en, font, px) { g.font = font(px); while (px > 24 && g.measureText(metin).width > en) { px -= 2; g.font = font(px); } g.fillText(metin, x, y); }
  // ---------- yılın özeti: Aralık ve Ocak'ta "Gezilerim"de çıkar, hikâye boyutunda paylaşılır ----------
  const ozetYili = () => { const n = new Date(); return n.getMonth() === 0 ? n.getFullYear() - 1 : n.getFullYear(); };
  const ozetZamani = () => { const m = new Date().getMonth(); return m === 11 || m === 0; };
  const yilGezi = (y) => gittiklerim().filter((x) => x.t && new Date(x.t).getFullYear() === y);
  async function yilOzeti(yil) {
    const Y = yil || ozetYili(), a = yilGezi(Y);
    if (!a.length) { toast(TL(`${Y} yılında işaretlediğin bir gezi yok. "Buraya gittim" dediğin yerler burada özetlenir.`, `No trips marked in ${Y}. Places you mark as visited are summarised here.`), 5000); return; }
    try { await document.fonts.load("800 40px Manrope", "Rota ĞğŞşİıÇçÖöÜü"); } catch (e) {}
    const say = new Map(); for (const x of a) say.set(x.s, (say.get(x.s) || 0) + 1);
    const enCok = [...say.entries()].sort((p, q) => q[1] - p[1])[0], enIl = IDX.ilBy.get(enCok[0]);
    const bolgeler = new Set(a.map((x) => IL_BOLGE.get(x.s)).filter(Boolean));
    const sira = a.slice().sort((p, q) => p.t - q.t), ilk = sira[0], son = sira[sira.length - 1];
    const kat = new Map(); for (const x of a) kat.set(x.k, (kat.get(x.k) || 0) + 1);
    const W = 1080, H = 1920, c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"), F = (w, px) => `${w} ${px}px Manrope, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
    const bg = g.createLinearGradient(0, 0, W * 0.3, H); bg.addColorStop(0, "#2a1650"); bg.addColorStop(0.55, "#7a2346"); bg.addColorStop(1, "#d0551f");
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    const isik = g.createRadialGradient(W * 0.15, 260, 0, W * 0.15, 260, 640); isik.addColorStop(0, "rgba(245,181,68,.32)"); isik.addColorStop(1, "rgba(245,181,68,0)");
    g.fillStyle = isik; g.fillRect(0, 0, W, H);
    g.textAlign = "center"; g.fillStyle = "rgba(255,255,255,.85)"; g.font = F(800, 40); g.fillText("ROTA CEPTE", W / 2, 130);
    g.fillStyle = "#f5b544"; g.font = F(800, 250); g.fillText(String(Y), W / 2, 380);
    g.fillStyle = "#fff"; g.font = F(800, 74); g.fillText(TL("gezi özetim", "my year in travel"), W / 2, 480);
    const kutu = (x, sayi, yazi) => {
      g.fillStyle = "rgba(255,255,255,.12)"; g.beginPath(); g.roundRect(x - 230, 560, 460, 240, 40); g.fill();
      g.fillStyle = "#fff"; g.font = F(800, 120); g.fillText(sayi, x, 700); g.font = F(600, 40); g.fillStyle = "rgba(255,255,255,.85)"; g.fillText(yazi, x, 765);
    };
    kutu(W / 2 - 250, String(say.size), TL("il gezdim", say.size === 1 ? "province" : "provinces"));
    kutu(W / 2 + 250, String(a.length), TL("yer gördüm", a.length === 1 ? "place" : "places"));
    const satir = (y, e, ust, alt) => {
      g.textAlign = "left"; g.font = F(400, 60); g.fillStyle = "#fff"; g.fillText(e, 110, y + 18);
      g.font = F(600, 34); g.fillStyle = "rgba(255,255,255,.75)"; g.fillText(ust, 210, y - 14);
      g.font = F(800, 46); g.fillStyle = "#fff"; let m = alt; while (g.measureText(m).width > 760 && m.length > 4) m = m.slice(0, -2); g.fillText(m === alt ? m : m + "…", 210, y + 40);
      g.textAlign = "center";
    };
    const tarih = (t) => new Date(t).toLocaleDateString(DIL === "en" ? "en-GB" : "tr-TR", { day: "numeric", month: "long" });
    satir(920, "🏆", TL("En çok gezdiğim il", "Most visited province"), `${enIl ? enIl.ad : enCok[0]} · ${enCok[1]} ${TL("yer", enCok[1] === 1 ? "place" : "places")}`);
    satir(1060, "🧭", TL("Gördüğüm bölgeler", "Regions explored"), TL(`7 bölgenin ${bolgeler.size}${["", "'i", "'si", "'ü", "'ü", "'i", "'sı", "'si"][bolgeler.size] || ""}`, `${bolgeler.size} of 7 regions`));
    satir(1200, "🚩", TL("Yılın ilk durağı", "First stop of the year"), `${ilk.ad} · ${tarih(ilk.t)}`);
    satir(1340, "🏁", TL("Yılın son durağı", "Latest stop"), `${son.ad} · ${tarih(son.t)}`);
    // kategori çubukları
    const kl = [...kat.entries()].filter(([k]) => CATS[k]).sort((p, q) => q[1] - p[1]).slice(0, 4);
    let y = 1460; const renk = { t: "#5b8def", d: "#3cc27a", m: "#f5b544", c: "#ff8a5c", s: "#c084fc" };
    for (const [k, n] of kl) {
      const o = n / a.length; g.textAlign = "left"; g.font = F(700, 32); g.fillStyle = "#fff"; g.fillText(CATS[k].ad, 110, y);
      g.textAlign = "right"; g.fillText(`%${Math.round(o * 100)}`.replace(/^%(\d+)$/, DIL === "en" ? "$1%" : "%$1"), W - 110, y);
      g.fillStyle = "rgba(255,255,255,.15)"; g.beginPath(); g.roundRect(110, y + 14, W - 220, 16, 8); g.fill();
      g.fillStyle = renk[k] || "#fff"; g.beginPath(); g.roundRect(110, y + 14, Math.max(16, (W - 220) * o), 16, 8); g.fill();
      y += 70;
    }
    g.textAlign = "center"; g.fillStyle = "#f5b544"; sigdir(g, T("Yol senin, rotan cepte!"), W / 2, 1790, W - 100, (px) => F(800, px), 50);
    g.fillStyle = "rgba(255,255,255,.8)"; g.font = F(600, 36); g.fillText(TL("Sen de gez: me7rt.github.io/Rota-Cepte", "Explore too: me7rt.github.io/Rota-Cepte"), W / 2, 1850);
    const url = c.toDataURL("image/png");
    const d = document.createElement("div"); d.className = "tanit";
    d.innerHTML = `<div class="tkart karnek"><img src="${url}" alt=""><div class="tbtn"><button class="linkbtn" data-k="kapat">${T("Kapat")}</button><button class="btn primary" data-k="paylas">${ik("share-2", 18)} ${TL("Paylaş", "Share")}</button></div></div>`;
    const kapat = () => { d.classList.add("out"); setTimeout(() => d.remove(), 300); };
    d.addEventListener("click", (e) => {
      if (e.target === d || e.target.closest("[data-k=kapat]")) return kapat();
      if (e.target.closest("[data-k=paylas]")) gorselPaylas(url, `gezi-ozetim-${Y}.png`, TL(`${Y}'de ${say.size} il, ${a.length} yer gezdim! Senin yılın nasıldı? Rota Cepte: https://me7rt.github.io/Rota-Cepte/`, `In ${Y} I explored ${say.size} provinces and ${a.length} places in Türkiye! https://me7rt.github.io/Rota-Cepte/`));
    });
    document.body.appendChild(d);
  }
  function ozetBtn() {
    const b = $("ozetBtn"), Y = ozetYili();
    b.hidden = !(ozetZamani() && yilGezi(Y).length);
    b.querySelector("span").textContent = TL(`${Y} gezi özetin hazır`, `Your ${Y} travel recap is ready`);
  }
  // Görseli paylaş: uygulamada Android paylaşım menüsü, tarayıcıda Web Share, olmazsa indir
  async function gorselPaylas(url, ad, metin) {
    const P = window.Capacitor && window.Capacitor.Plugins;
    try {
      if (P && P.Share && P.Filesystem) {
        const yaz = await P.Filesystem.writeFile({ path: ad, data: url.split(",")[1], directory: "CACHE" });
        await P.Share.share({ title: "Rota Cepte", text: metin, files: [yaz.uri] });
        return;
      }
      const blob = await (await fetch(url)).blob(), dosya = new File([blob], ad, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [dosya] })) { await navigator.share({ files: [dosya], text: metin }); return; }
      const l = document.createElement("a"); l.href = url; l.download = ad; document.body.appendChild(l); l.click(); l.remove();
      toast(TL("Görsel indirildi. Galeriden paylaşabilirsin.", "Image saved. You can share it from your gallery."));
    } catch (err) { if (err && err.name !== "AbortError") toast(TL("Paylaşılamadı. Görsele basılı tutup kaydedebilirsin.", "Couldn't share. Long-press the image to save it.")); }
  }
  // ---------- paylaş ----------
  function paylas(p) {
    const url = `https://me7rt.github.io/Rota-Cepte/#/il/${p.ilS}/yer/${p.q}`;
    const yer = [...new Set([p.ilce, p.il].filter(Boolean))].join(", ");
    const metin = TL(`${p.ad} (${yer}) çok güzel bir yer, Rota Cepte uygulamasında buldum:`, `${adi(p)} (${yer}, Türkiye) is a beautiful place, I found it on Rota Cepte:`);
    if (navigator.share) navigator.share({ title: adi(p), text: metin, url }).catch(() => {});
    else window.open("https://wa.me/?text=" + encodeURIComponent(metin + " " + url), "_blank");
  }
  // ---------- v6.5 paylaşım görselleri: özel gün kartı ve fotoğraflı yer kartı (1080x1350) ----------
  const PF = (w, px) => `${w} ${px}px Manrope, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
  // Manrope iki dosyadır: ğ, ş, İ ayrı parçada. İkisi de yüklenmeden çizilirse bu harfler başka yazı tipiyle çıkar
  async function yaziTipiHazir() { try { await document.fonts.load("800 40px Manrope", "Rota ĞğŞşİı"); } catch (e) {} }
  const harfAra = (g, px) => { try { g.letterSpacing = px + "px"; } catch (e) {} };
  function resimYukle(src, ms, cors) {
    return new Promise((ok, hata) => {
      const im = new Image(); if (cors) im.crossOrigin = "anonymous";
      const t = setTimeout(() => { im.onload = im.onerror = null; hata(new Error("zaman aşımı")); }, ms);
      im.onload = () => { clearTimeout(t); ok(im); };
      im.onerror = () => { clearTimeout(t); hata(new Error("yüklenemedi")); };
      im.src = src;
    });
  }
  function sar(g, metin, en) {
    const s = [];
    for (const k of metin.split(/\s+/).filter(Boolean)) {
      const yeni = s.length ? s[s.length - 1] + " " + k : k;
      if (s.length && g.measureText(yeni).width <= en) s[s.length - 1] = yeni; else s.push(k);
    }
    return s;
  }
  // En çok `max` satır: sığmazsa küçült, en küçükte de sığmazsa "…" ile bitir. Ortalı yazıda satır boyları dengelenir (tek kelime kalmasın)
  function satirla(g, metin, en, font, px, min, max, dengesiz) {
    let s;
    for (; ; px -= 2) { g.font = font(px); s = sar(g, metin, en); if ((s.length <= max && s.every((x) => g.measureText(x).width <= en)) || px <= min) break; }
    if (s.length > max) {
      s = s.slice(0, max); let x = s[max - 1];
      while (x.length > 1 && g.measureText(x + "…").width > en) x = x.slice(0, -1);
      s[max - 1] = x.replace(/[\s,.;:·–-]+$/, "") + "…";
    } else if (s.length > 1 && !dengesiz) {
      let a = en / 2, b = en;
      while (b - a > 3) { const m = (a + b) / 2; if (sar(g, metin, m).length <= s.length) b = m; else a = m; }
      s = sar(g, metin, b);
    }
    return { s, px };
  }
  // Yazı bloğu { h, ciz(y) }: y bloğun üst kenarı
  function blok(g, metin, o) {
    const r = satirla(g, metin, o.en, o.font, o.px, o.min || o.px, o.max || 3), L = Math.round(r.px * (o.lh || 1.24));
    return { h: r.s.length * L, ciz: (y) => { g.font = o.font(r.px); g.fillStyle = o.renk; r.s.forEach((t, i) => g.fillText(t, o.x, y + L * i + L / 2)); } };
  }
  // Harf aralıklı büyük harf tarih satırı ("29 EKİM 1923 – 2026")
  const tarihSatiri = (g, W, metin, renk, px) => ({ h: 40, ciz: (y) => { g.font = PF(800, px); g.fillStyle = renk; harfAra(g, 7); g.fillText(metin, W / 2, y + 20); harfAra(g, 0); } });
  // Blokları alana dikey ortala (sayılar boşluk)
  function diz(liste, ust, alt) {
    const top = liste.reduce((a, b) => a + (typeof b === "number" ? b : b.h), 0);
    let y = ust + Math.max(0, (alt - ust - top) / 2);
    for (const b of liste) { if (typeof b === "number") y += b; else { b.ciz(y); y += b.h; } }
  }
  // "Başlık! Devamı." -> ["Başlık!", "Devamı."] ("103. yılı" gibi sayıdan sonraki nokta cümle sonu sayılmaz)
  const bol = (m) => { const x = /^(.+?[^\d\s][.!?])\s+(.+)$/.exec(m); return x ? [x[1], x[2]] : [m, ""]; };
  const buyuk = (s) => s.toLocaleUpperCase(DIL === "en" ? "en" : "tr");
  const LOC = () => (DIL === "en" ? "en-GB" : "tr-TR");
  // Alt imza: ikon + Rota Cepte, slogan, adres
  function imza(g, W, y, ikon, renk, vurgu, soluk) {
    const IK = ikon ? 60 : 0, ARA = IK ? 18 : 0;
    g.font = PF(800, 36); const w = g.measureText("Rota Cepte").width, x0 = (W - IK - ARA - w) / 2;
    if (IK) { g.save(); g.beginPath(); g.roundRect(x0, y - IK / 2, IK, IK, 15); g.clip(); g.drawImage(ikon, x0, y - IK / 2, IK, IK); g.restore(); }
    g.textAlign = "left"; g.fillStyle = renk; g.fillText("Rota Cepte", x0 + IK + ARA, y + 1);
    g.textAlign = "center"; g.fillStyle = vurgu; sigdir(g, T("Yol senin, rotan cepte!"), W / 2, y + 56, W - 200, (px) => PF(700, px), 29);
    g.fillStyle = soluk; g.font = PF(600, 25); g.fillText("me7rt.github.io/Rota-Cepte", W / 2, y + 93);
  }
  // Ay-yıldız, Türk Bayrağı Kanunu oranlarıyla (G: bayrak eni). Ayın dış dairesi 0,5G, iç dairesi 0,4G çaplı ve 1/16G içeride;
  // yıldız 0,25G çaplı daireye çizilir, bu daire ayın iç dairesinden 1/3G uzaktadır, bir ucu aya bakar. (x, y): grubun ortası
  function ayYildiz(g, x, y, G, renk) {
    const r1 = G / 4, r2 = G / 5, d = G / 16, R = G / 8, ys = d - r2 + G / 3 + R;
    const cx = x - (ys + R - r1) / 2;
    const ix = (d * d + r1 * r1 - r2 * r2) / (2 * d), iy = Math.sqrt(r1 * r1 - ix * ix), a1 = Math.atan2(iy, ix), a2 = Math.atan2(iy, ix - d);
    g.fillStyle = renk; g.beginPath();
    g.arc(cx, y, r1, -a1, a1, true); g.arc(cx + d, y, r2, a2, -a2, false); g.closePath();
    const sx = cx + ys; g.moveTo(sx - R, y);
    for (let i = 1; i < 10; i++) { const a = Math.PI + (i * Math.PI) / 5, r = i % 2 ? R * 0.381966 : R; g.lineTo(sx + Math.cos(a) * r, y + Math.sin(a) * r); }
    g.closePath(); g.fill();
  }
  // İnce hilal: altın degrade, fener ışığı gibi parıltı
  function hilal(g, x, y, r) {
    const o = document.createElement("canvas"); o.width = o.height = Math.ceil(r * 2 + 8);
    const h = o.getContext("2d"), m = o.width / 2, gr = h.createLinearGradient(0, 0, o.width, o.height);
    gr.addColorStop(0, "#fff3d1"); gr.addColorStop(1, "#e3ac52");
    h.fillStyle = gr; h.beginPath(); h.arc(m, m, r, 0, Math.PI * 2); h.fill();
    h.globalCompositeOperation = "destination-out"; h.beginPath(); h.arc(m + r * 0.4, m - r * 0.24, r * 0.84, 0, Math.PI * 2); h.fill();
    g.save(); g.shadowColor = "rgba(255,210,140,.6)"; g.shadowBlur = 56; g.drawImage(o, x - m, y - m); g.restore();
  }
  function parilti(g, x, y, s, renk) {
    g.fillStyle = renk; g.beginPath(); g.moveTo(x, y - s);
    g.quadraticCurveTo(x, y, x + s, y); g.quadraticCurveTo(x, y, x, y + s); g.quadraticCurveTo(x, y, x - s, y); g.quadraticCurveTo(x, y, x, y - s); g.fill();
  }
  // Millî bayram: bayrak kırmızısı, ay-yıldız, "1923 – 2026", büyük "103. yıl"
  function kartMilli(g, W, H, o) {
    const z = g.createRadialGradient(W / 2, 420, 80, W / 2, 560, 1050);
    z.addColorStop(0, "#f2232e"); z.addColorStop(0.55, "#e30a17"); z.addColorStop(1, "#a3040f");
    g.fillStyle = z; g.fillRect(0, 0, W, H);
    g.strokeStyle = "rgba(255,255,255,.32)"; g.lineWidth = 2; g.strokeRect(44, 44, W - 88, H - 88);
    const [bas, alt] = bol(o.msj), liste = [];
    liste.push({ h: 250, ciz: (y) => { g.save(); g.shadowColor = "rgba(80,0,8,.35)"; g.shadowBlur = 40; g.shadowOffsetY = 10; ayYildiz(g, W / 2, y + 125, 500, "#fff"); g.restore(); } }, 72);
    liste.push(tarihSatiri(g, W, o.tarih, "rgba(255,255,255,.9)", 32), o.sayi ? 44 : 56);
    if (o.sayi) liste.push({ h: 172, ciz: (y) => {
      const s = DIL === "en" ? String(o.sayi) : o.sayi + ".", e = DIL === "en" ? (o.sayi === 1 ? "year" : "years") : "yıl", ara = DIL === "en" ? 26 : 14;
      g.font = PF(800, 200); const w1 = g.measureText(s).width; g.font = PF(700, 80); const w2 = g.measureText(e).width, x0 = (W - w1 - ara - w2) / 2;
      g.textAlign = "left"; g.textBaseline = "alphabetic"; g.fillStyle = "#fff";
      g.font = PF(800, 200); g.fillText(s, x0, y + 158); g.font = PF(700, 80); g.fillStyle = "rgba(255,255,255,.86)"; g.fillText(e, x0 + w1 + ara, y + 158);
      g.textAlign = "center"; g.textBaseline = "middle";
    } }, 30);
    liste.push(blok(g, bas, { en: 900, font: (px) => PF(800, px), px: 60, min: 44, max: 3, renk: "#fff", x: W / 2 }));
    if (alt) liste.push(20, blok(g, alt, { en: 860, font: (px) => PF(600, px), px: 38, min: 30, max: 3, lh: 1.35, renk: "rgba(255,255,255,.88)", x: W / 2 }));
    diz(liste, 96, 1090);
    g.fillStyle = "rgba(255,255,255,.35)"; g.fillRect(W / 2 - 60, 1118, 120, 2);
    imza(g, W, 1172, o.ikon, "#fff", "#fff", "rgba(255,255,255,.78)");
  }
  // Dinî gün: gece mavisi, hilal ve yıldızlar
  function kartDini(g, W, H, o) {
    const z = g.createLinearGradient(0, 0, 0, H);
    z.addColorStop(0, "#060d26"); z.addColorStop(0.55, "#11214f"); z.addColorStop(1, o.bayram ? "#2f3b7c" : "#1a2c66");
    g.fillStyle = z; g.fillRect(0, 0, W, H);
    // ayın çevresinde yumuşak ışık (screen: laciverdi bulandırmadan aydınlatır)
    const r = g.createRadialGradient(W / 2, 320, 0, W / 2, 320, 460); r.addColorStop(0, "rgba(255,222,170,.22)"); r.addColorStop(1, "rgba(255,222,170,0)");
    g.save(); g.globalCompositeOperation = "screen"; g.fillStyle = r; g.fillRect(0, 0, W, H); g.restore();
    // yıldızlar: yazıların ve ayın üstüne düşmesin
    let t = 20261210; const rnd = () => ((t = (t * 16807) % 2147483647) / 2147483647);
    g.fillStyle = "#fff";
    for (let i = 0; i < 260; i++) {
      const x = rnd() * W, y = rnd() * H, k = rnd();
      if ((y > 560 && x > 130 && x < W - 130) || y > 1120 || Math.hypot(x - W / 2, y - 320) < 230) continue;
      g.globalAlpha = 0.12 + k * 0.5; g.beginPath(); g.arc(x, y, 0.8 + k * 1.7, 0, Math.PI * 2); g.fill();
    }
    g.globalAlpha = 1;
    for (const [x, y, s] of [[200, 190, 20], [880, 150, 15], [860, 450, 11], [215, 500, 13], [990, 760, 10], [92, 880, 11]]) parilti(g, x, y, s, "rgba(255,226,166,.9)");
    g.strokeStyle = "rgba(236,196,120,.38)"; g.lineWidth = 2; g.strokeRect(44, 44, W - 88, H - 88);
    g.strokeStyle = "rgba(236,196,120,.18)"; g.strokeRect(56, 56, W - 112, H - 112);
    hilal(g, W / 2 - 18, 310, 145);
    const [bas, alt] = bol(o.msj), liste = [];
    liste.push(tarihSatiri(g, W, o.tarih, "#f0c67a", 30), 30);
    liste.push({ h: 12, ciz: (y) => { g.fillStyle = "rgba(240,198,122,.6)"; g.fillRect(W / 2 - 90, y + 5, 64, 2); g.fillRect(W / 2 + 26, y + 5, 64, 2); g.save(); g.translate(W / 2, y + 6); g.rotate(Math.PI / 4); g.fillRect(-6, -6, 12, 12); g.restore(); } }, 40);
    liste.push(blok(g, bas, { en: 860, font: (px) => PF(800, px), px: 74, min: 50, max: 4, lh: 1.2, renk: "#fff", x: W / 2 }));
    if (alt) liste.push(24, blok(g, alt, { en: 840, font: (px) => PF(600, px), px: 38, min: 30, max: 3, lh: 1.35, renk: "rgba(255,255,255,.85)", x: W / 2 }));
    diz(liste, 540, 1100);
    imza(g, W, 1172, o.ikon, "#fff", "#f0c67a", "rgba(255,255,255,.7)");
  }
  // Diğer günler: uygulamanın gün batımı renkleri (kum, turuncu, lacivert), dağların ardında güneş
  function kartGenel(g, W, H, o) {
    let z = g.createLinearGradient(0, 0, 0, 640); z.addColorStop(0, "#f6eee7"); z.addColorStop(0.55, "#f8d6bd"); z.addColorStop(1, "#f4a77e");
    g.fillStyle = z; g.fillRect(0, 0, W, H);
    const gx = W / 2, gy = 500, gr = 170;
    const r = g.createRadialGradient(gx, gy, gr * 0.7, gx, gy, gr * 2.6); r.addColorStop(0, "rgba(255,150,90,.45)"); r.addColorStop(1, "rgba(255,150,90,0)");
    g.fillStyle = r; g.fillRect(0, 0, W, 700);
    z = g.createLinearGradient(0, gy - gr, 0, gy + gr); z.addColorStop(0, "#ffb878"); z.addColorStop(0.7, "#e2522a"); z.addColorStop(1, "#d13415");
    g.fillStyle = z; g.beginPath(); g.arc(gx, gy, gr, 0, Math.PI * 2); g.fill();
    // dağlar: uzaktakiler puslu ve sivri, öndekiler yumuşak tepe, en önde lacivert (uygulama ikonundaki gibi)
    const sirt = (renk, n, yumusak) => {
      g.fillStyle = renk; g.beginPath(); g.moveTo(-10, H); g.lineTo(n[0][0], n[0][1]);
      for (let i = 1; i < n.length - 1; i++) {
        if (yumusak) g.quadraticCurveTo(n[i][0], n[i][1], (n[i][0] + n[i + 1][0]) / 2, (n[i][1] + n[i + 1][1]) / 2); else g.lineTo(n[i][0], n[i][1]);
      }
      const s = n[n.length - 1]; g.lineTo(s[0], s[1]); g.lineTo(W + 10, H); g.closePath(); g.fill();
    };
    sirt("#eba68b", [[-20, 520], [90, 452], [170, 500], [300, 410], [430, 488], [520, 458], [640, 505], [760, 430], [860, 470], [980, 400], [1100, 470]]);
    sirt("#b98c9f", [[-20, 590], [120, 530], [250, 575], [380, 515], [540, 585], [690, 540], [820, 580], [960, 520], [1100, 570]]);
    sirt("#56609a", [[-40, 650], [170, 605], [380, 662], [580, 618], [790, 668], [980, 612], [1120, 640]], true);
    sirt("#1f2d5c", [[-40, 718], [220, 684], [480, 716], [700, 690], [920, 718], [1120, 694]], true);
    const [bas, alt] = bol(o.msj), liste = [];
    liste.push(tarihSatiri(g, W, o.tarih, "#ffc53d", 30), 30);
    liste.push(blok(g, bas, { en: 900, font: (px) => PF(800, px), px: 66, min: 46, max: 3, lh: 1.2, renk: "#fff", x: W / 2 }));
    if (alt) liste.push(22, blok(g, alt, { en: 860, font: (px) => PF(600, px), px: 36, min: 28, max: 4, lh: 1.38, renk: "rgba(255,255,255,.84)", x: W / 2 }));
    diz(liste, 750, 1110);
    imza(g, W, 1180, o.ikon, "#fff", "#ff9a6b", "rgba(255,255,255,.7)");
  }
  // 10 Kasım: siyah zemin, ince kırmızı çizgi, söz. Neşeli slogan ve renkli ikon yok
  function kartYas(g, W, H, o) {
    const z = g.createLinearGradient(0, 0, 0, H); z.addColorStop(0, "#0f1114"); z.addColorStop(1, "#23272e");
    g.fillStyle = z; g.fillRect(0, 0, W, H);
    g.fillStyle = "#e30a17"; g.fillRect(0, 0, W, 8);
    const liste = [];
    liste.push(tarihSatiri(g, W, o.tarih, "#b9c0c9", 30), 26);
    liste.push({ h: 4, ciz: (y) => { g.fillStyle = "#e30a17"; g.fillRect(W / 2 - 40, y, 80, 3); } }, 46);
    liste.push(blok(g, o.bas, { en: 920, font: (px) => PF(800, px), px: 78, min: 50, max: 2, lh: 1.16, renk: "#fff", x: W / 2 }), 28);
    liste.push(blok(g, o.alt, { en: 880, font: (px) => PF(500, px), px: 42, min: 32, max: 4, lh: 1.42, renk: "#c9ced6", x: W / 2 }));
    if (o.soz) {
      // söz kesilmesin: önce 3 dengeli satır dene, olmazsa daha çok satır; kutu yazıya göre daralır ve ortalanır
      const f = (px) => PF(500, px), en = W - 312;
      let s = satirla(g, o.soz, en, f, 42, 38, 3);
      if (s.s.join(" ") !== o.soz) s = satirla(g, o.soz, en, f, 42, 32, 6);
      g.font = f(s.px); let mw = Math.max(...s.s.map((t) => g.measureText(t).width));
      g.font = PF(800, 30); mw = Math.max(mw, g.measureText(o.kim).width);
      const se = Math.round(mw + 120), sx = (W - se) / 2, L = Math.round(s.px * 1.42), sh = s.s.length * L + 150;
      liste.push(64, { h: sh, ciz: (y) => {
        g.fillStyle = "rgba(255,255,255,.055)"; g.beginPath(); g.roundRect(sx, y, se, sh, 24); g.fill();
        g.fillStyle = "#e30a17"; g.beginPath(); g.roundRect(sx, y, 6, sh, [24, 0, 0, 24]); g.fill();
        g.textAlign = "left"; g.font = PF(500, s.px); g.fillStyle = "#f3f4f6";
        s.s.forEach((t, i) => g.fillText(t, sx + 60, y + 48 + L * i + L / 2));
        g.font = PF(800, 30); g.fillStyle = "#aab1bb"; g.fillText(o.kim, sx + 60, y + sh - 56);
        g.textAlign = "center";
      } });
    }
    diz(liste, 80, 1180);
    g.font = PF(700, 26); g.fillStyle = "#858d97"; g.fillText("Rota Cepte · me7rt.github.io/Rota-Cepte", W / 2, 1272);
  }
  // Önizleme ve paylaş
  function gorselOnizle(url, ad, metin) {
    const d = document.createElement("div"); d.className = "tanit";
    d.innerHTML = `<div class="tkart karnek"><img src="${url}" alt="${esc(TL("Paylaşılacak görsel", "Image to share"))}"><div class="tbtn"><button class="linkbtn" data-k="kapat">${T("Kapat")}</button><button class="btn primary" data-k="paylas">${ik("share-2", 18)} ${TL("Paylaş", "Share")}</button></div></div>`;
    const kapat = () => { d.classList.add("out"); setTimeout(() => d.remove(), 300); };
    d.addEventListener("click", (e) => {
      if (e.target === d || e.target.closest("[data-k=kapat]")) return kapat();
      if (e.target.closest("[data-k=paylas]")) gorselPaylas(url, ad, metin);
    });
    document.body.appendChild(d);
  }
  // Özel gün şeridine "Kartı paylaş" düğmesi. 6 Şubat gibi afet anma günlerinde paylaşım kartı yok (yalnızca şerit)
  function ozelKartDugme(b, og, n, msj) {
    if (og.yas && !og.saygi) return;
    const d = document.createElement("button"); d.type = "button"; d.className = "ogpay";
    d.innerHTML = `${ik("share-2", 15)}<span>${TL("Kartı paylaş", "Share card")}</span>`;
    d.addEventListener("click", (e) => { e.stopPropagation(); ozelKart(og, n, msj, d); });
    b.querySelector("span").appendChild(d);
  }
  // Günlere özel çizimler kartlar.js'te: yalnızca "Kartı paylaş"a basılınca yüklenir
  let kartJS = null;
  const kartYukle = () => kartJS || (kartJS = new Promise((ok) => {
    if (window.RC_KARTLAR) return ok(true);
    const s = document.createElement("script"); s.src = `kartlar.js?v=${SURUM}`;
    s.onload = () => ok(!!window.RC_KARTLAR); s.onerror = () => { kartJS = null; s.remove(); ok(false); };
    document.head.appendChild(s);
  }));
  const KART_YARDIM = { PF, blok, diz, satirla, tarihSatiri, bol, buyuk, imza, ayYildiz, hilal, harfAra, sigdir, TL, DIL: () => DIL };
  async function ozelKart(og, n, msj, dugme) {
    if (dugme.disabled) return;
    dugme.disabled = true;
    try {
      await yaziTipiHazir();
      const ikon = await resimYukle("icon-192.png", 4000).catch(() => null);
      const cizim = og.kart && !og.yas ? await kartYukle() : false;
      const K = window.RC_KARTLAR, fyol = cizim ? og.foto || (K.fotoYolu && K.fotoYolu(og.kart)) : null;
      if (cizim && K.hazir) await K.hazir(og.kart);
      const foto = fyol ? await resimYukle(fyol, 6000).catch(() => null) : null;
      const W = 1080, H = 1350, c = document.createElement("canvas"); c.width = W; c.height = H;
      const g = c.getContext("2d"); g.textAlign = "center"; g.textBaseline = "middle";
      const yil = n.getFullYear(), gunAy = n.toLocaleDateString(LOC(), { day: "numeric", month: "long" });
      const tarihAraligi = (a, b) => {
        const A = new Date(a + "T12:00:00"), B = new Date(b + "T12:00:00"), uzun = { day: "numeric", month: "long", year: "numeric" };
        if (a === b) return A.toLocaleDateString(LOC(), uzun);
        return (A.getMonth() === B.getMonth() ? A.getDate() + "–" : A.toLocaleDateString(LOC(), { day: "numeric", month: "long" }) + " – ") + B.toLocaleDateString(LOC(), uzun);
      };
      const o = { msj, ikon };
      if (cizim) {
        [o.bas, o.alt] = bol(msj);
        Object.assign(o, { kart: og.kart, foto, yil, sayi: og.yil ? yil - og.yil : 0 });
        o.tarih = buyuk(og.bas ? tarihAraligi(og.bas, og.bit) : og.yil ? `${gunAy} ${og.yil} – ${yil}` : `${gunAy} ${yil}`);
        if (og.mahya) o.mahya = DIL === "en" ? og.mahya.en || "" : og.mahya.tr;
        if (og.soz) { o.soz = TL(og.soz.tr, og.soz.en || og.soz.tr); o.kim = DIL === "en" && og.soz.kimEn ? og.soz.kimEn : og.soz.kim || ""; }
        o.imzaVar = !!og.imza;
      }
      if (cizim && window.RC_KARTLAR.ciz(og.kart, g, W, H, o, KART_YARDIM)) {
        // çizim kartlar.js'te yapıldı
      } else if (og.yas) {
        o.tarih = buyuk(`${gunAy} ${og.yil || yil}`) + (og.saygi ? TL(" · 09.05", " · 09:05") : "");
        if (og.saygi) {
          o.bas = TL(`Ebediyete intikalinin ${yil - og.yil}. yılında`, `${yil - og.yil} years since his passing`);
          o.alt = TL("Cumhuriyetimizin kurucusu Gazi Mustafa Kemal Atatürk'ü saygı, sevgi ve özlemle anıyoruz.", "We remember Mustafa Kemal Atatürk, founder of the Republic of Türkiye, with respect and longing.");
          o.soz = TL("“Benim naçiz vücudum elbet bir gün toprak olacaktır, fakat Türkiye Cumhuriyeti ilelebet payidar kalacaktır.”", "“My humble body will one day turn to dust, but the Republic of Türkiye will stand forever.”");
          o.kim = "Mustafa Kemal Atatürk";
        } else [o.bas, o.alt] = bol(msj);
        kartYas(g, W, H, o);
      } else if (og.yil || og.e === "🇹🇷") {
        o.tarih = buyuk(og.yil ? `${gunAy} ${og.yil} – ${yil}` : `${gunAy} ${yil}`); o.sayi = og.yil ? yil - og.yil : 0;
        kartMilli(g, W, H, o);
      } else if (/🌙|🐑/.test(og.e)) {
        o.tarih = buyuk(og.bas ? tarihAraligi(og.bas, og.bit) : `${gunAy} ${yil}`); o.bayram = !!og.bayram;
        kartDini(g, W, H, o);
      } else {
        o.tarih = buyuk(`${gunAy} ${yil}`);
        kartGenel(g, W, H, o);
      }
      const iki = (x) => String(x).padStart(2, "0");
      gorselOnizle(c.toDataURL("image/png"), `rota-cepte-${yil}-${iki(n.getMonth() + 1)}-${iki(n.getDate())}.png`, `${og.e} ${msj}\n\nRota Cepte: ${SITE}`);
    } catch (e) {
      toast(TL("Kart hazırlanamadı, biraz sonra tekrar dene.", "Couldn't make the card, please try again."));
    } finally { dugme.disabled = false; }
  }
  // Fotoğraflı yer kartı: fotoğraf üstte, ad, il/ilçe, imza ve fotoğraf atfı (CC BY / BY-SA atıf ister)
  const KAT_RENK = { t: "#3a5bc7", d: "#2a7e3b", m: "#008573", c: "#cc4e00", s: "#953ea3" };
  const PIN = "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0";
  function fotoKartCiz(p, f, im, ikon, yer) {
    const W = 1080, H = 1350, ZEMIN = "#111a33";
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"); g.textBaseline = "middle";
    // ad ve yer: alttan hizalı; ad kısaysa fotoğraf biraz daha uzun kalır
    g.textAlign = "left";
    const ad = blok(g, adi(p), { en: W - 128, font: (px) => PF(800, px), px: 84, min: 52, max: 3, lh: 1.12, renk: "#fff", x: 64 });
    const konum = { h: 50, ciz: (y) => {
      g.save(); g.translate(64, y + 3); g.scale(1.75, 1.75); g.strokeStyle = "#ff8a5c"; g.lineWidth = 2.2; g.lineJoin = g.lineCap = "round";
      g.stroke(new Path2D(PIN)); g.beginPath(); g.arc(12, 10, 3, 0, Math.PI * 2); g.stroke(); g.restore();
      g.textAlign = "left"; g.fillStyle = "rgba(255,255,255,.86)"; sigdir(g, yer + TL("", ", Türkiye"), 122, y + 25, W - 186, (px) => PF(600, px), 38);
    } };
    const mUst = 1104 - (ad.h + 20 + konum.h), PH = Math.min(940, mUst + 60);
    g.fillStyle = ZEMIN; g.fillRect(0, 0, W, H);
    // fotoğraf üst kısmı doldurur (taşan yer kırpılır)
    const sw = im.naturalWidth, sh = im.naturalHeight, o = Math.max(W / sw, PH / sh), cw = W / o, ch = PH / o;
    g.drawImage(im, (sw - cw) / 2, (sh - ch) * 0.45, cw, ch, 0, 0, W, PH);
    let z = g.createLinearGradient(0, 0, 0, 230); z.addColorStop(0, "rgba(8,12,28,.5)"); z.addColorStop(1, "rgba(8,12,28,0)");
    g.fillStyle = z; g.fillRect(0, 0, W, 230);
    // alta doğru yumuşak geçiş (yavaş başlar, sonda zemine karışır)
    const GY = PH - 460;
    z = g.createLinearGradient(0, GY, 0, PH);
    for (const [d, a] of [[0, 0], [0.25, 0.1], [0.5, 0.36], [0.72, 0.7], [0.88, 0.92], [1, 1]]) z.addColorStop(d, `rgba(17,26,51,${a})`);
    g.fillStyle = z; g.fillRect(0, GY, W, PH - GY + 1);
    // kategori ve UNESCO etiketleri
    const etiket = (x, yazi, renk) => {
      g.font = PF(800, 28); const w = g.measureText(yazi).width + 44;
      g.fillStyle = renk; g.beginPath(); g.roundRect(x, 56, w, 58, 29); g.fill();
      g.fillStyle = "#fff"; g.textAlign = "left"; g.fillText(yazi, x + 22, 86); return x + w + 12;
    };
    let ex = 56;
    if (CATS[p.k]) ex = etiket(ex, CATS[p.k].ad, KAT_RENK[p.k]);
    if (p.un) etiket(ex, T("UNESCO Dünya Mirası"), "#a8760a");
    g.textAlign = "left"; g.save(); g.shadowColor = "rgba(5,8,20,.45)"; g.shadowBlur = 24; ad.ciz(mUst); g.restore(); konum.ciz(mUst + ad.h + 20);
    // imza: ikon, Rota Cepte · slogan, adres
    g.fillStyle = "rgba(255,255,255,.14)"; g.fillRect(64, 1140, W - 128, 2);
    const IK = ikon ? 72 : 0, tx = 64 + (IK ? IK + 22 : 0);
    if (IK) { g.save(); g.beginPath(); g.roundRect(64, 1170, IK, IK, 18); g.clip(); g.drawImage(ikon, 64, 1170, IK, IK); g.restore(); }
    g.textAlign = "left"; g.fillStyle = "#fff"; g.font = PF(800, 34); g.fillText("Rota Cepte", tx, 1190);
    const wad = g.measureText("Rota Cepte").width;
    g.fillStyle = "#f5b544"; sigdir(g, T("Yol senin, rotan cepte!"), tx + wad + 18, 1191, W - 64 - tx - wad - 18, (px) => PF(700, px), 28);
    g.fillStyle = "rgba(255,255,255,.72)"; g.font = PF(600, 27); g.fillText("me7rt.github.io/Rota-Cepte", tx, 1228);
    // fotoğraf atfı (fotoAtif ile aynı metin)
    const atif = T("Fotoğraf:") + " " + (f.a ? atifYaz(f.a) + " · " : "") + "Wikimedia Commons";
    const at = satirla(g, atif, W - 128, (px) => PF(500, px), 23, 20, 2, true);
    g.font = PF(500, at.px); g.fillStyle = "rgba(255,255,255,.55)";
    at.s.forEach((t, i) => g.fillText(t, 64, H - 40 - (at.s.length - 1 - i) * Math.round(at.px * 1.3)));
    return c.toDataURL("image/png"); // fotoğraf CORS'suz geldiyse burada hata verir
  }
  async function fotoKart(p, dugme) {
    if (dugme.disabled || !p.f || !p.f.p) return;
    // galeride başka fotoğraf seçildiyse o
    const gal = [p.f, ...(p.g || [])], sec = $("dGaleri").querySelector(".gk.on"), f = (sec && gal[+sec.dataset.i]) || p.f;
    const yer = [...new Set([p.ilce, p.il].filter(Boolean))].join(", "), link = `${SITE}#/il/${p.ilS}/yer/${p.q}`;
    const metin = TL(`${p.ad} (${yer}) çok güzel bir yer, Rota Cepte uygulamasında buldum: ${link}`, `${adi(p)} (${yer}, Türkiye) is a beautiful place, I found it on Rota Cepte: ${link}`);
    dugme.disabled = true; dugme.classList.add("yukleniyor"); dugme.setAttribute("aria-busy", "true");
    let url;
    try {
      await yaziTipiHazir();
      let im = null;
      for (const u of new Set([foto(f, 1280), foto(f, 960)])) { try { im = await resimYukle(u, 9000, true); break; } catch (e) {} }
      if (!im) throw new Error("fotoğraf yüklenemedi");
      const ikon = await resimYukle("icon-192.png", 4000).catch(() => null);
      url = fotoKartCiz(p, f, im, ikon, yer);
    } catch (e) {
      toast(TL("Fotoğraf yüklenemedi, bağlantı olarak paylaşılıyor.", "Couldn't load the photo, sharing the link instead."));
      paylas(p);
      return;
    } finally { dugme.disabled = false; dugme.classList.remove("yukleniyor"); dugme.removeAttribute("aria-busy"); }
    gorselOnizle(url, `rota-cepte-${p.q}.png`, metin);
  }
  // Detay kartında "Gönder"in yanına "Fotoğraflı paylaş"
  const fotoPayBtn = document.createElement("button");
  fotoPayBtn.className = "ey"; fotoPayBtn.id = "dFotoPay"; fotoPayBtn.hidden = true;
  fotoPayBtn.innerHTML = `${ik("camera", 22)}<span>${TL("Fotoğraflı paylaş", "Share photo")}</span>`;
  $("dShare").after(fotoPayBtn);
  fotoPayBtn.addEventListener("click", () => { if (open) fotoKart(open, fotoPayBtn); });

  function renderHome() {
    if (!IDX) return;
    const q = $("search").value.trim();
    if (q.length >= 2) return renderSearch(q);
    gununKesfi(); sanaOzel(); ayKart(); renderPasOzet();
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
    havaGoster(IDX.ilBy.get(d.s) || d); yemekGoster(d); ilDamga(d);
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
    else if (cat === "aile") v = v.filter(aileMi);
    else if (cat !== "hepsi") v = v.filter((p) => p.k === cat);
    if (sortMode === "yakin" && me) v = v.slice().sort((a, b) => km(me, a) - km(me, b));
    else v = v.slice().sort((a, b) => (b.one || 0) - (a.one || 0) || b.sl - a.sl);
    return v;
  }
  function ilAraSifirla() { ilAra = ""; $("ilAra").value = ""; $("ilAraSil").hidden = true; }
  function renderAll() { renderChips(); renderSort(); renderList(); drawPins(); }
  const aileMi = (p) => TEMA.aile.k.some((w) => (" " + sade(p.ad) + " ").includes(w));
  function renderChips() {
    const say = (k) => places.filter((p) => (k === "one" ? p.one : p.k === k)).length;
    const items = [["hepsi", T("Hepsi"), places.length]];
    const one = say("one");
    if (one && one < places.length) items.push(["one", ik("star", 14) + " " + T("Öne çıkanlar"), one]);
    for (const k of Object.keys(CATS)) { const c = say(k); if (c) items.push([k, CATS[k].ad, c]); }
    const aile = places.filter(aileMi).length;
    if (aile >= 2) items.push(["aile", ik("heart-handshake", 14) + " " + T("Çocuklarla"), aile]);
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
    const pts = [], v = visible();
    // Çok yer varsa (İstanbul 400) öne çıkmayanları tek bir tuvale nokta olarak çiz: yüzlerce simgeli işaret eski telefonlarda takılıyordu
    const cok = v.length > 80, kok = cok && getComputedStyle(document.documentElement), renk = {};
    if (cok && !kanvas) kanvas = L.canvas({ padding: 0.5, tolerance: 8 });
    for (const p of v) {
      const big = !!p.one, s = big ? 34 : 26;
      if (cok && !big) {
        L.circleMarker([p.lat, p.lng], { renderer: kanvas, radius: 7, color: "#fff", weight: 2, fillColor: renk[p.k] || (renk[p.k] = kok.getPropertyValue(`--k-${p.k}`).trim() || "#888"), fillOpacity: 1 })
          .on("click", () => openDetail(p)).addTo(layer);
        pts.push([p.lat, p.lng]);
        continue;
      }
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
    $("dFotoPay").hidden = !p.q || !foto(p.f, 1280);
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
  $("yolBtn").addEventListener("click", () => git("#/yol"));
  $("kacBtn").addEventListener("click", () => git("#/kacamak"));
  $("kartBtn").addEventListener("click", () => git("#/kartlar"));
  $("yeniBtn").addEventListener("click", () => yenilikler(0, true));
  $("kacSure").addEventListener("click", (e) => { const b = e.target.closest("[data-g]"); if (b) { history.replaceState(null, "", `#/kacamak/${b.dataset.g}`); showKacamak(b.dataset.g); } });
  $("kacLoc").addEventListener("click", () => startLocation());
  $("favPay").addEventListener("click", listePaylas);
  $("plList").addEventListener("click", (e) => { const b = e.target.closest("[data-pl]"); if (b && plYer[+b.dataset.pl]) openDetail(plYer[+b.dataset.pl]); });
  $("plEkle").addEventListener("click", plEkle);
  $("kGec").addEventListener("click", () => kartKarar(false));
  $("kBeg").addEventListener("click", () => kartKarar(true));
  $("kBilgi").addEventListener("click", kartAc);
  $("kDeste").addEventListener("click", (e) => { if (e.target.closest("[data-k=yeni]")) showKartlar(); });
  $("oyunBtn").addEventListener("click", () => { if (oyun && oyun.bitti) oyun = null; git("#/oyun"); });
  $("oyunKutu").addEventListener("click", (e) => {
    const b = e.target.closest("[data-il]"); if (b) { oyunCevap(b.dataset.il); return; }
    const a = e.target.closest("[data-oac]"); if (a) { e.preventDefault(); oyunYerAc(+a.dataset.oac); return; }
    const k = e.target.closest("[data-k]"); if (!k) return;
    if (k.dataset.k === "sonraki") oyunSonraki();
    else if (k.dataset.k === "paylas") oyunPaylas();
    else if (k.dataset.k === "tekrar") { oyun = null; showOyun(); window.scrollTo(0, 0); }
  });
  oyunRekorYaz();
  const yolYeni = () => { yolAcik = new Set(); renderYol(); };
  $("yolA").addEventListener("change", yolYeni);
  $("yolB").addEventListener("change", yolYeni);
  $("yolTers").addEventListener("click", () => { const a = $("yolA").value; $("yolA").value = $("yolB").value; $("yolB").value = a; yolYeni(); });
  $("yolGenis").addEventListener("click", (e) => { const b = e.target.closest("[data-g]"); if (!b) return; yolGenis = +b.dataset.g; renderYol(); });
  $("yolList").addEventListener("click", (e) => { const b = e.target.closest("[data-yolil]"); if (!b) return; yolAcik.add(b.dataset.yolil); renderYol(); });
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
  // 10 Kasım günü bütün gün yas teması: kullanıcının seçtiği tema kaydedilir, ertesi gün geri gelir
  const YAS_GUNU = (() => { const g = new Date(); return g.getMonth() === 10 && g.getDate() === 10; })();
  function temaUygula(k) {
    const t = TEMALAR.find((x) => x.k === k) || TEMALAR[0];
    tema = t.k;
    const m = document.querySelectorAll('meta[name="theme-color"]');
    if (YAS_GUNU) {
      document.documentElement.setAttribute("data-tema", "yas");
      if (m[0]) m[0].content = "#f0f0f0";
      if (m[1]) m[1].content = "#111111";
      $("temaYazi").innerHTML = `${TL("Tema", "Theme")}: <b>${TL("Yas (10 Kasım)", "Mourning (10 November)")}</b>`;
      return;
    }
    if (t.k === "gunbatimi") document.documentElement.removeAttribute("data-tema");
    else document.documentElement.setAttribute("data-tema", t.k);
    if (m[0]) m[0].content = t.r[0];
    if (m[1]) m[1].content = t.koyu;
    $("temaYazi").innerHTML = `${TL("Tema", "Theme")}: <b>${esc(t.ad)}</b>`;
  }
  function temaSec() {
    const d = document.createElement("div"); d.className = "tanit";
    const secenek = (t) => `<button class="tsec" role="radio" aria-checked="${t.k === tema}" data-tema="${t.k}"><span class="tornek" aria-hidden="true"><i class="tz" style="--sw-a:${t.r[0]};--sw-k:${t.koyu}"></i><i style="background:${t.r[1]}"></i><i style="background:${t.r[2]}"></i></span><span class="tad"><b>${esc(t.ad)}</b><small>${esc(t.not)}</small></span><i class="tisaret" aria-hidden="true">${ik("check", 16)}</i></button>`;
    const yasNot = YAS_GUNU ? TL(" Bugün 10 Kasım: uygulama gün boyunca yas renklerinde. Seçtiğin tema yarın gelir.", " Today is 10 November: the app stays in mourning colours all day. Your theme returns tomorrow.") : "";
    d.innerHTML = `<div class="tkart"><div class="temo">${ik("palette", 36)}</div><h2>${TL("Tema", "Theme")}</h2><p>${TL("Uygulamanın renklerini seç. Karanlık mod telefonunun ayarına göre açılır.", "Pick the app colours. Dark mode follows your phone's setting.")}${yasNot}</p>
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
  $("hava").addEventListener("click", (e) => { const b = e.target.closest("[data-hy]"); if (b && view && view.d && view.d.yerler) { const p = view.d.yerler[+b.dataset.hy]; if (p) openDetail(p); } });
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
  $("ozetBtn").addEventListener("click", () => yilOzeti());
  $("pasSec").addEventListener("click", (e) => {
    const b = e.target.closest("[data-pas]"); if (b) return pasAc(b.dataset.pas);
    const t = e.target.closest("[data-sayfa]"); if (t) { const k = $("pasSayfa"); k.scrollTo({ left: +t.dataset.sayfa * pasAdim(k), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }
    if (e.target.closest("#pasPay")) pasaportPaylas();
  });
  $("pasSayfa").addEventListener("scroll", () => { clearTimeout(pasSekme.z); pasSekme.z = setTimeout(pasSekme, 60); }, { passive: true });
  $("ilDamga").addEventListener("click", () => { if (view && view.d && damgalar().has(view.d.s)) pasAc(view.d.s); });
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
  // ---------- 10 Kasım anma bildirimi: saat 09.05'te, saygı duruşu anında (telefonda kurulur, hiçbir bilgi bize gelmez) ----------
  const ANMA = "gezi-anma", ANMA_SORU = "gezi-anma-soru", ANMA_ID = 7100;
  const anmaAcik = () => { try { return localStorage.getItem(ANMA) !== "0"; } catch (e) { return true; } };
  const siraEn = (n) => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");
  // Önümüzdeki üç 10 Kasım için tek seferlik bildirimler; her açılışta yeniden kurulur
  async function anmaKur() {
    if (!LN) return;
    try {
      await LN.cancel({ notifications: [0, 1, 2].map((i) => ({ id: ANMA_ID + i })) });
      if (!anmaAcik() || (await LN.checkPermissions()).display !== "granted") return;
      const simdi = new Date(), n = [];
      for (let y = simdi.getFullYear(); n.length < 3; y++) {
        const t = new Date(y, 10, 10, 9, 5, 0);
        if (t <= simdi) continue;
        const yil = y - 1938;
        n.push({
          id: ANMA_ID + n.length,
          title: TL("Saygıyla ve özlemle ∞", "With respect and longing ∞"),
          body: TL(`10 Kasım, saat 09.05. Gazi Mustafa Kemal Atatürk'ü ebediyete intikalinin ${yil}. yılında saygı, sevgi ve özlemle anıyoruz.`, `10 November, 9:05 am. We remember Mustafa Kemal Atatürk, founder of the Republic of Türkiye, on the ${siraEn(yil)} anniversary of his passing.`),
          schedule: { at: t, allowWhileIdle: true },
          extra: { git: "#/ataturk" }
        });
      }
      await LN.schedule({ notifications: n });
    } catch (e) {}
  }
  function anmaYazi() {
    const b = $("anmaBtn"); if (!b) return;
    b.hidden = !LN;
    $("anmaYazi").textContent = anmaAcik() ? TL("10 Kasım 09.05 anma bildirimi: Açık", "10 November 9:05 am remembrance: On") : TL("10 Kasım 09.05 anma bildirimi: Kapalı", "10 November 9:05 am remembrance: Off");
  }
  async function anmaAc(ac) {
    if (!LN) return;
    if (ac) {
      let izin = "denied";
      try { izin = (await LN.requestPermissions()).display; } catch (e) {}
      if (izin !== "granted") { toast(TL("Bildirim izni verilmedi. Telefonunun ayarlarından açabilirsin.", "Notifications aren't allowed. You can turn them on in your phone settings.")); return; }
    }
    try { localStorage.setItem(ANMA, ac ? "1" : "0"); } catch (e) {}
    anmaYazi(); await anmaKur();
    toast(ac ? TL("Tamam. 10 Kasım'da saat 09.05'te hatırlatacağız.", "Done. We'll remind you on 10 November at 9:05 am.") : TL("Anma bildirimi kapatıldı.", "Remembrance notification turned off."));
  }
  // 1-9 Kasım arasında, bildirim izni yoksa bir kez sorulur
  async function anmaTeklif() {
    if (!LN || !anmaAcik()) return;
    const g = new Date(); if (g.getMonth() !== 10 || g.getDate() > 9) return;
    try { if (localStorage.getItem(ANMA_SORU)) return; } catch (e) { return; }
    try { if ((await LN.checkPermissions()).display === "granted") return; } catch (e) { return; }
    if (document.querySelector(".tanit") || (location.hash && location.hash !== "#/")) return;
    try { localStorage.setItem(ANMA_SORU, "1"); } catch (e) {}
    const d = document.createElement("div"); d.className = "tanit";
    d.innerHTML = `<div class="tkart"><div class="temo">${ik("bell", 36)}</div><h2>${TL("10 Kasım'da hatırlatalım mı?", "Remind you on 10 November?")}</h2><p>${TL("Atatürk'ü anmak için 10 Kasım sabahı saat 09.05'te, saygı duruşu anında telefonuna bir bildirim gelsin. Bildirim telefonunda kurulur, hiçbir bilgi bize gelmez.", "Get a notification at 9:05 am on 10 November, the minute of silence for Atatürk. It's set up on your phone and nothing is sent to us.")}</p><div class="tbtn"><button class="linkbtn" data-k="sonra">${TL("Şimdi değil", "Not now")}</button><button class="btn primary" data-k="evet">${TL("Evet, hatırlat", "Yes, remind me")}</button></div></div>`;
    const kapat = () => { d.classList.add("out"); setTimeout(() => d.remove(), 300); };
    d.addEventListener("click", (e) => {
      const b = e.target.closest("[data-k]");
      if (e.target === d || (b && b.dataset.k === "sonra")) kapat();
      else if (b && b.dataset.k === "evet") { kapat(); anmaAc(true); }
    });
    document.body.appendChild(d);
  }
  if (LN) {
    $("anmaBtn").addEventListener("click", () => anmaAc(!anmaAcik()));
    anmaYazi();
    setTimeout(anmaKur, 4500);
    setTimeout(anmaTeklif, 7000);
  }
  if (LN) {
    $("bildirimBtn").addEventListener("click", () => bildirimAc(!bildirimAcik()));
    if (LN.addListener) LN.addListener("localNotificationActionPerformed", (a) => { const g = a && a.notification && a.notification.extra && a.notification.extra.git; if (g) git(g); });
    bildirimYazi();
    setTimeout(haftaSonuKur, 4000);
  }
  // ---------- yeni sürüm: Google Play'de güncelleme varsa uygulama içinde sorulur (yalnızca Play'den kurulan Android uygulaması) ----------
  const AU = ANDROID && window.Capacitor.Plugins && window.Capacitor.Plugins.AppUpdate;
  const GUN_SONRA = "gezi-guncelle-sonra";
  let gunSon = 0, gunDene = 0;
  async function guncelle(izin) {
    try {
      if (izin) { const r = await AU.performImmediateUpdate(); if (r && (r.code === 0 || r.code === 1)) return; } // 0 güncellendi, 1 vazgeçti; diğerlerinde Play sayfası açılır
      await AU.openAppStore();
    } catch (e) { try { await AU.openAppStore(); } catch (e2) {} }
  }
  async function guncellemeKontrol() {
    if (!AU || Date.now() - gunSon < 6 * 36e5) return;
    let b;
    try { b = await AU.getAppUpdateInfo(); } catch (e) { return; } // Play'den kurulmamışsa (APK) sessizce geçer
    gunSon = Date.now();
    if (b.updateAvailability === 3) { guncelle(true); return; } // yarım kalan güncellemeyi sürdür
    if (b.updateAvailability !== 2) return;
    let ert = null; try { ert = JSON.parse(localStorage.getItem(GUN_SONRA)); } catch (e) {}
    if (ert && ert.v === b.availableVersionCode && Date.now() - ert.t < 864e5) return; // "Sonra" dendiyse bir gün sorma
    if (document.querySelector(".tanit")) { gunSon = 0; if (++gunDene < 4) setTimeout(guncellemeKontrol, 15000); return; }
    const d = document.createElement("div"); d.className = "tanit";
    d.innerHTML = `<div class="tkart"><div class="temo">${ik("download", 36)}</div><h2>${TL("Yeni sürüm hazır", "A new version is ready")}</h2><p>${TL("Rota Cepte'nin yeni sürümü Google Play'de. Yeni yerler ve düzeltmeler için şimdi güncelleyebilirsin, bir dakika sürer.", "A new version of Rota Cepte is on Google Play. Update now for new places and fixes; it takes about a minute.")}</p><div class="tbtn"><button class="linkbtn" data-k="sonra">${TL("Sonra", "Later")}</button><button class="btn primary" data-k="guncelle">${TL("Güncelle", "Update")}</button></div></div>`;
    const kapat = () => { d.classList.add("out"); setTimeout(() => d.remove(), 300); };
    d.addEventListener("click", (e) => {
      const k = e.target.closest("[data-k]");
      if (e.target === d || (k && k.dataset.k === "sonra")) { try { localStorage.setItem(GUN_SONRA, JSON.stringify({ v: b.availableVersionCode, t: Date.now() })); } catch (err) {} kapat(); }
      else if (k && k.dataset.k === "guncelle") { kapat(); guncelle(b.immediateUpdateAllowed !== false); }
    });
    document.body.appendChild(d);
  }
  if (AU) {
    setTimeout(guncellemeKontrol, 3000);
    if (CapApp && CapApp.addListener) CapApp.addListener("resume", () => guncellemeKontrol());
  }
  // ---------- v6.5 küçük sevinçler: saate göre selam, konfeti, şans çarkı, mola planı ----------
  // Ana sayfa üst yazısı: saate göre selam (05-11, 11-17, 17-22, 22-05)
  function selam(t) {
    const g = t || new Date();
    if (g.getMonth() === 10 && g.getDate() === 10) return TL("10 Kasım · Saygıyla anıyoruz", "10 November · In remembrance");
    const s = g.getHours();
    const i = s >= 5 && s < 11 ? 0 : s >= 11 && s < 17 ? 1 : s >= 17 && s < 22 ? 2 : 3;
    return TL(["Günaydın", "İyi günler", "İyi akşamlar", "İyi geceler"][i], ["Good morning", "Good afternoon", "Good evening", "Good night"][i]);
  }
  // Konfeti: yeni rozet, yıllık hedef ve yeni damgada kısa kutlama. Kütüphanesiz, 1,5 sn; hareket azaltma açıksa hiç çalışmaz.
  function konfeti() {
    try { if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; } catch (e) { return; }
    if (document.documentElement.getAttribute("data-tema") === "yas") return; // 10 Kasım: kutlama efekti yok
    const c = document.createElement("canvas"), g = c.getContext && c.getContext("2d"); if (!g) return;
    const W = innerWidth, H = innerHeight, dpr = Math.min(2, devicePixelRatio || 1);
    c.className = "konfeti"; c.setAttribute("aria-hidden", "true"); c.width = W * dpr; c.height = H * dpr;
    document.body.appendChild(c); g.scale(dpr, dpr);
    const cs = getComputedStyle(document.documentElement), v = (k, y) => cs.getPropertyValue(k).trim() || y;
    const renk = [v("--pri", "#d13415"), v("--altin-a", "#ffc53d"), v("--altin-b", "#e2a336"), "#ffd76a", v("--k-t", "#3a5bc7"), v("--k-d", "#2a7e3b"), v("--k-m", "#008573"), v("--k-s", "#953ea3")];
    // patlama noktası: açılan kartın üstü (kart yoksa ekranın üst-ortası)
    const k = [...document.querySelectorAll(".tanit .tkart")].pop(), r = k && k.getBoundingClientRect();
    const ox = r ? r.left + r.width / 2 : W / 2, oy = r ? Math.max(80, r.top + 60) : H * 0.35;
    const P = Array.from({ length: Math.round(Math.min(150, Math.max(80, W / 3))) }, () => {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.95, h = 6 + Math.random() * 10;
      return { x: ox, y: oy, vx: Math.cos(a) * h, vy: Math.sin(a) * h, w: 6 + Math.random() * 5, h: 3 + Math.random() * 4, d: Math.random() * 6.28, vd: (Math.random() - 0.5) * 0.35, t: Math.random() * 6.28, c: renk[Math.floor(Math.random() * renk.length)], yuv: Math.random() < 0.22 };
    });
    const bas = performance.now(), SURE = 1500; let son = bas;
    const adim = (simdi) => {
      const dt = Math.min(3, (simdi - son) / 16.7), p = (simdi - bas) / SURE; son = simdi;
      g.clearRect(0, 0, W, H);
      if (p >= 1 || !c.isConnected) { c.remove(); return; }
      g.globalAlpha = p < 0.65 ? 1 : 1 - (p - 0.65) / 0.35;
      const s = Math.pow(0.975, dt);
      for (const q of P) {
        q.vx *= s; q.vy = q.vy * s + 0.3 * dt; q.x += q.vx * dt; q.y += q.vy * dt; q.d += q.vd * dt; q.t += 0.18 * dt;
        g.save(); g.translate(q.x, q.y); g.rotate(q.d); g.scale(1, Math.cos(q.t)); g.fillStyle = q.c;
        if (q.yuv) { g.beginPath(); g.arc(0, 0, q.h * 0.75, 0, 6.283); g.fill(); } else g.fillRect(-q.w / 2, -q.h / 2, q.w, q.h);
        g.restore();
      }
      requestAnimationFrame(adim);
    };
    requestAnimationFrame(adim);
  }
  // Şans çarkı: 8 il (konum açıksa 400 km içinden), çevir, çark seçsin
  const CARK_RENK = [["#d13415", "#fff"], ["#3a5bc7", "#fff"], ["#ffc53d", "#4f3422"], ["#008573", "#fff"], ["#953ea3", "#fff"], ["#2a7e3b", "#fff"], ["#cc4e00", "#fff"], ["#1f2d5c", "#fff"]];
  let carkIl = [], carkAci = 0, carkDonuyor = false, carkYakin = 0;
  const azHareket = () => { try { return matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; } };
  function showCark() {
    view = { mode: "cark" }; show("cark");
    $("eyebrow").textContent = T("Keşfet"); $("title").textContent = TL("Şans çarkı", "Luck wheel");
    loadAra();
    if (!carkDonuyor) carkKur();
  }
  function carkKur() {
    let a = IDX.iller.slice(); carkYakin = 0;
    if (me) {
      // bulunduğun il (merkezi en yakın olan) çarka girmesin; 400 km içinde 8 il yoksa en yakın 8 il
      const ev = a.reduce((en, i) => (km(me, i) < km(me, en) ? i : en));
      a = a.filter((i) => i !== ev).sort((p, q) => km(me, p) - km(me, q));
      const y = a.filter((i) => km(me, i) <= 400);
      a = y.length >= 8 ? y : a.slice(0, 8); carkYakin = y.length >= 8 ? 1 : 2;
    }
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    carkIl = a.slice(0, 8);
    $("carkDon").innerHTML = carkSvg(carkIl);
    $("carkDon").style.transform = `rotate(${carkAci}deg)`;
    $("carkNot").textContent = carkYakin === 1 ? TL("Sana 400 km'den yakın 8 il çarkta. Çevir, gideceğin il çıksın.", "8 provinces within 400 km of you are on the wheel. Spin it and go where it lands.")
      : carkYakin === 2 ? TL("Sana en yakın 8 il çarkta. Çevir, gideceğin il çıksın.", "The 8 provinces nearest to you are on the wheel. Spin it and go where it lands.")
      : TL("Türkiye'nin dört bir yanından 8 il çarkta. Konumunu açarsan yakınındaki illerden seçeriz.", "8 provinces from all over Türkiye are on the wheel. Turn on location to get ones near you.");
    $("carkLoc").hidden = !!me;
  }
  // Çark çizimi: dilim i tepeden saat yönünde i*45°; adlar merkezden dışa doğru okunur
  function carkSvg(iller) {
    const R = 150, n = iller.length, dil = 360 / n, nk = (a, r) => [(r * Math.sin((a * Math.PI) / 180)).toFixed(2), (-r * Math.cos((a * Math.PI) / 180)).toFixed(2)];
    const dilimler = iller.map((il, i) => {
      const [x1, y1] = nk(i * dil - dil / 2, R), [x2, y2] = nk(i * dil + dil / 2, R), [zemin, yazi] = CARK_RENK[i % CARK_RENK.length];
      // ad göbeğe değmesin: en çok ~92 birim (Manrope 800'de harf başına ~0,64 em)
      const fs = Math.min(16, Math.round((92 / (il.ad.length * 0.64)) * 2) / 2);
      return `<path d="M0 0L${x1} ${y1}A${R} ${R} 0 0 1 ${x2} ${y2}Z" fill="${zemin}" data-i="${i}" data-s="${il.s}"/>`
        + `<g transform="rotate(${i * dil})" pointer-events="none"><text transform="rotate(-90)" x="131" y="0" text-anchor="end" dominant-baseline="central" fill="${yazi}" font-size="${fs}" font-weight="800">${esc(il.ad)}</text></g>`;
    }).join("");
    const isik = Array.from({ length: 16 }, (_, i) => { const [x, y] = nk(i * 22.5 + 11.25, 155); return `<circle cx="${x}" cy="${y}" r="2.4" class="${i % 2 ? "ci2" : "ci1"}"/>`; }).join("");
    const cizgi = iller.map((_, i) => { const [x, y] = nk(i * dil - dil / 2, R); return `<line x1="0" y1="0" x2="${x}" y2="${y}"/>`; }).join("");
    return `<svg viewBox="-160 -160 320 320" role="img" aria-label="${esc(TL("Çarktaki iller: ", "Provinces on the wheel: ") + iller.map((i) => i.ad).join(", "))}">
      <defs><radialGradient id="carkParla"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></radialGradient></defs>
      <circle r="159" class="ckenar"/>${dilimler}<g class="cayrac" pointer-events="none">${cizgi}</g>
      <circle r="${R}" fill="url(#carkParla)" pointer-events="none"/><g pointer-events="none">${isik}</g></svg>`;
  }
  function carkCevir() {
    if (carkDonuyor || carkIl.length < 2 || !view || view.mode !== "cark") return;
    carkDonuyor = true;
    const el = $("carkDon"), ok = $("carkOk"), btn = $("carkCevir"), az = azHareket(), n = carkIl.length, dil = 360 / n;
    btn.disabled = $("carkYeni").disabled = true; btn.querySelector("span").textContent = TL("Dönüyor…", "Spinning…");
    $("cark").classList.add("donuyor");
    // önce sonucu seç, sonra çarkı tam o dilimin içine (kenarlara 7° kala) çevir
    const k = Math.floor(Math.random() * n), sap = (Math.random() - 0.5) * (dil - 14);
    const hedef = (((-(k * dil + sap) - carkAci) % 360) + 360) % 360;
    carkAci += (az ? 360 : 360 * (5 + Math.floor(Math.random() * 2))) + hedef;
    const sure = az ? 900 : 3800 + Math.round(Math.random() * 600);
    el.style.setProperty("transition", `transform ${sure}ms ${az ? "ease-out" : "cubic-bezier(.12,.72,.12,1)"}`, "important");
    el.style.transform = `rotate(${carkAci}deg)`;
    // ibre: dilim sınırı geçtikçe tık (yavaşlarken hafif titreşim)
    let once = null, sonTik = 0, bitti = false;
    const tik = (t) => {
      if (bitti) return;
      const m = getComputedStyle(el).transform;
      if (m && m !== "none") {
        const p = m.slice(m.indexOf("(") + 1).split(",").map(parseFloat), aci = (Math.atan2(p[1], p[0]) * 180) / Math.PI;
        const i = Math.floor(((((-aci % 360) + 360) % 360) + dil / 2) / dil) % n;
        if (once !== null && i !== once && !az) {
          if (ok.animate) ok.animate([{ transform: "rotate(-20deg)" }, { transform: "rotate(0deg)" }], { duration: 240, easing: "cubic-bezier(.3,1.5,.5,1)" });
          if (t - sonTik > 110 && navigator.vibrate) { try { navigator.vibrate(6); } catch (e) {} }
          sonTik = t;
        }
        once = i;
      }
      requestAnimationFrame(tik);
    };
    requestAnimationFrame(tik);
    const son = (e) => {
      if (bitti || (e && e.target !== el)) return;
      bitti = true; el.removeEventListener("transitionend", son); clearTimeout(yedek);
      carkDonuyor = false; $("cark").classList.remove("donuyor");
      btn.disabled = $("carkYeni").disabled = false; btn.querySelector("span").textContent = TL("Tekrar çevir", "Spin again");
      if (!view || view.mode !== "cark") return; // çark dönerken sayfadan çıkıldı
      if (navigator.vibrate && !az) { try { navigator.vibrate(18); } catch (er) {} }
      const il = carkIl[k];
      $("carkSonuc").textContent = TL(`Çark ${il.ad} dedi!`, `The wheel picked ${il.ad}!`);
      setTimeout(() => { if (view && view.mode === "cark" && !carkDonuyor) carkKart(il); }, az ? 150 : 450);
    };
    el.addEventListener("transitionend", son);
    const yedek = setTimeout(son, sure + 500); // sekme arka plandaysa transitionend gelmeyebilir
  }
  // Sonuç kartı: ilin kapak fotoğrafı, kısa bilgi, öne çıkan yerler, "İli keşfet" ve "Tekrar çevir"
  function carkKart(il) {
    const b = IL_BOLGE.get(il.s), uz = me ? km(me, il) : 0;
    const ilY = ARA ? ARA.filter((x) => x[2] === il.s) : [], one = (ilY.some((x) => x[11]) ? ilY.filter((x) => x[11]) : ilY.filter((x) => x[8])).slice(0, 3).map(araAd);
    const bilgi = [b && TL(`${b} Bölgesi`, `${T(b)} Region`), `${il.n} ${TL("gezilecek yer", "places to see")}`, `${il.ilceler.length} ${TL("ilçe", "districts")}`].filter(Boolean).join(" · ");
    const src = foto(il.f, 960);
    const d = document.createElement("div"); d.className = "tanit carkt";
    d.innerHTML = `<div class="tkart ckart"><button class="ckapat" data-k="kapat" aria-label="${T("Kapat")}">${ik("x", 20)}</button>
      <div class="ckapak">${ik("map-pin", 36)}${src ? `<img src="${src}" alt="" onerror="fotoHata(this)">` : ""}<span class="cplaka">${esc(il.plaka)}</span></div>
      <small>${TL("Çark seçti", "The wheel picked")}</small><h2>${esc(il.ad)}</h2>
      <p class="cbilgi">${esc(bilgi)}</p>
      ${uz ? `<p class="cuzak">${ik("car-front", 15)} ${TL(`Arabayla yaklaşık ${sureYaz((uz * 1.25) / 80).replace("~", "")}`, `About ${sureYaz((uz * 1.25) / 80).replace("~", "")} by car`)}</p>` : ""}
      ${one.length ? `<p class="cone">${ik("star", 14)}${one.map(esc).join(" · ")}</p>` : ""}
      <div class="tbtn"><button class="btn" data-k="tekrar">${TL("Tekrar çevir", "Spin again")}</button><button class="btn primary" data-k="git">${ik("compass", 18)} ${TL("İli keşfet", "Explore")}</button></div></div>`;
    const kapat = () => { d.classList.add("out"); setTimeout(() => d.remove(), 300); };
    d.addEventListener("click", (e) => {
      const x = e.target.closest("[data-k]");
      if (e.target === d || (x && x.dataset.k === "kapat")) return kapat();
      if (!x) return;
      kapat();
      if (x.dataset.k === "tekrar") setTimeout(carkCevir, 200);
      else if (x.dataset.k === "git") git(`#/il/${il.s}`);
    });
    document.body.appendChild(d);
    loadIl(il.s).catch(() => {}); // il verisi önceden insin, "İli keşfet" hızlı açılsın
  }
  $("carkCevir").addEventListener("click", carkCevir);
  $("carkKutu").addEventListener("click", carkCevir);
  $("carkYeni").addEventListener("click", () => { if (!carkDonuyor) carkKur(); });
  // konum ilk kez bulununca çarkı yakın illerle yeniden kur (dönerken ya da sonuç kartı açıkken değil)
  function carkKonum() { if (me && !carkYakin && !carkDonuyor && !document.querySelector(".tanit.carkt")) carkKur(); }
  $("carkLoc").addEventListener("click", () => startLocation());
  $("carkBtn").addEventListener("click", () => git("#/cark"));
  // Mola planı: 2,5 saati aşan yolda yaklaşık 2 saatte bir mola; her mola noktasına en yakın fotoğraflı durak
  const MOLA_HIZ = 80, MOLA_SAAT = 2;
  let molaAcik = "";
  function molaGoster(yol, r, toplam) {
    const kutu = $("yolMola"), yolKm = toplam * YOL_CARPAN, saat = yolKm / MOLA_HIZ, anahtar = yol.join(">");
    if (saat <= 2.5) { kutu.hidden = true; return; }
    const ilAd = (s) => (IDX.ilBy.get(s) || {}).ad || s, n = Math.ceil(saat / MOLA_SAAT) - 1;
    // hattın il merkezlerinde birikimli uzunluğu (yolYerleri ile aynı düzlemde)
    const KX = 111.32 * Math.cos((39 * Math.PI) / 180), KY = 110.57, bir = [0];
    for (let i = 1; i < yol.length; i++) { const p = IDX.ilBy.get(yol[i - 1]), q = IDX.ilBy.get(yol[i]); bir.push(bir[i - 1] + Math.hypot((q.lng - p.lng) * KX, (q.lat - p.lat) * KY)); }
    const kullan = new Set(), M = [];
    for (let i = 1; i <= n; i++) {
      const b = (toplam * i) / (n + 1);
      let j = 1; while (j < bir.length - 1 && bir[j] < b) j++;
      const yakinIl = b - bir[j - 1] < bir[j] - b ? yol[j - 1] : yol[j];
      // mola noktasından en çok ~30 km önce ya da sonra, yola yakın, fotoğraflı; kısa molada dağ ve göl yerine şehirdeki yerler öne
      let en = null, ep = Infinity;
      for (const y of r) {
        if (!y.x[8] || kullan.has(y.x)) continue;
        const fark = Math.abs(y.konum - b); if (fark > 30) continue;
        const p = fark + y.sap * 2.5 + (y.x[6] === "d" ? 15 : 0) - (y.x[11] ? 8 : 0);
        if (p < ep) { ep = p; en = y; }
      }
      if (en) kullan.add(en.x);
      // gösterilen km ve süre önerilen yerin kendi konumu (yer yoksa mola noktası), 10 km'ye yuvarlı
      M.push({ no: i, km: Math.round(((en ? en.konum : b) * YOL_CARPAN) / 10) * 10, y: en, s: en ? en.x[2] : yakinIl });
    }
    const hepsi = molaAcik === anahtar || M.length <= 5, goster = hepsi ? M : M.slice(0, 4);
    const satir = (m) => {
      const ic = `<span class="mno">${m.no}</span><span class="mt"><b>${TL(`${m.no}. mola`, `Break ${m.no}`)} <span class="mkm">~${fmt(m.km)} · ${sureYaz(m.km / MOLA_HIZ)}</span></b><small>${m.y ? `${esc(ilAd(m.s))} · ${esc(araAd(m.y.x))}` : esc(TL(`${ilAd(m.s)} civarında, yol üstünde güvenli bir dinlenme tesisi`, `A safe rest area on the road near ${ilAd(m.s)}`))}</small></span>`;
      return `<li>${m.y ? `<button class="mrow" data-yer="${m.y.x[2]}|${m.y.x[3]}">${ic}${OKIK}</button>` : `<div class="mrow">${ic}</div>`}</li>`;
    };
    kutu.innerHTML = `<div class="mbas"><span class="mik">${ik("coffee", 20)}</span><span><b>${TL("Mola planı", "Break plan")}</b><small>${TL(`Yaklaşık ${sureYaz(saat).replace("~", "")} sürüş · ortalama ${MOLA_HIZ} km/sa`, `About ${sureYaz(saat).replace("~", "")} of driving · avg. ${MOLA_HIZ} km/h`)}</small></span></div>
      <p class="mnot">${TL("Uzun yolda yaklaşık 2 saatte bir mola vermek yorgunluğu azaltır.", "On long drives, taking a break about every 2 hours helps reduce fatigue.")}${saat > 10 ? " " + TL("10 saati aşan bir yolu iki güne bölmek daha güvenli.", "Splitting a drive of more than 10 hours over two days is safer.") : ""}</p>
      <ol class="mlist">${goster.map(satir).join("")}${hepsi ? `<li><div class="mrow mvar"><span class="mno">${ik("flag", 14)}</span><span class="mt"><b>${TL("Varış", "Arrival")} <span class="mkm">~${fmt(yolKm)} · ${sureYaz(saat)}</span></b><small>${esc(ilAd(yol[yol.length - 1]))}</small></span></div></li>` : ""}</ol>
      ${hepsi ? "" : `<button class="linkbtn mfazla" data-mola="1">${TL(`${M.length - goster.length} mola daha göster`, `Show ${M.length - goster.length} more breaks`)}</button>`}`;
    kutu.hidden = false;
    kutu.onclick = (e) => { if (e.target.closest("[data-mola]")) { molaAcik = anahtar; renderYol(); } };
  }
  // ---------- özel günler: milli bayramlar, anma günleri, dini bayramlar ----------
  // Bayram geri sayımı: 60 gün kala ana sayfada, bayram tatili için 3-4 günlük kaçamak önerisine götürür
  function bayramSayac(o, n) {
    const bugun = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
    const g = (o.degisken || []).filter((x) => x.ad).map((x) => ({ x, gun: Math.round((Date.parse(x.bas + "T00:00:00Z") - bugun) / 864e5) })).filter((y) => y.gun > 0 && y.gun <= 60).sort((a, b) => a.gun - b.gun)[0];
    if (!g) return;
    const b = $("ozelGun");
    b.innerHTML = `<i>${g.x.e}</i><span><b>${esc(TL(`${g.x.ad}'na ${g.gun} gün kaldı`, `${g.x.adEn || g.x.ad} is ${g.gun} day${g.gun === 1 ? "" : "s"} away`))}</b><small>${TL("Bayram tatili için 3-4 günlük kaçamak önerilerine bak ›", "See ideas for a 3-4 day holiday getaway ›")}</small></span>`;
    b.hidden = false; b.onclick = () => git("#/kacamak/3");
  }
  async function ozelGun() {
    try {
      const o = await getJSON(`ozel-gunler.json?v=${SURUM}`);
      const n = new Date(), iki = (x) => String(x).padStart(2, "0");
      const gun = `${n.getFullYear()}-${iki(n.getMonth() + 1)}-${iki(n.getDate())}`;
      // Sabit gün (ör. 19 Mayıs) ile değişken gün (ör. Kurban Bayramı) aynı güne denk gelirse ikisi de görünsün
      const sb = o.sabit[gun.slice(5)], dg = (o.degisken || []).find((x) => gun >= x.bas && gun <= x.bit), g = sb || dg;
      if (!g) { bayramSayac(o, n); return; }
      const yaz = (x) => TL(x.tr, x.en || x.tr).replace("{n}", x.yil ? n.getFullYear() - x.yil : "");
      const msj = yaz(g), ek = sb && dg ? yaz(dg) : "";
      // açılış ekranı
      const t2 = document.querySelector(".sp-tag2"); if (t2) { t2.textContent = `${g.e} ${msj}`; t2.classList.add("sp-ozel"); }
      if (g.yas) document.documentElement.classList.add("yas");
      // ana sayfa şeridi
      const b = $("ozelGun");
      // Ramazan gibi dönemlerde yaklaşan bayramın geri sayımı da şeritte görünsün
      const sonra = g.sayac ? (o.degisken || []).filter((x) => x.ad && x.bas > gun).sort((x, y) => (x.bas < y.bas ? -1 : 1))[0] : null;
      const kalan = sonra ? Math.round((Date.parse(sonra.bas + "T00:00:00Z") - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / 864e5) : 0;
      const alt = g.bayram ? TL("Bayram tatili için hazır rotalara göz at ›", "Browse ready-made routes for the holiday ›")
        : g.git === "#/ataturk" ? TL("Atatürk'ün izinde: 1915'ten Anıtkabir'e ›", "In Atatürk's footsteps: from 1915 to Anıtkabir ›")
        : sonra && kalan <= 60 ? TL(`${sonra.ad}'na ${kalan} gün kaldı · 3-4 günlük kaçamak önerilerine bak ›`, `${sonra.adEn || sonra.ad} is ${kalan} day${kalan === 1 ? "" : "s"} away · see 3-4 day getaway ideas ›`) : "";
      b.innerHTML = `<i>${g.e}</i><span><b>${esc(msj)}</b>${ek ? `<small>${esc(dg.e + " " + ek)}</small>` : ""}${alt ? `<small>${esc(alt)}</small>` : ""}</span>`;
      b.classList.toggle("yas", !!g.yas); b.hidden = false;
      ozelKartDugme(b, g, n, msj);
      if (g.bayram) b.onclick = () => { const r = $("rotaSec"); if (r) r.scrollIntoView({ behavior: "smooth", block: "start" }); };
      else if (g.git) b.onclick = () => git(g.git);
      else if (alt) b.onclick = () => git("#/kacamak/3");
      if (g.saygi) { saygiKart(n, g); saygiDurusu(); }
    } catch (e) {}
  }
  // 10 Kasım: uygulama o gün ilk açıldığında bir kez saygı kartı (açılış ekranı kapandıktan sonra)
  function saygiKart(n, g) {
    const yil = n.getFullYear();
    try { if (localStorage.getItem("gezi-saygi") === String(yil)) return; } catch (e) { return; }
    let say = 0;
    const bekle = () => {
      if (document.getElementById("splash") || document.querySelector(".tanit")) { if (++say < 40) setTimeout(bekle, 400); return; }
      try { localStorage.setItem("gezi-saygi", String(yil)); } catch (e) {}
      const d = document.createElement("div"); d.className = "tanit saygi";
      d.innerHTML = `<div class="tkart skart" role="dialog" aria-label="${esc(TL("10 Kasım", "10 November"))}">
        <span class="sbant" aria-hidden="true"></span>
        <small>10 ${TL("Kasım", "November")} 1938 · 09.05</small>
        <h2>${esc(TL(`Ebediyete intikalinin ${yil - g.yil}. yılında`, `${yil - g.yil} years since his passing`))}</h2>
        <p>${esc(TL("Cumhuriyetimizin kurucusu Gazi Mustafa Kemal Atatürk'ü saygı, sevgi ve özlemle anıyoruz.", "We remember Mustafa Kemal Atatürk, founder of the Republic of Türkiye, with respect and longing."))}</p>
        <blockquote>${esc(TL("“Benim naçiz vücudum elbet bir gün toprak olacaktır, fakat Türkiye Cumhuriyeti ilelebet payidar kalacaktır.”", "“My humble body will one day turn to dust, but the Republic of Türkiye will stand forever.”"))}<cite>Mustafa Kemal Atatürk</cite></blockquote>
        <div class="tbtn"><button class="linkbtn" data-k="kapat">${T("Kapat")}</button><button class="btn primary" data-k="iz">${ik("footprints", 18)} ${TL("Atatürk'ün izinde", "In his footsteps")}</button></div></div>`;
      const kapat = () => { d.classList.add("out"); setTimeout(() => d.remove(), 300); };
      d.addEventListener("click", (e) => {
        const k = e.target.closest("[data-k]"); if (e.target !== d && !k) return;
        kapat(); if (k && k.dataset.k === "iz") git("#/ataturk");
      });
      document.body.appendChild(d);
    };
    setTimeout(bekle, 600);
  }
  // 10 Kasım 09.05: uygulama o dakika açıksa bir dakikalık sessiz saygı duruşu sayacı (ses ve titreşim yok)
  function saygiDurusu() {
    const n = new Date(), bas = new Date(n.getFullYear(), 10, 10, 9, 5, 0).getTime(), bit = bas + 60000;
    if (n.getTime() >= bit) return;
    const goster = () => {
      if (document.querySelector(".sdurus")) return;
      const d = document.createElement("div"); d.className = "sdurus";
      d.setAttribute("role", "dialog"); d.setAttribute("aria-label", TL("Saygı duruşu", "Moment of silence"));
      d.innerHTML = `<small>10 ${TL("Kasım", "November")} 1938 · 09.05</small>
        <h2>${TL("Saygı duruşu", "Moment of silence")}</h2>
        <div class="sd-sayi">1:00</div><div class="sd-cizgi" aria-hidden="true"><i></i></div>
        <p>${esc(TL("Gazi Mustafa Kemal Atatürk'ü saygı, sevgi ve özlemle anıyoruz.", "We remember Mustafa Kemal Atatürk with respect and longing."))}</p>
        <button class="linkbtn" data-k="kapat">${T("Kapat")}</button>`;
      document.body.appendChild(d);
      let kilit = null;
      try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then((k) => { kilit = k; }).catch(() => {}); } catch (e) {}
      const sayi = d.querySelector(".sd-sayi"), cizgi = d.querySelector(".sd-cizgi i");
      let t = 0;
      const kapat = () => { clearInterval(t); try { if (kilit) kilit.release(); } catch (e) {} d.classList.add("out"); setTimeout(() => d.remove(), 600); };
      const adim = () => {
        const kalan = Math.max(0, Math.ceil((bit - Date.now()) / 1000));
        sayi.textContent = kalan >= 60 ? "1:00" : `0:${String(kalan).padStart(2, "0")}`;
        cizgi.style.transform = `scaleX(${kalan / 60})`;
        if (!kalan) { clearInterval(t); setTimeout(kapat, 3000); }
      };
      t = setInterval(adim, 250); adim();
      d.addEventListener("click", (e) => { if (e.target.closest("[data-k=kapat]")) kapat(); });
    };
    // Arka plandan dönüşte de (ör. 09.05 bildirimine dokununca) bak; sayaç yalnızca o bir dakika içinde açılır
    const dene = () => { const x = Date.now(); if (x >= bas && x < bit && !document.hidden) goster(); };
    const fark = bas - n.getTime();
    if (fark <= 0) dene(); else if (fark < 864e5) setTimeout(dene, fark + 50);
    const gorunur = () => { if (Date.now() >= bit) document.removeEventListener("visibilitychange", gorunur); else dene(); };
    document.addEventListener("visibilitychange", gorunur);
  }
  // Sayfa başlığı ekrana göre değişsin (sekme, geçmiş, ekran okuyucu)
  new MutationObserver(() => { const t = $("title").textContent; document.title = t && view.mode !== "home" ? `${t} · Rota Cepte` : TL("Rota Cepte · Türkiye Gezi Rehberi", "Rota Cepte · Türkiye Travel Guide"); }).observe($("title"), { childList: true, characterData: true, subtree: true });
  ozelGun();
  temaChips();
  rotaKartlar();
  route();
  setTimeout(tanitim, 5200);
  setTimeout(yenilikler, 6500);
  // Konum izni daha önce verildiyse sessizce başlat
  let kapali = false; try { kapali = !!localStorage.getItem("gezi-konum-kapali"); } catch (e) {}
  if (!kapali && navigator.permissions) navigator.permissions.query({ name: "geolocation" }).then((s) => { if (s.state === "granted") startLocation(); }).catch(() => {});
})();
