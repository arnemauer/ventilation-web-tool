# Seriële protocolspecificatie

Beschrijving van het ASCII-protocol waarmee een DucoBox over de USB-seriële
kabel te bedienen is.

Vastgesteld op twee manieren: door mee te lezen op de lijn terwijl de
Windows-servicetool met de box praatte, en door het toestel zelf uit te vragen.
Wat hier staat is gecontroleerd tegen sessielogboeken van werkende
installaties.

Het protocol blijkt over meerdere generaties servicetools onveranderd: 115200
8N1, byte voor byte met 1 ms pauze. Wel is de uitvoer per firmwareversie iets
verschillend opgemaakt; waar dat speelt staat het erbij.

## Fysieke laag

| Eigenschap | Waarde |
|---|---|
| Chip | Silicon Labs CP210x USB-to-UART Bridge |
| Baudrate | 115200 |
| Databits / pariteit / stopbits | 8 / none / 1 (SerialPort-defaults) |
| Read timeout | 100 ms |
| Write timeout | 2000 ms |
| Regelscheider bij lezen | `\r` |

**Web Serial-equivalent:** filter op USB vendor/product ID van de CP210x
(VID `0x10C4`, PID `0xEA60`) in `navigator.serial.requestPort()`.

## Commando's schrijven

Commando's worden **byte voor byte** geschreven met **1 ms pauze** tussen elke byte.
Dat is geen toeval: de firmware-parser loopt achter bij een burst.

```
cmd = cmd.trim() + "\r\n"      // alleen toevoegen als nog niet aanwezig
for (byte of cmd) { write(byte); sleep(1ms); }
```

## Antwoorden lezen

Er is een terminator: **de prompt**. De box stuurt een `>` direct achter een
regeleinde zodra hij klaar is voor het volgende commando. Lees byte voor byte en
stop zodra de uitvoer eindigt op `\r>`, `\n>` of `\r\n>`; gooi daarna de
invoerbuffer leeg.

Een box stuurt zijn antwoord in brokken met gaten tot bijna een seconde — soms midden in het
commando-echo.

### LOG DATA LOST

Verschijnt de tekst `LOG DATA LOST` in de uitvoer, dan heeft de box regels laten
vallen en is het antwoord onbetrouwbaar. De buffers leegmaken en het resultaat
weggooien.

### Eindtriggers

Een antwoord is compleet zodra een van deze in de tekst voorkomt (case-insensitive):

| Trigger | Betekenis |
|---|---|
| `done` | commando geslaagd |
| `failed` | commando mislukt |
| `unknown cmd` | commando bestaat niet op dit toestel |
| `incorrect cmd arguments` | verkeerde argumenten |

Sommige commando's gebruiken een eigen eindtrigger, bv. `--- end list ---` (Network),
`end list` (netwversion, netwserial), `--------` (help /all).

De echo van het verzonden commando komt terug als eerste regel(s) en wordt weggeknipt:
alles t/m de regel die gelijk is aan het commando zelf wordt verwijderd.

## Command discovery

`help /all` geeft de volledige commandolijst van het aangesloten toestel, eindtrigger
`--------`. De tool neemt het eerste woord van elke regel als commandonaam en filtert
regels met `------`, `Command`, `Use:` en `>`. Elk commando wordt vóór verzending
gecontroleerd tegen deze lijst.

Dit betekent: **de webapp hoeft niets hard te coderen** — het toestel vertelt zelf
wat het kan.

## Parameterlijsten — het kernpatroon

30 functiegroepen volgen exact hetzelfde patroon: `<Groep>ParaGet` / `<Groep>ParaSet`.

### Lezen

```
> FanParaGet
1. Some Parameter Name: 42 [0:1:100]
2. Another Param: 7 [0:20]
```

Er is niet één regelformaat maar een handvol varianten, afhankelijk van
firmwareversie en groep. Dit zijn de vormen die zijn waargenomen:

```
3. Fan Curve: 2 [0:1:4]                  naam en waarde gescheiden door ':'
2. Exhaust Flow Nominal: 300 m3/h [0:25:600]   met eenheid
1. ENABLE 1 [0:1:1]                      géén ':' — waarde is het eerste getal
12. Q OUT 265 [0:5:265]                  idem
2. TEMP START 22C [0:1:40]               eenheid aan de waarde vastgeplakt
5. TIME START 1320 ( 22u00) [0:5:1435]   met toelichting tussen haakjes
7. CUTOFF REQUEST 80% [0:5:100]          procentteken vastgeplakt
0. ADDRESS : 1 [1-253]                   bereik met een streepje, geen stap
1. ACTIVE : TRUE                         nieuwere firmware: woord in plaats van 0/1
3. START MONTH : April                   nieuwere firmware: maandnaam
5. START TIME : 22:00                    nieuwere firmware: klokstand
4. Max Speed: 3200 rpm                   geen bereik: alleen lezen
```

Een parser die dit allemaal aankan:

