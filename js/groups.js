/*
 * groups.js — de commando-oppervlakte van de DucoBox, zoals waargenomen op de
 * seriële lijn en bij het uitvragen van de menu's.
 *
 * Welke hiervan het aangesloten toestel werkelijk kent, bepaalt `help /all`
 * tijdens het verbinden — deze tabel is de landkaart, niet de waarheid.
 */

/** De 30 parametergroepen: lezen met `get`, schrijven met `set`. */
export const PARAM_GROUPS = [
  { id: 'settings',      label: 'Basisinstellingen',    get: 'SettingsParaGet',        set: 'SettingsParaSet' , settingType: 'InitialSettings' },
  { id: 'fan',           label: 'Ventilator',           get: 'FanParaGet',             set: 'FanParaSet' , settingType: 'Fan' },
  { id: 'ventctrl',      label: 'Ventilatiesturing',    get: 'VentCtrlParaGet',        set: 'VentCtrlParaSet' , settingType: 'VentCtrl' },
  { id: 'ventcool',      label: 'Ventilatief koelen',   get: 'VentCoolParaGet',        set: 'VentCoolParaSet' , settingType: 'VentCool' },
  { id: 'nightboost',    label: 'Nightboost',           get: 'NightBoostParaGet',      set: 'NightBoostParaSet' , settingType: 'NightBoost' },
  { id: 'sensorctrl',    label: 'Sensorsturing',        get: 'SensorCtrlParaGet',      set: 'SensorCtrlParaSet' , settingType: 'SensorCtrl' },
  { id: 'hygro',         label: 'Hygro',                get: 'HygroParaGet',           set: 'HygroParaSet' , settingType: 'Hygro' },
  { id: 'pressure',      label: 'Druk',                 get: 'PressureParaGet',        set: 'PressureParaSet' , settingType: 'Pressure' },
  { id: 'filter',        label: 'Filter',               get: 'FilterParaGet',          set: 'FilterParaSet' , settingType: 'Filter' },
  { id: 'bypass',        label: 'Bypass',               get: 'BypassParaGet',          set: 'BypassParaSet' , settingType: 'Bypass' },
  { id: 'frostprotect',  label: 'Vorstbeveiliging',     get: 'FreezeprotectParaGet',   set: 'FreezeprotectParaSet' , settingType: 'FrostProtect' },
  { id: 'defrost',       label: 'Ontdooien',            get: 'DefrostParaGet',         set: 'DefrostParaSet' , settingType: 'Defrost' },
  { id: 'heatpump',      label: 'Warmtepomp',           get: 'HeatPumpParaGet',        set: 'HeatPumpParaSet' , settingType: 'HeatPump' },
  { id: 'heatingctrl',   label: 'Verwarmingssturing',   get: 'HeatingCtrlParaGet',     set: 'HeatingCtrlParaSet' , settingType: 'HeatingCtrl' },
  { id: 'chdemand',      label: 'CV-vraag',             get: 'chdemandparaget',        set: 'chdemandparaset' , settingType: 'CentralHeatingDemand' },
  { id: 'dhwdemand',     label: 'Warmwatervraag',       get: 'dhwdemandparaget',       set: 'dhwdemandparaset' , settingType: 'DomesticHotWaterDemand' },
  { id: 'boilerctrl',    label: 'Boilersturing',        get: 'BoilerCtrlParaGet',      set: 'BoilerCtrlParaSet' , settingType: 'BoilerCtrl' },
  { id: 'circpump',      label: 'Circulatiepomp',       get: 'circpumpparaget',        set: 'circpumpparaset' , settingType: 'CirculationPump' },
  { id: 'cvpump',        label: 'CV-pompsturing',       get: 'CVPumpControlParaGet',   set: 'CVPumpControlParaSet' , settingType: 'CVPumpControl' },
  { id: 'centralhum',    label: 'Centrale bevochtiging', get: 'CentralHumCtrlparaget', set: 'CentralHumCtrlparaset' , settingType: 'CentralHumCtrl' },
  { id: 'eev',           label: 'Expansieventiel',      get: 'EevParaGet',             set: 'EevParaSet' , settingType: 'Eev' },
  { id: 'eevctrl',       label: 'Expansieventielsturing', get: 'EevCtrlParaGet',       set: 'EevCtrlParaSet' , settingType: 'EevCtrl' },
  { id: 'weatherstation', label: 'Weerstation',         get: 'WeatherStationParaGet',  set: 'WeatherStationParaSet' , settingType: 'WeatherStation' },
  { id: 'motor',         label: 'Motor',                get: 'MotorParaGet',           set: 'MotorParaSet', needsIndex: true, indexLabel: 'Motor' , settingType: 'Motor' },
  { id: 'io',            label: 'IO / netwerk',         get: 'IoParaGet',              set: 'ioParaSet', sectioned: true },
  { id: 'modbus',        label: 'Modbus',               get: 'ModbusParaGet',          set: 'modbusParaSet' , settingType: 'ModBus' },
  { id: 'nodeconfig',    label: 'Nodeconfiguratie',     get: 'NodeConfigGet',          set: 'nodeConfigSet', needsNode: true , settingType: 'NodeConfig' },
  // Groepen die pas later zijn waargenomen, op nieuwere firmware (23010).
  { id: 'flowmngr',      label: 'Debietbeheer',         get: 'FlowMngrParaGet',        set: 'FlowMngrParaSet' },
  { id: 'fanctrl',       label: 'Ventilatorregeling',   get: 'FanCtrlParaGet',         set: 'FanCtrlParaSet' },
  { id: 'sensor',        label: 'Sensor',               get: 'SensorParaGet',          set: 'SensorParaSet' },
  { id: 'fancalib',      label: 'Ventilatorkalibratie', get: 'FanCalibCfgParaGet',     set: 'FanCalibCfgParaSet' },
  // Automatische bezettingsschatting; waargenomen op een Focus.
  { id: 'autohc',        label: 'Automatische bezetting', get: 'AutoHcParaGet',        set: 'AutoHcParaSet' },
];

