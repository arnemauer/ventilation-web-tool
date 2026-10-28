/*
 * cards.js — leesbare weergave van de antwoorden van de informatiecommando's.
 *
 * Elke box geeft zijn eigen vorm terug. Voor de bekende vormen maken we een
 * overzicht in gewone taal (temperaturen in °C, ja/nee in plaats van
 * TRUE/FALSE); voor de rest valt het terug op sleutel/waarde of de ruwe tekst.
 * Wat de box niet stuurt, verschijnt ook niet: er wordt niets aangevuld.
 */

/** Markering voor een antwoord zonder inhoud, zoals een kale `[SENSOR] INFO`. */
export const EMPTY = Symbol('leeg');

const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
};

/** Regels zonder de afsluitende Done. */
const body = (lines) => lines.map((l) => l.trim()).filter((l) => l && !/^done$/i.test(l));

const yesNo = (v) => (/^true$/i.test(v) ? 'ja' : /^false$/i.test(v) ? 'nee' : v);

/** Tienden van graden naar °C. De box meldt 1000 of meer als er geen meting is. */
function tenths(v) {
  const n = Number(v);
  if (!Number.isFinite(n)) return v;
  if (n >= 1000) return 'onbekend';
  return `${(n / 10).toFixed(1).replace('.', ',')} °C`;
}

export function kvList(pairs) {
  const dl = el('dl', 'kv');
  for (const [k, v] of pairs) {
    if (v === undefined || v === null || v === '') continue;
    dl.append(el('dt', '', k), el('dd', '', v));
  }
  return dl;
}

function section(title) {
  return el('h4', 'card-sub', title);
}

function metric(value, unit, sub) {
  const box = el('div', 'metric');
  const big = el('span', 'metric-value', value);
  box.appendChild(big);
  if (unit) box.appendChild(el('span', 'metric-unit', unit));
  if (sub) box.appendChild(el('div', 'metric-sub', sub));
  return box;
}

/** Voorwaarden als lijst met een vinkje of kruisje. */
function conditions(pairs) {
  const ul = el('ul', 'conds');
  for (const [text, value] of pairs) {
    const ok = /^true$/i.test(value);
    const li = el('li', ok ? 'ok' : 'no');
    li.append(el('span', 'mark', ok ? '✓' : '✗'), el('span', '', text));
    ul.appendChild(li);
  }
  return ul;
}

function table(head, rows) {
  const t = el('table', 'mini');
  const tr = el('tr');
  head.forEach((h) => tr.appendChild(el('th', '', h)));
  t.appendChild(tr);
  for (const r of rows) {
    const row = el('tr');
    r.forEach((c) => row.appendChild(el('td', '', c)));
    t.appendChild(row);
  }
  return t;
}

function wrap(...children) {
  const f = document.createDocumentFragment();
  children.filter(Boolean).forEach((c) => f.appendChild(c));
  return f;
}

/* ------------------------------------------------------------ per commando */

/** `FanSpeed (fan 1)` met Actual, Filtered en Average in rpm. */
function fanSpeed(lines) {
  const get = (k) => (lines.find((l) => l.includes(k)) || '').match(/:\s*(\d+)/)?.[1];
  const actual = get('Actual');
  if (!actual) return null;
  return metric(actual, 'rpm', `gefilterd ${get('Filtered') ?? '–'} · gemiddeld ${get('Average') ?? '–'} rpm`);
}

/** Drukken en opgenomen vermogen. */
function fanPerform(lines) {
  const press = [];
  const power = [];
  for (const l of body(lines)) {
    const m = l.match(/^-?\s*(Press|Power)\s+(.+?)\s*:\s*(-?\d+)\s*(Pa|W)/);
    if (!m) continue;
    const what = m[2].trim();
    const label =
      m[1] === 'Press'
        ? { Total: 'Totaal', Out: 'Uitgang' }[what] || what.replace(/^Valve/, 'Klep')
        : { Now: 'Nu', Avg: 'Gemiddeld', Max: 'Maximum' }[what] || what;
    (m[1] === 'Press' ? press : power).push([label, `${m[3]} ${m[4]}`]);
  }
  if (!press.length && !power.length) return null;
  return wrap(
    press.length && section('Druk'),
    press.length && kvList(press),
    power.length && section('Vermogen'),
    power.length && kvList(power)
  );
}

