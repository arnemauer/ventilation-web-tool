"""
Eigen Nederlandse namen en omschrijvingen voor de parameters.

Geschreven op basis van wat de parameter volgens zijn naam, bereik en
keuzelijst is. Dit is eigen tekst, geen vertaling van iets bestaands.

Waar niet met zekerheid te zeggen valt wat een instelling doet, staat er alleen
een leesbare naam en géén omschrijving. Een verzonnen uitleg bij een
ventilatie-instelling is schadelijker dan geen uitleg.

Vorm: setting -> (label, omschrijving of None)
"""

LABELS = {
    # --- Ventilatie -------------------------------------------------------
    'NodeConfigAutomaticMinimum': (
        'Minimumstand automatisch',
        'Laagste ventilatiestand die de automatische regeling gebruikt.'),
    'NodeConfigAutomaticMaximum': (
        'Maximumstand automatisch',
        'Hoogste ventilatiestand die de automatische regeling gebruikt.'),
    'NodeConfigMaximumFlow': (
        'Maximaal debiet',
        'Maximale capaciteit van deze component binnen zijn zone, in m³/h.'),
    'CapacityBox': (
        'Capaciteit box',
        'Maximale capaciteit van de box. Op 0 rekent de box zelf met de som van de zones.'),
    'NodeConfigManualButton1': (
        'Handstand 1',
        'Ventilatiestand bij de eerste handmatige knop.'),
    'NodeConfigManualButton2': (
        'Handstand 2',
        'Ventilatiestand bij de tweede handmatige knop.'),
    'NodeConfigManualButton3': (
        'Handstand 3',
        'Ventilatiestand bij de derde handmatige knop.'),
    'NodeConfigManualTime': (
        'Nalooptijd handstand',
        'Hoe lang een handmatige stand blijft staan voordat de box terugvalt op automatisch.'),
    'NodeConfigSensorVisualisationLevel': (
        'Sensorweergave',
        'Vanaf welke sensorwaarde de bedieningsschakelaar dat met kleur laat zien. Op 0 blijft de weergave uit.'),
    'NodeConfigUserControllerErrorMode': (
        'Foutweergave bedieningsschakelaar',
        'Of de bedieningsschakelaar storingen van de installatie toont.'),

    # --- Vorstbeveiliging -------------------------------------------------
    'FrostProtectHeaterAllowed': (
        'Voorverwarmer toegestaan',
        'Of de vorstbeveiliging de interne voorverwarmer mag gebruiken, als die aanwezig is.'),

    # --- Bypass -----------------------------------------------------------
    'BypassMode': (
        'Bypassstand',
        'Bedrijfsstand van de bypassklep.'),
    'BypassAdaptiveControl': (
        'Adaptieve bypassregeling',
        'Of de bypass zich aanpast aan de gemeten temperaturen in plaats van een vaste drempel te volgen.'),

    # --- Verwarmingssturing ----------------------------------------------
    'HeatingCtrlInstallationType_OLD': ('Installatietype (oud)', None),
    'HeatingCtrlInstallationType': ('Installatietype', None),
    'CVPumpControlOverrunTime': (
        'Nalooptijd cv-pomp',
        'Hoe lang de cv-pomp doordraait nadat de vraag is weggevallen.'),

    'CHDemandMode': ('Stand cv-vraag', 'Hoe de vraag naar centrale verwarming wordt bepaald.'),
    'CHDemandHeatCurveMinusTen': (
        'Stooklijn bij −10 °C',
        'Gewenste aanvoertemperatuur wanneer het buiten −10 °C is.'),
    'CHDemandHeatCurvePlusTwenty': (
        'Stooklijn bij +20 °C',
        'Gewenste aanvoertemperatuur wanneer het buiten +20 °C is.'),
    'CHDemandBoostTemperature': ('Boosttemperatuur cv', 'Aanvoertemperatuur in de boost-stand.'),
    'CHDemandOffTemperature': ('Uitschakeltemperatuur cv', 'Buitentemperatuur waarboven de cv-vraag vervalt.'),

    'DHWDemandMode': ('Stand warmwatervraag', 'Hoe de vraag naar warm tapwater wordt bepaald.'),
    'DHWDemandComfortTemperature': ('Comforttemperatuur tapwater', None),
    'DHWDemandEcoTemperature': ('Zuinigtemperatuur tapwater', None),
    'DHWDemandBoostTemperature': ('Boosttemperatuur tapwater', None),
    'DHWDemandOffTemperature': ('Uitschakeltemperatuur tapwater', None),

    # --- Sensoren ---------------------------------------------------------
    'NodeConfigCo2Setpoint': (
        'CO₂-instelpunt',
        'Waarde in ppm waarboven deze component meer gaat ventileren.'),
    'NodeParaCo2Algoritme': (
        'CO₂-algoritme',
        'Welke regelstrategie de CO₂-sturing volgt.'),
    'NodeConfigRhSetpoint': (
        'Vochtinstelpunt',
        'Relatieve vochtigheid in procent waarboven deze component meer gaat ventileren.'),
    'NodeConfigRhDelta': (
        'Vochtsturing op verandering',
        'Reageren op een snelle stijging van de vochtigheid in plaats van alleen op het instelpunt.'),
    'NodeConfigTemperatureDependent': (
        'Temperatuurafhankelijk',
        'De automatische regeling houdt rekening met de buitentemperatuur.'),
    'SensorCtrlCo2Setpoint': ('CO₂-instelpunt (centraal)', 'CO₂-instelpunt voor de hele installatie.'),
    'SensorCtrlRhSetpoint': ('Vochtinstelpunt (centraal)', 'Vochtinstelpunt voor de hele installatie.'),
    'SensorCtrlRhDelta': ('Vochtsturing op verandering (centraal)', None),
    'SensorCtrlTemperatureDependent': ('Temperatuurafhankelijk (centraal)', None),
    'CentralHumCtrlEnabled': ('Centrale vochtregeling', 'Vochtregeling op installatieniveau in- of uitschakelen.'),

    # --- Schakelcontact ---------------------------------------------------
    'NodeConfigSwitchSensorSwitchMode': (
        'Functie schakelcontact',
        'Waarvoor het schakelcontact wordt gebruikt.'),
    'NodeConfigSwitchSensorSwitchValue': (
        'Stand bij schakelen',
        'Ventilatiestand zolang het contact gesloten is.'),
    'NodeConfigSwitchSensorOverrunTime': (
        'Nalooptijd schakelcontact',
        'Hoe lang de stand blijft staan nadat het contact weer opent.'),

    # --- Actuator ---------------------------------------------------------
    'NodeConfigActuatorRange': ('Slaglengte actuator', 'Aantal stappen tussen dicht en volledig open.'),
    'NodeConfigActuatorHybridValue': ('Hybride waarde actuator', None),
    'NodeConfigActuatorType': ('Type actuator', 'Of de aansluiting als ingang, doorvoer of uitgang werkt.'),
    'NodeConfigActuatorKeepPoweredAtEnd': (
        'Spanning houden aan het eind',
        'De actuator onder spanning houden nadat hij zijn eindstand heeft bereikt.'),
    'NodeConfigActuatorOutputAsPwm': ('Uitgangssignaal actuator', 'Analoog of als pulsbreedte.'),

    # --- Ventilatief koelen ----------------------------------------------
    'VentCoolMode': ('Ventilatief koelen', 'Extra ventileren om de woning te koelen.'),
    'VentCoolStartTime': ('Starttijd', 'Tijdstip waarop ventilatief koelen mag beginnen.'),
    'VentCoolStopTime': ('Stoptijd', 'Tijdstip waarop ventilatief koelen stopt.'),
    'VentCoolActiveOnMonday': ('Actief op maandag', None),
    'VentCoolActiveOnTuesday': ('Actief op dinsdag', None),
    'VentCoolActiveOnWednesday': ('Actief op woensdag', None),
    'VentCoolActiveOnThursday': ('Actief op donderdag', None),
    'VentCoolActiveOnFriday': ('Actief op vrijdag', None),
    'VentCoolActiveOnSaturday': ('Actief op zaterdag', None),
    'VentCoolActiveOnSunday': ('Actief op zondag', None),
    'VentCoolMaxWindSpeed': ('Maximale windsnelheid', 'Waarde waarboven ventilatief koelen wordt gestaakt.'),

    # --- Nightboost -------------------------------------------------------
    'NightBoostActive': ('Nightboost', "'s Nachts extra ventileren om warmte af te voeren."),
    'NightBoostTemperatureSetpoint': (
        'Comforttemperatuur',
        'Binnentemperatuur die nightboost probeert te bereiken.'),
    'NightBoostStartTime': ('Starttijd', 'Tijdstip waarop nightboost mag beginnen.'),
    'NightBoostStopTime': ('Stoptijd', 'Tijdstip waarop nightboost stopt.'),
    'NightBoostStartMonth': ('Startmaand', 'Eerste maand van het seizoen waarin nightboost werkt.'),
    'NightBoostStopMonth': ('Stopmaand', 'Laatste maand van het seizoen waarin nightboost werkt.'),
    'NightBoostCutoffRequest': ('Afkapstand', 'Bovengrens voor de ventilatievraag tijdens nightboost.'),

    # --- Kalibratie -------------------------------------------------------
    'FanAutoCalibrationActive': (
        'Automatisch kalibreren',
        'De box stelt de ventilatorcurve zelf bij.'),
    'FanMaximumHighLevelOnSilentBox': ('Maximumstand', None),
    'FanCalibByCode': ('Kalibratiecode', None),
    'FanCalibrationOnManual2Active': (
        'Kalibreren op handstand',
        'Welke handmatige knop als referentie geldt bij het kalibreren.'),
    'FanGroundBoundActive': ('Grondgebonden woning', None),
    'FanGroundBoundHeadCount': ('Aantal bewoners', 'Uitgangspunt voor de benodigde ventilatiecapaciteit.'),
    'FanCurve': ('Ventilatorcurve', 'Welke curve de box aanhoudt; hangt af van het bouwjaar van het toestel.'),
    'FanQzone1Max': ('Maximaal debiet zone 1', None),
    'FanQzone2Max': ('Maximaal debiet zone 2', None),
    'FanPzone1Max': ('Maximale druk zone 1', None),
    'FanPzone2Max': ('Maximale druk zone 2', None),
    'FanPinMax': ('Maximale druk toevoer', None),
    'FanPoutMax': ('Maximale druk afvoer', None),
    'FanQoutMax': ('Maximaal debiet afvoer', None),
    'FanOutputAsPwm': ('Uitgangssignaal ventilator', 'Analoog of als pulsbreedte.'),
    'RenoFanSpeedCalib': ('Kalibratie toerental', None),

    # --- Modbus en netwerk ------------------------------------------------
    'ModBusAddress': ('Modbus-adres', 'Adres van de box op de Modbus.'),
    'ModBusOffset': ('Modbus-offset', 'Of de registers vanaf 0 of vanaf 1 worden geteld.'),
    'ModBusSpeed': ('Modbus-snelheid', None),
    'ModBusParity': ('Modbus-pariteit', None),
    'ModBusStopbit': ('Modbus-stopbits', None),
    'TcpIpDhcpActive': ('DHCP', 'Het adres automatisch laten toewijzen in plaats van vast instellen.'),
    'TcpIpStaticIpAddress': ('Vast IP-adres', 'Wordt alleen gebruikt als DHCP uit staat.'),
    'TcpIpStaticDefaultGateway': ('Vaste gateway', 'Wordt alleen gebruikt als DHCP uit staat.'),
    'TcpIpStaticNetworkMask': ('Vast subnetmasker', 'Wordt alleen gebruikt als DHCP uit staat.'),
    'TcpIpHostnameNumber': ('Hostnaamnummer', None),

    # --- Service ----------------------------------------------------------
    # Van deze groep is lang niet altijd te zeggen wat er precies gebeurt;
    # daar staat bewust geen omschrijving bij.
    'NodeParaOverrule': ('Overrulewaarde', 'Stand die de component aanhoudt zolang hij overruled is.'),
    'FanAbsoluteMinimumFanspeed': ('Absoluut minimumtoerental', None),
    'FanAbsoluteMaximumFanspeed': ('Absoluut maximumtoerental', None),
    'FanKvalueLekBox': ('K-waarde lekkage box', None),
    'FanKvalueLekValve': ('K-waarde lekkage klep', None),
    'FanKvalueLekFraction': ('Lekfractie', None),
    'FanPwmVoltage': ('PWM-spanning', None),
    'FanPwmFrequency': ('PWM-frequentie', None),
    'VentCtrlTemperatureDependend': ('Temperatuurafhankelijk', None),
    'VentCtrlBalanceTreshold': ('Balansdrempel', None),
    'VentCtrlTemperatureLow': ('Ondergrens temperatuur', None),
    'VentCtrlTemperatureHigh': ('Bovengrens temperatuur', None),
    'NodeParaMotionOpenDirection': ('Draairichting openen', None),
    'NodeParaMotionHomingDirection': ('Draairichting nulstand', None),
    'NodeParaMotionMaximumMotorSteps': ('Maximaal aantal motorstappen', None),
    'NodeParaClimaIncomingTemperatureRequest': ('Gevraagde inblaastemperatuur', None),
    'NodeParaClimaExternalTemperatureTrigger': ('Drempel buitentemperatuur', None),
    'CommDllSetRegPower': ('Zendvermogen RF', 'Hoger vermogen kost meer stroom en is zelden nodig.'),
    'NodeParaSetRegPower': ('Zendvermogen RF (node)', 'Hoger vermogen kost meer stroom en is zelden nodig.'),

    # --- Eerste ingebruikname --------------------------------------------
    'InitialSettingsCountry': ('Land', 'Bepaalt welke landinstellingen de box aanhoudt.'),
    'InitialSettingsLanguage': ('Taal', 'Taal van het display op de box.'),
}