/** Read-only informatiecommando's. Sommige leveren key/value, andere vrije tekst. */
export const INFO_COMMANDS = [
  { id: 'swversion',      label: 'Softwareversie',       cmd: 'swversion' },
  { id: 'boardinfo',      label: 'Board',                cmd: 'boardinfo' },
  { id: 'network_info',   label: 'Netwerk (IP)',         cmd: 'network_info' },
  { id: 'nodeinfo',       label: 'Node-info',            cmd: 'nodeinfo', needsNode: true },
  { id: 'faninfo',        label: 'Ventilator',           cmd: 'FanInfo' },
  { id: 'fanctrlinfo',    label: 'Ventilatorsturing',    cmd: 'fanctrlinfo' },
  { id: 'sensorinfo',     label: 'Sensoren',             cmd: 'SensorInfo' },
  { id: 'temperatureinfo', label: 'Temperaturen',        cmd: 'temperatureinfo' },
  { id: 'pressureinfo',   label: 'Druk',                 cmd: 'pressureinfo' },
  { id: 'filterinfo',     label: 'Filter',               cmd: 'filterinfo' },
  { id: 'bypassinfo',     label: 'Bypass',               cmd: 'bypassinfo' },
  { id: 'freezeprotect',  label: 'Vorstbeveiliging',     cmd: 'FreezeprotectInfo' },
  { id: 'heatpumpinfo',   label: 'Warmtepomp',           cmd: 'heatpumpinfo' },
  { id: 'heatpumperrorlog', label: 'Warmtepomp foutlog', cmd: 'heatpumperrorlog' },
  { id: 'statusmonitor',  label: 'Statusmonitor',        cmd: 'StatusMonitorInfo' },
  { id: 'eevinfo',        label: 'Expansieventiel',      cmd: 'eevinfo' },
  { id: 'circpumpinfo',   label: 'Circulatiepomp',       cmd: 'circpumpinfo' },
  { id: 'nightboostinfo', label: 'Nightboost',           cmd: 'nightboostinfo' },
  { id: 'weatherstation', label: 'Weerstation',          cmd: 'WeatherStationInfo' },
  { id: 'commspiinfo',    label: 'SPI-communicatie',     cmd: 'CommSpiInfo' },
  { id: 'commnlinfo',     label: 'NL-communicatie',      cmd: 'CommNlInfo' },
  { id: 'sdcardinfo',     label: 'SD-kaart',             cmd: 'SdcardInfo' },
  { id: 'comminfo',       label: 'Communicatie',         cmd: 'CommInfo' },
  { id: 'commdllinfo',    label: 'Comm DLL',             cmd: 'CommDllInfo' },
  { id: 'flowmngrinfo',   label: 'Debietbeheer',         cmd: 'FlowMngrInfo' },
  { id: 'fancalibinfo',   label: 'Ventilatorkalibratie', cmd: 'FanCalibInfo' },
  { id: 'sensorctrlinfo', label: 'Sensorsturing',        cmd: 'SensorCtrlInfo' },
  { id: 'deviceinfo',     label: 'Toestel',              cmd: 'DeviceInfo' },
  { id: 'timeventinfo',   label: 'Tijdventilatie',       cmd: 'TimeVentInfo' },
  { id: 'timeprograminfo', label: 'Tijdprogramma',       cmd: 'TimeProgramInfo', timeoutSec: 8 },
  // Waargenomen op een Focus (16010.4.7.0). Alleen-lezen.
  { id: 'fanspeed',       label: 'Toerental',            cmd: 'FanSpeed' },
  { id: 'fanperform',     label: 'Ventilatorprestatie',  cmd: 'FanPerformGet' },
  { id: 'autohcinfo',     label: 'Automatische bezetting', cmd: 'AutoHcInfo' },
  { id: 'ventcoolinfo',   label: 'Ventilatief koelen',   cmd: 'VentCoolInfo' },
  { id: 'rfarbitrator',   label: 'RF-arbiter',           cmd: 'RfArbitratorInfo' },
  { id: 'bmbreplaceinfo', label: 'Printvervanging',      cmd: 'BMBReplaceInfo' },
  { id: 'swuploadstatus', label: 'Firmware-upload',      cmd: 'SwUploadStatus' },
  { id: 'coregeterror',   label: 'Laatste fout',         cmd: 'CoreGetError' },
  { id: 'rtc',            label: 'Realtimeklok',         cmd: 'RtcGetTime' },
  { id: 'logprint',       label: 'Logboek',              cmd: 'LogPrint', timeoutSec: 10 },
];

