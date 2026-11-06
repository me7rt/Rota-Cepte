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

  // ---------- lale, desen ----------
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

  // ===== ortak parçalar 2 =====
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

  // ===== Fotoğraflı tasarım kartları (kandiller, bayramlar, yılbaşı, anneler ve babalar günü, 15 Temmuz) =====
  // Serbest lisanslı fotoğraf + renk ayarı + çerçeve, süsleme ve yazı. Fotoğraflar önceden kırpılmıştır (kart/<ad>.jpg)
  // Dik yazıda rakamlar "RC Rakam"dan gelir: Playfair'in düz hizalı (lining) rakamları, 5 ve 3 satırın altına sarkmaz
  const SERIF = (w, px, it) => `${it ? "italic " : ""}${w} ${px}px ${it ? "" : '"RC Rakam", '}"Playfair Display", Georgia, "Times New Roman", serif`;
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
        ["RC Rakam", "rc-rakam-wght", { weight: "400 900", unicodeRange: "U+0030-0039" }],
        ["Great Vibes", "great-vibes-latin-400-normal", { unicodeRange: LAT }], ["Great Vibes", "great-vibes-latin-ext-400-normal", { unicodeRange: EXT }]]) {
        const f = new FontFace(ad, `url(${yol}${dosya}.woff2) format("woff2")`, o); document.fonts.add(f); yt.push(f.load().catch(() => null));
      }
    } catch (e) {}
    yaziSoz = Promise.race([Promise.all(yt), new Promise((ok) => setTimeout(ok, 4000))]).then(() => true);
    return yaziSoz;
  }
  const hexA = (h, a) => {
    if (h.length === 4) h = "#" + h[1] + h[1] + h[2] + h[2] + h[3] + h[3]; // "#fff" gibi kısa yazım
    return `rgba(${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)},${a})`;
  };
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
      yilbasi: ["Mutlu Yıllar", "Happy New Year"], anneler: ["Tüm Annelere", "To All Mothers"], babalar: ["Tüm Babalara", "To All Fathers"] }[ad] || ["", ""])[e ? 1 : 0];
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
    // üstte ince altın direğe bağlı, dalgalanan bayrak
    const bw = 126, bx = W / 2 - bw / 2 + 4, by = 52;
    direk(g, bx - 2, by - 4, by + 112, 5, "#d9c38f");
    bayrak(g, bx, by, bw, { A: 6, k: 1.5, faz: 0.6, golge: "rgba(0,0,0,.55)" });
    const mc = yeni(W, H), m = mc.getContext("2d"); m.textAlign = "center"; m.textBaseline = "alphabetic";
    const satir = []; let y = 178;
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
    g.save(); g.beginPath(); g.rect(x0, y0, x1 - x0, y1 - y0); g.clip();
    if (o.foto) kapla(g, o.foto, x0, y0, x1 - x0, y1 - y0, f.odak); else { g.fillStyle = dz(g, 0, y0, 0, y1, [[0, R.turkuaz], [1, R.kobalt]]); g.fillRect(x0, y0, x1 - x0, y1 - y0); }
    g.restore();
    g.strokeStyle = "rgba(255,255,255,.85)"; g.lineWidth = 2; g.strokeRect(x0 + 8, y0 + 8, x1 - x0 - 16, y1 - y0 - 16);
    g.fillStyle = R.kirmizi; for (const [x, y] of [[x0 - 10, y0 - 10], [x1 + 10, y0 - 10], [x0 - 10, y1 + 10], [x1 + 10, y1 + 10]]) { yildiz8(g, x, y, 16, 0.5); g.fill(); }
    kunye(g, f, x1 + 10, y1 + 34, P.kunye || "rgba(29,42,68,.6)", false, "right");
    fotoYazi(g, W, o, f, y1 + 50, 1064);
    Y.imza(g, W, 1116, o.ikon, P.yazi, P.vurgu, P.soluk);
  }
  // ---------- 4. tur yardımcıları ----------
  // Yırtık kağıt kenarı: y0 çevresinde dişli bir çizgi, altı kapalı
  function yirtikYol(g, W, H, y0, gen, tohum) {
    const r = rastgele(tohum); g.beginPath(); g.moveTo(-10, H + 10); g.lineTo(-10, y0);
    let x = -10; while (x < W + 10) { x += 5 + r() * 9; g.lineTo(x, y0 + Math.sin(x / 150 + tohum) * gen * 0.8 + (r() - 0.5) * gen); }
    g.lineTo(W + 10, H + 10); g.closePath();
  }
  // El çizimi kalp
  function kalp(g, x, y, s) {
    g.beginPath(); g.moveTo(x, y + s * 0.38);
    g.bezierCurveTo(x - s * 0.12, y + s * 0.12, x - s * 0.62, y + s * 0.04, x - s * 0.5, y - s * 0.3);
    g.bezierCurveTo(x - s * 0.4, y - s * 0.62, x - s * 0.03, y - s * 0.54, x, y - s * 0.2);
    g.bezierCurveTo(x + s * 0.04, y - s * 0.56, x + s * 0.44, y - s * 0.62, x + s * 0.53, y - s * 0.28);
    g.bezierCurveTo(x + s * 0.62, y + s * 0.04, x + s * 0.1, y + s * 0.14, x + s * 0.02, y + s * 0.4);
  }
  // İki dairenin birleşimi (dürbün görüntüsü), merkezler (c1, cy) ve (c2, cy)
  function durbunYol(g, c1, c2, cy, R) {
    const t = Math.acos((c2 - c1) / 2 / R);
    g.beginPath(); g.arc(c1, cy, R, -t, t, true); g.arc(c2, cy, R, Math.PI - t, Math.PI + t, true); g.closePath();
  }

  // Şablon 8, yırtık kağıt: fotoğrafın altı yırtılmış kağıtla kapanır, araya renkli bir şerit girer, el çizimi kalpler
  function yirtikSablon(g, W, H, o, f) {
    const P = f.P, r = rastgele(17), yk = f.yirtik || 760;
    g.fillStyle = P.kagit; g.fillRect(0, 0, W, H);
    if (o.foto) kapla(g, o.foto, 0, 0, W, yk + 60, f.odak); else { g.fillStyle = P.vurgu; g.fillRect(0, 0, W, yk + 60); }
    g.fillStyle = dz(g, 0, 0, 0, 220, [[0, "rgba(0,0,0,.25)"], [1, "rgba(0,0,0,0)"]]); g.fillRect(0, 0, W, 220);
    g.save(); g.shadowColor = "rgba(0,0,0,.3)"; g.shadowBlur = 16; g.shadowOffsetY = -4; yirtikYol(g, W, H, yk - 40, 26, 3); g.fillStyle = P.serit; g.fill(); g.restore();
    g.save(); g.shadowColor = "rgba(0,0,0,.32)"; g.shadowBlur = 22; g.shadowOffsetY = -6; yirtikYol(g, W, H, yk, 20, 7); g.fillStyle = P.kagit; g.fill(); g.restore();
    g.save(); yirtikYol(g, W, H, yk + 2, 20, 7); g.strokeStyle = "rgba(255,255,255,.95)"; g.lineWidth = 5; g.stroke(); g.restore();
    g.save(); yirtikYol(g, W, H, yk, 20, 7); g.clip();
    for (let i = 0; i < 2000; i++) { g.fillStyle = r() < 0.5 ? "rgba(120,80,60,.035)" : "rgba(255,255,255,.45)"; g.fillRect(r() * W, yk - 30 + r() * (H - yk + 30), 1 + r() * 2, 1 + r() * 2); }
    g.restore();
    fotoYazi(g, W, o, f, yk + 44, 1112);
    g.save(); g.strokeStyle = P.vurgu; g.lineWidth = 4; g.lineCap = "round"; g.lineJoin = "round";
    kalp(g, W - 160, yk + 120, 56); g.stroke(); g.globalAlpha = 0.55; kalp(g, W - 112, yk + 176, 30); g.stroke(); g.restore();
    altImza(g, W, o, P.yazi, P.vurgu, P.soluk);
    kunye(g, f, W - 36, yk / 2, "rgba(255,255,255,.75)", true);
  }
  // Şablon 10, dürbün: koyu zemin, fotoğraf dürbünle bakılıyormuş gibi iki yuvarlak merceğin içinde
  function durbunSablon(g, W, H, o, f) {
    const P = f.P, cy = 430, R = 262, dx = 214, c1 = W / 2 - dx, c2 = W / 2 + dx;
    zemin(g, W, H, [[0, P.zemin2 || P.zemin], [1, P.zemin]]);
    isik(g, W / 2, cy, 760, hexA(P.vurgu, 0.14));
    yildizlar(g, W, 0, 760, 60, 812, (x, y) => Math.abs(y - cy) < R + 60);
    // gövde
    g.save(); g.shadowColor = "rgba(0,0,0,.6)"; g.shadowBlur = 44; g.shadowOffsetY = 14; durbunYol(g, c1, c2, cy, R + 26); g.fillStyle = P.govde || "#16191c"; g.fill(); g.restore();
    durbunYol(g, c1, c2, cy, R + 26); g.strokeStyle = hexA("#ffffff", 0.16); g.lineWidth = 2; g.stroke();
    durbunYol(g, c1, c2, cy, R + 10); g.strokeStyle = dz(g, c1 - R, cy - R, c2 + R, cy + R, [[0, hexA(P.vurgu, 0.9)], [0.5, hexA(P.vurgu, 0.35)], [1, hexA(P.vurgu, 0.9)]]); g.lineWidth = 4; g.stroke();
    g.save(); durbunYol(g, c1, c2, cy, R); g.clip();
    if (o.foto) kapla(g, o.foto, c1 - R, cy - R, c2 - c1 + 2 * R, 2 * R, f.odak); else { g.fillStyle = dz(g, 0, cy - R, 0, cy + R, [[0, "#7fb2d9"], [1, "#2f5d3a"]]); g.fillRect(0, 0, W, H); }
    // merceğin iç kenarı kararır
    durbunYol(g, c1, c2, cy, R + 40); g.shadowColor = "rgba(0,0,0,.85)"; g.shadowBlur = 70; g.lineWidth = 80; g.strokeStyle = "#000"; g.stroke(); g.shadowColor = "transparent";
    // mercek yansıması
    g.globalCompositeOperation = "screen";
    for (const c of [c1, c2]) { g.fillStyle = rz(g, c - R * 0.38, cy - R * 0.48, 0, R * 0.55, [[0, "rgba(255,255,255,.2)"], [1, "rgba(255,255,255,0)"]]); g.fillRect(c - R, cy - R, 2 * R, 2 * R); }
    g.restore();
    kunye(g, f, W / 2, cy + R + 52, hexA(P.yazi, 0.62));
    fotoYazi(g, W, o, f, cy + R + 92, 1112);
    altImza(g, W, o, P.yazi, P.vurgu, P.soluk);
  }
  // Şablon 12, yıldız pencere: yıldızlı gece, fotoğraf altın çerçeveli büyük sekiz köşeli yıldızın içinde
  function yildizSablon(g, W, H, o, f) {
    const P = f.P, cx = W / 2, cy = 420, R = 330;
    zemin(g, W, H, [[0, P.zemin2], [0.6, P.zemin], [1, P.zemin]]);
    yildizlar(g, W, 0, H, 240, 4401, (x, y) => Math.hypot(x - cx, y - cy) < R + 50);
    isik(g, cx, cy, 640, hexA(P.vurgu, 0.2));
    g.save(); g.shadowColor = hexA(P.vurgu, 0.6); g.shadowBlur = 60; yildiz8(g, cx, cy, R + 22, 0.765); g.fillStyle = dz(g, cx - R, cy - R, cx + R, cy + R, ALTIN); g.fill(); g.restore();
    yildiz8(g, cx, cy, R + 8, 0.765); g.fillStyle = P.halka || "#0b1030"; g.fill();
    g.save(); yildiz8(g, cx, cy, R - 4, 0.765); g.clip();
    if (o.foto) kapla(g, o.foto, cx - R, cy - R, 2 * R, 2 * R, f.odak); else { g.fillStyle = dz(g, 0, cy - R, 0, cy + R, [[0, P.zemin2], [1, P.vurgu]]); g.fillRect(cx - R, cy - R, 2 * R, 2 * R); }
    g.fillStyle = rz(g, cx, cy, R * 0.6, R, [[0, "rgba(0,0,0,0)"], [1, "rgba(0,0,0,.35)"]]); g.fillRect(cx - R, cy - R, 2 * R, 2 * R);
    g.restore();
    yildiz8(g, cx, cy, R - 14, 0.765); g.strokeStyle = hexA("#f7e7b0", 0.7); g.lineWidth = 2; g.stroke();
    g.fillStyle = dz(g, 0, 0, W, 0, ALTIN); for (const [x, y, s] of [[150, 170, 16], [930, 120, 12], [120, 760, 10], [960, 700, 14]]) { yildiz8(g, x, y, s, 0.45); g.fill(); }
    Y.hilal(g, W - 150, 250, 34);
    kunye(g, f, W / 2, cy + R + 50, "rgba(255,255,255,.5)");
    fotoYazi(g, W, o, f, cy + R + 66, 1112);
    altImza(g, W, o, P.yazi, P.vurgu, P.soluk);
  }
  const SABLON = { tam: tamSablon, kemer: kemerSablon, kolaj: kolajSablon, maske: maskeSablon, madalyon: madalyonSablon, cini: ciniSablon,
    yirtik: yirtikSablon, durbun: durbunSablon, yildiz: yildizSablon };
  // Kar taneleri ve konfeti
  const kar = (g, W, H) => { const r = rastgele(77); g.save(); g.fillStyle = "rgba(255,255,255,.85)"; for (let i = 0; i < 160; i++) { const y = r() * 760, s = 1 + r() * 3.6; g.globalAlpha = 0.35 + r() * 0.6; g.beginPath(); g.arc(r() * W, y, s, 0, PI2); g.fill(); } g.restore(); };
  const kandilIsik = (g, W, H) => { bokeh(g, 0, 30, W, 560, 14, ["#ffcf7a", "#ffe6b0"], 1210, 8, 30); };
  // Her seçenek: şablon, fotoğraf dosyası, fotoğraf sahibi ve lisansı, renkler
  const KM = ["Kamu malı", "Public domain"];
  const GECE = { zemin: "#0a1230", zemin2: "#16224d", vurgu: "#f0c67a", yazi: "#ffffff", soluk: "rgba(255,255,255,.8)", cerceve: "#e7c983" };
  const FK = {
    "kandil-f2": { s: "kemer", kredi: "Jorge Franganillo", lis: "CC BY 4.0", P: { ...GECE, desen: 0.12 }, alem: "hilal" },
    "ramazan-f1": { s: "tam", fotoH: 820, kredi: "Cem Topçu", lis: "CC BY 2.5", P: { ...GECE, zemin: "#0c0a14" }, efekt: kandilIsik },
    "yilbasi-f2": { s: "kolaj", kredi: "Alexkom000, CC BY 4.0 · Kadı, CC BY 4.0 · Roc0ast3r, CC0", lis: ["düzenlendi", "edited"], soz: ["Yeni yollar", "Yeni şehirler", "Yeni anılar"], sozEn: ["New roads", "New cities", "New memories"],
      P: { zemin: "#0a1230", zemin2: "#1c2a5c", vurgu: "#f6d58e", yazi: "#fff", soluk: "rgba(255,255,255,.82)", cerceve: "#e7c983" }, elPx: 104, efekt0: (g, W, H) => { bokeh(g, 0, 0, W, 800, 22, ["#7fa8ff", "#ffd98a", "#c9b6ff"], 31, 14, 60); kar(g, W, H); } },
    "demokrasi-f3": { s: "maske", kredi: "Huseyinakbas63", lis: "CC BY 4.0", soz: ["15", "TEMMUZ"], sozEn: ["15", "JULY"], elYok: true, tarihYok: true, agir: 700, basPx: 50,
      P: { zemin: "#07080d", vurgu: "#e30a17", yazi: "#fff", soluk: "rgba(255,255,255,.8)", cizgi: "#e30a17", cerceve: "#ffffff" } },
    "rbayram-f3": { s: "madalyon", kredi: "flowcomm", lis: "CC BY 2.0", kurdeleYazi: "RAMAZAN BAYRAMI", kurdeleEn: "EID AL-FITR",
      P: { zemin: "#062a2c", zemin2: "#0d4a4a", halka: "#05201f", vurgu: "#f2c46d", konfeti: "#ff9eb1", yazi: "#fff", soluk: "rgba(255,255,255,.82)", cerceve: "#e7c983", kurdele: "#c0182f", kurdeleKoyu: "#7d0b1f", desen: 0.13 } },
    "anneler-f6": { s: "yirtik", kredi: "Bonnie Kittle", lis: "CC0",
      P: { kagit: "#fbf4ee", serit: "#eaa2b0", vurgu: "#c2416b", el: "#b0365c", elGolgesiz: true, tarih: "#b0365c", yazi: "#3a1d25", soluk: "#7a5961", cizgi: "#c2416b" } },
    "babalar-f4": { s: "durbun", kredi: "Alexey Komarov", lis: "CC BY 3.0",
      P: { zemin: "#0c1411", zemin2: "#1b2a23", vurgu: "#e0b15a", tarih: "#e0b15a", yazi: "#fff", soluk: "rgba(255,255,255,.8)", govde: "#14181b" } },
    "kadir-f4": { s: "yildiz", kredi: "Gruen", lis: KM,
      P: { zemin: "#070b1f", zemin2: "#141c45", vurgu: "#f0c67a", halka: "#0b1030", yazi: "#fff", soluk: "rgba(255,255,255,.8)" } },
    "kurban-f4": { s: "cini", kredi: "Oumaima Loudini", lis: "CC BY 4.0",
      P: { zemin: "#fbf7ee", zemin2: "#f3ecdc", vurgu: "#1d4f9a", tarih: "#c8352b", el: "#1d4f9a", elGolgesiz: true, yazi: "#1d2a44", soluk: "#55607a", cizgi: "#c8352b", kunye: "rgba(29,42,68,.6)",
        cini: { zemin: "#fbf8f0", kobalt: "#1d4f9a", turkuaz: "#1f9e93", kirmizi: "#c8352b" } } }
  };
  for (const k of Object.keys(FK)) FK[k].foto = `kart/${k}.jpg`;
  // Fotoğraf yüklenemezse (çevrimdışı) fotoğraf kredisi de yazılmaz
  const fotoTasarim = (g, W, H, o) => { const f = FK[o.kart]; SABLON[f.s](g, W, H, o, o.foto ? f : { ...f, kredi: "" }); };
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
