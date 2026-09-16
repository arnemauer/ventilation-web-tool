/*
 * app.js — UI voor de Ventilation Web Tool.
 *
 * De applicatie is opgebouwd rond de componenten van de installatie: het
 * linkermenu is de componentenlijst, en alles wat je met een component kunt
 * doen staat op één pagina bij elkaar.
 *
 * Vrijwel alle instellingsgroepen horen bij de DucoBox zelf — die commando's
 * kennen geen nodenummer en gelden altijd node 1. Alleen `NodeConfigGet` is
 * per node. Daarom krijgt de box alle groepen te zien en houden de componenten
 * eronder hun eigen nodeconfiguratie.
 *
 * De UI blijft verder generiek: het protocol beschrijft zichzelf (parameters
 * dragen hun bereik, tabellen hun kolomkoppen, `help /all` de commandolijst),
 * dus we lezen wat het toestel zegt in plaats van een vast model te tonen.
 */

import { DucoSerial } from './serial.js';
import {
  parseParaList,
  parsePipeTable,
  parseKeyValues,
  parseArrowValue,
  findLabelledInt,
  splitSections,
  responseError,
} from './protocol.js';
import {
  PARAM_GROUPS,
  INFO_COMMANDS,
  TABLE_COMMANDS,
  ACTIONS,
  NODE_ACTIONS,
  isDangerous,
} from './groups.js';
import { createEmulatorPort, listProfiles } from './emulator.js';
import { productName, isBox, STATE_LABEL, NETWORK_LABEL } from './products.js';
import { SETTINGS, DEVICE_NAMES } from './paramMeta.js';
import { NODE_PARA_LISTS } from './nodeParaLists.js';

/* ------------------------------------------------------------------- state */

