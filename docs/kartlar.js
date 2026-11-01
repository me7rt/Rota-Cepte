/* Rota Cepte · © 2026 Mert Turanlıoğlu · Özel gün kartları: çizimler bu dosyada kodla yapılır.
   Fotoğraflı kartlardaki fotoğraflar Wikimedia Commons'tan, yalnızca kamu malı, CC0 ya da CC BY lisanslıdır (kaynak ve lisanslar: lisanslar.html).
   Atatürk'ün imzası kamu malıdır (Wikimedia Commons, "Signature of Mustafa Kemal Atatürk.svg", PD-old).
   Yazı tipleri: Playfair Display ve Great Vibes (SIL Open Font License 1.1, vendor/font). */
window.RC_KARTLAR = (function () {
  "use strict";
  let Y; // app.js'ten gelen yardımcılar (yazı tipi, yazı blokları, ay-yıldız, alt imza)
  const IMZA_D = "M104.5 198.9C94.4 197.6 91.6 194.5 93.9 187C94.8 183.8 95.5 183.1 98.3 182.7C100 182.5 101.7 182.4 101.9 182.6C102.1 182.7 100.6 184.3 98.6 186.1C96.1 188.2 95 190 95.2 191.4C95.7 194.9 99.6 196.2 109.2 195.7C116.6 195.3 119.1 194.7 125.5 191.7C135.2 187.1 142.1 180.2 146.2 171.2C148.8 165.4 149.2 163.7 148.7 158.3C147.2 139.5 129.2 126.1 105.4 126C100.2 126 97.6 126.8 86.9 131.6C74.7 137.1 59.9 142 55.6 142C54.1 142 47.5 148.7 32.1 166C20.4 179.2 10.4 190.3 10 190.5C9.5 190.8 8.3 190.7 7.2 190.3C5.4 189.6 7.4 186.9 24.7 167.5L44.3 145.5L38.1 144.9C31.1 144.2 29 142.9 30.6 140.2C32.5 137 44 130.3 51.3 128.1C55.2 126.9 59.6 125.6 61 125.2C62.4 124.8 69.5 117.4 78.4 107C96.1 86.3 112.3 70 115 70C116.1 70 117 70.2 117 70.5C117 70.8 107.1 82.2 95 96C82.9 109.8 73 121.5 73 122C73 122.6 77.9 123 84.7 123L96.4 123L106 117.3C126.4 105.2 149.4 87 150.5 82C151.2 78.7 153 78.8 153 82.2C153 86.8 147.5 91.6 114.6 115.5C109.3 119.3 106.3 122.1 107.1 122.4C107.9 122.6 111.8 123.5 115.8 124.4C143.1 130.3 157.1 150 150.1 172.8C147.2 182.5 141.5 188.7 130.7 194C121.7 198.4 113.2 200 104.5 198.9zM47.7 142.4C50 141.8 58.4 131.6 57.8 130.1C57.3 128.8 47.3 131.7 41.1 134.8C34.8 137.9 32.6 140.5 35 142C36.7 143.1 44.3 143.3 47.7 142.4zM74.1 133.7C81.3 131 89 127.2 89 126.5C89 126.2 84.4 126 78.8 126L68.5 126L64 131.5C61.5 134.5 59.4 137.4 59.2 137.9C58.8 139 64.3 137.4 74.1 133.7zM293.2 188C290.8 186.5 290 185.3 290 183.1C290 175.4 303.8 171.1 328.2 171L339 171L339 173.5C339 175.9 338.9 176 333.2 175.4C321.6 174.2 295.5 180.2 295.5 184C295.5 187.5 304.6 187.5 335.4 183.9C371.9 179.7 412.2 171.7 466 157.9C519 144.3 540.6 136 554.3 124C566.7 113.1 567 100.9 555.1 89.1C550.6 84.6 547.7 82.4 539.5 77.3C530.3 71.5 502.9 60.2 495.8 59.3C488.7 58.3 487.6 59.2 481.9 70C476 81.4 473.5 82.3 476.3 72C477.7 67.1 477.8 65.6 476.8 64C475.3 61.6 476.5 59.1 480 57.3C481.8 56.4 483.5 53.1 487.1 43.3C493.7 25.1 493.8 24.7 490.3 29C488.8 30.9 480.8 41.7 472.6 53C455.1 77.1 454.4 78 451.3 78C449.4 78 449 77.5 449 75.2C449 73.7 449.9 70.5 451 68.1C452.1 65.7 452.8 63.4 452.5 63.1C451.3 61.9 448.3 65 442.8 73.1C435.3 84 431.6 87.4 429 86C427.9 85.4 427 84 427 83C427 79.8 425.6 80.7 420.6 87C418 90.3 415.5 93 415.1 93C413.5 93 411.2 89.4 410.6 85.6L409.9 81.8L401.1 90.4C396.2 95.1 391.5 99 390.6 99C388.3 99 386.6 94.8 387.4 90.8C387.7 89 391.8 79.7 396.5 70.1C401.2 60.5 404.9 52.5 404.7 52.3C404.3 51.9 396.3 61.9 372.5 92.5C357.6 111.5 357 112 353.1 108.1C351.2 106.2 351.1 106.2 345.8 111.5C342 115.3 339.4 117 336.7 117.5C331.1 118.6 329.6 116.9 330.3 110.3L330.9 105L328.2 106.9C326.7 108 321.9 112.1 317.5 116C306.9 125.4 296.3 132.7 295 131.4C292.9 129.3 305.6 97.1 312.1 87.9C314.4 84.7 314.2 83.3 311.6 84.7C310.7 85.2 300 97.4 287.8 111.9C264.9 139 260.1 143.5 257.1 140.6C254.7 138.1 255.7 133.6 261.3 121.3C264.4 114.8 266.7 109.3 266.5 109.1C266.3 108.9 264.6 110.5 262.8 112.6C246.4 131.7 231.7 146.2 219.9 155.1C213.2 160.2 203.4 165 199.8 165C194.2 165 191.2 158.7 192.3 149.4C192.9 143.8 192.4 144.2 186 155.5C183.1 160.4 181.1 163.6 181.5 162.5C188.3 143.7 201.1 121.3 214 105.5C220.4 97.7 224.1 94.2 231.5 88.5C235.5 85.5 235 86.2 228.9 92.1C221.4 99.4 216 106 217.7 106C218.2 106 221.9 102.6 226 98.4C238.3 85.9 250.3 77.6 260.9 74.4C267.9 72.3 270.5 72.6 273.9 76C276.4 78.6 277 80 277.2 84.7L277.5 90.3L281.8 84.1C285.3 79.2 286.5 78.1 287.5 79C288.6 79.9 288 81.7 284.1 88.3C263 124.2 260 129.9 260 133.6C260 136.3 263.2 134.9 268.7 129.8C277.1 121.8 303 90.4 303 88.1C303 87.7 300.3 88 297 88.9C291.7 90.3 291 90.8 290.4 93.5C289.7 96.5 289.7 96.5 288.8 94.1C288.3 92.6 288.4 91.3 289 90.5C289.5 89.8 294.6 87.5 300.1 85.4L310.3 81.5L322.9 66.5C345.2 40.1 345.8 39.8 332.9 61.4C328 69.6 324.2 76.5 324.4 76.7C324.6 76.9 342.9 70.5 365.2 62.4L405.7 47.8L414.6 37.2C426.8 22.7 429.6 21.9 421.5 35.3C419 39.4 417 43 417 43.3C417 43.6 422.1 42.1 428.2 39.9C434.4 37.7 452.8 31.3 469 25.7L498.5 15.5L500.8 11.2C503.3 6.7 506 5.6 506 9.1C506 10.2 506.3 11 506.8 10.8C517.7 6.1 522 4.8 523.5 6C524.3 6.7 525 8.2 525 9.3C525 11.3 524.9 11.3 523.6 9.5C522.3 7.7 521.9 7.8 513.2 10.9C504.6 14 503.9 14.5 500.9 19.2C499.1 22 495.5 30.1 493 37.4C486 56.9 486.3 55.2 490.2 54.8C493.1 54.5 494.4 53.2 501.8 43.5C506.8 36.8 509.9 31.7 509.8 30.5C509.4 27.8 505.1 27.2 503.3 29.6C502.6 30.6 502 30.9 502 30.2C502 28.6 506.1 26 508.5 26C509.7 26 511.1 26.5 511.8 27.2C515 30.4 511.7 37.2 500.6 49.9L495 56.4L508.7 61C526.5 66.9 539.3 73.3 550.5 81.7C564.7 92.5 569.8 101.6 567 111.6C565.9 115.4 564.2 118 559.1 123.1C548.3 133.8 528.8 142.6 497.4 150.9C489.2 153.1 475.3 156.9 466.6 159.4C429.7 170 383.7 179.1 325.7 187.4C303.9 190.6 297.6 190.7 293.2 188zM208.8 159.1C210.8 158 215.1 155 218.2 152.3C226.3 145.5 251.6 118.9 258.3 110.2C265.6 100.7 273.2 85.7 272.8 81.6C272.5 78.6 272.4 78.5 267.5 78.7C261.1 78.9 245.7 86.4 234.5 94.8C225.4 101.6 208.2 119 203.9 125.8C198.4 134.5 194.2 149.1 195.5 155.1C196.9 161.2 201.9 162.7 208.8 159.1zM308.9 121.6C312.5 118.6 322.5 109.2 331.2 100.7C345.4 86.7 347.3 85.1 351.8 84C357.9 82.6 361 83.8 361 87.5C361 90.9 362.2 90.6 363.8 87C364.6 85.3 365.8 84 366.6 84C368.5 84 368.5 84 364 93C359.2 102.5 358.8 105.8 362.6 103.2C364.1 102.2 401.3 52.9 400.8 52.5C400.6 52.3 385.9 57.5 368 64.2C350.1 70.8 332.1 77.4 328 78.9L320.5 81.7L310.2 101.8C300.7 120.6 298.4 127 301.1 127C301.8 127 305.3 124.6 308.9 121.6zM344.1 107.8C350.9 99.8 358 89.5 358 87.3C358 84.9 354.1 86 350.2 89.5C344.8 94.3 334 109.8 334 112.6C334 117 337.5 115.3 344.1 107.8zM406.9 80.8C414.2 73.5 420 68.4 419.7 69.5C419.5 70.6 418.2 75 416.9 79.2C415.7 83.5 415 87.3 415.4 87.7C416.3 88.6 424.6 79.5 430.7 70.8C433.2 67 435.7 64 436.2 64C437.3 64 437.3 63.8 434.5 70.8C428.1 86.6 434.2 85.2 443.8 68.7C448.4 60.7 452.7 56.3 454.2 57.8C454.7 58.3 455.3 61 455.7 63.8C456 66.7 456.7 69 457.2 69C457.6 69 465.1 59.4 473.8 47.8C489 27.3 494.7 19 493.7 19C491.4 19 412.2 48.7 411.3 49.9C409.1 52.8 390 90.9 390 92.5C390 96.2 394.4 93.1 406.9 80.8zM436 55C436 53.7 436.5 53 437.2 53.2C437.9 53.5 438.5 54.3 438.5 55C438.5 55.7 437.9 56.5 437.2 56.8C436.5 57 436 56.3 436 55zM428.2 54.4C428.4 53.3 429 52.6 429.5 52.8C431 53.1 430.7 55.3 429.2 55.8C428.3 56.1 427.9 55.6 428.2 54.4zM320.5 76.4C322 74.9 326.4 67 325.7 67C325.5 67 323.2 69.5 320.6 72.5C317.7 75.9 316.5 78 317.4 78C318.2 78 319.6 77.3 320.5 76.4zM161 149C161 146.3 163.9 142 165.6 142C167.5 142 167.4 146 165.4 148.8C163.5 151.6 161 151.7 161 149z";
  let IMZA;
  const PI2 = Math.PI * 2;
  const yeni = (w, h) => { const c = document.createElement("canvas"); c.width = Math.ceil(w); c.height = Math.ceil(h); return c; };
  const rastgele = (t) => () => ((t = (t * 16807) % 2147483647) / 2147483647);
  function dz(g, x0, y0, x1, y1, d) { const z = g.createLinearGradient(x0, y0, x1, y1); d.forEach(([o, r]) => z.addColorStop(o, r)); return z; }
  function rz(g, x, y, r0, r1, d) { const z = g.createRadialGradient(x, y, r0, x, y, r1); d.forEach(([o, r]) => z.addColorStop(o, r)); return z; }
  function zemin(g, W, H, d) { g.fillStyle = dz(g, 0, 0, 0, H, d); g.fillRect(0, 0, W, H); }
  function isik(g, x, y, r, renk, mod) { g.save(); g.globalCompositeOperation = mod || "screen"; g.fillStyle = rz(g, x, y, 0, r, [[0, renk], [1, "rgba(0,0,0,0)"]]); g.fillRect(x - r, y - r, r * 2, r * 2); g.restore(); }

  // ---------- Atatürk'ün imzası ----------
  function ataImza(g, cx, cy, en, renk) {
    if (!IMZA) IMZA = new Path2D(IMZA_D);
    const s = en / 480; // imzanın çizili kısmı yaklaşık 480x175 birim
    g.save(); g.translate(cx - 290 * s, cy - 112 * s); g.scale(s, s); g.fillStyle = renk; g.fill(IMZA); g.restore();
  }

  // ---------- doğa ----------
  // Dağ sırtı: noktalar (x, y), yumuşak ise tepeler yuvarlak
  function sirt(g, W, H, renk, n, yumusak) {
    g.fillStyle = renk; g.beginPath(); g.moveTo(-10, H); g.lineTo(n[0][0], n[0][1]);
    for (let i = 1; i < n.length - 1; i++) {
      if (yumusak) g.quadraticCurveTo(n[i][0], n[i][1], (n[i][0] + n[i + 1][0]) / 2, (n[i][1] + n[i + 1][1]) / 2); else g.lineTo(n[i][0], n[i][1]);
    }
    const s = n[n.length - 1]; g.lineTo(s[0], s[1]); g.lineTo(W + 10, H); g.closePath(); g.fill();
  }
  function yildizlar(g, W, ust, alt, n, tohum, kacin) {
    const r = rastgele(tohum); g.save(); g.fillStyle = "#fff";
    for (let i = 0; i < n; i++) {
      const x = r() * W, y = ust + r() * (alt - ust), k = r();
      if (kacin && kacin(x, y)) continue;
      g.globalAlpha = 0.15 + k * 0.6; g.beginPath(); g.arc(x, y, 0.7 + k * 1.8, 0, PI2); g.fill();
    }
    g.restore();
  }
  function parilti(g, x, y, s, renk) {
    g.fillStyle = renk; g.beginPath(); g.moveTo(x, y - s);
    g.quadraticCurveTo(x, y, x + s, y); g.quadraticCurveTo(x, y, x, y + s); g.quadraticCurveTo(x, y, x - s, y); g.quadraticCurveTo(x, y, x, y - s); g.fill();
  }
  function bulut(g, x, y, s, renk) {
    g.fillStyle = renk; g.beginPath();
    for (const [a, b, r] of [[-70, 10, 34], [-30, -14, 46], [22, -22, 54], [72, 4, 38], [0, 14, 40]]) { g.moveTo(x + (a + r) * s, y + b * s); g.arc(x + a * s, y + b * s, r * s, 0, PI2); }
    g.fill();
  }
  function kus(g, x, y, s, renk) {
    g.strokeStyle = renk; g.lineWidth = Math.max(2, 3.2 * s); g.lineCap = "round"; g.beginPath();
    g.moveTo(x - 22 * s, y - 4 * s); g.quadraticCurveTo(x - 10 * s, y - 14 * s, x, y); g.quadraticCurveTo(x + 10 * s, y - 14 * s, x + 22 * s, y - 4 * s); g.stroke();
  }
  function dalgalar(g, W, y0, y1, renk, tohum) {
    const r = rastgele(tohum); g.save(); g.strokeStyle = renk; g.lineCap = "round";
    for (let y = y0; y < y1; y += 14 + (y - y0) * 0.06) {
      const k = (y - y0) / (y1 - y0); g.lineWidth = 1.5 + k * 2.5; g.globalAlpha = 0.25 + k * 0.4;
      for (let x = r() * 120 - 60; x < W; x += 90 + r() * 140) { const l = 20 + r() * 50 * (0.6 + k); g.beginPath(); g.moveTo(x, y); g.lineTo(x + l, y); g.stroke(); }
    }
    g.restore();
  }
  function havaiFisek(g, x, y, r, renk, n, tohum) {
    const R = rastgele(tohum); g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = renk;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * PI2 + R() * 0.1, u = r * (0.75 + R() * 0.3);
      for (let j = 1; j <= 7; j++) {
        const d = (u * j) / 7, dus = (j * j * r) / 260;
        g.globalAlpha = 0.25 + (j / 7) * 0.7; g.beginPath(); g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d + dus, 1.2 + (j / 7) * 2.6, 0, PI2); g.fill();
      }
    }
    g.restore(); isik(g, x, y, r * 0.8, renk.replace(/[\d.]+\)$/, "0.25)"));
  }

  // ---------- Türk bayrağı ----------
  // Bayrak Kanunu oranları: G en, 1,5G boy; ayın dış dairesinin merkezi uçkurdan 0,5G içeride. Grubun ortası 0,5979G'de kalır
  function bayrakDuz(c, w, h) { c.fillStyle = "#e30a17"; c.fillRect(0, 0, w, h); Y.ayYildiz(c, 0.5979 * h, h / 2, h, "#fff"); }
  // Dalgalanan bayrak: düz bayrak dikey şeritlere bölünüp kaydırılır, kıvrımlara ışık ve gölge verilir. (x, y) direğe bağlı üst köşe
  function bayrak(g, x, y, w, o) {
    o = o || {}; const h = w / 1.5, A = o.A != null ? o.A : h * 0.07, k = o.k || 1.7, faz = o.faz != null ? o.faz : 0.3;
    const f = yeni(w, h); bayrakDuz(f.getContext("2d"), f.width, f.height);
    const d = yeni(w, h + A * 2 + 4), e = d.getContext("2d");
    const kay = (i) => A * Math.sin((i / w) * Math.PI * k + faz) * (0.2 + (0.8 * i) / w) - A * Math.sin(faz) * 0.2;
    for (let i = 0; i < f.width; i++) e.drawImage(f, i, 0, 1, f.height, i, A + 2 + kay(i), 1, f.height);
    e.globalCompositeOperation = "source-atop";
    for (let i = 0; i < f.width; i++) {
      const m = Math.cos((i / w) * Math.PI * k + faz);
      e.fillStyle = m > 0 ? `rgba(255,255,255,${(0.13 * m).toFixed(3)})` : `rgba(40,0,0,${(-0.3 * m).toFixed(3)})`; e.fillRect(i, 0, 1, d.height);
    }
    g.save(); if (o.golge) { g.shadowColor = o.golge; g.shadowBlur = 36; g.shadowOffsetY = 12; }
    g.drawImage(d, x, y - A - 2); g.restore();
  }
  function direk(g, x, ust, alt, kalin, renk) {
    g.fillStyle = renk || "#d9d4cc"; g.fillRect(x - kalin / 2, ust, kalin, alt - ust);
    g.fillStyle = dz(g, x - kalin * 1.4, 0, x + kalin * 1.4, 0, [[0, "#f7d77c"], [1, "#b8862b"]]);
    g.beginPath(); g.arc(x, ust - kalin * 1.1, kalin * 1.3, 0, PI2); g.fill();
  }

  // ---------- cami, mahya, kandil, lale, desen ----------
  // Klasik Osmanlı camisi silueti (belirli bir caminin kopyası değil). by: zemin çizgisi, s: ölçek
  function cami(g, cx, by, s, renk, o) {
    o = o || {}; const m = o.minare || 2;
    g.fillStyle = renk; g.beginPath();
    g.rect(cx - 420 * s, by - 42 * s, 840 * s, 42 * s); // avlu duvarı
    g.rect(cx - 250 * s, by - 132 * s, 500 * s, 132 * s); // gövde
    g.rect(cx - 122 * s, by - 196 * s, 244 * s, 66 * s); // kasnak
    const kubbe = (x, y, rx, ry) => { g.moveTo(x + rx, y); g.ellipse(x, y, rx, ry, 0, 0, Math.PI, true); g.closePath(); };
    kubbe(cx, by - 194 * s, 132 * s, 120 * s);
    for (const k of [-1, 1]) { kubbe(cx + k * 158 * s, by - 130 * s, 84 * s, 64 * s); kubbe(cx + k * 222 * s, by - 130 * s, 30 * s, 26 * s); kubbe(cx + k * 330 * s, by - 40 * s, 40 * s, 34 * s); }
    g.rect(cx - 2.5 * s, by - 350 * s, 5 * s, 40 * s); // alem
    g.fill();
    // alemin hilali
    g.beginPath(); g.arc(cx, by - 360 * s, 11 * s, 0, PI2); g.fill();
    g.save(); g.globalCompositeOperation = "destination-out"; g.beginPath(); g.arc(cx + 5 * s, by - 364 * s, 9.5 * s, 0, PI2); g.fill(); g.restore();
    const minare = (x, b) => {
      g.fillStyle = renk; g.beginPath();
      g.rect(x - 17 * s, by - 70 * s, 34 * s, 70 * s); g.rect(x - 11 * s, by - b * s, 22 * s, b * s);
      for (const y of [b * 0.62, b * 0.8]) g.rect(x - 19 * s, by - y * s - 9 * s, 38 * s, 9 * s);
      g.moveTo(x - 13 * s, by - b * s); g.lineTo(x, by - (b + 112) * s); g.lineTo(x + 13 * s, by - b * s); g.closePath();
      g.rect(x - 1.5 * s, by - (b + 132) * s, 3 * s, 24 * s); g.fill();
    };
    minare(cx - 300 * s, 470); minare(cx + 300 * s, 470);
    if (m === 4) { minare(cx - 400 * s, 380); minare(cx + 400 * s, 380); }
    if (o.pencere) {
      g.fillStyle = o.pencere;
      const pen = (x, y, w, h) => { g.beginPath(); g.moveTo(x, y + h); g.lineTo(x, y + w / 2); g.arc(x + w / 2, y + w / 2, w / 2, Math.PI, 0); g.lineTo(x + w, y + h); g.closePath(); g.fill(); };
      for (let i = -5; i <= 5; i++) pen(cx + i * 40 * s - 7 * s, by - 112 * s, 14 * s, 34 * s);
      for (let i = -4; i <= 4; i++) pen(cx + i * 24 * s - 5 * s, by - 186 * s, 10 * s, 26 * s);
    }
    return { sol: cx - 300 * s, sag: cx + 300 * s, ust: by - 470 * s * 0.8 };
  }
  // Mahya: iki minare arasına gerilen ışıklı yazı (yazı noktalara dönüştürülür)
  function mahya(g, metin, cx, cy, en, renk) {
    const px = 84, c = yeni(1800, 130), m = c.getContext("2d");
    m.font = Y.PF(800, px); m.textAlign = "center"; m.textBaseline = "middle"; m.fillStyle = "#000"; m.fillText(metin, 900, 66);
    const w = Math.min(1790, m.measureText(metin).width), v = m.getImageData(0, 0, 1800, 130).data, o = Math.min(1.25, en / w), A = 7;
    const k = yeni(en + 40, 130 * o + 40), q = k.getContext("2d"); q.fillStyle = renk;
    for (let y = 0; y < 130; y += A) for (let x = 0; x < 1800; x += A) {
      if (v[(y * 1800 + x) * 4 + 3] > 120) { q.beginPath(); q.arc(k.width / 2 + (x - 900) * o, k.height / 2 + (y - 66) * o, Math.max(1.6, 2.5 * o), 0, PI2); q.fill(); }
    }
    g.save(); g.shadowColor = renk; g.shadowBlur = 14; g.drawImage(k, cx - k.width / 2, cy - k.height / 2); g.restore();
    g.drawImage(k, cx - k.width / 2, cy - k.height / 2);
  }
  // Cami kandili: üç zincirle asılı cam kandil, içinde alev
  function kandil(g, x, y, s, ip) {
    g.save(); g.strokeStyle = "rgba(236,196,120,.75)"; g.lineWidth = 2 * s;
    if (ip) { g.beginPath(); g.moveTo(x, ip); g.lineTo(x, y - 96 * s); g.stroke(); }
    g.beginPath(); for (const k of [-1, 0, 1]) { g.moveTo(x, y - 96 * s); g.lineTo(x + k * 34 * s, y - 30 * s); } g.stroke();
    isik(g, x, y + 6 * s, 150 * s, "rgba(255,200,110,.5)");
    g.fillStyle = dz(g, x - 40 * s, 0, x + 40 * s, 0, [[0, "rgba(255,214,140,.55)"], [0.5, "rgba(255,240,200,.85)"], [1, "rgba(210,150,70,.55)"]]);
    g.beginPath(); g.moveTo(x - 40 * s, y - 30 * s); g.lineTo(x + 40 * s, y - 30 * s);
    g.bezierCurveTo(x + 44 * s, y + 10 * s, x + 30 * s, y + 34 * s, x + 12 * s, y + 46 * s); g.lineTo(x + 6 * s, y + 70 * s); g.lineTo(x - 6 * s, y + 70 * s); g.lineTo(x - 12 * s, y + 46 * s);
    g.bezierCurveTo(x - 30 * s, y + 34 * s, x - 44 * s, y + 10 * s, x - 40 * s, y - 30 * s); g.fill();
    g.fillStyle = "rgba(255,226,160,.9)"; g.fillRect(x - 42 * s, y - 34 * s, 84 * s, 6 * s);
    g.fillStyle = "#fff6dc"; g.beginPath(); g.moveTo(x, y - 6 * s); g.quadraticCurveTo(x + 9 * s, y + 10 * s, x, y + 18 * s); g.quadraticCurveTo(x - 9 * s, y + 10 * s, x, y - 6 * s); g.fill();
    g.restore();
  }
  // Osmanlı lalesi: badem biçimli, sivri uçlu taç yapraklar
  function lale(g, x, y, s, a, r1, r2, sap) {
    g.save(); g.translate(x, y); g.rotate(a || 0); g.scale(s, s);
    g.strokeStyle = sap; g.lineWidth = 7; g.lineCap = "round"; g.beginPath(); g.moveTo(0, -6); g.quadraticCurveTo(14, 130, 0, 260); g.stroke();
    g.fillStyle = sap; g.beginPath(); g.moveTo(4, 236); g.quadraticCurveTo(70, 170, 56, 74); g.quadraticCurveTo(34, 168, 4, 200); g.fill();
    g.beginPath(); g.moveTo(2, 250); g.quadraticCurveTo(-64, 200, -50, 120); g.quadraticCurveTo(-24, 196, 2, 226); g.fill();
    g.fillStyle = dz(g, 0, -150, 0, 0, [[0, r1], [1, r2]]);
    for (const k of [-1, 1]) { g.beginPath(); g.moveTo(0, 0); g.bezierCurveTo(k * 50, -8, k * 56, -76, k * 34, -126); g.bezierCurveTo(k * 22, -84, k * 10, -46, 0, -26); g.closePath(); g.fill(); }
    g.beginPath(); g.moveTo(0, 4); g.bezierCurveTo(-34, -22, -28, -100, 0, -150); g.bezierCurveTo(28, -100, 34, -22, 0, 4); g.fill();
    g.restore();
  }
  // Selçuklu yıldız ve haç deseni (sekiz köşeli yıldızlar arasında haçlar)
  function selcuk(g, x, y, w, h, P, r) {
    g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
    g.fillStyle = r.zemin; g.fillRect(x, y, w, h);
    const yildiz = (cx, cy, R) => {
      const a = R / Math.SQRT2; g.beginPath();
      for (let i = 0; i < 16; i++) { const t = (i * Math.PI) / 8 - Math.PI / 2, rr = i % 2 ? R * 0.76 : R; g.lineTo(cx + Math.cos(t) * rr, cy + Math.sin(t) * rr); }
      g.closePath(); return a;
    };
    for (let j = -1; j * P * 0.5 < h + P; j++) for (let i = -1; i * P < w + P; i++) {
      const cx = x + i * P + (j % 2 ? P / 2 : 0), cy = y + j * P * 0.5 * 1.0;
      yildiz(cx, cy, P * 0.42); g.fillStyle = r.yildiz; g.fill(); g.lineWidth = P * 0.05; g.strokeStyle = r.cizgi; g.stroke();
      yildiz(cx, cy, P * 0.17); g.fillStyle = r.ic; g.fill();
    }
    g.restore();
  }

  // ---------- yazı düzeni ----------
  // Tarih satırı, başlık, alt yazı, söz ve imza: hepsi alana dikey ortalanır
  // Sığmazsa yazılar ve imza birlikte küçülür (en çok %30), alt imzanın üstüne taşmaz
  function yazilar(g, W, o, st) {
    const alt = st.alt || 1112, alan = alt - st.ust;
    const kur = (f) => {
      const L = [], b = (n) => Math.round(n * f);
      if (o.tarih) L.push(Y.tarihSatiri(g, W, o.tarih, st.vurgu, st.tpx || 30), b(st.tara || 24));
      L.push(Y.blok(g, o.bas, { en: st.en || 900, font: (px) => Y.PF(800, px), px: b(st.px || 64), min: b(42), max: st.bmax || 3, lh: 1.17, renk: st.renk, x: W / 2 }));
      if (o.alt && !st.altYok) L.push(b(18), Y.blok(g, o.alt, { en: st.aen || 860, font: (px) => Y.PF(600, px), px: b(st.apx || 36), min: b(28), max: 3, lh: 1.36, renk: st.soluk, x: W / 2 }));
      if (st.soz) {
        L.push(b(st.sara || 34), Y.blok(g, st.soz, { en: st.sen || 840, font: (px) => Y.PF(600, px), px: b(st.spx || 38), min: b(28), max: st.smax || 3, lh: 1.36, renk: st.sozRenk || st.renk, x: W / 2 }));
        if (st.kim) { const k = b(26); L.push(b(10), { h: k + 12, ciz: (y) => { g.font = Y.PF(700, k); g.fillStyle = st.soluk; Y.harfAra(g, 2); g.fillText(st.kim, W / 2, y + (k + 12) / 2); Y.harfAra(g, 0); } }); }
      }
      if (st.imza) { const e = b(st.imzaEn || 330), h = Math.round(e * 0.37) + 6; L.push(b(st.soz ? 10 : 24), { h, ciz: (y) => ataImza(g, W / 2, y + h / 2, e, st.imza) }); }
      return L;
    };
    let L;
    for (let f = 1; f >= 0.7; f -= 0.05) { L = kur(f); if (L.reduce((a, x) => a + (typeof x === "number" ? x : x.h), 0) <= alan) break; }
    Y.diz(L, st.ust, alt);
  }
  const altImza = (g, W, o, renk, vurgu, soluk) => Y.imza(g, W, 1176, o.ikon, renk, vurgu, soluk);
  const TL = (a, b) => Y.TL(a, b);
  const en = () => Y.DIL() === "en";

  const K = {};

  // ===== 29 Ekim =====
  // A: gece, dalgalanan büyük bayrak, havai fişekler ve şehir ışıkları
  K["cumhuriyet-a"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#070b1f"], [0.45, "#16153a"], [0.7, "#3a1630"], [1, "#2a0d1c"]]);
    yildizlar(g, W, 0, 690, 160, 1923, (x, y) => y > 600);
    havaiFisek(g, 170, 170, 110, "rgba(255,206,92,1)", 30, 3); havaiFisek(g, 920, 140, 92, "rgba(255,120,120,1)", 26, 5);
    havaiFisek(g, 860, 420, 64, "rgba(255,255,255,1)", 22, 7); havaiFisek(g, 110, 430, 58, "rgba(255,160,90,1)", 20, 11);
    // şehir: ufak kubbe ve kuleler, pencereler
    const r = rastgele(29); g.fillStyle = "#12101f"; g.beginPath(); g.moveTo(0, 700);
    for (let x = 0; x <= W; x += 30 + r() * 40) { const h = 24 + r() * 70; g.lineTo(x, 700 - h); g.lineTo(x + 26, 700 - h); }
    g.lineTo(W, 700); g.closePath(); g.fill();
    g.fillStyle = "rgba(255,214,140,.7)"; for (let i = 0; i < 80; i++) g.fillRect(r() * W, 640 + r() * 56, 3, 4);
    direk(g, 268, 130, 700, 12, "#cfc8bd");
    bayrak(g, 274, 150, 560, { A: 32, k: 1.7, faz: 0.6, golge: "rgba(0,0,0,.45)" });
    g.fillStyle = "#2a0d1c"; g.fillRect(0, 700, W, H - 700);
    yazilar(g, W, o, { ust: 720, renk: "#fff", vurgu: "#ffcf5c", soluk: "rgba(255,255,255,.78)", px: 62, bmax: 2, altYok: !!o.soz, soz: o.soz, spx: 44, sozRenk: "#ffe2a8", kim: o.kim, imza: o.imzaVar ? "rgba(255,236,200,.92)" : null, imzaEn: 280 });
    altImza(g, W, o, "#fff", "#ffcf5c", "rgba(255,255,255,.7)");
  };
  // B: bayrak kırmızısı afiş: ay-yıldız, kocaman yıl sayısı, söz ve imza
  K["cumhuriyet-b"] = (g, W, H, o) => {
    g.fillStyle = rz(g, W / 2, 380, 60, 1100, [[0, "#f3252f"], [0.55, "#e30a17"], [1, "#9d040e"]]); g.fillRect(0, 0, W, H);
    // ince ışın deseni
    g.save(); g.globalAlpha = 0.07; g.fillStyle = "#fff"; g.translate(W / 2, 400);
    for (let i = 0; i < 36; i++) { g.rotate(PI2 / 36); g.beginPath(); g.moveTo(0, 0); g.lineTo(-30, -1400); g.lineTo(30, -1400); g.closePath(); g.fill(); }
    g.restore();
    g.strokeStyle = "rgba(255,255,255,.35)"; g.lineWidth = 2; g.strokeRect(44, 44, W - 88, H - 88);
    Y.ayYildiz(g, W / 2, 190, 220, "#fff");
    const sayi = o.sayi || "";
    g.save(); g.font = Y.PF(800, 330); g.fillStyle = "#fff"; g.shadowColor = "rgba(90,0,8,.4)"; g.shadowBlur = 40; g.shadowOffsetY = 12; g.fillText(String(sayi), W / 2, 470); g.restore();
    g.font = Y.PF(800, 40); g.fillStyle = "rgba(255,255,255,.92)"; Y.harfAra(g, 18); g.fillText(en() ? "YEARS" : "YIL", W / 2 + 9, 655); Y.harfAra(g, 0);
    yazilar(g, W, o, { ust: 700, alt: 1110, renk: "#fff", vurgu: "rgba(255,255,255,.88)", soluk: "rgba(255,255,255,.86)", px: 58, altYok: !!o.soz, soz: o.soz, kim: o.soz && !o.imzaVar ? o.kim : "", imza: o.imzaVar ? "#fff" : null, imzaEn: 300 });
    altImza(g, W, o, "#fff", "#fff", "rgba(255,255,255,.78)");
  };

  // ===== 24 Kasım =====
  // A: kara tahta, 1928 harf devriminin yeni alfabesi ve tebeşirle Atatürk'ün imzası
  K["ogretmen-a"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#efe4d2"], [1, "#e4d3b8"]]);
    // tahta çerçevesi
    const x = 70, y = 70, w = W - 140, h = 600;
    g.save(); g.shadowColor = "rgba(60,30,10,.35)"; g.shadowBlur = 30; g.shadowOffsetY = 12;
    g.fillStyle = dz(g, 0, y, 0, y + h, [[0, "#9b6a3c"], [1, "#6e4522"]]); g.beginPath(); g.roundRect(x, y, w, h, 18); g.fill(); g.restore();
    g.fillStyle = dz(g, 0, y + 22, 0, y + h - 22, [[0, "#2f5443"], [1, "#24443a"]]); g.fillRect(x + 22, y + 22, w - 44, h - 44);
    // tebeşir tozu lekeleri
    const r = rastgele(1124); g.save(); g.globalAlpha = 0.05; g.fillStyle = "#fff";
    for (let i = 0; i < 26; i++) { g.beginPath(); g.ellipse(x + 40 + r() * (w - 80), y + 40 + r() * (h - 80), 40 + r() * 120, 10 + r() * 30, r() * 3, 0, PI2); g.fill(); }
    g.restore();
    const tebesir = (t, tx, ty, px, w8) => {
      g.font = Y.PF(w8 || 700, px);
      for (const [dx, dy, a] of [[0, 0, 0.82], [1.2, 0.6, 0.25], [-0.8, 0.9, 0.2]]) { g.globalAlpha = a; g.fillStyle = "#f4f1e8"; g.fillText(t, tx + dx, ty + dy); }
      g.globalAlpha = 1;
    };
    tebesir("Aa  Bb  Cc  Çç  Dd  Ee  Ff  Gg  Ğğ", W / 2, y + 112, 46, 600);
    tebesir("Hh  Iı  İi  Jj  Kk  Ll  Mm  Nn  Oo", W / 2, y + 182, 46, 600);
    g.globalAlpha = 0.5; g.strokeStyle = "#f4f1e8"; g.lineWidth = 3; g.beginPath(); g.moveTo(W / 2 - 300, y + 236); g.lineTo(W / 2 + 300, y + 238); g.stroke(); g.globalAlpha = 1;
    tebesir(en() ? "Head Teacher" : "Başöğretmen", W / 2, y + 300, 64, 800);
    g.globalAlpha = 0.88; ataImza(g, W / 2, y + 430, 400, "#f4f1e8"); g.globalAlpha = 1;
    // tebeşirlik ve tebeşirler
    g.fillStyle = "#5a381b"; g.fillRect(x + 10, y + h - 14, w - 20, 22);
    g.fillStyle = "#f6f3ea"; g.fillRect(x + 140, y + h - 22, 70, 12); g.fillStyle = "#f2c94c"; g.fillRect(x + 240, y + h - 22, 46, 12);
    g.fillStyle = "#3d4e66"; g.beginPath(); g.roundRect(x + w - 260, y + h - 34, 120, 26, 6); g.fill(); g.fillStyle = "#e9e1d0"; g.fillRect(x + w - 260, y + h - 14, 120, 6);
    // elma
    g.fillStyle = rz(g, W - 170, 720, 4, 54, [[0, "#ff6b5b"], [1, "#c81d25"]]); g.beginPath(); g.arc(W - 186, 726, 40, 0, PI2); g.arc(W - 154, 726, 40, 0, PI2); g.fill();
    g.strokeStyle = "#5a381b"; g.lineWidth = 5; g.beginPath(); g.moveTo(W - 170, 690); g.quadraticCurveTo(W - 166, 674, W - 156, 664); g.stroke();
    g.fillStyle = "#3f8f4e"; g.beginPath(); g.ellipse(W - 146, 680, 20, 9, -0.5, 0, PI2); g.fill();
    yazilar(g, W, o, { ust: 770, renk: "#2b2118", vurgu: "#a5532a", soluk: "#5d4b3c", px: 60 });
    altImza(g, W, o, "#2b2118", "#a5532a", "#7a6656");
  };
  // B: defter sayfası, kalem ve mürekkeple imza
  K["ogretmen-b"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#1d3557"], [1, "#14253f"]]);
    // açık defter
    const x = 90, y = 90, w = W - 180, h = 620;
    g.save(); g.shadowColor = "rgba(0,0,0,.4)"; g.shadowBlur = 40; g.shadowOffsetY = 18; g.fillStyle = "#fbf8f1"; g.beginPath(); g.roundRect(x, y, w, h, 14); g.fill(); g.restore();
    g.strokeStyle = "rgba(70,120,190,.28)"; g.lineWidth = 2; for (let yy = y + 100; yy < y + h - 20; yy += 46) { g.beginPath(); g.moveTo(x + 20, yy); g.lineTo(x + w - 20, yy); g.stroke(); }
    g.strokeStyle = "rgba(220,60,60,.55)"; g.beginPath(); g.moveTo(x + 120, y + 10); g.lineTo(x + 120, y + h - 10); g.stroke();
    g.fillStyle = "#dfe3ea"; for (let yy = y + 60; yy < y + h - 30; yy += 64) { g.beginPath(); g.arc(x + 50, yy, 13, 0, PI2); g.fill(); }
    g.textAlign = "left"; g.font = Y.PF(800, 40); g.fillStyle = "#1d3557"; g.fillText("24.11", x + 150, y + 74); g.textAlign = "center";
    g.font = Y.PF(700, 48); g.fillStyle = "#24477a"; g.fillText(en() ? "Thank you, teacher" : "Teşekkürler öğretmenim", x + w / 2 + 50, y + 250);
    ataImza(g, x + w / 2 + 50, y + 420, 380, "#1d3557");
    g.globalAlpha = 0.5; g.strokeStyle = "#1d3557"; g.lineWidth = 2; g.beginPath(); g.moveTo(x + w / 2 - 130, y + 520); g.lineTo(x + w / 2 + 230, y + 520); g.stroke(); g.globalAlpha = 1;
    g.font = Y.PF(700, 26); g.fillStyle = "#556b8c"; Y.harfAra(g, 3); g.fillText(en() ? "HEAD TEACHER ATATÜRK" : "BAŞÖĞRETMEN ATATÜRK", x + w / 2 + 50, y + 556); Y.harfAra(g, 0);
    // kurşun kalem
    g.save(); g.translate(W - 150, 120); g.rotate(0.62);
    g.fillStyle = "#f2b33d"; g.fillRect(-200, -15, 330, 30); g.fillStyle = "#d9952a"; g.fillRect(-200, 5, 330, 10);
    g.fillStyle = "#e9c9a0"; g.beginPath(); g.moveTo(130, -15); g.lineTo(180, 0); g.lineTo(130, 15); g.fill();
    g.fillStyle = "#333"; g.beginPath(); g.moveTo(166, -4.5); g.lineTo(180, 0); g.lineTo(166, 4.5); g.fill();
    g.fillStyle = "#c9ccd3"; g.fillRect(-230, -15, 30, 30); g.fillStyle = "#ef8f9a"; g.beginPath(); g.roundRect(-262, -15, 34, 30, [10, 0, 0, 10]); g.fill();
    g.restore();
    yazilar(g, W, o, { ust: 760, renk: "#fff", vurgu: "#f2c14e", soluk: "rgba(255,255,255,.8)", px: 60 });
    altImza(g, W, o, "#fff", "#f2c14e", "rgba(255,255,255,.66)");
  };

  // ===== Kandiller, Kadir Gecesi, Ramazan =====
  // A: gece, cami silueti, minareler arasında mahya, aydınlık pencereler
  const kandilA = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#050a1e"], [0.5, "#0f1d46"], [0.72, "#1c2f66"], [1, "#0b1433"]]);
    yildizlar(g, W, 0, 700, o.kadir ? 420 : 220, 1210, (x, y) => Math.hypot(x - 830, y - 170) < 110);
    Y.hilal(g, 830, 170, 70);
    isik(g, W / 2, 640, 520, "rgba(255,190,110,.18)");
    const c = cami(g, W / 2, 760, 0.95, "#070c22", { minare: 2, pencere: "rgba(255,206,120,.95)" });
    // mahya ipleri
    g.strokeStyle = "rgba(255,226,170,.25)"; g.lineWidth = 1.5; const my = 760 - 0.95 * 400;
    g.beginPath(); g.moveTo(c.sol, my - 34); g.quadraticCurveTo(W / 2, my - 10, c.sag, my - 34); g.stroke();
    if (o.mahya) mahya(g, o.mahya, W / 2, my, 0.95 * 520, "#ffe3a8");
    g.fillStyle = "#070c22"; g.fillRect(0, 758, W, H - 758);
    yazilar(g, W, o, { ust: 790, renk: "#fff", vurgu: "#f0c67a", soluk: "rgba(255,255,255,.82)", px: 66 });
    altImza(g, W, o, "#fff", "#f0c67a", "rgba(255,255,255,.66)");
  };
  // B: Selçuklu yıldız deseni üstünde asılı üç kandil
  const kandilB = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#0a1630"], [1, "#071022"]]);
    g.save(); g.globalAlpha = 0.5; selcuk(g, 0, 0, W, 740, 120, { zemin: "#0c1a3a", yildiz: "#13305e", cizgi: "#1f4a86", ic: "#c9a45c" }); g.restore();
    g.fillStyle = dz(g, 0, 380, 0, 760, [[0, "rgba(7,16,34,0)"], [1, "#071022"]]); g.fillRect(0, 380, W, 380);
    for (const [x, y, s] of [[W / 2, 420, 1.5], [W / 2 - 290, 330, 1.05], [W / 2 + 290, 330, 1.05]]) kandil(g, x, y, s, 0);
    g.strokeStyle = "rgba(236,196,120,.4)"; g.lineWidth = 2; g.strokeRect(44, 44, W - 88, H - 88);
    yazilar(g, W, o, { ust: 640, renk: "#fff", vurgu: "#e8c27a", soluk: "rgba(255,255,255,.82)", px: 68 });
    altImza(g, W, o, "#fff", "#e8c27a", "rgba(255,255,255,.66)");
  };
  for (const k of ["kandil", "kadir", "ramazan"]) { K[k + "-a"] = kandilA; K[k + "-b"] = kandilB; }

  // ===== Ramazan ve Kurban Bayramı =====
  // A: şafak, cami silueti ve önde lale bahçesi
  const bayramA = (g, W, H, o) => {
    const kurban = o.kart.startsWith("kurban");
    zemin(g, W, H, kurban ? [[0, "#2c3e7a"], [0.45, "#d77a61"], [0.7, "#f6c48f"], [1, "#f6c48f"]] : [[0, "#1f4f8f"], [0.45, "#7ab6d9"], [0.72, "#f7d9a8"], [1, "#f7d9a8"]]);
    isik(g, W / 2, 600, 420, "rgba(255,236,190,.55)");
    cami(g, W / 2, 640, 0.9, kurban ? "#3a2a4f" : "#24406b", { minare: 4 });
    g.fillStyle = kurban ? "#3a2a4f" : "#24406b"; g.fillRect(0, 636, W, 10);
    g.fillStyle = dz(g, 0, 640, 0, 800, [[0, "#2f6b3e"], [1, "#1f4a2c"]]); g.fillRect(0, 640, W, H - 640);
    const r = rastgele(kurban ? 1605 : 903), renk = kurban ? [["#ffd166", "#f08c00"], ["#ff8fab", "#d6336c"], ["#ffffff", "#f1d3e0"]] : [["#ff6b6b", "#c92a2a"], ["#ffd43b", "#f08c00"], ["#ff8787", "#e8590c"]];
    for (let i = 0; i < 26; i++) {
      const x = 30 + r() * (W - 60), y = 700 + r() * 70, s = 0.36 + r() * 0.2, k = renk[i % 3];
      lale(g, x, y, s, (r() - 0.5) * 0.3, k[0], k[1], "#2b7a3d");
    }
    g.fillStyle = dz(g, 0, 760, 0, 860, [[0, "rgba(22,52,32,0)"], [1, "#163420"]]); g.fillRect(0, 760, W, 100); g.fillStyle = "#163420"; g.fillRect(0, 860, W, H - 860);
    yazilar(g, W, o, { ust: 870, renk: "#fff", vurgu: "#ffd166", soluk: "rgba(255,255,255,.84)", px: 64 });
    altImza(g, W, o, "#fff", "#ffd166", "rgba(255,255,255,.7)");
  };
  // B: çini çerçeve: kobalt mavisi zemin, köşelerde laleler
  const bayramB = (g, W, H, o) => {
    const kurban = o.kart.startsWith("kurban");
    g.fillStyle = "#f7f1e3"; g.fillRect(0, 0, W, H);
    selcuk(g, 0, 0, W, H, 132, kurban ? { zemin: "#7a1f2b", yildiz: "#f7f1e3", cizgi: "#c9a45c", ic: "#1f8a8a" } : { zemin: "#1d4f9c", yildiz: "#f7f1e3", cizgi: "#c9a45c", ic: "#d9363e" });
    g.save(); g.shadowColor = "rgba(0,0,0,.3)"; g.shadowBlur = 30; g.fillStyle = "#fbf6ea"; g.beginPath(); g.roundRect(80, 80, W - 160, H - 160, 28); g.fill(); g.restore();
    g.strokeStyle = "#c9a45c"; g.lineWidth = 3; g.beginPath(); g.roundRect(100, 100, W - 200, H - 200, 20); g.stroke();
    const k1 = kurban ? "#c2253b" : "#d9363e", k2 = kurban ? "#7a1f2b" : "#9b1c22";
    lale(g, W / 2, 330, 0.95, 0, k1, k2, "#2b7a5d"); lale(g, W / 2 - 150, 380, 0.7, -0.35, "#2f6fd1", "#1d4f9c", "#2b7a5d"); lale(g, W / 2 + 150, 380, 0.7, 0.35, "#2f6fd1", "#1d4f9c", "#2b7a5d");
    g.fillStyle = "#fbf6ea"; g.fillRect(110, 540, W - 220, 40);
    yazilar(g, W, o, { ust: 600, alt: 1060, renk: "#14284d", vurgu: kurban ? "#a62639" : "#1d4f9c", soluk: "#4a5672", px: 62, en: 800, aen: 760 });
    Y.imza(g, W, 1128, o.ikon, "#14284d", kurban ? "#a62639" : "#1d4f9c", "#6c7590");
  };
  for (const k of ["rbayram", "kurban"]) { K[k + "-a"] = bayramA; K[k + "-b"] = bayramB; }

  // ===== ortak parçalar 2 =====
  // Peri bacası: gövde ışıklı ve gölgeli, tepede koyu başlık, üstünde kar
  function peribaca(g, x, by, w, h, ac, koyu, bas, kar) {
    g.fillStyle = dz(g, x - w / 2, 0, x + w / 2, 0, [[0, ac], [0.55, ac], [1, koyu]]);
    g.beginPath(); g.moveTo(x - w / 2, by);
    g.bezierCurveTo(x - w * 0.42, by - h * 0.5, x - w * 0.16, by - h * 0.7, x - w * 0.14, by - h * 0.9);
    g.lineTo(x + w * 0.14, by - h * 0.9); g.bezierCurveTo(x + w * 0.16, by - h * 0.7, x + w * 0.42, by - h * 0.5, x + w / 2, by); g.closePath(); g.fill();
    g.fillStyle = bas; g.beginPath(); g.ellipse(x, by - h * 0.92, w * 0.3, h * 0.07, 0, 0, PI2); g.fill();
    if (kar) { g.fillStyle = kar; g.beginPath(); g.ellipse(x, by - h * 0.95, w * 0.27, h * 0.045, 0, Math.PI, 0); g.fill(); }
  }
  // Kapadokya kaya konisi: geniş tabanlı, yuvarlak tepeli, üstü karlı, kayaya oyulmuş kapı ve pencereler
  function kayaKoni(g, x, by, w, h, r) {
    const yol = () => { g.beginPath(); g.moveTo(x - w / 2, by); g.quadraticCurveTo(x - w * 0.36, by - h * 0.62, x - w * 0.1, by - h * 0.96); g.quadraticCurveTo(x, by - h * 1.03, x + w * 0.1, by - h * 0.96); g.quadraticCurveTo(x + w * 0.36, by - h * 0.62, x + w / 2, by); g.closePath(); };
    yol(); g.fillStyle = dz(g, x - w / 2, 0, x + w / 2, 0, [[0, "#f3d2b3"], [0.55, "#e9bf9b"], [1, "#c98d6e"]]); g.fill();
    g.save(); yol(); g.clip();
    g.fillStyle = "#fbfdff"; g.beginPath(); g.moveTo(x - w, by - h * 0.74);
    for (let i = 0; i <= 8; i++) g.quadraticCurveTo(x - w / 2 + (i + 0.5) * (w / 8), by - h * (0.7 + (r() - 0.5) * 0.08), x - w / 2 + (i + 1) * (w / 8), by - h * 0.74);
    g.lineTo(x + w, by - h * 1.1); g.lineTo(x - w, by - h * 1.1); g.closePath(); g.fill();
    g.fillStyle = "rgba(120,70,50,.18)"; g.fillRect(x + w * 0.12, by - h, w, h);
    g.fillStyle = "#6b3f2e";
    for (let i = 0; i < Math.round(w / 60); i++) { const px = x + (r() - 0.5) * w * 0.5, py = by - h * (0.2 + r() * 0.4), s = 7 + r() * 5; g.beginPath(); g.moveTo(px - s, py + s * 1.6); g.lineTo(px - s, py); g.arc(px, py, s, Math.PI, 0); g.lineTo(px + s, py + s * 1.6); g.closePath(); g.fill(); }
    g.restore();
  }
  // Sıcak hava balonu: dikey şeritli zarf, sepet ve ipler
  function balon(g, x, y, s, r1, r2) {
    g.save(); g.translate(x, y); g.scale(s, s);
    const zarf = () => { g.beginPath(); g.moveTo(-16, 70); g.bezierCurveTo(-70, 30, -66, -66, 0, -66); g.bezierCurveTo(66, -66, 70, 30, 16, 70); g.closePath(); };
    zarf(); g.fillStyle = r1; g.fill();
    g.save(); zarf(); g.clip(); g.fillStyle = r2;
    for (const k of [-2, 0, 2]) { g.beginPath(); g.ellipse(k * 15, 0, 7.5, 80, 0, 0, PI2); g.fill(); }
    g.fillStyle = "rgba(255,255,255,.22)"; g.beginPath(); g.ellipse(-24, -30, 18, 30, -0.3, 0, PI2); g.fill();
    g.fillStyle = "rgba(0,0,0,.16)"; g.fillRect(20, -70, 60, 150); g.restore();
    g.strokeStyle = "rgba(60,40,30,.7)"; g.lineWidth = 1.6; g.beginPath(); g.moveTo(-14, 70); g.lineTo(-8, 88); g.moveTo(14, 70); g.lineTo(8, 88); g.stroke();
    g.fillStyle = "#6b4426"; g.fillRect(-10, 87, 20, 14);
    g.restore();
  }
  // Çam ağacı, üstünde kar
  function cam(g, x, by, h, renk, kar) {
    const w = h * 0.5; g.fillStyle = renk;
    for (let i = 0; i < 3; i++) { const t = by - h * (0.2 + i * 0.27), ww = w * (1 - i * 0.25); g.beginPath(); g.moveTo(x - ww / 2, t + h * 0.12); g.lineTo(x, t - h * 0.28); g.lineTo(x + ww / 2, t + h * 0.12); g.closePath(); g.fill(); }
    g.fillRect(x - h * 0.03, by - h * 0.12, h * 0.06, h * 0.12);
    if (kar) { g.fillStyle = kar; for (let i = 0; i < 3; i++) { const t = by - h * (0.2 + i * 0.27), ww = w * (1 - i * 0.25) * 0.5; g.beginPath(); g.moveTo(x - ww / 2, t - h * 0.1); g.lineTo(x, t - h * 0.28); g.lineTo(x + ww / 2, t - h * 0.1); g.quadraticCurveTo(x, t - h * 0.05, x - ww / 2, t - h * 0.1); g.fill(); } }
  }
  // Defne dalı: ortadan iki yana açılan yapraklar (zafer çelengi)
  function defne(g, cx, cy, R, renk, yon) {
    g.save(); g.fillStyle = renk; g.strokeStyle = renk; g.lineWidth = 4;
    g.beginPath(); g.arc(cx, cy, R, Math.PI / 2 + yon * 0.25, Math.PI / 2 + yon * 2.55, yon < 0); g.stroke();
    for (let i = 0; i < 13; i++) {
      const a = Math.PI / 2 + yon * (0.4 + i * 0.17), x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R, t = a + yon * Math.PI / 2;
      for (const d of [-1, 1]) { g.save(); g.translate(x, y); g.rotate(t + d * 0.65 * yon + (yon > 0 ? 0 : Math.PI)); g.beginPath(); g.ellipse(0, -16, 7, 18, 0, 0, PI2); g.fill(); g.restore(); }
    }
    g.restore();
  }
  // Çocuk: yüzsüz, düz renkli simge (el ele tutuşan sıra için). sac: "kisa" | "atkuyrugu"
  function cocuk(g, x, by, s, govde, sac, tip) {
    g.save(); g.translate(x, by); g.scale(s, s);
    g.fillStyle = "#3b2a22"; g.fillRect(-11, -46, 8, 46); g.fillRect(3, -46, 8, 46);
    g.fillStyle = govde; g.beginPath();
    if (tip === "etek") { g.moveTo(-14, -112); g.lineTo(14, -112); g.lineTo(30, -40); g.lineTo(-30, -40); } else { g.moveTo(-17, -112); g.lineTo(17, -112); g.lineTo(19, -44); g.lineTo(-19, -44); }
    g.closePath(); g.fill();
    g.fillStyle = "#e9b48a"; g.beginPath(); g.arc(0, -134, 21, 0, PI2); g.fill();
    g.fillStyle = sac; g.beginPath(); g.arc(0, -138, 22, Math.PI * 1.02, Math.PI * 1.98); g.fill();
    if (tip === "etek") { g.beginPath(); g.ellipse(22, -136, 7, 16, 0.5, 0, PI2); g.fill(); }
    g.restore();
  }
  // Fotoğraf kartı: kamu malı fotoğraf tek renk tonlu işlenir (koyu ve açık renk arasında), alt kısım zemine erir
  function duoton(img, w, h, odak, koyu, acik) {
    const c = yeni(w, h), x = c.getContext("2d"), o = Math.max(w / img.width, h / img.height), iw = img.width * o, ih = img.height * o;
    x.drawImage(img, (w - iw) * odak[0], (h - ih) * odak[1], iw, ih);
    const d = x.getImageData(0, 0, w, h), p = d.data, hex = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16)), K = hex(koyu), A = hex(acik);
    for (let i = 0; i < p.length; i += 4) {
      let l = (0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2]) / 255; l = Math.min(1, Math.max(0, (l - 0.06) / 0.88)); l = l * l * (3 - 2 * l);
      p[i] = K[0] + (A[0] - K[0]) * l; p[i + 1] = K[1] + (A[1] - K[1]) * l; p[i + 2] = K[2] + (A[2] - K[2]) * l;
    }
    x.putImageData(d, 0, 0); return c;
  }
  const FOTO = {
    canakkale: { odak: [0.5, 0.25], koyu: "#140d0a", acik: "#f1dfc2", zemin: "#140d0a", vurgu: "#e8b86b", kaynak: "1915, Gelibolu" },
    cocuk: { odak: [0.5, 0.2], koyu: "#10192e", acik: "#e9eef7", zemin: "#10192e", vurgu: "#ffcf5c", kaynak: "1929" },
    genclik: { odak: [0.5, 0.2], koyu: "#1a0b0d", acik: "#f4e2d6", zemin: "#1a0b0d", vurgu: "#ff8a80", kaynak: "1919" },
    zafer: { odak: [0.5, 0.12], koyu: "#18110a", acik: "#f3e2c4", zemin: "#18110a", vurgu: "#e8b86b", kaynak: "1922" },
    cumhuriyet: { odak: [0.5, 0.1], koyu: "#2a0306", acik: "#f2cfc6", zemin: "#2a0306", vurgu: "#ff6b6b", kaynak: "1923" },
    ogretmen: { odak: [0.5, 0.25], koyu: "#0e1a17", acik: "#e8efe6", zemin: "#0e1a17", vurgu: "#9fd3a8", kaynak: "1928, Kayseri" }
  };
  const fotoKart = (g, W, H, o) => {
    const ad = o.kart.split("-")[0], f = FOTO[ad];
    // fotoğraf inemediyse (ör. çevrimdışı) aynı günün çizim kartına dön
    if (!o.foto && K[ad + "-a"]) return K[ad + "-a"](g, W, H, o);
    g.fillStyle = f.zemin; g.fillRect(0, 0, W, H);
    const UH = 760;
    if (o.foto) g.drawImage(duoton(o.foto, W, UH, f.odak, f.koyu, f.acik), 0, 0);
    g.fillStyle = dz(g, 0, 0, 0, 160, [[0, "rgba(0,0,0,.28)"], [1, "rgba(0,0,0,0)"]]); g.fillRect(0, 0, W, 160);
    g.fillStyle = dz(g, 0, UH - 320, 0, UH, [[0, "rgba(0,0,0,0)"], [1, f.zemin]]); g.fillRect(0, UH - 320, W, 320);
    g.font = Y.PF(700, 22); const ew = g.measureText(f.kaynak).width + 32;
    g.fillStyle = "rgba(0,0,0,.42)"; g.beginPath(); g.roundRect(W - 40 - ew, 34, ew, 40, 20); g.fill();
    g.fillStyle = "rgba(255,255,255,.9)"; g.fillText(f.kaynak, W - 40 - ew / 2, 55);
    yazilar(g, W, o, { ust: (o.soz || "").length > 80 ? UH - 150 : UH - 90, renk: "#fff", vurgu: f.vurgu, soluk: "rgba(255,255,255,.78)", px: 54, bmax: 2, altYok: !!o.soz, soz: o.soz, spx: 34, kim: o.kim, imza: o.imzaVar ? "rgba(255,255,255,.92)" : null, imzaEn: 250 });
    altImza(g, W, o, "#fff", f.vurgu, "rgba(255,255,255,.66)");
  };
  for (const k of Object.keys(FOTO)) K[k + "-c"] = fotoKart;

  // ===== Yılbaşı =====
  // A: yılın ilk şafağı, karlı peri bacaları üstünde balonlar
  K["yilbasi-a"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#2c2f6e"], [0.22, "#6e5aa0"], [0.42, "#e59a86"], [0.52, "#ffd3a1"], [0.56, "#f4f7fb"], [1, "#eef2f8"]]);
    isik(g, W / 2, 700, 380, "rgba(255,214,160,.6)");
    sirt(g, W, 760, "#b88aa6", [[-20, 640], [160, 600], [260, 630], [420, 590], [560, 640], [720, 600], [900, 620], [1100, 590]]);
    const r = rastgele(2027);
    const bal = [[180, 230, 0.9, "#e85d4a", "#ffd166"], [820, 170, 1.05, "#3a86ff", "#ffbe0b"], [560, 330, 0.7, "#ff006e", "#ffd6e7"], [370, 120, 0.55, "#2a9d8f", "#e9f5db"], [960, 420, 0.5, "#fb5607", "#fff1d6"], [90, 460, 0.45, "#8338ec", "#ffd166"], [700, 470, 0.38, "#f15bb5", "#fee440"]];
    for (const b of bal) balon(g, b[0], b[1], b[2], b[3], b[4]);
    // peri bacaları
    const kaya = [[60, 230, 220], [250, 260, 300], [430, 220, 210], [640, 300, 340], [840, 240, 250], [1010, 230, 290], [150, 170, 150], [740, 180, 160], [950, 160, 140]];
    for (const [x, w, h] of kaya) kayaKoni(g, x, 800, w, h, r);
    g.fillStyle = dz(g, 0, 760, 0, 820, [[0, "#ffffff"], [1, "#eef2f8"]]); g.beginPath(); g.moveTo(0, 790);
    for (let x = 0; x <= W; x += 60) g.quadraticCurveTo(x + 30, 770 + r() * 20, x + 60, 790); g.lineTo(W, H); g.lineTo(0, H); g.closePath(); g.fill();
    yazilar(g, W, o, { ust: 820, renk: "#1e2a4a", vurgu: "#c2410c", soluk: "#4b5878", px: 64 });
    altImza(g, W, o, "#1e2a4a", "#c2410c", "#6b7690");
  };
  // B: karlı çam ormanı üstünde havai fişekler, kocaman yeni yıl
  K["yilbasi-b"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#060a1c"], [0.6, "#15204a"], [1, "#0b1230"]]);
    yildizlar(g, W, 0, 640, 160, 101, null);
    havaiFisek(g, 220, 200, 130, "rgba(255,209,102,1)", 32, 13); havaiFisek(g, 860, 230, 110, "rgba(255,107,107,1)", 28, 17); havaiFisek(g, 560, 120, 80, "rgba(144,224,239,1)", 24, 19);
    g.save(); g.font = Y.PF(800, 230); g.fillStyle = dz(g, 0, 380, 0, 560, [[0, "#ffe7a3"], [1, "#e0a43c"]]); g.shadowColor = "rgba(255,200,100,.45)"; g.shadowBlur = 40; g.fillText(String(o.yil), W / 2, 400); g.restore();
    const r = rastgele(31);
    for (let i = 0; i < 30; i++) { const x = (i / 29) * W + (r() - 0.5) * 40, h = 90 + r() * 90; cam(g, x, 770 - r() * 16, h, i % 2 ? "#0e2a2c" : "#123536", "rgba(255,255,255,.92)"); }
    g.fillStyle = "#eef2fb"; g.beginPath(); g.moveTo(0, 762); g.quadraticCurveTo(W / 2, 744, W, 766); g.lineTo(W, 800); g.lineTo(0, 800); g.fill();
    g.fillStyle = dz(g, 0, 798, 0, 840, [[0, "#c9d3ea"], [1, "#0b1230"]]); g.fillRect(0, 798, W, 42); g.fillStyle = "#0b1230"; g.fillRect(0, 840, W, H - 840);
    yazilar(g, W, o, { ust: 850, renk: "#fff", vurgu: "#ffd166", soluk: "rgba(255,255,255,.8)", px: 62 });
    altImza(g, W, o, "#fff", "#ffd166", "rgba(255,255,255,.66)");
  };

  // ===== 12 Mart İstiklâl Marşı =====
  const marsSatir = (o) => (o.soz || "").split(/;\s*/).filter(Boolean);
  // A: parşömen üstünde marşın ilk iki dizesi, mürekkep hokkası ve kalem
  K["istiklal-a"] = (g, W, H, o) => {
    g.fillStyle = rz(g, W / 2, 360, 80, 1000, [[0, "#c8202b"], [1, "#6b0a10"]]); g.fillRect(0, 0, W, H);
    const x = 100, y = 90, w = W - 200, h = 560;
    g.save(); g.shadowColor = "rgba(40,0,0,.45)"; g.shadowBlur = 40; g.shadowOffsetY = 14;
    g.fillStyle = dz(g, x, y, x + w, y + h, [[0, "#fbf3df"], [0.5, "#f3e4c2"], [1, "#e8d2a6"]]); g.beginPath(); g.roundRect(x, y, w, h, 10); g.fill(); g.restore();
    g.strokeStyle = "rgba(150,100,40,.35)"; g.lineWidth = 2; g.strokeRect(x + 22, y + 22, w - 44, h - 44);
    Y.ayYildiz(g, W / 2, y + 90, 110, "#c8202b");
    const s = marsSatir(o);
    g.fillStyle = "#3a2414"; let px = 46; g.font = Y.PF(700, px); while (px > 30 && Math.max(...s.map((t) => g.measureText(t).width)) > w - 110) { px -= 2; g.font = Y.PF(700, px); }
    s.forEach((t, i) => g.fillText(t + (i < s.length - 1 ? ";" : ""), W / 2, y + 210 + i * px * 1.5));
    g.font = Y.PF(700, 24); g.fillStyle = "#8a5a2b"; Y.harfAra(g, 3); g.fillText(Y.buyuk(o.kim || ""), W / 2, y + 210 + s.length * px * 1.5 + 20); Y.harfAra(g, 0);
    // kâğıdın üstünde yatan tüy kalem
    g.save(); g.translate(W / 2 - 150, y + h - 62); g.rotate(1.38);
    g.fillStyle = "#fff8ea"; g.beginPath(); g.moveTo(0, 0); g.bezierCurveTo(-30, -60, -26, -170, 6, -250); g.bezierCurveTo(26, -170, 28, -60, 0, 0); g.fill();
    g.strokeStyle = "rgba(120,90,50,.6)"; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 6); g.lineTo(4, -240); g.stroke(); g.restore();
    yazilar(g, W, o, { ust: 690, renk: "#fff", vurgu: "#ffd9a0", soluk: "rgba(255,255,255,.86)", px: 54, altYok: false });
    altImza(g, W, o, "#fff", "#ffd9a0", "rgba(255,255,255,.72)");
  };
  // B: gökyüzünde dalgalanan bayrak, altında dizeler
  K["istiklal-b"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#a9d2f0"], [0.45, "#e6f2fb"], [0.5, "#fbfaf7"], [1, "#fbfaf7"]]);
    bulut(g, 860, 140, 1.1, "rgba(255,255,255,.85)"); bulut(g, 170, 320, 0.8, "rgba(255,255,255,.75)");
    direk(g, 150, 90, 640, 12, "#b9b4ab");
    bayrak(g, 156, 110, 780, { A: 40, k: 1.8, faz: 0.2, golge: "rgba(60,0,0,.25)" });
    const s = marsSatir(o);
    g.fillStyle = "#b5121b"; let px = 44; g.font = Y.PF(800, px); while (px > 28 && Math.max(...s.map((t) => g.measureText(t).width)) > W - 160) { px -= 2; g.font = Y.PF(800, px); }
    s.forEach((t, i) => g.fillText(t + (i < s.length - 1 ? ";" : ""), W / 2, 700 + i * px * 1.4));
    g.font = Y.PF(700, 24); g.fillStyle = "#8b6b5c"; Y.harfAra(g, 3); g.fillText(Y.buyuk(o.kim || ""), W / 2, 700 + s.length * px * 1.4 + 6); Y.harfAra(g, 0);
    yazilar(g, W, o, { ust: 820, renk: "#2a1416", vurgu: "#b5121b", soluk: "#6a5456", px: 50 });
    altImza(g, W, o, "#2a1416", "#b5121b", "#8b7476");
  };

  // ===== 18 Mart Çanakkale =====
  // Şehitler Abidesi: dört ayak üstünde kare blok (yandan iki ayak görünür)
  function abide(g, x, by, s, renk) {
    g.fillStyle = renk; g.beginPath();
    g.rect(x - 92 * s, by - 250 * s, 184 * s, 92 * s);
    g.moveTo(x - 92 * s, by - 160 * s); g.lineTo(x - 52 * s, by - 160 * s); g.lineTo(x - 46 * s, by); g.lineTo(x - 98 * s, by); g.closePath();
    g.moveTo(x + 92 * s, by - 160 * s); g.lineTo(x + 52 * s, by - 160 * s); g.lineTo(x + 46 * s, by); g.lineTo(x + 98 * s, by); g.closePath();
    g.rect(x - 140 * s, by - 10 * s, 280 * s, 10 * s); g.fill();
  }
  // A: Boğaz'da gün batımı, ince hilal, tepede abide ve bayrak
  K["canakkale-a"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#1a1033"], [0.22, "#5b1f45"], [0.38, "#c2453a"], [0.46, "#f39b4c"], [0.48, "#f7b267"], [1, "#160b14"]]);
    Y.hilal(g, 830, 150, 46);
    g.fillStyle = rz(g, 600, 600, 10, 120, [[0, "#fff1c9"], [0.6, "#ffb45c"], [1, "rgba(255,140,60,0)"]]); g.beginPath(); g.arc(600, 600, 120, 0, PI2); g.fill();
    g.fillStyle = "#ffd28a"; g.beginPath(); g.arc(600, 604, 70, Math.PI, 0); g.fill();
    // deniz
    g.fillStyle = dz(g, 0, 604, 0, 780, [[0, "#7a2f3d"], [1, "#2a1020"]]); g.fillRect(0, 604, W, 180);
    g.save(); g.globalAlpha = 0.8; g.fillStyle = "#ffcf8a"; const r = rastgele(1915);
    for (let y = 612; y < 760; y += 10) { const w = (90 - (y - 612) * 0.35) * (0.6 + r() * 0.8); g.fillRect(600 - w / 2 + (r() - 0.5) * 30, y, w, 2.5); }
    g.restore();
    // karşı kıyı ve yarımada
    sirt(g, W, 620, "#4a1c2e", [[560, 606], [700, 588], [860, 596], [1100, 580]], true);
    g.fillStyle = "#1e0d18"; g.beginPath(); g.moveTo(-10, 780); g.lineTo(-10, 520); g.quadraticCurveTo(150, 470, 300, 520); g.quadraticCurveTo(420, 560, 470, 640); g.quadraticCurveTo(500, 700, 560, 780); g.closePath(); g.fill();
    abide(g, 230, 506, 0.62, "#1e0d18");
    direk(g, 380, 400, 560, 5, "#1e0d18");
    bayrak(g, 383, 410, 120, { A: 7, k: 1.5, faz: 0.5 });
    g.fillStyle = "#160b14"; g.fillRect(0, 778, W, H - 778);
    yazilar(g, W, o, { ust: 770, renk: "#fff", vurgu: "#f7b267", soluk: "rgba(255,255,255,.8)", px: 50, soz: o.soz, spx: 40, sozRenk: "#ffe2bf", kim: o.kim });
    altImza(g, W, o, "#fff", "#f7b267", "rgba(255,255,255,.66)");
  };
  // B: sade, gece mavisi zemin, büyük hilal ve dize
  K["canakkale-b"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#0b1026"], [1, "#1b1030"]]);
    yildizlar(g, W, 0, 1100, 140, 318, (x, y) => y > 520 && x > 100 && x < W - 100);
    Y.hilal(g, W / 2 + 30, 270, 150);
    g.font = Y.PF(800, 34); g.fillStyle = "#e8b86b"; Y.harfAra(g, 10); g.fillText("18 MART 1915", W / 2 + 5, 520); Y.harfAra(g, 0);
    const q = Y.blok(g, "“" + (o.soz || "") + "”", { en: 860, font: (px) => Y.PF(700, px), px: 58, min: 40, max: 3, lh: 1.25, renk: "#fff", x: W / 2 });
    const L = [q, 18, { h: 40, ciz: (y) => { g.font = Y.PF(700, 26); g.fillStyle = "#e8b86b"; Y.harfAra(g, 3); g.fillText(Y.buyuk(o.kim || ""), W / 2, y + 20); Y.harfAra(g, 0); } }, 40,
      Y.blok(g, o.msj, { en: 860, font: (px) => Y.PF(600, px), px: 34, min: 28, max: 3, lh: 1.36, renk: "rgba(255,255,255,.8)", x: W / 2 })];
    Y.diz(L, 570, 1110);
    altImza(g, W, o, "#fff", "#e8b86b", "rgba(255,255,255,.62)");
  };

  // ===== 23 Nisan =====
  // İlk Meclis binası (Ulus), sade çizim: iki katlı taş bina, kemerli pencereler, ortada giriş ve bayrak
  function meclis(g, cx, by, s) {
    const w = 640 * s, h = 150 * s;
    g.fillStyle = "#a5503a"; g.beginPath(); g.moveTo(cx - w / 2 - 14 * s, by - h); g.lineTo(cx - w / 2 + 40 * s, by - h - 46 * s); g.lineTo(cx + w / 2 - 40 * s, by - h - 46 * s); g.lineTo(cx + w / 2 + 14 * s, by - h); g.closePath(); g.fill();
    g.fillStyle = "#d8b394"; g.fillRect(cx - w / 2, by - h, w, h);
    g.fillStyle = "#c9a07f"; g.fillRect(cx - w / 2, by - h * 0.52, w, 6 * s);
    g.fillStyle = "#e3c6aa"; g.fillRect(cx - 80 * s, by - h - 26 * s, 160 * s, h + 26 * s);
    g.fillStyle = "#a5503a"; g.beginPath(); g.moveTo(cx - 92 * s, by - h - 24 * s); g.lineTo(cx, by - h - 70 * s); g.lineTo(cx + 92 * s, by - h - 24 * s); g.closePath(); g.fill();
    const pen = (x, y, pw, ph) => { g.beginPath(); g.moveTo(x, y + ph); g.lineTo(x, y + pw / 2); g.arc(x + pw / 2, y + pw / 2, pw / 2, Math.PI, 0); g.lineTo(x + pw, y + ph); g.closePath(); g.fill(); };
    g.fillStyle = "#5b6f8a";
    for (const k of [-1, 1]) for (let i = 0; i < 5; i++) { const x = cx + k * (120 + i * 46) * s - 11 * s; pen(x, by - h + 22 * s, 22 * s, 40 * s); pen(x, by - h * 0.46 + 10 * s, 22 * s, 40 * s); }
    g.fillStyle = "#4a3428"; pen(cx - 24 * s, by - 64 * s, 48 * s, 64 * s);
    g.fillStyle = "#5b6f8a"; pen(cx - 42 * s, by - h + 4 * s, 26 * s, 42 * s); pen(cx + 16 * s, by - h + 4 * s, 26 * s, 42 * s);
    direk(g, cx, by - h - 170 * s, by - h - 66 * s, 4 * s, "#7a6a5c");
    bayrak(g, cx + 2 * s, by - h - 166 * s, 96 * s, { A: 5 * s, k: 1.4 });
  }
  function ucurtma(g, x, y, s, a, r1, r2, kuyruk) {
    g.save(); g.translate(x, y); g.rotate(a); g.scale(s, s);
    g.strokeStyle = "rgba(60,60,80,.55)"; g.lineWidth = 2; g.beginPath(); g.moveTo(0, 60); g.bezierCurveTo(30, 120, -30, 170, 10, 240); g.stroke();
    for (let i = 0; i < 4; i++) { const t = 0.2 + i * 0.22, kx = 0 + Math.sin(t * 7) * 18, ky = 60 + t * 180; g.fillStyle = kuyruk[i % kuyruk.length]; g.beginPath(); g.moveTo(kx, ky); g.lineTo(kx - 12, ky - 8); g.lineTo(kx - 12, ky + 8); g.closePath(); g.moveTo(kx, ky); g.lineTo(kx + 12, ky - 8); g.lineTo(kx + 12, ky + 8); g.closePath(); g.fill(); }
    g.fillStyle = r1; g.beginPath(); g.moveTo(0, -70); g.lineTo(46, -10); g.lineTo(0, 60); g.closePath(); g.fill();
    g.fillStyle = r2; g.beginPath(); g.moveTo(0, -70); g.lineTo(-46, -10); g.lineTo(0, 60); g.closePath(); g.fill();
    g.strokeStyle = "rgba(255,255,255,.6)"; g.lineWidth = 2; g.beginPath(); g.moveTo(0, -70); g.lineTo(0, 60); g.moveTo(-46, -10); g.lineTo(46, -10); g.stroke();
    g.restore();
  }
  function flama(g, x0, y0, x1, y1, sark, n) {
    g.strokeStyle = "rgba(80,60,60,.6)"; g.lineWidth = 2; g.beginPath(); g.moveTo(x0, y0); g.quadraticCurveTo((x0 + x1) / 2, (y0 + y1) / 2 + sark, x1, y1); g.stroke();
    for (let i = 1; i < n; i++) {
      const t = i / n, x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * ((x0 + x1) / 2) + t * t * x1, y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * ((y0 + y1) / 2 + sark) + t * t * y1;
      const f = yeni(48, 32), c = f.getContext("2d"); bayrakDuz(c, 48, 32);
      g.save(); g.translate(x, y); g.rotate(Math.sin(i) * 0.08); g.drawImage(f, -24, 0, 48, 32); g.restore();
    }
  }
  // A: gökte uçurtmalar, Meclis'in önünde el ele çocuklar
  K["cocuk-a"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#4fb3f2"], [0.5, "#bfe6fb"], [0.54, "#9fd47a"], [1, "#f7fbef"]]);
    bulut(g, 220, 230, 1, "rgba(255,255,255,.9)"); bulut(g, 860, 330, 0.8, "rgba(255,255,255,.85)");
    flama(g, -20, 60, W + 20, 70, 70, 14);
    ucurtma(g, 830, 190, 0.9, 0.25, "#ff4d6d", "#ffd166", ["#ff4d6d", "#4cc9f0", "#ffd166"]);
    ucurtma(g, 230, 330, 0.7, -0.3, "#4361ee", "#4cc9f0", ["#ffd166", "#f72585"]);
    ucurtma(g, 600, 220, 0.55, 0.1, "#06d6a0", "#ffd166", ["#ef476f", "#118ab2"]);
    meclis(g, W / 2, 610, 1);
    g.fillStyle = "#8cc864"; g.beginPath(); g.moveTo(0, 600); g.quadraticCurveTo(W / 2, 570, W, 600); g.lineTo(W, 700); g.lineTo(0, 700); g.fill();
    g.fillStyle = dz(g, 0, 620, 0, 720, [[0, "#7dbb57"], [1, "#f7fbef"]]); g.fillRect(0, 620, W, 100);
    const ren = ["#ef476f", "#118ab2", "#ffd166", "#06d6a0", "#f78c6b", "#8338ec", "#e63946"], sac = ["#3b2414", "#1d1d1d", "#6b3e1f", "#c48a3f", "#2b1a10", "#1d1d1d", "#7a4a25"];
    const xs = [150, 280, 410, 540, 670, 800, 930];
    g.strokeStyle = "#e9b48a"; g.lineWidth = 9; g.lineCap = "round"; g.beginPath();
    for (let i = 0; i < xs.length - 1; i++) { g.moveTo(xs[i] + 14, 594); g.quadraticCurveTo((xs[i] + xs[i + 1]) / 2, 622, xs[i + 1] - 14, 594); } g.stroke();
    xs.forEach((x, i) => cocuk(g, x, 690, 1, ren[i], sac[i], i % 2 ? "etek" : "pantolon"));
    yazilar(g, W, o, { ust: 735, renk: "#1d3557", vurgu: "#e63946", soluk: "#46607f", px: 54, bmax: 2, imza: o.imzaVar ? "#1d3557" : null, imzaEn: 250 });
    altImza(g, W, o, "#1d3557", "#e63946", "#6c7f99");
  };
  // B: renkli "23", uçurtmalar ve balonlar
  K["cocuk-b"] = (g, W, H, o) => {
    g.fillStyle = "#fff7e8"; g.fillRect(0, 0, W, H);
    const r = rastgele(423), ren = ["#ef476f", "#118ab2", "#ffd166", "#06d6a0", "#8338ec", "#f78c6b"];
    for (let i = 0; i < 60; i++) { g.fillStyle = ren[i % 6]; g.globalAlpha = 0.85; g.save(); g.translate(r() * W, 30 + r() * 520); g.rotate(r() * 3); g.fillRect(-7, -4, 14, 8); g.restore(); }
    g.globalAlpha = 1;
    g.save(); g.font = Y.PF(800, 420); g.lineJoin = "round";
    g.lineWidth = 34; g.strokeStyle = "#1d3557"; g.strokeText("23", W / 2, 360);
    g.fillStyle = dz(g, 300, 0, 780, 0, [[0, "#ef476f"], [0.5, "#ffd166"], [1, "#06d6a0"]]); g.fillText("23", W / 2, 360); g.restore();
    g.font = Y.PF(800, 54); g.fillStyle = "#1d3557"; Y.harfAra(g, 14); g.fillText(en() ? "APRIL" : "NİSAN", W / 2 + 7, 600); Y.harfAra(g, 0);
    ucurtma(g, 140, 170, 0.6, -0.35, "#ef476f", "#ffd166", ["#118ab2", "#06d6a0"]);
    ucurtma(g, 950, 210, 0.55, 0.3, "#118ab2", "#4cc9f0", ["#ef476f", "#ffd166"]);
    for (const [x, y, c] of [[110, 520, "#ef476f"], [970, 560, "#8338ec"], [900, 470, "#ffd166"]]) { g.fillStyle = c; g.beginPath(); g.ellipse(x, y, 36, 44, 0, 0, PI2); g.fill(); g.strokeStyle = "rgba(29,53,87,.4)"; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y + 44); g.quadraticCurveTo(x + 14, y + 100, x - 6, y + 150); g.stroke(); }
    yazilar(g, W, o, { ust: 650, renk: "#1d3557", vurgu: "#e63946", soluk: "#46607f", px: 56, bmax: 3, imza: o.imzaVar ? "#1d3557" : null, imzaEn: 270 });
    altImza(g, W, o, "#1d3557", "#e63946", "#6c7f99");
  };

  // ===== 1 Mayıs =====
  function carkCiz(g, x, y, r, dis, renk) {
    g.fillStyle = renk; g.beginPath();
    for (let i = 0; i < dis * 2; i++) { const a0 = (i * Math.PI) / dis, a1 = ((i + 1) * Math.PI) / dis, rr = i % 2 ? r : r * 1.18; g.arc(x, y, rr, a0, a1); }
    g.closePath(); g.moveTo(x + r * 0.42, y); g.arc(x, y, r * 0.42, 0, PI2, true); g.fill("evenodd");
  }
  function basak(g, x, y, s, a, renk) {
    g.save(); g.translate(x, y); g.rotate(a); g.strokeStyle = renk; g.fillStyle = renk; g.lineWidth = 4 * s;
    g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -260 * s); g.stroke();
    for (let i = 0; i < 9; i++) for (const k of [-1, 1]) { g.save(); g.translate(0, -150 * s - i * 14 * s); g.rotate(k * 0.5); g.beginPath(); g.ellipse(0, -10 * s, 5 * s, 12 * s, 0, 0, PI2); g.fill(); g.restore(); }
    g.restore();
  }
  K["emek-a"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#ffd9a3"], [0.4, "#ffb070"], [0.55, "#f27a54"], [1, "#7a1a22"]]);
    g.save(); g.translate(W / 2, 600); g.globalAlpha = 0.18; g.fillStyle = "#fff";
    for (let i = 0; i < 24; i++) { g.rotate(PI2 / 24); g.beginPath(); g.moveTo(0, 0); g.lineTo(-40, -900); g.lineTo(40, -900); g.closePath(); g.fill(); }
    g.restore();
    g.fillStyle = rz(g, W / 2, 600, 20, 200, [[0, "#fff4d6"], [1, "#ffbe5c"]]); g.beginPath(); g.arc(W / 2, 600, 190, 0, PI2); g.fill();
    carkCiz(g, W / 2, 600, 120, 12, "rgba(160,40,30,.85)");
    g.fillStyle = "#b8442c"; g.beginPath(); g.moveTo(0, 640); g.quadraticCurveTo(W / 2, 560, W, 640); g.lineTo(W, H); g.lineTo(0, H); g.fill();
    const r = rastgele(51);
    for (let i = 0; i < 40; i++) basak(g, 20 + r() * (W - 40), 780 + r() * 30, 0.6 + r() * 0.3, (r() - 0.5) * 0.4, i % 2 ? "#f2b84b" : "#e3a13a");
    g.fillStyle = "#7a1a22"; g.fillRect(0, 770, W, H - 770);
    yazilar(g, W, o, { ust: 800, renk: "#fff", vurgu: "#ffd166", soluk: "rgba(255,255,255,.82)", px: 64 });
    altImza(g, W, o, "#fff", "#ffd166", "rgba(255,255,255,.66)");
  };
  K["emek-b"] = (g, W, H, o) => {
    g.fillStyle = rz(g, W / 2, 380, 60, 1000, [[0, "#d7263d"], [1, "#7a0f1c"]]); g.fillRect(0, 0, W, H);
    // başak çelengi: çarkın iki yanında, alttan yukarı çember boyunca
    const cx = W / 2, cy = 360, R = 245;
    for (let i = 0; i < 7; i++) {
      const aL = Math.PI / 2 + 0.38 + i * 0.3, aR = Math.PI / 2 - 0.38 - i * 0.3;
      basak(g, cx + Math.cos(aL) * R, cy + Math.sin(aL) * R, 0.55, aL + Math.PI, "#f2c14e");
      basak(g, cx + Math.cos(aR) * R, cy + Math.sin(aR) * R, 0.55, aR, "#f2c14e");
    }
    carkCiz(g, cx, cy, 150, 14, "#f2c14e");
    g.font = Y.PF(800, 120); g.fillStyle = "#7a0f1c"; g.fillText("1", W / 2, 368);
    yazilar(g, W, o, { ust: 640, renk: "#fff", vurgu: "#f2c14e", soluk: "rgba(255,255,255,.84)", px: 66 });
    altImza(g, W, o, "#fff", "#f2c14e", "rgba(255,255,255,.7)");
  };

  // ===== 19 Mayıs =====
  // Bandırma vapuru: siyah gövde, beyaz üst yapı, tek baca, iki direk
  function vapur(g, x, y, s) {
    g.save(); g.translate(x, y); g.scale(s, s);
    g.strokeStyle = "#1b1b24"; g.lineWidth = 3; g.beginPath(); g.moveTo(-160, -150); g.lineTo(-260, -40); g.moveTo(-160, -150); g.lineTo(-40, -50); g.moveTo(150, -160); g.lineTo(290, -40); g.moveTo(150, -160); g.lineTo(60, -50); g.stroke();
    g.lineWidth = 6; g.beginPath(); g.moveTo(-160, -36); g.lineTo(-160, -158); g.moveTo(150, -36); g.lineTo(150, -168); g.stroke();
    g.fillStyle = "#f4efe6"; g.fillRect(-90, -64, 170, 30); g.fillRect(-60, -88, 110, 26);
    g.fillStyle = "#1b1b24"; for (let i = 0; i < 6; i++) g.fillRect(-80 + i * 26, -56, 10, 10);
    g.fillStyle = "#1b1b24"; g.beginPath(); g.moveTo(-14, -84); g.lineTo(-10, -170); g.lineTo(24, -170); g.lineTo(26, -84); g.closePath(); g.fill();
    g.fillStyle = "#c8202b"; g.fillRect(-11, -158, 36, 14);
    g.fillStyle = "#1b1b24"; g.beginPath(); g.moveTo(-300, -40); g.lineTo(320, -40); g.lineTo(290, 18); g.lineTo(-270, 18); g.quadraticCurveTo(-296, 0, -300, -40); g.fill();
    g.fillStyle = "#7a1f1f"; g.fillRect(-276, 6, 562, 8);
    g.restore();
    direk(g, x - 296 * s, y - 120 * s, y - 40 * s, 3 * s, "#1b1b24");
    bayrak(g, x - 296 * s - 64 * s, y - 118 * s, 62 * s, { A: 3, k: 1.3, faz: 2.6 });
  }
  K["genclik-a"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#14204a"], [0.2, "#3d3a78"], [0.36, "#d9708a"], [0.44, "#ffc38a"], [0.46, "#ffe0a8"], [1, "#0f1838"]]);
    g.fillStyle = rz(g, 820, 560, 10, 160, [[0, "#fff6d8"], [0.5, "#ffd08a"], [1, "rgba(255,180,100,0)"]]); g.beginPath(); g.arc(820, 560, 160, 0, PI2); g.fill();
    g.fillStyle = "#ffe7b0"; g.beginPath(); g.arc(820, 566, 62, Math.PI, 0); g.fill();
    sirt(g, W, 580, "#4d3f6e", [[640, 570], [760, 548], [900, 556], [1100, 530]], true);
    g.fillStyle = dz(g, 0, 566, 0, 640, [[0, "#7d5c8c"], [1, "#22305f"]]); g.fillRect(0, 566, W, 74);
    g.save(); g.globalAlpha = 0.85; g.fillStyle = "#ffd9a0"; const r = rastgele(1919);
    for (let y = 572; y < 636; y += 7) { const w = (110 - (y - 572)) * (0.5 + r()); g.fillRect(820 - w / 2 + (r() - 0.5) * 30, y, w, 2); }
    g.restore();
    // duman
    g.fillStyle = "rgba(60,55,80,.55)"; for (let i = 0; i < 9; i++) { g.beginPath(); g.arc(380 - i * 34, 345 - i * 14 - Math.sin(i) * 8, 16 + i * 4, 0, PI2); g.fill(); }
    vapur(g, 360, 556, 0.82);
    kus(g, 600, 300, 1, "rgba(30,30,50,.7)"); kus(g, 660, 270, 0.7, "rgba(30,30,50,.6)");
    g.fillStyle = "#0f1838"; g.fillRect(0, 600, W, H - 600);
    dalgalar(g, W, 590, 630, "#5b6fa6", 7);
    yazilar(g, W, o, { ust: 610, alt: 1124, renk: "#fff", vurgu: "#ffc38a", soluk: "rgba(255,255,255,.8)", px: 50, bmax: 2, altYok: !!o.soz, soz: o.soz, spx: 32, smax: 4, sozRenk: "rgba(255,255,255,.92)", kim: o.kim, imza: o.imzaVar ? "rgba(255,240,220,.92)" : null, imzaEn: 230 });
    altImza(g, W, o, "#fff", "#ffc38a", "rgba(255,255,255,.66)");
  };
  // Meşale
  function mesale(g, x, y, s) {
    g.save(); g.translate(x, y); g.scale(s, s);
    isik(g, 0, -120, 260, "rgba(255,180,80,.5)");
    for (const [w, h, r] of [[90, 210, "#ff6b1a"], [64, 170, "#ffa62b"], [38, 120, "#ffe066"]]) { g.fillStyle = r; g.beginPath(); g.moveTo(0, -40 - h); g.bezierCurveTo(w * 0.9, -40 - h * 0.45, w * 0.6, -30, 0, -20); g.bezierCurveTo(-w * 0.6, -30, -w * 0.9, -40 - h * 0.45, 0, -40 - h); g.fill(); }
    g.fillStyle = dz(g, -60, 0, 60, 0, [[0, "#f7d77c"], [0.5, "#fff1c1"], [1, "#b8862b"]]); g.beginPath(); g.moveTo(-62, -30); g.lineTo(62, -30); g.lineTo(44, 30); g.lineTo(-44, 30); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(-26, 30); g.lineTo(26, 30); g.lineTo(12, 250); g.lineTo(-12, 250); g.closePath(); g.fill();
    g.restore();
  }
  K["genclik-b"] = (g, W, H, o) => {
    g.fillStyle = rz(g, W / 2, 300, 40, 1000, [[0, "#e3202b"], [1, "#7a0710"]]); g.fillRect(0, 0, W, H);
    g.strokeStyle = "rgba(255,255,255,.3)"; g.lineWidth = 2; g.strokeRect(44, 44, W - 88, H - 88);
    mesale(g, W / 2, 330, 0.95);
    g.font = Y.PF(800, 34); g.fillStyle = "#fff"; Y.harfAra(g, 10); g.fillText(en() ? "19 MAY 1919" : "19 MAYIS 1919", W / 2 + 5, 640); Y.harfAra(g, 0);
    yazilar(g, W, { ...o, tarih: "" }, { ust: 670, alt: 1120, tpx: 1, tara: 0, renk: "#fff", vurgu: "rgba(0,0,0,0)", soluk: "rgba(255,255,255,.84)", px: 50, bmax: 2, altYok: !!o.soz, soz: o.soz, spx: 32, smax: 4, kim: o.kim, imza: o.imzaVar ? "#fff" : null, imzaEn: 230 });
    altImza(g, W, o, "#fff", "#fff", "rgba(255,255,255,.75)");
  };

  // ===== 15 Temmuz =====
  K["demokrasi-a"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#050816"], [0.45, "#141c3c"], [0.6, "#1d2850"], [1, "#070a18"]]);
    yildizlar(g, W, 0, 420, 120, 715, null);
    // karşı kıyı şehir
    const r = rastgele(1507); g.fillStyle = "#0a0f24"; g.beginPath(); g.moveTo(0, 560);
    for (let x = 0; x < W; x += 24 + r() * 30) { const h = 16 + r() * 50; g.lineTo(x, 560 - h); g.lineTo(x + 20, 560 - h); } g.lineTo(W, 560); g.closePath(); g.fill();
    cami(g, 820, 552, 0.16, "#0a0f24", {}); cami(g, 250, 552, 0.12, "#0a0f24", {});
    g.fillStyle = "rgba(255,210,140,.75)"; for (let i = 0; i < 120; i++) g.fillRect(r() * W, 520 + r() * 38, 2.5, 3);
    // köprü
    const ky = 470, k1 = 250, k2 = 830;
    g.fillStyle = "#e9edf6";
    for (const x of [k1, k2]) { g.fillRect(x - 12, 230, 8, 330); g.fillRect(x + 4, 230, 8, 330); g.fillRect(x - 12, 260, 24, 8); g.fillRect(x - 12, 380, 24, 8); }
    g.strokeStyle = "#e9edf6"; g.lineWidth = 3; g.beginPath(); g.moveTo(-20, 420); g.quadraticCurveTo(k1 / 2, 340, k1, 236); g.quadraticCurveTo((k1 + k2) / 2, 520, k2, 236); g.quadraticCurveTo((k2 + W) / 2, 340, W + 20, 420); g.stroke();
    g.lineWidth = 1.2; g.globalAlpha = 0.6;
    for (let x = k1 + 20; x < k2; x += 20) { const t = (x - k1) / (k2 - k1), yy = (1 - t) * (1 - t) * 236 + 2 * (1 - t) * t * 520 + t * t * 236; g.beginPath(); g.moveTo(x, yy); g.lineTo(x, ky); g.stroke(); }
    g.globalAlpha = 1; g.fillStyle = "#e9edf6"; g.fillRect(-20, ky, W + 40, 10);
    g.fillStyle = "rgba(255,226,150,.9)"; for (let x = 0; x < W; x += 30) g.fillRect(x, ky - 4, 3, 4);
    for (let x = k1 + 60; x < k2 - 40; x += 90) { direk(g, x, ky - 60, ky, 2, "#cfd5e3"); bayrak(g, x + 1, ky - 58, 40, { A: 2, k: 1.2 }); }
    // su ve yansıma
    g.fillStyle = dz(g, 0, 560, 0, 760, [[0, "#121a3a"], [1, "#070a18"]]); g.fillRect(0, 560, W, 200);
    g.save(); g.globalAlpha = 0.5; g.fillStyle = "#ffd28a"; for (let i = 0; i < 160; i++) { const x = r() * W, y = 570 + r() * 180; g.fillRect(x, y, 6 + r() * 20, 1.6); } g.restore();
    g.fillStyle = "#070a18"; g.fillRect(0, 758, W, H - 758);
    yazilar(g, W, o, { ust: 780, renk: "#fff", vurgu: "#e63946", soluk: "rgba(255,255,255,.8)", px: 58 });
    altImza(g, W, o, "#fff", "#ff8a80", "rgba(255,255,255,.62)");
  };
  K["demokrasi-b"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#0b1026"], [1, "#16112b"]]);
    for (let i = 0; i < 8; i++) { const x = 92 + i * 118; direk(g, x, 120, 520, 4, "#58607a"); bayrak(g, x + 2, 128, 92, { A: 5, k: 1.4, faz: i * 0.6 }); }
    g.font = Y.PF(800, 132); g.fillStyle = "#fff"; g.fillText("15", W / 2, 660);
    g.font = Y.PF(800, 40); g.fillStyle = "#e63946"; Y.harfAra(g, 16); g.fillText(en() ? "JULY" : "TEMMUZ", W / 2 + 8, 760); Y.harfAra(g, 0);
    yazilar(g, W, { ...o, tarih: "" }, { ust: 800, tpx: 1, tara: 0, renk: "#fff", vurgu: "rgba(0,0,0,0)", soluk: "rgba(255,255,255,.8)", px: 52 });
    altImza(g, W, o, "#fff", "#ff8a80", "rgba(255,255,255,.62)");
  };

  // ===== 30 Ağustos =====
  K["zafer-a"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#1b2350"], [0.25, "#6a3d6e"], [0.42, "#e8774a"], [0.5, "#ffc36b"], [1, "#1a120c"]]);
    g.save(); g.translate(560, 560); g.globalAlpha = 0.16; g.fillStyle = "#fff";
    for (let i = 0; i < 18; i++) { g.rotate(Math.PI / 18); g.beginPath(); g.moveTo(0, 0); g.lineTo(-30, -800); g.lineTo(30, -800); g.closePath(); g.fill(); }
    g.restore();
    g.fillStyle = rz(g, 560, 560, 10, 150, [[0, "#fff4d0"], [0.6, "#ffc36b"], [1, "rgba(255,170,90,0)"]]); g.beginPath(); g.arc(560, 560, 150, 0, PI2); g.fill();
    sirt(g, W, 760, "#7a4a4a", [[-20, 600], [200, 560], [420, 590], [650, 570], [860, 595], [1100, 570]], true);
    // Kocatepe: kayalık tepe
    g.fillStyle = "#2a1a12"; g.beginPath(); g.moveTo(-10, 780); g.lineTo(-10, 610); g.lineTo(120, 560); g.lineTo(220, 470); g.lineTo(300, 452); g.lineTo(360, 470); g.lineTo(440, 540); g.lineTo(560, 600); g.lineTo(760, 660); g.lineTo(1090, 700); g.lineTo(1090, 780); g.closePath(); g.fill();
    g.fillStyle = "rgba(255,190,120,.18)"; g.beginPath(); g.moveTo(220, 470); g.lineTo(300, 452); g.lineTo(360, 470); g.lineTo(300, 500); g.closePath(); g.fill();
    direk(g, 300, 250, 456, 7, "#2a1a12");
    bayrak(g, 304, 262, 300, { A: 16, k: 1.6, faz: 0.4, golge: "rgba(0,0,0,.3)" });
    g.fillStyle = "#1a120c"; g.fillRect(0, 776, W, H - 776);
    yazilar(g, W, o, { ust: 690, alt: 1122, renk: "#fff", vurgu: "#ffc36b", soluk: "rgba(255,255,255,.8)", px: 52, bmax: 2, altYok: !!o.soz, soz: o.soz, spx: 40, sozRenk: "#ffe6c4", kim: o.kim, imza: o.imzaVar ? "rgba(255,240,220,.92)" : null, imzaEn: 260 });
    altImza(g, W, o, "#fff", "#ffc36b", "rgba(255,255,255,.66)");
  };
  K["zafer-b"] = (g, W, H, o) => {
    g.fillStyle = rz(g, W / 2, 360, 40, 1000, [[0, "#ef1c27"], [1, "#8a0610"]]); g.fillRect(0, 0, W, H);
    g.strokeStyle = "rgba(255,255,255,.3)"; g.lineWidth = 2; g.strokeRect(44, 44, W - 88, H - 88);
    defne(g, W / 2, 330, 210, "#f2c14e", 1); defne(g, W / 2, 330, 210, "#f2c14e", -1);
    g.save(); g.font = Y.PF(800, 190); g.fillStyle = "#fff"; g.shadowColor = "rgba(80,0,0,.4)"; g.shadowBlur = 30; g.fillText(String(o.sayi || ""), W / 2, 320); g.restore();
    g.font = Y.PF(800, 34); g.fillStyle = "#f2c14e"; Y.harfAra(g, 12); g.fillText(en() ? "YEARS" : "YIL", W / 2 + 6, 450); Y.harfAra(g, 0);
    yazilar(g, W, o, { ust: 600, alt: 1120, renk: "#fff", vurgu: "rgba(255,255,255,.9)", soluk: "rgba(255,255,255,.84)", px: 50, bmax: 2, altYok: !!o.soz, soz: o.soz, spx: 42, kim: o.kim, imza: o.imzaVar ? "#fff" : null, imzaEn: 260 });
    altImza(g, W, o, "#fff", "#fff", "rgba(255,255,255,.75)");
  };

  // ===== Anneler Günü ve Babalar Günü =====
  function karanfil(g, x, y, r, renk, koyu) {
    g.fillStyle = koyu; g.beginPath(); for (let i = 0; i < 28; i++) { const a = (i / 28) * PI2, rr = r * (i % 2 ? 0.86 : 1.05); g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.fill();
    g.fillStyle = renk; g.beginPath(); for (let i = 0; i < 24; i++) { const a = (i / 24) * PI2 + 0.1, rr = r * 0.78 * (i % 2 ? 0.84 : 1); g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.fill();
    g.fillStyle = koyu; g.globalAlpha = 0.5; g.beginPath(); g.arc(x, y, r * 0.28, 0, PI2); g.fill(); g.globalAlpha = 1;
  }
  K["anneler-a"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#fde7ec"], [1, "#f8d3dc"]]);
    const r = rastgele(509);
    for (let i = 0; i < 40; i++) { g.fillStyle = "rgba(233,120,150,.18)"; g.beginPath(); g.arc(r() * W, r() * 720, 4 + r() * 10, 0, PI2); g.fill(); }
    // buket: sap ve yapraklar, çiçekler, kâğıt
    g.strokeStyle = "#3f7d4e"; g.lineWidth = 6; for (let i = -4; i <= 4; i++) { g.beginPath(); g.moveTo(W / 2 + i * 6, 700); g.quadraticCurveTo(W / 2 + i * 30, 470, W / 2 + i * 52, 330); g.stroke(); }
    for (const [x, y, a] of [[400, 400, -0.8], [690, 410, 0.8], [360, 300, -1.1], [730, 310, 1.1]]) { g.fillStyle = "#4f9a5f"; g.save(); g.translate(x, y); g.rotate(a); g.beginPath(); g.ellipse(0, 0, 22, 70, 0, 0, PI2); g.fill(); g.restore(); }
    lale(g, 420, 300, 0.85, -0.35, "#ff8fab", "#e5486e", "#3f7d4e"); lale(g, 660, 290, 0.85, 0.35, "#ff8fab", "#e5486e", "#3f7d4e"); lale(g, 540, 230, 0.95, 0, "#ffb3c6", "#f06292", "#3f7d4e");
    for (const [x, y, rr, c, k] of [[470, 360, 58, "#e63950", "#a8162f"], [620, 350, 60, "#f25c78", "#c2185b"], [545, 420, 64, "#fff0f3", "#e8a5b6"], [400, 450, 46, "#f8bbd0", "#e57399"], [690, 450, 48, "#e63950", "#a8162f"]]) karanfil(g, x, y, rr, c, k);
    g.fillStyle = dz(g, 360, 0, 720, 0, [[0, "#e7c9a0"], [0.5, "#f6e3c4"], [1, "#d9b68a"]]); g.beginPath(); g.moveTo(370, 470); g.lineTo(710, 470); g.lineTo(560, 760); g.lineTo(520, 760); g.closePath(); g.fill();
    // kurdele: kâğıdı saran bant, fiyonk ve iki uç
    g.save(); g.beginPath(); g.moveTo(370, 470); g.lineTo(710, 470); g.lineTo(560, 760); g.lineTo(520, 760); g.closePath(); g.clip();
    g.fillStyle = "#d6336c"; g.fillRect(360, 596, 360, 26); g.restore();
    g.fillStyle = "#d6336c";
    g.beginPath(); g.moveTo(540, 600); g.lineTo(486, 660); g.lineTo(504, 668); g.lineTo(532, 624); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(550, 600); g.lineTo(600, 662); g.lineTo(582, 670); g.lineTo(556, 624); g.closePath(); g.fill();
    g.fillStyle = "#e85d8a";
    g.beginPath(); g.moveTo(545, 608); g.bezierCurveTo(500, 560, 466, 586, 478, 612); g.bezierCurveTo(488, 632, 520, 626, 545, 608); g.fill();
    g.beginPath(); g.moveTo(545, 608); g.bezierCurveTo(590, 560, 624, 586, 612, 612); g.bezierCurveTo(602, 632, 570, 626, 545, 608); g.fill();
    g.fillStyle = "#b3245a"; g.beginPath(); g.roundRect(533, 596, 24, 24, 7); g.fill();
    yazilar(g, W, o, { ust: 780, renk: "#5a1a2e", vurgu: "#d6336c", soluk: "#7d4a5a", px: 58 });
    altImza(g, W, o, "#5a1a2e", "#d6336c", "#9a6b78");
  };
  // Yol sahnesi: kıvrılan yol, kırmızı araba (anne/baba ile gezmeye)
  function yolSahne(g, W, H, p) {
    zemin(g, W, H, p.gok);
    g.fillStyle = rz(g, p.gx, p.gy, 10, 140, [[0, "#fff6dc"], [0.5, p.gunes], [1, "rgba(255,200,120,0)"]]); g.beginPath(); g.arc(p.gx, p.gy, 140, 0, PI2); g.fill();
    sirt(g, W, H, p.d1, [[-20, 470], [150, 400], [300, 450], [470, 380], [640, 440], [820, 390], [1100, 450]]);
    sirt(g, W, H, p.d2, [[-20, 540], [220, 490], [440, 540], [700, 500], [920, 540], [1100, 520]], true);
    sirt(g, W, H, p.d3, [[-20, 600], [260, 570], [540, 610], [800, 575], [1100, 600]], true);
    if (p.tarla) { g.save(); for (let i = 0; i < 16; i++) { g.strokeStyle = i % 2 ? p.tarla[0] : p.tarla[1]; g.lineWidth = 10 + i * 2.2; g.beginPath(); g.moveTo(-40, 620 + i * 12); g.quadraticCurveTo(W / 2, 600 + i * 10, W + 40, 630 + i * 13); g.stroke(); } g.restore(); }
    g.fillStyle = p.yol; g.beginPath(); g.moveTo(520, 590); g.bezierCurveTo(600, 640, 300, 660, 380, 720); g.bezierCurveTo(440, 760, 760, 760, 820, 800); g.lineTo(560, 800); g.bezierCurveTo(520, 770, 300, 760, 340, 720); g.bezierCurveTo(280, 650, 560, 640, 510, 590); g.closePath(); g.fill();
    g.save(); g.translate(560, 712); g.scale(0.9, 0.9);
    g.fillStyle = "#d62828"; g.beginPath(); g.roundRect(-70, -34, 140, 36, 12); g.fill(); g.beginPath(); g.roundRect(-40, -62, 84, 34, [16, 18, 4, 4]); g.fill();
    g.fillStyle = "#cfe8ff"; g.beginPath(); g.roundRect(-32, -56, 32, 24, 6); g.fill(); g.beginPath(); g.roundRect(6, -56, 30, 24, 6); g.fill();
    g.fillStyle = "#1b1b24"; for (const x of [-42, 42]) { g.beginPath(); g.arc(x, 2, 15, 0, PI2); g.fill(); }
    g.restore();
  }
  K["anneler-b"] = (g, W, H, o) => {
    yolSahne(g, W, H, { gok: [[0, "#9fb8e8"], [0.4, "#f3c6d8"], [0.5, "#f8e0e4"], [1, "#3d2a5c"]], gx: 820, gy: 360, gunes: "#ffd1dc", d1: "#b9a2cf", d2: "#8f7bb5", d3: "#6f5a9e", tarla: ["#8e6cc0", "#a989d6"], yol: "#e9d8c4" });
    g.fillStyle = "#3d2a5c"; g.fillRect(0, 798, W, H - 798);
    yazilar(g, W, o, { ust: 820, renk: "#fff", vurgu: "#ffb3c6", soluk: "rgba(255,255,255,.84)", px: 58 });
    altImza(g, W, o, "#fff", "#ffb3c6", "rgba(255,255,255,.68)");
  };
  K["babalar-a"] = (g, W, H, o) => {
    yolSahne(g, W, H, { gok: [[0, "#2b4c7e"], [0.35, "#f1a35b"], [0.45, "#ffd7a0"], [1, "#16233b"]], gx: 300, gy: 400, gunes: "#ffc36b", d1: "#8b6a8a", d2: "#5d5a7e", d3: "#3c4a6b", tarla: ["#5b7d4e", "#6d8f5c"], yol: "#d8c6a8" });
    g.fillStyle = "#16233b"; g.fillRect(0, 798, W, H - 798);
    yazilar(g, W, o, { ust: 820, renk: "#fff", vurgu: "#ffc36b", soluk: "rgba(255,255,255,.82)", px: 58 });
    altImza(g, W, o, "#fff", "#ffc36b", "rgba(255,255,255,.66)");
  };
  // B: gölde iskele, gün batımında oltayla iki kişi (arkadan siluet)
  K["babalar-b"] = (g, W, H, o) => {
    zemin(g, W, H, [[0, "#1e2b58"], [0.3, "#c0567a"], [0.42, "#f6a15c"], [0.46, "#ffd59e"], [1, "#0f1730"]]);
    g.fillStyle = "#ffe2a8"; g.beginPath(); g.arc(W / 2, 560, 80, Math.PI, 0); g.fill();
    sirt(g, W, 580, "#3a2f55", [[-20, 560], [200, 520], [380, 550], [600, 510], [820, 545], [1100, 520]], true);
    g.fillStyle = dz(g, 0, 560, 0, 780, [[0, "#d98a6a"], [1, "#1a2346"]]); g.fillRect(0, 560, W, 220);
    g.save(); g.globalAlpha = 0.7; g.fillStyle = "#ffe2a8"; const r = rastgele(620); for (let y = 566; y < 760; y += 9) { const w = (150 - (y - 566) * 0.4) * (0.5 + r()); g.fillRect(W / 2 - w / 2 + (r() - 0.5) * 40, y, w, 2); } g.restore();
    g.fillStyle = "#0f1730"; g.fillRect(-10, 690, 560, 18); for (const x of [40, 160, 280, 400, 520]) g.fillRect(x, 700, 10, 90);
    const otur = (x, s) => { g.save(); g.translate(x, 690); g.scale(s, s); g.fillStyle = "#0f1730"; g.beginPath(); g.arc(0, -96, 20, 0, PI2); g.fill(); g.beginPath(); g.moveTo(-26, -74); g.lineTo(26, -74); g.lineTo(30, 0); g.lineTo(-30, 0); g.closePath(); g.fill(); g.fillRect(-24, -6, 18, 50); g.fillRect(6, -6, 18, 50); g.restore(); };
    otur(330, 1); otur(430, 0.72);
    g.strokeStyle = "#0f1730"; g.lineWidth = 3; g.beginPath(); g.moveTo(350, 620); g.lineTo(620, 480); g.stroke(); g.lineWidth = 1; g.beginPath(); g.moveTo(620, 480); g.lineTo(640, 720); g.stroke();
    g.lineWidth = 2.5; g.beginPath(); g.moveTo(440, 640); g.lineTo(600, 560); g.stroke(); g.lineWidth = 1; g.beginPath(); g.moveTo(600, 560); g.lineTo(612, 730); g.stroke();
    g.fillStyle = "#0f1730"; g.fillRect(0, 778, W, H - 778);
    yazilar(g, W, o, { ust: 800, renk: "#fff", vurgu: "#ffc36b", soluk: "rgba(255,255,255,.82)", px: 58 });
    altImza(g, W, o, "#fff", "#ffc36b", "rgba(255,255,255,.66)");
  };

  // ===== Fotoğraflı tasarım kartları (-f1, -f2) =====
  // Serbest lisanslı fotoğraf + renk ayarı + çerçeve, süsleme ve yazı. Fotoğraflar önceden kırpılmıştır (kart/<ad>.jpg)
  const SERIF = (w, px, it) => `${it ? "italic " : ""}${w} ${px}px "Playfair Display", Georgia, "Times New Roman", serif`;
  const EL = (px) => `${px}px "Great Vibes", "Playfair Display", Georgia, cursive`;
  const ALTIN = [[0, "#b8893d"], [0.25, "#f7e7b0"], [0.5, "#cfa253"], [0.75, "#fbefc4"], [1, "#b8893d"]];
  let yaziSoz = null;
  // Yazı tipleri yalnızca fotoğraflı kart çizilecekken yüklenir; 4 saniyede gelmezse yedek yazı tipiyle devam
  function yaziTipleri() {
    if (yaziSoz) return yaziSoz;
    const yol = "vendor/font/", LAT = "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
      EXT = "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";
    const yt = [];
    try {
      for (const [ad, dosya, o] of [["Playfair Display", "playfair-display-latin-wght-normal", { weight: "400 900", unicodeRange: LAT }], ["Playfair Display", "playfair-display-latin-ext-wght-normal", { weight: "400 900", unicodeRange: EXT }],
        ["Playfair Display", "playfair-display-latin-wght-italic", { weight: "400 900", style: "italic", unicodeRange: LAT }], ["Playfair Display", "playfair-display-latin-ext-wght-italic", { weight: "400 900", style: "italic", unicodeRange: EXT }],
        ["Great Vibes", "great-vibes-latin-400-normal", { unicodeRange: LAT }], ["Great Vibes", "great-vibes-latin-ext-400-normal", { unicodeRange: EXT }]]) {
        const f = new FontFace(ad, `url(${yol}${dosya}.woff2) format("woff2")`, o); document.fonts.add(f); yt.push(f.load().catch(() => null));
      }
    } catch (e) {}
    yaziSoz = Promise.race([Promise.all(yt), new Promise((ok) => setTimeout(ok, 4000))]).then(() => true);
    return yaziSoz;
  }
  const hexA = (h, a) => `rgba(${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)},${a})`;
  // Fotoğrafı alana sığdırıp taşanı kırp (cover)
  function kapla(g, img, x, y, w, h, odak) {
    const o = Math.max(w / img.width, h / img.height), iw = img.width * o, ih = img.height * o, f = odak || [0.5, 0.5];
    g.drawImage(img, x + (w - iw) * f[0], y + (h - ih) * f[1], iw, ih);
  }
  // Sekiz köşeli yıldız (Selçuklu yıldızı)
  function yildiz8(g, x, y, R, ic) {
    g.beginPath();
    for (let i = 0; i < 16; i++) { const t = (i * Math.PI) / 8 - Math.PI / 2, r = i % 2 ? R * (ic || 0.62) : R; g.lineTo(x + Math.cos(t) * r, y + Math.sin(t) * r); }
    g.closePath();
  }
  function baklava(g, x, y, s) { g.beginPath(); g.moveTo(x, y - s); g.lineTo(x + s, y); g.lineTo(x, y + s); g.lineTo(x - s, y); g.closePath(); }
  // Çizgi, ortada baklava ve iki küçük nokta
  function ayrac(g, x, y, en, renk) {
    g.save(); g.fillStyle = renk; g.strokeStyle = renk; g.lineWidth = 1.6;
    g.beginPath(); g.moveTo(x - en / 2, y); g.lineTo(x - 22, y); g.moveTo(x + 22, y); g.lineTo(x + en / 2, y); g.stroke();
    baklava(g, x, y, 8); g.fill(); baklava(g, x - 30, y, 3.5); g.fill(); baklava(g, x + 30, y, 3.5); g.fill();
    g.restore();
  }
  // Çift çizgili çerçeve, köşelerde yıldız
  function cerceve(g, W, H, m, renk) {
    g.save(); g.strokeStyle = renk; g.lineWidth = 2; g.strokeRect(m, m, W - 2 * m, H - 2 * m);
    g.lineWidth = 1; g.globalAlpha = 0.7; g.strokeRect(m + 10, m + 10, W - 2 * m - 20, H - 2 * m - 20); g.globalAlpha = 1;
    g.fillStyle = renk;
    for (const [x, y] of [[m + 5, m + 5], [W - m - 5, m + 5], [m + 5, H - m - 5], [W - m - 5, H - m - 5]]) { yildiz8(g, x, y, 15, 0.5); g.fill(); }
    g.restore();
  }
  // Sivri kemer (iki merkezli, Osmanlı pencere kemeri). k: kemerin sivriliği
  function kemerYol(g, x0, x1, ys, yb, k) {
    const w = x1 - x0, R = (1 - (k || 0.4)) * w, h = Math.sqrt(R * R - (R - w / 2) * (R - w / 2));
    g.beginPath(); g.moveTo(x0, yb); g.lineTo(x0, ys);
    g.arc(x0 + R, ys, R, Math.PI, Math.atan2(-h, w / 2 - R) + PI2);
    g.arc(x1 - R, ys, R, Math.atan2(-h, R - w / 2) + PI2, PI2);
    g.lineTo(x1, yb); g.closePath();
    return ys - h;
  }
  // Işık topları (bokeh)
  function bokeh(g, x0, y0, w, h, n, renkler, tohum, rmin, rmax) {
    const r = rastgele(tohum); g.save(); g.globalCompositeOperation = "screen";
    for (let i = 0; i < n; i++) {
      const x = x0 + r() * w, y = y0 + r() * h, R = rmin + r() * (rmax - rmin), c = renkler[i % renkler.length];
      g.fillStyle = rz(g, x, y, 0, R, [[0, hexA(c, 0.55)], [0.62, hexA(c, 0.32)], [0.86, hexA(c, 0.12)], [1, hexA(c, 0)]]);
      g.beginPath(); g.arc(x, y, R, 0, PI2); g.fill();
    }
    g.restore();
  }
  // Altın yaldızlı el yazısı satırı (sığmazsa küçülür)
  function elYazisi(g, W, metin, px, renk, golgesiz) {
    g.font = EL(px); while (px > 60 && g.measureText(metin).width > W - 190) { px -= 4; g.font = EL(px); }
    const h = Math.round(px * 1.05);
    return { h, ciz: (y) => {
      g.save(); g.font = EL(px); const w = g.measureText(metin).width, cy = y + h / 2 + px * 0.06;
      if (!golgesiz) { g.shadowColor = "rgba(0,0,0,.45)"; g.shadowBlur = 18; g.shadowOffsetY = 3; }
      g.fillStyle = renk || dz(g, W / 2 - w / 2, cy - px / 2, W / 2 + w / 2, cy + px / 2, ALTIN); g.fillText(metin, W / 2, cy);
      g.restore();
    } };
  }
  // Fotoğraf künyesi: CC BY fotoğrafçının adını ister; dikey (sağ kenar) ya da yatay
  function kunye(g, f, x, y, renk, dikey, hiza) {
    if (!f.kredi) return;
    const lis = Array.isArray(f.lis) ? TL(f.lis[0], f.lis[1]) : f.lis;
    const t = TL("Fotoğraf: ", "Photo: ") + f.kredi + (lis ? " · " + lis + (/^CC BY/.test(lis) ? TL(", düzenlendi", ", edited") : "") : "") + " · Wikimedia Commons";
    g.save(); g.font = Y.PF(600, 17); g.fillStyle = renk; g.textAlign = hiza || "center";
    if (dikey) { g.translate(x, y); g.rotate(-Math.PI / 2); g.fillText(t, 0, 0); } else g.fillText(t, x, y);
    g.restore();
  }
  const ilkBuyuk = (s) => s.toLocaleLowerCase("tr").split(" ").map((k) => k.charAt(0).toLocaleUpperCase("tr") + k.slice(1)).join(" ");
  // El yazısı satırı: güne göre (kandillerde mahyadaki ad)
  function baslikEl(o, ad) {
    const e = en();
    if (ad === "kandil") return e ? "Blessed Night" : o.mahya ? ilkBuyuk(o.mahya) : "Hayırlı Kandiller";
    return ({ kadir: ["Kadir Gecesi", "Night of Power"], ramazan: ["Hoş geldin Ramazan", "Welcome, Ramadan"], rbayram: ["Nice Bayramlara", "Eid Mubarak"], kurban: ["Nice Bayramlara", "Eid Mubarak"],
      yilbasi: ["Mutlu Yıllar", "Happy New Year"], anneler: ["Canım Annem", "Dear Mom"], babalar: ["Canım Babam", "Dear Dad"] }[ad] || ["", ""])[e ? 1 : 0];
  }
  // Yazı düzeni: tarih, el yazısı başlık, (yıl), ayraç, mesaj, alt mesaj
  function fotoYazi(g, W, o, f, ust, alt) {
    const ad = o.kart.split("-")[0], P = f.P, el = f.elYok ? "" : baslikEl(o, ad);
    let bas = o.bas, altM = o.alt;
    if (ad === "yilbasi") { bas = altM || bas; altM = ""; }
    const kur = (k) => {
      const L = [], b = (n) => Math.round(n * k);
      if (o.tarih && !f.tarihYok) L.push(Y.tarihSatiri(g, W, o.tarih, P.tarih || P.vurgu, 26), b(el ? 6 : 26));
      if (el) L.push(elYazisi(g, W, el, b(f.elPx || 128), P.el, P.elGolgesiz));
      if (ad === "yilbasi" && o.yil) { const px = b(150); L.push(b(2), { h: Math.round(px * 0.9), ciz: (y) => { g.save(); g.font = SERIF(800, px); const w = g.measureText(String(o.yil)).width; g.fillStyle = dz(g, W / 2 - w / 2, y, W / 2 + w / 2, y + px, ALTIN); g.shadowColor = "rgba(255,200,110,.35)"; g.shadowBlur = 36; g.fillText(String(o.yil), W / 2, y + px * 0.47); g.restore(); } }); }
      if (f.baslik) { const px = b(f.baslikPx || 84); L.push({ h: Math.round(px * 1.05), ciz: (y) => { g.save(); g.font = SERIF(700, px); Y.harfAra(g, 6); g.fillStyle = P.baslik || "#fff"; g.fillText(f.baslik, W / 2, y + px * 0.52); Y.harfAra(g, 0); g.restore(); } }); }
      L.push(b(14), { h: 16, ciz: (y) => ayrac(g, W / 2, y + 8, 300, P.cizgi || P.vurgu) }, b(22));
      L.push(Y.blok(g, bas, { en: 860, font: (px) => SERIF(f.agir || 600, px), px: b(f.basPx || 50), min: b(36), max: 3, lh: 1.22, renk: P.yazi, x: W / 2 }));
      if (altM) L.push(b(16), Y.blok(g, altM, { en: 820, font: (px) => SERIF(400, px, true), px: b(36), min: b(28), max: 3, lh: 1.32, renk: P.soluk, x: W / 2 }));
      return L;
    };
    let L;
    for (let k = 1; k >= 0.72; k -= 0.04) { L = kur(k); if (L.reduce((a, x) => a + (typeof x === "number" ? x : x.h), 0) <= alt - ust) break; }
    Y.diz(L, ust, alt);
  }
  // Şablon 1, tam sayfa: fotoğraf bütün kartı kaplar, alt yarı güne özel renge erir, altın çerçeve
  function tamSablon(g, W, H, o, f) {
    const P = f.P, fh = f.fotoH || H, yu = f.yaziUst || (f.fotoH ? fh - 44 : 720);
    g.fillStyle = P.zemin; g.fillRect(0, 0, W, H);
    if (o.foto) kapla(g, o.foto, 0, 0, W, fh, f.odak);
    else { zemin(g, W, H, [[0, P.zemin2 || P.zemin], [1, P.zemin]]); g.save(); g.globalAlpha = 0.16; selcuk(g, 0, 0, W, 780, 130, { zemin: "rgba(0,0,0,0)", yildiz: P.vurgu, cizgi: P.vurgu, ic: P.zemin }); g.restore(); }
    if (f.ton) { g.save(); g.globalCompositeOperation = f.tonMod || "soft-light"; g.fillStyle = f.ton; g.fillRect(0, 0, W, fh); g.restore(); }
    g.fillStyle = dz(g, 0, 0, 0, 200, [[0, "rgba(0,0,0,.32)"], [1, "rgba(0,0,0,0)"]]); g.fillRect(0, 0, W, 200);
    // fotoğraf alta doğru günün rengine erir
    const g0 = f.fotoH ? fh - 300 : yu - 340, g1 = f.fotoH ? fh : yu + 150;
    g.fillStyle = dz(g, 0, g0, 0, g1, [[0, hexA(P.zemin, 0)], [0.5, hexA(P.zemin, 0.62)], [1, P.zemin]]); g.fillRect(0, g0, W, g1 - g0);
    g.fillStyle = P.zemin; g.fillRect(0, g1 - 1, W, H - g1 + 1);
    g.save(); g.globalCompositeOperation = "multiply"; g.fillStyle = rz(g, W / 2, fh * 0.4, W * 0.32, W * 0.95, [[0, "rgba(255,255,255,1)"], [1, hexA(P.golge || "#000000", 0.55)]]); g.fillRect(0, 0, W, H); g.restore();
    if (f.efekt) f.efekt(g, W, H, o);
    cerceve(g, W, H, 26, hexA(P.cerceve || "#e7c983", 0.8));
    fotoYazi(g, W, o, f, yu, 1110);
    altImza(g, W, o, P.yazi, P.vurgu, P.soluk);
    kunye(g, f, W - 52, Math.min(fh, 780) / 2 + 30, "rgba(255,255,255,.6)", true);
  }
  // Şablon 2, kemer: koyu ya da açık zemin, Selçuklu deseni, fotoğraf sivri kemerli pencerenin içinde
  function kemerSablon(g, W, H, o, f) {
    const P = f.P, x0 = 170, x1 = W - 170, ys = 552, yb = 722;
    zemin(g, W, H, [[0, P.zemin2 || P.zemin], [1, P.zemin]]);
    g.save(); g.globalAlpha = P.desen || 0.1; selcuk(g, 0, 0, W, H, 120, { zemin: "rgba(0,0,0,0)", yildiz: P.vurgu, cizgi: P.vurgu, ic: P.zemin }); g.restore();
    g.fillStyle = rz(g, W / 2, 420, 120, 760, [[0, hexA(P.zemin, 0)], [1, hexA(P.zemin, 0.9)]]); g.fillRect(0, 0, W, H);
    // gölge ve dış kemer
    g.save(); g.shadowColor = "rgba(0,0,0,.45)"; g.shadowBlur = 40; g.shadowOffsetY = 12; kemerYol(g, x0 - 18, x1 + 18, ys, yb + 18, 0.4); g.fillStyle = P.cerceveZemin || P.zemin; g.fill(); g.restore();
    const tepe = kemerYol(g, x0 - 18, x1 + 18, ys, yb + 18, 0.4);
    g.lineWidth = 2; g.strokeStyle = dz(g, x0, tepe, x1, yb, ALTIN); g.stroke();
    // fotoğraf
    g.save(); const ic = kemerYol(g, x0, x1, ys, yb, 0.4); g.clip();
    if (o.foto) kapla(g, o.foto, x0, ic, x1 - x0, yb - ic, f.odak);
    else { g.fillStyle = dz(g, 0, ic, 0, yb, [[0, P.zemin2 || P.zemin], [1, P.vurgu]]); g.fillRect(x0, ic, x1 - x0, yb - ic); }
    if (f.ton) { g.globalCompositeOperation = f.tonMod || "soft-light"; g.fillStyle = f.ton; g.fillRect(x0, ic, x1 - x0, yb - ic); g.globalCompositeOperation = "source-over"; }
    g.fillStyle = rz(g, W / 2, (ic + yb) / 2, 200, 520, [[0, "rgba(0,0,0,0)"], [1, "rgba(0,0,0,.35)"]]); g.fillRect(x0, ic, x1 - x0, yb - ic);
    if (f.efekt) f.efekt(g, W, H, o);
    g.restore();
    kemerYol(g, x0, x1, ys, yb, 0.4); g.lineWidth = 5; g.strokeStyle = dz(g, x0, ic, x1, yb, ALTIN); g.stroke();
    // kemer tepesinde süs: hilal ya da yıldız
    g.save(); g.fillStyle = dz(g, W / 2 - 20, tepe - 60, W / 2 + 20, tepe, ALTIN);
    if (f.alem === "hilal") { g.fillRect(W / 2 - 2, tepe - 26, 4, 24); g.beginPath(); g.arc(W / 2, tepe - 26, 5, 0, PI2); g.fill(); Y.hilal(g, W / 2 + 3, tepe - 44, 13); }
    else { yildiz8(g, W / 2, tepe - 22, 15, 0.55); g.fill(); }
    g.restore();
    // kemerin iki yanında ince sütun çizgileri
    g.strokeStyle = hexA(P.cerceve || "#e7c983", 0.45); g.lineWidth = 1.2;
    for (const x of [x0 - 40, x1 + 40]) { g.beginPath(); g.moveTo(x, ys - 60); g.lineTo(x, yb + 18); g.stroke(); baklava(g, x, ys - 72, 6); g.fillStyle = hexA(P.cerceve || "#e7c983", 0.6); g.fill(); }
    kunye(g, f, x1 + 18, yb + 42, P.kunye || hexA("#ffffff", 0.55), false, "right");
    cerceve(g, W, H, 26, hexA(P.cerceve || "#e7c983", 0.55));
    fotoYazi(g, W, o, f, 780, 1112);
    altImza(g, W, o, P.yazi, P.vurgu, P.soluk);
  }
  // Şablon 3, kolaj: üç fotoğraf anı fotoğrafı gibi bantla yapıştırılmış, altlarında el yazısıyla birer söz.
  // Üç fotoğraf tek dosyada yan yana durur (tek indirme)
  function kolajSablon(g, W, H, o, f) {
    const P = f.P;
    zemin(g, W, H, [[0, P.zemin2 || P.zemin], [1, P.zemin]]);
    if (f.efekt0) f.efekt0(g, W, H, o);
    const parca = (i, x, y, w, h, a, yazi) => {
      g.save(); g.translate(x, y); g.rotate(a);
      g.shadowColor = "rgba(0,0,0,.5)"; g.shadowBlur = 30; g.shadowOffsetY = 12; g.fillStyle = "#fbf8f1"; g.fillRect(-w / 2 - 16, -h / 2 - 16, w + 32, h + 92); g.shadowColor = "transparent";
      if (o.foto) { const sw = o.foto.width / 3; g.drawImage(o.foto, i * sw, 0, sw, o.foto.height, -w / 2, -h / 2, w, h); }
      else { g.fillStyle = dz(g, 0, -h / 2, 0, h / 2, [[0, P.zemin2 || P.zemin], [1, P.vurgu]]); g.fillRect(-w / 2, -h / 2, w, h); }
      g.strokeStyle = "rgba(0,0,0,.08)"; g.lineWidth = 1; g.strokeRect(-w / 2, -h / 2, w, h);
      g.font = EL(44); g.fillStyle = "#2b2f3a"; g.fillText(yazi, 0, h / 2 + 40);
      g.save(); g.translate(0, -h / 2 - 14); g.rotate(-a * 1.8 + 0.05); g.fillStyle = "rgba(244,232,200,.82)"; g.fillRect(-62, -17, 124, 34); g.restore();
      g.restore();
    };
    const R = en() ? f.sozEn : f.soz;
    parca(1, 214, 470, 360, 270, -0.09, R[1]);
    parca(2, 866, 470, 360, 270, 0.09, R[2]);
    parca(0, 540, 420, 384, 288, -0.015, R[0]);
    if (f.efekt) f.efekt(g, W, H, o);
    cerceve(g, W, H, 26, hexA(P.cerceve || "#e7c983", 0.55));
    fotoYazi(g, W, o, f, 724, 1112);
    altImza(g, W, o, P.yazi, P.vurgu, P.soluk);
    kunye(g, f, W / 2, 1300, "rgba(255,255,255,.55)");
  }
  // Şablon 4, yazı içinde fotoğraf: büyük harflerin içi fotoğrafla dolar (ör. 15 TEMMUZ)
  function maskeSablon(g, W, H, o, f) {
    const P = f.P, S = en() ? f.sozEn : f.soz;
    g.fillStyle = P.zemin; g.fillRect(0, 0, W, H);
    isik(g, W / 2, 400, 700, hexA(P.vurgu, 0.2));
    // üstte küçük bayrak
    g.save(); g.shadowColor = "rgba(0,0,0,.5)"; g.shadowBlur = 14; g.translate(W / 2 - 42, 64); bayrakDuz(g, 84, 56); g.restore();
    const mc = yeni(W, H), m = mc.getContext("2d"); m.textAlign = "center"; m.textBaseline = "alphabetic";
    const satir = []; let y = 150;
    S.forEach((t, i) => {
      let px = i === 0 ? 600 : 210, ara = i === 0 ? -10 : 12; const yaz = () => { m.font = SERIF(900, px); Y.harfAra(m, ara); };
      yaz(); while (m.measureText(t).width > W - 150) { px -= 6; yaz(); }
      const me = m.measureText(t); y += me.actualBoundingBoxAscent; satir.push([t, px, ara, y]); y += me.actualBoundingBoxDescent + (i === 0 ? 40 : 0);
    });
    const yazHepsi = (c, dolgu, cizgi) => { for (const [t, px, ara, yy] of satir) { c.font = SERIF(900, px); Y.harfAra(c, ara); if (dolgu) c.fillText(t, W / 2, yy); if (cizgi) c.strokeText(t, W / 2, yy); } Y.harfAra(c, 0); };
    m.fillStyle = "#fff"; yazHepsi(m, true);
    m.globalCompositeOperation = "source-in";
    if (o.foto) { kapla(m, o.foto, 0, 120, W, y - 100, f.odak); m.globalCompositeOperation = "source-atop"; m.fillStyle = dz(m, 0, 120, 0, y, [[0, "rgba(0,0,0,0)"], [1, "rgba(0,0,0,.25)"]]); m.fillRect(0, 0, W, H); }
    else { m.fillStyle = dz(m, 0, 150, 0, y, [[0, "#ff4b55"], [1, "#8f0610"]]); m.fillRect(0, 0, W, H); }
    g.save(); g.shadowColor = hexA(P.vurgu, 0.6); g.shadowBlur = 70; g.drawImage(mc, 0, 0); g.restore();
    g.drawImage(mc, 0, 0);
    g.save(); g.textAlign = "center"; g.textBaseline = "alphabetic"; g.strokeStyle = "rgba(255,255,255,.55)"; g.lineWidth = 2; yazHepsi(g, false, true); g.restore();
    cerceve(g, W, H, 26, hexA(P.cerceve || "#ffffff", 0.3));
    fotoYazi(g, W, o, f, Math.max(y + 30, 780), 1112);
    altImza(g, W, o, P.yazi, P.vurgu, P.soluk);
    kunye(g, f, W / 2, 1302, "rgba(255,255,255,.5)");
  }
  // Şablon 5, madalyon: fotoğraf dilimli altın rozetin ortasında, altında kurdele, çevrede konfeti
  function madalyonSablon(g, W, H, o, f) {
    const P = f.P, cx = W / 2, cy = 420, R = 262;
    zemin(g, W, H, [[0, P.zemin2], [1, P.zemin]]);
    g.save(); g.globalAlpha = P.desen || 0.12; selcuk(g, 0, 0, W, H, 120, { zemin: "rgba(0,0,0,0)", yildiz: P.vurgu, cizgi: P.vurgu, ic: P.zemin }); g.restore();
    g.fillStyle = rz(g, cx, cy, R, 900, [[0, hexA(P.zemin, 0)], [1, hexA(P.zemin, 0.88)]]); g.fillRect(0, 0, W, H);
    isik(g, cx, cy, R + 300, "rgba(255,214,140,.28)");
    const r = rastgele(f.tohum || 309);
    for (let i = 0; i < 70; i++) {
      const x = 50 + r() * (W - 100), yy = 50 + r() * 740, t = r(), a = r() * PI2, s = 3 + r() * 7, renk = r() < 0.6 ? P.vurgu : P.konfeti || "#ffffff", al = 0.35 + r() * 0.55;
      if (Math.hypot(x - cx, yy - cy) < R + 80) continue;
      g.save(); g.globalAlpha = al; g.fillStyle = renk; g.translate(x, yy); g.rotate(a);
      if (t < 0.55) baklava(g, 0, 0, s); else if (t < 0.85) yildiz8(g, 0, 0, s + 2, 0.5); else { g.beginPath(); g.arc(0, 0, s * 0.5, 0, PI2); }
      g.fill(); g.restore();
    }
    // dilimli altın rozet
    const n = 40, Rd = R + 54, rozet = () => { g.beginPath(); for (let i = 0; i <= 720; i++) { const t = (i / 720) * PI2, rr = Rd - 16 + 16 * Math.sqrt(Math.abs(Math.cos((t * n) / 2))); g.lineTo(cx + Math.cos(t) * rr, cy + Math.sin(t) * rr); } g.closePath(); };
    g.save(); g.shadowColor = "rgba(0,0,0,.55)"; g.shadowBlur = 44; g.shadowOffsetY = 16; rozet(); g.fillStyle = dz(g, cx - Rd, cy - Rd, cx + Rd, cy + Rd, ALTIN); g.fill(); g.restore();
    g.beginPath(); g.arc(cx, cy, R + 30, 0, PI2); g.fillStyle = P.halka || P.zemin; g.fill();
    g.fillStyle = dz(g, cx - R, cy - R, cx + R, cy + R, ALTIN);
    for (let i = 0; i < 64; i++) { const t = (i / 64) * PI2; g.beginPath(); g.arc(cx + Math.cos(t) * (R + 17), cy + Math.sin(t) * (R + 17), 3.6, 0, PI2); g.fill(); }
    g.save(); g.beginPath(); g.arc(cx, cy, R, 0, PI2); g.clip();
    if (o.foto) kapla(g, o.foto, cx - R, cy - R, 2 * R, 2 * R, f.odak); else { g.fillStyle = dz(g, 0, cy - R, 0, cy + R, [[0, P.zemin2], [1, P.vurgu]]); g.fillRect(cx - R, cy - R, 2 * R, 2 * R); }
    g.fillStyle = rz(g, cx, cy, R * 0.55, R, [[0, "rgba(0,0,0,0)"], [1, "rgba(0,0,0,.32)"]]); g.fillRect(cx - R, cy - R, 2 * R, 2 * R);
    g.restore();
    g.beginPath(); g.arc(cx, cy, R + 4, 0, PI2); g.lineWidth = 5; g.strokeStyle = dz(g, cx - R, cy - R, cx + R, cy + R, ALTIN); g.stroke();
    // kurdele: iki ucu V kesik, ortası hafif kavisli
    const ky = cy + R + 4, kh = 88, kx0 = 170, kx1 = W - 170, s = 16, kur = P.kurdele || "#b3122e";
    for (const k of [-1, 1]) {
      const xd = k < 0 ? kx0 : kx1, xu = xd + k * 110;
      g.save(); g.shadowColor = "rgba(0,0,0,.45)"; g.shadowBlur = 18; g.shadowOffsetY = 8;
      g.beginPath(); g.moveTo(xd - k * 40, ky + 22); g.lineTo(xu, ky + 22); g.lineTo(xu - k * 34, ky + 22 + kh / 2); g.lineTo(xu, ky + 22 + kh); g.lineTo(xd - k * 40, ky + 22 + kh); g.closePath();
      g.fillStyle = P.kurdeleKoyu || "#7d0b1f"; g.fill(); g.restore();
    }
    g.save(); g.shadowColor = "rgba(0,0,0,.45)"; g.shadowBlur = 22; g.shadowOffsetY = 10;
    g.beginPath(); g.moveTo(kx0, ky + s); g.quadraticCurveTo(cx, ky - s, kx1, ky + s); g.lineTo(kx1, ky + kh + s); g.quadraticCurveTo(cx, ky + kh - s, kx0, ky + kh + s); g.closePath();
    g.fillStyle = dz(g, 0, ky - s, 0, ky + kh + s, [[0, hexA(kur, 1)], [0.5, kur], [1, P.kurdeleKoyu || "#7d0b1f"]]); g.fill(); g.restore();
    g.strokeStyle = dz(g, kx0, 0, kx1, 0, ALTIN); g.lineWidth = 2;
    for (const d of [8, kh - 8]) { g.beginPath(); g.moveTo(kx0 + 6, ky + s + d - 2); g.quadraticCurveTo(cx, ky - s + d + 2, kx1 - 6, ky + s + d - 2); g.stroke(); }
    g.save(); g.font = SERIF(700, 44); Y.harfAra(g, 5); g.fillStyle = "#fff"; g.shadowColor = "rgba(0,0,0,.35)"; g.shadowBlur = 6;
    const ad = en() ? f.kurdeleEn : f.kurdeleYazi; let px = 44; while (g.measureText(ad).width > kx1 - kx0 - 90 && px > 28) { px -= 2; g.font = SERIF(700, px); }
    g.fillText(ad, cx, ky + kh / 2 - 2); Y.harfAra(g, 0); g.restore();
    cerceve(g, W, H, 26, hexA(P.cerceve || "#e7c983", 0.6));
    fotoYazi(g, W, o, f, ky + kh + 46, 1112);
    altImza(g, W, o, P.yazi, P.vurgu, P.soluk);
    kunye(g, f, W / 2, 1302, P.kunye || "rgba(255,255,255,.55)");
  }
  // İznik çinisi: beyaz sır üstünde kobalt göbek, turkuaz yapraklar, mercan kırmızısı orta
  function ciniKaro(g, x, y, s, R) {
    g.save(); g.translate(x, y); g.beginPath(); g.rect(0, 0, s, s); g.clip();
    g.fillStyle = R.zemin; g.fillRect(0, 0, s, s);
    g.fillStyle = R.turkuaz;
    for (const [cx, cy] of [[0, 0], [s, 0], [0, s], [s, s]]) for (let k = 0; k < 4; k++) { const a = (k * Math.PI) / 2 + Math.PI / 4; g.beginPath(); g.ellipse(cx + Math.cos(a) * s * 0.19, cy + Math.sin(a) * s * 0.19, s * 0.17, s * 0.07, a, 0, PI2); g.fill(); }
    g.fillStyle = R.kirmizi; for (const [cx, cy] of [[0, 0], [s, 0], [0, s], [s, s]]) { g.beginPath(); g.arc(cx, cy, s * 0.06, 0, PI2); g.fill(); }
    g.fillStyle = R.kobalt; for (const [cx, cy] of [[s / 2, 0], [s / 2, s], [0, s / 2], [s, s / 2]]) { g.beginPath(); g.arc(cx, cy, s * 0.07, 0, PI2); g.fill(); }
    const c = s / 2; g.fillStyle = R.kobalt;
    for (let k = 0; k < 8; k++) { const a = (k * Math.PI) / 4; g.beginPath(); g.ellipse(c + Math.cos(a) * s * 0.17, c + Math.sin(a) * s * 0.17, s * 0.14, s * 0.06, a, 0, PI2); g.fill(); }
    g.beginPath(); g.arc(c, c, s * 0.09, 0, PI2); g.fillStyle = R.turkuaz; g.fill();
    g.beginPath(); g.arc(c, c, s * 0.055, 0, PI2); g.fillStyle = R.kirmizi; g.fill();
    g.strokeStyle = "rgba(20,50,95,.22)"; g.lineWidth = 1; g.strokeRect(0.5, 0.5, s - 1, s - 1);
    g.restore();
  }
  // Şablon 6, çini çerçeve: kenarlar İznik çinisi, ortada fotoğraf ve yazı
  function ciniSablon(g, W, H, o, f) {
    const P = f.P, R = P.cini, s = 90, nx = W / s, ny = Math.round(H / s);
    g.fillStyle = P.zemin; g.fillRect(0, 0, W, H);
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) if (i === 0 || j === 0 || i === nx - 1 || j === ny - 1) ciniKaro(g, i * s, j * s, s, R);
    g.fillStyle = rz(g, W / 2, H / 2, 200, 760, [[0, P.zemin], [1, P.zemin2 || P.zemin]]); g.fillRect(s, s, W - 2 * s, H - 2 * s);
    g.strokeStyle = R.kobalt; g.lineWidth = 6; g.strokeRect(s + 3, s + 3, W - 2 * s - 6, H - 2 * s - 6);
    g.strokeStyle = R.kirmizi; g.lineWidth = 2; g.strokeRect(s + 12, s + 12, W - 2 * s - 24, H - 2 * s - 24);
    // fotoğraf penceresi
    const x0 = 150, y0 = 150, x1 = W - 150, y1 = 668;
    g.save(); g.shadowColor = "rgba(20,40,80,.35)"; g.shadowBlur = 26; g.shadowOffsetY = 10; g.fillStyle = R.kobalt; g.fillRect(x0 - 10, y0 - 10, x1 - x0 + 20, y1 - y0 + 20); g.restore();
    if (o.foto) kapla(g, o.foto, x0, y0, x1 - x0, y1 - y0, f.odak); else { g.fillStyle = dz(g, 0, y0, 0, y1, [[0, R.turkuaz], [1, R.kobalt]]); g.fillRect(x0, y0, x1 - x0, y1 - y0); }
    g.strokeStyle = "rgba(255,255,255,.85)"; g.lineWidth = 2; g.strokeRect(x0 + 8, y0 + 8, x1 - x0 - 16, y1 - y0 - 16);
    g.fillStyle = R.kirmizi; for (const [x, y] of [[x0 - 10, y0 - 10], [x1 + 10, y0 - 10], [x0 - 10, y1 + 10], [x1 + 10, y1 + 10]]) { yildiz8(g, x, y, 16, 0.5); g.fill(); }
    kunye(g, f, x1 + 10, y1 + 34, P.kunye || "rgba(29,42,68,.6)", false, "right");
    fotoYazi(g, W, o, f, y1 + 50, 1064);
    Y.imza(g, W, 1116, o.ikon, P.yazi, P.vurgu, P.soluk);
  }
  // Şablon 7, mektup: çizgili kâğıt, bantla yapıştırılmış fotoğraf, el yazısıyla hitap ve imza
  function mektupSablon(g, W, H, o, f) {
    const P = f.P, M = en() ? f.mektupEn : f.mektup, r = rastgele(41);
    g.fillStyle = P.zemin; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 2600; i++) { g.fillStyle = r() < 0.5 ? "rgba(120,80,50,.04)" : "rgba(255,255,255,.35)"; g.fillRect(r() * W, r() * H, 1 + r() * 2, 1 + r() * 2); }
    g.fillStyle = rz(g, W / 2, H / 2, 300, 900, [[0, "rgba(0,0,0,0)"], [1, "rgba(120,70,40,.12)"]]); g.fillRect(0, 0, W, H);
    // tarih (mektup başı gibi sağ üstte)
    if (o.tarih) { g.save(); g.textAlign = "right"; g.font = Y.PF(800, 22); Y.harfAra(g, 5); g.fillStyle = P.tarih || P.vurgu; g.fillText(o.tarih, W - 96, 70); Y.harfAra(g, 0); g.restore(); }
    // fotoğraf: anı fotoğrafı gibi beyaz kenarlı, hafif eğik, iki köşesinde bant
    const fw = 600, fh = 420, fx = W / 2 + 10, fy = 356, a = -0.045;
    g.save(); g.translate(fx, fy); g.rotate(a);
    g.shadowColor = "rgba(70,40,30,.35)"; g.shadowBlur = 30; g.shadowOffsetY = 12; g.fillStyle = "#fffdf8"; g.fillRect(-fw / 2 - 22, -fh / 2 - 22, fw + 44, fh + 104); g.shadowColor = "transparent";
    if (o.foto) kapla(g, o.foto, -fw / 2, -fh / 2, fw, fh, f.odak); else { g.fillStyle = P.vurgu; g.fillRect(-fw / 2, -fh / 2, fw, fh); }
    g.font = EL(46); g.fillStyle = "#5b4a44"; g.fillText(en() ? f.yerEn || f.yer : f.yer, 0, fh / 2 + 42);
    for (const k of [-1, 1]) { g.save(); g.translate(k * (fw / 2 - 10), -fh / 2 - 16); g.rotate(k * 0.7); g.fillStyle = "rgba(240,226,190,.85)"; g.fillRect(-58, -16, 116, 32); g.restore(); }
    g.restore();
    // kurutulmuş laleler
    lale(g, 900, 610, 0.4, 0.42, P.lale1 || "#f6a04d", P.lale2 || "#d9541f", P.sap || "#5f8a4c");
    lale(g, 930, 640, 0.34, 0.12, P.lale1 || "#f6a04d", P.lale2 || "#d9541f", P.sap || "#5f8a4c");
    // çizgiler ve yazı
    const sol = 120, sag = W - 120, ara = 62, ilk = 760;
    g.strokeStyle = hexA(P.cizgi, 0.32); g.lineWidth = 1.4;
    for (let y = ilk; y <= 1096; y += ara) { g.beginPath(); g.moveTo(sol - 20, y); g.lineTo(sag + 20, y); g.stroke(); }
    g.save(); g.textAlign = "left"; g.textBaseline = "alphabetic";
    g.font = EL(92); g.fillStyle = P.el || P.vurgu; g.fillText(M[0], sol, ilk - 6);
    const rr = Y.satirla(g, M[1], sag - sol, (p) => SERIF(500, p, true), 40, 30, 4), L = rr.s;
    g.font = SERIF(500, rr.px, true); g.fillStyle = P.yazi; L.forEach((t, i) => g.fillText(t, sol, ilk + ara * (i + 1) - 12));
    g.textAlign = "right"; g.font = EL(70); g.fillStyle = P.el || P.vurgu; g.fillText(M[2], sag, ilk + ara * (L.length + 1) + 4);
    g.restore();
    altImza(g, W, o, P.yazi, P.vurgu, P.soluk);
    kunye(g, f, W / 2, 1302, P.kunye || "rgba(60,40,35,.55)");
  }
  // Şablon 8, oval çerçeve: incili altın oval içinde fotoğraf, tepede fiyonk, altta çiçekler
  function ovalSablon(g, W, H, o, f) {
    const P = f.P, cx = W / 2, cy = 440, rx = 280, ry = 330, r = rastgele(f.tohum || 77);
    zemin(g, W, H, [[0, P.zemin2], [1, P.zemin]]);
    for (let i = 0; i < 26; i++) { const x = r() * W, y = r() * 900, s = 8 + r() * 16; g.save(); g.translate(x, y); g.rotate(r() * PI2); g.globalAlpha = 0.18 + r() * 0.22; g.fillStyle = r() < 0.5 ? P.vurgu : P.yaprak || "#e9a3b3"; g.beginPath(); g.ellipse(0, 0, s, s * 0.55, 0, 0, PI2); g.fill(); g.restore(); }
    g.save(); g.shadowColor = "rgba(90,30,45,.35)"; g.shadowBlur = 44; g.shadowOffsetY = 16; g.beginPath(); g.ellipse(cx, cy, rx + 36, ry + 36, 0, 0, PI2); g.fillStyle = dz(g, cx - rx, cy - ry, cx + rx, cy + ry, ALTIN); g.fill(); g.restore();
    g.beginPath(); g.ellipse(cx, cy, rx + 26, ry + 26, 0, 0, PI2); g.fillStyle = P.halka || "#fff8f4"; g.fill();
    for (let i = 0; i < 76; i++) { const t = (i / 76) * PI2, x = cx + Math.cos(t) * (rx + 13), y = cy + Math.sin(t) * (ry + 13); g.fillStyle = rz(g, x - 2, y - 2, 0, 8, [[0, "#ffffff"], [0.6, "#f3e7e2"], [1, "#cdb8b0"]]); g.beginPath(); g.arc(x, y, 6.2, 0, PI2); g.fill(); }
    g.save(); g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, PI2); g.clip();
    if (o.foto) kapla(g, o.foto, cx - rx, cy - ry, 2 * rx, 2 * ry, f.odak); else { g.fillStyle = dz(g, 0, cy - ry, 0, cy + ry, [[0, P.zemin2], [1, P.vurgu]]); g.fillRect(cx - rx, cy - ry, 2 * rx, 2 * ry); }
    g.fillStyle = rz(g, cx, cy, rx * 0.6, ry * 1.05, [[0, "rgba(0,0,0,0)"], [1, "rgba(60,20,30,.28)"]]); g.fillRect(cx - rx, cy - ry, 2 * rx, 2 * ry);
    g.restore();
    g.beginPath(); g.ellipse(cx, cy, rx + 2, ry + 2, 0, 0, PI2); g.lineWidth = 4; g.strokeStyle = dz(g, cx - rx, cy - ry, cx + rx, cy + ry, ALTIN); g.stroke();
    // fiyonk
    const by = cy - ry - 30, kr = P.kurdele || "#c2416b", kk = P.kurdeleKoyu || "#8e2347";
    g.save(); g.shadowColor = "rgba(80,20,40,.35)"; g.shadowBlur = 12; g.shadowOffsetY = 5;
    for (const k of [-1, 1]) {
      g.fillStyle = kk; g.beginPath(); g.moveTo(cx, by + 6); g.quadraticCurveTo(cx + k * 30, by + 70, cx + k * 58, by + 118); g.lineTo(cx + k * 30, by + 108); g.lineTo(cx + k * 22, by + 128); g.quadraticCurveTo(cx + k * 6, by + 60, cx - k * 4, by + 10); g.closePath(); g.fill();
      g.fillStyle = dz(g, cx, by - 40, cx + k * 110, by + 30, [[0, kk], [0.4, kr], [1, kr]]);
      g.beginPath(); g.moveTo(cx, by); g.bezierCurveTo(cx + k * 40, by - 70, cx + k * 120, by - 52, cx + k * 112, by - 6); g.bezierCurveTo(cx + k * 106, by + 34, cx + k * 44, by + 26, cx, by); g.fill();
    }
    g.fillStyle = kk; g.beginPath(); g.ellipse(cx, by, 20, 17, 0, 0, PI2); g.fill(); g.restore();
    // altta karanfil ve lale demetleri
    for (const k of [-1, 1]) {
      const x = cx + k * (rx - 10), y = cy + ry - 6;
      lale(g, x + k * 34, y + 26, 0.42, k * 0.55, P.lale1 || "#f4a6b8", P.lale2 || "#d4537a", P.sap || "#5f8a4c");
      karanfil(g, x, y, 34, P.vurgu, P.kurdeleKoyu || "#8e2347");
      karanfil(g, x - k * 44, y + 24, 26, P.yaprak || "#e98aa4", P.kurdeleKoyu || "#8e2347");
    }
    cerceve(g, W, H, 26, hexA(P.cerceve || "#c99a72", 0.6));
    fotoYazi(g, W, o, f, cy + ry + 66, 1112);
    altImza(g, W, o, P.yazi, P.vurgu, P.soluk);
    kunye(g, f, W / 2, 1302, P.kunye || "rgba(58,29,37,.55)");
  }
  // Şablon 9, hatıra pulu: lacivert pul albümünde tırtıklı kenarlı pul, köşesinde kırmızı yuvarlak damga
  function pulSablon(g, W, H, o, f) {
    const P = f.P, T = en() ? f.pulEn : f.pul;
    zemin(g, W, H, [[0, P.zemin2], [1, P.zemin]]);
    g.strokeStyle = "rgba(255,255,255,.05)"; g.lineWidth = 2; for (let y = 60; y < H; y += 36) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    isik(g, W / 2, 420, 620, "rgba(255,255,255,.07)");
    const pw = 620, ph = 760, px0 = -pw / 2, py0 = -ph / 2, a = -0.025, cx = W / 2, cy = 82 + ph / 2;
    // pul kâğıdı: kenarları tırtıklı (yarım daireler kesilir)
    const pc = yeni(pw + 40, ph + 40), p = pc.getContext("2d"), o2 = 20;
    p.fillStyle = "#fbfaf6"; p.fillRect(o2, o2, pw, ph);
    p.globalCompositeOperation = "destination-out"; const r = 9, ad = 26;
    for (let x = o2 + ad / 2; x < o2 + pw; x += ad) for (const y of [o2, o2 + ph]) { p.beginPath(); p.arc(x, y, r, 0, PI2); p.fill(); }
    for (let y = o2 + ad / 2; y < o2 + ph; y += ad) for (const x of [o2, o2 + pw]) { p.beginPath(); p.arc(x, y, r, 0, PI2); p.fill(); }
    p.globalCompositeOperation = "source-over";
    const fx = o2 + 30, fy = o2 + 30, fw = pw - 60, fh = pw - 60;
    if (o.foto) kapla(p, o.foto, fx, fy, fw, fh, f.odak); else { p.fillStyle = "#e30a17"; p.fillRect(fx, fy, fw, fh); }
    p.strokeStyle = "rgba(0,0,0,.18)"; p.lineWidth = 1; p.strokeRect(fx + 0.5, fy + 0.5, fw - 1, fh - 1);
    p.textAlign = "center"; p.textBaseline = "middle";
    let px = 70; p.font = SERIF(800, px); Y.harfAra(p, 4); while (p.measureText(T[0]).width > fw && px > 40) { px -= 2; p.font = SERIF(800, px); }
    p.fillStyle = P.vurgu; p.fillText(T[0], o2 + pw / 2, fy + fh + 62);
    px = 22; p.font = Y.PF(800, px); Y.harfAra(p, 4); while (p.measureText(T[1]).width > fw && px > 14) { px -= 1; p.font = Y.PF(800, px); }
    p.fillStyle = "#26304a"; p.fillText(T[1], o2 + pw / 2, fy + fh + 118); Y.harfAra(p, 0);
    g.save(); g.translate(cx, cy); g.rotate(a); g.shadowColor = "rgba(0,0,0,.55)"; g.shadowBlur = 34; g.shadowOffsetY = 14; g.drawImage(pc, px0 - o2, py0 - o2); g.restore();
    // kırmızı yuvarlak damga (pulun sağ üst köşesinde, gökyüzünün üstünde; bayrağa değmez)
    const dx = cx + pw / 2 - 24, dy = cy - ph / 2 + 92, dr = 100, M = en() ? f.damgaEn : f.damga;
    g.save(); g.translate(dx, dy); g.rotate(-0.18); g.globalAlpha = 0.86; g.strokeStyle = P.damga; g.fillStyle = P.damga;
    g.lineWidth = 4; g.beginPath(); g.arc(0, 0, dr, 0, PI2); g.stroke(); g.lineWidth = 2; g.beginPath(); g.arc(0, 0, dr - 34, 0, PI2); g.stroke();
    g.font = Y.PF(800, 19); g.textAlign = "center"; g.textBaseline = "middle";
    const harf = [...M[0]], aci = PI2 / harf.length;
    harf.forEach((h, i) => { g.save(); g.rotate(-Math.PI / 2 + i * aci); g.translate(dr - 17, 0); g.rotate(Math.PI / 2); g.fillText(h, 0, 0); g.restore(); });
    g.font = SERIF(800, 40); g.fillText(M[1], 0, 2);
    g.restore();
    cerceve(g, W, H, 26, hexA(P.cerceve || "#ffffff", 0.3));
    fotoYazi(g, W, o, f, cy + ph / 2 + 36, 1112);
    altImza(g, W, o, P.yazi, P.vurgu2 || P.vurgu, P.soluk);
    kunye(g, f, W / 2, 1302, "rgba(255,255,255,.5)");
  }
  const SABLON = { tam: tamSablon, kemer: kemerSablon, kolaj: kolajSablon, maske: maskeSablon, madalyon: madalyonSablon, cini: ciniSablon, mektup: mektupSablon, oval: ovalSablon, pul: pulSablon };
  // Kar taneleri ve konfeti
  const kar = (g, W, H) => { const r = rastgele(77); g.save(); g.fillStyle = "rgba(255,255,255,.85)"; for (let i = 0; i < 160; i++) { const y = r() * 760, s = 1 + r() * 3.6; g.globalAlpha = 0.35 + r() * 0.6; g.beginPath(); g.arc(r() * W, y, s, 0, PI2); g.fill(); } g.restore(); };
  const yaldiz = (g, W, H) => { bokeh(g, 0, 40, W, 640, 26, ["#ffd98a", "#ffb35c", "#fff1c9"], 2027, 10, 46); const r = rastgele(9); for (let i = 0; i < 20; i++) parilti(g, 60 + r() * (W - 120), 60 + r() * 640, 6 + r() * 12, "rgba(255,240,200,.9)"); };
  const kandilIsik = (g, W, H) => { bokeh(g, 0, 30, W, 560, 14, ["#ffcf7a", "#ffe6b0"], 1210, 8, 30); };
  // Her seçenek: şablon, fotoğraf dosyası, fotoğraf sahibi ve lisansı, renkler
  const KM = ["Kamu malı", "Public domain"];
  const GECE = { zemin: "#0a1230", zemin2: "#16224d", vurgu: "#f0c67a", yazi: "#ffffff", soluk: "rgba(255,255,255,.8)", cerceve: "#e7c983" };
  const FK = {
    "kandil-f1": { s: "tam", fotoH: 820, kredi: "Joseolgon", lis: "CC BY 4.0", P: GECE, efekt: kandilIsik },
    "kandil-f2": { s: "kemer", kredi: "Jorge Franganillo", lis: "CC BY 4.0", P: { ...GECE, desen: 0.12 }, alem: "hilal" },
    "kadir-f1": { s: "tam", kredi: "Mikel Iturbe Urretxa", lis: "CC BY 3.0", P: { ...GECE, zemin: "#000000" }, yaziUst: 760 },
    "kadir-f2": { s: "kemer", kredi: "David Spender", lis: "CC BY 2.0", P: { ...GECE, zemin: "#0b0d26", zemin2: "#1b1d48" }, alem: "hilal" },
    "ramazan-f1": { s: "tam", fotoH: 820, kredi: "Cem Topçu", lis: "CC BY 2.5", P: { ...GECE, zemin: "#0c0a14" }, efekt: kandilIsik },
    "ramazan-f2": { s: "kemer", kredi: "Alexander Cook", lis: KM, P: { zemin: "#13241f", zemin2: "#1f3b33", vurgu: "#e9c47a", yazi: "#fff", soluk: "rgba(255,255,255,.8)", cerceve: "#e9c47a", desen: 0.12 }, alem: "hilal" },
    "rbayram-f1": { s: "tam", fotoH: 820, kredi: "flowcomm", lis: "CC BY 2.0", P: { zemin: "#24100f", vurgu: "#f2c27b", yazi: "#fff", soluk: "rgba(255,255,255,.82)", cerceve: "#e9c47a" } },
    "rbayram-f2": { s: "kemer", kredi: "Jorge Láscar", lis: "CC BY 2.0", P: { zemin: "#f6efe2", zemin2: "#fbf7ef", vurgu: "#a8283a", yazi: "#2a1a1d", soluk: "#6b5559", el: "#a8283a", tarih: "#a8283a", cerceve: "#c39a4e", cerceveZemin: "#f6efe2", kunye: "rgba(42,26,29,.6)", desen: 0.07 }, alem: "hilal" },
    "kurban-f1": { s: "tam", kredi: "Jakub Hałun", lis: "CC BY 4.0", P: { zemin: "#062a3a", vurgu: "#f2d28b", yazi: "#fff", soluk: "rgba(255,255,255,.84)", cerceve: "#f2d28b" }, yaziUst: 760 },
    "kurban-f2": { s: "kemer", kredi: "Oumaima Loudini", lis: "CC BY 4.0", P: { zemin: "#0d1733", zemin2: "#1a2a55", vurgu: "#f0c67a", yazi: "#fff", soluk: "rgba(255,255,255,.8)", cerceve: "#e7c983", desen: 0.1 }, alem: "hilal" },
    "yilbasi-f1": { s: "tam", fotoH: 820, kredi: "freestocks.org", lis: "CC0", P: { zemin: "#120c0a", vurgu: "#f6d58e", yazi: "#fff", soluk: "rgba(255,255,255,.84)", cerceve: "#f1d08f" }, elPx: 116, efekt: yaldiz },
    "yilbasi-f2": { s: "kolaj", kredi: "Alexkom000, CC BY 4.0 · Kadı, CC BY 4.0 · Roc0ast3r, CC0", lis: ["düzenlendi", "edited"], soz: ["Yeni yollar", "Yeni şehirler", "Yeni anılar"], sozEn: ["New roads", "New cities", "New memories"],
      P: { zemin: "#0a1230", zemin2: "#1c2a5c", vurgu: "#f6d58e", yazi: "#fff", soluk: "rgba(255,255,255,.82)", cerceve: "#e7c983" }, elPx: 104, efekt0: (g, W, H) => { bokeh(g, 0, 0, W, 800, 22, ["#7fa8ff", "#ffd98a", "#c9b6ff"], 31, 14, 60); kar(g, W, H); } },
    "anneler-f1": { s: "tam", kredi: "Jacob van Hulsdonck", lis: KM, P: { zemin: "#17110e", vurgu: "#f1b9a6", yazi: "#fff", soluk: "rgba(255,255,255,.82)", cerceve: "#e2b48f" }, yaziUst: 740 },
    "anneler-f2": { s: "kemer", kredi: "Güldem Üstün", lis: "CC BY 2.0", P: { zemin: "#f7e8e2", zemin2: "#fdf6f2", vurgu: "#b04a5a", yazi: "#3a1d25", soluk: "#7a5961", el: "#b04a5a", tarih: "#b04a5a", cerceve: "#c99a72", cerceveZemin: "#f7e8e2", kunye: "rgba(58,29,37,.6)", desen: 0.07 } },
    "babalar-f1": { s: "tam", fotoH: 820, kredi: "Sanket Mehta", lis: "CC BY 3.0", P: { zemin: "#1a0b08", vurgu: "#ffbe6b", yazi: "#fff", soluk: "rgba(255,255,255,.82)", cerceve: "#f0c48a" } },
    "babalar-f2": { s: "kemer", kredi: "Raicem", lis: "CC0", P: { zemin: "#13233a", zemin2: "#22395a", vurgu: "#f2c27b", yazi: "#fff", soluk: "rgba(255,255,255,.8)", cerceve: "#e7c983", desen: 0.08 } },
    "demokrasi-f1": { s: "tam", fotoH: 820, kredi: "Ninara", lis: "CC BY 2.0", elYok: true, agir: 700, basPx: 54, P: { zemin: "#07090f", vurgu: "#e30a17", tarih: "#ff5a5f", yazi: "#fff", soluk: "rgba(255,255,255,.82)", cizgi: "#e30a17", cerceve: "#ffffff" } },
    "demokrasi-f2": { s: "kemer", kredi: "Julian Lupyan", lis: "CC0", elYok: true, agir: 700, basPx: 54, P: { zemin: "#0b0d14", zemin2: "#151a28", vurgu: "#e30a17", tarih: "#ff5a5f", yazi: "#fff", soluk: "rgba(255,255,255,.82)", cizgi: "#e30a17", cerceve: "#d9dde5", desen: 0.06 } },
    "demokrasi-f3": { s: "maske", kredi: "Huseyinakbas63", lis: "CC BY 4.0", soz: ["15", "TEMMUZ"], sozEn: ["15", "JULY"], elYok: true, tarihYok: true, agir: 700, basPx: 50,
      P: { zemin: "#07080d", vurgu: "#e30a17", yazi: "#fff", soluk: "rgba(255,255,255,.8)", cizgi: "#e30a17", cerceve: "#ffffff" } },
    "demokrasi-f4": { s: "pul", kredi: "Kurmanbek", lis: "CC BY 4.0", elYok: true, agir: 700, basPx: 50, odak: [0.42, 0.5],
      pul: ["15 TEMMUZ 2016", "DEMOKRASİ VE MİLLÎ BİRLİK GÜNÜ"], pulEn: ["15 JULY 2016", "DEMOCRACY AND NATIONAL UNITY DAY"],
      damga: ["ŞEHİTLERİMİZİ RAHMETLE ANIYORUZ ★ ", "15·7"], damgaEn: ["IN MEMORY OF OUR MARTYRS ★ ", "15·7"],
      P: { zemin: "#0b1426", zemin2: "#18264a", vurgu: "#d0101f", vurgu2: "#ff5a5f", tarih: "#ff6b70", damga: "#d0101f", yazi: "#fff", soluk: "rgba(255,255,255,.8)", cizgi: "#e30a17", cerceve: "#ffffff" } },
    "rbayram-f3": { s: "madalyon", kredi: "flowcomm", lis: "CC BY 2.0", kurdeleYazi: "RAMAZAN BAYRAMI", kurdeleEn: "EID AL-FITR",
      P: { zemin: "#062a2c", zemin2: "#0d4a4a", halka: "#05201f", vurgu: "#f2c46d", konfeti: "#ff9eb1", yazi: "#fff", soluk: "rgba(255,255,255,.82)", cerceve: "#e7c983", kurdele: "#c0182f", kurdeleKoyu: "#7d0b1f", desen: 0.13 } },
    "rbayram-f4": { s: "cini", kredi: "PikiWiki Israel", lis: KM,
      P: { zemin: "#fbf7ee", zemin2: "#f3ecdc", vurgu: "#c8352b", tarih: "#c8352b", el: "#1d4f9a", elGolgesiz: true, yazi: "#1d2a44", soluk: "#55607a", cizgi: "#c8352b", kunye: "rgba(29,42,68,.6)",
        cini: { zemin: "#fbf8f0", kobalt: "#1d4f9a", turkuaz: "#1f9e93", kirmizi: "#c8352b" } } },
    "anneler-f3": { s: "mektup", kredi: "Güldem Üstün", lis: "CC BY 2.0", yer: "Emirgan Korusu", yerEn: "Emirgan Park",
      mektup: ["Canım Annem,", "Anneler Günün kutlu olsun! Bana yolu sen gösterdin, her yolculukta kalbimdesin. İyi ki varsın.", "Sevgiyle"],
      mektupEn: ["Dear Mom,", "Happy Mother's Day! You showed me the way, and you are in my heart on every journey. I'm so glad you're my mom.", "With love"],
      P: { zemin: "#f7f0e4", vurgu: "#b8455a", tarih: "#b8455a", el: "#a63a50", yazi: "#3b2a26", soluk: "#7a625a", cizgi: "#7c93b8" } },
    "anneler-f4": { s: "oval", kredi: "Andy / Andrew Fogg", lis: "CC BY 2.0",
      P: { zemin: "#f4d9de", zemin2: "#fdf2f2", vurgu: "#c2416b", el: "#b0365c", elGolgesiz: true, tarih: "#b0365c", yazi: "#3a1d25", soluk: "#7a5961", cizgi: "#c2416b", cerceve: "#c99a72",
        kurdele: "#d0587e", kurdeleKoyu: "#9a2b52", yaprak: "#eba0b4", halka: "#fff8f4", lale1: "#f6b3c4", lale2: "#d4537a", sap: "#6b8f55" } }
  };
  for (const k of Object.keys(FK)) FK[k].foto = `kart/${k}.jpg`;
  const fotoTasarim = (g, W, H, o) => { const f = FK[o.kart]; SABLON[f.s](g, W, H, o, f); };
  for (const k of Object.keys(FK)) K[k] = fotoTasarim;

  return {
    ciz(ad, g, W, H, o, yard) { Y = yard; const f = K[ad]; if (!f) return false; g.textAlign = "center"; g.textBaseline = "middle"; f(g, W, H, o); return true; },
    var: (ad) => !!K[ad],
    adlar: () => Object.keys(K),
    // Fotoğraflı tasarım kartının fotoğrafı ve yazı tipleri (çizimden önce yüklenir)
    fotoYolu: (ad) => (FK[ad] ? FK[ad].foto : null),
    hazir: (ad) => (FK[ad] ? yaziTipleri() : Promise.resolve(true))
  };
})();
