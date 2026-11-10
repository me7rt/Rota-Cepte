import json, sys
src, plaka_f, out = sys.argv[1], sys.argv[2], sys.argv[3]
d = json.load(open(src))
pl = {v: k for k, v in json.load(open(plaka_f)).items()}  # "16" -> "bursa"
xs, ys = [], []
def rings(g):
    if g["type"] == "Polygon": return g["coordinates"]
    return [r for p in g["coordinates"] for r in p]
for f in d["features"]:
    for r in rings(f["geometry"]):
        for x, y in r: xs.append(x); ys.append(y)
x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
W = 1000.0; k = W / (x1 - x0); P = 10.0
print("bbox units:", 0, 0, round(W + 2 * P, 1), round((y1 - y0) * k + 2 * P, 1))
res = {}
for f in sorted(d["features"], key=lambda f: f["properties"]["iso_3166_2"]):
    no = f["properties"]["iso_3166_2"].split("-")[1]
    s = pl[no]
    parts = []
    for r in rings(f["geometry"]):
        pts = [((x - x0) * k + P, (y1 - y) * k + P) for x, y in r]
        if pts[0] == pts[-1]: pts = pts[:-1]
        segs, last = [], None
        for x, y in pts:
            t = (round(x, 1), round(y, 1))
            if t != last: segs.append("%g %g" % t); last = t
        parts.append("M" + " L".join(segs) + "Z")
    res[s] = "".join(parts)
assert len(res) == 81, len(res)
json.dump(res, open(out, "w"), ensure_ascii=False, separators=(",", ":"))