const state = {
  connected: false,
  emulating: false,
  busy: false,
  deviceLabel: '',
  nodes: [],
  selectedNode: null,
  currentGroup: null,
  groupIndex: 1,             // voor groepen met een eigen index, zoals Motor
  dirty: new Map(),          // sleutel -> { group, node, sec, row, value, meta }
  boxProductVersion: null,
  logEntries: [],
  history: [],
  historyIdx: -1,
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const duco = new DucoSerial({ onLog: appendLog });

const NODECONFIG = PARAM_GROUPS.find((g) => g.id === 'nodeconfig');
/** Alles behalve de nodeconfiguratie hoort bij de box zelf. */
const BOX_GROUPS = PARAM_GROUPS.filter((g) => !g.needsNode);

/* --------------------------------------------------------------- logboek */

function appendLog({ dir, text, bytes }) {
  const entry = { dir, text, bytes, at: new Date() };
  state.logEntries.push(entry);
  if (state.logEntries.length > 5000) state.logEntries.shift();
  renderLogEntry(entry);
}

/**
 * Legt vast wat de gebruiker aanklikt.
 *
 * Het logboek is bedoeld om achteraf te kunnen nagaan wat er gebeurd is, en
 * dan is alleen het busverkeer niet genoeg: zonder de bediening erbij weet je
 * niet waaróm een commando werd verstuurd.
 */
function logUi(text) {
  appendLog({ dir: 'ui', text });
}

/** Een leesbare omschrijving van het aangeklikte element. */
function describeControl(el) {
  const label = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ');

  if (el.classList.contains('nav-node')) {
    const num = el.querySelector('.node-num')?.textContent?.trim();
    const name = el.querySelector('.nav-node-name')?.textContent?.trim();
    return `Component gekozen: node ${num} — ${name}`;
  }
  if (el.classList.contains('nav-item')) return `Menu: ${label}`;
  if (el.closest('#groupTabs')) return `Instellingengroep: ${label}`;
  if (el.closest('#installerBody')) return `Installateursmodus: ${label}`;
  if (el.closest('.dialog')) return `Dialoog: ${label}`;
  if (el.dataset.refresh) return `Vernieuwen: ${el.dataset.refresh}`;
  return `Knop: ${label || el.id || el.className}`;
}

/** `>>` verzonden, `<<` ontvangen, `##` bediening, `--` melding, `!!` fout. */
const LOG_PREFIX = { tx: '>>', rx: '<<', ui: '##', sys: '--', err: '!!' };

function renderLogEntry(entry) {
  const log = $('#log');
  if (!log) return;

  const atBottom = log.scrollHeight - log.scrollTop - log.clientHeight < 40;
  const cls = { tx: 'tx', rx: 'rx', sys: 'sy', err: 'er', ui: 'ui' }[entry.dir] || 'sy';
  const prefix = LOG_PREFIX[entry.dir] || '--';
  const time = entry.at.toTimeString().slice(0, 8);

  const line = document.createElement('div');
  line.innerHTML =
    `<span class="t">${time}</span> <span class="${cls}">${prefix} ${escapeHtml(
      entry.text.replace(/\r/g, '⏎')
    )}</span>`;

  if ($('#showHex')?.checked && entry.bytes?.length) {
    const hex = Array.from(entry.bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(' ');
    line.innerHTML += `\n<span class="hex">   ${hex}</span>`;
  }

  log.appendChild(line);
  if (atBottom) log.scrollTop = log.scrollHeight;
}

function rerenderLog() {
  $('#log').textContent = '';
  state.logEntries.forEach(renderLogEntry);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

/* ---------------------------------------------------------------- feedback */

let toastTimer = null;
function toast(msg, kind = '') {
  const el = $('#toast');
  el.textContent = msg;
  el.dataset.kind = kind;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.hidden = true), kind === 'err' ? 6000 : 3000);
}

function setStatus(text, dotState) {
  $('#statusText').textContent = text;
  $('#statusDot').dataset.state = dotState;
}

function setBusy(on, what = '') {
  state.busy = on;
  if (on) setStatus(what || 'Bezig…', 'busy');
  else setStatus(state.connected ? state.deviceLabel || 'Verbonden' : 'Niet verbonden', state.connected ? 'on' : 'off');

  // Het logboek moet je juist kunnen opslaan als er iets misging, dus die
  // knoppen blijven altijd bereikbaar.
  const ALWAYS_ON = ['btnDisconnect', 'btnConnect', 'btnSaveLog', 'btnSaveLogTop', 'btnClearLog'];
  $$('.btn').forEach((b) => {
    if (ALWAYS_ON.includes(b.id)) return;
    b.disabled = on || !state.connected;
  });

  // Halverwege wisselen tussen emulatie en hardware kan niet: eerst verbreken.
  $('#emulate').disabled = state.connected;
  $('#emuProfile').disabled = state.connected;
  $('#anyDevice').disabled = state.connected || $('#emulate').checked;
}

function confirmAction(title, body) {
  return new Promise((resolve) => {
    const dlg = $('#confirmDialog');
    $('#confirmTitle').textContent = title;
    $('#confirmBody').textContent = body;

    const onClose = () => resolve(dlg.returnValue === 'ok');
    dlg.addEventListener('close', onClose, { once: true });

    try {
      if (dlg.open) dlg.close('cancel');
      dlg.showModal();
    } catch {
      // Lukt de dialoog niet, dan mag de vraag niet stilletjes verdwijnen —
      // een blijvend hangende promise zou de hele UI vastzetten.
      dlg.removeEventListener('close', onClose);
      resolve(window.confirm(`${title}\n\n${body}`));
    }
  });
}

/* -------------------------------------------------------------- verbinding */

async function connect() {
  try {
    const emulate = $('#emulate').checked;

    // In emulatie praat DucoSerial met een object dat zich als SerialPort
    // gedraagt; er is verder geen enkel verschil in de code eronder.
    const port = emulate
      ? createEmulatorPort({ profileId: $('#emuProfile').value || null })
      : await duco.requestPort({ anyDevice: $('#anyDevice').checked });

    state.emulating = emulate;
    document.body.toggleAttribute('data-emulating', emulate);
    $('#emuBadge').hidden = !emulate;
    $('#emuBanner').hidden = !emulate;
    if (emulate) appendLog({ dir: 'sys', text: 'Emulatie gestart — geen echte hardware' });

    setBusy(true, 'Verbinden…');
    await duco.open(port);
    state.connected = true;

    setBusy(true, "Commando's ophalen…");
    await duco.discoverCommands({ force: true });
    appendLog({ dir: 'sys', text: `${duco.possibleCommands.length} commando's beschikbaar` });

    await identify();
    buildActions();

    $('#btnConnect').hidden = true;
    $('#btnDisconnect').hidden = false;
    setBusy(false);
    toast(state.emulating ? 'Verbonden met de emulator' : 'Verbonden met de DucoBox', 'ok');

    // Eerst het menu: dat is waar je verder navigeert.
    await loadNodes();
    await loadDashboard();
  } catch (err) {
    state.connected = false;
    state.emulating = false;
    document.body.removeAttribute('data-emulating');
    $('#emuBadge').hidden = true;
    $('#emuBanner').hidden = true;
    setBusy(false);
    if (err.name === 'NotFoundError') return; // gebruiker koos geen poort
    setStatus('Verbinden mislukt', 'err');
    appendLog({ dir: 'err', text: err.message });
    toast(err.message, 'err');
  }
}

async function disconnect() {
  try {
    await duco.close();
  } finally {
    state.connected = false;
    state.emulating = false;
    state.dirty.clear();
    state.nodes = [];
    state.selectedNode = null;
    state.currentGroup = null;
    state.boxProductVersion = null;
    document.body.removeAttribute('data-emulating');
    $('#emuBadge').hidden = true;
    $('#emuBanner').hidden = true;
    $('#btnConnect').hidden = false;
    $('#btnDisconnect').hidden = true;
    $('#networkBody').dataset.loaded = '';
    $('#navNodes').innerHTML = '<p class="nav-empty">Nog niet verbonden.</p>';
    setBusy(false);
    switchView('dashboard');
    $('#dashboardBody').innerHTML = '<p class="empty">Verbind met de DucoBox om te beginnen.</p>';
  }
}

/** Haalt versie en type op zodat de titelbalk vertelt waar je mee praat. */
async function identify() {
  let text = '';
  try {
    const lines = await duco.sendCommandWithResponse('swversion', { timeoutSec: 4 });
    text = lines.join(' ').slice(0, 70);
    // De box meldt zijn productcode als eerste deel van een viercijferige
    // versie, bv. "12030.8.3.0" -> 12030. Zo werkt Node_productVersionGet ook.
    for (const l of lines) {
      const parts = l.trim().split('.');
      if (parts.length === 4 && /^\d+$/.test(parts[0])) {
        state.boxProductVersion = parseInt(parts[0], 10);
        break;
      }
    }
  } catch {
    /* geen versie-antwoord: dan maar zonder label */
  }
  const label = text || 'Verbonden';
  state.deviceLabel = state.emulating ? 'Emulatie · ' + label : label;
}

/* -------------------------------------------------------------- navigatie */

function switchView(view) {
  $$('.view').forEach((v) => v.classList.toggle('active', v.dataset.view === view));
  $$('.nav-item').forEach((n) => n.classList.toggle('active', n.dataset.view === view));
  if (view !== 'node') $$('.nav-node').forEach((n) => n.classList.remove('active'));

  if (view === 'network' && state.connected && !$('#networkBody').dataset.loaded) loadNetwork();
}

/* ------------------------------------------------------ componentenlijst */

/**
 * Bouwt de componentenlijst voor het menu. De drie tabelcommando's leveren
 * samen nummer, type, status, firmware en serienummer; de productcode per node
 * halen we er daarna los bij op zodat de naam klopt.
 */
async function loadNodes() {
  const nav = $('#navNodes');
  nav.innerHTML = '<p class="nav-empty">Laden…</p>';

  const byNode = new Map();
  const merge = (num, fields) => {
    const n = Number(num);
    if (!Number.isInteger(n)) return;
    // `node` als laatste zetten: de tabelrij levert hem als tekst, en daar
    // vergelijkt de rest van de app niet mee.
    byNode.set(n, { ...(byNode.get(n) || {}), ...fields, node: n });
  };

  setBusy(true, 'Componenten uitlezen…');
  try {
    for (const t of TABLE_COMMANDS) {
      if (!duco.supports(t.cmd)) continue;
      try {
        const lines = await duco.sendCommandWithResponse(t.cmd, {
          timeoutSec: t.timeoutSec,
          endTrigger: t.endTrigger,
        });
        const { rows } = parsePipeTable(lines, { headerHints: t.headerHints });
        for (const r of rows) {
          if (t.id === 'network') merge(r.node, r);
          if (t.id === 'netwversion') merge(r.node, { version: r.version });
          if (t.id === 'netwserial') merge(r.node, { serial: r.serial });
        }
      } catch (err) {
        appendLog({ dir: 'err', text: `${t.cmd}: ${err.message}` });
      }
    }
  } finally {
    setBusy(false);
  }

  state.nodes = Array.from(byNode.values()).sort((a, b) => a.node - b.node);

  if (!state.nodes.length) {
    nav.innerHTML = '<p class="nav-empty">Geen componenten gevonden.</p>';
    return;
  }

  if (state.boxProductVersion) {
    const box = state.nodes.find((n) => isBox(n));
    if (box) box.productVersion = state.boxProductVersion;
  }

  renderNavNodes();

  // Productcodes komen per node apart binnen; het menu staat er al, dus we
  // vullen de namen bij zodra ze bekend zijn.
  fetchProductVersions();
}

/** `NodeParaGet <n> 0` levert de productcode van een node. */
async function fetchProductVersions() {
  if (!duco.supports('NodeParaGet')) return;

  for (const node of state.nodes) {
    if (node.productVersion || isBox(node)) continue;
    try {
      const lines = await duco.sendCommandWithResponse(`NodeParaGet ${node.node} 0`, {
        timeoutSec: 4,
        endTriggerFailedDone: true,
      });
      const v = parseArrowValue(lines);
      if (v && v > 0) {
        node.productVersion = v;
        renderNavNodes();
        if (state.selectedNode === node.node) renderNodeHeader(node);
      }
    } catch {
      /* node antwoordt niet: naam blijft op de typecode gebaseerd */
    }
  }
}

/**
 * Zet de vlakke nodelijst om in de boom die de installatie werkelijk is.
 * De `prnt`-kolom uit de netwerktabel wijst de bovenliggende node aan: een
 * klep hangt aan de box, een ruimtesensor aan die klep. Zo zie je in één
 * oogopslag wat waaronder hangt.
 */
function buildNodeTree(nodes) {
  const byNumber = new Map(nodes.map((n) => [n.node, n]));
  const childrenOf = new Map();
  const roots = [];

  for (const node of nodes) {
    const parent = Number(node.prnt);
    // Zonder geldige ouder staat een node bovenaan; dat geldt voor de box
    // (prnt 0) en voor alles waarvan de ouder ontbreekt in de tabel.
    if (!parent || parent === node.node || !byNumber.has(parent)) {
      roots.push(node);
    } else {
      if (!childrenOf.has(parent)) childrenOf.set(parent, []);
      childrenOf.get(parent).push(node);
    }
  }

  const byNode = (a, b) => a.node - b.node;
  const out = [];
  const visited = new Set();

  const walk = (node, depth) => {
    if (visited.has(node.node)) return;   // beschermt tegen een kringverwijzing
    visited.add(node.node);
    out.push({ node, depth });
    (childrenOf.get(node.node) || []).sort(byNode).forEach((c) => walk(c, depth + 1));
  };
  roots.sort(byNode).forEach((r) => walk(r, 0));

  // Wat door een kring onbereikbaar bleef hoort er alsnog bij te staan.
  nodes.filter((n) => !visited.has(n.node)).sort(byNode).forEach((n) => out.push({ node: n, depth: 0 }));
  return out;
}

/**
 * De foutcode uit de netwerktabel, bv. `E56.31.01`. De kolomkop verschilt per
 * firmware in hoofdlettergebruik, en een streepje betekent 'geen fout'.
 *
 * De code wordt niet vertaald: er is geen tabel om hem mee te duiden, en een
 * verzonnen betekenis is erger dan een kale code.
 */
function nodeErrorCode(node) {
  const raw = node.Error ?? node.error ?? node.ERROR;
  if (raw === undefined || raw === null) return null;
  const text = String(raw).trim();
  return text && text !== '-' ? text : null;
}

function renderNavNodes() {
  const nav = $('#navNodes');
  nav.innerHTML = '';

  for (const { node, depth } of buildNodeTree(state.nodes)) {
    const btn = document.createElement('button');
    btn.className = 'nav-node' + (isBox(node) ? ' is-box' : '');
    btn.style.paddingLeft = `${9 + depth * 15}px`;
    if (depth > 0) btn.dataset.depth = depth;
    btn.classList.toggle('active', state.selectedNode === node.node);
    btn.dataset.node = node.node;
    btn.title =
      `${productName(node)} — node ${node.node}, type ${node.type || '?'}` +
      (depth > 0 ? `, hangt aan node ${node.prnt}` : '');

    const num = document.createElement('span');
    num.className = 'node-num';
    num.textContent = node.node;

    const name = document.createElement('span');
    name.className = 'nav-node-name';
    name.textContent = productName(node);

    btn.append(num, name);

    const cerr = Number(node.cerr);
    const errCode = nodeErrorCode(node);
    if (cerr > 0 || errCode) {
      const flag = document.createElement('span');
      flag.className = 'nav-node-flag';
      flag.textContent = cerr > 0 ? cerr : '!';
      flag.title = [
        cerr > 0 ? `${cerr} communicatiefout${cerr === 1 ? '' : 'en'}` : null,
        errCode ? `foutcode ${errCode}` : null,
      ].filter(Boolean).join(' · ');
      btn.appendChild(flag);
    }

    nav.appendChild(btn);
  }
}

/* ------------------------------------------------------- componentpagina */

async function showNode(nodeNumber, { keepGroup = false } = {}) {
  const node = state.nodes.find((n) => n.node === Number(nodeNumber));
  if (!node) return;

  state.selectedNode = node.node;
  state.dirty.clear();
  switchView('node');
  renderNavNodes();
  renderNodeHeader(node);

  const info = $('#nodeInfo');
  info.innerHTML = '<p class="empty">Laden…</p>';
  $('#nodeGroupsSection').hidden = true;
  $('#nodeActionsSection').hidden = true;
  $('#installerSection').hidden = true;
  $('#topologySection').hidden = true;

  setBusy(true, `Node ${node.node} uitlezen…`);
  try {
    let infoLines = [];
    if (duco.supports('nodeinfo')) {
      try {
        infoLines = await duco.sendCommandWithResponse(`nodeinfo ${node.node}`, { timeoutSec: 5 });
      } catch (err) {
        appendLog({ dir: 'err', text: `nodeinfo ${node.node}: ${err.message}` });
      }
    }
    info.innerHTML = '';
    info.appendChild(buildInfoHeading('Gegevens'));
    info.appendChild(buildNodeInfoCard(node, infoLines));
  } finally {
    setBusy(false);
  }

  buildNodeActions(node);
  buildTopologySection(node);
  await buildInstallerSection(node);

  const groups = groupsForNode(node);
  renderGroupTabs(node, groups);
  if (groups.length) {
    const keep = keepGroup && groups.find((g) => g === state.currentGroup);
    await selectGroup(keep || groups[0], node);
  }
}

/**
 * Losse genummerde parameters (`NodeParaGet <node> <nr>`), per printtype.
 *
 * Welke print in een component zit is niet uit de bus af te leiden, dus de
 * typecode uit de netwerktabel bepaalt welke lijst van toepassing is. Dit is
 * een vertaling van de printnamen naar wat je op de bus tegenkomt.
 */
const BOARD_FOR_TYPE = {
  box: 'ccb', uc: 'ucb', ucco2: 'ucb', ucrh: 'ucb', ucbat: 'ucb', ucp: 'ucb',
  vlv: 'vcb', vlvsl: 'vcb', vlvco2: 'vcb', vlvrh: 'vcb', vlvco2rh: 'vcb',
  vlvsup: 'vcb', vlvoda: 'vcb', vlveta: 'vcb',
  iav: 'vcb', iavco2: 'vcb', iavrh: 'vcb',
  act: 'acb', clima: 'ccb_clima', sens: 'sdr', eav: 'vcb',
};

/** Een pseudo-groep zodat de losse parameters een eigen tabblad krijgen. */
const RAWPARA = {
  id: 'rawpara',
  label: 'Losse parameters',
  get: 'NodeParaGet',
  set: 'NodeParaSet',
  needsNode: true,
  raw: true,
};

function boardForNode(node) {
  const code = String(node.type || '').trim().toLowerCase();
  const board = BOARD_FOR_TYPE[code];
  return board && NODE_PARA_LISTS[board] ? NODE_PARA_LISTS[board] : null;
}

function groupsForNode(node) {
  const list = [];
  if (NODECONFIG && duco.supports(NODECONFIG.get)) list.push(NODECONFIG);
  // De overige groepen kennen geen nodenummer: die horen bij de box.
  if (isBox(node)) list.push(...BOX_GROUPS.filter((g) => duco.supports(g.get)));
  if (duco.supports('NodeParaGet') && boardForNode(node)) list.push(RAWPARA);
  return list;
}

/**
 * Leest de genummerde parameters één voor één uit. Anders dan de groepen is er
 * geen commando dat ze in één keer geeft, dus dit kost een round-trip per
 * parameter — vandaar dat het achter een eigen tabblad zit.
 */
async function loadRawParams(node) {
  const body = $('#groupBody');
  const board = boardForNode(node);
  body.innerHTML = '';

  const intro = document.createElement('p');
  intro.className = 'hint';
  intro.textContent =
    `${board.label}. Deze parameters worden per stuk opgevraagd; dat duurt even.`;
  body.appendChild(intro);

  const list = document.createElement('div');
  list.className = 'param-list';
  body.appendChild(list);

  const sec = { title: null, module: null, readonly: false, writeOnly: false };

  for (const p of board.params) {
    let value = null;
    try {
      const lines = await duco.sendCommandWithResponse(`NodeParaGet ${node.node} ${p.id}`, {
        timeoutSec: 4,
        endTriggerFailedDone: true,
      });
      value = parseArrowValue(lines);
    } catch (err) {
      appendLog({ dir: 'err', text: `NodeParaGet ${node.node} ${p.id}: ${err.message}` });
    }
    if (value === null || value === undefined) continue;

    const row = {
      id: p.id,
      name: p.name,
      value,
      min: null,
      step: null,
      max: null,
      unit: null,
      writable: false,
    };
    // De lijst zegt of een parameter schrijfbaar is; een bereik geeft de box
    // hier niet mee, dus dat blijft leeg.
    list.appendChild(renderRawParam(RAWPARA, sec, row, node, p.writable));
  }

  if (!list.children.length) {
    body.appendChild(
      Object.assign(document.createElement('p'), {
        className: 'empty',
        textContent: 'Deze component gaf op geen van de parameters antwoord.',
      })
    );
    return;
  }
  body.appendChild(makeSaveBar(() => selectGroup(RAWPARA, node)));
}

function renderRawParam(group, sec, row, node, writable) {
  const el = document.createElement('div');
  el.className = 'param';

  const name = document.createElement('div');
  name.className = 'param-name';
  const b = document.createElement('b');
  b.textContent = row.name;
  const small = document.createElement('small');
  small.textContent = `#${row.id}${writable ? '' : ' · alleen lezen'}`;
  name.append(b, small);

  const edit = document.createElement('div');
  edit.className = 'param-edit';
  const input = document.createElement('input');
  input.type = 'number';
  input.value = row.value;
  input.disabled = !writable;

  const key = dirtyKey(group, node.node, sec, row);
  input.addEventListener('input', () => {
    const changed = input.value !== String(row.value);
    input.classList.toggle('dirty', changed);
    if (changed) state.dirty.set(key, { group, node: node.node, sec, row, value: input.value });
    else state.dirty.delete(key);
    updateSaveBars();
  });
  edit.appendChild(input);

  if (!writable) {
    const ro = document.createElement('span');
    ro.className = 'ro';
    ro.textContent = 'read-only';
    edit.appendChild(ro);
  }

  el.append(name, edit);
  return el;
}

function renderNodeHeader(node) {
  $('#nodeTitle').textContent = productName(node);
  $('#nodeSubtitle').textContent =
    `Node ${node.node}` +
    (node.type ? ` · type ${node.type}` : '') +
    (node.version && node.version !== 'N/A' ? ` · firmware ${node.version}` : '') +
    (node.productVersion ? ` · productcode ${node.productVersion}` : '');
}

function buildInfoHeading(text) {
  const h = document.createElement('h4');
  h.textContent = text;
  return h;
}

function buildNodeInfoCard(node, infoLines) {
  const card = document.createElement('div');
  card.className = 'card wide';

  // De box antwoordt in het Engels; de tabelvelden vullen we in het Nederlands
  // aan. Zonder gemeenschappelijke noemer zou alles er dubbel in komen.
  const TRANSLATE = {
    node: 'Node',
    type: 'Type',
    component: 'Component',
    address: 'Adres',
    network: 'Netwerk',
    status: 'Status',
    state: 'Bedrijfstoestand',
    software: 'Firmware',
    serial: 'Serienummer',
    target: 'Doelwaarde',
    current: 'Huidige waarde',
    temperature: 'Temperatuur',
    rh: 'Relatieve vochtigheid',
    'comm errors': 'Communicatiefouten',
  };

  const kvs = [];
  const seen = new Set();
  const add = (key, value) => {
    if (value === undefined || value === null || value === '' || value === '-') return;
    if (failed(value)) return;   // 'Failed' is geen waarde
    const label = TRANSLATE[String(key).trim().toLowerCase()] || key;
    if (seen.has(label)) return;
    seen.add(label);

    // Codes als 'auto' en 'rf' zijn voor de installateur pas leesbaar als er
    // een woord van gemaakt wordt, ongeacht wie het veld aanleverde.
    let text = String(value);
    if (label === 'Bedrijfstoestand') text = STATE_LABEL[text] || text;
    if (label === 'Netwerk') text = NETWORK_LABEL[text] || text;

    kvs.push({ key: label, value: text });
  };

  // Een node die niet reageert antwoordt met 'Failed' op elk veld — en die
  // regels dragen geen dubbele punt, dus de key/value-parser ziet ze niet.
  // Daarom tellen we ze in de ruwe uitvoer.
  const failed = (v) => /^failed$/i.test(String(v).trim());
  const unreachable = infoLines.filter((l) => /\bfailed\b/i.test(l)).length >= 2;

  for (const { key, value } of parseKeyValues(infoLines)) {
    if (!failed(value)) add(key, value);
  }

  add('Netwerk', NETWORK_LABEL[node.netw] || node.netw);
  add('Adres', node.addr);
  add('Bovenliggende node', node.prnt);
  add('Associatie', node.asso);
  add('Bedrijfstoestand', STATE_LABEL[node.stat] || node.stat);
  add('Firmware', node.version);
  add('Serienummer', node.serial);
  add('Communicatiefouten', node.cerr);
  add('Foutcode', nodeErrorCode(node));

  if (unreachable) {
    const warn = document.createElement('p');
    warn.className = 'banner-inline';
    warn.textContent =
      `Node ${node.node} beantwoordt 'nodeinfo' niet. De gegevens hieronder komen ` +
      'uit de netwerktabel van de box; de component zelf reageert niet. ' +
      'Instellingen uitlezen kan soms tóch lukken.';
    card.appendChild(warn);
  }

  if (kvs.length) {
    card.appendChild(renderKvList(kvs));
  } else {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = 'Geen gegevens ontvangen.';
    card.appendChild(p);
  }
  return card;
}

function renderGroupTabs(node, groups) {
  const tabs = $('#groupTabs');
  const body = $('#groupBody');
  tabs.innerHTML = '';
  body.innerHTML = '';

  if (!groups.length) {
    $('#nodeGroupsSection').hidden = true;
    return;
  }
  $('#nodeGroupsSection').hidden = false;

  for (const group of groups) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = group === NODECONFIG ? 'Nodeconfiguratie' : group.label;
    b.dataset.group = group.id;
    b.onclick = () => selectGroup(group, node);
    tabs.appendChild(b);
  }

  // Groepen met een eigen index (Motor) krijgen een keuzeveld ernaast.
  const wrap = document.createElement('label');
  wrap.className = 'inline-field';
  wrap.id = 'groupIndexWrap';
  wrap.hidden = true;
  const span = document.createElement('span');
  span.id = 'groupIndexLabel';
  const input = document.createElement('input');
  input.type = 'number';
  input.id = 'groupIndex';
  input.min = 1;
  input.max = 100;
  input.value = state.groupIndex;
  input.onchange = () => {
    state.groupIndex = Number(input.value) || 1;
    if (state.currentGroup) selectGroup(state.currentGroup, node);
  };
  wrap.append(span, input);
  tabs.appendChild(wrap);
}

