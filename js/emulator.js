/*
 * emulator.js — een nagebootste DucoBox.
 *
 * Levert een object dat zich voordoet als een SerialPort, zodat DucoSerial er
 * niets van merkt: dezelfde readable/writable-streams, dezelfde ASCII-dialoog,
 * dezelfde timing. Dat maakt het bruikbaar om de app te doorlopen zonder box,
 * en om te controleren of een wijziging het protocol niet breekt.
 *
 * De staat is veranderlijk: wat je wegschrijft lees je daarna ook echt terug.
 *
 * Zonder profiel draait de emulator op verzonnen maar plausibele gegevens. Kies
 * je een profiel uit fixtures.js, dan komen de nodelijst, parameternamen en
 * waarden uit een opgeslagen installatiebestand.
 *
 * Welke commando's de nagebootste box kent, volgt uit zijn type (boxtypes.js):
 * een Silent meldt geen temperaturen of luchtdebieten, want die heeft hij niet.
 *
 * Profielen uit fixtures-logs.js gaan verder: die geven letterlijk de antwoorden
 * die een echte box gaf, inclusief zijn eigen `help /all`.
 */

import { PROFILES } from './fixtures.js';
import { LOG_PROFILES } from './fixtures-logs.js';
import { BOX_FAMILIES, familyFor, commandsFor } from './boxtypes.js';

const ALL_PROFILES = [...PROFILES, ...LOG_PROFILES];

export function listProfiles() {
  return ALL_PROFILES.map((p) => ({ id: p.id, label: p.label }));
}

/** Beheercommando's die elke box kent, los van zijn type. */
const CORE = new Set([
  'help', 'swversion', 'boardinfo', 'network', 'netwversion', 'netwserial',
  'nodeinfo', 'nodeparaget', 'nodeparaset', 'nodeparalist', 'nodesavedata',
  'installerset', 'nodesetparent', 'nodesetasso', 'comminfo', 'nodeloaddefaults',
  'nodereset', 'logprint', 'logclear', 'rtcgettime', 'rtcsettime',
  'networkclear', 'reset',
]);

/* ------------------------------------------- waarden in een antwoordregel */

const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST',
  'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

/** Het bereik achteraan een parameterregel: `[0:1:255]`, `[1-253]` of `[0:16]`. */
function lineRange(text) {
  let m = text.match(/\[(-?\d+):(-?\d+):(-?\d+)\]\s*$/);
  if (m) return { min: Number(m[1]), max: Number(m[3]) };
  m = text.match(/\[(-?\d+)[-:](-?\d+)\]\s*$/);
  if (m) return { min: Number(m[1]), max: Number(m[2]) };
  return null;
}

/** Vervangt `old` door `value`, zonder dat de kolommen verschuiven. */
const fit = (old, value, right = false) =>
  right ? String(value).padStart(old.length) : String(value).padEnd(old.length);

const boolWord = (word, v) =>
  /^(TRUE|FALSE)$/.test(word) ? (v ? 'TRUE' : 'FALSE') : v ? 'ON' : 'OFF';

/**
 * Zet een nieuwe waarde in een parameterregel zoals de box die toont. De box
 * kent een handvol vormen: `400 (rpm) [0:1:65535]`, `0 (OFF) [0:1:1]`,
 * `FALSE (0)`, `22:00 (1320)`, `MAY`, `NONE (0) [0-2]`. Geeft `null` als de
 * waarde buiten het bereik valt of de vorm onbekend is.
 */
function setLineValue(line, v) {
  const m = line.match(/^(\s*\d+\.[^:]*:\s?)(.*)$/);
  if (!m || !Number.isInteger(v)) return null;
  const [, head, rest] = m;
  const range = lineRange(rest);
  if (range && (v < range.min || v > range.max)) return null;

  let r;
  // Een getal vooraan, eventueel met een toelichting als (OFF) of (TRUE).
  // (Niet het uur van een tijd als 22:00: die heeft een eigen regel hieronder.)
  if ((r = rest.match(/^(\s*-?\d+)(?![\d:.])(\s*\((?:ON|OFF|TRUE|FALSE)\)\s*)?(.*)$/))) {
    let label = r[2] || '';
    if (label) {
      const word = label.match(/(ON|OFF|TRUE|FALSE)/)[1];
      label = fit(label, label.replace(word, boolWord(word, v)));
    }
    return head + fit(r[1], v, true) + label + r[3];
  }
  // Een woord als TRUE of OFF, eventueel met de waarde erachter: `FALSE (0)`.
  if ((r = rest.match(/^(\s*)(TRUE|FALSE|ON|OFF)\b(.*)$/))) {
    if (v !== 0 && v !== 1) return null;
    const tail = r[3].replace(/\((\d+)\)/, `(${v})`);
    return head + r[1] + boolWord(r[2], v) + tail;
  }
  // Een tijd met minuten erachter: `22:00 (1320)`.
  if ((r = rest.match(/^(\s*\d{1,2}:\d{2})(\s*)\((\d+)\)(.*)$/))) {
    if (v < 0 || v >= 1440) return null;
    const hhmm = `${Math.floor(v / 60)}:${String(v % 60).padStart(2, '0')}`;
    return head + fit(r[1], hhmm, true) + r[2] + `(${v})` + r[4];
  }
  // Een maand.
  if ((r = rest.match(/^(\s*)([A-Z]+)\s*$/)) && MONTHS.includes(r[2])) {
    if (v < 1 || v > 12) return null;
    return head + r[1] + MONTHS[v - 1];
  }
  // Een keuze met het nummer erachter: `NONE (0) [0-2]`. De naam bij een ander
  // nummer is niet bekend, dus die blijft staan.
  if ((r = rest.match(/^(.*?\()(-?\d+)(\).*)$/))) {
    return head + r[1] + v + r[3];
  }
  return null;
}

/* ------------------------------------------------------------- basisgegevens */

