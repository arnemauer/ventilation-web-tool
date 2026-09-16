/*
 * protocol.js — parsers voor de antwoorden van de DucoBox.
 *
 * Het protocol is zelfbeschrijvend: parameterlijsten dragen hun eigen naam,
 * bereik en stapgrootte, en tabellen dragen hun eigen kolomkoppen. Daardoor
 * hoeft de UI vrijwel niets hard te coderen — vandaar dat deze module klein is
 * en de rest van de app generiek kan blijven.
 */

/**
 * Parseert een parameterlijst zoals `FanParaGet` die teruggeeft:
 *
 *     1. Some Parameter Name: 42 [0:1:100]
 *     2. Another Param: 7 [0:20]
 *     3. Read Only Thing: 1234
 *
 * Levert per regel: { id, name, value, raw, min, step, max, writable }.
 */
/**
 * Zoekt het eerste getal op een regel die `label` bevat.
 *
 * `CommInfo` en verwanten geven vrije tekst waarin de opmaak per firmware
 * verschilt ("install state : 2", "- install state  2"). Zoeken op het label
 * en dan het eerste getal pakken werkt in al die varianten.
 */
export function findLabelledInt(lines, label) {
  const needle = label.toLowerCase();
  for (const line of lines) {
    if (!line.toLowerCase().includes(needle)) continue;
    const m = line.match(/(-?\d+)/);
    if (m) return parseInt(m[1], 10);
  }
  return null;
}

const LINE_RE = /^\s*(\d+)\.\s+(.+)$/;
const RANGE_RE = /\[\s*(-?\d+)\s*([:\-])\s*(-?\d+)(?:\s*[:\-]\s*(-?\d+))?\s*\]/;
const TIME_RE = /^\d{1,2}:\d{2}$/;
/** Wat tussen haakjes als eenheid mag gelden — de rest is toelichting. */
const UNIT_RE = /^(days?|sec|s|min|h|m3h|m3\/h|ppm|%|W|V|A|rpm|Pa|dPa|d?degC|C|steps?|us|ms|bps)$/i;

export function parseParaList(lines) {
  const rows = [];

  for (const line of lines) {
    const head = line.match(LINE_RE);
    if (!head) continue;

    const id = parseInt(head[1], 10);
    let body = head[2];

    const row = {
      id,
      name: '',
      raw: body.trim(),
      value: null,
      min: null,
      step: null,
      max: null,
      writable: false,
      unit: null,
      boolean: false,
    };

    // Het bereik er eerst afhalen. Dat scheelt niet alleen werk: zonder deze
    // stap zou de dubbele punt in "[0:1:4]" doorgaan voor de scheiding tussen
    // naam en waarde.
    const range = body.match(RANGE_RE);
    if (range) {
      body = body.slice(0, range.index) + body.slice(range.index + range[0].length);
      const a = parseInt(range[1], 10);
      const b = parseInt(range[3], 10);
      const c = range[4] !== undefined ? parseInt(range[4], 10) : null;
      if (c !== null) {
        row.min = a;
        row.step = b;
        row.max = c;
      } else {
        // Modbus schrijft zijn bereik als [1-253]: dan is er geen stapgrootte.
        row.min = a;
        row.step = 1;
        row.max = b;
      }
    }
    body = body.trim();

    // Twee vormen komen voor, afhankelijk van firmware en groep:
    //   "3. Fan Curve: 2"     — naam en waarde gescheiden door een dubbele punt
    //   "1. ENABLE 1"         — geen dubbele punt; de waarde is het eerste getal
    let valuePart = null;
    const colon = body.indexOf(':');
    if (colon !== -1) {
      row.name = body.slice(0, colon).trim();
      valuePart = body.slice(colon + 1).trim();
    } else {
      const m = body.match(/^(.*?[^\d\s])\s+(-?\d+)(.*)$/);
      if (m) {
        row.name = m[1].trim();
        valuePart = (m[2] + ' ' + m[3]).trim();
      } else {
        row.name = body;
        valuePart = '';
      }
    }
    if (!row.name) continue;

    const tokens = valuePart.split(/\s+/).filter(Boolean);
    const first = tokens[0] ?? '';

    // De box schrijft een keuzewaarde vaak als woord met het nummer erachter:
    // "ON (1)", "AUTO (2)", "LINEAR (0)". Zonder het getal eruit te halen zou
    // de parameter als tekst gelden, en dus onterecht alleen-lezen worden.
    const parenNumber = valuePart.match(/\(\s*(-?\d+)\s*\)/);
    if (parenNumber && !/^-?\d/.test(first)) {
      row.value = parseInt(parenNumber[1], 10);
      row.label = first;
      row.writable = row.min !== null;
      rows.push(row);
      continue;
    }

    if (/^(true|false)$/i.test(first)) {
      // Nieuwere firmware meldt aan/uit als woord; de set-kant blijft 0 en 1.
      row.value = /^true$/i.test(first) ? 1 : 0;
      row.boolean = true;
      if (row.min === null) {
        row.min = 0;
        row.step = 1;
        row.max = 1;
      }
    } else if (TIME_RE.test(first)) {
      // "22:00" is een tijd, geen getal met een eenheid erachter.
      row.value = first;
    } else {
      const n = Number(first);
      row.value = first !== '' && Number.isFinite(n) ? n : first;
    }

    // Een eenheid staat direct achter de waarde: "450 m3/h", "21 C", "80 %".
    // Tussen haakjes kan óók een eenheid staan ("180 (days)"), maar net zo goed
    // een toelichting ("0 (CW)"). Alleen wat als eenheid herkenbaar is telt mee.
    const bracket = valuePart.match(/\[\s*([^\]]+?)\s*\]/);
    if (bracket) {
      // Het bereik is er al af, dus wat nog tussen blokhaken staat is een
      // eenheid: "[steps]", "[us]", "[.1 degC]".
      row.unit = bracket[1];
    } else if (tokens.length > 1 && !tokens[1].startsWith('(')) {
      row.unit = tokens[1];
    } else if (tokens.length > 1) {
      const paren = valuePart.match(/\(\s*([^)]+?)\s*\)/);
      if (paren && UNIT_RE.test(paren[1])) row.unit = paren[1];
    }
    if (!row.unit) {
      const glued = first.match(/^-?\d+(?:\.\d+)?([%a-zA-Z°/³]+)$/);
      if (glued) {
        row.value = Number(first.slice(0, first.length - glued[1].length));
        row.unit = glued[1];
      }
    }

    row.writable = row.min !== null && typeof row.value === 'number';
    rows.push(row);
  }

  return rows;
}

