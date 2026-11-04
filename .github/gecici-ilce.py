"""Geçici: her yerin ilçesini resmî sınırlarla (geoBoundaries TUR ADM1/ADM2) ve şüphelilerde Nominatim ile karşılaştırır."""
import json, glob, os, time, urllib.request, unicodedata

UA = {"User-Agent": "RotaCepte-veri/1.0 (+https://github.com/me7rt/Rota-Cepte)"}
def al(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120) as r:
        return json.loads(r.read())

def sade(s):
    s = (s or "").replace("İ", "i").replace("I", "ı").lower()
    s = s.translate(str.maketrans("çğıöşüâîû", "cgiosuaiu"))
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    for k in [" ilcesi", " district", " merkez", "merkez"]:
        s = s.replace(k, "")
    return "".join(ch for ch in s if ch.isalnum())

def halkalar(geom):
    t, c = geom["type"], geom["coordinates"]
    return [c] if t == "Polygon" else c  # list of polygons, each = [outer, holes...]

def kutu(polys):
    xs = [p[0] for poly in polys for p in poly[0]]; ys = [p[1] for poly in polys for p in poly[0]]
    return min(xs), min(ys), max(xs), max(ys)

def icinde(x, y, ring):
    ic = False; n = len(ring); j = n - 1
    for i in range(n):
        xi, yi = ring[i][0], ring[i][1]; xj, yj = ring[j][0], ring[j][1]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            ic = not ic
        j = i
    return ic

def bul(katman, lng, lat):
    for ad, polys, (a, b, c, d) in katman:
        if a <= lng <= c and b <= lat <= d:
            for poly in polys:
                if icinde(lng, lat, poly[0]) and not any(icinde(lng, lat, h) for h in poly[1:]):
                    return ad
    return None

def katman(seviye):
    meta = al(f"https://www.geoboundaries.org/api/current/gbOpen/TUR/{seviye}/")
    print(seviye, meta.get("boundaryYearRepresented"), meta.get("boundarySource"), meta.get("boundaryLicense"))
    g = al(meta["gjDownloadURL"])
    r = []
    for f in g["features"]:
        polys = halkalar(f["geometry"])
        r.append((f["properties"]["shapeName"], polys, kutu(polys)))
    return r

ADM1, ADM2 = katman("ADM1"), katman("ADM2")
print("ADM2 ornek:", sorted(a for a, _, _ in ADM2)[:40])
os.makedirs("out", exist_ok=True)
sonuc, merkez = [], []
for f in sorted(glob.glob("docs/data/il/*.json")):
    d = json.load(open(f, encoding="utf-8")); Z = d["ilceler"]
    for z in Z:
        a2 = bul(ADM2, z["lng"], z["lat"])
        if sade(a2) != sade(z["ad"]):
            merkez.append({"il": d["ad"], "ilce": z["ad"], "q": z.get("q"), "lat": z["lat"], "lng": z["lng"], "adm1": bul(ADM1, z["lng"], z["lat"]), "adm2": a2, "n": z.get("n")})
    for y in d["yerler"]:
        if y.get("lat") is None:
            continue
        atanan = Z[y["i"]]["ad"] if y.get("i", -1) >= 0 else ""
        a1, a2 = bul(ADM1, y["lng"], y["lat"]), bul(ADM2, y["lng"], y["lat"])
        if sade(a2) != sade(atanan) or sade(a1) != sade(d["ad"]):
            sonuc.append({"il": d["ad"], "s": d["s"], "ad": y["ad"], "q": y["q"], "lat": y["lat"], "lng": y["lng"], "atanan": atanan, "adm1": a1, "adm2": a2, "ilce_var": any(sade(z["ad"]) == sade(a2) for z in Z)})
print("uyusmayan yer", len(sonuc), "uyusmayan ilce merkezi", len(merkez))
# İkinci kaynak: uyuşmayanlarda Nominatim (saniyede en fazla 1 istek)
for r in sonuc + merkez:
    try:
        n = al(f"https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&accept-language=tr&lat={r['lat']}&lon={r['lng']}")
        a = n.get("address", {})
        r["osm_ilce"] = a.get("town") or a.get("county") or a.get("city_district") or a.get("district")
        r["osm_il"] = a.get("province") or a.get("state")
        r["osm_adres"] = n.get("display_name")
    except Exception as e:
        r["osm_hata"] = str(e)
    time.sleep(1.2)
json.dump({"yerler": sonuc, "merkezler": merkez}, open("out/ilce-kontrol.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