const DEFAULT_STATE = () => ({
  identity: {
    model: 'DucoBox Energy Comfort D325',
    swVersion: '19156.8.3.0',      // productcode 19156 = DucoBox Energy
    productVersion: 19156,
    boardType: 'BMB-IO-WIFI',
    boardRev: '1v2',
    serial: 'DUC2345678',
    bootedAt: Date.now() - 4 * 86400e3 - 7867e3,
  },

  network: {
    ip: '192.168.1.169',
    netmask: '255.255.255.0',
    gateway: '192.168.1.1',
    mac: 'A4:CF:12:9B:00:1F',
  },

  nodes: [
    // De topologie is die van een echte installatie: aan de box hangen kleppen,
    // en daaronder hangen de ruimtesensoren. Zo heeft de boom meer dan één
    // niveau en is de inspringing in het menu ook echt te zien.
    { node: 1,  netw: 'wi',   addr: 1,  sub: 1, type: 'box',    ptcl: 39, cerr: 0,  prnt: 0, asso: 0, stts: '0x00', stat: 'auto', loc: 0, tmp: 21, co2: '-',  rh: '-',  ovr: 0, version: '19156.8.3.0', serial: 'DUC2345678', productVersion: 19156 },
    { node: 2,  netw: 'wi',   addr: 2,  sub: 1, type: 'eav',    ptcl: 39, cerr: 0,  prnt: 1, asso: 0, stts: '0x00', stat: 'auto', loc: 1, tmp: 21, co2: '-',  rh: '-',  ovr: 0, version: '22088.4.2.0', serial: 'EAV3301270', productVersion: 22088 },
    { node: 3,  netw: 'wi',   addr: 3,  sub: 1, type: 'eav',    ptcl: 39, cerr: 0,  prnt: 1, asso: 0, stts: '0x00', stat: 'auto', loc: 2, tmp: 22, co2: '-',  rh: '-',  ovr: 0, version: '22088.4.2.0', serial: 'EAV3300329', productVersion: 22088 },
    { node: 4,  netw: 'wi',   addr: 4,  sub: 1, type: 'ucco2',  ptcl: 39, cerr: 0,  prnt: 2, asso: 2, stts: '0x00', stat: 'auto', loc: 3, tmp: 24, co2: 640, rh: 48,  ovr: 0, version: '17046.16.2.0', serial: 'UCT2127815', productVersion: 17046 },
    { node: 5,  netw: 'wi',   addr: 5,  sub: 1, type: 'ucco2',  ptcl: 39, cerr: 0,  prnt: 3, asso: 3, stts: '0x00', stat: 'auto', loc: 4, tmp: 23, co2: 451, rh: 44,  ovr: 0, version: '17046.16.2.0', serial: 'UCT2362761', productVersion: 17046 },
    { node: 6,  netw: 'rf',   addr: 4,  sub: 1, type: 'ucco2',  ptcl: 255, cerr: 10, prnt: 2, asso: 2, stts: '0x00', stat: 'auto', loc: 5, tmp: 16, co2: 810, rh: 52,  ovr: 0, version: 'Failed', serial: 'Failed', productVersion: 17046 },
    { node: 52, netw: 'virt', addr: 1,  sub: 1, type: 'switch', ptcl: 255, cerr: 0,  prnt: 1, asso: 1, stts: '0x00', stat: '-',    loc: 6, tmp: '-', co2: '-',  rh: '-',  ovr: 0, version: '---', serial: '---', productVersion: 12040 },
  ],

  sensors: { outdoor: 12.4, supply: 19.8, extract: 21.2, exhaust: 13.9, pressureSupply: 48, pressureExhaust: 51 },
  fan: { supplyTarget: 45, exhaustTarget: 45, supplyActual: 44, exhaustActual: 46, supplyRpm: 1420, exhaustRpm: 1465 },
  filter: { daysRemaining: 118, status: 'OK' },
  installState: 0,  // 2 = installateursmodus actief, zoals de echte box meldt
  rtc: null,        // null = klok loopt mee met de browser
  log: [
    '001 | 2026-08-18 03:12:44 | INFO  | Bypass opened',
    '002 | 2026-08-19 21:07:02 | WARN  | Node 3 comm error (cerr=1)',
    '003 | 2026-08-20 06:41:18 | WARN  | Node 3 comm error (cerr=2)',
    '004 | 2026-08-21 14:22:55 | INFO  | Filter counter reset',
  ],
});

/**
 * De parametergroepen. Elke groep kent een get- en set-commando.
 *
 * `setIds` staat in de hulptekst van het set-commando, zoals een echte box het
 * meldt ("set parameter a (0-4) to b"): welke nummers instelbaar zijn. Een
 * parameter zonder bereik is dan wel te zetten, maar zonder begrenzing.
 */
