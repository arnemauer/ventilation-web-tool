# Ventilation Web Tool

Een webapplicatie die rechtstreeks via de browser met een DucoBox praat. Bedoeld als
vervanger van de Windows-servicetools.

Niet gelieerd aan Duco. 'Duco' en 'DucoBox' worden hier alleen genoemd om aan
te duiden met welke apparatuur dit werkt.

**De tool is bereikbaar via:** https://arnemauer.github.io/ventilation-web-tool

## Starten (offline, wanneer je geen internet hebt)

Web Serial werkt alleen op `http://localhost` of `https://`, niet vanaf `file://`.
Start dus een lokale server vanuit deze map:

```bash
python tools/devserver.py 8123 .
```

Dat is `http.server` met `Cache-Control: no-store`. Zonder dat blijft de browser
oude ES-modules hergebruiken na een wijziging, en test je code die je net
vervangen hebt.

Open daarna <http://localhost:8123> in **Chrome of Edge op desktop**.
Firefox en Safari ondersteunen Web Serial niet.

Klik op **Verbinden** en kies de CP210x-poort in de dialoog van de browser.
Vink *alle poorten* aan als de kabel niet in de lijst staat (bijvoorbeeld bij een
andere USB-UART-chip of een Bluetooth-koppeling).

### Zonder hardware: emulatie

Zet het vinkje **emulatie** aan en er verschijnt een keuzelijst met profielen.
De applicatie praat dan met een nagebootste box in de browser — dezelfde
streams, dezelfde ASCII-dialoog, dezelfde timing, alleen geen kabel. Handig om
de applicatie te bekijken, en om te controleren of een wijziging het protocol
niet breekt.

De emulator houdt echt staat vast: wat je wegschrijft lees je terug, en een
waarde buiten het toegestane bereik komt terug als `failed`, net als bij
hardware. Zolang emulatie loopt is dat aan de oranje balk en de badge te zien.

De profielen zijn gemaakt naar drie werkelijke installaties, zodat de nodelijst,
de parameternamen en de waarden overeenkomen met wat je in het veld tegenkomt.
Serienummers zijn geanonimiseerd.

Emulatie werkt ook in browsers zonder Web Serial.

## Wat er in zit

Het linkermenu is de installatie zelf: de box bovenaan, daaronder elke
gekoppelde component met zijn naam. Componenten met communicatiefouten krijgen
een rood telletje.

| Menu-item | Inhoud |
|---|---|
| **Dashboard** | Versie, board, IP, ventilatorsturing, temperaturen, filterstatus |
| **Componenten** | Elke component uit de installatie; klik erop voor gegevens, instellingen en acties |
| **Netwerk (ruw)** | De onbewerkte `Network`-, `netwversion`- en `netwserial`-tabellen |
| **Informatie** | Alle read-only diagnosecommando's op één pagina |
| **Console** | Rechtstreekse commandoregel met autoaanvulling en hex-weergave |
| **Onderhoud** | Klok zetten, logboek wissen, fabrieksinstellingen, netwerk wissen, herstart |

### De componentpagina

Klik een component aan en je krijgt vier blokken: **Gegevens** (wat de box over
die node weet), **Instellingen**, **Plaats in het netwerk** en **Acties op deze
component** (opslaan, fabriekswaarden herstellen, herstarten).

Onder *Plaats in het netwerk* stel je in onder welke component deze hangt
(`NodeSetParent`) en met welke hij is geassocieerd (`NodeSetAsso`). De box moet
daarvoor in installateursmodus; de applicatie zet die zelf aan, voert de
wijziging uit, zet hem weer uit en slaat op — ook als er onderweg iets misgaat.
Dat laatste is niet vrijblijvend: een box die in installateursmodus blijft
staan, laat nieuwe componenten toe.

Welke instellingen je ziet hangt af van wat de component is:

- **De box** krijgt alles. Vrijwel elke instellingsgroep — ventilator,
  ventilatief koelen, nightboost, druk, filter, bypass, vorstbeveiliging,
  ontdooien, warmtepomp, verwarmingssturing, CV- en warmwatervraag,
  boilersturing — is een box-instelling. Die commando's kennen geen nodenummer
  en gelden altijd node 1. Ze staan als tabbladen op de boxpagina.
- **Alle andere componenten** hebben alleen hun eigen nodeconfiguratie
  (`NodeConfigGet <node>`): ventilatieniveaus, setpoints, handmatige standen.

Groepen die het aangesloten toestel niet kent verschijnen niet — `help /all`
bepaalt dat bij het verbinden. De Motor-groep heeft een eigen indexveld naast
de tabbladen, omdat die per motor werkt en niet per node.

### Logboek

De knop **Logboek opslaan** in de balk schrijft alles weg als tekstbestand, met
een naam als `2026-09-16 15.52 log VWT.txt`. Mocht een onderdeel niet werken dan kun je dit log delen via 'Issues'.

## Hoe het werkt

De box spreekt een ASCII-regelprotocol op 115200 baud. Het bijzondere eraan is
dat het **zichzelf beschrijft**:

