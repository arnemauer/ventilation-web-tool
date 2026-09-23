/*
 * serial.js — Web Serial transportlaag voor de DucoBox.
 *
 * Volgt de dialoog zoals die op de lijn is waargenomen. Zie PROTOCOL.md.
 *
 * Het einde van een antwoord wordt herkend aan de prompt die de box stuurt.
 * Stiltedetectie dient alleen als noodrem voor firmware die geen prompt geeft:
 * een echte box laat midden in een antwoord gaten van bijna een seconde vallen,
 * dus stilte alléén is geen betrouwbaar signaal.
 */

const CP210X = { usbVendorId: 0x10c4, usbProductId: 0xea60 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Korte pauze die ook klopt in een tabblad op de achtergrond.
 *
 * Browsers knijpen `setTimeout` in een verborgen tabblad af tot ongeveer één
 * tick per seconde. Voor de pauze tússen bytes is dat funest: een commando van
 * twintig tekens zou dan twintig seconden duren en in een timeout lopen. Voor
 * zulke korte wachttijden draaien we daarom kort door op de klok. Dat kost een
 * paar milliseconden rekentijd per commando en houdt de timing intact.
 */
function shortSleep(ms) {
  const until = performance.now() + ms;
  while (performance.now() < until) {
    /* opzettelijk leeg: het gaat om de verstreken tijd */
  }
}

export class DucoSerial {
  constructor({ onLog } = {}) {
    this.port = null;
    this.onLog = onLog || (() => {});

    this._reader = null;
    this._writer = null;
    this._buf = [];          // binnengekomen bytes, nog niet opgehaald
    this._lastRxAt = 0;      // tijdstip laatste ontvangen chunk
    this.rxBytes = 0;        // totaal ontvangen sinds openen — 0 = doodse lijn
    this._readLoop = null;
    this._stopping = false;
    this._queue = Promise.resolve();

    // Noodrem voor firmware zonder prompt. Ruim bemeten: een echte box laat
    // gaten van bijna een seconde vallen midden in een antwoord.
    this.quietMs = 1500;
    this.interByteMs = 1;    // pauze tussen verzonden bytes (firmware-parser)
    this._promptSeen = false;
    this._rxWaiters = [];
    this.possibleCommands = [];
  }

  get isOpen() {
    return this.port !== null && this.port.readable !== null;
  }

  static get isSupported() {
    return typeof navigator !== 'undefined' && 'serial' in navigator;
  }

  /* ---------------------------------------------------------------- verbinding */

  /**
   * Vraagt de gebruiker een poort te kiezen. Filtert op de CP210x-bridge die in
   * de servicekabel zit; met `anyDevice` tonen we alle seriële poorten (bv. voor
   * een generieke USB-UART-kabel of een Bluetooth-poort).
   */
  async requestPort({ anyDevice = false } = {}) {
    if (!DucoSerial.isSupported) {
      throw new Error(
        'Deze browser ondersteunt de Web Serial API niet. Gebruik Chrome of Edge op desktop.'
      );
    }
    const opts = anyDevice ? {} : { filters: [CP210X] };
    return navigator.serial.requestPort(opts);
  }

  async open(port) {
    if (this.isOpen) await this.close();

    this.port = port;
    await this.port.open({
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      bufferSize: 8192,
      flowControl: 'none',
    });

    this._writer = this.port.writable.getWriter();
    this._startReadLoop();
    this.possibleCommands = [];
    this.rxBytes = 0;
    this.onLog({ dir: 'sys', text: 'Poort geopend op 115200 8N1' });
  }

  async close() {
    this._stopping = true;
    try {
      if (this._reader) {
        await this._reader.cancel().catch(() => {});
      }
      if (this._readLoop) await this._readLoop.catch(() => {});
      if (this._writer) {
        try { this._writer.releaseLock(); } catch { /* al vrij */ }
        this._writer = null;
      }
      if (this.port) await this.port.close().catch(() => {});
    } finally {
      this.port = null;
      this._stopping = false;
      this._buf = [];
      this.possibleCommands = [];
      this.onLog({ dir: 'sys', text: 'Poort gesloten' });
    }
  }

  _startReadLoop() {
    this._stopping = false;
    this._readLoop = (async () => {
      while (this.port && this.port.readable && !this._stopping) {
        this._reader = this.port.readable.getReader();
        try {
          for (;;) {
            const { value, done } = await this._reader.read();
            if (done) break;
            if (value && value.length) {
              for (const b of value) this._buf.push(b);
              this.rxBytes += value.length;
              this._wakeReaders();
              this._lastRxAt = Date.now();
            }
          }
        } catch (err) {
          if (!this._stopping) this.onLog({ dir: 'sys', text: 'Leesfout: ' + err.message });
        } finally {
          try { this._reader.releaseLock(); } catch { /* al vrijgegeven */ }
          this._reader = null;
        }
      }
    })();
  }

  /* ------------------------------------------------------------------ primitief */

  /** Serialiseert alle verkeer: de poort verdraagt geen twee commando's tegelijk. */
  _serialize(fn) {
    const run = this._queue.then(fn, fn);
    this._queue = run.then(() => {}, () => {});
    return run;
  }

  /** Schrijft byte voor byte met pauze — een burst loopt de firmware-parser voorbij. */
  async _writeSlow(text) {
    const bytes = new TextEncoder().encode(text);
    for (const b of bytes) {
      await this._writer.write(new Uint8Array([b]));
      if (this.interByteMs) shortSleep(this.interByteMs);
    }
  }

  /**
   * De box sluit een antwoord af met zijn prompt: een '>' direct achter een
   * regeleinde. Daarop wachten is nauwkeuriger en sneller dan op stilte
   * wachten, maar niet elke firmware stuurt hem — dus valt dit terug op de
   * stiltedetectie zodra er een tijdje niets meer binnenkomt.
   */
  /**
   * Wachten op binnenkomende bytes zonder van een timer af te hangen.
   *
   * De browser knijpt timers in een verborgen tabblad af tot een tick per
   * seconde. Een leeslus die op `setTimeout` pollt wordt daar honderd keer
   * trager van, terwijl de bytes zelf gewoon binnenkomen. Daarom wekt de
   * leeslus de wachters rechtstreeks zodra er iets is.
   */
  _wakeReaders() {
    const waiters = this._rxWaiters;
    this._rxWaiters = [];
    for (const resolve of waiters) resolve();
  }

  _waitForRx(ms) {
    return new Promise((resolve) => {
      this._rxWaiters.push(resolve);
      setTimeout(resolve, ms);   // achtervang als er niets meer komt
    });
  }

  _atPrompt() {
    const n = this._buf.length;
    if (n < 2 || this._buf[n - 1] !== 0x3e) return false; // '>'
    const prev = this._buf[n - 2];
    return prev === 0x0d || prev === 0x0a; // '\r' of '\n'
  }

  /** De box meldt verloren logregels; die uitvoer is niet te vertrouwen. */
  _hasLogDataLost(text) {
    return text.includes('LOG DATA LOST');
  }

  /**
   * Haalt alles op wat binnenkwam, zodra het antwoord compleet is.
   *
   * De prompt is het enige betrouwbare einde. Een echte box stuurt zijn
   * antwoord namelijk in brokken met gaten van honderden milliseconden —
   * midden in het commando-echo zelfs — dus stilte betekent níet 'klaar'.
   * Breken op stilte laat de rest van het antwoord op het volgende commando
   * belanden, en dan schuift alle uitvoer een plaats op.
   *
   * Daarom: wachten op de prompt, en stilte pas als noodrem gebruiken zolang
   * we nog niet gezien hebben dat dit toestel er een stuurt.
   */
  async readBuffer({ deadline = Date.now() + 4000 } = {}) {
    await sleep(20);

    this._lastReadHitPrompt = false;
    while (Date.now() < deadline) {
      if (this._atPrompt()) {
        this._promptSeen = true;
        this._lastReadHitPrompt = true;
        break;
      }
      if (!this._promptSeen && this._buf.length > 0 && Date.now() - this._lastRxAt >= this.quietMs) {
        break;
      }
      await this._waitForRx(50);
    }

    if (this._buf.length === 0) return '';
    const bytes = Uint8Array.from(this._buf.splice(0, this._buf.length));
    const text = new TextDecoder('ascii').decode(bytes);
    this.onLog({ dir: 'rx', text, bytes });

    if (this._hasLogDataLost(text)) {
      this.onLog({ dir: 'sys', text: 'LOG DATA LOST — uitvoer verworpen' });
      return '';
    }
    // De prompt zelf hoort niet bij het antwoord.
    return text.replace(/[\r\n]>\s*$/, '');
  }

  async flushBuffer() {
    this._buf = [];
  }

  /* ------------------------------------------------------------------ commando's */

  /**
   * Verstuurt een commando. Met `checkDone` wachten we op done/failed en
   * proberen we opnieuw bij uitblijven.
   */
  sendCommand(cmd, { checkDone = false, trials = 2, timeoutSec = 2 } = {}) {
    return this._serialize(async () => {
      if (!this.isOpen) throw new Error('Niet verbonden');
      if (checkDone) await this.flushBuffer();

      let payload = cmd.trim();
      if (!payload.includes('\r\n')) payload += '\r\n';

      let left = trials;
      while (left > 0) {
        this.onLog({ dir: 'tx', text: cmd.trim() });
        await this._writeSlow(payload);

        if (!checkDone) {
          await sleep(500);
          return true;
        }

        const deadline = Date.now() + timeoutSec * 1000;
        do {
          const t = (await this.readBuffer({ deadline })).trim().toLowerCase();
          if (t.includes('done')) return true;
          if (t.includes('failed')) return false;
          if (t.includes('unknown cmd') || t.includes('incorrect cmd arguments')) {
            throw new Error("Toestel kent commando niet: " + cmd);
          }
          await sleep(500);
        } while (Date.now() <= deadline);
        left--;
      }
      return false;
    });
  }

  /**
   * Verstuurt een commando en verzamelt het antwoord tot een eindtrigger of
   * timeout. Geeft de regels terug, zonder de echo van het commando zelf.
   */
  sendCommandWithResponse(
    cmd,
    {
      timeoutSec = 3,
      endTrigger = null,
      endTriggerFailedDone = false,
      resendWhenNoResponse = false,
      trim = true,
    } = {}
  ) {
    return this._serialize(async () => {
      if (!this.isOpen) throw new Error('Niet verbonden');

      let lines = [];
      let resends = 1;

      let payload = cmd.trim();
      if (!payload.includes('\r\n')) payload += '\r\n';

      this.onLog({ dir: 'tx', text: cmd.trim() });
      await this._writeSlow(payload);
      // Geen vaste wachttijd meer: readBuffer wacht zelf op de prompt.
      await sleep(50);

      let deadline = Date.now() + timeoutSec * 1000;
      do {
        const text = (await this.readBuffer({ deadline })).trim();
        if (text) lines.push(...text.split('\r').filter((s) => s.length));

        const low = text.toLowerCase();
        const noResponse = text === '' && resendWhenNoResponse;
        if (
          (low.includes('unknown cmd') || low.includes('incorrect cmd arguments') || noResponse) &&
          resends > 0
        ) {
          this.onLog({ dir: 'tx', text: cmd.trim() + '  (opnieuw)' });
          await this._writeSlow(payload);
          await sleep(1000);
          deadline = Date.now() + timeoutSec * 1000;
          resends--;
          continue;
        }

        // De prompt betekent dat de box klaar is; dan valt er niets meer te
        // halen, ongeacht welke eindtrigger we zochten.
        if (this._lastReadHitPrompt) break;

        if (text) {
          if (endTrigger) {
            if (low.includes(endTrigger.toLowerCase())) break;
          } else if (!endTriggerFailedDone || low.includes('done') || low.includes('failed')) {
            break;
          }
        }
        await sleep(50);
      } while (Date.now() <= deadline);

      // Normaliseren en de echo van het commando wegknippen.
      if (trim) lines = lines.map((l) => l.trim());
      lines = lines.filter((l) => l !== '');
      const echo = lines.findIndex((l) => l.toLowerCase() === cmd.trim().toLowerCase());
      if (echo !== -1) lines = lines.slice(echo + 1);

      return lines;
    });
  }

  /* ------------------------------------------------------------- capaciteiten */

  /** `help /all` — het toestel vertelt zelf welke commando's het kent. */
  async discoverCommands({ force = false } = {}) {
    if (!force && this.possibleCommands.length >= 5) return this.possibleCommands;

    for (let attempt = 0; attempt < 3; attempt++) {
      // Geen eindtrigger op de streepjeslijn: de helplijst begint er óók mee,
      // en dan stopt het verzamelen al voor de eerste commandonaam. De prompt
      // sluit dit antwoord af, net als elk ander.
      const lines = await this.sendCommandWithResponse('help /all', {
        timeoutSec: 8,
      });
      const cmds = lines
        .map((l) => l.split(' ')[0])
        .filter(
          (c) =>
            c &&
            !c.includes('------') &&
            !c.includes('Command') &&
            !c.includes('Use:') &&
            !c.includes('>')
        );
      if (cmds.length >= 5) {
        this.possibleCommands = cmds;
        // De hulptekst bewaren: daar staat bij sommige set-commando's welke
        // parameternummers de box accepteert, bv. "set parameter a (0-14) to b".
        this.commandHelp = {};
        for (const l of lines) {
          const name = l.split(' ')[0];
          if (name && cmds.includes(name)) this.commandHelp[name.toLowerCase()] = l;
        }
        break;
      }
      // Kwam er helemaal niets binnen, dan luistert er niets mee en heeft nog
      // een poging geen zin. Een onvolledig antwoord is wél het proberen waard:
      // dat kan aan timing of een verstoorde eerste regel liggen.
      if (this.rxBytes === 0) {
        this.onLog({ dir: 'sys', text: 'Geen enkele byte ontvangen — niet opnieuw geprobeerd' });
        break;
      }
    }
    return this.possibleCommands;
  }

  supports(cmd) {
    if (!this.possibleCommands.length) return true; // nog niets ontdekt: laat toe
    const first = cmd.trim().split(/\s+/)[0].toLowerCase();
    return this.possibleCommands.some((c) => c.toLowerCase() === first);
  }
}

export { sleep };