1. Match `^\s*(\d+)\.\s+(.+)$` → nummer en de rest.
2. **Haal eerst het bereik eraf.** Anders gaat de dubbele punt in `[0:1:4]` door
   voor de scheiding tussen naam en waarde.
   - `[min:step:max]` — drie delen.
   - `[min-max]` — twee delen, stapgrootte 1. Alleen Modbus gebruikt deze vorm.
   - Geen bereik: de parameter is alleen-lezen.
3. Staat er een `:` in de rest, dan is dat de scheiding tussen naam en waarde.
   Zo niet, dan is de waarde het eerste getal en is alles ervoor de naam.
4. `TRUE`/`FALSE` betekent 1 en 0; de set-kant verwacht nog steeds een getal.
5. Een eenheid staat direct achter de waarde, vastgeplakt (`22C`, `80%`) of
   met een spatie (`300 m3/h`). Tekst tussen haakjes is toelichting.

Let op de spelfout `OFFFSET` in de Modbus-uitvoer — die zit in de firmware zelf,
dus daar moet je op matchen.

### Schrijven

```
<groep>ParaSet [node] [paraGroup] <id> <waarde>
```

`node` en `paraGroup` worden alleen meegestuurd als ze gezet zijn. Na een
succesvolle set volgt **altijd** een `NodeSaveData <node>` (standaard node 1) na
ongeveer 500 ms — anders overleeft de wijziging een herstart niet.

Wachten op `done` / `failed`, 5 pogingen.

### De parametergroepen

Dit zijn de groepen die op de onderzochte toestellen voorkwamen. Welke een
specifieke box werkelijk kent, staat in `help /all`.

| Get | Set |
|---|---|
| `FanParaGet` | `FanParaSet` |
| `SensorCtrlParaGet` | `SensorCtrlParaSet` |
| `VentCtrlParaGet` | `VentCtrlParaSet` |
| `VentCoolParaGet` | `VentCoolParaSet` |
| `NightBoostParaGet` | `NightBoostParaSet` |
| `SettingsParaGet` | `SettingsParaSet` |
| `PressureParaGet` | `PressureParaSet` |
| `FilterParaGet` | `FilterParaSet` |
| `BypassParaGet` | `BypassParaSet` |
| `FreezeprotectParaGet` | `FreezeprotectParaSet` |
| `HeatPumpParaGet` | `HeatPumpParaSet` |
| `HeatingCtrlParaGet` | `HeatingCtrlParaSet` |
| `HygroParaGet` | `HygroParaSet` |
| `EevParaGet` | `EevParaSet` |
| `EevCtrlParaGet` | `EevCtrlParaSet` |
| `BoilerCtrlParaGet` | `BoilerCtrlParaSet` |
| `circpumpparaget` | `circpumpparaset` |
| `CentralHumCtrlparaget` | `CentralHumCtrlparaset` |
| `CVPumpControlParaGet` | `CVPumpControlParaSet` |
| `DefrostParaGet` | `DefrostParaSet` |
| `chdemandparaget` | `chdemandparaset` |
| `dhwdemandparaget` | `dhwdemandparaset` |
| `MotorParaGet <n>` | `MotorParaSet` |
| `WeatherStationParaGet` | `WeatherStationParaSet` |
| `IoParaGet` | `ioParaSet` |
| `ModbusParaGet` | `modbusParaSet` |
| `NodeConfigGet <node>` | `nodeConfigSet` |
| — | `nodeParaSet` |
| — | `FanCalibSet` |
| — | `CommDllSetReg` |

`IoParaGet` levert meerdere secties in één antwoord, gescheiden door kopregels
van de vorm `<NAAM> (<nr>) [RW|RO]`:

```
MODBUS PARA (0) [RW]
ETHERNET PARA (1) [RW]
ETHERNET INFO (2) [RO]
BOARD INFO (3) [RO]
```

Op oudere firmware heet `ETHERNET` hier `PICOTCP`. De `[RO]`-secties zijn
alleen-lezen; daarbinnen staan onder meer `IP ADDRESS`, `NETWORK MASK`,
`DEFAULT GATEWAY`, `MAC ADDRESS`, `DHCP ACTIVE : <woord> (<0|1>)` en in
`BOARD INFO` de velden `SW PRODUCT`, `SW VERSION`, `SW REVISION`, `SW TEST`,
`UPTIME` en `SERIAL NUMBER`.

## Losse parameters

```
> NodeParaGet <node> <para>
... --> 42
```
Antwoord bevat een regel met `-->`; de waarde staat achter de `>`. Eindtrigger
`done`/`failed`, timeout 10 s, 3 pogingen. Faalt alles, dan is het resultaat `-99`.

```
> NodeParaList
1 - some name
2 - other name
```
Splitst op `-`: nummer links, naam rechts (lowercase).

## Tabellen