# Keuzelijsten in eigen woorden. Waarden die puur feitelijk zijn (snelheden,
# maandnamen, spanningen) blijven staan zoals ze zijn.
OPTION_LABELS = {
    'OFF': 'Uit',
    'ON': 'Aan',
    'Automatic': 'Automatisch',
    'Close': 'Dicht',
    'Open': 'Open',
    'Disabled': 'Uitgeschakeld',
    'On input': 'Bij invoer',
    'Manual OFF': 'Handmatig uit',
    'Boost': 'Boost',
    'Overrule': 'Overrulen',
    'Heatpump': 'Warmtepomp',
    'Presence': 'Aanwezigheid',
    'Unbalance': 'Onbalans',
    'None': 'Geen',
    'Alarm': 'Alarm',
    'Alarm / Overrule': 'Alarm of overrulen',
    'Input': 'Ingang',
    'Transit': 'Doorvoer',
    'Output': 'Uitgang',
    'Standard Air Quality detection': 'Luchtkwaliteit',
    'Toilet Detection': 'Toiletdetectie',
    'Not ground bound': 'Niet grondgebonden',
    'Ground bound': 'Grondgebonden',
    '1 person': '1 persoon',
    '2 persons': '2 personen',
    '4 persons': '4 personen',
    'Manual button 2': 'Handstand 2',
    'Manual button 3': 'Handstand 3',
    'Even': 'Even',
    'Odd': 'Oneven',
    'No config': 'Niet ingesteld',
    'Free': 'Vrij',
    'January': 'januari', 'February': 'februari', 'March': 'maart',
    'April': 'april', 'May': 'mei', 'June': 'juni', 'July': 'juli',
    'August': 'augustus', 'September': 'september', 'October': 'oktober',
    'November': 'november', 'December': 'december',
    'Analog (0-10V)': 'Analoog (0–10 V)',
    'PWM (10V)': 'PWM (10 V)',
    'Fan pre aug 2015 (0)': 'Toestel van vóór aug. 2015',
    'Fan 80% (1)': 'Curve 80%',
    'Fan 100% (2) (default post 2020)': 'Curve 100% (standaard vanaf 2020)',
    'Standard (0xC1)': 'Standaard',
    'Low (0xC5)': 'Laag',
    'High (0xC0) NOT RECOMMENDED!': 'Hoog — afgeraden',
}