const DEFAULT_GROUPS = () => ({
  settingsparaget: {
    set: 'settingsparaset',
    setIds: '0-3',
    params: [
      { id: 1, name: 'country',           value: 1,       min: 0,  step: 1, max: 4 },
      { id: 2, name: 'housing colour',    value: 0,       min: 0,  step: 1, max: 3 },
      { id: 3, name: 'install complete',  value: 1,       min: 0,  step: 1, max: 1 },
      { id: 4, name: 'Serial Number',     value: 2345678 },
      { id: 5, name: 'comfort temperature', value: 21, unit: 'C', min: 15, step: 1, max: 30 },
      { id: 6, name: 'language',          value: 0,       min: 0,  step: 1, max: 3 },
    ],
  },
  fanparaget: {
    set: 'fanparaset',
    setIds: '0-4',
    params: [
      { id: 1, name: 'Supply Flow Nominal',  value: 300, unit: 'm3/h', min: 0, step: 25, max: 600 },
      { id: 2, name: 'Exhaust Flow Nominal', value: 300, unit: 'm3/h', min: 0, step: 25, max: 600 },
      { id: 3, name: 'Fan Curve',            value: 2,   min: 0,   step: 1,  max: 4 },
      { id: 4, name: 'Max Speed',            value: 3200, unit: 'rpm' },
      { id: 5, name: 'Min Speed',            value: 800,  min: 400, step: 50, max: 1200 },
      { id: 6, name: 'Imbalance Permitted',  value: 0,    min: 0,   step: 1,  max: 1 },
    ],
  },
  ventctrlparaget: {
    set: 'ventctrlparaset',
    params: [
      { id: 1, name: 'Auto Min Level',   value: 10, unit: '%', min: 0,  step: 5,  max: 50 },
      { id: 2, name: 'Auto Max Level',   value: 90, unit: '%', min: 50, step: 5,  max: 100 },
      { id: 3, name: 'Boost Level',      value: 100, unit: '%', min: 50, step: 5, max: 100 },
      { id: 4, name: 'Boost Duration',   value: 10, unit: 'min', min: 1, step: 1, max: 60 },
      { id: 5, name: 'Manual Timeout',   value: 30, unit: 'min', min: 5, step: 5, max: 120 },
    ],
  },
  nightboostparaget: {
    set: 'nightboostparaset',
    params: [
      { id: 1, name: 'Enabled',           value: 1,  min: 0,  step: 1, max: 1 },
      { id: 2, name: 'Start Hour',        value: 22, min: 0,  step: 1, max: 23 },
      { id: 3, name: 'Stop Hour',         value: 6,  min: 0,  step: 1, max: 23 },
      { id: 4, name: 'Outdoor Temp Max',  value: 18, unit: 'C', min: 5, step: 1, max: 25 },
      { id: 5, name: 'Indoor Temp Min',   value: 22, unit: 'C', min: 15, step: 1, max: 30 },
    ],
  },
  sensorctrlparaget: {
    set: 'sensorctrlparaset',
    params: [
      { id: 1, name: 'CO2 Setpoint',   value: 800, unit: 'ppm', min: 400, step: 50, max: 2000 },
      { id: 2, name: 'RH Setpoint',    value: 60,  unit: '%',   min: 30,  step: 5,  max: 90 },
      { id: 3, name: 'CO2 Enabled',    value: 1,   min: 0, step: 1, max: 1 },
      { id: 4, name: 'RH Enabled',     value: 1,   min: 0, step: 1, max: 1 },
      { id: 5, name: 'RH Delta Mode',  value: 0,   min: 0, step: 1, max: 2 },
    ],
  },
  filterparaget: {
    set: 'filterparaset',
    params: [
      { id: 1, name: 'Filter Interval', value: 180, unit: 'days', min: 30, step: 30, max: 365 },
      { id: 2, name: 'Warning Days',    value: 14,  unit: 'days', min: 0,  step: 1,  max: 60 },
      { id: 3, name: 'Days Elapsed',    value: 62,  unit: 'days' },
    ],
  },
  bypassparaget: {
    set: 'bypassparaset',
    params: [
      { id: 1, name: 'Bypass Mode',      value: 0,  min: 0,  step: 1, max: 2 },
      { id: 2, name: 'Indoor Temp Min',  value: 21, unit: 'C', min: 15, step: 1, max: 30 },
      { id: 3, name: 'Outdoor Temp Min', value: 12, unit: 'C', min: 5,  step: 1, max: 25 },
      { id: 4, name: 'Hysteresis',       value: 2,  unit: 'C', min: 1,  step: 1, max: 5 },
    ],
  },
  pressureparaget: {
    set: 'pressureparaset',
    params: [
      { id: 1, name: 'Supply Pressure Target',  value: 50, unit: 'Pa', min: 20, step: 5, max: 200 },
      { id: 2, name: 'Exhaust Pressure Target', value: 50, unit: 'Pa', min: 20, step: 5, max: 200 },
      { id: 3, name: 'Control Enabled',         value: 1,  min: 0, step: 1, max: 1 },
    ],
  },
  freezeprotectparaget: {
    set: 'freezeprotectparaset',
    params: [
      { id: 1, name: 'Protect Temp',   value: -3, unit: 'C', min: -15, step: 1, max: 5 },
      { id: 2, name: 'Preheater Mode', value: 1,  min: 0, step: 1, max: 2 },
      { id: 3, name: 'Imbalance Max',  value: 20, unit: '%', min: 0, step: 5, max: 50 },
    ],
  },
  nodeconfigget: {
    set: 'nodeconfigset',
    perNode: true,
    params: [
      { id: 1, name: 'Location',       value: 0, min: 0, step: 1, max: 20 },
      { id: 2, name: 'Zone',           value: 1, min: 1, step: 1, max: 8 },
      { id: 3, name: 'Flow Nominal',   value: 75, unit: 'm3/h', min: 0, step: 5, max: 200 },
      { id: 4, name: 'Manual Level',   value: 50, unit: '%', min: 0, step: 10, max: 100 },
    ],
  },
  motorparaget: {
    set: 'motorparaset',
    perNode: true,
    params: [
      { id: 1, name: 'Motor Type',   value: 2, min: 0, step: 1, max: 5 },
      { id: 2, name: 'K Value',      value: 118, min: 50, step: 1, max: 400 },
      { id: 3, name: 'Direction',    value: 0, min: 0, step: 1, max: 1 },
    ],
  },
});

/**
 * `IoParaGet` levert meerdere modules in één antwoord, elk met een eigen
 * kopregel `<NAAM> (<module>) [RW|RO|WO]`. Het modulenummer is geen opsmuk:
 * `IoParaSet` adresseert ermee.
 */
const DEFAULT_IO = () => [
  {
    module: 0,
    header: 'MODBUS PARA (0) [RW]',
    params: [
      { id: 0, name: 'ADDRESS', value: 1, min: 1, step: 1, max: 253 },
      { id: 1, name: 'OFFFSET', value: 1, min: 0, step: 1, max: 1 },
    ],
  },
  {
    module: 1,
    header: 'ETHERNET PARA (1) [RW]',
    params: [
      { id: 0, name: 'IP ADDRESS',      value: '192.168.1.169' },
      { id: 1, name: 'NETWORK MASK',    value: '255.255.255.0' },
      { id: 2, name: 'DEFAULT GATEWAY', value: '192.168.1.1' },
      { id: 3, name: 'DHCP ACTIVE',     value: 1, min: 0, step: 1, max: 1 },
    ],
  },
  {
    module: 2,
    header: 'ETHERNET INFO (2) [RO]',
    params: [
      { id: 0, name: 'IP ADDRESS',  value: '192.168.1.169' },
      { id: 1, name: 'GATEWAY',     value: '192.168.1.1' },
      { id: 2, name: 'MAC ADDRESS', value: 'A4:CF:12:9B:00:1F' },
      { id: 3, name: 'HOST NAME',   value: 'duco_9b001f' },
    ],
  },
  {
    module: 3,
    header: 'BOARD INFO (3) [RO]',
    params: [
      { id: 0, name: 'SW PRODUCT',    value: 21123 },
      { id: 1, name: 'SW VERSION',    value: 8 },
      { id: 2, name: 'SW REVISION',   value: 3 },
      { id: 4, name: 'UPTIME',        value: 515832 },
      { id: 5, name: 'SERIAL NUMBER', value: 'PS0000000000' },
    ],
  },
  {
    module: 5,
    header: 'NETWORK PARA (5) [RO]',
    params: [{ id: 0, name: 'CURRENT MODE', value: 1 }],
  },
  {
    // Alleen schrijven: het uitlezen geeft wel het bereik, maar geen waarde.
    module: 6,
    header: 'NETWORK INFO (6) [WO]',
    params: [{ id: 0, name: 'AP MODE', value: '', min: 0, step: 1, max: 1 }],
  },
];