async function selectGroup(group, node) {
  state.currentGroup = group;
  state.dirty.clear();

  $$('#groupTabs button').forEach((b) => b.classList.toggle('active', b.dataset.group === group.id));

  const indexWrap = $('#groupIndexWrap');
  if (indexWrap) {
    indexWrap.hidden = !group.needsIndex;
    if (group.needsIndex) $('#groupIndexLabel').textContent = group.indexLabel || 'Index';
  }

  const body = $('#groupBody');
  body.innerHTML = '<p class="empty">Laden…</p>';

  // Nodeconfiguratie is per node; alle andere groepen gelden de box (node 1)
  // en sturen geen nodenummer mee.
  const arg = group.needsNode ? node.node : group.needsIndex ? state.groupIndex : null;

  // De losse parameters komen niet uit één commando maar stuk voor stuk.
  if (group.raw) {
    setBusy(true, `${group.label} laden…`);
    try {
      await loadRawParams(node);
    } catch (err) {
      body.innerHTML = `<p class="empty">${escapeHtml(err.message)}</p>`;
    } finally {
      setBusy(false);
    }
    return;
  }

  setBusy(true, `${group.label} laden…`);
  try {
    const sections = await fetchGroup(group, arg);
    body.innerHTML = '';
    const total = renderGroupInto(body, group, sections, arg);

    if (!total) {
      body.innerHTML =
        '<p class="empty">Geen parameters herkend in het antwoord. Bekijk de console voor de ruwe uitvoer.</p>';
      return;
    }
    body.appendChild(makeSaveBar(() => selectGroup(group, node)));
  } catch (err) {
    body.innerHTML = '';
    if (err instanceof DeviceLockedError) {
      // Geen kale foutmelding: dit is op te lossen, en de knop staat vlak
      // boven deze tekst op dezelfde pagina.
      const p = document.createElement('p');
      p.className = 'empty';
      p.textContent =
        'De box houdt deze groep vergrendeld. Zet hierboven de installateursmodus ' +
        'aan en probeer het opnieuw. Vergeet niet hem daarna weer uit te zetten.';
      body.appendChild(p);
    } else {
      body.innerHTML = `<p class="empty">${escapeHtml(err.message)}</p>`;
    }
    appendLog({ dir: 'err', text: `${group.get}: ${err.message}` });
  } finally {
    setBusy(false);
  }
}