/** Kalibratiestatus met per klep toerental, drukverschil, debiet en k-waarde. */
function fanCalib(lines) {
  const ls = body(lines);
  const status = ls.find((l) => /^FAN CALIB/i.test(l))?.match(/\[(.+)\]/)?.[1];
  const error = ls.find((l) => /^error\s*:/i.test(l))?.replace(/^error\s*:\s*/i, '');
  const rows = ls
    .filter((l) => /^(ALL|\d+)\s*\|/.test(l))
    .map((l) => l.split('|').map((c) => c.trim()))
    .map(([node, ...rest]) => [node === 'ALL' ? 'alle' : node, ...rest]);
  if (!status && !rows.length) return null;
  return wrap(
    kvList([
      ['Status', status],
      ['Fout', error && error.replace(/^NONE\b.*/, 'geen')],
    ]),
    rows.length && table(['Node', 'Toerental', 'dP (Pa)', 'Debiet (m³/h)', 'k-waarde'], rows)
  );
}

/** Automatische bezetting: of hij actief is en hoeveel personen hij schat. */
function autoHc(lines) {
  const pairs = [];
  for (const l of body(lines)) {
    const m = l.match(/^-\s*(.+?)\s{2,}(\S.*)$/);
    if (!m) continue;
    const [k, v] = [m[1].trim(), m[2].trim()];
    const label = {
      Active: 'Actief',
      'HeadCount Estim': 'Geschatte bezetting',
      'Last CO2 value': 'Laatste CO2-waarde',
    }[k] || k;
    const value =
      k === 'Active' ? yesNo(v)
        : k === 'HeadCount Estim'
          ? `${Number(v).toLocaleString('nl-NL', { maximumFractionDigits: 1 })} personen`
        : k === 'Last CO2 value' ? `${v} ppm`
        : v;
    pairs.push([label, value]);
  }
  return pairs.length ? kvList(pairs) : null;
}

const TEMP_LABELS = {
  T_e_ref: 'Referentie',
  T_e_ref_threshold: 'Referentie, drempel',
  T_inside: 'Binnen',
  T_inside_min: 'Binnen, minimum',
  T_inside_max: 'Binnen, maximum',
  T_inside_conf: 'Binnen, comfort',
  T_outside: 'Buiten',
  T_outside_night: 'Buiten, nacht',
};

/** Ventilatief koelen: status, temperaturen en de voorwaarden. */
function ventCool(lines) {
  const info = [];
  const conds = [];
  let inConds = false;
  for (const l of body(lines)) {
    if (/\[VENTCOOL\] CONDITIONS/i.test(l)) { inConds = true; continue; }
    if (/^\[VENTCOOL\]/i.test(l)) continue;
    if (inConds) {
      const m = l.match(/^(.+?):\s+(TRUE|FALSE)$/i);
      if (m) conds.push([m[1].trim(), m[2]]);
      continue;
    }
    const m = l.match(/^([^:\s]+(?:\s[^:\s]+)*?)\s*:?\s{2,}(.+)$/) || l.match(/^(.+?):\s*(.+)$/);
    if (!m) continue;
    const key = m[1].replace(/:$/, '').trim();
    const raw = m[2].trim();
    if (key === 'Status') info.push(['Actief', yesNo(raw)]);
    else if (key === 't_now') info.push(['Tijd', raw]);
    else if (/\[\.1.?C\]/.test(raw)) info.push([TEMP_LABELS[key] || key, tenths(raw.match(/-?\d+/)[0])]);
    else info.push([key, raw]);
  }
  if (!info.length) return null;
  return wrap(kvList(info), conds.length && section('Voorwaarden'), conds.length && conditions(conds));
}

