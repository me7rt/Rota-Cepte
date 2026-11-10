# İl nüfuslarını TÜİK'in Nüfus İstatistikleri Portalı'ndan (nip.tuik.gov.tr) alır ve data/tuik-nufus.json'a yazar.
# Kaynak: Adrese Dayalı Nüfus Kayıt Sistemi (ADNKS) sonuçları. TÜİK her yıl Şubat'ta bir önceki yılın sonucunu açıklar.
# GitHub Actions'ta "Nufus guncelle (TUIK)" iş akışıyla çalışır.
import datetime, html, json, re, sys, time, urllib.parse, urllib.request

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
ADRES = "https://nip.tuik.gov.tr/Home/GetInformation"


def buyuk(s):
    return s.replace("i", "İ").replace("ı", "I").upper()


def tablo(deger):
    veri = urllib.parse.urlencode({"status": "1", "name": "CinsiyeteGoreNufus", "value": deger}).encode()
    istek = urllib.request.Request(ADRES, data=veri, headers={"User-Agent": UA, "X-Requested-With": "XMLHttpRequest", "Referer": "https://nip.tuik.gov.tr/?value=CinsiyeteGoreNufus"})
    metin = urllib.request.urlopen(istek, timeout=60).read().decode("utf-8")
    satirlar = {}
    for tr in re.findall(r"<tr[^>]*>(.*?)</tr>", metin, flags=re.S):
        h = [html.unescape(re.sub(r"<[^>]+>", "", x)).strip() for x in re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", tr, flags=re.S)]
        if len(h) >= 3 and h[0].isdigit():
            satirlar[h[0]] = (h[1], int(h[2].replace(".", "")))
    return satirlar


iller = json.load(open("docs/data/index.json", encoding="utf-8"))["iller"]
turkiye = tablo("")
yil = max(turkiye)
cikti = {"_kaynak": "TÜİK Nüfus İstatistikleri Portalı (nip.tuik.gov.tr), Adrese Dayalı Nüfus Kayıt Sistemi sonuçları",
         "_alindi": datetime.date.today().isoformat(), "yil": yil, "turkiye": turkiye[yil][1], "il": {}}
for il in iller:
    s = tablo(buyuk(il["ad"]))
    if yil not in s or s[yil][0] != buyuk(il["ad"]):
        sys.exit(f"{il['ad']} için {yil} değeri bulunamadı")
    cikti["il"][il["s"]] = {yil: s[yil][1]}
    time.sleep(0.4)
toplam = sum(v[yil] for v in cikti["il"].values())
if len(cikti["il"]) != 81 or toplam != cikti["turkiye"]:
    sys.exit(f"Kontrol tutmadı: {len(cikti['il'])} il, toplam {toplam}, Türkiye {cikti['turkiye']}")
json.dump(cikti, open("data/tuik-nufus.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"{yil}: 81 il, toplam {toplam} (Türkiye ile aynı)")
