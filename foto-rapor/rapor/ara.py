import json, io, os, time, urllib.request, urllib.parse, re
from PIL import Image
UA = "RotaCepte/1.0 (https://github.com/me7rt/Rota-Cepte; foto raporu)"
Q = json.load(open("rapor/ara-liste.json", encoding="utf-8"))
os.makedirs("rapor/a", exist_ok=True)
def get(u):
    for d in range(5):
        try:
            return urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": UA}), timeout=40).read()
        except Exception as ex:
            print("hata", ex); time.sleep(4 + 6 * d)
def temiz(s): return re.sub(r"<[^>]+>", "", s or "").strip()
out = []; seen = set(); n = 0
for grup, sorgular in Q.items():
    for q in sorgular:
        u = "https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode({"action": "query", "format": "json", "generator": "search", "gsrnamespace": 6, "gsrlimit": 7, "gsrsearch": q + " filetype:bitmap", "prop": "imageinfo", "iiprop": "url|size|extmetadata", "iiurlwidth": 330})
        b = get(u)
        if not b: continue
        for p in (json.loads(b).get("query", {}).get("pages", {}) or {}).values():
            t = p["title"]
            if t in seen or "imageinfo" not in p: continue
            seen.add(t); ii = p["imageinfo"][0]; m = ii.get("extmetadata", {})
            k = f"i{n:04d}"; n += 1
            img = get(ii.get("thumburl") or ii["url"])
            if not img: continue
            try:
                im = Image.open(io.BytesIO(img)).convert("RGB"); im.thumbnail((330, 330)); im.save(f"rapor/a/{k}.jpg", quality=72)
            except Exception: continue
            out.append({"k": k, "g": grup, "q": q, "t": t, "url": ii["url"], "w": ii["width"], "h": ii["height"],
                        "lic": temiz(m.get("LicenseShortName", {}).get("value")), "yazar": temiz(m.get("Artist", {}).get("value"))[:120]})
            time.sleep(0.3)
json.dump(out, open("rapor/ara.json", "w", encoding="utf-8"), ensure_ascii=False, indent=0)
print("bulundu", len(out))