/** Nachtkoeling: buitencondities en per zone de temperatuur en vraag. */
function nightBoost(lines) {
  const head = [];
  const zones = [];
  let zone = null;
  for (const l of body(lines)) {
    if (/^\[NIGHTBOOST\]/i.test(l) || /^-+$/.test(l)) continue;
    let m;
    if ((m = l.match(/^Zone ID:\s*(\d+)/))) {
      zone = { id: m[1], pairs: [], conds: [] };
      zones.push(zone);
      continue;
    }
    if ((m = l.match(/^(.+?)\s{2,}(TRUE|FALSE)$/))) {
      (zone ? zone.conds : head).push(zone ? [m[1].trim(), m[2]] : [m[1].trim(), yesNo(m[2])]);
      continue;
    }
    if (!(m = l.match(/^(.+?):\s*(.+)$/))) continue;
    const [k, v] = [m[1].trim(), m[2].trim()];
    if (zone) {
      if (k === 'Temperature') zone.pairs.push(['Temperatuur', tenths(v)]);
      else if (k === 'Req. value') zone.pairs.push(['Gevraagde stand', `${v} %`]);
      else zone.pairs.push([k, v]);
    } else if (k === 'Temperature outside') head.push(['Buiten', tenths(v)]);
    else if (k === 'Temperature e_ref') {
      const [now, ref] = v.split(/\s*\[/);
      head.push(['Referentie', `${tenths(now)}${ref ? ` (gem. ${tenths(ref.replace(']', ''))})` : ''}`]);
    } else if (k === 'Temperature e_ref Threshold') head.push(['Drempel', tenths(v)]);
    else head.push([k, v]);
  }
  if (!head.length && !zones.length) return null;
  const parts = [kvList(head)];
  for (const z of zones) {
    parts.push(section(`Zone ${z.id}`), kvList(z.pairs));
    if (z.conds.length) parts.push(conditions(z.conds));
  }
  return wrap(...parts);
}

function serviceCode(lines) {
  const get = (k) => body(lines).find((l) => l.startsWith(`- ${k}:`))?.split(':').slice(1).join(':').trim();
  const code = get('Code');
  return code ? kvList([['Code', code], ['Status', get('Stat')]]) : null;
}

/** Secties als COMM INFO, COMM WI en COMM RF, met regels "naam   waarde". */
function commInfo(lines) {
  const parts = [];
  let pairs = null;
  for (const l of body(lines)) {
    if (/^COMM\b/i.test(l) && !/\s{2,}/.test(l)) {
      if (pairs?.length) parts.push(kvList(pairs));
      parts.push(section({ 'COMM INFO': 'Algemeen', 'COMM WI': 'Bedraad', 'COMM RF': 'Draadloos' }[l] || l));
      pairs = [];
      continue;
    }
    const m = l.match(/^(.+?)\s{2,}(.+)$/);
    if (m) (pairs ||= []).push([m[1].trim(), m[2].trim()]);
  }
  if (pairs?.length) parts.push(kvList(pairs));
  return parts.length ? wrap(...parts) : null;
}

/** `0. HUM OUTPUT REQ. : 0 (%)` — de ventilatievraag die de sensoren stellen. */
function sensorCtrl(lines) {
  const pairs = [];
  for (const l of body(lines)) {
    const m = l.match(/^\d+\.\s*(.+?)\s*:\s*(-?\d+)\s*\(([^)]*)\)/);
    if (!m) continue;
    const name = m[1].trim();
    const label = { 'HUM OUTPUT REQ.': 'Vraag op vocht', 'CO2 OUTPUT REQ.': 'Vraag op CO2' }[name] || name;
    pairs.push([label, `${m[2]} ${m[3]}`.trim()]);
  }
  return pairs.length ? kvList(pairs) : null;
}

/** `16010.10.4.0` en `built @ Oct  8 2019 17:20:20`. */
function swVersion(lines) {
  const ls = body(lines);
  if (!/^\d+\.\d+\.\d+\.\d+$/.test(ls[0] || '')) return null;
  const built = ls.find((l) => /^built @/i.test(l))?.replace(/^built @\s*/i, '').replace(/\s+/g, ' ');
  return kvList([['Versie', ls[0]], ['Gebouwd', built]]);
}

function sensorInfo(lines) {
  const ls = body(lines).filter((l) => !/^\[SENSOR\] INFO$/i.test(l));
  return ls.length ? null : EMPTY;
}

const RENDERERS = {
  fanspeed: fanSpeed,
  fangetspeed: fanSpeed,
  fanperformget: fanPerform,
  fancalib: fanCalib,
  autohcinfo: autoHc,
  ventcoolinfo: ventCool,
  nightboostinfo: nightBoost,
  servicecode: serviceCode,
  comminfo: commInfo,
  sensorctrlinfo: sensorCtrl,
  swversion: swVersion,
  sensorinfo: sensorInfo,
};

/* ------------------------------------------------------------- terugval */

/**
 * Sleutel/waarde uit regels als `Key : value`, `- Key : value` of
 * `Key      value`. Tabellen met `|` blijven erbuiten.
 */
export function genericPairs(lines) {
  const pairs = [];
  for (const l of body(lines)) {
    if (l.includes('|')) continue;
    const m = l.match(/^-?\s*([^:]+?)\s*:\s*(.*)$/) || l.match(/^-?\s*(.+?)\s{2,}(\S.*)$/);
    if (m && m[1].trim()) pairs.push([m[1].trim(), m[2].trim()]);
  }
  return pairs;
}

/**
 * De inhoud van een kaartje: een eigen weergave als die er is, anders
 * sleutel/waarde, anders de ruwe tekst. Geeft `EMPTY` als er niets te tonen is.
 */
export function renderInfoBody(cmd, lines) {
  const fn = RENDERERS[String(cmd || '').toLowerCase()];
  if (fn) {
    try {
      const out = fn(lines);
      if (out) return out;
    } catch {
      /* onverwachte vorm: dan de terugval */
    }
  }
  if (!body(lines).length) return EMPTY;
  const pairs = genericPairs(lines);
  if (pairs.length >= 2 && pairs.length >= body(lines).length * 0.6) return kvList(pairs);
  const pre = el('pre', 'raw');
  pre.textContent = lines.join('\n');
  return pre;
}