/** Tabelcommando's: pipe-gescheiden met een kopregel. */
export const TABLE_COMMANDS = [
  {
    id: 'network',
    label: 'Netwerk',
    cmd: 'Network',
    endTrigger: '--- end list ---',
    timeoutSec: 5,
    headerHints: ['node'],
  },
  {
    id: 'netwversion',
    label: 'Firmwareversies',
    cmd: 'netwversion',
    endTrigger: 'end list',
    timeoutSec: 5,
    headerHints: ['node', 'version'],
  },
  {
    id: 'netwserial',
    label: 'Serienummers',
    cmd: 'netwserial',
    endTrigger: 'end list',
    timeoutSec: 5,
    headerHints: ['node'],
  },
];

/**
 * Commando's die persistente staat wijzigen of wissen. Deze krijgen in de UI
 * een expliciete bevestiging: het risico hoort zichtbaar te zijn op het moment
 * dat je het neemt.
 */
export const DANGEROUS = new Set(
  [
    'resettodefaults',
    'networkclear',
    'nodereset',
    'reset',
    'dataclear',
    'datadefaults',
    'logclear',
    'testclear',
    'nodeloaddefaults',
    'ducoserialset',
    'wifikeyset',
    'swuploadrestart',
    'sdcardreset',
    'servercertstoreflash',
    'servercertgenkeys',
    'testmode',
    'boardset',
    'bootmode',

    // Waargenomen op een Focus (firmware 16010.4.7.0). Deze grijpen in op de
    // printplaat, het radiodeel of de ventilatorregeling.
    'bmbreplacetobmb',     // overschrijft de gegevens op de print vanaf de SD-kaart
    'bmbreplacetosd',      // schrijft de printgegevens naar de SD-kaart
    'rfenable',            // RfEnable 0 koppelt alle draadloze componenten los
    'commdlldefaults',     // radioregisters terug naar standaard
    'commdllsetreg',       // schrijft een radioregister rechtstreeks
    'dataallowsave',       // bepaalt of wijzigingen worden opgeslagen
    'fancalibstart',       // start een kalibratie; de ventilator loopt de stappen af
    'fancalibclear',       // wist de kalibratie
    'fancalibset',         // schrijft de k-waarde van een klep
    'fansettarget',        // overschrijft de ventilatorregeling met een vaste PWM
    'fanspeedemul',        // laat de regeling rekenen met een verzonnen toerental
    'fansetcorrection',    // past de ventilatorcurve aan
    'fanpwmfrequencyset',  // wijzigt de PWM-frequentie naar de ventilator
    'nodesetoverrule',     // houdt een component in een vaste stand
    'virtadd',             // voegt een virtuele component toe
    'virtremove',          // verwijdert virtuele componenten — ook bestaande
    'virtinput',           // stuurt verzonnen invoer naar een virtuele component
  ].map((s) => s.toLowerCase())
);