/* --------------------------------------------------------------- de emulator */

class DucoEmulator {
  constructor(profileId) {
    this.profile = ALL_PROFILES.find((p) => p.id === profileId) || null;
    this.reset(true);
  }

  reset(hard) {
    this.state = DEFAULT_STATE();
    this.groups = DEFAULT_GROUPS();
    this.io = DEFAULT_IO();
    this.rawParams = {};      // per node de losgeschreven genummerde parameters
    this.canned = null;
    if (this.profile?.canned) this.applyLogProfile();
    else if (this.profile) this.applyProfile();
    this.applyFamily();
    if (hard) this.unsaved = false;
  }

  /**
   * Bepaalt welke commando's deze box kent. Een profiel uit een logboek heeft
   * zijn eigen `help /all`; anders volgt het uit het type in boxtypes.js.
   */
  applyFamily() {
    const id = this.state.identity;
    this.family =
      BOX_FAMILIES.find((f) => f.id === this.profile?.family) || familyFor(id.productVersion);

    if (this.canned) {
      this.commands = new Set(
        (this.canned['help /all'] || [])
          .map((l) => l.trim().split(/\s+/)[0].toLowerCase())
          .filter((c) => c && !/^(-+|command|use:)$/.test(c))
      );
      return;
    }
    // Zonder productcode in de versie: "1.3.0" is al de versie zelf.
    const sw = String(id.swVersion || '').split('.');
    const version = sw.length === 4 ? sw.slice(1).join('.') : sw.join('.');
    this.commands = commandsFor(this.family, version);
  }

  /** Kent deze box het commando? Een set-commando volgt zijn get-commando. */
  available(cmd) {
    if (this.canned) return cmd === 'help' || this.commands.has(cmd);
    if (CORE.has(cmd) || !this.commands) return true;
    if (cmd === 'network_info') return false;     // zit op de communicatieprint, niet op de box
    if (cmd === 'resettodefaults') return this.family?.system === 'D';
    if (this.commands.has(cmd)) return true;
    return cmd.endsWith('set') && this.commands.has(cmd.replace(/set$/, 'get'));
  }

  /** Een profiel uit een logboek: de antwoorden van de box zelf. */
  applyLogProfile() {
    const p = this.profile;
    this.canned = JSON.parse(JSON.stringify(p.canned));
    this.state.identity = {
      ...this.state.identity,
      model: p.label,
      swVersion: `${p.productVersion}.${p.version}`,
      productVersion: p.productVersion,
    };
  }

  /**
   * Legt de gegevens van een werkelijke installatie over de basisstaat heen.
   * Groepen die het bestand bevat vervangen de verzonnen variant volledig;
   * groepen die het bestand niet kent blijven op de basisgegevens staan, zodat
   * de rest van de applicatie toch te doorlopen is.
   */
  applyProfile() {
    const p = this.profile;
    const id = p.identity;

    this.state.identity = {
      ...this.state.identity,
      model: id.model,
      swVersion: id.swVersion,
      productVersion: id.productVersion,
      subtype: id.subtype,
      serial: id.serial,
    };

    this.state.nodes = p.nodes.map((n) => ({ ...n }));

    const setNameFor = (getCmd) => getCmd.replace(/get$/i, 'set');

    for (const [cmd, rows] of Object.entries(p.groups || {})) {
      this.groups[cmd] = {
        set: setNameFor(cmd),
        params: rows.map((r) => ({ ...r })),
      };
    }

    for (const [cmd, byNode] of Object.entries(p.perNode || {})) {
      const group = this.groups[cmd] || { set: setNameFor(cmd) };
      group.perNode = true;
      group._byNode = {};
      for (const [node, rows] of Object.entries(byNode)) {
        group._byNode[node] = rows.map((r) => ({ ...r }));
      }
      const first = Object.values(group._byNode)[0] || [];
      group.params = first.map((r) => ({ ...r }));
      this.groups[cmd] = group;
    }

    this.sensors = p.sensors || {};
  }

  /** Sensorwaarde uit het profiel, met terugval op de basisstaat. */
  sensor(name, fallback) {
    const v = this.sensors && this.sensors[name];
    return v === undefined || v === null ? fallback : v;
  }

  /**
   * De commando's die dit toestel kent — de bron voor `help /all`. Elke regel
   * is [naam met argumenten, uitleg], zoals een echte box ze toont:
   * `NodeParaGet a b             NODE get para (b) of node (a)`.
   */
  commandList() {
    const groupCmds = [];
    for (const [get, g] of Object.entries(this.groups)) {
      const getHelp =
        get === 'nodeconfigget' ? "NODE get config para's of node a"
          : g.perNode ? 'MOTOR get parameter values of motor (a)'
          : 'get parameter values';
      groupCmds.push(
        [g.perNode ? `${get} a` : get, getHelp],
        [`${g.set} a b`, g.setIds ? `set parameter a (${g.setIds}) to b` : 'set parameter a to b']
      );
    }
    return [
      ['Help ...', 'Print HELP menu'],
      ['swversion', 'Print software version'],
      ['boardinfo', 'BOARD info'],
      ['Network', 'NETW network table'],
      ['netwversion', 'NETW version table'],
      ['netwserial', 'NETW serial number table'],
      ['nodeinfo a', 'NODE info of node (a)'],
      ['NodeParaGet a b', 'NODE get para (b) of node (a)'],
      ['NodeParaSet a b c', 'NODE set para (b) of node (a) to (c)'],
      ['NodeParaList', 'NODE parameter list'],
      ['NodeSaveData a', 'NODE save data on node (a)'],
      ['InstallerSet a', 'INSTALL enter (a=1) or leave (a=0) installer mode'],
      ['NodeSetParent a b', 'NODE set parent of node a to b'],
      ['NodeSetAsso a b', 'NODE set asso of node a to b'],
      ['CommInfo', 'COMM info'],
      ['nodeLoadDefaults a', 'NODE load defaults on node (a)'],
      ['NodeReset a', 'NODE reset node (a)'],
      ['IoParaGet', 'IO get parameter values'],
      ['ioParaSet a b c', 'IO set parameter (b) of module (a) to (c)'],
      ...groupCmds,
      ['FanSpeed', 'FAN get speed'],
      ['FanGetSpeed', 'FAN get speed'],
      ['FanInfo', 'FAN info'],
      ['fanctrlinfo', 'FAN CTRL info'],
      ['SensorInfo', 'SENSOR get info'],
      ['temperatureinfo', 'TEMPERATURE info'],
      ['pressureinfo', 'PRESSURE info'],
      ['filterinfo', 'FILTER info'],
      ['bypassinfo', 'BYPASS info'],
      ['StatusMonitorInfo', 'STATUS MONITOR info'],
      ['LogPrint', 'LOG print log'],
      ['LogClear', 'LOG clear log'],
      ['RtcGetTime', 'Get time'],
      ['RtcSetTime a b c d e f', 'Set time (a=day of month, b=month(1-12), c=year, d=hour, e=minute, f=second)'],
      ['ResetToDefaults', 'DATAMNGR reset to defaults'],
      ['NetworkClear', 'NETW clear network (in installer mode only)'],
      ['reset', 'Perform soft reset'],
    ].filter(([c]) => this.available(c.split(' ')[0].toLowerCase()));
  }

