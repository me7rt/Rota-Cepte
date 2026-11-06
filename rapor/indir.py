import json, io, os, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
UA = "RotaCepte/1.0 (https://github.com/me7rt/Rota-Cepte; foto raporu)"
L = json.load(open("rapor/liste.json", encoding="utf-8"))
os.makedirs("rapor/k", exist_ok=True)
def url(e, W=330):
    p = e["p"]; ad = p.split("/")[-1]
    if e["w"] <= W: return "https://upload.wikimedia.org/wikipedia/commons/" + p
    return f"https://upload.wikimedia.org/wikipedia/commons/thumb/{p}/{W}px-{ad}"
def al(e):
    for d in range(5):
        try:
            r = urllib.request.urlopen(urllib.request.Request(url(e), headers={"User-Agent": UA}), timeout=40)
            im = Image.open(io.BytesIO(r.read())).convert("RGB"); im.thumbnail((330, 330))
            im.save(f"rapor/k/{e['k']}.jpg", quality=70); return True
        except urllib.error.HTTPError as ex:
            time.sleep(min(30, 4 + 6 * d))
        except Exception:
            time.sleep(3 + 4 * d)
    return False
with ThreadPoolExecutor(3) as ex: ok = list(ex.map(al, L))
print("indirildi", sum(ok), "/", len(L))
EOF=None
