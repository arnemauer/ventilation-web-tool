/*
 * ducoNames.js — productidentificatie.
 *
 * Productidentificatie: welke productcode bij welk toestel hoort, en welke
 * firmwareversies daarvoor zijn uitgebracht. Feiten die je nodig hebt om te
 * weten met welk apparaat je praat.
 *
 * De namen van de componenten zelf staan in products.js, in eigen woorden.
 *
 * Gegenereerd — niet met de hand bewerken. Zie tools/gennames.py.
 */

/** Typecodes die op de bus voorkomen; de namen staan in products.js. */
export const KNOWN_TYPE_CODES = [
 "actuat",
 "boiler",
 "box",
 "bsco2",
 "bsrh",
 "clima",
 "co2",
 "comb",
 "csco2",
 "ducofit50",
 "ducoflat12",
 "ducoflat12be",
 "ducoklep15",
 "ducoklep15be",
 "ducoline10",
 "ducoline10be",
 "ducoline17",
 "ducoline17be",
 "ducoline23",
 "ducoline23be",
 "ducomax",
 "ducomaxhd",
 "ducoplus45",
 "ducoplus60",
 "ducosmart60",
 "ducostrip",
 "ducostripacoustic",
 "ducoton10",
 "ducoton10be",
 "ducoton18",
 "ducoton18be",
 "ducotop50",
 "easyfit50",
 "eav",
 "eavco2",
 "eavrh",
 "eavvoc",
 "firemaxew30",
 "firemaxew90",
 "focsp",
 "glasmax",
 "glasvent",
 "heatoda",
 "iav",
 "iavco2",
 "iavrh",
 "iavvoc",
 "ihub",
 "iq",
 "klep",
 "minimax",
 "nrgsp",
 "odtsensor",
 "other",
 "preheater",
 "pwmin",
 "rh",
 "scsp",
 "silenzio",
 "silenzioak",
 "silenzioretro",
 "silenzioretroext",
 "skymax",
 "skyvent",
 "switch",
 "top",
 "topvent",
 "topventflens",
 "topventnl",
 "tronic",
 "tronicmax",
 "tronicmaxhd",
 "tronicminimax",
 "tronicskyvent",
 "tronictop50",
 "tronicvent",
 "tronicventflens",
 "uc",
 "ucbat",
 "ucbatrh",
 "ucco2",
 "ucrh",
 "ucvoc",
 "unkn",
 "vlv",
 "vlvco2",
 "vlvco2rh",
 "vlvrh",
 "vlvvoc",
 "wstn",
 "wxsensor",
 "wxsensorsubtype1",
 "wxsensorsubtype2"
];

export const PRODUCT_BY_ID = {
 "12030": "UCB-RF",
 "12031": "CCB-W",
 "12034": "UCB-W",
 "12035": "VLV",
 "12040": "SWITCH",
 "15047": "IAV",
 "15071": "ENERGYSLAVE",
 "16010": "FOCUS",
 "16023": "ENERGY",
 "16056": "SILENT_CONNECT",
 "17017": "ECO",
 "17031": "BOILER",
 "17046": "UC",
 "18083": "HYGRO",
 "19041": "TRONIC",
 "19156": "ENERGY",
 "21007": "SILENT2",
 "21123": "BMBIO_WIFI",
 "22068": "ENERGY G0",
 "22088": "EAV",
 "22115": "FOCUS G0",
 "22117": "SILENT_CONNECT G0",
 "23010": "ENERGY L4v2"
};

export const FIRMWARE_RELEASES = {
 "12030": [
  "8.3.0"
 ],
 "12031": [
  "5.3.0"
 ],
 "12034": [
  "7.3.0"
 ],
 "12035": [
  "11.5.0",
  "12.3.0",
  "13.2.0"
 ],
 "12040": [
  "5.5.0"
 ],
 "15047": [
  "4.6.0",
  "5.3.0",
  "10.3.0"
 ],
 "15071": [
  "10.3.0"
 ],
 "16010": [
  "10.5.0",
  "11.3.0",
  "14.1.0"
 ],
 "16023": [
  "6.3.0"
 ],
 "16056": [
  "13.3.0"
 ],
 "17017": [
  "10.8.0",
  "13.2.0",
  "14.6.0"
 ],
 "17031": [
  "10.2.0"
 ],
 "17046": [
  "11.3.0",
  "12.1.0",
  "14.2.0",
  "15.2.0",
  "16.2.0"
 ],
 "18083": [
  "10.6.0"
 ],
 "19041": [
  "10.6.0",
  "11.1.0"
 ],
 "19156": [
  "1.6.0",
  "3.3.0",
  "4.4.0",
  "7.7.0"
 ],
 "21007": [
  "1.4.0"
 ],
 "21123": [
  "4.4.0",
  "5.3.0",
  "6.2.0",
  "7.4.0",
  "8.3.0"
 ],
 "22068": [
  "2.4.0",
  "3.2.0",
  "4.3.0",
  "5.2.0",
  "6.4.0"
 ],
 "22088": [
  "2.1.0",
  "3.1.0",
  "4.2.0"
 ],
 "22115": [
  "1.2.0",
  "2.2.0",
  "3.2.0",
  "4.3.0",
  "5.2.0",
  "6.3.0"
 ],
 "22117": [
  "1.2.0",
  "2.2.0",
  "3.2.0",
  "4.3.0",
  "5.2.0",
  "6.3.0"
 ],
 "23010": [
  "2.4.0",
  "3.2.0",
  "4.3.0",
  "5.2.0",
  "6.4.0"
 ]
};
