/*
 * boxtypes.js — welke uitlees- en instelcommando's elk type DucoBox kent.
 *
 * De aangesloten box blijft de maat: wat de app opvraagt, komt uit zijn eigen
 * `help /all`. Deze tabel is er voor de emulator, zodat een nagebootste Focus
 * zich ook gedraagt als een Focus en geen temperaturen of luchtdebieten meldt
 * die zo'n box niet heeft. Daarnaast is het een naslag: welk type wat kan.
 *
 * Per type staan alleen de commando's die iets uitlezen of een parametergroep
 * vormen. Beheercommando's (Network, NodeInfo, InstallerSet, …) kent elke box.
 *
 * `since` noemt de softwareversie vanaf waar een commando bestaat, `until` tot
 * en met welke; zonder die velden geldt het voor alle bekende versies.
 */

/** Toerental heet `FanGetSpeed` in de meeste versies, `FanSpeed` in oudere. */
const SPEED_NEW = 'fangetspeed';
const SPEED_OLD = 'fanspeed';

/** Systeem C — vraaggestuurde afvoer, met kleppen per zone. */
const SYSTEM_C = {
  info: [
    SPEED_NEW, 'fanperformget', 'fancalib', 'sensorinfo', 'sensorctrlinfo',
    'ventcoolinfo', 'nightboostinfo', 'autohcinfo', 'weatherstationinfo',
    'comminfo', 'rtcgettime', 'servicecode', 'rfarbitratorinfo', 'swuploadstatus',
  ],
  groups: [
    'fanparaget', 'ventctrlparaget', 'ventcoolparaget', 'nightboostparaget',
    'sensorctrlparaget', 'autohcparaget', 'ioparaget', 'nodeconfigget',
  ],
};

/** Systeem D — balansventilatie met warmteterugwinning. */
const SYSTEM_D = {
  info: [
    'faninfo', 'fanctrlinfo', 'temperatureinfo', 'bypassinfo', 'filterinfo',
    'freezeprotectinfo', 'sensorinfo', 'sensorctrlinfo', 'ventcoolinfo',
    'nightboostinfo', 'weatherstationinfo', 'comminfo', 'rtcgettime',
    'timeventinfo', 'commspiinfo',
  ],
  groups: [
    'settingsparaget', 'fanparaget', 'ventctrlparaget', 'ventcoolparaget',
    'nightboostparaget', 'sensorctrlparaget', 'bypassparaget',
    'freezeprotectparaget', 'motorparaget', 'ioparaget', 'nodeconfigget',
  ],
};

const without = (list, ...drop) => list.filter((c) => !drop.includes(c));

