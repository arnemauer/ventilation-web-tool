/*
 * nodeParaLists.js — genummerde parameters per printtype.
 *
 * De nummers die `NodeParaGet <node> <nr>` leest en `nodeParaSet <node> <nr>
 * <waarde>` schrijft, met een omschrijving en of de parameter schrijfbaar is
 * (R = alleen lezen, W = schrijfbaar).
 *
 * Let op: nog niet op hardware nagemeten. Een verkeerd nummer schrijft naar de
 * verkeerde parameter. Zie TODO.md.
 *
 * Gegenereerd — niet met de hand bewerken. Zie tools/genparalists.py.
 */

export const NODE_PARA_LISTS = {
 "vcb": {
  "label": "Klepprint (VCB) — regelkleppen",
  "params": [
   {
    "id": 66,
    "name": "association value grating unit",
    "writable": false
   },
   {
    "id": 70,
    "name": "status of grating unit",
    "writable": false
   },
   {
    "id": 71,
    "name": "error code",
    "writable": false
   },
   {
    "id": 72,
    "name": "error data",
    "writable": false
   },
   {
    "id": 76,
    "name": "uptime minutes",
    "writable": false
   },
   {
    "id": 77,
    "name": "CO2 overrule value (0 = not overruled)",
    "writable": true
   },
   {
    "id": 78,
    "name": "RH overrule value (0 = not overruled)",
    "writable": true
   },
   {
    "id": 128,
    "name": "number of associated grating units",
    "writable": true
   },
   {
    "id": 199,
    "name": "max motor steps",
    "writable": true
   },
   {
    "id": 201,
    "name": "homing direction",
    "writable": true
   },
   {
    "id": 202,
    "name": "step time",
    "writable": true
   },
   {
    "id": 204,
    "name": "step current",
    "writable": true
   },
   {
    "id": 205,
    "name": "open direction",
    "writable": true
   },
   {
    "id": 208,
    "name": "unit enabled",
    "writable": false
   },
   {
    "id": 256,
    "name": "capacity input",
    "writable": true
   }
  ]
 },
 "ucb": {
  "label": "Bedieningsprint (UCB) — bedieningsschakelaars en ruimtesensoren",
  "params": [
   {
    "id": 76,
    "name": "uptime minutes",
    "writable": false
   },
   {
    "id": 77,
    "name": "CO2 overrule value (0 = not overruled)",
    "writable": true
   },
   {
    "id": 78,
    "name": "RH overrule value (0 = not overruled)",
    "writable": true
   },
   {
    "id": 162,
    "name": "UC dim intensity",
    "writable": true
   },
   {
    "id": 163,
    "name": "UC upsidedown",
    "writable": true
   }
  ]
 },
 "ccb": {
  "label": "Communicatieprint (CCB)",
  "params": [
   {
    "id": 66,
    "name": "association value grating unit",
    "writable": false
   },
   {
    "id": 70,
    "name": "status of grating unit",
    "writable": false
   },
   {
    "id": 71,
    "name": "error code",
    "writable": false
   },
   {
    "id": 72,
    "name": "error data",
    "writable": false
   },
   {
    "id": 76,
    "name": "uptime minutes",
    "writable": false
   },
   {
    "id": 199,
    "name": "max motor steps",
    "writable": true
   },
   {
    "id": 201,
    "name": "homing direction",
    "writable": true
   },
   {
    "id": 202,
    "name": "step time",
    "writable": true
   },
   {
    "id": 203,
    "name": "step size",
    "writable": true
   },
   {
    "id": 204,
    "name": "step current",
    "writable": true
   },
   {
    "id": 205,
    "name": "open direction",
    "writable": true
   },
   {
    "id": 208,
    "name": "unit enabled",
    "writable": false
   }
  ]
 },
 "ccb_clima": {
  "label": "Communicatieprint Clima (CCB) — elektronische roosters",
  "params": [
   {
    "id": 66,
    "name": "association value grating unit",
    "writable": false
   },
   {
    "id": 70,
    "name": "status of grating unit",
    "writable": false
   },
   {
    "id": 71,
    "name": "error code",
    "writable": false
   },
   {
    "id": 72,
    "name": "error data",
    "writable": false
   },
   {
    "id": 76,
    "name": "uptime minutes",
    "writable": false
   },
   {
    "id": 199,
    "name": "max motor steps",
    "writable": true
   },
   {
    "id": 201,
    "name": "homing direction",
    "writable": true
   },
   {
    "id": 202,
    "name": "step time",
    "writable": true
   },
   {
    "id": 203,
    "name": "step size",
    "writable": true
   },
   {
    "id": 204,
    "name": "step current",
    "writable": true
   },
   {
    "id": 205,
    "name": "open direction",
    "writable": true
   },
   {
    "id": 206,
    "name": "income temp request",
    "writable": true
   },
   {
    "id": 207,
    "name": "extern temp trigger",
    "writable": true
   },
   {
    "id": 208,
    "name": "unit enabled",
    "writable": false
   },
   {
    "id": 209,
    "name": "heater switch",
    "writable": false
   },
   {
    "id": 210,
    "name": "heater active",
    "writable": false
   },
   {
    "id": 211,
    "name": "heater state",
    "writable": false
   },
   {
    "id": 212,
    "name": "heater temperature",
    "writable": false
   },
   {
    "id": 213,
    "name": "heater temperature requested",
    "writable": false
   },
   {
    "id": 214,
    "name": "heater temperature income",
    "writable": false
   },
   {
    "id": 215,
    "name": "heater temperature extern",
    "writable": false
   }
  ]
 },
 "acb": {
  "label": "Actuatorprint (ACB) — actuatoren en roosterunits",
  "params": [
   {
    "id": 66,
    "name": "association value grating unit",
    "writable": false
   },
   {
    "id": 70,
    "name": "status of grating unit",
    "writable": false
   },
   {
    "id": 71,
    "name": "error code",
    "writable": false
   },
   {
    "id": 72,
    "name": "error data",
    "writable": false
   },
   {
    "id": 76,
    "name": "uptime minutes",
    "writable": false
   },
   {
    "id": 195,
    "name": "manual mode period",
    "writable": true
   },
   {
    "id": 199,
    "name": "max motor steps",
    "writable": true
   },
   {
    "id": 201,
    "name": "homing direction",
    "writable": true
   },
   {
    "id": 202,
    "name": "step time",
    "writable": true
   },
   {
    "id": 204,
    "name": "step current",
    "writable": true
   },
   {
    "id": 205,
    "name": "open direction",
    "writable": true
   },
   {
    "id": 208,
    "name": "unit enabled",
    "writable": false
   },
   {
    "id": 216,
    "name": "actuator hybrid",
    "writable": true
   },
   {
    "id": 217,
    "name": "actuator pwm voltage",
    "writable": true
   },
   {
    "id": 218,
    "name": "actuator pwm frequency",
    "writable": true
   }
  ]
 }
};
