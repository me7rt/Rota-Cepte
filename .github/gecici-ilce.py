"""Geçici 2: sınır dışında kalan ilçe merkezleri için Nominatim'den ilçe merkezi (kasaba) koordinatı bulur, resmî sınırla doğrular."""
import json, os, time, urllib.request, urllib.parse, unicodedata

UA = {"User-Agent": "RotaCepte-veri/1.0 (+https://github.com/me7rt/Rota-Cepte)"}
def al(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120) as r:
        return json.loads(r.read())

def sade(s):
    s = (s or "").replace("İ", "i").replace("I", "ı").lower()
    s = s.translate(str.maketrans("çğıöşüâîû", "cgiosuaiu"))
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    for k in [" ilcesi", " district", " merkez", "merkez", " belediyesi"]:
        s = s.replace(k, "")
    return "".join(ch for ch in s if ch.isalnum())

def icinde(x, y, ring):
    ic = False; n = len(ring); j = n - 1
    for i in range(n):
        xi, yi = ring[i][0], ring[i][1]; xj, yj = ring[j][0], ring[j][1]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            ic = not ic
        j = i
    return ic

def katman(seviye):
    g = al(al(f"https://www.geoboundaries.org/api/current/gbOpen/TUR/{seviye}/")["gjDownloadURL"])
    r = []
    for f in g["features"]:
        geo = f["geometry"]; polys = [geo["coordinates"]] if geo["type"] == "Polygon" else geo["coordinates"]
        r.append((f["properties"]["shapeName"], polys))
    return r

def bul(k, lng, lat):
    for ad, polys in k:
        for poly in polys:
            if icinde(lng, lat, poly[0]) and not any(icinde(lng, lat, h) for h in poly[1:]):
                return ad
    return None

ADM2 = katman("ADM2")
LISTE = [("Ardahan", "Posof"), ("Balıkesir", "Altıeylül"), ("Çanakkale", "Çanakkale"), ("Çorum", "Çorum"), ("Çorum", "Dodurga"),
         ("Çorum", "Ortaköy"), ("Diyarbakır", "Bağlar"), ("Diyarbakır", "Yenişehir"), ("Hatay", "Defne"), ("Iğdır", "Karakoyunlu"),
         ("Isparta", "Yenişarbademli"), ("Kahramanmaraş", "Dulkadiroğlu"), ("Rize", "Çayeli"), ("Rize", "Fındıklı"), ("Rize", "Güneysu"),
         ("Rize", "Rize"), ("Şanlıurfa", "Karaköprü"), ("Sivas", "Ulaş"), ("Tekirdağ", "Ergene"), ("Tokat", "Tokat"), ("Yozgat", "Yozgat"),
         ("Zonguldak", "Zonguldak"), ("Antalya", "Alanya"), ("Bursa", "Gemlik")]
os.makedirs("out", exist_ok=True)
sonuc = []
for il, ilce in LISTE:
    aday = []
    for q in ([f"{ilce}, {il}, Türkiye"] if ilce != il else [f"{il}, Türkiye"]):
        try:
            for r in al("https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=tr&countrycodes=tr&q=" + urllib.parse.quote(q)):
                lat, lng = float(r["lat"]), float(r["lon"])
                aday.append({"ad": r.get("display_name"), "tur": r.get("category", "") + "/" + r.get("type", ""), "rank": r.get("place_rank"), "lat": lat, "lng": lng, "adm2": bul(ADM2, lng, lat)})
        except Exception as e:
            aday.append({"hata": str(e)})
        time.sleep(1.2)
    sonuc.append({"il": il, "ilce": ilce, "aday": aday})
    print(il, ilce, [(a.get("tur"), a.get("adm2"), round(a.get("lat", 0), 4), round(a.get("lng", 0), 4)) for a in aday][:4])
json.dump(sonuc, open("out/ilce-merkez.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
