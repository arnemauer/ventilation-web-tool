/*
 * paramMeta.js — labels, hulpteksten en keuzelijsten per parameter.
 *
 * De box geeft over de seriële lijn alleen een korte naam ('automin', 'q out').
 * Deze tabel koppelt die naam aan de bijbehorende instelling, en daarmee aan
 * een leesbaar label, een toelichting en waar van toepassing een keuzelijst.
 *
 * De koppeling zelf (welke naam bij welke instelling hoort, welke waarden een
 * keuzelijst kent, in welke categorie iets valt) is interface-informatie en is
 * nog niet volledig op hardware nagemeten; zie TODO.md.
 *
 * De Nederlandse teksten komen uit tools/labels_nl.py en zijn eigen werk.
 *
 * Gegenereerd — niet met de hand bewerken. Zie tools/genparammeta.py.
 */

export const SETTINGS = {
 "NodeConfigAutomaticMinimum": {
  "label": "Minimumstand automatisch",
  "help": "Laagste ventilatiestand die de automatische regeling gebruikt.",
  "category": "Ventilation",
  "group": "NodeConfig"
 },
 "NodeConfigAutomaticMaximum": {
  "label": "Maximumstand automatisch",
  "help": "Hoogste ventilatiestand die de automatische regeling gebruikt.",
  "category": "Ventilation",
  "group": "NodeConfig"
 },
 "NodeConfigMaximumFlow": {
  "label": "Maximaal debiet",
  "help": "Maximale capaciteit van deze component binnen zijn zone, in m³/h.",
  "category": "Ventilation",
  "group": "NodeConfig"
 },
 "CapacityBox": {
  "label": "Capaciteit box",
  "help": "Maximale capaciteit van de box. Op 0 rekent de box zelf met de som van de zones.",
  "category": "Ventilation",
  "group": "NodeConfig"
 },
 "NodeConfigManualButton1": {
  "label": "Handstand 1",
  "help": "Ventilatiestand bij de eerste handmatige knop.",
  "category": "Ventilation",
  "group": "NodeConfig"
 },
 "NodeConfigManualButton2": {
  "label": "Handstand 2",
  "help": "Ventilatiestand bij de tweede handmatige knop.",
  "category": "Ventilation",
  "group": "NodeConfig"
 },
 "NodeConfigManualButton3": {
  "label": "Handstand 3",
  "help": "Ventilatiestand bij de derde handmatige knop.",
  "category": "Ventilation",
  "group": "NodeConfig"
 },
 "NodeConfigManualTime": {
  "label": "Nalooptijd handstand",
  "help": "Hoe lang een handmatige stand blijft staan voordat de box terugvalt op automatisch.",
  "category": "Ventilation",
  "group": "NodeConfig"
 },
 "NodeConfigSensorVisualisationLevel": {
  "label": "Sensorweergave",
  "help": "Vanaf welke sensorwaarde de bedieningsschakelaar dat met kleur laat zien. Op 0 blijft de weergave uit.",
  "category": "Ventilation",
  "group": "NodeConfig"
 },
 "NodeConfigUserControllerErrorMode": {
  "label": "Foutweergave bedieningsschakelaar",
  "help": "Of de bedieningsschakelaar storingen van de installatie toont.",
  "category": "Ventilation",
  "group": "NodeConfig",
  "options": [
   {
    "value": 0,
    "label": "Uitgeschakeld"
   },
   {
    "value": 1,
    "label": "Bij invoer"
   },
   {
    "value": 2,
    "label": "Automatisch"
   }
  ],
  "enum": "UserControllerErrorModes"
 },
 "FrostProtectHeaterAllowed": {
  "label": "Voorverwarmer toegestaan",
  "help": "Of de vorstbeveiliging de interne voorverwarmer mag gebruiken, als die aanwezig is.",
  "category": "FrostProtect",
  "group": "FrostProtect",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "BypassMode": {
  "label": "Bypassstand",
  "help": "Bedrijfsstand van de bypassklep.",
  "category": "Bypass",
  "group": "Bypass",
  "options": [
   {
    "value": 0,
    "label": "Automatisch"
   },
   {
    "value": 1,
    "label": "Dicht"
   },
   {
    "value": 2,
    "label": "Open"
   }
  ],
  "enum": "OpenCloseAutoModes"
 },
 "BypassAdaptiveControl": {
  "label": "Adaptieve bypassregeling",
  "help": "Of de bypass zich aanpast aan de gemeten temperaturen in plaats van een vaste drempel te volgen.",
  "category": "Bypass",
  "group": "Bypass",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "HeatingCtrlInstallationType_OLD": {
  "label": "Installatietype (oud)",
  "category": "EcoGeneral",
  "group": "HeatingCtrl",
  "options": [
   {
    "value": 0,
    "label": "AE"
   },
   {
    "value": 1,
    "label": "HY"
   }
  ],
  "enum": "HeatingCtrlInstallationTypes_OLD"
 },
 "HeatingCtrlInstallationType": {
  "label": "Installatietype",
  "category": "EcoGeneral",
  "group": "HeatingCtrl",
  "options": [
   {
    "value": 0,
    "label": "Niet ingesteld"
   },
   {
    "value": 1,
    "label": "AE"
   },
   {
    "value": 2,
    "label": "AE Lite"
   },
   {
    "value": 3,
    "label": "HY"
   },
   {
    "value": 4,
    "label": "Vrij"
   }
  ],
  "enum": "HeatingCtrlInstallationTypes"
 },
 "CVPumpControlOverrunTime": {
  "label": "Nalooptijd cv-pomp",
  "help": "Hoe lang de cv-pomp doordraait nadat de vraag is weggevallen.",
  "category": "EcoGeneral",
  "group": "CVPumpControl"
 },
 "CHDemandMode": {
  "label": "Stand cv-vraag",
  "help": "Hoe de vraag naar centrale verwarming wordt bepaald.",
  "category": "CentralHeatingDemand",
  "group": "CentralHeatingDemand",
  "options": [
   {
    "value": 0,
    "label": "Automatisch"
   },
   {
    "value": 1,
    "label": "Handmatig uit"
   },
   {
    "value": 2,
    "label": "Boost"
   }
  ],
  "enum": "EcoDemandModes"
 },
 "CHDemandHeatCurveMinusTen": {
  "label": "Stooklijn bij −10 °C",
  "help": "Gewenste aanvoertemperatuur wanneer het buiten −10 °C is.",
  "category": "CentralHeatingDemand",
  "group": "CentralHeatingDemand"
 },
 "CHDemandHeatCurvePlusTwenty": {
  "label": "Stooklijn bij +20 °C",
  "help": "Gewenste aanvoertemperatuur wanneer het buiten +20 °C is.",
  "category": "CentralHeatingDemand",
  "group": "CentralHeatingDemand"
 },
 "CHDemandBoostTemperature": {
  "label": "Boosttemperatuur cv",
  "help": "Aanvoertemperatuur in de boost-stand.",
  "category": "CentralHeatingDemand",
  "group": "CentralHeatingDemand"
 },
 "CHDemandOffTemperature": {
  "label": "Uitschakeltemperatuur cv",
  "help": "Buitentemperatuur waarboven de cv-vraag vervalt.",
  "category": "CentralHeatingDemand",
  "group": "CentralHeatingDemand"
 },
 "DHWDemandMode": {
  "label": "Stand warmwatervraag",
  "help": "Hoe de vraag naar warm tapwater wordt bepaald.",
  "category": "DomesticHotWaterDemand",
  "group": "DomesticHotWaterDemand",
  "options": [
   {
    "value": 0,
    "label": "Automatisch"
   },
   {
    "value": 1,
    "label": "Handmatig uit"
   },
   {
    "value": 2,
    "label": "Boost"
   }
  ],
  "enum": "EcoDemandModes"
 },
 "DHWDemandComfortTemperature": {
  "label": "Comforttemperatuur tapwater",
  "category": "DomesticHotWaterDemand",
  "group": "DomesticHotWaterDemand"
 },
 "DHWDemandEcoTemperature": {
  "label": "Zuinigtemperatuur tapwater",
  "category": "DomesticHotWaterDemand",
  "group": "DomesticHotWaterDemand"
 },
 "DHWDemandBoostTemperature": {
  "label": "Boosttemperatuur tapwater",
  "category": "DomesticHotWaterDemand",
  "group": "DomesticHotWaterDemand"
 },
 "DHWDemandOffTemperature": {
  "label": "Uitschakeltemperatuur tapwater",
  "category": "DomesticHotWaterDemand",
  "group": "DomesticHotWaterDemand"
 },
 "NodeConfigCo2Setpoint": {
  "label": "CO₂-instelpunt",
  "help": "Waarde in ppm waarboven deze component meer gaat ventileren.",
  "category": "Sensor",
  "group": "NodeConfig"
 },
 "NodeParaCo2Algoritme": {
  "label": "CO₂-algoritme",
  "help": "Welke regelstrategie de CO₂-sturing volgt.",
  "category": "Sensor",
  "group": "ParaSet",
  "options": [
   {
    "value": 0,
    "label": "Luchtkwaliteit"
   },
   {
    "value": 1,
    "label": "Toiletdetectie"
   }
  ],
  "enum": "Co2Algoritmes"
 },
 "NodeConfigRhSetpoint": {
  "label": "Vochtinstelpunt",
  "help": "Relatieve vochtigheid in procent waarboven deze component meer gaat ventileren.",
  "category": "Sensor",
  "group": "NodeConfig"
 },
 "NodeConfigRhDelta": {
  "label": "Vochtsturing op verandering",
  "help": "Reageren op een snelle stijging van de vochtigheid in plaats van alleen op het instelpunt.",
  "category": "Sensor",
  "group": "NodeConfig",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "NodeConfigTemperatureDependent": {
  "label": "Temperatuurafhankelijk",
  "help": "De automatische regeling houdt rekening met de buitentemperatuur.",
  "category": "Sensor",
  "group": "NodeConfig",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "SensorCtrlCo2Setpoint": {
  "label": "CO₂-instelpunt (centraal)",
  "help": "CO₂-instelpunt voor de hele installatie.",
  "category": "Sensor",
  "group": "SensorCtrl"
 },
 "SensorCtrlRhSetpoint": {
  "label": "Vochtinstelpunt (centraal)",
  "help": "Vochtinstelpunt voor de hele installatie.",
  "category": "Sensor",
  "group": "SensorCtrl"
 },
 "SensorCtrlRhDelta": {
  "label": "Vochtsturing op verandering (centraal)",
  "category": "Sensor",
  "group": "SensorCtrl",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "SensorCtrlTemperatureDependent": {
  "label": "Temperatuurafhankelijk (centraal)",
  "category": "Sensor",
  "group": "SensorCtrl",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "CentralHumCtrlEnabled": {
  "label": "Centrale vochtregeling",
  "help": "Vochtregeling op installatieniveau in- of uitschakelen.",
  "category": "Sensor",
  "group": "CentralHumCtrl",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "NodeConfigSwitchSensorSwitchMode": {
  "label": "Functie schakelcontact",
  "help": "Waarvoor het schakelcontact wordt gebruikt.",
  "category": "Switch",
  "group": "NodeConfig",
  "options": [
   {
    "value": 0,
    "label": "Overrulen"
   },
   {
    "value": 1,
    "label": "Warmtepomp"
   },
   {
    "value": 2,
    "label": "Aanwezigheid"
   }
  ],
  "enum": "SwitchModes"
 },
 "NodeConfigSwitchSensorSwitchValue": {
  "label": "Stand bij schakelen",
  "help": "Ventilatiestand zolang het contact gesloten is.",
  "category": "Switch",
  "group": "NodeConfig"
 },
 "NodeConfigSwitchSensorOverrunTime": {
  "label": "Nalooptijd schakelcontact",
  "help": "Hoe lang de stand blijft staan nadat het contact weer opent.",
  "category": "Switch",
  "group": "NodeConfig"
 },
 "NodeConfigActuatorRange": {
  "label": "Slaglengte actuator",
  "help": "Aantal stappen tussen dicht en volledig open.",
  "category": "Actuator",
  "group": "NodeConfig"
 },
 "NodeConfigActuatorHybridValue": {
  "label": "Hybride waarde actuator",
  "category": "Actuator",
  "group": "NodeConfig"
 },
 "NodeConfigActuatorType": {
  "label": "Type actuator",
  "help": "Of de aansluiting als ingang, doorvoer of uitgang werkt.",
  "category": "Actuator",
  "group": "NodeConfig",
  "options": [
   {
    "value": 0,
    "label": "Ingang"
   },
   {
    "value": 1,
    "label": "Doorvoer"
   },
   {
    "value": 2,
    "label": "Uitgang"
   }
  ],
  "enum": "ActTypes"
 },
 "NodeConfigActuatorKeepPoweredAtEnd": {
  "label": "Spanning houden aan het eind",
  "help": "De actuator onder spanning houden nadat hij zijn eindstand heeft bereikt.",
  "category": "Actuator",
  "group": "NodeConfig",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "NodeConfigActuatorOutputAsPwm": {
  "label": "Uitgangssignaal actuator",
  "help": "Analoog of als pulsbreedte.",
  "category": "Actuator",
  "group": "NodeConfig",
  "options": [
   {
    "value": 0,
    "label": "Analoog (0–10 V)"
   },
   {
    "value": 1,
    "label": "PWM (10 V)"
   }
  ],
  "enum": "PwmModes"
 },
 "VentCoolMode": {
  "label": "Ventilatief koelen",
  "help": "Extra ventileren om de woning te koelen.",
  "category": "VentilativeCooling",
  "group": "VentCool",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   },
   {
    "value": 2,
    "label": "Automatisch"
   }
  ],
  "enum": "OnOffAutoModes"
 },
 "VentCoolStartTime": {
  "label": "Starttijd",
  "help": "Tijdstip waarop ventilatief koelen mag beginnen.",
  "category": "VentilativeCooling",
  "group": "VentCool"
 },
 "VentCoolStopTime": {
  "label": "Stoptijd",
  "help": "Tijdstip waarop ventilatief koelen stopt.",
  "category": "VentilativeCooling",
  "group": "VentCool"
 },
 "VentCoolActiveOnMonday": {
  "label": "Actief op maandag",
  "category": "VentilativeCooling",
  "group": "VentCool",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "VentCoolActiveOnTuesday": {
  "label": "Actief op dinsdag",
  "category": "VentilativeCooling",
  "group": "VentCool",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "VentCoolActiveOnWednesday": {
  "label": "Actief op woensdag",
  "category": "VentilativeCooling",
  "group": "VentCool",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "VentCoolActiveOnThursday": {
  "label": "Actief op donderdag",
  "category": "VentilativeCooling",
  "group": "VentCool",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "VentCoolActiveOnFriday": {
  "label": "Actief op vrijdag",
  "category": "VentilativeCooling",
  "group": "VentCool",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "VentCoolActiveOnSaturday": {
  "label": "Actief op zaterdag",
  "category": "VentilativeCooling",
  "group": "VentCool",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "VentCoolActiveOnSunday": {
  "label": "Actief op zondag",
  "category": "VentilativeCooling",
  "group": "VentCool",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "VentCoolMaxWindSpeed": {
  "label": "Maximale windsnelheid",
  "help": "Waarde waarboven ventilatief koelen wordt gestaakt.",
  "category": "VentilativeCooling",
  "group": "VentCool"
 },
 "NightBoostActive": {
  "label": "Nightboost",
  "help": "'s Nachts extra ventileren om warmte af te voeren.",
  "category": "NightBoost",
  "group": "NightBoost",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "NightBoostTemperatureSetpoint": {
  "label": "Comforttemperatuur",
  "help": "Binnentemperatuur die nightboost probeert te bereiken.",
  "category": "NightBoost",
  "group": "NightBoost"
 },
 "NightBoostStartTime": {
  "label": "Starttijd",
  "help": "Tijdstip waarop nightboost mag beginnen.",
  "category": "NightBoost",
  "group": "NightBoost"
 },
 "NightBoostStopTime": {
  "label": "Stoptijd",
  "help": "Tijdstip waarop nightboost stopt.",
  "category": "NightBoost",
  "group": "NightBoost"
 },
 "NightBoostStartMonth": {
  "label": "Startmaand",
  "help": "Eerste maand van het seizoen waarin nightboost werkt.",
  "category": "NightBoost",
  "group": "NightBoost",
  "options": [
   {
    "value": 0,
    "label": "januari"
   },
   {
    "value": 1,
    "label": "januari"
   },
   {
    "value": 2,
    "label": "februari"
   },
   {
    "value": 3,
    "label": "maart"
   },
   {
    "value": 4,
    "label": "april"
   },
   {
    "value": 5,
    "label": "mei"
   },
   {
    "value": 6,
    "label": "juni"
   },
   {
    "value": 7,
    "label": "juli"
   },
   {
    "value": 8,
    "label": "augustus"
   },
   {
    "value": 9,
    "label": "september"
   },
   {
    "value": 10,
    "label": "oktober"
   },
   {
    "value": 11,
    "label": "november"
   },
   {
    "value": 12,
    "label": "december"
   }
  ],
  "enum": "Months"
 },
 "NightBoostStopMonth": {
  "label": "Stopmaand",
  "help": "Laatste maand van het seizoen waarin nightboost werkt.",
  "category": "NightBoost",
  "group": "NightBoost",
  "options": [
   {
    "value": 0,
    "label": "januari"
   },
   {
    "value": 1,
    "label": "januari"
   },
   {
    "value": 2,
    "label": "februari"
   },
   {
    "value": 3,
    "label": "maart"
   },
   {
    "value": 4,
    "label": "april"
   },
   {
    "value": 5,
    "label": "mei"
   },
   {
    "value": 6,
    "label": "juni"
   },
   {
    "value": 7,
    "label": "juli"
   },
   {
    "value": 8,
    "label": "augustus"
   },
   {
    "value": 9,
    "label": "september"
   },
   {
    "value": 10,
    "label": "oktober"
   },
   {
    "value": 11,
    "label": "november"
   },
   {
    "value": 12,
    "label": "december"
   }
  ],
  "enum": "Months"
 },
 "NightBoostCutoffRequest": {
  "label": "Afkapstand",
  "help": "Bovengrens voor de ventilatievraag tijdens nightboost.",
  "category": "NightBoost",
  "group": "NightBoost"
 },
 "FanAutoCalibrationActive": {
  "label": "Automatisch kalibreren",
  "help": "De box stelt de ventilatorcurve zelf bij.",
  "category": "Calibration",
  "group": "Fan",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "FanMaximumHighLevelOnSilentBox": {
  "label": "Maximumstand",
  "category": "Calibration",
  "group": "Fan"
 },
 "FanCalibByCode": {
  "label": "Kalibratiecode",
  "category": "Calibration",
  "group": "Fan"
 },
 "FanCalibrationOnManual2Active": {
  "label": "Kalibreren op handstand",
  "help": "Welke handmatige knop als referentie geldt bij het kalibreren.",
  "category": "Calibration",
  "group": "Fan",
  "options": [
   {
    "value": 0,
    "label": "Handstand 3"
   },
   {
    "value": 1,
    "label": "Handstand 2"
   }
  ],
  "enum": "CalibOnManual"
 },
 "FanGroundBoundActive": {
  "label": "Grondgebonden woning",
  "category": "Calibration",
  "group": "Fan",
  "options": [
   {
    "value": 0,
    "label": "Niet grondgebonden"
   },
   {
    "value": 1,
    "label": "Grondgebonden"
   }
  ],
  "enum": "GroundBound"
 },
 "FanGroundBoundHeadCount": {
  "label": "Aantal bewoners",
  "help": "Uitgangspunt voor de benodigde ventilatiecapaciteit.",
  "category": "Calibration",
  "group": "Fan",
  "options": [
   {
    "value": 1,
    "label": "1 persoon"
   },
   {
    "value": 2,
    "label": "2 personen"
   },
   {
    "value": 4,
    "label": "4 personen"
   }
  ],
  "enum": "Headcount"
 },
 "FanCurve": {
  "label": "Ventilatorcurve",
  "help": "Welke curve de box aanhoudt; hangt af van het bouwjaar van het toestel.",
  "category": "Calibration",
  "group": "Fan",
  "options": [
   {
    "value": 0,
    "label": "Toestel van vóór aug. 2015"
   },
   {
    "value": 1,
    "label": "Curve 80%"
   },
   {
    "value": 2,
    "label": "Curve 100% (standaard vanaf 2020)"
   }
  ],
  "enum": "Fancurve"
 },
 "FanQzone1Max": {
  "label": "Maximaal debiet zone 1",
  "category": "Calibration",
  "group": "Fan"
 },
 "FanQzone2Max": {
  "label": "Maximaal debiet zone 2",
  "category": "Calibration",
  "group": "Fan"
 },
 "FanPzone1Max": {
  "label": "Maximale druk zone 1",
  "category": "Calibration",
  "group": "Fan"
 },
 "FanPzone2Max": {
  "label": "Maximale druk zone 2",
  "category": "Calibration",
  "group": "Fan"
 },
 "FanPinMax": {
  "label": "Maximale druk toevoer",
  "category": "Calibration",
  "group": "Fan"
 },
 "FanPoutMax": {
  "label": "Maximale druk afvoer",
  "category": "Calibration",
  "group": "Fan"
 },
 "FanQoutMax": {
  "label": "Maximaal debiet afvoer",
  "category": "Calibration",
  "group": "Fan"
 },
 "FanOutputAsPwm": {
  "label": "Uitgangssignaal ventilator",
  "help": "Analoog of als pulsbreedte.",
  "category": "Calibration",
  "group": "Fan",
  "options": [
   {
    "value": 0,
    "label": "Analoog (0–10 V)"
   },
   {
    "value": 1,
    "label": "PWM (10 V)"
   }
  ],
  "enum": "PwmModes"
 },
 "RenoFanSpeedCalib": {
  "label": "Kalibratie toerental",
  "category": "Calibration",
  "group": "Fan"
 },
 "ModBusAddress": {
  "label": "Modbus-adres",
  "help": "Adres van de box op de Modbus.",
  "category": "Extern",
  "group": "ModBus"
 },
 "ModBusOffset": {
  "label": "Modbus-offset",
  "help": "Of de registers vanaf 0 of vanaf 1 worden geteld.",
  "category": "Extern",
  "group": "ModBus",
  "options": [
   {
    "value": 0,
    "label": "0"
   },
   {
    "value": 1,
    "label": "1"
   }
  ],
  "enum": "ModbusOffsetModes"
 },
 "ModBusSpeed": {
  "label": "Modbus-snelheid",
  "category": "Extern",
  "group": "ModBus",
  "options": [
   {
    "value": 0,
    "label": "4800 bps"
   },
   {
    "value": 1,
    "label": "9600 bps"
   },
   {
    "value": 2,
    "label": "19200 bps"
   },
   {
    "value": 3,
    "label": "38400 bps"
   },
   {
    "value": 4,
    "label": "57600 bps"
   },
   {
    "value": 5,
    "label": "115200 bps"
   },
   {
    "value": 6,
    "label": "230400 bps"
   }
  ],
  "enum": "ModbusBaudRates"
 },
 "ModBusParity": {
  "label": "Modbus-pariteit",
  "category": "Extern",
  "group": "ModBus",
  "options": [
   {
    "value": 0,
    "label": "Geen"
   },
   {
    "value": 1,
    "label": "Even"
   },
   {
    "value": 2,
    "label": "Oneven"
   }
  ],
  "enum": "ModbusParities"
 },
 "ModBusStopbit": {
  "label": "Modbus-stopbits",
  "category": "Extern",
  "group": "ModBus",
  "options": [
   {
    "value": 1,
    "label": "1"
   },
   {
    "value": 2,
    "label": "2"
   }
  ],
  "enum": "ModbusStopbits"
 },
 "TcpIpDhcpActive": {
  "label": "DHCP",
  "help": "Het adres automatisch laten toewijzen in plaats van vast instellen.",
  "category": "TcpIp",
  "group": "TcpIpPara",
  "options": [
   {
    "value": 0,
    "label": "Uit"
   },
   {
    "value": 1,
    "label": "Aan"
   }
  ],
  "enum": "OnOffModes"
 },
 "TcpIpStaticIpAddress": {
  "label": "Vast IP-adres",
  "help": "Wordt alleen gebruikt als DHCP uit staat.",
  "category": "TcpIp",
  "group": "TcpIpPara"
 },
 "TcpIpStaticDefaultGateway": {
  "label": "Vaste gateway",
  "help": "Wordt alleen gebruikt als DHCP uit staat.",
  "category": "TcpIp",
  "group": "TcpIpPara"
 },
 "TcpIpStaticNetworkMask": {
  "label": "Vast subnetmasker",
  "help": "Wordt alleen gebruikt als DHCP uit staat.",
  "category": "TcpIp",
  "group": "TcpIpPara"
 },
 "TcpIpHostnameNumber": {
  "label": "Hostnaamnummer",
  "category": "TcpIp",
  "group": "TcpIpPara"
 },
 "NodeParaOverrule": {
  "label": "Overrulewaarde",
  "help": "Stand die de component aanhoudt zolang hij overruled is.",
  "category": "Service",
  "group": "Overrule"
 },
 "FanAbsoluteMinimumFanspeed": {
  "label": "Absoluut minimumtoerental",
  "category": "Service",
  "group": "Fan"
 },
 "FanAbsoluteMaximumFanspeed": {
  "label": "Absoluut maximumtoerental",
  "category": "Service",
  "group": "Fan"
 },
 "FanKvalueLekBox": {
  "label": "K-waarde lekkage box",
  "category": "Service",
  "group": "Fan"
 },
 "FanKvalueLekValve": {
  "label": "K-waarde lekkage klep",
  "category": "Service",
  "group": "Fan"
 },
 "FanKvalueLekFraction": {
  "label": "Lekfractie",
  "category": "Service",
  "group": "Fan"
 },
 "FanPwmVoltage": {
  "label": "PWM-spanning",
  "category": "Service",
  "group": "Fan"
 },
 "FanPwmFrequency": {
  "label": "PWM-frequentie",
  "category": "Service",
  "group": "Fan"
 },
 "VentCtrlTemperatureDependend": {
  "label": "Temperatuurafhankelijk",
  "category": "Service",
  "group": "VentCtrl"
 },
 "VentCtrlBalanceTreshold": {
  "label": "Balansdrempel",
  "category": "Service",
  "group": "VentCtrl"
 },
 "VentCtrlTemperatureLow": {
  "label": "Ondergrens temperatuur",
  "category": "Service",
  "group": "VentCtrl"
 },
 "VentCtrlTemperatureHigh": {
  "label": "Bovengrens temperatuur",
  "category": "Service",
  "group": "VentCtrl"
 },
 "NodeParaMotionOpenDirection": {
  "label": "Draairichting openen",
  "category": "Service",
  "group": "ParaSet"
 },
 "NodeParaMotionHomingDirection": {
  "label": "Draairichting nulstand",
  "category": "Service",
  "group": "ParaSet"
 },
 "NodeParaMotionMaximumMotorSteps": {
  "label": "Maximaal aantal motorstappen",
  "category": "Service",
  "group": "ParaSet"
 },
 "NodeParaClimaIncomingTemperatureRequest": {
  "label": "Gevraagde inblaastemperatuur",
  "category": "Service",
  "group": "ParaSet"
 },
 "NodeParaClimaExternalTemperatureTrigger": {
  "label": "Drempel buitentemperatuur",
  "category": "Service",
  "group": "ParaSet"
 },
 "CommDllSetRegPower": {
  "label": "Zendvermogen RF",
  "help": "Hoger vermogen kost meer stroom en is zelden nodig.",
  "category": "Service",
  "group": "CommDll",
  "options": [
   {
    "value": 193,
    "label": "Standaard"
   },
   {
    "value": 197,
    "label": "Laag"
   },
   {
    "value": 192,
    "label": "Hoog — afgeraden"
   }
  ],
  "enum": "RfOutputMode"
 },
 "NodeParaSetRegPower": {
  "label": "Zendvermogen RF (node)",
  "help": "Hoger vermogen kost meer stroom en is zelden nodig.",
  "category": "Service",
  "group": "ParaSet",
  "options": [
   {
    "value": 193,
    "label": "Standaard"
   },
   {
    "value": 197,
    "label": "Laag"
   },
   {
    "value": 192,
    "label": "Hoog — afgeraden"
   }
  ],
  "enum": "RfOutputMode"
 },
 "InitialSettingsCountry": {
  "label": "Land",
  "help": "Bepaalt welke landinstellingen de box aanhoudt.",
  "options": [
   {
    "value": 0,
    "label": "België"
   },
   {
    "value": 1,
    "label": "Nederland"
   },
   {
    "value": 2,
    "label": "Verenigd Koninkrijk"
   },
   {
    "value": 3,
    "label": "Frankrijk"
   },
   {
    "value": 4,
    "label": "Overig"
   }
  ]
 },
 "InitialSettingsLanguage": {
  "label": "Taal",
  "help": "Taal van het display op de box.",
  "options": [
   {
    "value": 0,
    "label": "Nederlands"
   },
   {
    "value": 1,
    "label": "Engels"
   },
   {
    "value": 2,
    "label": "Frans"
   },
   {
    "value": 3,
    "label": "Duits"
   }
  ]
 }
};

export const DEVICE_NAMES = {
 "automin": [
  {
   "setting": "NodeConfigAutomaticMinimum",
   "settingType": "NodeConfig"
  }
 ],
 "automax": [
  {
   "setting": "NodeConfigAutomaticMaximum",
   "settingType": "NodeConfig"
  }
 ],
 "capacity": [
  {
   "setting": "NodeConfigMaximumFlow",
   "settingType": "NodeConfig"
  }
 ],
 "temp dependent": [
  {
   "setting": "NodeConfigTemperatureDependent",
   "settingType": "NodeConfig"
  }
 ],
 "co2 setpoint": [
  {
   "setting": "NodeConfigCo2Setpoint",
   "settingType": "NodeConfig"
  },
  {
   "setting": "SensorCtrlCo2Setpoint",
   "settingType": "SensorCtrl"
  }
 ],
 "rh setpoint": [
  {
   "setting": "NodeConfigRhSetpoint",
   "settingType": "NodeConfig"
  }
 ],
 "rh delta": [
  {
   "setting": "NodeConfigRhDelta",
   "settingType": "NodeConfig"
  }
 ],
 "manual 1": [
  {
   "setting": "NodeConfigManualButton1",
   "settingType": "NodeConfig"
  }
 ],
 "manual 2": [
  {
   "setting": "NodeConfigManualButton2",
   "settingType": "NodeConfig"
  }
 ],
 "manual 3": [
  {
   "setting": "NodeConfigManualButton3",
   "settingType": "NodeConfig"
  }
 ],
 "manual timeout": [
  {
   "setting": "NodeConfigManualTime",
   "settingType": "NodeConfig"
  }
 ],
 "switch mode": [
  {
   "setting": "NodeConfigSwitchSensorSwitchMode",
   "settingType": "NodeConfig"
  }
 ],
 "switch value": [
  {
   "setting": "NodeConfigSwitchSensorSwitchValue",
   "settingType": "NodeConfig"
  }
 ],
 "range": [
  {
   "setting": "NodeConfigActuatorRange",
   "settingType": "NodeConfig"
  },
  {
   "setting": "EevRange",
   "settingType": "Eev"
  },
  {
   "setting": "MotorRange",
   "settingType": "Motor"
  }
 ],
 "hybrid value": [
  {
   "setting": "NodeConfigActuatorHybridValue",
   "settingType": "NodeConfig"
  }
 ],
 "actuator type": [
  {
   "setting": "NodeConfigActuatorType",
   "settingType": "NodeConfig"
  }
 ],
 "keep powered": [
  {
   "setting": "NodeConfigActuatorKeepPoweredAtEnd",
   "settingType": "NodeConfig"
  }
 ],
 "output as pwm": [
  {
   "setting": "NodeConfigActuatorOutputAsPwm",
   "settingType": "NodeConfig"
  },
  {
   "setting": "FanOutputAsPwm",
   "settingType": "Fan"
  }
 ],
 "sensorvisulevel": [
  {
   "setting": "NodeConfigSensorVisualisationLevel",
   "settingType": "NodeConfig"
  }
 ],
 "switch overrun": [
  {
   "setting": "NodeConfigSwitchSensorOverrunTime",
   "settingType": "NodeConfig"
  }
 ],
 "uc error mode": [
  {
   "setting": "NodeConfigUserControllerErrorMode",
   "settingType": "NodeConfig"
  }
 ],
 "pwm voltage": [
  {
   "setting": "FanPwmVoltage",
   "settingType": "Fan"
  }
 ],
 "pwm frequency": [
  {
   "setting": "FanPwmFrequency",
   "settingType": "Fan"
  }
 ],
 "auto calib": [
  {
   "setting": "FanAutoCalibrationActive",
   "settingType": "Fan"
  }
 ],
 "level high": [
  {
   "setting": "FanMaximumHighLevelOnSilentBox",
   "settingType": "Fan"
  }
 ],
 "max high level": [
  {
   "setting": "FanMaximumHighLevelOnSilentBox",
   "settingType": "Fan"
  }
 ],
 "min fan speed": [
  {
   "setting": "FanAbsoluteMinimumFanspeed",
   "settingType": "Fan"
  }
 ],
 "pwm min": [
  {
   "setting": "FanAbsoluteMinimumFanspeed",
   "settingType": "Fan"
  }
 ],
 "pwm_min": [
  {
   "setting": "FanAbsoluteMinimumFanspeed",
   "settingType": "Fan"
  }
 ],
 "k lek box": [
  {
   "setting": "FanKvalueLekBox",
   "settingType": "Fan"
  }
 ],
 "k_lek box": [
  {
   "setting": "FanKvalueLekBox",
   "settingType": "Fan"
  }
 ],
 "k_lek valve": [
  {
   "setting": "FanKvalueLekValve",
   "settingType": "Fan"
  }
 ],
 "max fan out": [
  {
   "setting": "FanAbsoluteMaximumFanspeed",
   "settingType": "Fan"
  }
 ],
 "pwm max": [
  {
   "setting": "FanAbsoluteMaximumFanspeed",
   "settingType": "Fan"
  }
 ],
 "pwm_max": [
  {
   "setting": "FanAbsoluteMaximumFanspeed",
   "settingType": "Fan"
  }
 ],
 "k lek fraction": [
  {
   "setting": "FanKvalueLekFraction",
   "settingType": "Fan"
  }
 ],
 "calib on man2": [
  {
   "setting": "FanCalibrationOnManual2Active",
   "settingType": "Fan"
  }
 ],
 "calib on man2 level": [
  {
   "setting": "FanCalibrationOnManual2Active",
   "settingType": "Fan"
  }
 ],
 "ground bound": [
  {
   "setting": "FanGroundBoundActive",
   "settingType": "Fan"
  }
 ],
 "head count": [
  {
   "setting": "FanGroundBoundHeadCount",
   "settingType": "Fan"
  }
 ],
 "fan curve": [
  {
   "setting": "FanCurve",
   "settingType": "Fan"
  }
 ],
 "hardware variant": [
  {
   "setting": "FanHardwareVariant",
   "settingType": "Fan"
  }
 ],
 "325 cub max exhaust output": [
  {
   "setting": "FanMax325CubExhaustOutput",
   "settingType": "Fan"
  }
 ],
 "325 cub max supply output": [
  {
   "setting": "FanMax325CubSupplyOutput",
   "settingType": "Fan"
  }
 ],
 "400 cub max exhaust output": [
  {
   "setting": "FanMax400CubExhaustOutput",
   "settingType": "Fan"
  }
 ],
 "400 cub max supply output": [
  {
   "setting": "FanMax400CubSupplyOutput",
   "settingType": "Fan"
  }
 ],
 "kp exhaust": [
  {
   "setting": "FanKpExhaust",
   "settingType": "Fan"
  }
 ],
 "k_p": [
  {
   "setting": "FanKpExhaust",
   "settingType": "Fan"
  },
  {
   "setting": "EevCtrlKp",
   "settingType": "EevCtrl"
  }
 ],
 "ki exhaust": [
  {
   "setting": "FanKiExhaust",
   "settingType": "Fan"
  }
 ],
 "k_i": [
  {
   "setting": "FanKiExhaust",
   "settingType": "Fan"
  },
  {
   "setting": "EevCtrlKi",
   "settingType": "EevCtrl"
  }
 ],
 "kd exhaust": [
  {
   "setting": "FanKdExhaust",
   "settingType": "Fan"
  }
 ],
 "k_d": [
  {
   "setting": "FanKdExhaust",
   "settingType": "Fan"
  }
 ],
 "i_term_limit exhaust": [
  {
   "setting": "FanITermLimitExhaust",
   "settingType": "Fan"
  }
 ],
 "kp supply": [
  {
   "setting": "FanKpSupply",
   "settingType": "Fan"
  }
 ],
 "ki supply": [
  {
   "setting": "FanKiSupply",
   "settingType": "Fan"
  }
 ],
 "kd supply": [
  {
   "setting": "FanKdSupply",
   "settingType": "Fan"
  }
 ],
 "i_term_limit supply": [
  {
   "setting": "FanITermLimitSupply",
   "settingType": "Fan"
  }
 ],
 "p sensor max": [
  {
   "setting": "FanPressureSensorMaximum",
   "settingType": "Fan"
  }
 ],
 "c value fan": [
  {
   "setting": "FanCvalueMaximum",
   "settingType": "Fan"
  }
 ],
 "n lek box": [
  {
   "setting": "FanNvalueLekBox",
   "settingType": "Fan"
  }
 ],
 "k lek eta valve": [
  {
   "setting": "FanKvalueLekEtaValve",
   "settingType": "Fan"
  }
 ],
 "n lek eta valve": [
  {
   "setting": "FanNvalueLekEtaValve",
   "settingType": "Fan"
  }
 ],
 "k lek oda valve": [
  {
   "setting": "FanKvalueLekOdaValve",
   "settingType": "Fan"
  }
 ],
 "n lek oda valve": [
  {
   "setting": "FanNvalueLekOdaValve",
   "settingType": "Fan"
  }
 ],
 "k eta2 intern": [
  {
   "setting": "FanKvalueEta2Intern",
   "settingType": "Fan"
  }
 ],
 "k fan intern": [
  {
   "setting": "FanKvalueFanIntern",
   "settingType": "Fan"
  }
 ],
 "fan efficiency": [
  {
   "setting": "FanEfficiency",
   "settingType": "Fan"
  }
 ],
 "q zone 1 max": [
  {
   "setting": "FanQzone1Max",
   "settingType": "Fan"
  }
 ],
 "q zone 1 max (*)": [
  {
   "setting": "FanQzone1Max",
   "settingType": "Fan"
  }
 ],
 "q zone 2 max": [
  {
   "setting": "FanQzone2Max",
   "settingType": "Fan"
  }
 ],
 "q zone 2 max (*)": [
  {
   "setting": "FanQzone2Max",
   "settingType": "Fan"
  }
 ],
 "q out max": [
  {
   "setting": "FanQoutMax",
   "settingType": "Fan"
  }
 ],
 "q out": [
  {
   "setting": "FanQoutMax",
   "settingType": "Fan"
  }
 ],
 "p in max": [
  {
   "setting": "FanPinMax",
   "settingType": "Fan"
  }
 ],
 "p out max": [
  {
   "setting": "FanPoutMax",
   "settingType": "Fan"
  }
 ],
 "p zone 1 max": [
  {
   "setting": "FanPzone1Max",
   "settingType": "Fan"
  }
 ],
 "p zone 1 max (*)": [
  {
   "setting": "FanPzone1Max",
   "settingType": "Fan"
  }
 ],
 "p in zone 1 max": [
  {
   "setting": "FanPzone1Max",
   "settingType": "Fan"
  }
 ],
 "p zone 2 max": [
  {
   "setting": "FanPzone2Max",
   "settingType": "Fan"
  }
 ],
 "p zone 2 max (*)": [
  {
   "setting": "FanPzone2Max",
   "settingType": "Fan"
  }
 ],
 "p in zone 2 max": [
  {
   "setting": "FanPzone2Max",
   "settingType": "Fan"
  }
 ],
 "max exhaust output": [
  {
   "setting": "FanMaxExhaustOutput",
   "settingType": "Fan"
  }
 ],
 "max supply output": [
  {
   "setting": "FanMaxSupplyOutput",
   "settingType": "Fan"
  }
 ],
 "stability band": [
  {
   "setting": "FanStabilityBand",
   "settingType": "Fan"
  }
 ],
 "stability interval": [
  {
   "setting": "FanStabilityInterval",
   "settingType": "Fan"
  }
 ],
 "stability samples": [
  {
   "setting": "FanStabilitySamples",
   "settingType": "Fan"
  }
 ],
 "min exhaust output": [
  {
   "setting": "FanMinExhaustOutput",
   "settingType": "Fan"
  }
 ],
 "min supply output": [
  {
   "setting": "FanMinSupplyOutput",
   "settingType": "Fan"
  }
 ],
 "calib by code stability multiple": [
  {
   "setting": "FanCalibByCodeStabilityMultiple",
   "settingType": "Fan"
  }
 ],
 "fan constant": [
  {
   "setting": "FanConstant",
   "settingType": "Fan"
  }
 ],
 "actual p_atm": [
  {
   "setting": "FanActualAtmPressure",
   "settingType": "Fan"
  }
 ],
 "fan speed calib": [
  {
   "setting": "RenoFanSpeedCalib",
   "settingType": "Fan"
  }
 ],
 "address": [
  {
   "setting": "ModBusAddress",
   "settingType": "ModBus"
  }
 ],
 "offfset": [
  {
   "setting": "ModBusOffset",
   "settingType": "ModBus"
  }
 ],
 "offset": [
  {
   "setting": "ModBusOffset",
   "settingType": "ModBus"
  }
 ],
 "speed": [
  {
   "setting": "ModBusSpeed",
   "settingType": "ModBus"
  }
 ],
 "parity": [
  {
   "setting": "ModBusParity",
   "settingType": "ModBus"
  }
 ],
 "stopbit": [
  {
   "setting": "ModBusStopbit",
   "settingType": "ModBus"
  }
 ],
 "co2 temp compens": [
  {
   "setting": "SensorCtrlTemperatureDependent",
   "settingType": "SensorCtrl"
  }
 ],
 "hum setpoint": [
  {
   "setting": "SensorCtrlRhSetpoint",
   "settingType": "SensorCtrl"
  }
 ],
 "hum delta active": [
  {
   "setting": "SensorCtrlRhDelta",
   "settingType": "SensorCtrl"
  }
 ],
 "balance thresh": [
  {
   "setting": "VentCtrlBalanceTreshold",
   "settingType": "VentCtrl"
  }
 ],
 "ctrl temp dep": [
  {
   "setting": "VentCtrlTemperatureDependend",
   "settingType": "VentCtrl"
  }
 ],
 "ctrl temp low": [
  {
   "setting": "VentCtrlTemperatureLow",
   "settingType": "VentCtrl"
  }
 ],
 "ctrl temp high": [
  {
   "setting": "VentCtrlTemperatureHigh",
   "settingType": "VentCtrl"
  }
 ],
 "active on monday": [
  {
   "setting": "VentCoolActiveOnMonday",
   "settingType": "VentCool"
  }
 ],
 "active on tuesday": [
  {
   "setting": "VentCoolActiveOnTuesday",
   "settingType": "VentCool"
  }
 ],
 "active on wednesday": [
  {
   "setting": "VentCoolActiveOnWednesday",
   "settingType": "VentCool"
  }
 ],
 "active on thursday": [
  {
   "setting": "VentCoolActiveOnThursday",
   "settingType": "VentCool"
  }
 ],
 "active on friday": [
  {
   "setting": "VentCoolActiveOnFriday",
   "settingType": "VentCool"
  }
 ],
 "active on saturday": [
  {
   "setting": "VentCoolActiveOnSaturday",
   "settingType": "VentCool"
  }
 ],
 "active on sunday": [
  {
   "setting": "VentCoolActiveOnSunday",
   "settingType": "VentCool"
  }
 ],
 "start time": [
  {
   "setting": "VentCoolStartTime",
   "settingType": "VentCool"
  },
  {
   "setting": "NightBoostStartTime",
   "settingType": "NightBoost"
  }
 ],
 "stop time": [
  {
   "setting": "VentCoolStopTime",
   "settingType": "VentCool"
  },
  {
   "setting": "NightBoostStopTime",
   "settingType": "NightBoost"
  }
 ],
 "mode": [
  {
   "setting": "VentCoolMode",
   "settingType": "VentCool"
  },
  {
   "setting": "CHDemandMode",
   "settingType": "CentralHeatingDemand"
  }
 ],
 "max wind speed": [
  {
   "setting": "VentCoolMaxWindSpeed",
   "settingType": "VentCool"
  }
 ],
 "start month": [
  {
   "setting": "NightBoostStartMonth",
   "settingType": "NightBoost"
  }
 ],
 "stop month": [
  {
   "setting": "NightBoostStopMonth",
   "settingType": "NightBoost"
  }
 ],
 "start temperature": [
  {
   "setting": "NightBoostTemperatureSetpoint",
   "settingType": "NightBoost"
  }
 ],
 "temperature setpoint": [
  {
   "setting": "NightBoostTemperatureSetpoint",
   "settingType": "NightBoost"
  }
 ],
 "active": [
  {
   "setting": "NightBoostActive",
   "settingType": "NightBoost"
  }
 ],
 "cutoff request": [
  {
   "setting": "NightBoostCutoffRequest",
   "settingType": "NightBoost"
  }
 ],
 "ip address": [
  {
   "setting": "TcpIpStaticIpAddress",
   "settingType": "TcpIpPara"
  },
  {
   "setting": "TcpIpIpAddress",
   "settingType": "TcpIpInfo"
  }
 ],
 "network mask": [
  {
   "setting": "TcpIpStaticNetworkMask",
   "settingType": "TcpIpPara"
  }
 ],
 "default gateway": [
  {
   "setting": "TcpIpStaticDefaultGateway",
   "settingType": "TcpIpPara"
  }
 ],
 "dhcp active": [
  {
   "setting": "TcpIpDhcpActive",
   "settingType": "TcpIpPara"
  }
 ],
 "hostname number": [
  {
   "setting": "TcpIpHostnameNumber",
   "settingType": "TcpIpPara"
  }
 ],
 "gateway": [
  {
   "setting": "TcpIpDefaultGateway",
   "settingType": "TcpIpInfo"
  }
 ],
 "mac address": [
  {
   "setting": "TcpIpMacAddress",
   "settingType": "TcpIpInfo"
  }
 ],
 "sw product": [
  {
   "setting": "IoBoardInfoProductVersion",
   "settingType": "BoardInfo"
  }
 ],
 "sw version": [
  {
   "setting": "IoBoardInfoSoftwareVersion",
   "settingType": "BoardInfo"
  }
 ],
 "sw revision": [
  {
   "setting": "IoBoardInfoSoftwareRevision",
   "settingType": "BoardInfo"
  }
 ],
 "sw test": [
  {
   "setting": "IoBoardInfoSoftwareTest",
   "settingType": "BoardInfo"
  }
 ],
 "uptime": [
  {
   "setting": "IoBoardInfoUptime",
   "settingType": "BoardInfo"
  }
 ],
 "serial number": [
  {
   "setting": "IoBoardInfoSerialnumber",
   "settingType": "BoardInfo"
  }
 ],
 "open dir": [
  {
   "setting": "EevOpenDirection",
   "settingType": "Eev"
  },
  {
   "setting": "MotorOpenDirection",
   "settingType": "Motor"
  }
 ],
 "home dir": [
  {
   "setting": "EevHomeDirection",
   "settingType": "Eev"
  },
  {
   "setting": "MotorHomeDirection",
   "settingType": "Motor"
  }
 ],
 "step time": [
  {
   "setting": "EevStepTime",
   "settingType": "Eev"
  },
  {
   "setting": "MotorStepTime",
   "settingType": "Motor"
  }
 ],
 "superheat temp": [
  {
   "setting": "EevCtrlSuperHeatTemperature",
   "settingType": "EevCtrl"
  }
 ],
 "deadband temp": [
  {
   "setting": "EevCtrlDeadbandTemperature",
   "settingType": "EevCtrl"
  }
 ],
 "control time": [
  {
   "setting": "EevCtrlControlTime",
   "settingType": "EevCtrl"
  }
 ],
 "boost under setpoint": [
  {
   "setting": "EevCtrlBoostUnderSetpoint",
   "settingType": "EevCtrl"
  }
 ],
 "min position": [
  {
   "setting": "EevCtrlMinimumPosition",
   "settingType": "EevCtrl"
  }
 ],
 "max position": [
  {
   "setting": "EevCtrlMaximumPosition",
   "settingType": "EevCtrl"
  }
 ],
 "compressor speed 1": [
  {
   "setting": "HeatPumpCompressorSpeed1",
   "settingType": "HeatPump"
  }
 ],
 "compressor speed 2": [
  {
   "setting": "HeatPumpCompressorSpeed2",
   "settingType": "HeatPump"
  }
 ],
 "compressor speed 3": [
  {
   "setting": "HeatPumpCompressorSpeed3",
   "settingType": "HeatPump"
  }
 ],
 "compressor speed 4": [
  {
   "setting": "HeatPumpCompressorSpeed4",
   "settingType": "HeatPump"
  }
 ],
 "compressor speed 5": [
  {
   "setting": "HeatPumpCompressorSpeed5",
   "settingType": "HeatPump"
  }
 ],
 "compressor speed 6": [
  {
   "setting": "HeatPumpCompressorSpeed6",
   "settingType": "HeatPump"
  }
 ],
 "req. air flow": [
  {
   "setting": "HeatPumpRequiredAirFlow",
   "settingType": "HeatPump"
  }
 ],
 "min. air flow": [
  {
   "setting": "HeatPumpMinimumAirFlow",
   "settingType": "HeatPump"
  }
 ],
 "req. water flow": [
  {
   "setting": "HeatPumpRequiredWaterFlow",
   "settingType": "HeatPump"
  }
 ],
 "min. water flow": [
  {
   "setting": "HeatPumpMinimumWaterFlow",
   "settingType": "HeatPump"
  }
 ],
 "min. discharge temp.": [
  {
   "setting": "HeatPumpMinimumDischargeTemperature",
   "settingType": "HeatPump"
  }
 ],
 "max. discharge temp.": [
  {
   "setting": "HeatPumpMaximumDischargeTemperature",
   "settingType": "HeatPump"
  }
 ],
 "min. liquid temp.": [
  {
   "setting": "HeatPumpMinimumLiquidTemperature",
   "settingType": "HeatPump"
  }
 ],
 "max. liquid temp.": [
  {
   "setting": "HeatPumpMaximumLiquidTemperature",
   "settingType": "HeatPump"
  }
 ],
 "min. suction temp.": [
  {
   "setting": "HeatPumpMinimumSuctionTemperature",
   "settingType": "HeatPump"
  }
 ],
 "max. suction temp.": [
  {
   "setting": "HeatPumpMaximumSuctionTemperature",
   "settingType": "HeatPump"
  }
 ],
 "min. oda temp.": [
  {
   "setting": "HeatPumpMinimumOdaTemperature",
   "settingType": "HeatPump"
  }
 ],
 "max. oda temp.": [
  {
   "setting": "HeatPumpMaximumOdaTemperature",
   "settingType": "HeatPump"
  }
 ],
 "min. eta_1 temp.": [
  {
   "setting": "HeatPumpMinimumEta1Temperature",
   "settingType": "HeatPump"
  }
 ],
 "max. eta_1 temp.": [
  {
   "setting": "HeatPumpMaximumEta1Temperature",
   "settingType": "HeatPump"
  }
 ],
 "min. eta_2 temp.": [
  {
   "setting": "HeatPumpMinimumEta2Temperature",
   "settingType": "HeatPump"
  }
 ],
 "max. eta_2 temp.": [
  {
   "setting": "HeatPumpMaximumEta2Temperature",
   "settingType": "HeatPump"
  }
 ],
 "min. eha temp.": [
  {
   "setting": "HeatPumpMinimumEhaTemperature",
   "settingType": "HeatPump"
  }
 ],
 "max. eha temp.": [
  {
   "setting": "HeatPumpMaximumEhaTemperature",
   "settingType": "HeatPump"
  }
 ],
 "min. supply temp.": [
  {
   "setting": "HeatPumpMinimumSupplyTemperature",
   "settingType": "HeatPump"
  }
 ],
 "max. supply temp.": [
  {
   "setting": "HeatPumpMaximumSupplyTemperature",
   "settingType": "HeatPump"
  }
 ],
 "min. return temp.": [
  {
   "setting": "HeatPumpMinimumReturnTemperature",
   "settingType": "HeatPump"
  }
 ],
 "max. return temp.": [
  {
   "setting": "HeatPumpMaximumReturnTemperature",
   "settingType": "HeatPump"
  }
 ],
 "initial speed index": [
  {
   "setting": "HeatPumpInitialSpeedIndex",
   "settingType": "HeatPump"
  }
 ],
 "speed update time": [
  {
   "setting": "HeatPumpSpeedUpdateTime",
   "settingType": "HeatPump"
  }
 ],
 "power control band": [
  {
   "setting": "HeatPumpPowerControlBand",
   "settingType": "HeatPump"
  }
 ],
 "recover time": [
  {
   "setting": "HeatPumpRecoverTime",
   "settingType": "HeatPump"
  }
 ],
 "manual control active": [
  {
   "setting": "HeatPumpManualControlActive",
   "settingType": "HeatPump"
  }
 ],
 "pumpdown eev position": [
  {
   "setting": "HeatPumpPumpdownEevPosition",
   "settingType": "HeatPump"
  }
 ],
 "pumpdown speed index": [
  {
   "setting": "HeatPumpPumpdownSpeedIndex",
   "settingType": "HeatPump"
  }
 ],
 "defrost with pumpdown": [
  {
   "setting": "HeatPumpDefrostWithPumpdown",
   "settingType": "HeatPump"
  }
 ],
 "defrost rampup time": [
  {
   "setting": "HeatPumpDefrostRampupTime",
   "settingType": "HeatPump"
  }
 ],
 "defrost rampdown time": [
  {
   "setting": "HeatPumpDefrostRampdownTime",
   "settingType": "HeatPump"
  }
 ],
 "defrost enter speed": [
  {
   "setting": "HeatPumpDefrotEnterSpeed",
   "settingType": "HeatPump"
  }
 ],
 "defrost exit speed": [
  {
   "setting": "HeatPumpDefrostExitSpeed",
   "settingType": "HeatPump"
  }
 ],
 "defrost eev position": [
  {
   "setting": "HeatPumpDefrostEevPostion",
   "settingType": "HeatPump"
  }
 ],
 "defrost eev exit pos": [
  {
   "setting": "HeatPumpDefrostEevExitPostion",
   "settingType": "HeatPump"
  }
 ],
 "defrost dp liquid": [
  {
   "setting": "HeatPumpDefrostDpLiquid",
   "settingType": "HeatPump"
  }
 ],
 "stepup min eev position": [
  {
   "setting": "HeatPumpStepupMinimumEevPosition",
   "settingType": "HeatPump"
  }
 ],
 "min. hp air input temp": [
  {
   "setting": "HeatPumpMinimumHeatpumpAirInputTemperature",
   "settingType": "HeatPump"
  }
 ],
 "max. hp air input temp": [
  {
   "setting": "HeatPumpMaximumHeatpumpAirInputTemperature",
   "settingType": "HeatPump"
  }
 ],
 "hp air input temp hyst": [
  {
   "setting": "HeatPumpHeatpumpAirInputTemperatureHysteresis",
   "settingType": "HeatPump"
  }
 ],
 "t_disc high time": [
  {
   "setting": "HeatPumpTdiscHighTime",
   "settingType": "HeatPump"
  }
 ],
 "t_disc mask time": [
  {
   "setting": "HeatPumpTdiscMaskTime",
   "settingType": "HeatPump"
  }
 ],
 "t_set": [
  {
   "setting": "CHDemandTemperatureSetpoint",
   "settingType": "CentralHeatingDemand"
  }
 ],
 "t_hyst": [
  {
   "setting": "CHDemandTemperatureHysteresis",
   "settingType": "CentralHeatingDemand"
  }
 ],
 "ch mode": [
  {
   "setting": "CHDemandMode",
   "settingType": "CentralHeatingDemand"
  }
 ],
 "heatcurve temp @-10°c": [
  {
   "setting": "CHDemandHeatCurveMinusTen",
   "settingType": "CentralHeatingDemand"
  }
 ],
 "heatcurve temp @-10?c": [
  {
   "setting": "CHDemandHeatCurveMinusTen",
   "settingType": "CentralHeatingDemand"
  }
 ],
 "heatcurve temp @+20°c": [
  {
   "setting": "CHDemandHeatCurvePlusTwenty",
   "settingType": "CentralHeatingDemand"
  }
 ],
 "heatcurve temp @+20?c": [
  {
   "setting": "CHDemandHeatCurvePlusTwenty",
   "settingType": "CentralHeatingDemand"
  }
 ],
 "boost temp": [
  {
   "setting": "CHDemandBoostTemperature",
   "settingType": "CentralHeatingDemand"
  },
  {
   "setting": "DHWDemandBoostTemperature",
   "settingType": "DomesticHotWaterDemand"
  }
 ],
 "off temp": [
  {
   "setting": "CHDemandOffTemperature",
   "settingType": "CentralHeatingDemand"
  },
  {
   "setting": "DHWDemandOffTemperature",
   "settingType": "DomesticHotWaterDemand"
  }
 ],
 "max temp slope": [
  {
   "setting": "CHDemandMaximumTemperatureSlope",
   "settingType": "CentralHeatingDemand"
  },
  {
   "setting": "DHWDemandMaximumTemperatureSlope",
   "settingType": "DomesticHotWaterDemand"
  }
 ],
 "boost time": [
  {
   "setting": "CHDemandBoostTime",
   "settingType": "CentralHeatingDemand"
  },
  {
   "setting": "DHWDemandBoostTime",
   "settingType": "DomesticHotWaterDemand"
  }
 ],
 "dhw mode": [
  {
   "setting": "DHWDemandMode",
   "settingType": "DomesticHotWaterDemand"
  }
 ],
 "comfort temp": [
  {
   "setting": "DHWDemandComfortTemperature",
   "settingType": "DomesticHotWaterDemand"
  }
 ],
 "eco temp": [
  {
   "setting": "DHWDemandEcoTemperature",
   "settingType": "DomesticHotWaterDemand"
  }
 ],
 "bypass mode": [
  {
   "setting": "BypassMode",
   "settingType": "Bypass"
  }
 ],
 "adaptive control": [
  {
   "setting": "BypassAdaptiveControl",
   "settingType": "Bypass"
  }
 ],
 "t supply hysteresis": [
  {
   "setting": "BypassTsupplyHysteresis",
   "settingType": "Bypass"
  }
 ],
 "ctrl period in s": [
  {
   "setting": "BypassCtrlPeriod",
   "settingType": "Bypass"
  }
 ],
 "heater_allowed": [
  {
   "setting": "FrostProtectHeaterAllowed",
   "settingType": "FrostProtect"
  }
 ],
 "passive house enable": [
  {
   "setting": "FrostProtectPassiveHouseEnable",
   "settingType": "FrostProtect"
  }
 ],
 "ph temp sup min": [
  {
   "setting": "FrostProtectPassiveHouseTempSupMin",
   "settingType": "FrostProtect"
  }
 ],
 "ph hold off time": [
  {
   "setting": "FrostProtectPassiveHouseHoldOffTime",
   "settingType": "FrostProtect"
  }
 ],
 "ph reoccurence time": [
  {
   "setting": "FrostProtectPassiveHouseReoccurenceTime",
   "settingType": "FrostProtect"
  }
 ],
 "install complete": [
  {
   "setting": "InitialSettingsInstallComplete",
   "settingType": "InitialSettings"
  }
 ],
 "language": [
  {
   "setting": "InitialSettingsLanguage",
   "settingType": "InitialSettings"
  }
 ],
 "country": [
  {
   "setting": "InitialSettingsCountry",
   "settingType": "InitialSettings"
  }
 ],
 "comfort temp z1": [
  {
   "setting": "InitialSettingsComfortTemperature_Z1",
   "settingType": "InitialSettings"
  }
 ],
 "comfort temperature": [
  {
   "setting": "InitialSettingsComfortTemperature_Z1",
   "settingType": "InitialSettings"
  }
 ],
 "comfort temp z2": [
  {
   "setting": "InitialSettingsComfortTemperature_Z2",
   "settingType": "InitialSettings"
  }
 ],
 "uc on main screen": [
  {
   "setting": "InitialSettingsUserControlOnMainScreen",
   "settingType": "InitialSettings"
  }
 ],
 "t_eha threshold": [
  {
   "setting": "DefrostTehaTreshold",
   "settingType": "Defrost"
  }
 ],
 "time under t_eha threshold": [
  {
   "setting": "DefrostTimeUnderTehaTreshold",
   "settingType": "Defrost"
  }
 ],
 "defrost_active_time": [
  {
   "setting": "DefrostDefrostActiveTime",
   "settingType": "Defrost"
  }
 ],
 "t_evap threshold": [
  {
   "setting": "DefrostTevapTreshold",
   "settingType": "Defrost"
  }
 ],
 "time under t_evap threshold": [
  {
   "setting": "DefrostTimeUnderTevapTreshold",
   "settingType": "Defrost"
  }
 ],
 "stop pressure threshold": [
  {
   "setting": "DefrostStopPressureTreshold",
   "settingType": "Defrost"
  }
 ],
 "time under stop press. th.": [
  {
   "setting": "DefrostTimeUnderStopPressureTreshold",
   "settingType": "Defrost"
  }
 ],
 "installation type": [
  {
   "setting": "HeatingCtrlInstallationType",
   "settingType": "HeatingCtrl"
  }
 ],
 "ch setpoint high offset": [
  {
   "setting": "HeatingCtrlCentralHeatingSetpointHighOffset",
   "settingType": "HeatingCtrl"
  }
 ],
 "ch setpoint margin low": [
  {
   "setting": "HeatingCtrlCentralHeatingSetpointMarginLow",
   "settingType": "HeatingCtrl"
  }
 ],
 "ch setpoint margin high": [
  {
   "setting": "HeatingCtrlCentralHeatingSetpointMarginHigh",
   "settingType": "HeatingCtrl"
  }
 ],
 "dhw setpoint high offset": [
  {
   "setting": "HeatingCtrlDomesticHotWaterSetpointHighOffset",
   "settingType": "HeatingCtrl"
  }
 ],
 "dhw setpoint margin low": [
  {
   "setting": "HeatingCtrlDomesticHotWaterSetpointMarginLow",
   "settingType": "HeatingCtrl"
  }
 ],
 "dhw setpoint margin high": [
  {
   "setting": "HeatingCtrlDomesticHotWaterSetpointMarginHigh",
   "settingType": "HeatingCtrl"
  }
 ],
 "transition time": [
  {
   "setting": "HeatingCtrlTransitionTime",
   "settingType": "HeatingCtrl"
  }
 ],
 "max allowed temperature": [
  {
   "setting": "HeatingCtrlMaximumAllowedTemperature",
   "settingType": "HeatingCtrl"
  }
 ],
 "max allowed temp hyst.": [
  {
   "setting": "HeatingCtrlMaximumAllowedTemperatureHysteresis",
   "settingType": "HeatingCtrl"
  }
 ],
 "minimum hp power": [
  {
   "setting": "HeatingCtrlMinimumHeatPumpPower",
   "settingType": "HeatingCtrl"
  }
 ],
 "maximum hp power": [
  {
   "setting": "HeatingCtrlMaximumHeatPumpPower",
   "settingType": "HeatingCtrl"
  }
 ],
 "hp power step": [
  {
   "setting": "HeatingCtrlHeatPumpPowerStep",
   "settingType": "HeatingCtrl"
  }
 ],
 "ch setpoint max low time": [
  {
   "setting": "HeatingCtrlCentralHeatingSetpointMaximumLowTime",
   "settingType": "HeatingCtrl"
  }
 ],
 "dhw setpoint max low time": [
  {
   "setting": "HeatingCtrlDomesticHotWaterSetpointMaximumLowTime",
   "settingType": "HeatingCtrl"
  }
 ],
 "control ch": [
  {
   "setting": "HeatingCtrlControlCh",
   "settingType": "HeatingCtrl"
  }
 ],
 "control dhw": [
  {
   "setting": "HeatingCtrlControlDhw",
   "settingType": "HeatingCtrl"
  }
 ],
 "backup ch": [
  {
   "setting": "HeatingCtrlBackupCh",
   "settingType": "HeatingCtrl"
  }
 ],
 "backup dhw": [
  {
   "setting": "HeatingCtrlBackupDhw",
   "settingType": "HeatingCtrl"
  }
 ],
 "antilegio enabled": [
  {
   "setting": "HeatingCtrlAntiLegionellaEnabled",
   "settingType": "HeatingCtrl"
  }
 ],
 "n set": [
  {
   "setting": "HygroCFan",
   "settingType": "Hygro"
  }
 ],
 "p factor 1": [
  {
   "setting": "HygroPFactor1",
   "settingType": "Hygro"
  }
 ],
 "i factor 1": [
  {
   "setting": "HygroIFactor1",
   "settingType": "Hygro"
  }
 ],
 "p factor 2": [
  {
   "setting": "HygroPFactor2",
   "settingType": "Hygro"
  }
 ],
 "i factor 2": [
  {
   "setting": "HygroIFactor2",
   "settingType": "Hygro"
  }
 ],
 "pwm pi tr": [
  {
   "setting": "HygroPwmPiTr",
   "settingType": "Hygro"
  }
 ],
 "n mode": [
  {
   "setting": "HygroNMode",
   "settingType": "Hygro"
  }
 ],
 "dpi set low": [
  {
   "setting": "HygroDpiSetLow",
   "settingType": "Hygro"
  }
 ],
 "dpi set medium 1": [
  {
   "setting": "HygroDpiSetMedium1",
   "settingType": "Hygro"
  }
 ],
 "dpi set medium 2": [
  {
   "setting": "HygroDpiSetMedium2",
   "settingType": "Hygro"
  }
 ],
 "dpi set high": [
  {
   "setting": "HygroDpiSetHigh",
   "settingType": "Hygro"
  }
 ],
 "c fan": [
  {
   "setting": "HygroCFan",
   "settingType": "Hygro"
  }
 ],
 "ko": [
  {
   "setting": "HygroKo",
   "settingType": "Hygro"
  }
 ],
 "pwm set": [
  {
   "setting": "HygroPwmSet",
   "settingType": "Hygro"
  }
 ],
 "qswitch": [
  {
   "setting": "HygroQSwitch",
   "settingType": "Hygro"
  }
 ],
 "qhyst": [
  {
   "setting": "HygroQHyst",
   "settingType": "Hygro"
  }
 ],
 "qstab": [
  {
   "setting": "HygroQStab",
   "settingType": "Hygro"
  }
 ],
 "fan speed mode": [
  {
   "setting": "HygroFanSpeedMode",
   "settingType": "Hygro"
  }
 ],
 "pwmdpilow tr": [
  {
   "setting": "HygroPwmDpiLowTr",
   "settingType": "Hygro"
  }
 ],
 "pwmdpimedium1 tr": [
  {
   "setting": "HygroPwmDpiMedium1Tr",
   "settingType": "Hygro"
  }
 ],
 "pwmdpimedium2 tr": [
  {
   "setting": "HygroPwmDpiMedium2Tr",
   "settingType": "Hygro"
  }
 ],
 "pwmdpi3 tr": [
  {
   "setting": "HygroPwmDpi3Tr",
   "settingType": "Hygro"
  }
 ],
 "pwmdpi4 tr": [
  {
   "setting": "HygroPwmDpi4Tr",
   "settingType": "Hygro"
  }
 ],
 "dpi stable": [
  {
   "setting": "HygroDpiStable",
   "settingType": "Hygro"
  }
 ],
 "pwm stable": [
  {
   "setting": "HygroPwmStable",
   "settingType": "Hygro"
  }
 ],
 "quad interp": [
  {
   "setting": "HygroQuadInterp",
   "settingType": "Hygro"
  }
 ],
 "pwmmax": [
  {
   "setting": "HygroPwmMax",
   "settingType": "Hygro"
  }
 ],
 "heater_relay_1": [
  {
   "setting": "BoilerCtrlHeaterRelay1",
   "settingType": "BoilerCtrl"
  }
 ],
 "heater_relay_2": [
  {
   "setting": "BoilerCtrlHeaterRelay2",
   "settingType": "BoilerCtrl"
  }
 ],
 "circ_pump_pwm_output": [
  {
   "setting": "BoilerCtrlCircPumpPwmOutput",
   "settingType": "BoilerCtrl"
  }
 ],
 "central hum enabled": [
  {
   "setting": "CentralHumCtrlEnabled",
   "settingType": "CentralHumCtrl"
  }
 ],
 "central hum delta": [
  {
   "setting": "CentralHumCtrlDelta",
   "settingType": "CentralHumCtrl"
  }
 ],
 "central hum trend weight": [
  {
   "setting": "CentralHumCtrlTrendWeight",
   "settingType": "CentralHumCtrl"
  }
 ],
 "central hum threshold on": [
  {
   "setting": "CentralHumCtrlThresholdOn",
   "settingType": "CentralHumCtrl"
  }
 ],
 "central hum threshold off": [
  {
   "setting": "CentralHumCtrlThresholdOff",
   "settingType": "CentralHumCtrl"
  }
 ],
 "central hum timeout": [
  {
   "setting": "CentralHumCtrlTimeout",
   "settingType": "CentralHumCtrl"
  }
 ]
};