- `help /all` levert de complete commandolijst van het aangesloten toestel.
- Parameterlijsten dragen hun eigen bereik: `3. Fan Curve: 2 [0:1:4]`.
- Tabellen dragen hun eigen kolomkoppen.
- Keuzewaarden noemen zichzelf: `15. Temp Dependent : ON (1) [0:1:1]` geeft
  zowel de stand als het getal erachter.

Daarom codeert deze app vrijwel niets hard. Bij het verbinden wordt de
commandolijst opgehaald; groepen die het toestel niet kent verschijnen niet.
Parameters komen binnen mét minimum, maximum en stapgrootte, en de invoervelden
nemen die over. Dat betekent dat de app ook werkt op modellen waarmee deze
versie nooit getest is — het toestel vertelt zelf wat het kan.

De volledige protocolbeschrijving staat in [PROTOCOL.md](PROTOCOL.md).

## Herkomst van de protocolkennis

Het protocol is niet gepubliceerd. Wat hier staat is op twee manieren
vastgesteld.

**Meeluisteren op de seriële lijn.** Het verkeer tussen de Windows-servicetool
en de box is meegelezen tijdens normaal gebruik: verbinden, uitlezen,
instellingen wijzigen, opslaan. Daaruit volgen de vorm van de commando's, de
volgorde waarin ze horen te gaan, de timing die de box nodig heeft, en hoe een
antwoord wordt afgesloten.

**Het toestel zelf uitvragen.** Omdat het protocol zichzelf beschrijft, levert
de seriële verbinding de rest. `help /all` geeft de commandolijst van het
aangesloten toestel. Elke `...ParaGet` geeft zijn parameters met naam, waarde,
bereik en stapgrootte. Waar een parameter een keuze is, staat het woord én het
getal in het antwoord. De menu's zijn zo systematisch afgelopen, per groep en
per node.

De combinatie is nodig: meeluisteren laat zien wat er moet gebeuren en in welke
volgorde, uitvragen laat zien wat er te halen valt op een specifiek toestel.

Een aantal tabellen in `js/` is nog niet langs deze weg vastgesteld en moet nog
worden nagemeten op hardware; welke dat zijn staat in [TODO.md](TODO.md).

## Opbouw

```
index.html          UI-shell
css/app.css         styling, licht en donker
js/serial.js        Web Serial transport — poort, timing, commando's, discovery
js/protocol.js      parsers: parameterlijsten, tabellen, secties, key/value
js/groups.js        landkaart van de commando-oppervlakte
js/products.js      typecode/productcode -> naam, en de componentnamen zelf
js/emulator.js      nagebootste box achter een SerialPort-façade
js/app.js           UI-logica

  gegenereerde gegevenstabellen:
js/fixtures.js      emulatieprofielen naar werkelijke installaties
js/ducoNames.js     productcodes en uitgebrachte firmwareversies
js/paramMeta.js     labels, hulpteksten en keuzelijsten per parameter
js/nodeParaLists.js genummerde parameters per printtype

tools/              de generatoren, plus labels_nl.py met de eigen teksten
```

Geen build, geen dependencies, geen framework. Het zijn ES-modules die de
browser rechtstreeks laadt.

De Nederlandse labels, toelichtingen en keuzewoorden staan in
`tools/labels_nl.py` en zijn eigen werk. Van de 109 instellingen hebben er 62
een toelichting; de rest heeft alleen een naam. Waar niet met zekerheid te
zeggen valt wat een instelling doet, is geen uitleg beter dan een verzonnen
uitleg — het gaat om een ventilatiesysteem.

## Details die ertoe doen

**Byte-voor-byte schrijven.** Commando's gaan met 1 ms pauze per byte naar de
box. Een burst loopt de parser in de firmware voorbij. Niet wegoptimaliseren.
De pauze loopt op de klok in plaats van op een timer, omdat browsers timers in
een achtergrondtabblad tot één tick per seconde afknijpen.

**Einde van een antwoord.** De box sluit af met zijn prompt: een `>` direct
achter een regeleinde. Daarop wachten is de enige betrouwbare manier. Een echte
box stuurt zijn antwoord namelijk in brokken met gaten van honderden
milliseconden — soms midden in het commando-echo — dus een stilte betekent niet
dat hij klaar is. Breken op stilte laat de rest van het antwoord op het
volgende commando belanden, en dan schuift alle uitvoer een plaats op.

**Opslaan na schrijven.** Elke geslaagde parameterwijziging wordt gevolgd door
`NodeSaveData` op de juiste node. Zonder dat overleeft de wijziging geen
herstart. De app doet dit automatisch, één keer per node na een reeks
wijzigingen in plaats van na elke afzonderlijke.

**Eén commando tegelijk.** De seriële poort is exclusief. Alle verkeer loopt
door een interne wachtrij, zodat twee schermen elkaar niet in de weg zitten.

**Ingrijpende commando's** (`ResetToDefaults`, `NetworkClear`, `NodeReset`, …)
vragen altijd eerst om bevestiging, ook wanneer ze via de console worden
getypt.

## Wat nog niet gebouwd is

Zie [TODO.md](TODO.md) voor de volledige stand: wat af is, wat nog op hardware
bevestigd moet worden, en wat bewust buiten deze versie is gelaten
(firmware-uploaden bovenaan — dat kan een toestel onbruikbaar maken).
