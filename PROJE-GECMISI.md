# Rota Cepte · Proje Geçmişi Raporu

Hazırlanma tarihi: 6 Kasım 2026

**Kaynaklar:** Bu rapor iki kaynaktan derlendi: geliştirme sırasında tutulan proje notları ve bu deponun kayıt, dal ve PR geçmişi. Play Console, Azure paneli ve test kullanıcılarının telefonları rapor sırasında doğrudan görülemedi. Bu kaynaklardan gelmesi gereken bilgiler "kontrol edilmeli" diye işaretlendi. Emin olunmayan hiçbir bilgi tahminle doldurulmadı.

**Gizlilik notu:** Depo herkese açık. Bu yüzden kişisel bilgiler, hesap e-postaları, test kullanıcılarının adları ve anahtar dosyalarının yerleri rapora bilerek konmadı.

---

## 1. Zaman çizelgesi

Tarihler, depo kayıtlarındaki tarihlerdir (UTC). Sürüm numaraları uygulamadaki sürüm adıdır.

### 20–21 Ekim 2026: İlk sürümden 4.9'a

| Sürüm | Tarih | Ne geldi, ne değişti |
|---|---|---|
| İlk sürüm | 20 Ekim | 81 il, harita, canlı konum, Vikipedi fotoğrafı ve bilgisi. Uygulamanın adı o zaman "Gezi Rehberi"ydi. |
| Veri hattı | 20–21 Ekim | Veri, GitHub Actions'ta önceden hazırlanmaya başladı (`scripts/uret.mjs`, "Veri hazirla" iş akışı). Kaynaklar Wikidata, Vikipedi ve Commons. |
| 3.0 | 21 Ekim | İlçeler, fotoğraflı il kartları, arama, ana ekran simgesi, Android APK (Capacitor ile). |
| 3.2 | 21 Ekim | Açılış ekranı, yeni simge, kopyalanmaya karşı koruma. |
| 3.3 | 21 Ekim | Paylaşma, "Gideceğim yerler", Günün keşfi, internetsiz açılış (service worker), gizlilik sayfası. Harita MapTiler'a geçti, sorun olursa OpenStreetMap devreye giriyor. Play için imzalı AAB üretimi eklendi. |
| 3.4 | 21 Ekim | Ad "Yoldayız" oldu, simge değişti. |
| 3.5 | 21 Ekim | Gittim sayacı, hava durumu (Open-Meteo), meşhur yemekler, sesli okuma (telefonun sesi). |
| 3.6–3.7 | 21 Ekim | Yeni ve animasyonlu açılış ekranı. |
| 3.8 | 21 Ekim | Keşfet tema listeleri, ilk açılış rehberi. Sütüven, Hasanboğuldu ve Kızılkeçili eklendi. |
| 3.9 | 21 Ekim | İl kartlarında en bilinen yerin fotoğrafı. |
| 4.0–4.8 | 21 Ekim | Konum düğmesi, aramada temizle, Gezi haritan, plaka düzeltmesi, arka plandan dönüş, "Yer öner", Android geri tuşu, rozetler, hazır rotalar, il içi arama, yeni simge. |
| 4.9 | 21 Ekim | Ad son hâlini aldı: **Rota Cepte**. Slogan "Yol senin, rotan cepte!". Adres me7rt.github.io/Rota-Cepte oldu. |

### 21–22 Ekim 2026: 5.0'dan 5.14'e

| Sürüm | Tarih | Ne geldi, ne değişti |
|---|---|---|
| 5.0 | 21 Ekim | Listemden rota yap, "Yakınında bul" (yemek, kafe, otel, benzin, otopark), gezi tarihleri. |
| 5.1 | 21 Ekim | Sesli dinlemede daha doğal Türkçe ses, kısaltmalar açık okunuyor, cümle cümle okuma. |
| 5.2–5.3 | 21 Ekim | İngilizce dil desteği (telefon diline göre otomatik). İngilizce metinlerden okunuş parantezleri temizlendi. |
| 5.4 | 21 Ekim | Arka plandan dönüşte baştan başlama süresi 5 dakika oldu. |
| 5.5 | 21 Ekim | Gezi karnem: gezilen illeri gösteren paylaşılabilir görsel. |
| 5.6 | 21 Ekim | Özel günler: millî bayramlar, anma günleri ve dinî bayramlarda açılış mesajı ve ana sayfa şeridi. |
| 5.7–5.8 | 22 Ekim | İnternetsiz kullanım (ili telefona indir) ve mevsime göre öneriler. Düğmenin yeri değişti. |
| 5.9 | 22 Ekim | İl için 1 günlük plan, "Arkadaşına öner", beğeni ve puan sorusu. Play tanıtım filmi için otomatik çekim eklendi. |
| 5.10–5.14 | 22 Ekim | Boş ilçede en yakın yerler, yer sayfasında yakındaki yerler, fotoğraf galerisi, tema listelerinde ve aramada fotoğraflar. |
| Veri | 22–23 Ekim | 973 resmî ilçe listesi geldi. Yer sayısı 2.443'ten 3.112'ye çıktı, yazısız ilçe sayısı 698'den 13'e indi. |
| Android | 23 Ekim | Play şartları için en düşük SDK 24, hedef SDK 36 yapıldı. |