export const BOX_FAMILIES = [
  {
    id: 'focus', label: 'DucoBox Focus', system: 'C', codes: [16010, 12038],
    info: SYSTEM_C.info,
    groups: SYSTEM_C.groups,
    // Op 16010.4.7.0 heette het toerental nog FanSpeed.
    renamed: { [SPEED_NEW]: { name: SPEED_OLD, before: '10.0.0' } },
    versioned: {
      statusmonitorinfo: { since: '11.3.0' },
      weatherstationparaget: { since: '14.1.0' },
      powercalculationparaget: { since: '14.1.0' },
    },
  },
  {
    id: 'focus-g0', label: 'DucoBox Focus G0', system: 'C', codes: [22115, 22114],
    info: [...SYSTEM_C.info, 'statusmonitorinfo', 'timeprograminfo'],
    groups: [...SYSTEM_C.groups, 'weatherstationparaget'],
  },
  {
    // Identieke commandoset als de Focus.
    id: 'silent-connect', label: 'DucoBox Silent Connect', system: 'C', codes: [16056],
    info: SYSTEM_C.info,
    groups: SYSTEM_C.groups,
    versioned: { statusmonitorinfo: { since: '13.2.0' } },
  },
  {
    id: 'silent-connect-g0', label: 'DucoBox Silent Connect G0', system: 'C', codes: [22117],
    info: [...SYSTEM_C.info, 'statusmonitorinfo', 'timeprograminfo'],
    groups: [...SYSTEM_C.groups, 'weatherstationparaget'],
  },
  {
    id: 'silent2', label: 'DucoBox Silent (generatie 2)', system: 'C', codes: [21007],
    info: [...without(SYSTEM_C.info, 'ventcoolinfo', 'autohcinfo', 'weatherstationinfo'), 'timeprograminfo'],
    groups: without(SYSTEM_C.groups, 'ventcoolparaget', 'autohcparaget', 'nodeconfigget'),
  },
  {
    id: 'hygro', label: 'DucoBox Hygro', system: 'C', codes: [18083],
    info: SYSTEM_C.info,
    groups: [...SYSTEM_C.groups, 'hygroparaget'],
  },
  {
    id: 'eco', label: 'DucoBox Eco / Tronic', system: 'C', codes: [17017],
    info: [
      SPEED_OLD, 'faninfo', 'temperatureinfo', 'heatpumpinfo', 'pressureinfo',
      ...without(SYSTEM_C.info, SPEED_NEW, 'fanperformget', 'autohcinfo'),
    ],
    groups: [...without(SYSTEM_C.groups, 'autohcparaget'), 'settingsparaget', 'pressureparaget'],
  },
  {
    // Oudere Silent. De set volgt uit wat de logs van zo'n box bevatten,
    // aangevuld met het toerental.
    id: 'silent', label: 'DucoBox Silent', system: 'C', codes: [14033],
    info: [SPEED_OLD, 'sensorinfo', 'comminfo', 'rtcgettime'],
    groups: ['fanparaget', 'ventctrlparaget', 'nodeconfigget'],
  },
  {
    id: 'energy', label: 'DucoBox Energy', system: 'D', codes: [16023],
    info: without(SYSTEM_D.info, 'weatherstationinfo'),
    groups: SYSTEM_D.groups,
  },
  {
    id: 'energy-comfort', label: 'DucoBox Energy Comfort', system: 'D', codes: [19156],
    info: [...SYSTEM_D.info, 'deviceinfo'],
    groups: SYSTEM_D.groups,
    versioned: { statusmonitorinfo: { since: '7.2.0' }, filterparaget: { since: '7.2.0' } },
  },
  {
    id: 'energy-g0', label: 'DucoBox Energy G0', system: 'D', codes: [22068],
    info: [...SYSTEM_D.info, 'pressureinfo', 'flowmngrinfo', 'statusmonitorinfo', 'timeprograminfo', 'fancalib'],
    groups: [...SYSTEM_D.groups, 'filterparaget', 'flowmngrparaget', 'fanctrlparaget', 'weatherstationparaget'],
  },
  {
    id: 'energy-l4v2', label: 'DucoBox Energy L4 v2', system: 'D', codes: [23010],
    info: [...SYSTEM_D.info, 'deviceinfo', 'flowmngrinfo', 'statusmonitorinfo', 'timeprograminfo', 'fancalib'],
    groups: [...SYSTEM_D.groups, 'filterparaget', 'flowmngrparaget', 'fanctrlparaget', 'weatherstationparaget'],
  },
];

/** Het type bij een productcode, of `null` als die onbekend is. */
export function familyFor(productCode) {
  const code = Number(productCode);
  return BOX_FAMILIES.find((f) => f.codes.includes(code)) || null;
}

/** Vergelijkt versies als "10.4.0" en "11.3.0"; negatief als a ouder is. */
function compareVersion(a, b) {
  const pa = String(a).split('.').map(Number);
  const pb = String(b).split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d) return d;
  }
  return 0;
}

/**
 * De uitlees- en groepscommando's van een type, voor één softwareversie
 * (zonder productcode, bv. "10.4.0"). Namen in kleine letters.
 */
export function commandsFor(family, version = null) {
  if (!family) return null;
  const out = new Set([...family.info, ...family.groups]);
  for (const [cmd, rule] of Object.entries(family.versioned || {})) {
    const ok =
      !version ||
      ((!rule.since || compareVersion(version, rule.since) >= 0) &&
        (!rule.until || compareVersion(version, rule.until) <= 0));
    if (ok) out.add(cmd);
    else out.delete(cmd);
  }
  for (const [cmd, rule] of Object.entries(family.renamed || {})) {
    if (version && out.has(cmd) && compareVersion(version, rule.before) < 0) {
      out.delete(cmd);
      out.add(rule.name);
    }
  }
  return out;
}