/* --------------------------------------------------- installateursmodus */

/**
 * In installateursmodus laat de box nieuwe componenten toe en kun je ze weer
 * afmelden. `CommInfo` meldt de stand terug in het veld `install state`;
 * de waarde 2 betekent dat de modus aan staat.
 */
async function readInstallerState() {
  if (!duco.supports('CommInfo')) return null;
  try {
    const lines = await duco.sendCommandWithResponse('CommInfo', { timeoutSec: 5 });
    return {
      state: findLabelledInt(lines, 'install state'),
      inAssociation: findLabelledInt(lines, 'module in asso'),
      inParent: findLabelledInt(lines, 'module in parent'),
      toReplace: findLabelledInt(lines, 'module to replace'),
    };
  } catch (err) {
    appendLog({ dir: 'err', text: `CommInfo: ${err.message}` });
    return null;
  }
}

const INSTALLER_ACTIVE = 2;

async function buildInstallerSection(node) {
  const section = $('#installerSection');
  const body = $('#installerBody');

  // Alleen de box kent deze modus, en alleen als het toestel hem aanbiedt.
  if (!isBox(node) || !duco.supports('InstallerSet')) {
    section.hidden = true;
    return;
  }
  section.hidden = false;
  body.innerHTML = '<p class="empty">Status opvragen…</p>';

  const info = await readInstallerState();
  const active = !!info && info.state === INSTALLER_ACTIVE;
  const known = !!info && info.state !== null;

  body.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card wide';

  const p = document.createElement('p');
  p.style.cssText = 'font-size:13px;color:var(--ink-2);margin:0 0 12px';
  p.textContent =
    'Zolang de box in installateursmodus staat, kun je componenten aanmelden en ' +
    'afmelden. Zet de modus daarna weer uit — de box hoort er niet in te blijven staan.';
  card.appendChild(p);

  const kvs = [
    { key: 'Status', value: known ? (active ? 'Actief' : 'Uit') : 'Onbekend' },
  ];
  if (info) {
    if (info.state !== null) kvs.push({ key: 'install state', value: String(info.state) });
    if (info.inAssociation !== null) kvs.push({ key: 'Module in associatie', value: String(info.inAssociation) });
    if (info.inParent !== null) kvs.push({ key: 'Module in parent', value: String(info.inParent) });
    if (info.toReplace !== null) kvs.push({ key: 'Module te vervangen', value: String(info.toReplace) });
  }
  card.appendChild(renderKvList(kvs));

  if (!known) {
    const warn = document.createElement('p');
    warn.style.cssText = 'font-size:12.5px;color:var(--ink-3);margin:10px 0 0';
    warn.textContent = duco.supports('CommInfo')
      ? 'De box gaf geen leesbare stand terug; schakelen kan wel.'
      : "Dit toestel kent 'CommInfo' niet, dus de stand is niet uit te lezen.";
    card.appendChild(warn);
  }

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;margin-top:14px;flex-wrap:wrap';

  const toggle = document.createElement('button');
  toggle.className = 'btn small' + (active ? ' danger' : ' primary');
  toggle.textContent = active ? 'Installateursmodus uitschakelen' : 'Installateursmodus inschakelen';
  toggle.onclick = () => setInstallerMode(!active, node);

  const refresh = document.createElement('button');
  refresh.className = 'btn small';
  refresh.textContent = 'Status vernieuwen';
  refresh.onclick = () => buildInstallerSection(node);

  row.append(toggle, refresh);
  card.appendChild(row);
  body.appendChild(card);

  return { known, active };
}

