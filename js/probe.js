/*
 * probe.js — bepaalt welke commando's uit `help /all` veilig uit te lezen zijn.
 *
 * Voor de knop "Functies uitlezen" op de pagina Help mee. Het doel is een zo
 * volledig mogelijk logboek van wat een onbekend type box allemaal teruggeeft,
 * zonder dat er ook maar iets verandert. Daarom werkt dit met een witte lijst:
 * een commando wordt alleen verstuurd als naam én hulptekst zeggen dat het
 * leest, en niets ervan wijst op schrijven, wissen of herstarten. Twijfel
 * betekent overslaan.
 */

import { isDangerous } from './groups.js';

/**
 * Woorden in de naam die op een handeling wijzen. De naam wordt eerst in
 * stukken gehakt (`FanCalibClear` → Fan, Calib, Clear), zodat bijvoorbeeld
 * `SettingsParaGet` niet op "set" struikelt.
 */
const WRITE_NAME_TOKENS = new Set([
  'set', 'clear', 'save', 'reset', 'default', 'defaults', 'start', 'stop', 'next',
  'enable', 'disable', 'add', 'remove', 'trigger', 'load', 'allow', 'emul',
  'mode', 'show', 'input', 'write', 'erase', 'delete', 'restart', 'reboot',
  'format', 'flash', 'gen', 'keys', 'to',
]);

/** Werkwoorden in de hulptekst die op een handeling wijzen. */
const WRITE_HELP =
  /\b(set|sets|clear|save|reset|defaults?|start|stop|next|enable|disable|copy|add|remove|trigger|load|allow|send|emulated|emaulated|write|erase|delete|restart|reboot|format|enter|leave|flash|generate)\b/i;

/** Woorden in de hulptekst die op alleen lezen wijzen. */
const READ_HELP = /\b(get|info|print|table|list|status|version|hwm)\b/i;

/** Commandonamen die op lezen eindigen. */
const READ_NAME = /(info|get|status|list|print|version|hwm)$/i;

/**
 * Commando's waarvan de hulptekst niets zegt, maar waarvan bekend is dat ze
 * alleen iets tonen.
 */
const KNOWN_READ = new Set(['network', 'oshwm']);

/** Splitst een commandonaam in woorden: `BMBReplaceToBmb` → BMB, Replace, To, Bmb. */
function nameTokens(name) {
  return (name.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+/g) || []).map((t) => t.toLowerCase());
}

/** Eindigt een naam in kleine letters op een schrijvend woord? */
const WRITE_NAME_SUFFIX =
  /(set|clear|save|reset|defaults?|start|stop|next|enable|disable|remove|add|trigger|emul|load|mode)$/i;

/**
 * Ontleedt één regel uit `help /all`:
 * `NodeParaGet a b             NODE get para (b) of node (a)`.
 * Naam en argumenten staan links; na minstens twee spaties volgt de uitleg.
 * Ontbreekt die ruimte, dan tellen alleen losse letters en `...` direct na de
 * naam als argument.
 */
export function parseHelpLine(line) {
  const text = String(line || '').trim();
  const gap = text.match(/^(\S+(?:\s\S+)*?)\s{2,}(.*)$/);
  const words = (gap ? gap[1] : text).split(/\s+/);
  const name = words.shift() || '';
  const args = [];
  while (words.length && /^([a-z]|\.\.\.)$/.test(words[0])) args.push(words.shift());
  const desc = (gap ? [...words, gap[2]] : words).join(' ').trim();
  return { name, args, desc, line: text };
}

/**
 * Deelt een commando in als `read`, `write` of `unclear`, met een reden die in
 * het logboek komt. Alleen `read` wordt ooit verstuurd.
 */
export function classify({ name, args, desc }) {
  const low = name.toLowerCase();
  if (!name) return { kind: 'unclear', reason: 'geen naam' };
  if (low === 'help') return { kind: 'skip', reason: 'is de hulp zelf' };
  if (isDangerous(name)) return { kind: 'write', reason: 'staat op de lijst met ingrijpende commando\'s' };

  const mixedCase = /[A-Z]/.test(name) && /[a-z]/.test(name);
  const writeToken = mixedCase
    ? nameTokens(name).find((t) => WRITE_NAME_TOKENS.has(t))
    : (low.match(WRITE_NAME_SUFFIX) || [])[1];
  if (writeToken) return { kind: 'write', reason: `naam bevat "${writeToken}"` };

  const writeWord = desc.match(WRITE_HELP);
  if (writeWord) return { kind: 'write', reason: `hulptekst zegt "${writeWord[1]}"` };

  if (args.includes('...')) return { kind: 'unclear', reason: 'onbekend aantal argumenten' };

  if (KNOWN_READ.has(low) || READ_NAME.test(name) || READ_HELP.test(desc)) {
    return { kind: 'read', reason: '' };
  }
  return { kind: 'unclear', reason: 'hulptekst zegt niet dat het alleen leest' };
}

/**
 * Hoe een leescommando aangeroepen wordt, afhankelijk van zijn argumenten:
 * - `none`        zonder argumenten, één keer;
 * - `perNode`     één argument dat een nodenummer is: voor elke component;
 * - `perNodePara` node en parameternummer: voor elke component elk nummer;
 * - `probe`       één onbekend argument: 0, 1, 2, … tot de box weigert;
 * - `skip`        meer argumenten die we niet kunnen invullen.
 */
export function callStyle({ args, desc }) {
  if (!args.length) return 'none';
  const mentionsNode = /\bnode\b/i.test(desc);
  if (args.length === 1) return mentionsNode ? 'perNode' : 'probe';
  if (args.length === 2 && mentionsNode && /\bpara/i.test(desc)) return 'perNodePara';
  return 'skip';
}

/**
 * Parameternummers uit het antwoord van `NodeParaList`: elke regel die met een
 * getal begint. Het formaat verschilt per box; wat niet op een nummer lijkt,
 * doet niet mee.
 */
export function paraIdsFromList(lines) {
  const ids = new Set();
  for (const l of lines || []) {
    const m = String(l).match(/^\s*(\d{1,4})\s*[.:|\-\s]/);
    if (m) ids.add(parseInt(m[1], 10));
  }
  return [...ids].sort((a, b) => a - b);
}
