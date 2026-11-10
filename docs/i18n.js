/* Rota Cepte · © 2026 Mert Turanlıoğlu · Dil desteği (Türkçe / English)
   Dil: önce kullanıcının seçimi, yoksa telefonun dili (Türkçe değilse İngilizce). */
(function () {
  "use strict";
  let dil = "tr";
  try { dil = localStorage.getItem("gezi-dil") || ""; } catch (e) {}
  if (dil !== "tr" && dil !== "en") dil = /^tr/i.test(navigator.language || "tr") ? "tr" : "en";
  const EN = {
    // v6.6.1
    "MüzeKart": "Museum Pass", "Festivaller": "Festivals", "Ayarlar": "Settings", "Güvenlik": "Safety", "Dinleme": "Listening", "Ses seçimi, Etrafımı anlat": "Voice, Tell me what's around",
    "Görünüm ve dil": "Look and language", "Bildirimler": "Notifications", "Tüm bildirimler": "All notifications", "Tek dokunuşla hepsini aç ya da kapat": "Turn them all on or off in one tap",
    "Hafta sonu önerisi": "Weekend ideas", "Anma ve bayram bildirimleri": "Holiday and commemoration alerts", "Önerileri sıfırla": "Reset suggestions",
    "Paylaş ve destek": "Share and support", "Arkadaşına öner": "Recommend to a friend", "Rota Cepte'yi paylaş": "Share Rota Cepte",
    "Öneri gönder": "Send feedback", "Fikrin ya da bulduğun bir hata için e-posta": "Email us an idea or a bug", "Hakkında": "About",
    // v6.6
    "Tatilini planla": "Plan your holiday", "Gün gün kendi rotanı yap, gideceğin yerleri sen seç": "Build your own day-by-day route and pick the places yourself",
    "Nasıl bir gezi istiyorsun?": "What kind of trip?", "Gezi türü": "Trip type",
    "Daha önce gittiğin yerleri işaretle": "Mark places you've been before", "Plana ekle": "Add to plan", "Tatil planı": "Holiday plan", "Tatil planlarım": "My holiday plans",
    // v6.5
    "Sana özel": "Picked for you", "En sevdiğin yerler": "Your favourite places",
    "Gittiğin yerlere yıldız ver, en sevdiklerin burada toplansın.": "Rate the places you've visited and your favourites will gather here.",
    "Gezi pasaportum":"My travel passport", "Gittiğin her ilin damgası pasaportuna basılır. Renkli damgaya dokun, büyüt ve paylaş.": "Every province you visit gets a stamp in your passport. Tap a coloured stamp to enlarge and share it.",
    "Bu sürümde neler yeni?": "What's new in this version?",
    "Pasaportumu paylaş": "Share my passport",
    "Pasaportuna yeni damga!": "New passport stamp!", "Yeni rozet": "New badge", "damga var": "stamped",
    "Yol üstü keşif": "Along the way", "Yola mı çıkıyorsun? İki il seç, yol boyunca mola yerlerini bulalım": "Road trip? Pick two provinces and we'll find stops along the way",
    "Nereden": "From", "Nereye": "To", "Yönü değiştir": "Swap direction", "Yoldan en fazla": "Max. distance off the road", "Yolculuk planı": "Trip planner",
    "Yol tarifini Google Haritalar'da aç": "Open directions in Google Maps", "Aşağıdaki yerlerin yanındaki + ile mola ekle, yol tarifine durak olarak girsin.": "Tap + next to a place below to add it as a stop in the directions.", "Nereden ve nereye için iki farklı il seç.": "Pick two different provinces.",
    "Yol, illerin merkezlerinden geçen yaklaşık bir hattır. Gerçek güzergâh farklı olabilir, mesafeler yaklaşıktır. Başlangıç ve varış illerindeki yerler o illerin kendi sayfasında.": "The road is an approximate line through province centres. The actual route may differ and distances are approximate. Places in the start and destination provinces are on their own pages.",
    "Yol bilgisi yüklenemedi. İnternet bağlantını kontrol et.": "Couldn't load route data. Check your connection.", "Bu iki il arasında yol bulunamadı.": "No route found between these provinces.",
    // v6.5 küçük sevinçler: şans çarkı
    "Karar veremedin mi?": "Can't decide?", "Çarkı çevir": "Spin the wheel", "8 il arasından şans çarkı seçsin": "Let the luck wheel pick one of 8 provinces",
    "Çevir": "Spin", "Başka iller": "Other provinces",
    // v6.4
    "Bilgi yanlış ya da eksik mi? Bize bildir": "Is something wrong or missing? Let us know", "Seri gezgin": "Streak traveler", "3 ay üst üste en az bir yere git": "Visit at least one place 3 months in a row",
    // v6.0 yeni tasarım
    "Gezilerim": "My trips", "Listem": "My list", "Yakınımda": "Nearby", "Gezi haritan ve rozetler": "Travel map & badges",
    "Listen henüz boş": "Your list is empty", "Yerleri keşfet": "Explore places", "Rozetler": "Badges",
    "Bir yerin sayfasında kalbe dokun, gitmek istediğin yerler burada toplansın. 2 yer ekleyince senin için rota da çizeriz.": "Tap the heart on a place to save it here. Add 2 places and we'll plan a route for you.",
    "Gittim": "Been here", "Dinle": "Listen", "Durdur": "Stop", "Öne çıkanlar": "Highlights",
    "Burada olmayan bir yer mi biliyorsun?": "Know a place that's missing?", "Bu ilde eksik bir yer mi var?": "Is a place missing in this province?",
    "Rota Cepte'yi arkadaşlarına öner": "Recommend Rota Cepte to friends", "Gezi karnemi paylaş": "Share my travel card",
    "Yakından uzağa sırala": "Sort nearest first", "Rotayı Google Haritalar'da başlat": "Start the route in Google Maps",
    "Ana menü": "Main menu", "Ara": "Search", "Bu ilde yer ara": "Search in this province",
    // açılış ve üst kısım
    "Yol senin, rotan cepte!": "The road is yours, the route is in your pocket!",
    "81 il · 973 ilçe · 2.900+ yer": "81 provinces · 973 districts · 2,900+ places",
    "Hazırlayan": "Made by", "Hazırlayan:": "Made by:",
    "© 2026 · Tüm hakları saklıdır": "© 2026 · All rights reserved",
    "© 2026 Mert Turanlıoğlu · Tüm hakları saklıdır ·": "© 2026 Mert Turanlıoğlu · All rights reserved ·",
    "Gizlilik": "Privacy", "Kaynaklar ve lisanslar": "Sources and licenses", "Kullanım koşulları": "Terms of use",
    "© 2026 Mert Turanlıoğlu · Tüm hakları saklıdır": "© 2026 Mert Turanlıoğlu · All rights reserved",
    "Fotoğraflar ve Vikipedi metinleri kendi lisanslarıyla kullanılır.": "Photos and Wikipedia texts are used under their own licenses.",
    "Geri": "Back", "Rotan nereye?": "Where to?",
    "Konumumu kullan": "Use my location", "Konum kapalı": "Location off", "Konumu aç": "Turn on location", "Konum açık": "Location on", "Konum aranıyor…": "Finding location…",
    // ana sayfa
    "İl, ilçe ya da yer ara… (ör. Uşak)": "Search a province, district or place… (e.g. Cappadocia)",
    "Şehir, müze, plaj, antik kent ara…": "Search a city, museum, beach, ancient site…",
    "İl, ilçe ya da yer ara: Efes, Nemrut…": "Search a province, town or place: Ephesus, Nemrut…", "Bölge": "Region", "Tümü": "All", "Acil yardım": "Emergency help", "Kültür koçu": "Culture coach", "Neden bunlar?": "Why these?", "Sana özel önerileri sıfırla": "Reset your picks", "Baktığın yerlerden öğrendiklerini siler. Listen, gezdiklerin ve planların kalır.": "Clears what the app learned from the places you viewed. Your list, visits and plans stay.", "Cami, çay, bahşiş, pazarlık, Ramazan": "Mosques, tea, tipping, bargaining, Ramadan", "112, konumum, en yakın hastane ve eczane": "112, my location, nearest hospital and pharmacy",
    "Öne çıkan iller": "Featured provinces", "Tüm iller (81)": "All provinces (81)", "Tüm iller": "All provinces", "Daha az göster": "Show less", "Plaka": "Plate no.",
    "Ayarlar ve hakkında": "Settings and about", "Sesli rehber": "Audio guide", "Dil, tema, sürüm, gizlilik, lisanslar": "Language, theme, version, privacy, licences",
    "Aramayı temizle": "Clear search",
    "Yakınımdaki yerler": "Places near me",
    "Konumunu aç, sana en yakın gezilecek yerleri sıralayalım": "Turn on location to see the nearest places to visit",
    "Sana en yakın gezilecek yerler, canlı mesafeyle": "The nearest places to visit, with live distance",
    "Telefondan kaldır": "Remove from phone",
    "📣 Rota Cepte'yi arkadaşlarına öner": "📣 Recommend Rota Cepte to friends",
    "Keşfet": "Explore", "Hazır rotalar": "Ready-made routes", "Gezi haritan": "Your travel map",
    "Gideceğim yerler": "My wish list", "81 il": "81 provinces", "Yükleniyor…": "Loading…",
    "📍 Burada olmayan bir yer mi biliyorsun?": "📍 Know a place that's missing?",
    "📍 Bu ilde eksik bir yer mi var?": "📍 Is a place missing in this province?",
    "Öner": "Suggest",
    // tema / rota / rozet ekranları
    "📍 Yakından uzağa sırala": "📍 Sort nearest first",
    "🧭 Rotayı Google Haritalar'da başlat": "🧭 Start the route in Google Maps",
    "Mesafeler yaklaşık. Durağa dokununca ayrıntısını görürsün.": "Distances are approximate. Tap a stop to see details.",
    "Kazandığın rozetler:": "Badges earned:",
    ". Bir yerin sayfasında \"Buraya gittim\" dedikçe yenileri açılır.": ". Tap \"I've been here\" on a place to unlock more.",
    // il ekranı
    "Devamını oku": "Read more", "Vikipedi": "Wikipedia",
    "Gezilecek yerler": "Places to visit", "İlçeler": "Districts", "Kategori": "Category",
    "Bu ilde yer ara… (ör. kale, şelale)": "Search in this province… (e.g. castle, waterfall)",
    "Daha fazla göster": "Show more",
    "Bilgiler: Vikipedi (CC BY-SA 4.0) ve Wikidata. Fotoğraflar: Wikimedia Commons, yazar ve lisansı fotoğrafın altında. Harita: © MapTiler, © OpenStreetMap katkıcıları.":
      "Info: Wikipedia (CC BY-SA 4.0) and Wikidata. Photos: Wikimedia Commons, author and license under each photo. Map: © MapTiler, © OpenStreetMap contributors.",
    // yer kartı
    "Gideceğim yerlere ekle": "Add to my wish list", "Listemden çıkar": "Remove from my list", "Kapat": "Close",
    "Haritada aç": "Open in Maps", "Yol tarifi": "Directions", "Buraya gittim": "I've been here", "✓ Gittim": "✓ Been here",
    "🔊 Dinle": "🔊 Listen", "⏹ Durdur": "⏹ Stop", "Arkadaşına gönder": "Send to a friend",
    "Yakınında bul": "Find nearby", "Vikipedi'de devamını oku": "Read more on Wikipedia",
    "Yemek": "Food", "Kafe": "Cafés", "Konaklama": "Hotels", "Benzin": "Fuel", "Otopark": "Parking",
    // kategoriler, temalar
    "Tarihi": "Historic", "Doğa & Manzara": "Nature & Views", "Müze": "Museum", "Çarşı & Lezzet": "Bazaar & Food", "Şehir & Semt": "City & Quarter",
    "Hepsi": "All", "★ Öne çıkanlar": "★ Highlights", "Öne çıkan": "Highlight", "Önerilen": "Suggested", "En yakın": "Nearest",
    "En yakından uzağa": "Nearest first", "Mesafe için konumu aç": "Turn on location for distance",
    "Şelaleler": "Waterfalls", "Mağaralar": "Caves", "Kanyon ve vadiler": "Canyons & valleys", "Göller": "Lakes",
    "Adalar ve koylar": "Islands & bays", "Milli parklar": "National parks", "Dağlar ve yaylalar": "Mountains & highlands",
    "Kaleler": "Castles", "Tarihi köprüler": "Historic bridges", "Saraylar ve konaklar": "Palaces & mansions",
    "Han ve kervansaraylar": "Inns & caravanserais", "Müzeler": "Museums", "Türkiye geneli": "All of Türkiye",
    // rozetler
    "İlk adım": "First step", "İlk yerine gittin": "You visited your first place", "Gezgin": "Traveler", "10 yere git": "Visit 10 places",
    "Kâşif": "Explorer", "25 yere git": "Visit 25 places", "Efsane gezgin": "Legendary traveler", "50 yere git": "Visit 50 places",
    "Yola düştün": "On the road", "5 ile git": "Visit 5 provinces", "Uzun yolcu": "Long-haul traveler", "20 ile git": "Visit 20 provinces",
    "Türkiye'yi gezdim": "I've seen Türkiye", "81 ilin hepsine git": "Visit all 81 provinces",
    "Şelale avcısı": "Waterfall hunter", "3 şelaleye git": "Visit 3 waterfalls", "Mağara kâşifi": "Cave explorer", "3 mağaraya git": "Visit 3 caves",
    "Kale fatihi": "Castle conqueror", "5 kaleye git": "Visit 5 castles", "Göl sevdalısı": "Lake lover", "3 göle git": "Visit 3 lakes",
    "Doğa dostu": "Nature lover", "3 milli park ya da tabiat parkına git": "Visit 3 national or nature parks",
    "Müze kurdu": "Museum buff", "5 müzeye git": "Visit 5 museums",
    "Marmara": "Marmara", "Ege": "Aegean", "Akdeniz": "Mediterranean", "İç Anadolu": "Central Anatolia", "Karadeniz": "Black Sea",
    "Doğu Anadolu": "Eastern Anatolia", "Güneydoğu": "Southeast",
    "Yeni rozet!": "New badge!", "Süper!": "Great!", "Kazandın": "Earned", "Gezgin rozetleri": "Traveler badges", "Rozetlerin": "Your badges",
    "Henüz rozet yok. Gezdiğin yerleri işaretle, rozet kazan.": "No badges yet. Mark places you've visited to earn badges.",
    // hava
    "Bugün": "Today", "Yarın": "Tomorrow", "Açık": "Clear", "Az bulutlu": "Mostly clear", "Parçalı bulutlu": "Partly cloudy", "Kapalı": "Overcast",
    "Sisli": "Foggy", "Çisenti": "Drizzle", "Dondurucu çisenti": "Freezing drizzle", "Hafif yağmur": "Light rain", "Yağmurlu": "Rain",
    "Kuvvetli yağmur": "Heavy rain", "Dondurucu yağmur": "Freezing rain", "Hafif kar": "Light snow", "Karlı": "Snow", "Yoğun kar": "Heavy snow",
    "Kar": "Snow", "Sağanak": "Showers", "Kuvvetli sağanak": "Heavy showers", "Kar sağanağı": "Snow showers", "Gök gürültülü": "Thunderstorm", "Dolu": "Hail",
    "En iyi yerleri bul": "Find the best spots",
    // tanıtım ve öneri formu
    "81 ili keşfet": "Explore 81 provinces",
    "Her ilde ve ilçede gezilecek yerler, fotoğraflar ve kısa bilgiler seni bekliyor.": "Places to visit in every province and district, with photos and short info.",
    "Yakınındakileri bul": "Find what's nearby",
    "Konumunu açarsan sana en yakın şelaleleri, kaleleri, müzeleri sıralarız.": "Turn on location and we'll list the nearest waterfalls, castles and museums.",
    "Gittiğin yerleri işaretle": "Mark where you've been",
    "\"Buraya gittim\" de, 81 ilden kaçını gezdiğini gör. Beğendiklerini kalple kaydet.": "Tap \"I've been here\" to see how many of the 81 provinces you've visited. Save favorites with the heart.",
    "Geç": "Skip", "İleri": "Next", "Başlayalım": "Let's go",
    "Yer öner": "Suggest a place", "Yerin adı": "Place name", "İl / ilçe": "Province / district", "Neden gidilmeli? (isteğe bağlı)": "Why visit? (optional)",
    "Vazgeç": "Cancel", "Gönder": "Send",
    "Uygulamada olmayan, gidip görülmeye değer bir yer mi biliyorsun? Yaz, inceleyip ekleyelim.": "Know a place worth seeing that's not in the app? Tell us and we'll add it.",
    "Teşekkürler! E-posta uygulaman açılıyor.": "Thanks! Opening your email app.",
    // diğer
    "Konum kapatıldı": "Location turned off", "Bu cihaz konumu desteklemiyor.": "This device doesn't support location.",
    "Konum izni verilmedi. Ayarlardan izin verebilirsin.": "Location permission denied. You can allow it in Settings.",
    "Konum bulunamadı, tekrar dene.": "Couldn't find your location, try again.",
    "Çıkmak için tekrar geri bas": "Press back again to exit",
    "Sonuç bulunamadı.": "No results.", "Aranıyor…": "Searching…", "Bu türde yer bulunamadı.": "No places of this type.",
    "Bu kategoride yer yok.": "No places in this category.",
    "Bu ilçe için henüz fotoğraflı gezi noktası yok. İlin diğer yerlerine göz atabilirsin.": "No places with photos in this district yet. Have a look at the rest of the province.",
    "Bu isimde yer bulunamadı. Tüm Türkiye'de aramak için ana sayfadaki arama kutusunu kullan.": "No place with that name. Use the search box on the home page to search all of Türkiye.",
    "Konumunu açınca sana en yakın yerleri burada canlı mesafeyle göreceksin.": "Turn on location to see the nearest places here with live distance.",
    "Konumuna göre": "Based on your location", "Yakınımdakiler": "Near me", "İl": "Province", "İlçe": "District",
    "Gezilecek yer": "Places", "Nüfus": "Population", "Yüzölçümü": "Area", "Uzaklık": "Distance", "Kuruluş": "Founded", "Yapım": "Built",
    "Rakım": "Elevation", "UNESCO Dünya Mirası": "UNESCO World Heritage", "İpucu:": "Tip:", "Fotoğraf:": "Photo:",
    "Vikipedi (İngilizce)": "Wikipedia", "Vikipedi'de oku": "Read on Wikipedia", "Vikipedi'de (İngilizce) oku": "Read more on Wikipedia",
    "Gitmedin": "Not yet", "Başladın": "Started", "Tüm ilçeler": "All districts", "İlçe bilgisi": "District info",
    "Gezi pasaportu": "Travel passport", "Çocuklarla gezi": "Family days out", "Çocuklarla": "With kids",
    "Nereye gitsem?": "Where should I go?", "Kartları kaydır, beğendiğini listene at": "Swipe the cards, save the ones you like",
    "Hangi ilde?": "Which province?", "Fotoğrafa bak, ili tahmin et": "Look at the photo, guess the province",
    "Hafta sonu kaçamağı": "Weekend getaway", "Arabayla birkaç saatlik iller": "Provinces a few hours' drive away",
    "Listeyi linkle paylaş": "Share list as a link", "Hepsini listeme ekle": "Add all to my list", "Hepsi listende": "All in your list",
    "Paylaşılan liste": "Shared list", "Bu listedeki yerler bulunamadı.": "The places in this list could not be found.",
    "Hafta sonu": "Weekend", "3-4 günlük tatil": "3-4 day holiday", "Konumumu kullan": "Use my location", "Kısa tatil önerisi": "Short break ideas",
    "Bayram kaçamağı": "Holiday getaway", "Nereden yola çıkacağını bilmemiz gerek: konumunu aç ya da önce bir ilin sayfasına gir.": "We need a starting point: turn on location or open a province page first.",
    "Bu mesafede il bulunamadı.": "No provinces found at this distance.", "Sağa kaydır: listene ekle · Sola kaydır: geç · Dokun: ayrıntı": "Swipe right: save · Swipe left: skip · Tap: details",
    "Ayrıntı": "Details", "Listeme ekle": "Add to my list", "LİSTEME": "SAVE", "GEÇ": "SKIP", "Bu turluk bu kadar!": "That's all for this round!",
    "Listeme git": "Go to my list", "Yeni kartlar": "New cards",
    "Hazır rota": "Ready-made route", "📸 Gezi karnemi paylaş": "📸 Share my travel card", "Bugün keşfet": "Today's discovery", "Yakınında keşfet": "Discover nearby"
  };
  window.DIL = dil;
  window.T = (s) => (dil === "en" && EN[s] != null ? EN[s] : s);
  window.TL = (tr, en) => (dil === "en" ? en : tr);
  window.dilDegistir = (d) => { try { localStorage.setItem("gezi-dil", d); } catch (e) {} location.replace(location.pathname + location.search); };
  document.documentElement.lang = dil;
  if (dil !== "en") return;
  // Sayfadaki sabit yazıları çevir (metinler ve placeholder / aria-label / title)
  const cevir = (k) => { const t = k.trim(); return t && EN[t] != null ? k.replace(t, EN[t]) : k; };
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const dugumler = []; while (w.nextNode()) dugumler.push(w.currentNode);
  for (const n of dugumler) if (n.parentNode && n.parentNode.nodeName !== "SCRIPT" && n.parentNode.nodeName !== "STYLE") n.nodeValue = cevir(n.nodeValue);
  for (const el of document.querySelectorAll("[placeholder],[aria-label],[title]"))
    for (const a of ["placeholder", "aria-label", "title"]) if (el.hasAttribute(a)) el.setAttribute(a, cevir(el.getAttribute(a)));
  document.title = "Rota Cepte · Türkiye Travel Guide";
})();