async function setInstallerMode(on, node) {
  const ok = await confirmAction(
    on ? 'Installateursmodus inschakelen?' : 'Installateursmodus uitschakelen?',
    on
      ? 'De box laat dan nieuwe componenten toe en staat afmelden toe.\n' +
        'Zet hem daarna weer uit.\n\nCommando: InstallerSet 1'
      : 'De box gaat terug naar normaal bedrijf.\n\nCommando: InstallerSet 0'
  );
  if (!ok) return;

  setBusy(true, on ? 'Modus inschakelen…' : 'Modus uitschakelen…');
  try {
    const done = await duco.sendCommand(`InstallerSet ${on ? 1 : 0}`, {
      checkDone: true,
      trials: 3,
      timeoutSec: 5,
    });
    if (!done) toast('Toestel meldde failed', 'err');
    // De box heeft even nodig voordat de nieuwe stand terugleest; de originele
    // driver wacht hier ook twee seconden.
    await new Promise((r) => setTimeout(r, 2000));
  } catch (err) {
    appendLog({ dir: 'err', text: err.message });
    toast(err.message, 'err');
  } finally {
    setBusy(false);
  }

  // De sectie leest de stand zelf opnieuw; die uitkomst is meteen de melding.
  const after = await buildInstallerSection(node);
  if (after && after.known) {
    toast(after.active ? 'Installateursmodus actief' : 'Installateursmodus uit', 'ok');
  }
}

/* ------------------------------------------------------- plaats in de boom */

/**
 * `NodeSetParent` en `NodeSetAsso` bepalen waar een component in het netwerk
 * hangt: onder welke node hij zit, en met welke node hij is geassocieerd.
 *
 * Beide vereisen dat de box in installateursmodus staat. Op de lijn is te zien
 * dat ze steevast in `InstallerSet 1` … `InstallerSet 0` worden gewikkeld, met
 * een wachttijd ertussen omdat de box de modus niet onmiddellijk aanneemt, en
 * afgesloten met `NodeSaveData` — zonder dat overleeft de wijziging geen
 * herstart. Die hele volgorde zit in `runTopologyCommand`.
 */
function buildTopologySection(node) {
  const section = $('#topologySection');
  const body = $('#topologyBody');

  const canParent = duco.supports('NodeSetParent');
  const canAsso = duco.supports('NodeSetAsso');

  // De box hangt nergens onder; voor node 1 heeft dit geen betekenis.
  if (isBox(node) || (!canParent && !canAsso)) {
    section.hidden = true;
    return;
  }
  section.hidden = false;
  body.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card wide';

  const intro = document.createElement('p');
  intro.style.cssText = 'font-size:13px;color:var(--ink-2);margin:0 0 12px';
  intro.textContent =
    'Hiermee verplaats je deze component in het netwerk. De box gaat daarvoor ' +
    'kort in installateursmodus en slaat de wijziging daarna op.';
  card.appendChild(intro);

  const rows = document.createElement('div');
  rows.className = 'topology-rows';

  if (canParent) {
    rows.appendChild(
      buildTopologyRow({
        node,
        label: 'Bovenliggende node',
        hint: 'Onder welke component deze hangt.',
        current: node.prnt,
        command: 'NodeSetParent',
      })
    );
  }
  if (canAsso) {
    rows.appendChild(
      buildTopologyRow({
        node,
        label: 'Associatie',
        hint: 'Met welke component deze samenwerkt.',
        current: node.asso,
        command: 'NodeSetAsso',
      })
    );
  }

  card.appendChild(rows);
  body.appendChild(card);
}

function buildTopologyRow({ node, label, hint, current, command }) {
  const row = document.createElement('div');
  row.className = 'topology-row';

  const text = document.createElement('div');
  const b = document.createElement('b');
  b.textContent = label;
  const small = document.createElement('small');
  small.textContent = hint;
  text.append(b, small);

  const controls = document.createElement('div');
  controls.className = 'topology-controls';

  const select = document.createElement('select');
  select.className = 'select';

  // Een component kan niet aan zichzelf hangen; de rest van de installatie is
  // wel een geldige keuze, plus 0 om de koppeling los te maken.
  const none = document.createElement('option');
  none.value = '0';
  none.textContent = '0 — geen';
  select.appendChild(none);

  for (const other of state.nodes) {
    if (other.node === node.node) continue;
    const opt = document.createElement('option');
    opt.value = String(other.node);
    opt.textContent = `${other.node} — ${productName(other)}`;
    select.appendChild(opt);
  }
  select.value = String(Number(current) || 0);

  const btn = document.createElement('button');
  btn.className = 'btn small';
  btn.textContent = 'Toepassen';
  btn.onclick = () => {
    const target = Number(select.value);
    if (target === (Number(current) || 0)) {
      toast('Dat is de huidige waarde al', 'err');
      return;
    }
    runTopologyCommand({ node, command, target, label });
  };

  controls.append(select, btn);
  row.append(text, controls);
  return row;
}

async function runTopologyCommand({ node, command, target, label }) {
  const ok = await confirmAction(
    `${label} wijzigen?`,
    `${productName(node)} (node ${node.node}) krijgt ${label.toLowerCase()} ${target}.\n\n` +
      'De box gaat hiervoor kort in installateursmodus.\n\n' +
      `Commando: ${command} ${node.node} ${target}`
  );
  if (!ok) return;

  setBusy(true, `${label} wijzigen…`);
  let changed = false;
  try {
    // Installateursmodus aan, en de box even de tijd geven.
    await duco.sendCommand('InstallerSet 1', { checkDone: true, trials: 3, timeoutSec: 5 });
    await new Promise((r) => setTimeout(r, 2000));

    changed = await duco.sendCommand(`${command} ${node.node} ${target}`, {
      checkDone: true,
      trials: 3,
      timeoutSec: 5,
    });
    await new Promise((r) => setTimeout(r, 1000));
  } catch (err) {
    appendLog({ dir: 'err', text: `${command}: ${err.message}` });
    toast(err.message, 'err');
  } finally {
    // De modus hoort altijd weer uit te gaan, ook als het misging.
    try {
      await duco.sendCommand('InstallerSet 0', { checkDone: true, trials: 3, timeoutSec: 5 });
    } catch (err) {
      appendLog({ dir: 'err', text: `InstallerSet 0: ${err.message}` });
      toast('Let op: de installateursmodus staat mogelijk nog aan', 'err');
    }

    if (changed && duco.supports('NodeSaveData')) {
      try {
        await duco.sendCommand(`NodeSaveData ${node.node}`, { checkDone: true, trials: 3 });
      } catch (err) {
        appendLog({ dir: 'err', text: `NodeSaveData ${node.node}: ${err.message}` });
        toast('Gewijzigd, maar opslaan in flash mislukte', 'err');
      }
    }
    setBusy(false);
  }

  toast(changed ? `${label} gewijzigd` : 'Toestel meldde failed', changed ? 'ok' : 'err');

  // De netwerkstructuur is veranderd: de boom opnieuw ophalen.
  if (changed) {
    await loadNodes();
    await showNode(node.node, { keepGroup: true });
  }
}

function buildNodeActions(node) {
  const box = $('#nodeActions');
  box.innerHTML = '';

  const available = NODE_ACTIONS.filter((a) => duco.supports(a.cmd(node.node)));
  if (!available.length) {
    $('#nodeActionsSection').hidden = true;
    return;
  }
  $('#nodeActionsSection').hidden = false;

  for (const act of available) {
    const card = document.createElement('div');
    card.className = 'card';

    const h = document.createElement('h3');
    h.textContent = act.label;

    const p = document.createElement('p');
    p.style.cssText = 'font-size:13px;color:var(--ink-2);margin:0 0 10px';
    p.textContent = act.hint;

    const btn = document.createElement('button');
    btn.className = 'btn small' + (act.danger ? ' danger' : '');
    btn.textContent = act.label;
    btn.onclick = () => runNodeAction(act, node);

    card.append(h, p, btn);
    box.appendChild(card);
  }
}

async function runNodeAction(act, node) {
  const cmd = act.cmd(node.node);
  const ok = await confirmAction(
    `${act.label} — ${productName(node)}`,
    `${act.hint}\n\nCommando: ${cmd}`
  );
  if (!ok) return;

  setBusy(true, act.label + '…');
  try {
    if (act.checkDone) {
      const res = await duco.sendCommand(cmd, { checkDone: true, trials: 3, timeoutSec: 5 });
      toast(res ? 'Uitgevoerd' : 'Toestel meldde failed', res ? 'ok' : 'err');
    } else {
      const lines = await duco.sendCommandWithResponse(cmd, { timeoutSec: 5 });
      toast(lines.length ? lines.join(' ').slice(0, 80) : 'Verstuurd', 'ok');
    }
  } catch (err) {
    appendLog({ dir: 'err', text: err.message });
    toast(err.message, 'err');
  } finally {
    setBusy(false);
  }

  if (act.danger) await showNode(node.node);
}

/* -------------------------------------------------------------- dashboard */

