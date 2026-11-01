# Secilen Commons dosyalarini yuksek cozunurlukte indirir
import json, os, sys, time, urllib.parse, urllib.request
UA = "RotaCepte/1.0 (mertturanlioglu.apps@gmail.com)"
CIKTI = sys.argv[1]; D = json.loads(sys.argv[2])  # {"ad.jpg": "File:..."}
os.makedirs(CIKTI, exist_ok=True)
def get(u):
    r = urllib.request.Request(u, headers={"User-Agent": UA})
    for i in range(4):
        try:
            with urllib.request.urlopen(r, timeout=90) as x: return x.read()
        except Exception as e: time.sleep(3 * (i + 1)); err = e
    raise err
for ad, baslik in D.items():
    q = {"action": "query", "format": "json", "titles": baslik, "prop": "imageinfo", "iiprop": "url|size", "iiurlwidth": "3200"}
    p = list(json.loads(get("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(q)))["query"]["pages"].values())[0]
    ii = p["imageinfo"][0]
    u = ii["url"] if ii["width"] <= 3200 else ii["thumburl"]
    open(os.path.join(CIKTI, ad), "wb").write(get(u)); print(ad, u)