`Network`, `netwversion`, `netwserial` leveren pipe-gescheiden tabellen met een
**kopregel die de kolomnamen bevat**. De parser leest die kopregel om
kolomindex → veldnaam te mappen; kolomvolgorde ligt dus niet vast.

`Network` — kolommen o.a. `node`, `netw`, `addr`, `sub`, `type`, `ptcl`, `cerr`,
`prnt`, `asso`, `stts`, `stat`. Minimaal 16 kolommen, eindtrigger `--- end list ---`.

- `netw`: `rf` | `wi` (wired) | `virt` (virtueel)
- `stat`: `auto`/`aut0` = automatisch, `aut1` = boost 10 min, enz.

`netwversion` / `netwserial` — kopregel herkend aan `node` + `version`; waarde staat
in kolom 2.

## Overige commando's

Circa 120 letterlijke commando's, waaronder:

`boardinfo` `nodeinfo` `swversion` `network_info` `Network` `NetworkClear`
`ResetToDefaults` `reset` `NodeReset` `NodeSaveData` `nodeLoadDefaults`
`FanInfo` `FanSpeed` `FanGetSpeed` `FanSetTarget` `FanCalibStart` `FanCalibStop`
`SensorInfo` `temperatureinfo` `pressureinfo` `filterinfo` `bypassinfo`
`heatpumpinfo` `heatpumperrorlog` `StatusMonitorInfo` `LogPrint` `LogClear`
`RtcGetTime` `RtcSetTime` `TestMode` `SdcardInfo` `SwUploadStatus`
`ServerCertGenKeys` `ServerCertGenCsr` `WifiKeySet` `DucoSerialSet`

Dit is wat op de onderzochte toestellen voorkwam. `help /all` geeft altijd de
lijst van het aangesloten toestel; die is leidend.

## Identificatie

`swversion` antwoordt met `<productcode>.<major>.<minor>.<patch>`, waarbij de
productcode **precies vijf cijfers** is (`(?<productId>\d{5})\.(?<rev>\d+\.\d+\.\d+)`).
Voor andere nodes komt de productcode uit `NodeParaGet <node> 0`.

Serienummers hebben twee vormen, die het soort toestel verraden:

| Patroon | Betekenis |
|---|---|
| `RS` + 10 cijfers | reeks die o.a. op DucoBox Silent voorkomt |
| `PS` + 10 cijfers | reeks die o.a. op DucoBox Energy voorkomt |

## Nieuwere adressering

Nieuwere boxen hanteren naast de genummerde parameters een
puntpad-notatie: `<module>.<subModule>.<parameter>` of `<module>.<parameter>`,
bijvoorbeeld `General.Modbus.Addr`, `General.Lan.StaticIp`, `General.Lan.Dhcp`.
Die namen worden aan dezelfde terminalcommando's gekoppeld; het is een laag
erbovenop, geen ander protocol. Over de seriële lijn verandert er niets.

## Installateursmodus

In installateursmodus laat de box nieuwe componenten toe en kun je ze afmelden.
Zonder die modus weigert hij dat, en sommige parametergroepen antwoorden dan met
`Device Locked` gevolgd door `Failed`.

| Commando | Betekenis |
|---|---|
| `InstallerSet 1` | modus aan |
| `InstallerSet 0` | modus uit |
| `CommInfo` | leest onder meer de huidige stand |

De stand staat in de uitvoer van `CommInfo` op de regel met `install state`:
de waarde **2** betekent dat de modus actief is. Diezelfde uitvoer bevat
`module in asso`, `module in parent` en `module to replace`. De opmaak verschilt
per firmware, dus zoek op het label en neem het eerste getal van die regel.

Netwerkwijzigingen horen hier consequent in gewikkeld te worden; zo doet de
servicetool het op de lijn ook:

```
InstallerSet 1      →  2 s wachten
<de handeling>      →  bv. NodeSetAsso, NodeSetParent, NetworkClear
                       1 s wachten
InstallerSet 0
NodeSaveData <node>
```

De wachttijd van twee seconden is nodig: de box neemt de nieuwe stand niet
onmiddellijk aan. Op de lijn is te zien dat de servicetool dat bij een
netwerkreset zelfs in een lus controleert — tot vijf keer `InstallerSet 1` met
twee seconden ertussen, tot `CommInfo` bevestigt dat de modus staat.

Laat de box niet in installateursmodus achter.

`GuiEnterInstaller a` is een ander commando (`Enter/exit installer`), dat
vermoedelijk het installateursmenu op het display van de box bedient — daar
wordt normaal een toegangscode ingevoerd. Nog niet geverifieerd.

## Gevaarlijke commando's

Deze wijzigen of wissen persistente staat. In de webapp achter een bevestiging zetten:

`ResetToDefaults` `NetworkClear` `NodeReset` `reset` `DataClear` `LogClear`
`nodeLoadDefaults` `DucoSerialSet` `WifiKeySet` `SwUploadRestart` `SdCardReset`
`ServerCertStoreFlash` `TestMode`
