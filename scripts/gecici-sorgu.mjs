// Geçici: kaybolan yerlerin Wikidata kayıtlarına bakar (sınıf, madde, parçası, kapanış, fotoğraf, koordinat)
const Q = "Q118958180 Q118946561 Q61076331 Q139419209 Q119166396 Q49314090 Q49309759 Q110779563 Q127643024 Q61076466 Q20717664 Q139437289".split(" ");
const q = `SELECT ?p ?pL ?cls ?clsL ?tr ?en ?parca ?bitis ?img ?coord WHERE {
  VALUES ?p { ${Q.map((x) => "wd:" + x).join(" ")} }
  OPTIONAL { ?p wdt:P31 ?cls }
  OPTIONAL { ?tr schema:about ?p ; schema:isPartOf <https://tr.wikipedia.org/> }
  OPTIONAL { ?en schema:about ?p ; schema:isPartOf <https://en.wikipedia.org/> }
  OPTIONAL { ?p wdt:P361 ?parca } OPTIONAL { ?p wdt:P576 ?bitis } OPTIONAL { ?p wdt:P18 ?img } OPTIONAL { ?p wdt:P625 ?coord }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "tr,en". } }`;
const r = await fetch("https://query.wikidata.org/sparql", { method: "POST", headers: { "User-Agent": "RotaCepte/6.5 (mertturanlioglu.apps@gmail.com)", Accept: "application/sparql-results+json", "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ query: q }) });
const j = await r.json();
for (const b of j.results.bindings) console.log([b.p, b.pL, b.cls, b.clsL, b.tr, b.en, b.parca, b.bitis, b.img ? { value: "foto" } : null, b.coord ? { value: "konum" } : null].map((x) => (x ? x.value.replace("http://www.wikidata.org/entity/", "") : "-")).join(" | "));