  /* ---------------------------------------------------------- hulpfuncties */

  formatParam(p) {
    const unit = p.unit ? ` ${p.unit}` : '';
    const range =
      p.min !== undefined && p.max !== undefined
        ? ` [${p.min}:${p.step ?? 1}:${p.max}]`
        : '';
    return `${p.id}. ${p.name}: ${p.value}${unit}${range}`;
  }

  findGroupBySet(name) {
    for (const g of Object.values(this.groups)) {
      if (g.set.toLowerCase() === name) return g;
    }
    return null;
  }

  applySet(params, id, raw) {
    const p = params.find((x) => x.id === id);
    if (!p) return 'failed';
    const v = Number(raw);
    if (!Number.isFinite(v)) return 'failed';
    if (p.min !== undefined && (v < p.min || v > p.max)) return 'failed';  // buiten bereik
    p.value = v;
    this.unsaved = true;
    return 'done';
  }

  clock() {
    return this.state.rtc ? new Date(this.state.rtc) : new Date();
  }

  uptime() {
    const s = Math.floor((Date.now() - this.state.identity.bootedAt) / 1000);
    const d = Math.floor(s / 86400);
    const h = String(Math.floor((s % 86400) / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${d}d ${h}:${m}:${sec}`;
  }

  /* ------------------------------------------------------------ dialoogkern */

  /** Verwerkt één commandoregel en geeft de antwoordregels terug. */
  handle(line) {
    const parts = line.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const st = this.state;

    if (this.canned) return this.handleCanned(cmd, args);

    // help /all
    if (cmd === 'help') {
      const list = this.commandList().map(([c, d]) => `${c.padEnd(27)} ${d}`);
      const rule = '-------------------------------------------------';
      return [rule, 'Command Help []', rule, ...list, rule, `Use: ${list.length}/110`];
    }

    // Wat dit type box niet kent, kent de emulator ook niet.
    if (!this.available(cmd)) return ['unknown cmd'];

    switch (cmd) {
      case 'swversion': {
        // De box meldt zijn versie als <productcode>.<major>.<minor>.<patch>.
        // Node_productVersionGet leest daar de productcode uit, dus die vorm
        // moet kloppen, ook als het profiel de twee apart bewaarde.
        const sw = String(st.identity.swVersion || '');
        const full =
          sw.split('.').length === 4 || !st.identity.productVersion
            ? sw
            : `${st.identity.productVersion}.${sw}`;
        return [
          st.identity.model + (st.identity.subtype ? ` (subtype ${st.identity.subtype})` : ''),
          full,
          `SW version: ${full}`,
        ];
      }

      case 'boardinfo':
        return [
          // De generieke Energy heeft een communicatieprint; een profiel van een
          // ander type niet, dus dat noemt alleen zijn eigen type.
          `Board Type: ${this.profile && this.family?.id !== 'energy-comfort' ? this.family?.label || 'DucoBox' : st.identity.boardType}`,
          `Board Rev: ${st.identity.boardRev}`,
          `Serial: ${st.identity.serial}`,
          `Uptime: ${this.uptime()}`,
          `Unsaved Changes: ${this.unsaved ? 'yes' : 'no'}`,
          ...(this.profile ? [`Emulated From: ${this.profile.label}`] : []),
        ];

      case 'network_info':
        return [
          `IP Address: ${st.network.ip}`,
          `Netmask: ${st.network.netmask}`,
          `Gateway: ${st.network.gateway}`,
          `MAC: ${st.network.mac}`,
        ];

      case 'network': {
        const cols = [
          'node', 'netw', 'addr', 'sub', 'type', 'ptcl', 'cerr', 'prnt', 'asso',
          'stts', 'stat', 'cntdwn', 'dbt', 'trgt', 'cval', 'snsr', 'ovrl',
          'capin', 'capout', 'tree', 'temp', 'blnc',
        ];
        const cell = (v) => String(v === undefined || v === null ? '-' : v);
        const width = (c) =>
          Math.max(c.length, ...st.nodes.map((n) => cell(n[c]).length));
        const head = cols.map((c) => c.padStart(width(c))).join(' |');
        const rows = st.nodes.map((n) =>
          cols.map((c) => cell(n[c]).padStart(width(c))).join(' |')
        );
        return [head, ...rows, '--- end list ---'];
      }

      case 'netwversion':
        return [
          'node | type | version',
          ...st.nodes.map(
            (n) => `${String(n.node).padStart(4)} | ${String(n.type).padEnd(4)} | ${n.version ?? 'N/A'}`
          ),
          '--- end list ---',
        ];

      case 'netwserial':
        return [
          'node | type | serial',
          ...st.nodes.map(
            (n) => `${String(n.node).padStart(4)} | ${String(n.type).padEnd(4)} | ${n.serial ?? '-'}`
          ),
          '--- end list ---',
        ];

      case 'nodeinfo': {
        const n = st.nodes.find((x) => x.node === Number(args[0] || 1));
        if (!n) return ['failed'];

        // Een node die niet reageert antwoordt op elk veld met 'Failed'; dat
        // gedrag hoort de emulator na te doen, anders is die situatie niet te
        // testen. Herkenbaar aan een node zonder softwareversie.
        if (n.version === 'Failed') {
          return [
            `Node    ${n.node}`,
            'ApplSW  Failed',
            'Serial  Failed',
            'Counter Failed',
            'Done',
          ];
        }
        const opt = (label, v) => (v === undefined || v === null ? [] : [`${label}: ${v}`]);
        return [
          `Node: ${n.node}`,
          `Type: ${n.type}`,
          ...opt('Component', n.componentType),
          `Address: ${n.addr}`,
          `Network: ${n.netw}`,
          `Status: ${n.stts}`,
          `State: ${n.stat}`,
          ...opt('Software', n.version),
          ...opt('Serial', n.serial),
          ...opt('Target', n.trgt),
          ...opt('Current', n.cval),
          ...opt('Temperature', n.temp),
          `Comm Errors: ${n.cerr}`,
        ];
      }

      case 'nodeparaset': {
        const nodeNr = Number(args[0]);
        const para = Number(args[1]);
        const value = Number(args[2]);
        if (!Number.isFinite(value)) return ['failed'];
        if (!st.nodes.some((x) => x.node === nodeNr)) return ['failed'];
        if (!this.rawParams[nodeNr]) this.rawParams[nodeNr] = {};
        this.rawParams[nodeNr][para] = value;
        this.unsaved = true;
        return ['done'];
      }

      case 'nodeparalist':
        return [
          '1 - ventilation level',
          '2 - flow setpoint',
          '3 - location',
          '4 - zone',
          'done',
        ];

      case 'nodeparaget': {
        const nodeNr = Number(args[0]);
        const para = Number(args[1]);

        // Parameter 0 is de productcode van de node — zo haalt de originele
        // driver het model van een child-node op.
        if (para === 0) {
          const n = st.nodes.find((x) => x.node === nodeNr);
          const pv = n && n.productVersion;
          return pv ? [`para 0 --> ${pv}`, 'done'] : ['failed'];
        }

        // Eerder weggeschreven losse parameters gaan voor.
        const stored = this.rawParams[nodeNr] && this.rawParams[nodeNr][para];
        if (stored !== undefined) return [`para ${para} --> ${stored}`, 'done'];

        const g = this.groups.nodeconfigget;
        const params = g.perNode ? this.nodeParams(g, nodeNr) : g.params;
        const p = params.find((x) => x.id === para);
        if (p) return [`para ${para} --> ${p.value}`, 'done'];

        // De genummerde parameters uit de printlijsten: een plausibele waarde
        // zodat het scherm iets te tonen heeft.
        const KNOWN = { 66: 1, 70: 0, 71: 0, 72: 0, 76: 51583, 77: 0, 78: 0,
                        162: 50, 163: 0, 195: 15, 199: 1100, 201: 0, 202: 10000,
                        204: 40, 205: 0, 208: 1, 216: 0, 217: 10, 218: 1000 };
        if (KNOWN[para] !== undefined) return [`para ${para} --> ${KNOWN[para]}`, 'done'];
        return ['failed'];
      }

      case 'nodesavedata':
        this.unsaved = false;
        return ['done'];

      case 'nodesetparent':
      case 'nodesetasso': {
        // De echte box weigert dit buiten installateursmodus; dat hoort de
        // emulator ook te doen, anders test je een pad dat niet bestaat.
        if (st.installState !== 2) return ['Device Locked', 'failed'];

        const nodeNr = Number(args[0]);
        const target = Number(args[1]);
        const n = st.nodes.find((x) => x.node === nodeNr);
        if (!n || !Number.isFinite(target)) return ['failed'];
        if (target !== 0 && !st.nodes.some((x) => x.node === target)) return ['failed'];

        if (cmd === 'nodesetparent') n.prnt = target;
        else n.asso = target;
        this.unsaved = true;
        return ['done'];
      }

      case 'installerset': {
        const on = Number(args[0]) === 1;
        // De echte box meldt de stand terug via CommInfo; 2 = actief.
        st.installState = on ? 2 : 0;
        return ['done'];
      }

      case 'comminfo':
        return [
          '[COMM] INFO',
          ` - install state     : ${st.installState}`,
          ' - module in asso    : 0',
          ' - module in parent  : 0',
          ' - module to replace : 0',
          'Done',
        ];

      case 'nodeloaddefaults': {
        const nodeNr = Number(args[0] || 1);
        const g = this.groups.nodeconfigget;
        if (!g) return ['failed'];
        // Alleen deze node terug naar de uitgangswaarden; de rest blijft staan.
        if (g.perNode && g._byNode) delete g._byNode[nodeNr];
        this.unsaved = true;
        return ['done'];
      }

      case 'nodereset': {
        const nodeNr = Number(args[0] || 1);
        const n = st.nodes.find((x) => x.node === nodeNr);
        if (!n) return ['failed'];
        n.cerr = 0;
        return [`Resetting node ${nodeNr}...`, 'done'];
      }

      case 'ioparaget':
        return this.io.flatMap((sec) => [sec.header, ...sec.params.map((p) => this.formatParam(p))]);

      case 'ioparaset': {
        // `IoParaSet <module> <parameter> <waarde>` — drie argumenten, en de
        // echte box klaagt terecht als er maar twee komen.
        if (args.length < 3) {
          return [`Incorrect Cmd Arguments (found ${args.length}, expected 3)`];
        }
        const mod = this.io.find((s) => s.module === Number(args[0]));
        if (!mod) return ['failed'];
        if (/\[RO\]/i.test(mod.header)) return ['failed'];
        return [this.applySet(mod.params, Number(args[1]), args[2])];
      }

      case 'faninfo':
        return [
          `Supply RPM: ${this.sensor('FanspeedFiltered', st.fan.supplyRpm)}`,
          `Exhaust RPM: ${this.sensor('FanspeedEhaFiltered', st.fan.exhaustRpm)}`,
          `Supply Flow: ${Math.round(st.fan.supplyActual * 6.6)} m3/h`,
          `Exhaust Flow: ${Math.round(st.fan.exhaustActual * 6.6)} m3/h`,
        ];

      case 'fanctrlinfo':
        return [
          `Supply Target: ${st.fan.supplyTarget} %`,
          `Exhaust Target: ${st.fan.exhaustTarget} %`,
          `Supply Actual: ${st.fan.supplyActual} %`,
          `Exhaust Actual: ${st.fan.exhaustActual} %`,
        ];

      case 'sensorinfo': {
        // Alleen nodes die echt een CO2- of vochtwaarde hebben. Een box zonder
        // eigen sensoren geeft, net als een Focus, alleen de kop.
        const rows = st.nodes.flatMap((n) => [
          ...(typeof n.co2 === 'number' ? [`Node ${n.node} CO2: ${n.co2} ppm`] : []),
          ...(typeof n.rh === 'number' ? [`Node ${n.node} RH: ${n.rh} %`] : []),
        ]);
        return rows.length ? rows : ['[SENSOR] INFO'];
      }

      case 'fanspeed':
      case 'fangetspeed': {
        // Zelfde vorm als op een Focus of Silent.
        const rpm = Math.round(this.sensor('FanspeedFiltered', st.fan.supplyRpm));
        const col = (v) => String(v).padStart(4);
        return [
          'FanSpeed (fan 1)',
          `- Actual   : ${col(rpm + 6)} [rpm]`,
          `- Filtered : ${col(rpm)} [rpm]`,
          `- Average  : ${col(rpm + 2)} [rpm]`,
          'Done',
        ];
      }

      case 'temperatureinfo':
        return [
          `Outdoor: ${this.sensor('TemperatureODA', st.sensors.outdoor)} C`,
          `Supply: ${this.sensor('TemperatureSUP', st.sensors.supply)} C`,
          `Extract: ${this.sensor('TemperatureETA', st.sensors.extract)} C`,
          `Exhaust: ${this.sensor('TemperatureEHA', st.sensors.exhaust)} C`,
        ];

      case 'pressureinfo':
        return [
          `Supply Pressure: ${this.sensor('PressureSUP', st.sensors.pressureSupply)} Pa`,
          `Exhaust Pressure: ${this.sensor('PressureETA', st.sensors.pressureExhaust)} Pa`,
        ];

      case 'filterinfo':
        return [`Days Remaining: ${st.filter.daysRemaining}`, `Filter Status: ${st.filter.status}`];

      case 'bypassinfo':
        return ['Bypass Position: 0 %', 'Bypass State: closed', 'Reason: outdoor temp low'];

      case 'statusmonitorinfo':
        return [
          'Overall Status: OK',
          'Active Errors: 0',
          'Warnings: 1',
          'Last Warning: node 3 comm error',
        ];

      case 'logprint':
        return st.log.length ? [...st.log, 'done'] : ['log empty', 'done'];

      case 'logclear':
        st.log = [];
        return ['done'];

      case 'rtcgettime': {
        const d = this.clock();
        const p = (n) => String(n).padStart(2, '0');
        return [
          `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`,
        ];
      }

      case 'rtcsettime': {
        if (args.length < 6) return ['incorrect cmd arguments'];
        const [Y, M, D, h, m, s] = args.map(Number);
        this.state.rtc = new Date(Y, M - 1, D, h, m, s).getTime();
        return ['done'];
      }

      case 'resettodefaults':
        this.reset(false);
        this.unsaved = true;
        return ['done'];

      case 'networkclear':
        st.nodes = st.nodes.filter((n) => n.node === 1);
        this.unsaved = true;
        return ['done'];

      case 'reset':
        st.identity.bootedAt = Date.now();
        return ['Rebooting...', 'done'];

      default:
        break;
    }

    // Parametergroepen: eerst lezen, dan schrijven.
    const group = this.groups[cmd];
    if (group) {
      const params = group.perNode ? this.nodeParams(group, Number(args[0] || 1)) : group.params;
      if (!params) return ['failed'];
      return params.map((p) => this.formatParam(p));
    }

    const setGroup = this.findGroupBySet(cmd);
    if (setGroup) {
      // Per-node-groepen krijgen het nodenummer als eerste argument mee.
      const offset = setGroup.perNode ? 1 : 0;
      const params = setGroup.perNode
        ? this.nodeParams(setGroup, Number(args[0] || 1))
        : setGroup.params;
      if (!params) return ['failed'];
      const id = Number(args[offset]);
      if (setGroup.setIds) {
        const ok = setGroup.setIds.split('|').some((r) => {
          const [lo, hi] = r.split('-').map(Number);
          return id >= lo && id <= (Number.isFinite(hi) ? hi : lo);
        });
        if (!ok) return ['failed'];
      }
      return [this.applySet(params, id, args[offset + 1])];
    }

    return ['unknown cmd'];
  }

  /**
   * Een box uit een logboek. Leesvragen krijgen het antwoord dat de echte box
   * gaf; instellingen, installateursmodus, topologie en klok houden de emulator
   * zelf bij, zodat schrijven en teruglezen klopt.
   */
  handleCanned(cmd, args) {
    const c = this.canned;
    const st = this.state;
    const key = [cmd, ...args].join(' ').toLowerCase();

    if (cmd === 'help') return c[key] || c['help /all'];
    if (!this.available(cmd)) return ['unknown cmd'];

    switch (cmd) {
      case 'installerset':
        st.installState = Number(args[0]) === 1 ? 2 : 0;
        return ['Done'];

      case 'comminfo':
        return c.comminfo.map((l) =>
          l.replace(
            /(install state\s+)\d+ : \S+/,
            `$1${st.installState} : ${st.installState === 2 ? 'INSTALLER' : 'OPERATIONAL'}`
          )
        );

      case 'nodesetparent':
      case 'nodesetasso': {
        if (st.installState !== 2) return ['Device Locked', 'Failed'];
        const col = cmd === 'nodesetparent' ? 7 : 8;
        const row = c.network.findIndex((l) => l.split('|')[0].trim() === String(Number(args[0])));
        const target = Number(args[1]);
        const exists = target === 0 || c.network.some((l) => l.split('|')[0].trim() === String(target));
        if (row < 0 || !exists) return ['Failed'];
        const cells = c.network[row].split('|');
        cells[col] = String(target).padEnd(cells[col].length);
        c.network[row] = cells.join('|');
        this.unsaved = true;
        return ['Done'];
      }

      case 'rtcgettime': {
        const d = this.clock();
        const p = (n) => String(n).padStart(2, '0');
        const day = d.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase();
        return [
          `[RTC] ${day} ${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ` +
            `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`,
          'Done',
        ];
      }

      case 'rtcsettime': {
        // a=dag, b=maand, c=jaar, d=uur, e=minuut, f=seconde
        if (args.length < 6) return ['Incorrect Cmd Arguments'];
        const [D, M, Y, h, m, sec] = args.map(Number);
        st.rtc = new Date(Y, M - 1, D, h, m, sec).getTime();
        return ['Done'];
      }

      case 'nodesavedata':
        this.unsaved = false;
        return ['Done'];

      case 'logclear':
        c.logprint = ['Done'];
        return ['Done'];

      case 'nodeparaget':
        return c[key] || [`Get PARA ${args[1]} of NODE ${args[0]}`, 'Failed'];

      case 'nodeparaset': {
        const [node, para, value] = args.map(Number);
        const get = `nodeparaget ${node} ${para}`;
        if (!c[get] || c[get].includes('Failed') || !Number.isFinite(value)) return ['Failed'];
        c[get] = [`Get PARA ${para} of NODE ${node}`, `--> ${value}`, 'Done'];
        this.unsaved = true;
        return [`Set PARA ${para} of NODE ${node} to ${value}`, 'Done'];
      }

      default:
        break;
    }

    if (cmd.endsWith('set')) return this.cannedSet(cmd, args);
    return c[key] || (!args.length && c[cmd]) || ['Done'];
  }

  /** Schrijft een parameter in het bewaarde antwoord van het bijbehorende get-commando. */
  cannedSet(cmd, args) {
    const c = this.canned;
    let lines;
    let id;
    let value;

    if (cmd === 'nodeconfigset') {
      lines = c[`nodeconfigget ${Number(args[0])}`];
      [id, value] = [Number(args[1]), Number(args[2])];
    } else if (cmd === 'ioparaset') {
      // IoParaSet <module> <parameter> <waarde>: zoek het blok van die module.
      if (args.length < 3) return [`Incorrect Cmd Arguments (found ${args.length}, expected 3)`];
      const io = c.ioparaget || [];
      const start = io.findIndex((l) => new RegExp(`\\(${Number(args[0])}\\) \\[(RW|WO)\\]`).test(l));
      if (start < 0) return ['Failed'];
      const end = io.findIndex((l, i) => i > start && /\(\d+\) \[(RW|RO|WO)\]/.test(l));
      lines = io;
      [id, value] = [Number(args[1]), Number(args[2])];
      const idx = io.findIndex(
        (l, i) => i > start && (end < 0 || i < end) && new RegExp(`^\\s*${id}\\.`).test(l)
      );
      const next = idx < 0 ? null : setLineValue(io[idx], value);
      if (!next) return ['Failed'];
      io[idx] = next;
      this.unsaved = true;
      return ['Done'];
    } else {
      lines = c[cmd.replace(/set$/, 'get')];
      [id, value] = [Number(args[0]), Number(args[1])];
      // De hulptekst noemt welke nummers instelbaar zijn: "set parameter a (0-14) to b".
      const help = (c['help /all'] || []).find((l) => l.trim().toLowerCase().startsWith(cmd + ' '));
      const ids = help && help.match(/\ba\s*\(([\d\s|\-]+)\)/);
      if (ids) {
        const ok = ids[1].split('|').some((r) => {
          const [lo, hi] = r.split('-').map(Number);
          return id >= lo && id <= (Number.isFinite(hi) ? hi : lo);
        });
        if (!ok) return ['Failed'];
      }
    }

    // Een set-commando zonder bewaard get-antwoord (bv. CoreLogLevel): niets bij te houden.
    if (!lines) return ['Done'];
    const idx = lines.findIndex((l) => new RegExp(`^\\s*${id}\\.`).test(l));
    const next = idx < 0 ? null : setLineValue(lines[idx], value);
    if (!next) return ['Failed'];
    lines[idx] = next;
    this.unsaved = true;
    return ['Done'];
  }

  /** Per-node-groepen houden een eigen kopie per node vast. */
  nodeParams(group, node) {
    if (!group._byNode) group._byNode = {};
    if (!group._byNode[node]) {
      group._byNode[node] = group.params.map((p) => ({ ...p }));
    }
    return group._byNode[node];
  }
}

/* ------------------------------------------------------- SerialPort-façade */

/**
 * Bouwt een object dat zich als een SerialPort gedraagt. DucoSerial hoeft geen
 * enkele uitzondering te kennen: het opent, schrijft en leest precies zoals bij
 * echte hardware.
 */
export function createEmulatorPort({ latencyMs = 30, profileId = null } = {}) {
  const device = new DucoEmulator(profileId);

  let rxController = null;
  let closed = false;

  const readable = new ReadableStream({
    start(controller) {
      rxController = controller;
    },
    cancel() {
      rxController = null;
    },
  });

  // De box stuurt één byte per teken: ASCII, plus het gradenteken als 0xB0.
  // Zou de emulator UTF-8 doorlaten, dan lees je mojibake terug — dus gaat
  // elk teken als één byte, en wat daar niet in past wordt een vraagteken.
  const toBytes = (text) =>
    Uint8Array.from(
      text
        .replace(/[‐-―]/g, '-')
        .replace(/[‘’]/g, "'")
        .replace(/[“”]/g, '"'),
      (ch) => (ch.charCodeAt(0) < 0x80 || ch === '°' ? ch.charCodeAt(0) : 0x3f)
    );

  const emit = (text) => {
    if (!rxController || closed) return;
    try {
      rxController.enqueue(toBytes(text));
    } catch {
      /* stream al gesloten */
    }
  };

  let accumulated = '';

  const writable = new WritableStream({
    write(chunk) {
      accumulated += String.fromCharCode(...chunk);
      if (!accumulated.includes('\n')) return;

      const line = accumulated.replace(/[\r\n]+$/, '');
      accumulated = '';
      if (!line.trim()) return;

      const lines = device.handle(line);
      // De echte box echoot het commando terug, en sluit af met zijn prompt.
      // Elke regel krijgt twee spaties inspringing, en de prompt is "\r> " —
      // mét een spatie erachter, zoals op de echte box.
      const body = lines.map((l) => '  ' + l).join('\r');
      setTimeout(() => emit(line + '\r' + body + '\r  \r> '), latencyMs);
    },
  });

  return {
    readable,
    writable,
    open: async () => {
      closed = false;
    },
    close: async () => {
      closed = true;
    },
    getInfo: () => ({ usbVendorId: 0x10c4, usbProductId: 0xea60 }),
    /** Alleen voor de UI: hiermee weet de app dat dit geen echte box is. */
    isEmulator: true,
    device,
  };
}
