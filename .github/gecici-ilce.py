"""Geçici 3: kalan yerler için OSM ilçe (zoom 8 ve 12) ve en yakın resmî ilçe sınırı."""
import json, os, time, math, urllib.request

UA = {"User-Agent": "RotaCepte-veri/1.0 (+https://github.com/me7rt/Rota-Cepte)"}
def al(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120) as r:
        return json.loads(r.read())

def icinde(x, y, ring):
    ic = False; n = len(ring); j = n - 1
    for i in range(n):
        xi, yi = ring[i][0], ring[i][1]; xj, yj = ring[j][0], ring[j][1]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            ic = not ic
        j = i
    return ic

g = al(al("https://www.geoboundaries.org/api/current/gbOpen/TUR/ADM2/")["gjDownloadURL"])
ADM2 = []
for f in g["features"]:
    geo = f["geometry"]; polys = [geo["coordinates"]] if geo["type"] == "Polygon" else geo["coordinates"]
    ADM2.append((f["properties"]["shapeName"], polys))

def yakinlar(lng, lat):
    # Her ilçe sınırına en yakın köşe uzaklığı (km); içindeyse 0
    r = []
    k = math.cos(math.radians(lat))
    for ad, polys in ADM2:
        en = 1e9
        for poly in polys:
            if icinde(lng, lat, poly[0]) and not any(icinde(lng, lat, h) for h in poly[1:]):
                en = 0; break
            for x, y in poly[0][::2]:
                d = math.hypot((x - lng) * k, y - lat) * 111.2
                if d < en: en = d
        r.append((round(en, 2), ad))
    r.sort()
    return r[:3]

kalan = json.load(open(".github/gecici-kalan.json", encoding="utf-8"))
for r in kalan:
    r["gb_yakin"] = yakinlar(r["lng"], r["lat"])
    for z in (8, 12):
        try:
            n = al(f"https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=1&zoom={z}&accept-language=tr&lat={r['lat']}&lon={r['lng']}")
            r[f"osm{z}"] = n.get("address", {}); r[f"osm{z}_ad"] = n.get("display_name")
        except Exception as e:
            r[f"osm{z}_hata"] = str(e)
        time.sleep(1.2)
    print(r["il"], r["ad"], r["atanan"], r["gb_yakin"][:2], (r.get("osm8") or {}).get("county"), (r.get("osm12") or {}).get("county") or (r.get("osm12") or {}).get("town"))
os.makedirs("out", exist_ok=True)
json.dump(kalan, open("out/ilce-kalan.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