async function loadDashboard() {
  if (!state.connected) return;
  const body = $('#dashboardBody');
  body.innerHTML = '<p class="empty">Laden…</p>';

  const picks = ['swversion', 'boardinfo', 'network_info', 'fanctrlinfo', 'temperatureinfo', 'filterinfo'];
  const cards = [];

  setBusy(true, 'Dashboard laden…');
  for (const cmd of picks) {
    if (!duco.supports(cmd)) continue;
    try {
      const lines = await duco.sendCommandWithResponse(cmd, { timeoutSec: 4 });
      if (!lines.length) continue;
      const meta = INFO_COMMANDS.find((c) => c.cmd.toLowerCase() === cmd.toLowerCase());
      cards.push(renderInfoCard(meta?.label || cmd, lines));
    } catch (err) {
      appendLog({ dir: 'err', text: `${cmd}: ${err.message}` });
    }
  }
  setBusy(false);

  body.innerHTML = '';
  if (!cards.length) {
    body.innerHTML = '<p class="empty">Geen gegevens ontvangen.</p>';
    return;
  }
  cards.forEach((c) => body.appendChild(c));
}

function renderInfoCard(title, lines) {
  const card = document.createElement('div');
  card.className = 'card';

  const kvs = parseKeyValues(lines);
  const h = document.createElement('h3');
  h.textContent = title;
  card.appendChild(h);

  if (kvs.length >= 2) {
    card.appendChild(renderKvList(kvs));
  } else {
    const pre = document.createElement('pre');
    pre.style.cssText = 'margin:0;font-size:12px;white-space:pre-wrap;font-family:var(--mono)';
    pre.textContent = lines.join('\n');
    card.appendChild(pre);
  }
  return card;
}

function renderKvList(kvs) {
  const dl = document.createElement('dl');
  dl.className = 'kv';
  for (const { key, value } of kvs) {
    const dt = document.createElement('dt');
    dt.textContent = key;
    const dd = document.createElement('dd');
    dd.textContent = value;
    dl.append(dt, dd);
  }
  return dl;
}

/* ---------------------------------------------------------------- netwerk */

