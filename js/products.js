/*
 * products.js — een node herleiden tot een herkenbare productnaam.
 *
 * Deze module bepaalt wélke bron voorrang krijgt bij het benoemen van een
 * component:
 *
 *  1. De `type`-kolom uit de `Network`-tabel. Die is het specifiekst: 'ucco2'
 *     zegt CO2-ruimtesensor, waar een productcode vaak alleen een familie
 *     aanduidt.
 *  2. `productVersion`, op te vragen met `NodeParaGet <node> 0`. Voor de box is
 *     dit juist de scherpste bron: die onderscheidt Focus van Energy, terwijl
 *     de typekolom voor beide 'box' zegt.
 *  3. `componentType` — alleen beschikbaar in emulatie; echte hardware geeft
 *     dit veld niet over de bus.
 */

import { PRODUCT_BY_ID, FIRMWARE_RELEASES } from './ducoNames.js';

/**
 * productVersion -> modelfamilie. Nog niet volledig op hardware nagemeten;
 * zie TODO.md.
 */
export const PRODUCT_VERSION = {
  12030: 'UserController',
  12031: 'ControlUnitTronic',
  12034: 'UserController',
  12035: 'ValveSensorless',
  12038: 'DucoBoxFocus',
  12040: 'SwitchSensor',
  13011: 'ControlUnitTronic',
  13032: 'Actuator',
  13064: 'IqUnitDin',
  14033: 'DucoBoxSilent',
  14067: 'UserControllerBattery',
  15047: 'IntelliAirValve',
  16010: 'DucoBoxFocus2',
  16023: 'DucoBoxEnergy',
  16036: 'CommunicationPrint',
  16056: 'DucoBoxConnect',
  17017: 'DucoBoxEco',
  17031: 'BoilerControl',
  17046: 'UserController',
  18083: 'DucoBoxHygro',
  19154: 'DucoBoxEnergy',
  19156: 'DucoBoxEnergy',
  20062: 'DucoBoxReno',
  21123: 'CommunicationPrintWifi',
  22067: 'DucoBoxEnergy',
  22068: 'DucoBoxEnergy',
  22114: 'DucoBoxFocus2',
  22115: 'DucoBoxFocus2',
  22116: 'DucoBoxConnect',
  22117: 'DucoBoxConnect',
  23010: 'DucoBoxEnergy',
};

/** ComponentType -> productnaam. */
export const COMPONENT_NAME = {
  Unknown: 'Onbekend component',
  DucoBoxFocus: 'DucoBox Focus',
  DucoBoxFocus2: 'DucoBox Focus (2e generatie)',
  DucoBoxSilent: 'DucoBox Silent',
  DucoBoxEnergy: 'DucoBox Energy',
  DucoBoxEco: 'DucoBox Eco',
  DucoBoxReno: 'DucoBox Reno',
  DucoBoxHygro: 'DucoBox Hygro',
  DucoBoxConnect: 'DucoBox Connect',
  IqUnitDin: 'IQ-unit DIN',
  IntelliAirValve: 'IntelliAir-klep',
  IntelliAirValveCo2: 'IntelliAir-klep CO2',
  IntelliAirValveRh: 'IntelliAir-klep RV',
  IntelliAirValveSlave: 'IntelliAir-klep (slave)',
  BoxSensorCo2: 'Boxsensor CO2',
  BoxSensorRh: 'Boxsensor RV',
  ValveCo2: 'Regelklep CO2',
  ValveRh: 'Regelklep RV',
  ValveSensorless: 'Regelklep zonder sensor',
  ValveCo2Rh: 'Regelklep CO2 + RV',
  UserController: 'Bedieningsschakelaar',
  UserController2: 'Bedieningsschakelaar (2e generatie)',
  UserControllerCo2: 'Bedieningsschakelaar CO2',
  UserControllerCo22: 'Bedieningsschakelaar CO2 (2e generatie)',
  UserControllerRh: 'Bedieningsschakelaar RV',
  UserControllerRh2: 'Bedieningsschakelaar RV (2e generatie)',
  UserControllerBattery: 'Draadloze bedieningsschakelaar',
  UserControllerPerilex: 'Bedieningsschakelaar Perilex',
  SwitchSensor: 'Schakelaarsensor',
  SwitchSensorOnboard: 'Schakelaarsensor (onboard)',
  Actuator: 'Actuator',
  ControlUnitTronic: 'Controlunit Tronic',
  ControlUnitTronic2: 'Controlunit Tronic (2e generatie)',
  ControlUnitClima: 'Controlunit Clima',
  BoilerControl: 'Boilersturing',
  RoofFan: 'Dakventilator',
  CommunicationPrint: 'Communicatieprint',
  CommunicationPrintWifi: 'Communicatieprint wifi',
  HeatPumpUnit: 'Warmtepompunit',
  WeatherStation: 'Weerstation',
  ExternalTemperatureSensor: 'Externe temperatuursensor',
  Eav: 'EAV-unit',
  IntelliHub: 'IntelliHub',
  DucoGrilleClose: 'DucoGrille Close',
};

