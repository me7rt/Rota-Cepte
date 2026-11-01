# Rota Cepte · © 2026 Mert Turanlıoğlu
# Geçici: uygulamadaki fotoğrafların küçük hallerini indirip numaralı kontrol sayfaları (pafta) yapar.
# Çıktı: out/pafta-<grup>-NN.jpg ve out/liste.json (numara -> il, yer, dosya)
import json, os, glob, urllib.parse, urllib.request, time, concurrent.futures as cf
from PIL import Image, ImageDraw, ImageFont

COM = "https://upload.wikimedia.org/wikipedia/commons/"
UA = "RotaCepteFotoKontrol/1.0 (https://me7rt.github.io/Rota-Cepte/; mertturanlioglu.apps@gmail.com)"
os.makedirs("out/k", exist_ok=True)

idx = json.load(open("docs/data/index.json"))
kayit = []  # (grup, il, ad, f)
gor = set()
def ekle(grup, il, ad, f):
    if not f or not f.get("p"): return
    key = (grup, f["p"])
    if key in gor: return
    gor.add(key); kayit.append({"g": grup, "il": il, "ad": ad, "p": f["p"], "w": f.get("w", 0)})

ILLER = {i["s"]: json.load(open(f"docs/data/il/{i['s']}.json")) for i in idx["iller"]}
for i in idx["iller"]:
    ekle("kapak", i["ad"], f"{i['plaka']} {i['ad']}: {ILLER[i['s']].get('kapak', '')}", i.get("f"))
for i in idx["iller"]:
    d = ILLER[i["s"]]
    for y in d["yerler"]:
        if y.get("one"): ekle("one", i["ad"], y["ad"], y.get("f"))
for i in idx["iller"]:
    d = ILLER[i["s"]]
    for y in [y for y in d["yerler"] if not y.get("one")][:12]: ekle("ilk", i["ad"], y["ad"], y.get("f"))
for i in idx["iller"]:
    d = ILLER[i["s"]]
    for z in d["ilceler"]: ekle("ilce", i["ad"], "ilçe " + z["ad"], z.get("f"))
for i in idx["iller"]:
    d = ILLER[i["s"]]
    for y in [y for y in d["yerler"] if not y.get("one")][12:]: ekle("diger", i["ad"], y["ad"], y.get("f"))
for i in idx["iller"]:
    d = ILLER[i["s"]]
    for y in d["yerler"]:
        for g in y.get("g") or []: ekle("galeri", i["ad"], y["ad"] + " (galeri)", g)

def url(k):
    p = k["p"].split("?")[0]
    if k["w"] and k["w"] <= 250: return COM + p
    ad = p.split("/")[-1]
    u = f"{COM}thumb/{p}/250px-{ad}"
    if ad.lower().endswith((".svg", ".tif", ".tiff")): u += ".png" if ad.lower().endswith(".svg") else ".jpg"
    return u

def indir(n):
    k = kayit[n]; yol = f"out/k/{n}.img"
    for deneme in range(5):
        try:
            r = urllib.request.urlopen(urllib.request.Request(url(k), headers={"User-Agent": UA}), timeout=40)
            open(yol, "wb").write(r.read()); return n, True
        except urllib.error.HTTPError as e:
            if e.code in (429, 503): SAY["429"] = SAY.get("429", 0) + 1; time.sleep(min(20, float(e.headers.get("Retry-After") or 0) or 3 * (deneme + 1))); continue
            return n, False
        except Exception:
            time.sleep(2)
    return n, False

BASLA = time.time(); BUTCE = float(os.environ.get("BUTCE", "1500"))
SAY = {"ok": 0, "hata": 0, "429": 0}
def indir_butce(n):
    if time.time() - BASLA > BUTCE: return n, False
    r = indir(n); SAY["ok" if r[1] else "hata"] += 1
    t = SAY["ok"] + SAY["hata"]
    if t % 200 == 0: print("ilerleme", t, SAY, int(time.time() - BASLA), "sn", flush=True)
    return r

try: FONT = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 13); FB = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 15)
except Exception: FONT = FB = ImageFont.load_default()

CW, CH, IH, KOL, SAT = 200, 190, 150, 8, 6
for grup in ["kapak", "one", "ilk", "ilce", "diger", "galeri"]:
    nolar = [n for n, k in enumerate(kayit) if k["g"] == grup]
    with cf.ThreadPoolExecutor(4) as ex: sonuc = dict(ex.map(indir_butce, nolar))
    print(grup, "indirilen", sum(sonuc.values()), "/", len(nolar), "süre", int(time.time() - BASLA))
    if not any(sonuc.values()): break
    for s in range(0, len(nolar), KOL * SAT):
        parca = nolar[s:s + KOL * SAT]
        pf = Image.new("RGB", (CW * KOL, CH * ((len(parca) + KOL - 1) // KOL)), "white"); dr = ImageDraw.Draw(pf)
        for j, n in enumerate(parca):
            x, y = (j % KOL) * CW, (j // KOL) * CH
            try:
                im = Image.open(f"out/k/{n}.img").convert("RGB"); im.thumbnail((CW - 6, IH))
                pf.paste(im, (x + (CW - im.width) // 2, y + (IH - im.height) // 2))
            except Exception:
                dr.rectangle([x + 3, y + 3, x + CW - 3, y + IH - 3], fill="#fdd"); dr.text((x + 60, y + 60), "YOK", fill="red", font=FB)
            k = kayit[n]
            dr.text((x + 4, y + IH + 2), f"#{n}", fill="#c00", font=FB)
            dr.text((x + 4 + 9 * len(str(n)) + 14, y + IH + 3), k["il"][:14], fill="#555", font=FONT)
            dr.text((x + 4, y + IH + 20), k["ad"][:27], fill="black", font=FONT)
            dr.rectangle([x, y, x + CW - 1, y + CH - 1], outline="#ccc")
        pf.save(f"out/pafta-{grup}-{s // (KOL * SAT) + 1:02d}.jpg", quality=80)
json.dump(kayit, open("out/liste.json", "w"), ensure_ascii=False)
os.system("rm -rf out/k")