export function isDangerous(cmd) {
  return DANGEROUS.has(cmd.trim().split(/\s+/)[0].toLowerCase());
}

/**
 * Acties op één component. `NodeSaveData` bestaat voor elke node; de andere
 * twee grijpen dieper in en krijgen daarom een bevestiging met waarschuwing.
 */
export const NODE_ACTIONS = [
  {
    id: 'save',
    label: 'Instellingen opslaan',
    cmd: (n) => `NodeSaveData ${n}`,
    checkDone: true,
    hint: 'Schrijft de instellingen van deze component naar flash. Zonder dit overleeft een wijziging geen herstart.',
  },
  {
    id: 'defaults',
    label: 'Fabriekswaarden herstellen',
    cmd: (n) => `nodeLoadDefaults ${n}`,
    checkDone: true,
    danger: true,
    hint: 'Zet alle parameters van deze component terug naar de fabriekswaarden.',
  },
  {
    id: 'reset',
    label: 'Component herstarten',
    cmd: (n) => `NodeReset ${n}`,
    danger: true,
    hint: 'Herstart deze component. Hij is even niet bereikbaar.',
  },
];

/** Installatiebrede onderhoudsacties. */
export const ACTIONS = [
  { id: 'rtcset',    label: 'Klok gelijkzetten',       dynamic: 'rtcSet',
    hint: 'Zet de realtimeklok van de box op de tijd van deze computer.' },
  { id: 'logclear',  label: 'Logboek wissen',          cmd: 'LogClear', checkDone: true,
    hint: 'Wist het foutlogboek van de box.' },
  { id: 'defaults',  label: 'Fabrieksinstellingen',    cmd: 'ResetToDefaults', checkDone: true,
    hint: 'Zet alle parameters terug naar fabriekswaarden. Configuratie gaat verloren.' },
  { id: 'netwclear', label: 'Netwerk wissen',          cmd: 'NetworkClear', checkDone: true,
    hint: 'Verwijdert alle nodes uit het netwerk. Alles moet daarna opnieuw worden aangemeld.' },
  { id: 'reset',     label: 'Box herstarten',          cmd: 'reset',
    hint: 'Herstart de DucoBox. De verbinding valt kort weg.' },
];
