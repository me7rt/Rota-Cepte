import json, io, os, time, urllib.request, urllib.parse
from PIL import Image
UA = "RotaCepte/1.0 (https://github.com/me7rt/Rota-Cepte)"
L = json.load(open("rapor/flickr-liste.json", encoding="utf-8"))
os.makedirs("rapor/fl", exist_ok=True)
def get(u, js=False):
    for d in range(4):
        try:
            b = urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": UA}), timeout=40).read()
            return json.loads(b) if js else b
        except Exception as ex:
            print("hata", u[:90], ex); time.sleep(5 + 10 * d)
def kucult(b, fn):
    try:
        im = Image.open(io.BytesIO(b)).convert("RGB"); im.thumbnail((330, 330)); im.save(fn, quality=74); return True
    except Exception: return False
out = []; seen = set(); n = 0
for it in L["flickr"]:
    say = 0
    for q in it["q"]:
        if say >= 6: break
        u = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode({"q": q, "source": "flickr", "license": "by,by-sa", "page_size": 12})
        r = get(u, True); time.sleep(3.5)
        if not r: continue
        for x in r.get("results", []):
            if x["id"] in seen or say >= 10: continue
            seen.add(x["id"])
            b = get(x.get("thumbnail") or x["url"]) or get(x["url"])
            k = f"j{n:04d}"; n += 1
            if not b or not kucult(b, f"rapor/fl/{k}.jpg"): continue
            out.append({"k": k, "g": it["g"], "q": q, "t": x.get("title"), "url": x.get("url"), "sayfa": x.get("foreign_landing_url"),
                        "w": x.get("width"), "h": x.get("height"), "lic": f'CC {x.get("license","").upper()} {x.get("license_version","")}',
                        "yazar": x.get("creator"), "etiket": [t.get("name") for t in (x.get("tags") or [])][:12]})
            say += 1
    print(it["ad"], say)
for i, c in enumerate(L["commons"]):
    p = c["p"]; ad = p.split("/")[-1]
    b = get(f"https://upload.wikimedia.org/wikipedia/commons/thumb/{p}/330px-{ad}") or get(f"https://upload.wikimedia.org/wikipedia/commons/{p}")
    if b: kucult(b, f"rapor/fl/r{i:03d}.jpg")
    time.sleep(0.5)
json.dump(out, open("rapor/flickr.json", "w", encoding="utf-8"), ensure_ascii=False, indent=0)
print("bulundu", len(out))
