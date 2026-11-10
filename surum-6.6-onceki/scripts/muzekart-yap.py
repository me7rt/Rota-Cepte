# muze-ham dalındaki ham müze verisinden docs/data/muzekart.json üretir; bizim yerlerle konum + ada göre eşleştirir.
# Kullanım: python3 scripts/muzekart-yap.py <muzeler.json>
import json, sys, math, re, unicodedata
ham = json.load(open(sys.argv[1]))
idx = json.load(open("docs/data/index.json"))
def sade(s):
    s = unicodedata.normalize("NFKD", s.replace("ı", "i").replace("İ", "i").lower())
    return re.sub(r"[^a-z0-9 ]", " ", "".join(c for c in s if not unicodedata.combining(c)))
il_ad = {sade(i["ad"]).strip(): i["s"] for i in idx["iller"]}
def km(a, b, c, d):
    p = math.pi / 180; x = math.sin((c - a) * p / 2) ** 2 + math.cos(a * p) * math.cos(c * p) * math.sin((d - b) * p / 2) ** 2
    return 12742 * math.asin(math.sqrt(x))
BOS = {"muzesi", "muze", "oren", "orenyeri", "yeri", "antik", "kenti", "ve", "ile", "evi", "ani", "anit", "arkeoloji", "arkeolojik", "alani"}
def kelime(s): return {w for w in sade(s).split() if len(w) > 2 and w not in BOS}
ilyer = {}
def yerler(s):
    if s not in ilyer: ilyer[s] = json.load(open(f"docs/data/il/{s}.json"))["yerler"]
    return ilyer[s]
TR_EN = {"Pazartesi": "Monday", "Salı": "Tuesday", "Çarşamba": "Wednesday", "Perşembe": "Thursday", "Cuma": "Friday", "Cumartesi": "Saturday", "Pazar": "Sunday"}
cikti, eslesen, gorulen, ESL = {}, 0, set(), []
for m in ham["muzeler"]:
    s = il_ad.get(sade(m["il"]).strip())
    if not s: print("il yok", m["il"]); continue
    a = re.sub(r"\s+", " ", m["adTr"].replace("\xa0", " ")).strip()
    TRH = set("ıİşŞğĞçÇöÖüÜ")
    def duz(w):  # BÜYÜK HARFLİ kelimeyi düzelt; Türkçe harfi yoksa yabancı ad sayılır (I -> i)
        if len(w) < 3 or w != w.upper() or not any(c.isalpha() for c in w): return w
        t = set(w) & TRH
        return w[0] + (w[1:].replace("I", "ı").replace("İ", "i") if t else w[1:].replace("İ", "i")).lower()
    a = " ".join("ve" if w == "VE" else duz(w) for w in a.split())
    if (s, a) in gorulen: continue
    gorulen.add((s, a))
    l = m["u"].split("?", 1)[1]; i = re.search(r"SectionId=([A-Z0-9]+)", l).group(1)
    lat, lng = m["konum"]
    q, en_iyi = "", 9
    for y in yerler(s):
        if "lat" not in y: continue
        d = km(lat, lng, y["lat"], y["lng"])
        if d > 1.5: continue
        ort = any(x[:4] == z[:4] for x in kelime(a) for z in kelime(y["ad"]) if len(x) > 3 and len(z) > 3)
        if ort:
            if d < en_iyi: q, en_iyi = y["q"], d
    if q: eslesen += 1; ESL.append((a, next(y["ad"] for y in yerler(s) if y["q"] == q), round(en_iyi, 2)))
    o = {"i": i, "a": a, "e": (re.sub(r"\s+", " ", m["adEn"].replace("\xa0", " ")).strip().title()).replace(" Of ", " of ").replace(" And ", " and ").replace(" The ", " the ").replace("'S ", "'s "), "h": f"{m['ac'].replace(':', '.')}–{m['kp'].replace(':', '.')}", "l": l, "y": [lat, lng]}
    k = m["kapali"].strip()
    if k and k != "Her gün açık":
        o["d"] = k + (" kapalı" if not k.endswith("kapalı") else ""); o["de"] = "Closed " + ", ".join(TR_EN.get(g.strip(), g.strip()) for g in k.split(","))
    du = m["durum"].strip()
    if re.search(r"kapal", du, re.I): o["x"] = du[:160]
    if q: o["q"] = q
    cikti.setdefault(s, []).append(o)
for s in cikti: cikti[s].sort(key=lambda o: (0 if o.get("q") else 1, o["a"]))
n = sum(len(v) for v in cikti.values())
json.dump({"t": "Kasım 2026", "n": n, "il": cikti}, open("docs/data/muzekart.json", "w"), ensure_ascii=False, separators=(",", ":"))
print("yer", n, "il", len(cikti), "eşleşen", eslesen)
if len(sys.argv) > 2:
    for x in ESL: print(*x, sep=" | ")