### 25–26 Ekim 2026: 6.0'dan 6.4'e

| Sürüm | Tarih | Ne geldi, ne değişti |
|---|---|---|
| 6.0 (PR #56) | 25 Ekim | Yeni mobil tasarım: Manrope yazı tipi, Lucide simgeleri, alt sekme çubuğu, renk temaları (Gün Batımı, Ege, Karadeniz). |
| 6.1 (PR #57) | 25 Ekim | Hukuki uyum: fotoğraf ve metin atıfları, lisanslar ve koşullar sayfaları, KVKK aydınlatma metni (gizlilik sayfası). |
| 6.2 (PR #58) | 25 Ekim | Yeni modern açılış ekranı. |
| 6.3 (PR #59, #60) | 25–26 Ekim | İçerik denetimi. 1.030 yere İngilizce açıklama eklendi. Sıradan tren istasyonları çıkarıldı. İl nüfusları TÜİK 2025 verisinden geldi. Yer sayısı yaklaşık 2.990 oldu. |
| 6.4 (PR #61, #62, #63) | 26 Ekim | Hızlı açılış, "Bilgi yanlış mı?" bildirimi, cuma 18.00 hafta sonu bildirimi, yıllık gezi hedefi ve seri, Listem rotası. Elle eklenen 16 yerin konum ve fotoğrafı doğrulandı, 15 koordinat düzeltildi. Uygulama içinde "Yeni sürüm hazır" uyarısı geldi. |

### 1–4 Kasım 2026: 6.5 ve 6.5.1

| Sürüm | Tarih | Ne geldi, ne değişti |
|---|---|---|
| 6.5 (PR #64) | 1 Kasım | Atatürk'ün izinde sayfası (16 durak ve 20 Atatürk evi), yenilenen gezi pasaportu, her özel güne ayrı tasarlanmış kartlar, "Hangi ilde?" oyunu, aylık öneri kartı, puan ve not, "Sana özel", canlı hava durumu ve altın saat. Davetkâr olmayan kapak fotoğrafları temizlendi (örneğin İmralı, bilimsel grafikler, yanlış ülkeden fotoğraflar). Yer sayısı yaklaşık 2.950. |
| 6.5.1 (PR #65–#69) | 4 Kasım | Yol üstü keşifte mola ekleme ve Google Maps'e ara durak, kategori seçimi, dünya simgeli dil seçici, veri temizliği (yinelenen yerler, fotoğrafsız höyükler), güvenlik sıkılaştırması, 10 Kasım anma bildirimi. Tam saatli alarm izni eklendi (PR #66), sonra geri alındı (PR #68). Bildirim metni açılınca tamamı görünüyor (PR #69). |

`main` dalındaki son sürüm **6.5.1**.

### 4–6 Kasım 2026: 6.6 dalı (henüz `main`'e girmedi)

6.6 çalışması `claude/project-thread-iyhxd3` dalında. Bu dal `main`'in 80 kayıt önünde. Uygulamadaki sürüm adı hâlâ "6.5.1" yazıyor, 6.6'ya yükseltme sona bırakıldı. Bu dalda yapılanlar:

- 4 Kasım: Tatil planı (gün gün, il, ilçe ya da yer seçerek), gezi türü kutuları, geçmiş gezileri işaretleme, günü durak durak kurma, plan haritası. Bazı yerlerin ilçe bilgisi düzeltildi (471 yer).
- 5 Kasım: İnternetsiz indirme boyutu, plan bantları, Listem sıralama, 9:16 gezi karnesi, MüzeKart bölümü (358 yer, saatler ve kapalı günler, fiyat yok), "Arabamı / otelimi kaydet" ve geri dönüş yol tarifi.
- 6 Kasım (PR #70, 6.6 dalına birleşti): paylaşılan linkin uygulamada açılması (Android App Links), 81 il için açılış cümleleri, bölge seçimli il listesi, acil yardım sayfası, kültür koçu (cami görgü bilgileri), festivaller, link ile ortak plan, yeni Keşfet kutuları, il sayfasında yer türleri, cihaz içinde öğrenen "Sana özel".
- 6.7 için yazılmış ama denenmemiş ekranlar da bu dalda: Gezi Modu, "Bugünkü rotan" kartı, "Etrafımı anlat".

### 5–6 Kasım 2026: Sesler

- 5 Kasım: 81 ilin tamamı Azure doğal sesiyle seslendirildi. 6.966 metin iki sesle okundu, toplam 13.932 ses dosyası oldu. Dosyalar `ses-kayitlari` dalında.
- 6 Kasım: Yaşayan Rehber için 300 yerin metinleri yazıldı ve seslendirildi. Her yerin 8 dosyası var: Türkçe ve İngilizce, hikâye ve kart, kadın ve erkek ses. Toplam 2.400 dosya, hepsi `rehber-ses` dalında. Bunlar henüz uygulamada yok.

---

## 2. Özellikler ve durumları

Durum sözcükleri:
- **Tamam:** `main`'de var ve Play'deki test sürümünde çalışıyor.
- **Yarım:** bir kısmı yapıldı, eksik var.
- **Denenmemiş:** kodu var ama gerçek telefonda denenmedi.
- **Bozuk:** bilinen bir hata var.
- **Kontrol edilmeli:** durumu bilinmiyor.

### `main` dalında (6.5.1)

| Özellik | Durum | Not |
|---|---|---|
| 81 il, ilçeler, yaklaşık 2.950 yer, fotoğraf ve bilgi | Tamam | Bazı yerlerde koordinat ve ilçe hatası var, bölüm 7'ye bak. |
| Harita (MapTiler, yedeği OSM) | Tamam | Ücretsiz plan, ticari kullanım dışı. |
| Canlı konum, mesafe, Google Maps yol tarifi | Tamam | |
| Arama, Keşfet temaları, Günün keşfi | Tamam | |
| Türkçe ve İngilizce, dil seçici | Tamam | Başka dil yok. |
| Sesli dinle (telefonun sesi) | Tamam | Doğal ses henüz uygulamada değil. |
| Hava durumu ve altın saat | Tamam | Open-Meteo, ücretsiz plan. |
| İnternetsiz kullanım (ili indir) | Tamam | |
| Listem, rota, 1 günlük plan, hazır rotalar | Tamam | |
| Yol üstü keşif, mola, ara durak | Tamam | Gerçek yol çizgisi yok, mesafe tahmini. |
| Gittim, gezi karnesi, gezi pasaportu, rozetler, hedef, seri | Tamam | |
| Puan ve not, Sana özel, En sevdiğin yerler | Tamam | |
| Özel günler, kartlar, 10 Kasım saygı görünümü ve bildirimi | Tamam | Dinî günlerin her yıl Diyanet takviminden eklenmesi gerekiyor. |
| Atatürk'ün izinde, Hangi ilde? oyunu | Tamam | |
| Hafta sonu bildirimi, puan sorusu, "Yeni sürüm hazır" uyarısı | Tamam | |
| Sürüm yenilikleri kartı | Tamam | Her sürümde güncellenmesi gerekiyor. |
| Gizlilik (KVKK), lisanslar, koşullar | Tamam | 6.6'daki yeni özellikler için gizlilik metni 6 Kasım'da güncellendi. Bu güncelleme 6.6 dalında. |
| Gezi haritan (il sınırları çizimi) | Bozuk değil, hukuki risk var | Çizim verisinin lisansı bilinmiyor, bölüm 7'ye bak. |

### 6.6 dalında, henüz yayınlanmadı

| Özellik | Durum | Not |
|---|---|---|
| Tatil planı, günü durak durak kurma, plan haritası | Tamam (tarayıcıda denendi) | Telefonda son hâliyle kontrol edilmeli. |
| Gezi türü kutuları, geçmiş gezileri işaretleme | Tamam (tarayıcıda denendi) | |
| MüzeKart bölümü | Tamam (tarayıcıda denendi) | Saatler Kasım 2026 bilgisi, fiyat yok. |
| Arabamı / otelimi kaydet | Tamam (tarayıcıda denendi) | Pusula oku yok, yol tarifi Google Maps'te açılıyor. |
| Paylaşılan linkin uygulamada açılması | Denenmemiş | Telefonda denenmedi. me7rt.github.io deposundaki doğrulama dosyasının durumu kontrol edilmeli. |
| Acil yardım, kültür koçu, festivaller | Tamam (tarayıcıda denendi) | Festival tarihleri yıllık güncelleme ister. |
| Link ile ortak plan | Tamam (tarayıcıda denendi) | Canlı ortak düzenleme yok, sunucu gerektiriyor. |
| Yeni Keşfet kutuları, il sayfasında türler, öğrenen Sana özel | Tamam (tarayıcıda denendi) | |
| Doğal sesli Dinle, kadın ya da erkek ses seçimi | Denenmemiş | Ekran kapalıyken çalışması denenmedi. |
| Gezi Modu (yaklaşınca anlatan rehber) | Yarım ve denenmemiş | Ekran kapalı modu yazılmadı. Play'e özel konum izni beyanı ve video gerekiyor. |
| "Bugünkü rotan" kartı, "Etrafımı anlat" | Denenmemiş | |
| Özel gezi günlüğü (cihazda not ve fotoğraf) | Kontrol edilmeli | Notlarda 6.6 için seçildiği yazıyor. Kodlanıp kodlanmadığı bu rapor için doğrulanmadı. |

### Planlanmış ama yapılmamış

Ana ekran widget'ı, Almanca ve Rusça gibi yeni diller, Hikâye Stüdyosu (paylaşım kartı düzenleyici), gerçek yol çizgisi, CSP güvenlik başlığı, yorum, puan ve fotoğraf gibi veritabanı isteyen her şey, Apple sürümü.

---

## 3. Vazgeçilenler

### Denenip ya da konuşulup bırakılan işler

| İş | Ne oldu | Neden |
|---|---|---|
| Otomatik gün programı | 4 Kasım'da yapıldı, aynı gece MERT reddetti. | Yerine kullanıcının durak durak kurduğu gün planı geldi. |
| Tam saatli alarm izni | PR #66'da eklendi, PR #68'de geri alındı. | Play'de ek izin riski. Bu izin bir daha eklenmeyecek. |
| Google Cloud doğal ses | Proje açıldı, kullanılmadı. | Türkiye'de 1.500 TL ön ödeme istedi. Yerine Azure seçildi. |
| Sesleri GitHub Releases'e yüklemek | Denendi, yarıda kaldı. | GitHub'ın saatlik yükleme sınırına takıldı. Yaklaşık 18 dolarlık Azure kredisi boşa gitti. Sonra ses dalına yükleme yöntemine geçildi. |
| "Önceki veri önce" yöntemi | Bir veri çalıştırmasında denendi, geri alındı. | Eski meydanlar ve semtler geri geldi. |
| Yol üstü keşifte rotayı düzeltmek | Denendi, uygulanmadı. | 17 rotada mesafe tahmini kötüleşti. |
| Kalabalık ve sıra radarı | Reddedildi. | Açık kaynak veri yok. Uydurma sayı yanıltır. |
| Toplu taşıma hat bilgisi | Reddedildi. | 81 ilde güncel tutulamaz. |
| Grup içi canlı konum | Reddedildi. | Sunucu ve en hassas veri gerekir. |
| Dengeli rota önerisi | Önizlemesi yapıldı, reddedildi. | Uygulamayı öne çıkarmayan dolgu bir özellik. |
| Yakıt ve geçiş ücreti hesabı | Reddedildi. | Fiyatlar değişir, yanlış bilgi riski var. |
| Ana sayfada canlı küçük harita | Reddedildi. | MapTiler kotası. |
| Yerel yemek ve mekân önerisi, taksi ve SIM ipuçları | Reddedildi. | Kaynak yok, hukuki risk var. |
| Ücretli reklam | Şimdilik hayır. | Uygulama gelir getirmiyor, kasım sezon dışı. Şubat sonunda yeniden bakılacak. |
| Hikâye Stüdyosu | Önizlemesi yapıldı, 5 Kasım'da beklemeye alındı. | MERT sonra sakin kafayla bakmak istedi. |
| Yeni diller | Beklemede. | Önce Play'de yayın. |
| CSP | Ertelendi. | Harita ve fotoğrafları bozma riski. Yayın onayından sonra yapılacak. |
| Ad değişiklikleri | "Gezi Rehberi" oldu "Yoldayız", sonra **Rota Cepte**. | |
| Çıkarılan içerik | AVM'ler, sıradan semtler ve meydanlar, sıradan tren istasyonları, cezaevi adası İmralı, davetkâr olmayan kapak fotoğrafları, Surbehan, 63 fotoğrafsız höyük. | |

### Video denemeleri

- `video-deneme` ile `video-deneme-13` arası 14 dal kısa videolar için görsel adayları topladı (1–2 Kasım). Hazır videolar MERT'in bilgisayarında. Bu dallar artık eski görünüyor, ama silmeden önce MERT'in seçtiği görsellerin bilgisayarda olduğu kontrol edilmeli.
- `claude/project-thread-oje5uw` dalında görsel toplama ve Play tanıtım filmi çalışması var (1–2 Kasım). Dal `main`'in 14 kayıt önünde ve birleşmedi.
- "Play için öğretici tanıtım videosu" işi 3 Kasım'dan beri bir GitHub çalıştırma onayını bekliyor.
- 16 kısa video taslağı MERT'in ses kayıtlarını bekliyor.

### Depodaki dallar

| Dal | Durum |
|---|---|
| `main` | Gerekli. Yayınlanan sürüm (6.5.1). |
| `claude/project-thread-iyhxd3` | Gerekli. 6.6 ve 6.7 çalışması, birleşmedi. |
| `claude/project-thread-2h3c9c` | Gerekli. 6.6'nın üstüne Yaşayan Rehber metinleri ve seslendirme betikleri. Bu betiklerin uygulamaya girmemesi gerekiyor, bölüm 7'ye bak. |
| `rehber-ses` | Gerekli. 2.400 Yaşayan Rehber sesi ve 8 dinleme sayfası. |
| `ses-kayitlari` | Gerekli. 13.932 il, ilçe ve yer sesi. |
| `ses-ornek` | Şimdilik gerekli. Parti raporları (PDF) ve ses denemeleri. Uygulama ses dalından okumaya başlayınca toparlanabilir. |
| `muze-ham` | Şimdilik gerekli. MüzeKart ham verisi, yeniden çekmek için. |
| `veri-deneme`, `kontrol`, `ekran-goruntuleri` | Araç dalları. Veri denemeleri, fotoğraf kontrol sayfaları ve mağaza ekran görüntüleri her çalıştırmada yeniden yazılıyor. |
| `magaza-gorselleri` | Gerekli. Mağaza ve geliştirici sayfası görselleri. |
| `bionluk-gorseller` | Bionluk yüklemeleri bitene kadar gerekli. |
| `tanitim-video` | Tanıtım filmi bitene kadar gerekli. |
| `ekran-deneme`, `kart-foto` | Eski. Geçici çalışma dalları. |
| `veri-aday`, `veri-aday-sonuc` | Eski. MERT'in elle silmesi planlanmıştı, hâlâ duruyor. |
| `video-deneme` … `video-deneme-13` | Büyük olasılıkla eski, yukarıdaki nota bak. |
| `claude/project-thread-oje5uw` | Kontrol edilmeli. Tanıtım filmi işi bitince silinebilir. |

**Etiketler:**
- `apk-son`: Gerekli, APK indirme linki buna bağlı.
- `apk-deneme`: Test APK'sı.
- `ses-<il>-tr/en`: Eski. Releases denemesinden kaldı. Silinmeden önce MERT'e sorulacaktı.

---

## 4. Play Store

| Konu | Bilgi |
|---|---|
| Hesap | Kişisel hesap, geliştirici adı "Mert Turanlıoğlu". Kayıt ücreti 25 dolar ödendi. Kimlik doğrulandı. |
| Paket adı | `io.github.me7rt.rotacepte` |
| Mağaza adı | "Rota Cepte: Gezilecek Yerler". İngilizcesi "Rota Cepte: Turkey Travel". Diller tr-TR, en-US, en-GB. Mağaza metinleri Google'dan onay aldı ve 1 Kasım'da yayınlandı. |
| Kapalı test (Alpha) | Google 24 Ekim'de onayladı. 12 test kullanıcısı 25 Ekim'de tamamlandı. 14 günlük süre yaklaşık 8 Kasım'da doluyor. 3 Kasım'da kayıtlı test kullanıcısı sayısı 39. |
| Yüklenen paketler | Ayrıntılar aşağıda. |
| Test geri bildirimi | Gelen yorumların hepsi 5 yıldızlı. Hiçbiri hata bildirmiyor. |
| Uyarı veya ret | Notlarda Play'den gelen bir uyarı ya da ret yok. Play Console'dan kontrol edilmeli. |
| Üretim erişimi | Başvuru 8 Kasım'da birlikte doldurulacak. Cevap taslağı hazır. |
| İstatistik (3 Kasım) | Günde 20–23 yüklü kullanıcı, 15 ilk açılış, 17 aylık aktif cihaz. |

**Yüklenen paketler:**
- 68, 69 ve 70: Hangi sürümler olduğu ve hangi tarihte yüklendikleri notlarda yok, kontrol edilmeli.
- 79 (6.3): Hiç yüklenmedi.
- 83 (6.4.0): 26 Ekim'de Alpha'ya yüklendi.
- 92: Eski veri taşıyor, asla yüklenmeyecek.
- 94 (6.5.0): 1 Kasım'da yüklendi. 2 Kasım'da test kullanıcılarına açıldı.
- 105 (6.5.1): 4 Kasım'da MERT'e teslim edildi. Yüklenip yüklenmediği bilinmiyor, kontrol edilmeli.

---

## 5. Veri ve içerik

| İçerik | Nereden geldi, nasıl üretildi |
|---|---|
| Yerler | Wikidata sorgularıyla geldi. Veri, GitHub Actions'taki "Veri hazirla" işinde `scripts/uret.mjs` ile üretiliyor. Seçkin yerler `data/yerler-ham.json` dosyasında, elle eklenenler `data/elle-yerler.json` dosyasında. İlçe başına üst sınır var. Sıralama tutarlı olsun diye ünlülüğe, sonra Wikidata numarasına bakılıyor. |
| İlçeler | Resmî 973 ilçe listesi (`data/ilceler.json`). İlçe düzeltmeleri geoBoundaries ve OSM ile doğrulandı. |
| Fotoğraflar | Wikimedia Commons'tan alınıyor. GFDL lisanslı fotoğraflar alınmıyor. Elle düzeltmeler `data/foto-duzelt.json` dosyasında: yasak, zorla, çıkar, parça yasağı. İl kapakları `data/il-kapak.json` dosyasında. Fotoğraflar temsilî kontrol sayfalarıyla gözden geçirildi. 45 önemli yerin kullanılabilir fotoğrafı yok. |
| Metinler | Vikipedi'den kısaltıldı, kaynak gösteriliyor (CC BY-SA). Kısa Türkçe metinler İngilizce Vikipedi'den çevrildi. Elle düzeltmeler `data/icerik-duzelt.json` dosyasında. |
| MüzeKart | muze.gov.tr'den bir Actions işiyle çekildi. 358 yer var, 285'i uygulamadaki yerlerle eşleşti. Fiyat bilgisi kaynakta olmadığı için gösterilmiyor. |
| Nüfus | TÜİK 2025. Her şubat yeniden çekilmeli. |
| Özel günler | `docs/ozel-gunler.json`. Dinî günler Diyanet takviminden elle giriliyor, tahmin edilmiyor. |
| Özel gün kartları | Atatürk günlerinde kamu malı Atatürk fotoğrafları kullanılıyor. Diğer günlerde Commons'tan PD, CC0 ya da CC BY lisanslı fotoğraflar var. Künyeler kartta ve lisanslar sayfasında. |
| Hava ve harita | Hava Open-Meteo'dan, harita MapTiler'dan (yedeği OSM). İkisi de ücretsiz planda. |
| İl, ilçe ve yer sesleri | 5 Kasım'da Azure'un doğal sesleriyle üretildi. Türkçe Ava ve Andrew, İngilizce Sonia ve Andrew. 13.932 dosya `ses-kayitlari` dalında. |
| Yaşayan Rehber (300 yer) | Metinler kaynaklardan yararlanılarak ama kopyalanmadan, kendi cümlelerimizle yazıldı. Eleştirmenin kurallarına ve MERT'in sonradan eklediği kurallara göre yazıldı, kurallar aşağıda. 10 onaylı örnek metin aynen kullanıldı. Emin olunmayan bilgiler metne konmadı. Her partide ayrı bir kontrol listesine yazıldı. Sesler Azure'da üretildi. İngilizce seste Türkçe adların okunuşu için 660 adlık bir okunuş sözlüğü kullanıldı. |

**Yaşayan Rehber kuralları:**
- Parantez, kısaltma ve Romen rakamı yok.
- 100'ün altındaki sayılar yazıyla yazılıyor.
- Güncel durum hikâyede değil, kartta duruyor.
- Ziyaretçiden dua istenmiyor.
- Korunan alanlarda hikâye suya girmekle ya da hassas zemine basmakla bitmiyor.
- Müzede sesli okuma ve bitkiye dokunma istenmiyor.

### Elle yapılan önemli düzeltmeler

- Elle eklenen yerlerin koordinatları doğrulandı. 15 koordinat düzeltildi, çünkü tahmin edilen koordinatlar 35 kilometreye kadar yanlıştı.
- Yinelenen yerler çıkarıldı. Aynı adlı 8 yer çifti ayrı adlar aldı.
- Kapak fotoğrafları temizlendi: İmralı, bilimsel grafikler, uydu ve uçak çekimleri, böcek fotoğrafları, yanlış ülkeden fotoğraflar.
- Yaşayan Rehber'de yapılan düzeltmeler:
  - Deprem bölgesindeki 6 yerde güncel durum karta taşındı.
  - Salda'nın bitişi değişti.
  - Halfeti ve Namık Kemal'in bitişleri değişti.
  - Her düzeltmeden sonra yalnızca ilgili yerin sesleri yeniden üretildi.

---

## 6. Önemli kararlar ve nedenleri

| Karar | Neden |
|---|---|
| Uygulama şimdilik ücretsiz ve reklamsız. Yalnızca Türkiye. | Önce kullanıcı kazanmak. Gelir başlayınca vergi ve hizmet planları değişecek. |
| Capacitor ile web tabanlı uygulama. Veri önceden hazırlanıyor. | Kod bilgisi gerektirmeden sürdürmek. Hız. İnternetsiz çalışabilmek. |
| Tahmini koordinatla yer eklenmiyor. | 35 kilometreye kadar hata görüldü. |
| Kapak fotoğrafları gitmek istetmeli. | MERT'in kuralı. |
| Her sürümde uygulama içinde "Sürüm X'te yeni" kartı gösteriliyor. | Kullanıcılar Play notlarını okumuyor. |
| Atatürk'e ve millî ve dinî günlere özel özen gösteriliyor. Her özel günde bildirim gönderilmiyor. | Saygı. Bildirim yorgunluğu kullanıcıyı kaçırır. |
| Veritabanı isteyen her şey üretim onayından sonraya kaldı. | KVKK, Play veri güvenliği ve moderasyon yükü. |
| Doğal ses uygulamanın içinde üretilmiyor. Önceden üretiliyor, anahtar uygulamaya konmuyor. | Güvenlik ve maliyet. |
| Ses dosyaları uygulamaya gömülmüyor. İl il indirme ve internetten dinleme olacak. Ses adresi uzaktaki bir ayar dosyasından okunacak. | Uygulama boyutu. Barındırma yeri değişebilsin diye. |
| GitHub'da her şey profesyonel görünmeli. Kayıtlar MERT'in adıyla atılıyor. | Herkese açık depo. |
| Hukuki ve vergi riskleri sorulmadan söyleniyor. 20/B başvurusu ilk gelir yaklaşınca yapılacak. | Başvuru, sıfır gelirde bile Bağ-Kur primini başlatır. |
| Önce plan ve önizleme, onaydan sonra kod. | Kullanım hakkı israfını önlemek. |
| Uygulamayı öne çıkarmayan dolgu özellik eklenmiyor. | Odak. |
| Capacitor'da `server.hostname` ayarı değiştirilmiyor. | Kullanıcıların kayıtlı verileri silinir. |

---

## 7. Bilinen hatalar ve riskler

### Bugünkü olay: ses dosyalarının silinmesi (6 Kasım 2026)

**Ne oldu:** Dinleme sayfalarını `rehber-ses` dalına yüklerken iki kayıt önceki partilerin seslerini sildi:
- `8b15c93` ("Parti 2 dinleme sayfası") 730 dosya sildi: parti 1'in tamamı ve parti 2'nin sesleri.
- `698d539` ("Parti 3 dinleme sayfası") parti 3'ün 320 sesini sildi.

Dal yaklaşık 1.450 sese düşmüştü. Seslendirme işinin kendisi hiçbir dosya silmedi.

**Neden oldu:** Yükleme, dalın yalnızca bir kısmını içeren bir kopyadan yapıldı. Kopyada olmayan dosyalar da silinmiş sayıldı ve öyle gönderildi.

**Nasıl düzeltildi:** Dosyalar geçmişten geri getirildi, yeniden seslendirme yapılmadı (kayıt `934c887`). Salda'nın düzeltilmiş 8 sesi korundu.

**Kontrol sonucu:**
- Dalda 2.400 ses var.
- Her yerin 8 dosyası tam. Eksik ya da 0 baytlık dosya yok.
- 8 dinleme sayfası da açılıyor. Sayfalardaki 2.400 bağlantının hepsi gerçek bir dosyaya gidiyor.

**Önlem:** Bu dala yapılan her yükleme yalnızca dosya ekleyecek. Göndermeden önce silinecek dosya var mı diye bakılacak. Tek dosya bile silinecekse yükleme duracak.

### Diğer hatalar ve riskler

| Konu | Açıklama |
|---|---|
| Yaşayan Rehber'deki doğrulanmamış bilgiler | Her partinin kontrol listesinde doğrulanmamış bilgiler var. Örneğin parti 6'da 96, parti 7'de 87, parti 8'de 42 madde. Bunlar metne girmedi, ama metindeki bazı tarihler, yükseklikler ve mesafeler yine de kaynakla karşılaştırılmalı. Sonraki durak süreleri yaklaşık. |
| Bilinen veri hataları | Bazı yerlerin koordinatları yanlış: Ayvalık Taksiyarhis, Bursa Yeşil Külliye, Denizli Kolossai, Eskişehir Ahşap Eserler Müzesi, Kayseri Arkeoloji Müzesi. Frigya'nın koordinatı tahmin edilmiş. Birkaç yerin ilçesi yanlış. Çorum Ortaköy'ün koordinatı şüpheli. |
| Veri dalgalanması | Her veri çalıştırmasında yaklaşık 5 yer gelip gidiyor. Yayından önce farkın kontrol edilmesi gerekiyor. |
| 6.6 henüz birleşmedi | 6.6 dalı `main`'in 80 kayıt önünde. Önizleme için geçici önbellek adları kullanılıyor (6.6-o…). Yayında bunlar 6.6 yapılmalı. Gerçek veri çalıştırması da henüz yapılmadı. |
| Geçici betikler | Seslendirme betikleri ve geçici iş akışları `claude/project-thread-2h3c9c` dalında. 6.6'ya girmeden önce ayrılmaları ya da nötr adlarla düzenlenmeleri gerekiyor. |
| Gezi Modu | Telefonda denenmedi. Ekran kapalı modu yok. Play'de konum izni beyanı ve video gerekiyor. |
| Ses barındırma | Sesler şimdilik GitHub üzerinden sunuluyor. Herkese açık yayından önce Cloudflare R2'ye taşınması planlandı. Ses adresi uygulamada sabit yazılmayacak. |
| Ücretsiz planlar | MapTiler, Open-Meteo ve OSM ticari kullanım dışı. Gelir başlamadan ücretli plana geçilmeli. |
| Gezi haritan çizimi | `docs/tr-harita.json` dosyasının lisansı bilinmiyor. Lisanslı bir kaynaktan yeniden yapılması planlandı. Yapılıp yapılmadığı kontrol edilmeli. |
| KVKK gri alanı | E-postaların ABD'deki Gmail'de tutulması yurt dışı aktarım sayılabilir. Yorum ve hesap gibi özellikler gelince avukata danışılmalı. |
| Azure maliyeti | 200 dolarlık ücretsiz kredi tahminden çok daha hızlı bitti. Abonelik kullandıkça öde planına geçti, 25 dolar bütçe uyarısı var. Yaşayan Rehber'in tahmini maliyeti yaklaşık 28 dolar, bütçe uyarısının üstünde. Gerçek tutar Azure'un Maliyet analizi ekranından kontrol edilmeli. |
| Çalışma ortamı | Geliştirme ortamı geçici. Yaşayan Rehber taslak betikleri ortam kapanınca kaybolacak. Kalıcı olan metinler, sesler ve raporlar. |

---

## 8. Yarım kalan işler ve sıradaki adımlar

1. **Play:** 6.5.1 paketini (105) Alpha'ya yüklemek. 8 Kasım'da üretim erişimi başvurusunu doldurmak.
2. **6.6 yayını:**
   - Telefonda deneme.
   - Sürüm numarasını ve önbellek adlarını 6.6 yapmak.
   - Gerçek veri çalıştırmasını yapmak ve farkı kontrol etmek.
   - Yenilikler kartını hazırlamak.
   - Mağaza ekran görüntülerini Türkçe ve İngilizce yenilemek.
   - En sonda paketi (AAB) üretmek.
3. **Ses indirme özelliği:** Plan onaylı ama henüz kod yok. Önce önizleme, MERT'in onayından sonra kod. Plan şunları içeriyor:
   - İl il indirme ve internetten dinleme, dosya boyutu notuyla.
   - Ses adresinin uzaktaki bir ayar dosyasından okunması.
   - İl sayfasında "Bu ilde N yer sesli rehberli" yazısı ve kartlarda rozet.
4. **Gezi Modu (6.7):**
   - Telefonda deneme.
   - Ekran kapalı modu.
   - Play konum izni beyanı ve video.
5. **Veri temizliği:**
   - Bölüm 7'deki koordinat ve ilçe hataları.
   - Yaşayan Rehber kontrol listelerinin doğrulanması.
   - Anemas Zindanları ve Atik Mustafa Paşa Camii'nin bir sonraki veri çalıştırmasında geldiğini görmek.
   - Fotoğrafsız 45 yer.
6. **Dal temizliği:** Bölüm 3'teki eski dallar ve `ses-<il>` etiketleri, MERT'in onayıyla.
7. **Bekleyen diğer işler:**
   - Hikâye Stüdyosu.
   - Kısa videolar (ses kayıtları bekleniyor).
   - Tanıtım filmi (GitHub onayı bekleniyor).
   - "Cebinde yerli bir dost" mağaza dili.
   - Ocak ortasında Ramazan özellikleri.
   - Yeni diller ve CSP (yayın onayından sonra).
   - Apple sürümü (üretimden sonra).

---

## 9. MERT'e sorulması gereken açık sorular

1. 6.5.1 paketi (105) Alpha'ya yüklendi mi? Play'den bir uyarı ya da ret geldi mi?
2. 68, 69 ve 70 numaralı paketler hangi sürümlerdi, hangi tarihte yüklendi? Play Console'daki sürüm geçmişinden bakabilir misin?
3. Azure'un Maliyet analizi ekranında şu ana kadarki gerçek tutar ne?
4. Yaşayan Rehber'in kontrol listelerini kim, ne zaman doğrulayacak? Eleştirmen mi, sen mi, yoksa resmî sitelerden bir doğrulama işi mi?
5. `video-deneme` dalları, `kart-foto`, `ekran-deneme`, `veri-aday`, `veri-aday-sonuc`, `claude/project-thread-oje5uw` ve `ses-<il>` etiketleri silinebilir mi?
6. Paylaşılan linkin uygulamada açılması için me7rt.github.io deposuna doğrulama dosyası kondu mu?
7. 6.6 telefonda denendi mi? Denendiyse hangi ekranlarda sorun var?
8. Özel gezi günlüğü 6.6'ya girecek mi, yoksa 6.7'ye mi kalsın?
9. Sesler herkese açık yayından önce Cloudflare R2'ye taşınsın mı, yoksa GitHub'da kalmaya devam mı etsin?