/**
 * Splitst een `IoParaGet`-antwoord in secties. Dat commando levert meerdere
 * groepen achter elkaar, gescheiden door kopregels zoals
 * "picotcp para (1) [rw]" en "board info (3) [ro]".
 */
/**
 * Splitst een antwoord met kopregels als `MODBUS PARA (0) [RW]` in secties.
 *
 * Het getal is het modulenummer, en dat is geen sierletter: `IoParaSet` wil het
 * als eerste argument hebben. De toegangscode is `RW` (lezen en schrijven),
 * `RO` (alleen lezen) of `WO` (alleen schrijven — die laatste geeft bij het
 * uitlezen niets zinnigs terug).
 */
export function splitSections(lines) {
  const sections = [];
  let current = { title: 'algemeen', module: null, access: 'rw', readonly: false, writeOnly: false, lines: [] };

  const headerRe = /^(.*?)\s*\((\d+)\)\s*\[(rw|ro|wo)\]\s*$/i;

  for (const line of lines) {
    const m = line.match(headerRe);
    if (m) {
      if (current.lines.length) sections.push(current);
      const access = m[3].toLowerCase();
      current = {
        title: m[1].trim().toLowerCase(),
        module: parseInt(m[2], 10),
        access,
        readonly: access === 'ro',
        writeOnly: access === 'wo',
        lines: [],
      };
      continue;
    }
    current.lines.push(line);
  }
  if (current.lines.length) sections.push(current);

  return sections;
}

/**
 * Parseert een pipe-gescheiden tabel (`Network`, `netwversion`, `netwserial`).
 * De kopregel bepaalt de kolomnamen — de volgorde ligt niet vast, dus we mappen
 * op naam en niet op index.
 */
export function parsePipeTable(lines, { headerHints = ['node'] } = {}) {
  let columns = null;
  const rows = [];

  for (const line of lines) {
    if (!line.includes('|')) continue;
    if (line.includes('--- end list ---') || /^[\s|+-]+$/.test(line)) continue;

    const cells = line.split('|').map((c) => c.trim());

    if (!columns) {
      const low = cells.map((c) => c.toLowerCase());
      const looksLikeHeader = headerHints.every((h) =>
        low.some((c) => c.includes(h.toLowerCase()))
      );
      if (looksLikeHeader) {
        columns = low;
        continue;
      }
      continue; // nog geen kop gezien: overslaan
    }

    // Datarijen beginnen met een nodenummer.
    if (!/^\d+$/.test(cells[0])) continue;

    const row = {};
    columns.forEach((name, i) => {
      if (!name) return;
      row[name] = cells[i] !== undefined ? cells[i] : '';
    });
    row._cells = cells;
    rows.push(row);
  }

  return { columns: columns || [], rows };
}

/** `NodeParaGet <node> <para>` antwoordt met een regel die "--> <waarde>" bevat. */
export function parseArrowValue(lines) {
  for (const line of lines) {
    if (!line.includes('-->')) continue;
    const after = line.split('>').pop();
    const n = parseInt(after, 10);
    if (Number.isInteger(n)) return n;
  }
  return null;
}

/** `NodeParaList` antwoordt met "<nummer> - <naam>" per regel. */
export function parseNodeParaList(lines) {
  const out = [];
  for (const line of lines) {
    if (!line.includes('-')) continue;
    const parts = line.split('-');
    const id = parseInt(parts[0], 10);
    if (!Number.isInteger(id)) continue;
    const name = parts.slice(1).join('-').trim().toLowerCase();
    if (name) out.push({ id, name });
  }
  return out;
}

/**
 * Vrije sleutel/waarde-regels zoals `boardinfo` en `network_info` produceren:
 * "IP Address: 192.168.1.42". Geen id, geen bereik — puur informatief.
 */
export function parseKeyValues(lines) {
  const out = [];
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (!key) continue;
    out.push({ key, value });
  }
  return out;
}

/** Herkent of een antwoord een foutmelding van het toestel is. */
export function responseError(lines) {
  const joined = lines.join(' ').toLowerCase();
  if (joined.includes('unknown cmd')) return 'Toestel kent dit commando niet';
  if (joined.includes('incorrect cmd arguments')) return 'Verkeerde argumenten';
  if (joined.includes('failed')) return 'Toestel meldde: failed';
  return null;
}
