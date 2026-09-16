# TODO

## Open

### Te bevestigen op de hardware

Alles hieronder is gebouwd en werkt tegen de emulator, maar de emulator is
gemaakt naar mijn begrip van het protocol. Deze punten kunnen alleen aan de
kabel worden vastgesteld.

- **Vergrendelde groepen.** `FanParaGet` gaf `Device Locked / Failed`. De app
  toont dat nu als een aanwijzing naar de installateursmodus, die op dezelfde
  pagina staat. Of `InstallerSet 1` die groepen ook echt vrijgeeft is niet
  geverifieerd — net zomin als of de modus vanzelf vervalt.
- **`GuiEnterInstaller`.** Vermoedelijk het installateursmenu op het display
  van de box, waar normaal code 9876 wordt ingevoerd. 
- **Losse parameters.** De nummers per printtype zijn niet op hardware
  nagemeten. Een verkeerd nummer schrijft naar de verkeerde parameter, dus dit
  scherm is met terughoudendheid te gebruiken tot het is nagelopen.
- **Foutcodes** zoals `E56.31.01` worden getoond maar niet verklaard. In het document "Duco Ventilation Error Codes and Troubleshooting Guide" is de betekenis van de codes terug te vinden.

### Nog niet gebouwd

- **Firmware-uploaden** (`SwUpload*`, SD-kaart). Meerstaps binair protocol met
  reëel risico op een onbruikbaar toestel bij een afgebroken overdracht.
  Bewust buiten deze versie gelaten.
- **Ventilatorkalibratie-wizard** (`FanCalibStart`/`Next`/`Stop`). De
  parameters zitten in de groep Ventilatorkalibratie; de interactieve
  procedure niet.
- **Tijdprogramma's.** `TimeProgramInfo` staat op de informatiepagina, maar
  `TimeProgramPoints` en `TimeProgramGetValue` hebben een eigen scherm nodig en
  hun uitvoerformaat is nog niet vastgesteld.
- **Componenten aan- en afmelden.** `NodeSetParent` en `NodeSetAsso` zitten er
  nu in, onder *Plaats in het netwerk* op de componentpagina. Wat nog ontbreekt
  is `NodeRemoveSlave` (afmelden).

### Nog te bevestigen: netwerkstructuur wijzigen

`NodeSetParent` en `NodeSetAsso` zijn gebouwd volgens het patroon dat op de
lijn is waargenomen (installateursmodus aan, wachten, wijzigen, wachten, modus
uit, opslaan) en werken tegen de emulator. Op echte hardware is het niet geprobeerd. Dit
verplaatst componenten in een werkende installatie, dus dat is iets om rustig
en met een logboek ernaast te doen.

### Tabellen die nog nagemeten moeten worden

De README beschrijft twee bronnen: meeluisteren op de lijn en het toestel
uitvragen. Voor het protocol zelf klopt dat. Vier gegevenstabellen zijn
daarentegen nog niet langs die weg vastgesteld, en die moeten nog worden
nagemeten voordat die beschrijving volledig opgaat:

- **`js/paramMeta.js`** — de koppeling tussen de korte naam die de box geeft
  (`automin`, `q out`) en de bijbehorende instelling, en welke keuzelijst bij
  welke parameter hoort. Na te meten: de box noemt bij een keuzewaarde zowel
  het woord als het getal (`AUTO (2)`), dus de lijsten zijn per parameter op te
  bouwen door de waarden langs te lopen. De Nederlandse teksten zijn al eigen
  werk en hoeven niet opnieuw.
- **`js/nodeParaLists.js`** — de genummerde parameters per printtype. Na te
  meten met een sweep van `NodeParaGet <node> <nr>` over het bereik, per
  componenttype.
- **`js/ducoNames.js`** — productcode naar toestelnaam, en de uitgebrachte
  firmwareversies. Grotendeels na te meten: `swversion` en `netwversion` geven
  de productcode van elk aangesloten toestel. Vergt wel toegang tot meer dan
  één installatie.
- **`js/fixtures.js`** — de emulatieprofielen komen uit opgeslagen
  installatiebestanden. 


  (`tools/labels_nl.py`). Waar niet met zekerheid te zeggen valt wat een
  instelling doet, staat er alleen een naam en geen omschrijving — 62 van de
  109 hebben een toelichting.
- **Componentnamen** staan in een eigen tabel in `products.js`.
- **Dev-server zonder cache** (`tools/devserver.py`), omdat de browser anders
  oude modules blijft hergebruiken na een wijziging.