/**
 * Typecode uit de `Network`-tabel -> naam.
 *
 * De codes zijn wat het apparaat zelf teruggeeft; de omschrijvingen erachter
 * zijn eigen benamingen naar wat het onderdeel doet. De codes `box`, `uc`,
 * `ucco2`, `ucbat`, `eav` en `switch` zijn waargenomen op echte installaties;
 * de rest is ingevuld naar de productlijn en kan op onbekende modellen
 * afwijken.
 */
export const TYPE_NAME = {
  box: 'DucoBox',
  uc: 'Bedieningsschakelaar',
  ucco2: 'CO2-ruimtesensor met bediening',
  ucrh: 'Vochtruimtesensor met bediening',
  ucvoc: 'VOC-ruimtesensor met bediening',
  ucbat: 'Draadloze bedieningsschakelaar',
  ucbatrh: 'Draadloze vochtsensor met bediening',
  ucp: 'Bedieningsschakelaar Perilex',
  vlv: 'Regelklep',
  vlvsl: 'Regelklep zonder sensor',
  vlvco2: 'CO2-regelklep',
  vlvrh: 'Vochtregelklep',
  vlvvoc: 'VOC-regelklep',
  vlvco2rh: 'CO2- en vochtregelklep',
  vlvsup: 'Toevoerklep',
  vlvoda: 'Buitenluchtklep',
  vlveta: 'Afvoerklep',
  iav: 'Meerzoneklep',
  iavco2: 'Meerzoneklep met CO2-sensor',
  iavrh: 'Meerzoneklep met vochtsensor',
  eav: 'Meerzoneklep',
  act: 'Actuator',
  switch: 'Schakelcontact',
  sw: 'Schakelcontact',
  sens: 'Sensor',
  sensco2: 'CO2-sensor',
  sensrh: 'Vochtsensor',
  bsco2: 'CO2-sensor in de box',
  bsrh: 'Vochtsensor in de box',
  csco2: 'Centrale CO2-sensor',
  comm: 'Communicatieprint',
  commwifi: 'Communicatieprint met wifi',
  tronic: 'Controlunit Tronic',
  clima: 'Elektronisch ventilatierooster',
  klep: 'Roosterunit met klep',
  top: 'Roosterunit Toptronic',
  bc: 'Boilersturing',
  hp: 'Warmtepompunit',
  ws: 'Weerstation',
  rf: 'RF-module',
  iq: 'IQ-unit',
  pwmin: 'PWM-ingang',
  odtsensor: 'Buitentemperatuursensor',
  preheater: 'Voorverwarmer',
  unkn: 'Onbekend component',
};

/**
 * De productcodetabel gebruikt korte labels ('ENERGY', 'SILENT_CONNECT').
 * Voor een box maken we daar de naam van die op de doos staat.
 */
function prettyBoxName(raw) {
  const words = raw.replace(/_/g, ' ').split(/\s+/).filter(Boolean);
  const pretty = words
    .map((w) => (/^[A-Z]{3,}$/.test(w) ? w[0] + w.slice(1).toLowerCase() : w))
    .join(' ');
  return /ducobox/i.test(pretty) ? pretty : `DucoBox ${pretty}`;
}

/**
 * Bepaalt de naam van een node uit wat het toestel zelf teruggeeft: de
 * typekolom uit de Network-tabel, en waar bekend de productcode.
 */
export function productName(node) {
  const pv = String(node.productVersion || '').trim();
  const code = String(node.type || '').trim().toLowerCase();
  const box = isBox(node);

  const fromCode = TYPE_NAME[code] || null;
  const rawVersion = pv ? PRODUCT_BY_ID[pv] : null;
  const fromVersion =
    (rawVersion ? (box ? prettyBoxName(rawVersion) : rawVersion) : null) ||
    (pv && PRODUCT_VERSION[pv] ? COMPONENT_NAME[PRODUCT_VERSION[pv]] : null) ||
    null;
  const fromComponent = node.componentType ? COMPONENT_NAME[node.componentType] : null;

  const name = box
    ? fromVersion || fromComponent || fromCode
    : fromCode || fromComponent || fromVersion;

  if (name) return name;
  return code ? `Onbekend type '${code}'` : 'Onbekend component';
}

/** Bekende firmwarereleases voor een productcode, nieuwste laatst. */
export function knownFirmware(productVersion) {
  return FIRMWARE_RELEASES[String(productVersion || '').trim()] || null;
}

/** Is dit de mastercomponent (de box zelf)? */
export function isBox(node) {
  const code = String(node.type || '').toLowerCase();
  return Number(node.node) === 1 || code === 'box' || Number(node.prnt) === 0;
}

/** Korte omschrijving van de bedrijfstoestand voor in de lijst. */
export const STATE_LABEL = {
  auto: 'Automatisch',
  aut1: 'Boost 10 min',
  aut2: 'Boost 20 min',
  aut3: 'Boost 30 min',
  man1: 'Handmatig 1',
  man2: 'Handmatig 2',
  man3: 'Handmatig 3',
  empt: 'Afwezig',
  prm1: 'Permanent 1',
  prm2: 'Permanent 2',
  prm3: 'Permanent 3',
  alrm: 'Alarm',
};

export const NETWORK_LABEL = {
  wi: 'Bedraad',
  rf: 'Draadloos',
  virt: 'Virtueel',
  wirf: 'Bedraad + RF',
};
