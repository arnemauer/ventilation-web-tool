/*
 * fixtures.js — emulatieprofielen naar werkelijke installaties.
 *
 * Nodelijsten, parameternamen, waarden en serienummers komen uit drie bestaande
 * installaties. Serienummers zijn geanonimiseerd (cijfers vervangen).
 *
 * Waar de bron geen bereik bevatte staat `derived: true` op de parameter: dat
 * bereik is voor de emulatie afgeleid uit de waarde, niet waargenomen.
 *
 * Gegenereerd — niet met de hand bewerken. Zie tools/genfixtures.py.
 */

export const PROFILES = [
 {
  "id": "silent-2019",
  "label": "DucoBox Silent — 6 nodes (2019)",
  "identity": {
   "model": "DucoBoxSilent",
   "swVersion": "1.3.0",
   "productVersion": 14033,
   "subtype": 0,
   "serial": "RS0000000000"
  },
  "nodes": [
   {
    "node": 1,
    "netw": "-",
    "addr": 1,
    "sub": 0,
    "type": "box",
    "ptcl": 8,
    "cerr": 0,
    "prnt": 0,
    "asso": 0,
    "stts": "0x00",
    "stat": "man3",
    "cntdwn": 15,
    "dbt": 100,
    "trgt": 62,
    "cval": 62,
    "snsr": 0,
    "ovrl": 255,
    "capin": 140,
    "capout": 2240,
    "tree": "0x01",
    "temp": 0.0,
    "info": "manu:0(0)",
    "blnc": 0,
    "componentType": "DucoBoxSilent",
    "version": "1.3.0",
    "productVersion": 14033,
    "serial": "RS0000000000"
   },
   {
    "node": 2,
    "netw": "-",
    "addr": 102,
    "sub": 0,
    "type": "ucco2",
    "ptcl": 6,
    "cerr": 0,
    "prnt": 1,
    "asso": 1,
    "stts": "0x06",
    "stat": "-",
    "cntdwn": 0,
    "dbt": 0,
    "trgt": 0,
    "cval": 0,
    "snsr": 0,
    "ovrl": 0,
    "capin": 0,
    "capout": 0,
    "tree": "-",
    "temp": 20.9,
    "info": "-",
    "blnc": 0,
    "componentType": "UserControllerCo2",
    "version": "1.2.0",
    "productVersion": 12030,
    "serial": "RS0000000000"
   },
   {
    "node": 3,
    "netw": "-",
    "addr": 103,
    "sub": 0,
    "type": "ucbat",
    "ptcl": 9,
    "cerr": 0,
    "prnt": 1,
    "asso": 1,
    "stts": "0x06",
    "stat": "-",
    "cntdwn": 0,
    "dbt": 0,
    "trgt": 0,
    "cval": 0,
    "snsr": 0,
    "ovrl": 0,
    "capin": 0,
    "capout": 0,
    "tree": "-",
    "temp": 20.6,
    "info": "-",
    "blnc": 0,
    "componentType": "UserControllerBattery",
    "version": "N/A",
    "productVersion": 0,
    "serial": "---"
   },
   {
    "node": 4,
    "netw": "-",
    "addr": 104,
    "sub": 0,
    "type": "ucco2",
    "ptcl": 6,
    "cerr": 0,
    "prnt": 1,
    "asso": 1,
    "stts": "0x06",
    "stat": "-",
    "cntdwn": 0,
    "dbt": 0,
    "trgt": 0,
    "cval": 0,
    "snsr": 0,
    "ovrl": 0,
    "capin": 0,
    "capout": 0,
    "tree": "-",
    "temp": 21.0,
    "info": "-",
    "blnc": 0,
    "componentType": "UserControllerCo2",
    "version": "1.2.0",
    "productVersion": 12030,
    "serial": "RS0000000000"
   },
   {
    "node": 5,
    "netw": "-",
    "addr": 105,
    "sub": 0,
    "type": "ucco2",
    "ptcl": 255,
    "cerr": 10,
    "prnt": 1,
    "asso": 1,
    "stts": "0x00",
    "stat": "-",
    "cntdwn": 0,
    "dbt": 0,
    "trgt": 0,
    "cval": 0,
    "snsr": 0,
    "ovrl": 0,
    "capin": 0,
    "capout": 0,
    "tree": "-",
    "temp": 0.0,
    "info": "-",
    "blnc": 0,
    "componentType": "UserControllerCo2",
    "version": "N/A",
    "productVersion": 0,
    "serial": "Failed"
   },
   {
    "node": 6,
    "netw": "-",
    "addr": 106,
    "sub": 0,
    "type": "ucco2",
    "ptcl": 255,
    "cerr": 10,
    "prnt": 1,
    "asso": 1,
    "stts": "0x00",
    "stat": "-",
    "cntdwn": 0,
    "dbt": 0,
    "trgt": 0,
    "cval": 0,
    "snsr": 0,
    "ovrl": 0,
    "capin": 0,
    "capout": 0,
    "tree": "-",
    "temp": 0.0,
    "info": "-",
    "blnc": 0,
    "componentType": "UserControllerCo2",
    "version": "N/A",
    "productVersion": 0,
    "serial": "Failed"
   }
  ],
  "groups": {
   "fanparaget": [
    {
     "id": 0,
     "name": "auto calib",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1,
     "derived": true
    },
    {
     "id": 1,
     "name": "max high level",
     "value": 62,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    },
    {
     "id": 2,
     "name": "min fan speed",
     "value": 400,
     "min": 0,
     "step": 5,
     "max": 1440,
     "derived": true
    },
    {
     "id": 3,
     "name": "max fan out",
     "value": 100,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    }
   ],
   "ventctrlparaget": [
    {
     "id": 2,
     "name": "ctrl temp low",
     "value": 160,
     "min": 0,
     "step": 5,
     "max": 1440,
     "derived": true
    },
    {
     "id": 3,
     "name": "ctrl temp high",
     "value": 240,
     "min": 0,
     "step": 5,
     "max": 1440,
     "derived": true
    }
   ]
  },
  "perNode": {
   "nodeconfigget": {
    "1": [
     {
      "id": 1,
      "name": "automin",
      "value": 10,
      "min": 10,
      "step": 5,
      "max": 100
     },
     {
      "id": 2,
      "name": "automax",
      "value": 100,
      "min": 10,
      "step": 5,
      "max": 100
     },
     {
      "id": 15,
      "name": "temp dependent",
      "value": 1,
      "min": 0,
      "step": 1,
      "max": 1
     }
    ],
    "2": [
     {
      "id": 4,
      "name": "co2 setpoint",
      "value": 800,
      "min": 0,
      "step": 10,
      "max": 2000
     },
     {
      "id": 7,
      "name": "manual 1",
      "value": 15,
      "min": 0,
      "step": 5,
      "max": 50
     },
     {
      "id": 8,
      "name": "manual 2",
      "value": 50,
      "min": 15,
      "step": 5,
      "max": 100
     },
     {
      "id": 9,
      "name": "manual 3",
      "value": 100,
      "min": 50,
      "step": 5,
      "max": 100
     },
     {
      "id": 10,
      "name": "manual timeout",
      "value": 20,
      "min": 5,
      "step": 5,
      "max": 9995
     },
     {
      "id": 15,
      "name": "temp dependent",
      "value": 1,
      "min": 0,
      "step": 1,
      "max": 1
     }
    ],
    "3": [
     {
      "id": 7,
      "name": "manual 1",
      "value": 15,
      "min": 0,
      "step": 5,
      "max": 50
     },
     {
      "id": 8,
      "name": "manual 2",
      "value": 50,
      "min": 15,
      "step": 5,
      "max": 100
     },
     {
      "id": 9,
      "name": "manual 3",
      "value": 100,
      "min": 50,
      "step": 5,
      "max": 100
     },
     {
      "id": 10,
      "name": "manual timeout",
      "value": 20,
      "min": 5,
      "step": 5,
      "max": 9995
     }
    ],
    "4": [
     {
      "id": 4,
      "name": "co2 setpoint",
      "value": 850,
      "min": 0,
      "step": 10,
      "max": 2000
     },
     {
      "id": 7,
      "name": "manual 1",
      "value": 15,
      "min": 0,
      "step": 5,
      "max": 50
     },
     {
      "id": 8,
      "name": "manual 2",
      "value": 50,
      "min": 15,
      "step": 5,
      "max": 100
     },
     {
      "id": 9,
      "name": "manual 3",
      "value": 100,
      "min": 50,
      "step": 5,
      "max": 100
     },
     {
      "id": 10,
      "name": "manual timeout",
      "value": 20,
      "min": 5,
      "step": 5,
      "max": 9995
     },
     {
      "id": 15,
      "name": "temp dependent",
      "value": 1,
      "min": 0,
      "step": 1,
      "max": 1
     }
    ],
    "5": [
     {
      "id": 4,
      "name": "co2 setpoint",
      "value": 850,
      "min": 0,
      "step": 10,
      "max": 2000
     },
     {
      "id": 7,
      "name": "manual 1",
      "value": 15,
      "min": 0,
      "step": 5,
      "max": 50
     },
     {
      "id": 8,
      "name": "manual 2",
      "value": 50,
      "min": 15,
      "step": 5,
      "max": 100
     },
     {
      "id": 9,
      "name": "manual 3",
      "value": 100,
      "min": 50,
      "step": 5,
      "max": 100
     },
     {
      "id": 10,
      "name": "manual timeout",
      "value": 20,
      "min": 5,
      "step": 5,
      "max": 9995
     },
     {
      "id": 15,
      "name": "temp dependent",
      "value": 1,
      "min": 0,
      "step": 1,
      "max": 1
     }
    ],
    "6": [
     {
      "id": 4,
      "name": "co2 setpoint",
      "value": 800,
      "min": 0,
      "step": 10,
      "max": 2000
     },
     {
      "id": 7,
      "name": "manual 1",
      "value": 15,
      "min": 0,
      "step": 5,
      "max": 50
     },
     {
      "id": 8,
      "name": "manual 2",
      "value": 50,
      "min": 15,
      "step": 5,
      "max": 100
     },
     {
      "id": 9,
      "name": "manual 3",
      "value": 100,
      "min": 50,
      "step": 5,
      "max": 100
     },
     {
      "id": 10,
      "name": "manual timeout",
      "value": 20,
      "min": 5,
      "step": 5,
      "max": 9995
     },
     {
      "id": 15,
      "name": "temp dependent",
      "value": 1,
      "min": 0,
      "step": 1,
      "max": 1
     }
    ]
   }
  },
  "sensors": {
   "FanspeedFiltered": 1816.0
  }
 },
 {
  "id": "energy-2023",
  "label": "DucoBox Energy — 5 nodes (2023)",
  "identity": {
   "model": "DucoBoxEnergy",
   "swVersion": "3.3.0",
   "productVersion": 19156,
   "subtype": 50,
   "serial": "PS0000000000"
  },
  "nodes": [
   {
    "node": 1,
    "netw": "virt",
    "addr": 1,
    "sub": 1,
    "type": "box",
    "ptcl": 22,
    "cerr": 0,
    "prnt": 0,
    "asso": 0,
    "stts": "0x00",
    "stat": "auto",
    "cntdwn": 0,
    "dbt": 10,
    "trgt": 10,
    "cval": 0,
    "snsr": 0,
    "ovrl": 255,
    "capin": 0,
    "capout": 5600,
    "tree": "0x01",
    "temp": 20.0,
    "info": "auto: 0( 0)",
    "blnc": 0,
    "componentType": "DucoBoxEnergy",
    "version": "3.3.0",
    "productVersion": 19156,
    "serial": "PS0000000000"
   },
   {
    "node": 2,
    "netw": "rf",
    "addr": 2,
    "sub": 1,
    "type": "ucbat",
    "ptcl": 255,
    "cerr": 0,
    "prnt": 1,
    "asso": 1,
    "stts": "0x00",
    "stat": "-",
    "cntdwn": 0,
    "dbt": 0,
    "trgt": 0,
    "cval": 0,
    "snsr": 0,
    "ovrl": 0,
    "capin": 0,
    "capout": 0,
    "tree": "-",
    "temp": 20.0,
    "info": "-",
    "blnc": 0,
    "componentType": "UserControllerBattery",
    "version": "N/A",
    "productVersion": 0,
    "serial": "---"
   },
   {
    "node": 3,
    "netw": "rf",
    "addr": 3,
    "sub": 1,
    "type": "ucco2",
    "ptcl": 21,
    "cerr": 0,
    "prnt": 1,
    "asso": 1,
    "stts": "0x00",
    "stat": "-",
    "cntdwn": 0,
    "dbt": 0,
    "trgt": 0,
    "cval": 0,
    "snsr": 0,
    "ovrl": 0,
    "capin": 0,
    "capout": 0,
    "tree": "-",
    "temp": 22.2,
    "info": "-",
    "blnc": 0,
    "componentType": "UserControllerCo22",
    "version": "11.3.0",
    "productVersion": 17046,
    "serial": "RS0000000000"
   },
   {
    "node": 4,
    "netw": "rf",
    "addr": 4,
    "sub": 1,
    "type": "ucco2",
    "ptcl": 255,
    "cerr": 10,
    "prnt": 1,
    "asso": 1,
    "stts": "0x00",
    "stat": "-",
    "cntdwn": 0,
    "dbt": 0,
    "trgt": 0,
    "cval": 0,
    "snsr": 0,
    "ovrl": 0,
    "capin": 0,
    "capout": 0,
    "tree": "-",
    "temp": 20.0,
    "info": "-",
    "blnc": 0,
    "componentType": "UserControllerCo2",
    "version": "N/A",
    "productVersion": 0,
    "serial": "Failed"
   },
   {
    "node": 67,
    "netw": "virt",
    "addr": 1,
    "sub": 1,
    "type": "uc",
    "ptcl": 255,
    "cerr": 0,
    "prnt": 1,
    "asso": 1,
    "stts": "0x00",
    "stat": "-",
    "cntdwn": 0,
    "dbt": 0,
    "trgt": 0,
    "cval": 0,
    "snsr": 0,
    "ovrl": 0,
    "capin": 0,
    "capout": 0,
    "tree": "-",
    "temp": 20.0,
    "info": "-",
    "blnc": 0,
    "componentType": "Unknown",
    "version": "N/A",
    "productVersion": 0,
    "serial": "---"
   }
  ],
  "groups": {
   "nightboostparaget": [
    {
     "id": 1,
     "name": "active",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1,
     "derived": true
    },
    {
     "id": 2,
     "name": "temperature setpoint",
     "value": 22,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    },
    {
     "id": 3,
     "name": "start month",
     "value": 4,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    },
    {
     "id": 4,
     "name": "stop month",
     "value": 8,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    },
    {
     "id": 5,
     "name": "start time",
     "value": 60,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    },
    {
     "id": 6,
     "name": "stop time",
     "value": 450,
     "min": 0,
     "step": 5,
     "max": 1440,
     "derived": true
    }
   ],
   "ventcoolparaget": [
    {
     "id": 1,
     "name": "active on monday",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1,
     "derived": true
    },
    {
     "id": 2,
     "name": "active on tuesday",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1,
     "derived": true
    },
    {
     "id": 3,
     "name": "active on wednesday",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1,
     "derived": true
    },
    {
     "id": 4,
     "name": "active on thursday",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1,
     "derived": true
    },
    {
     "id": 5,
     "name": "active on friday",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1,
     "derived": true
    },
    {
     "id": 6,
     "name": "active on saturday",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1,
     "derived": true
    },
    {
     "id": 7,
     "name": "active on sunday",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1,
     "derived": true
    },
    {
     "id": 8,
     "name": "start time",
     "value": 1320,
     "min": 0,
     "step": 5,
     "max": 1440,
     "derived": true
    },
    {
     "id": 9,
     "name": "stop time",
     "value": 360,
     "min": 0,
     "step": 5,
     "max": 1440,
     "derived": true
    },
    {
     "id": 10,
     "name": "mode",
     "value": 2,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    }
   ],
   "bypassparaget": [
    {
     "id": 0,
     "name": "bypass mode",
     "value": 0,
     "min": 0,
     "step": 1,
     "max": 2
    },
    {
     "id": 1,
     "name": "adaptive control",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1
    }
   ],
   "fanparaget": [
    {
     "id": 10,
     "name": "p in max",
     "value": 80,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    },
    {
     "id": 11,
     "name": "p out max",
     "value": 92,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    },
    {
     "id": 12,
     "name": "q out",
     "value": 265,
     "min": 0,
     "step": 5,
     "max": 265
    },
    {
     "id": 16,
     "name": "stability band",
     "value": 5,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    },
    {
     "id": 17,
     "name": "stability interval",
     "value": 3,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    },
    {
     "id": 18,
     "name": "stability samples",
     "value": 3,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    }
   ],
   "ventctrlparaget": [
    {
     "id": 2,
     "name": "ctrl temp low",
     "value": 160,
     "min": 0,
     "step": 5,
     "max": 1440,
     "derived": true
    },
    {
     "id": 3,
     "name": "ctrl temp high",
     "value": 240,
     "min": 0,
     "step": 5,
     "max": 1440,
     "derived": true
    }
   ]
  },
  "perNode": {
   "nodeconfigget": {
    "1": [
     {
      "id": 1,
      "name": "automin",
      "value": 10,
      "min": 10,
      "step": 5,
      "max": 100
     },
     {
      "id": 2,
      "name": "automax",
      "value": 100,
      "min": 10,
      "step": 5,
      "max": 100
     },
     {
      "id": 7,
      "name": "manual 1",
      "value": 15,
      "min": 0,
      "step": 5,
      "max": 50
     },
     {
      "id": 8,
      "name": "manual 2",
      "value": 50,
      "min": 15,
      "step": 5,
      "max": 100
     },
     {
      "id": 9,
      "name": "manual 3",
      "value": 100,
      "min": 50,
      "step": 5,
      "max": 100
     },
     {
      "id": 10,
      "name": "manual timeout",
      "value": 60,
      "min": 5,
      "step": 5,
      "max": 9995
     }
    ],
    "2": [
     {
      "id": 7,
      "name": "manual 1",
      "value": 15,
      "min": 0,
      "step": 5,
      "max": 50
     },
     {
      "id": 8,
      "name": "manual 2",
      "value": 50,
      "min": 15,
      "step": 5,
      "max": 100
     },
     {
      "id": 9,
      "name": "manual 3",
      "value": 100,
      "min": 50,
      "step": 5,
      "max": 100
     },
     {
      "id": 10,
      "name": "manual timeout",
      "value": 60,
      "min": 5,
      "step": 5,
      "max": 9995
     }
    ],
    "3": [
     {
      "id": 4,
      "name": "co2 setpoint",
      "value": 800,
      "min": 0,
      "step": 10,
      "max": 2000
     },
     {
      "id": 7,
      "name": "manual 1",
      "value": 15,
      "min": 0,
      "step": 5,
      "max": 50
     },
     {
      "id": 8,
      "name": "manual 2",
      "value": 50,
      "min": 15,
      "step": 5,
      "max": 100
     },
     {
      "id": 9,
      "name": "manual 3",
      "value": 100,
      "min": 50,
      "step": 5,
      "max": 100
     },
     {
      "id": 10,
      "name": "manual timeout",
      "value": 60,
      "min": 5,
      "step": 5,
      "max": 9995
     },
     {
      "id": 15,
      "name": "temp dependent",
      "value": 1,
      "min": 0,
      "step": 1,
      "max": 1
     },
     {
      "id": 19,
      "name": "sensorvisulevel",
      "value": 0,
      "min": 0,
      "step": 5,
      "max": 100
     }
    ],
    "4": [
     {
      "id": 4,
      "name": "co2 setpoint",
      "value": 850,
      "min": 0,
      "step": 10,
      "max": 2000
     },
     {
      "id": 7,
      "name": "manual 1",
      "value": 15,
      "min": 0,
      "step": 5,
      "max": 50
     },
     {
      "id": 8,
      "name": "manual 2",
      "value": 50,
      "min": 15,
      "step": 5,
      "max": 100
     },
     {
      "id": 9,
      "name": "manual 3",
      "value": 100,
      "min": 50,
      "step": 5,
      "max": 100
     },
     {
      "id": 10,
      "name": "manual timeout",
      "value": 60,
      "min": 5,
      "step": 5,
      "max": 9995
     },
     {
      "id": 15,
      "name": "temp dependent",
      "value": 1,
      "min": 0,
      "step": 1,
      "max": 1
     },
     {
      "id": 19,
      "name": "sensorvisulevel",
      "value": 0,
      "min": 0,
      "step": 5,
      "max": 100
     }
    ]
   }
  },
  "sensors": {
   "TemperatureETA": 20.2,
   "TemperatureEHA": 17.4,
   "TemperatureODA": 15.7,
   "TemperatureSUP": 19.1,
   "PressureETA": 1.2,
   "PressureSUP": 0.6
  }
 },
 {
  "id": "silent-2022",
  "label": "DucoBox Silent — 3 nodes (2022)",
  "identity": {
   "model": "DucoBoxSilent",
   "swVersion": "5.4.0",
   "productVersion": 14033,
   "subtype": 1,
   "serial": "RS0000000000"
  },
  "nodes": [
   {
    "node": 1,
    "netw": "virt",
    "addr": 1,
    "sub": 1,
    "type": "box",
    "ptcl": 16,
    "cerr": 0,
    "prnt": 0,
    "asso": 0,
    "stts": "0x60",
    "stat": "auto",
    "cntdwn": 0,
    "dbt": 10,
    "trgt": 10,
    "cval": 10,
    "snsr": 0,
    "ovrl": 255,
    "capin": 290,
    "capout": 4640,
    "tree": "0x01",
    "temp": 0.0,
    "info": "auto:0(0)",
    "blnc": 0,
    "componentType": "DucoBoxSilent",
    "version": "5.4.0",
    "productVersion": 14033,
    "serial": "RS0000000000"
   },
   {
    "node": 2,
    "netw": "rf",
    "addr": 2,
    "sub": 1,
    "type": "ucco2",
    "ptcl": 17,
    "cerr": 0,
    "prnt": 1,
    "asso": 1,
    "stts": "0x00",
    "stat": "-",
    "cntdwn": 0,
    "dbt": 0,
    "trgt": 0,
    "cval": 0,
    "snsr": 0,
    "ovrl": 0,
    "capin": 0,
    "capout": 0,
    "tree": "-",
    "temp": 22.8,
    "info": "-",
    "blnc": 0,
    "componentType": "UserControllerCo2",
    "version": "8.0.0",
    "productVersion": 12030,
    "serial": "RS0000000000"
   },
   {
    "node": 3,
    "netw": "rf",
    "addr": 3,
    "sub": 1,
    "type": "ucbat",
    "ptcl": 15,
    "cerr": 0,
    "prnt": 1,
    "asso": 1,
    "stts": "0x06",
    "stat": "-",
    "cntdwn": 0,
    "dbt": 0,
    "trgt": 0,
    "cval": 0,
    "snsr": 0,
    "ovrl": 0,
    "capin": 0,
    "capout": 0,
    "tree": "-",
    "temp": 0.0,
    "info": "-",
    "blnc": 0,
    "componentType": "UserControllerBattery",
    "version": "N/A",
    "productVersion": 0,
    "serial": "---"
   }
  ],
  "groups": {
   "fanparaget": [
    {
     "id": 0,
     "name": "auto calib",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1,
     "derived": true
    },
    {
     "id": 1,
     "name": "max high level",
     "value": 80,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    },
    {
     "id": 2,
     "name": "min fan speed",
     "value": 400,
     "min": 0,
     "step": 5,
     "max": 1440,
     "derived": true
    },
    {
     "id": 3,
     "name": "max fan out",
     "value": 100,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    },
    {
     "id": 4,
     "name": "calib on man2",
     "value": 0,
     "min": 0,
     "step": 1,
     "max": 1,
     "derived": true
    },
    {
     "id": 5,
     "name": "ground bound",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1,
     "derived": true
    },
    {
     "id": 6,
     "name": "head count",
     "value": 4,
     "min": 0,
     "step": 1,
     "max": 100,
     "derived": true
    },
    {
     "id": 7,
     "name": "fan curve",
     "value": 1,
     "min": 0,
     "step": 1,
     "max": 1
    }
   ],
   "ventctrlparaget": [
    {
     "id": 2,
     "name": "ctrl temp low",
     "value": 160,
     "min": 0,
     "step": 5,
     "max": 1440,
     "derived": true
    },
    {
     "id": 3,
     "name": "ctrl temp high",
     "value": 240,
     "min": 0,
     "step": 5,
     "max": 1440,
     "derived": true
    }
   ]
  },
  "perNode": {
   "nodeconfigget": {
    "1": [
     {
      "id": 1,
      "name": "automin",
      "value": 10,
      "min": 10,
      "step": 5,
      "max": 100
     },
     {
      "id": 2,
      "name": "automax",
      "value": 100,
      "min": 10,
      "step": 5,
      "max": 100
     },
     {
      "id": 7,
      "name": "manual 1",
      "value": 15,
      "min": 0,
      "step": 5,
      "max": 50
     },
     {
      "id": 8,
      "name": "manual 2",
      "value": 50,
      "min": 15,
      "step": 5,
      "max": 100
     },
     {
      "id": 9,
      "name": "manual 3",
      "value": 100,
      "min": 50,
      "step": 5,
      "max": 100
     },
     {
      "id": 10,
      "name": "manual timeout",
      "value": 15,
      "min": 5,
      "step": 5,
      "max": 9995
     }
    ],
    "2": [
     {
      "id": 4,
      "name": "co2 setpoint",
      "value": 800,
      "min": 0,
      "step": 10,
      "max": 2000
     },
     {
      "id": 7,
      "name": "manual 1",
      "value": 15,
      "min": 0,
      "step": 5,
      "max": 50
     },
     {
      "id": 8,
      "name": "manual 2",
      "value": 50,
      "min": 15,
      "step": 5,
      "max": 100
     },
     {
      "id": 9,
      "name": "manual 3",
      "value": 100,
      "min": 50,
      "step": 5,
      "max": 100
     },
     {
      "id": 10,
      "name": "manual timeout",
      "value": 15,
      "min": 5,
      "step": 5,
      "max": 9995
     },
     {
      "id": 15,
      "name": "temp dependent",
      "value": 1,
      "min": 0,
      "step": 1,
      "max": 1
     },
     {
      "id": 19,
      "name": "sensorvisulevel",
      "value": 0,
      "min": 0,
      "step": 5,
      "max": 100
     }
    ],
    "3": [
     {
      "id": 7,
      "name": "manual 1",
      "value": 15,
      "min": 0,
      "step": 5,
      "max": 50
     },
     {
      "id": 8,
      "name": "manual 2",
      "value": 50,
      "min": 15,
      "step": 5,
      "max": 100
     },
     {
      "id": 9,
      "name": "manual 3",
      "value": 100,
      "min": 50,
      "step": 5,
      "max": 100
     },
     {
      "id": 10,
      "name": "manual timeout",
      "value": 15,
      "min": 5,
      "step": 5,
      "max": 9995
     }
    ]
   }
  },
  "sensors": {
   "FanspeedFiltered": 396.0
  }
 }
];
