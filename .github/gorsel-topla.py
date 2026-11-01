# Kisa video icin Wikimedia Commons'tan lisansi uygun gorsel adaylari toplar.
# Sadece CC0, kamu malı ve CC BY (SA olmayan) dosyalar alinir.
import json, os, re, sys, time, urllib.parse, urllib.request

UA = "RotaCepte/1.0 (mertturanlioglu.apps@gmail.com)"
API = "https://commons.wikimedia.org/w/api.php"
CIKTI = sys.argv[1]
SORGULAR = json.loads(sys.argv[2])  # {"anahtar": ["arama", "bitmap|video", adet]}
os.makedirs(CIKTI, exist_ok=True)

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for i in range(4):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except Exception as e:
            time.sleep(2 * (i + 1)); err = e
    raise err

def temiz(s):
    return re.sub(r"<[^>]+>", "", s or "").strip()

def uygun(lis):
    l = lis.lower()
    if "nc" in l or "nd" in l or "sa" in l or "gfdl" in l:
        return False
    return l.startswith("cc0") or "public domain" in l or l == "pd" or l.startswith("cc by")

meta = {}
for anahtar, (arama, tur, adet) in SORGULAR.items():
    q = {"action": "query", "format": "json", "generator": "search",
         "gsrsearch": f"{arama} filetype:{tur}", "gsrnamespace": "6", "gsrlimit": "50",
         "prop": "imageinfo", "iiprop": "url|size|extmetadata|mime", "iiurlwidth": "1600"}
    d = json.loads(get(API + "?" + urllib.parse.urlencode(q)))
    sayfalar = sorted(d.get("query", {}).get("pages", {}).values(), key=lambda p: p.get("index", 0))
    n = 0
    for p in sayfalar:
        ii = (p.get("imageinfo") or [{}])[0]
        em = ii.get("extmetadata", {})
        lis = temiz(em.get("LicenseShortName", {}).get("value"))
        if not uygun(lis):
            continue
        if tur == "bitmap" and (ii.get("width", 0) < 1800 or ii.get("height", 0) < 1000):
            continue
        if tur == "video" and ii.get("size", 0) > 80_000_000:
            continue
        url = ii.get("thumburl") if tur == "bitmap" else ii.get("url")
        uzanti = "jpg" if tur == "bitmap" else url.rsplit(".", 1)[-1]
        ad = f"{anahtar}-{n+1:02d}.{uzanti}"
        try:
            open(os.path.join(CIKTI, ad), "wb").write(get(url))
        except Exception as e:
            print("atlandi", url, e); continue
        meta[ad] = {"dosya": p["title"], "lisans": lis,
                    "yazar": temiz(em.get("Artist", {}).get("value"))[:120],
                    "sayfa": ii.get("descriptionurl"), "boyut": [ii.get("width"), ii.get("height")]}
        n += 1
        if n >= adet:
            break
    print(anahtar, n)
json.dump(meta, open(os.path.join(CIKTI, "lisanslar.json"), "w"), ensure_ascii=False, indent=1)