async function loadNetwork() {
  const body = $('#networkBody');
  body.innerHTML = '<p class="empty">Laden…</p>';
  body.dataset.loaded = '1';

  const blocks = [];
  setBusy(true, 'Netwerk uitlezen…');
  for (const t of TABLE_COMMANDS) {
    if (!duco.supports(t.cmd)) continue;
    try {
      const lines = await duco.sendCommandWithResponse(t.cmd, {
        timeoutSec: t.timeoutSec,
        endTrigger: t.endTrigger,
      });
      const { columns, rows } = parsePipeTable(lines, { headerHints: t.headerHints });
      if (rows.length) blocks.push({ label: t.label, columns, rows });
      else appendLog({ dir: 'sys', text: `${t.cmd}: geen rijen herkend` });
    } catch (err) {
      appendLog({ dir: 'err', text: `${t.cmd}: ${err.message}` });
    }
  }
  setBusy(false);

  body.innerHTML = '';
  if (!blocks.length) {
    body.innerHTML = '<p class="empty">Geen netwerkgegevens ontvangen.</p>';
    return;
  }

  for (const b of blocks) {
    const h = document.createElement('h3');
    h.style.cssText = 'font-size:13px;color:var(--ink-2);margin:18px 0 8px';
    h.textContent = b.label;
    body.appendChild(h);

    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const htr = document.createElement('tr');
    b.columns.forEach((c) => {
      const th = document.createElement('th');
      th.textContent = c;
      htr.appendChild(th);
    });
    thead.appendChild(htr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    b.rows.forEach((r) => {
      const tr = document.createElement('tr');
      b.columns.forEach((c) => {
        const td = document.createElement('td');
        td.className = 'mono';
        td.textContent = r[c] ?? '';
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    wrap.appendChild(table);
    body.appendChild(wrap);
  }
}

/* ------------------------------------------------------------- parameters */

/** Haalt een groep op en splitst hem in secties. */
/** De box weigert sommige groepen zolang hij niet in installateursmodus staat. */
class DeviceLockedError extends Error {}

async function fetchGroup(group, arg) {
  const cmd = group.get + (arg !== undefined && arg !== null ? ` ${arg}` : '');
  const lines = await duco.sendCommandWithResponse(cmd, { timeoutSec: 5 });

  if (lines.some((l) => /device\s+locked/i.test(l))) {
    throw new DeviceLockedError('Deze groep is vergrendeld door de box.');
  }

  const err = responseError(lines);
  if (err && !lines.some((l) => l.includes(':'))) throw new Error(err);

  return group.sectioned ? splitSections(lines) : [{ title: null, readonly: false, lines }];
}

function dirtyKey(group, node, sec, row) {
  return `${group.id}|${node ?? ''}|${sec.title || ''}|${row.id}`;
}

/** `IoParaGet` levert secties uit verschillende instellingsgroepen tegelijk. */
const SECTION_SETTING_TYPE = {
  'ethernet para': 'TcpIpPara',
  'picotcp para': 'TcpIpPara',
  'ethernet info': 'TcpIpInfo',
  'picotcp info': 'TcpIpInfo',
  'board info': 'BoardInfo',
};

/**
 * Zoekt bij de korte naam die de box geeft ('automin') de omschrijving en het
 * keuzemenu die de originele Windows-applicatie erbij toonde.
 */
function paramMeta(group, sec, row) {
  const entries = DEVICE_NAMES[String(row.name || '').trim().toLowerCase()];
  if (!entries || !entries.length) return null;

  let pick = entries[0];
  if (entries.length > 1) {
    // Een handvol namen komt in meerdere groepen voor ('co2 setpoint',
    // 'start time'). Het SettingType van de groep wijst de juiste aan.
    const wanted = SECTION_SETTING_TYPE[String(sec.title || '').toLowerCase()] || group.settingType;
    const match = wanted && entries.find((e) => e.settingType === wanted);
    if (match) pick = match;
  }
  return SETTINGS[pick.setting] || null;
}

/** Rendert alle secties van een groep in `container`; geeft het aantal rijen. */
function renderGroupInto(container, group, sections, node) {
  let total = 0;
  for (const sec of sections) {
    const rows = parseParaList(sec.lines);
    if (!rows.length) continue;
    total += rows.length;
    container.appendChild(renderParamSection(group, sec, rows, node));
  }
  return total;
}

function renderParamSection(group, sec, rows, node) {
  const wrap = document.createElement('div');
  wrap.className = 'param-section';

  if (sec.title) {
    const h = document.createElement('h3');
    const mode = sec.readonly ? ' — alleen lezen' : sec.writeOnly ? ' — alleen schrijven' : '';
    h.textContent = sec.title + mode;
    wrap.appendChild(h);
  }

  if (sec.writeOnly) {
    const note = document.createElement('p');
    note.className = 'hint';
    note.style.margin = '0 0 8px';
    note.textContent = 'Deze module geeft geen waarde terug; je kunt hem alleen instellen.';
    wrap.appendChild(note);
  }

  const list = document.createElement('div');
  list.className = 'param-list';

  for (const row of rows) {
    const meta = paramMeta(group, sec, row);
    const options = meta && meta.options;

    // Sommige parameters komen als kaal woord binnen: "BYPASS MODE : AUTO".
    // Staat dat woord in de keuzelijst, dan weten we welk getal erbij hoort en
    // is het veld gewoon te bewerken. Duco kort af ('AUTO' voor 'Automatic'),
    // dus een beginmatch telt ook.
    if (options && typeof row.value === 'string' && row.min !== null) {
      const want = row.value.trim().toLowerCase();
      const hit = options.find((o) => {
        const label = String(o.label).toLowerCase();
        return label === want || (want.length >= 2 && (label.startsWith(want) || want.startsWith(label)));
      });
      if (hit) {
        row.label = row.value;
        row.value = hit.value;
        row.writable = true;
      }
    }

    const el = document.createElement('div');
    el.className = 'param';
    if (meta && meta.help) el.title = meta.help;

    const name = document.createElement('div');
    name.className = 'param-name';
    const b = document.createElement('b');
    b.textContent = (meta && meta.label) || row.name;
    const small = document.createElement('small');
    // Toont de naam die de box zelf gebruikt zodra we hem hebben hernoemd,
    // zodat je die in de console kunt terugvinden.
    const bits = [`#${row.id}`];
    if (meta && meta.label && meta.label.toLowerCase() !== row.name.toLowerCase()) {
      bits.push(row.name);
    }
    if (!options && row.min !== null) {
      bits.push(`${row.min}…${row.max}${row.step > 1 ? ` stap ${row.step}` : ''}`);
    }
    small.textContent = bits.join(' · ');
    name.append(b, small);

    const edit = document.createElement('div');
    edit.className = 'param-edit';

    // Een write-only module levert geen waarde, maar is wel instelbaar zolang
    // het bereik bekend is.
    const writable =
      !!group.set && !sec.readonly && (row.writable || (sec.writeOnly && row.min !== null));
    const key = dirtyKey(group, node, sec, row);
    const markDirty = (field, value) => {
      const changed = value !== String(row.value ?? '');
      field.classList.toggle('dirty', changed);
      if (changed) state.dirty.set(key, { group, node, sec, row, value, meta });
      else state.dirty.delete(key);
      updateSaveBars();
    };

    let field;
    if (options) {
      // Bekende keuzelijst: een getal zegt niets, de omschrijving wel.
      field = document.createElement('select');
      for (const opt of options) {
        const o = document.createElement('option');
        o.value = String(opt.value);
        o.textContent = opt.label;
        field.appendChild(o);
      }
      // Meldt de box een waarde die niet in de lijst staat, dan tonen we die
      // als eigen optie in plaats van hem stilletjes te veranderen.
      if (!options.some((o) => String(o.value) === String(row.value))) {
        const o = document.createElement('option');
        o.value = String(row.value ?? '');
        o.textContent = `Onbekende waarde ${row.value}`;
        field.appendChild(o);
      }
      field.value = String(row.value ?? '');
      field.disabled = !writable;
      field.addEventListener('change', () => markDirty(field, field.value));
    } else {
      field = document.createElement('input');
      field.type = typeof row.value === 'number' ? 'number' : 'text';
      field.value = row.value ?? '';
      field.disabled = !writable;
      if (row.min !== null) {
        field.min = row.min;
        field.max = row.max;
        field.step = row.step || 1;
      }
      field.addEventListener('input', () => markDirty(field, field.value));
    }

    edit.appendChild(field);

    if (row.unit) {
      const u = document.createElement('span');
      u.className = 'unit';
      u.textContent = row.unit;
      edit.appendChild(u);
    } else if (!writable) {
      const ro = document.createElement('span');
      ro.className = 'ro';
      ro.textContent = 'read-only';
      edit.appendChild(ro);
    }

    el.append(name, edit);
    list.appendChild(el);
  }

  wrap.appendChild(list);
  return wrap;
}

/** Eén balk per scherm; `onReload` herlaadt na een geslaagde schrijfronde. */
function makeSaveBar(onReload) {
  const bar = document.createElement('div');
  bar.className = 'save-bar';
  bar.dataset.saveBar = '1';
  bar.hidden = true;

  const span = document.createElement('span');
  span.dataset.saveText = '1';

  const btns = document.createElement('div');
  btns.style.cssText = 'display:flex;gap:8px';

  const cancel = document.createElement('button');
  cancel.className = 'btn small';
  cancel.textContent = 'Ongedaan maken';
  cancel.onclick = onReload;

  const save = document.createElement('button');
  save.className = 'btn small primary';
  save.textContent = 'Wegschrijven';
  save.onclick = () => writeDirty(onReload);

  btns.append(cancel, save);
  bar.append(span, btns);
  return bar;
}

function updateSaveBars() {
  const n = state.dirty.size;
  $$('[data-save-bar]').forEach((bar) => {
    bar.hidden = n === 0;
    const t = bar.querySelector('[data-save-text]');
    if (t) t.textContent = `${n} wijziging${n === 1 ? '' : 'en'} nog niet weggeschreven`;
  });
}

/**
 * Schrijft de gewijzigde parameters weg. Na elke set hoort een NodeSaveData —
 * zonder dat overleeft een wijziging geen herstart — dus dat doen we hier ook,
 * één keer per node aan het eind in plaats van na elke afzonderlijke.
 */
async function writeDirty(onReload) {
  const changes = Array.from(state.dirty.values());
  if (!changes.length) return;

  // In de bevestiging horen dezelfde woorden te staan als in het scherm —
  // een kaal getal is bij een keuzelijst niet te controleren.
  const summary = changes
    .map((c) => {
      const label = (c.meta && c.meta.label) || c.row.name;
      const show = (v) => {
        const opt = c.meta && c.meta.options && c.meta.options.find((o) => String(o.value) === String(v));
        return opt ? `${opt.label} (${v})` : v;
      };
      return `${label}: ${show(c.row.value)} → ${show(c.value)}`;
    })
    .join('\n');

  const ok = await confirmAction(
    `${changes.length} parameter${changes.length === 1 ? '' : 's'} wegschrijven?`,
    summary
  );
  if (!ok) return;

  let written = 0;
  let failed = 0;
  const touchedNodes = new Set();

  setBusy(true, 'Wegschrijven…');
  for (const c of changes) {
    const needsArg = c.group.needsNode || c.group.needsIndex;
    // Gesectioneerde groepen adresseren per module: `IoParaSet <module> <para>
    // <waarde>`. Het modulenummer staat in de kopregel van de sectie; zonder
    // dat antwoordt de box met 'Incorrect Cmd Arguments'.
    const arg = c.sec && c.sec.module !== null && c.sec.module !== undefined
      ? `${c.sec.module} `
      : needsArg && c.node !== null && c.node !== undefined
        ? `${c.node} `
        : '';
    const cmd = `${c.group.set} ${arg}${c.row.id} ${c.value}`;
    try {
      const done = await duco.sendCommand(cmd, { checkDone: true, trials: 5, timeoutSec: 3 });
      if (done) {
        written++;
        // Alleen de nodeconfiguratie hangt aan een node; een index zoals bij
        // Motor is geen nodenummer, dus die opslag gaat naar de box.
        touchedNodes.add(c.group.needsNode && c.node ? c.node : 1);
      } else {
        failed++;
        appendLog({ dir: 'err', text: `${cmd}: toestel meldde failed` });
      }
    } catch (err) {
      failed++;
      appendLog({ dir: 'err', text: `${cmd}: ${err.message}` });
    }
  }

  // Persistent maken; anders staat de oude waarde er na een herstart weer.
  if (written && duco.supports('NodeSaveData')) {
    for (const node of touchedNodes) {
      try {
        await duco.sendCommand(`NodeSaveData ${node}`, { checkDone: true, trials: 3 });
        appendLog({ dir: 'sys', text: `Instellingen node ${node} opgeslagen in flash` });
      } catch (err) {
        appendLog({ dir: 'err', text: `Opslaan node ${node} mislukt: ${err.message}` });
        toast('Geschreven, maar opslaan in flash mislukte', 'err');
      }
    }
  }
  setBusy(false);

  if (failed) toast(`${written} geschreven, ${failed} mislukt`, 'err');
  else toast(`${written} parameter${written === 1 ? '' : 's'} weggeschreven`, 'ok');

  state.dirty.clear();
  if (onReload) await onReload();
}

/* -------------------------------------------------------------- informatie */

async function loadInfo() {
  const body = $('#infoBody');
  body.innerHTML = '<p class="empty">Laden…</p>';

  const cards = [];
  setBusy(true, 'Informatie ophalen…');
  for (const info of INFO_COMMANDS) {
    if (info.needsNode) continue;               // node-specifiek: staat bij de component
    if (!duco.supports(info.cmd)) continue;
    try {
      const lines = await duco.sendCommandWithResponse(info.cmd, {
        timeoutSec: info.timeoutSec || 4,
      });
      if (lines.length) cards.push(renderInfoCard(info.label, lines));
    } catch (err) {
      appendLog({ dir: 'err', text: `${info.cmd}: ${err.message}` });
    }
  }
  setBusy(false);

  body.innerHTML = '';
  if (!cards.length) body.innerHTML = '<p class="empty">Geen gegevens ontvangen.</p>';
  cards.forEach((c) => body.appendChild(c));
}

/* --------------------------------------------------------------- onderhoud */

function buildActions() {
  const body = $('#actionsBody');
  body.innerHTML = '';

  for (const act of ACTIONS) {
    const cmd = act.cmd || '';
    if (cmd && !duco.supports(cmd)) continue;
    if (act.dynamic === 'rtcSet' && !duco.supports('RtcSetTime')) continue;

    const card = document.createElement('div');
    card.className = 'card';

    const h = document.createElement('h3');
    h.textContent = act.label;

    const p = document.createElement('p');
    p.style.cssText = 'font-size:13px;color:var(--ink-2);margin:0 0 10px';
    p.textContent = act.hint;

    const btn = document.createElement('button');
    btn.className = 'btn small' + (cmd && isDangerous(cmd) ? ' danger' : '');
    btn.textContent = act.label;
    btn.onclick = () => runAction(act);

    card.append(h, p, btn);
    body.appendChild(card);
  }
}

async function runAction(act) {
  let cmd = act.cmd;

  if (act.dynamic === 'rtcSet') {
    const d = new Date();
    const p = (n) => String(n).padStart(2, '0');
    cmd = `RtcSetTime ${d.getFullYear()} ${p(d.getMonth() + 1)} ${p(d.getDate())} ${p(d.getHours())} ${p(d.getMinutes())} ${p(d.getSeconds())}`;
  }

  const danger = isDangerous(cmd);
  const ok = await confirmAction(act.label, `${act.hint}\n\nCommando: ${cmd}`);
  if (!ok) return;

  setBusy(true, act.label + '…');
  try {
    if (act.checkDone) {
      const res = await duco.sendCommand(cmd, { checkDone: true, trials: 3, timeoutSec: 5 });
      toast(res ? 'Uitgevoerd' : 'Toestel meldde failed', res ? 'ok' : 'err');
    } else {
      const lines = await duco.sendCommandWithResponse(cmd, { timeoutSec: 5 });
      toast(lines.length ? lines.join(' ').slice(0, 80) : 'Verstuurd', 'ok');
    }
  } catch (err) {
    appendLog({ dir: 'err', text: err.message });
    toast(err.message, 'err');
  } finally {
    setBusy(false);
  }

  if (danger) {
    state.dirty.clear();
    $('#networkBody').dataset.loaded = '';
    await loadNodes();
  }
}

/* ----------------------------------------------------------------- console */

async function runConsole(raw) {
  const cmd = raw.trim();
  if (!cmd || !state.connected) return;

  state.history.push(cmd);
  state.historyIdx = state.history.length;

  if (isDangerous(cmd)) {
    const ok = await confirmAction(
      'Ingrijpend commando',
      `'${cmd}' wijzigt of wist blijvend gegevens op de box. Doorgaan?`
    );
    if (!ok) return;
  }

  setBusy(true, 'Uitvoeren…');
  try {
    await duco.sendCommandWithResponse(cmd, { timeoutSec: 6 });
  } catch (err) {
    appendLog({ dir: 'err', text: err.message });
  } finally {
    setBusy(false);
  }
}

function renderSuggestions(filter) {
  const box = $('#cmdSuggest');
  if (!duco.possibleCommands.length) {
    box.hidden = true;
    return;
  }
  const f = filter.trim().toLowerCase();
  const matches = duco.possibleCommands.filter((c) => !f || c.toLowerCase().startsWith(f)).slice(0, 24);

  box.innerHTML = '';
  matches.forEach((c) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = c;
    b.onclick = () => {
      $('#consoleCmd').value = c + ' ';
      $('#consoleCmd').focus();
      renderSuggestions(c);
    };
    box.appendChild(b);
  });
  box.hidden = matches.length === 0;
}

const pad2 = (n) => String(n).padStart(2, '0');

/** `2026-09-16 14:30:12.345` — lokale tijd, want daar kijk je naar terug. */
function stamp(d) {
  return (
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ` +
    `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}.` +
    String(d.getMilliseconds()).padStart(3, '0')
  );
}

/**
 * Schrijft het logboek weg als tekstbestand.
 *
 * Elke regel krijgt zijn eigen datum en tijd, ook de losse regels binnen één
 * antwoord van de box. Dat maakt het bestand met een teksteditor doorzoekbaar
 * en laat zien hoe lang de box over een antwoord deed.
 */
function saveLog() {
  const now = new Date();
  const lines = [
    `Ventilation Web Tool — logboek`,
    `Opgeslagen: ${stamp(now)}`,
    `Regels: ${state.logEntries.length}`,
    `Legenda: >> verzonden · << ontvangen · ## bediening · -- melding · !! fout`,
    ''.padEnd(78, '-'),
  ];

  for (const e of state.logEntries) {
    const prefix = LOG_PREFIX[e.dir] || '--';
    const time = stamp(e.at);
    // Een antwoord van de box telt meerdere regels; die krijgen allemaal hun
    // eigen tijdstempel in plaats van samengeklonterd op één regel te staan.
    const parts = String(e.text).split(/\r\n|\r|\n/);
    for (const part of parts) {
      if (part === '' && parts.length > 1) continue;
      lines.push(`${time} ${prefix} ${part}`);
    }
    if ($('#showHex')?.checked && e.bytes?.length) {
      const hex = Array.from(e.bytes).map((b) => b.toString(16).padStart(2, '0')).join(' ');
      lines.push(`${time} .. ${hex}`);
    }
  }

  // De gevraagde naam is "jaar-maand-dag uu:mm log VWT". Een dubbele punt mag
  // niet in een bestandsnaam op Windows, dus die is een punt geworden.
  const name =
    `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())} ` +
    `${pad2(now.getHours())}.${pad2(now.getMinutes())} log VWT.txt`;

  const blob = new Blob([lines.join('\r\n')], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);

  logUi(`Logboek opgeslagen als "${name}"`);
  toast(`Opgeslagen als ${name}`, 'ok');
}

/* -------------------------------------------------------------------- init */

function init() {
  const profileSelect = $('#emuProfile');
  profileSelect.innerHTML = '';
  for (const p of listProfiles()) {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.label;
    profileSelect.appendChild(opt);
  }
  const generic = document.createElement('option');
  generic.value = '';
  generic.textContent = 'Generiek (verzonnen gegevens)';
  profileSelect.appendChild(generic);

  // Zonder Web Serial blijft emulatie bruikbaar — dat is precies waar het
  // vinkje voor bedoeld is, dus de verbindknop mag dan niet dood zijn.
  const syncConnectAvailability = () => {
    const emulate = $('#emulate').checked;
    $('#btnConnect').disabled = !DucoSerial.isSupported && !emulate;
    $('#anyDevice').disabled = emulate;
    profileSelect.hidden = !emulate;
  };

  if (!DucoSerial.isSupported) $('#unsupported').hidden = false;
  $('#emulate').onchange = syncConnectAvailability;
  syncConnectAvailability();

  $('#btnConnect').onclick = connect;
  $('#btnDisconnect').onclick = disconnect;
  $('#btnReloadNodes').onclick = () => state.connected && loadNodes();

  // Vóór alle andere afhandeling: vastleggen waarop geklikt is. In de
  // capture-fase, zodat het ook meegaat als een handler het event tegenhoudt.
  document.addEventListener(
    'click',
    (e) => {
      const el = e.target.closest('button, .nav-item, .nav-node, a[href]');
      if (el && !el.disabled) logUi(describeControl(el));
    },
    true
  );

  // Vinkjes en keuzelijsten zijn net zo goed bediening.
  document.addEventListener(
    'change',
    (e) => {
      const el = e.target;
      if (el.type === 'checkbox') {
        const label = el.closest('label')?.textContent?.trim() || el.id;
        logUi(`Vinkje ${el.checked ? 'aan' : 'uit'}: ${label}`);
      } else if (el.tagName === 'SELECT' && !el.closest('.param')) {
        logUi(`Keuze: ${el.id || 'lijst'} → ${el.selectedOptions[0]?.textContent || el.value}`);
      }
    },
    true
  );

  document.addEventListener('click', (e) => {
    const nodeBtn = e.target.closest('.nav-node');
    if (nodeBtn) {
      showNode(nodeBtn.dataset.node);
      return;
    }

    const nav = e.target.closest('.nav-item');
    if (nav && !nav.disabled) switchView(nav.dataset.view);

    const refresh = e.target.closest('[data-refresh]');
    if (refresh && state.connected) {
      const which = refresh.dataset.refresh;
      if (which === 'dashboard') loadDashboard();
      if (which === 'network') loadNetwork();
      if (which === 'info') loadInfo();
      if (which === 'node' && state.selectedNode !== null) {
        showNode(state.selectedNode, { keepGroup: true });
      }
    }
  });

  $('#consoleForm').onsubmit = (e) => {
    e.preventDefault();
    const input = $('#consoleCmd');
    runConsole(input.value);
    input.value = '';
    renderSuggestions('');
  };

  $('#consoleCmd').addEventListener('input', (e) => renderSuggestions(e.target.value));
  $('#consoleCmd').addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    e.preventDefault();
    if (!state.history.length) return;
    state.historyIdx += e.key === 'ArrowUp' ? -1 : 1;
    state.historyIdx = Math.max(0, Math.min(state.history.length, state.historyIdx));
    e.target.value = state.history[state.historyIdx] || '';
  });

  $('#btnClearLog').onclick = () => {
    state.logEntries = [];
    $('#log').textContent = '';
  };
  $('#btnSaveLog').onclick = saveLog;
  // Ook in de balk, zodat je er niet eerst naar de console voor hoeft.
  $('#btnSaveLogTop').onclick = saveLog;
  $('#showHex').onchange = rerenderLog;

  // Een losgetrokken kabel moet de UI niet in een verbonden staat achterlaten.
  if (DucoSerial.isSupported) {
    navigator.serial.addEventListener('disconnect', () => {
      if (state.connected && !state.emulating) {
        appendLog({ dir: 'err', text: 'Kabel losgekoppeld' });
        toast('Verbinding verbroken', 'err');
        disconnect();
      }
    });
  }

  window.addEventListener('beforeunload', (e) => {
    if (state.dirty.size) {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  setBusy(false);
}

init();
