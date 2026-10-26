# Geçici: elle eklenen yerlerin konumunu ve fotoğrafını Wikidata, OSM ve Commons'tan doğrular.
import json, time, urllib.request, urllib.parse, os
UA = "RotaCepte/6.4 (me7rt.github.io/Rota-Cepte; mertturanlioglu.apps@gmail.com)"
def al(url, ham=False):
    for i in range(3):
        try:
            r = urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=40)
            b = r.read(); return b if ham else json.loads(b)
        except Exception as e:
            time.sleep(2 + i * 3); hata = str(e)
    return None if ham else {"hata": hata}
def wapi(host, **p):
    p.update(format="json"); return al(f"https://{host}/w/api.php?" + urllib.parse.urlencode(p))
YER = [
 ("kilis","Ravanda Kalesi",["Ravanda Castle","Ravendel","Ravanda Kilis","Ravanda kale"]),
 ("kilis","Kilis Mevlevihanesi",["Kilis Mevlevihane","Mevlevihane Camii Kilis","Kilis mosque"]),
 ("bingol","Kös Kaplıcaları",["Kös kaplıca","Ilıcalar Bingöl","Bingöl kaplıca","Bingöl hot spring"]),
 ("igdir","Aras Kuş Cenneti",["Aras Kuş Araştırma","Iğdır kuş","Çıyrıklı","Aras River Bird","Tuzluca bird"]),
 ("bayburt","Sırakayalar Şelalesi",["Sırakayalar Şelalesi","Sırakayalar","Bayburt şelale","Bayburt waterfall"]),
 ("erzincan","Ergan Dağı Kayak Merkezi",["Ergan Kayak","Ergan ski","Erzincan kayak","Ergan Dağı","Erzincan ski"]),
]
os.makedirs("out/foto", exist_ok=True)
sonuc = []
for s, ad, varyant in YER:
    k = {"s": s, "ad": ad, "wikidata": [], "osm": [], "commons": []}
    ids = []
    for v in varyant:
        j = wapi("www.wikidata.org", action="wbsearchentities", search=v, language="tr", uselang="tr", limit="7", type="item")
        for x in j.get("search", []):
            if x["id"] not in ids: ids.append(x["id"])
        time.sleep(0.3)
    ids = ids[:20]
    if ids:
        j = wapi("www.wikidata.org", action="wbgetentities", ids="|".join(ids), props="labels|descriptions|claims|sitelinks", languages="tr|en")
        for q, e in (j.get("entities") or {}).items():
            c = e.get("claims", {})
            def v1(p):
                try: return c[p][0]["mainsnak"]["datavalue"]["value"]
                except Exception: return None
            koor = v1("P625")
            k["wikidata"].append({"q": q, "tr": (e.get("labels", {}).get("tr") or {}).get("value"), "en": (e.get("labels", {}).get("en") or {}).get("value"),
                "acik": (e.get("descriptions", {}).get("tr") or e.get("descriptions", {}).get("en") or {}).get("value"),
                "koor": [koor["latitude"], koor["longitude"]] if koor else None, "P18": v1("P18"), "P373": v1("P373"),
                "P131": (v1("P131") or {}).get("id") if isinstance(v1("P131"), dict) else None,
                "trwiki": (e.get("sitelinks", {}).get("trwiki") or {}).get("title"), "enwiki": (e.get("sitelinks", {}).get("enwiki") or {}).get("title")})
    for v in varyant:
        time.sleep(1.2)
        j = al("https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({"format": "jsonv2", "addressdetails": "1", "limit": "6", "countrycodes": "tr", "accept-language": "tr", "q": v}))
        for x in (j if isinstance(j, list) else []):
            a = x.get("address", {})
            k["osm"].append({"v": v, "ad": x.get("name"), "tam": x.get("display_name"), "lat": x.get("lat"), "lon": x.get("lon"), "tur": f'{x.get("category")}/{x.get("type")}', "il": a.get("province") or a.get("state")})
    adlar = []
    for v in varyant:
        j = wapi("commons.wikimedia.org", action="query", list="search", srnamespace="6", srlimit="10", srsearch=v)
        for x in (j.get("query") or {}).get("search", []):
            t = x["title"]
            if t not in adlar: adlar.append(t)
        time.sleep(0.3)
    for w in k["wikidata"]:
        if w["P18"] and "File:" + w["P18"] not in adlar: adlar.insert(0, "File:" + w["P18"])
    adlar = adlar[:30]
    if adlar:
        j = wapi("commons.wikimedia.org", action="query", titles="|".join(adlar), prop="imageinfo", iiprop="url|size|extmetadata", iiurlwidth="360")
        for p in ((j.get("query") or {}).get("pages") or {}).values():
            ii = (p.get("imageinfo") or [{}])[0]; m = ii.get("extmetadata", {})
            g = lambda n: (m.get(n) or {}).get("value", "")[:160]
            k["commons"].append({"dosya": p["title"][5:], "w": ii.get("width"), "h": ii.get("height"), "lisans": g("LicenseShortName"), "yazar": g("Artist"), "tarih": g("DateTimeOriginal"), "acik": g("ImageDescription"), "koor": [g("GPSLatitude"), g("GPSLongitude")], "thumb": ii.get("thumburl")})
        for i, c in enumerate(k["commons"]):
            if c.get("thumb"):
                b = al(c["thumb"], ham=True)
                if b:
                    yol = f"foto/{s}-{ad[:12].replace(' ', '_')}-{i}.jpg"; open("out/" + yol, "wb").write(b); c["yerel"] = yol
                time.sleep(0.2)
    sonuc.append(k)
    print(ad, len(k["wikidata"]), len(k["osm"]), len(k["commons"]), flush=True)
json.dump(sonuc, open("out/elle-dogrula.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
