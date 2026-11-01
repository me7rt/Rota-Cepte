# docs/tr-harita.json nereden geliyor

"Gezi haritan" ve gezi karnesindeki il sınırları **Natural Earth** verisinden çizildi (v6.5, 1 Kasım 2026).

- İl sınırları: `ne_10m_admin_1_states_provinces` (Türkiye, 81 il, `iso_3166_2` = TR-plaka)
- Göller (Van, Tuz, Beyşehir, Eğirdir, Keban, Karakaya, Atatürk): `ne_10m_lakes`
- Kaynak: https://github.com/nvkelso/natural-earth-vector
- Lisans: **kamu malı (public domain)**. https://www.naturalearthdata.com/about/terms-of-use/
  "No permission is needed to use Natural Earth. Crediting the authors is unnecessary." Yine de lisanslar sayfasında kaynak gösteriyoruz.

Yeniden üretmek için (mapshaper 0.6, `npm i mapshaper`):

```
# Türkiye illerini ayır (adm0_a3 == "TUR") → tur.geojson; gölleri bbox 25.5,35.7,45,42.2 ile kes → gol.geojson
mapshaper tur.geojson -erase gol.geojson \
  -proj '+proj=lcc +lat_1=37 +lat_2=41 +lat_0=39 +lon_0=35 +datum=WGS84' \
  -simplify interval=1200 keep-shapes -o format=geojson precision=1 tur-p.geojson
python3 scripts/tr-harita-yap.py tur-p.geojson data/plaka.json docs/tr-harita.json
```

Çıktı: `{il-slug: "SVG path"}`, çerçeve 0 0 1020 456 (docs/app.js içindeki HARITA_KUTU ile aynı olmalı).
