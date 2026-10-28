/*
 * fixtures-logs.js — emulatorprofielen uit logboeken van echte boxen.
 *
 * Elk antwoord is letterlijk zoals de box het gaf, op de inspringing na.
 * Serienummers, servicecode en chip-id zijn geanonimiseerd. Het Silent
 * Connect-profiel is afgeleid van de Focus: zelfde commandoset, zonder
 * kleppen; de printnaam daarin is een aanname.
 *
 * Gegenereerd — niet met de hand bewerken. Zie tools/genlogprofile.py.
 */

export const LOG_PROFILES = [
 {
  "id": "focus-10.4.0",
  "label": "DucoBox Focus 16010.10.4.0 — 7 nodes (logboek)",
  "family": "focus",
  "productVersion": 16010,
  "version": "10.4.0",
  "canned": {
   "help /all": [
    "-------------------------------------------------",
    "Command Help []",
    "-------------------------------------------------",
    "AutoHcInfo                  AUTO HEADCOUNT info",
    "AutoHcParaGet               AUTO HEADCOUNT get parameter values",
    "AutoHcParaSet a b           AUTO HEADCOUNT set parameter a (0-3) to b",
    "BMBReplaceInfo              BMBREPLACE Print replace info",
    "BMBReplaceToBmb             BMBREPLACE copy data from SD card to BMB",
    "BMBReplaceToSd              BMBREPLACE copy data from BMB to SD card",
    "BoardInfo                   BOARD info",
    "BoardSet a b                BOARD set subtype",
    "BootMode                    Reset the board into bootmode",
    "CommAlP2PInfo               COMM P2P Info",
    "CommDllDefaults             Comm DLL set register to defaults",
    "CommDllInfo                 Comm DLL info",
    "CommDllSetReg a b           Comm DLL set register a (0-46|100-107) to b",
    "CommInfo                    COMM info",
    "CommNlInfo                  Comm NL info",
    "CoreBufferInfo              CORE buffer info",
    "CoreGetError                CORE get error",
    "CoreInfo                    CORE info",
    "CoreLogLevel a              CORE set log level",
    "CoreQInfo                   CORE queue info",
    "CoreTaskInfo                CORE task info",
    "DataClear a                 DATAMNGR clear data",
    "DataDefaults                DATAMNGR load default data in RAM",
    "DataInfo                    DATAMNGR info",
    "DataRaw a                   DATAMNGR print raw data",
    "DataSave                    DATAMNGR save data",
    "FanCalib                    FAN get calibration data",
    "FanCalibClear               FAN clear calibration data",
    "FanCalibNext                FAN next calibration step",
    "FanCalibSet a b             FAN set k-value of valve (a) to (b)",
    "FanCalibStart               FAN start calibration",
    "FanCalibStop                FAN stop calibration",
    "FanGetSpeed                 FAN get speed",
    "FanParaGet                  FAN get parameter values",
    "FanParaSet a b              FAN set parameter a (0-14) to b",
    "FanPerformGet               FAN get performance values",
    "FanSetCorrection a b c d    FAN set curve correction (a=p100_spd, b=p100_q, c=p200_spd, d=p200_q)",
    "FanSetOutput a              FAN set PWM to a [0-0xFFFF]",
    "FanSetSpeedEmul a           FAN set emulated speed to a",
    "Help ...                    Print HELP menu",
    "InstallerSet a              INSTALL enter (a=1) or leave (a=0) installer mode",
    "IoParaGet                   IO get parameter values",
    "IoParaSet a b c             IO set parameter (b) of module (a) to (c)",
    "LogClear                    LOG clear log",
    "LogPrint                    LOG print log",
    "MpcmDllInfo                 MPCM DLL info",
    "Network                     NETW network table",
    "NetworkClear                NETW clear network (in installer mode only)",
    "NetwSerial                  NETW serial number table",
    "NetwVersion                 NETW version table",
    "NightBoostInfo              NIGHT BOOST Info",
    "NightBoostParaGet           NIGHT BOOST get parameters",
    "NightBoostParaSet a b       NIGHT BOOST set parameters",
    "NodeConfigGet a             NODE get config para's of node a",
    "NodeConfigSet a b c         NODE set config para b of node a to c",
    "NodeInfo a                  NODE info of node (a)",
    "NodeLoadDefaults a          NODE load defaults on node (a)",
    "NodeParaGet a b             NODE get para (b) of node (a)",
    "NodeParaList                NODE parameter list",
    "NodeParaSet a b c           NODE set para (b) of node (a) to (c)",
    "NodeReset a                 NODE reset node (a)",
    "NodeSaveData a              NODE save data on node (a)",
    "NodeSetAsso a b             NODE set asso of node a to b",
    "NodeSetOverrule a b         NODE set overrule of node a to b",
    "NodeSetParent a b           NODE set parent of node a to b",
    "NodeShow a b                NODE send msg to node (a) to show/hide (b)",
    "OneSecTaskInfo              ONE SEC task info",
    "OsHwm                       OS HWM",
    "Reset                       Perform soft reset",
    "RfArbitratorInfo            Get info of the RF arbitrator",
    "RfEnable a                  RF enable ON (a=1) or OFF (a = 0)",
    "RfSwitchInfo                RFSWITCH info",
    "RtcGetTime                  Get time",
    "RtcSetTime a b c d e f      Set time (a=day of month, b=month(1-12), c=year, d=hour, e=minute, f=second)",
    "SensorCtrlInfo              SENSOR CTRL get info",
    "SensorCtrlParaGet           SENSOR CTRL get parameter values",
    "SensorCtrlParaSet a b       SENSOR CTRL set parameter a (0-31) to b",
    "SensorInfo                  SENSOR get info",
    "ServiceCode                 SERVICE CODE print",
    "SwUploadRestart             SWUPLOAD restart",
    "SwUploadStatus              SWUPLOAD status",
    "SwVersion                   Print software version",
    "TestClear                   TEST clear log",
    "TestMode                    Reset the board into testmode",
    "TestPrint                   TEST print log",
    "VentCoolInfo                VENT COOL Info",
    "VentCoolParaGet             VENT COOL get parameter values",
    "VentCoolParaSet a b         VENT COOL set parameter a (0-11) to b",
    "VentCtrlParaGet             VENT CTRL get parameter values",
    "VentCtrlParaSet a b         VENT CTRL set parameter a (0-4) to b",
    "WeatherStationInfo          Weather station info",
    "WeatherStationTrigger       Weather station trigger",
    "-------------------------------------------------",
    "Use: 92/110 (0 fail)"
   ],
   "swversion": [
    "16010.10.4.0",
    "built @ Oct  8 2019 17:20:20"
   ],
   "network": [
    "Network:",
    "--- start list ---",
    "node|netw|addr|sub |type    |ptcl|cerr|prnt|asso|stts|stat|cntdwn|%dbt|trgt|cval|snsr|ovrl|capin |capout|tree|temp|info",
    "1   |VIRT|1   |1   |BOX     |18  |0   |0   |0   |0x00|AUTO|0     |22  |23  |23  |0   |255 |0     |2880  |0x81|0   |AUTO:0(0)",
    "2   |WI  |2   |1   |VLVRH   |16  |0   |1   |0   |0x00|AUTO|0     |10  |0   |0   |10  |255 |60    |960   |0x02|187 |AUTO:0(0)",
    "3   |WI  |3   |1   |VLVCO2  |16  |0   |1   |0   |0x00|AUTO|0     |46  |100 |100 |46  |255 |60    |960   |0x02|231 |AUTO:0(0)",
    "4   |WI  |4   |1   |VLVCO2  |16  |0   |1   |0   |0x00|AUTO|0     |10  |0   |0   |0   |255 |60    |960   |0x82|213 |AUTO:0(0)",
    "5   |RF  |2   |1   |UC      |17  |0   |2   |2   |0x00|-   |0     |-   |-   |-   |0   |-   |-     |-     |-   |173 |-",
    "6   |RF  |3   |1   |CLIMA   |16  |0   |4   |0   |0x00|AUTO|0     |0   |0   |0   |0   |255 |70    |1120  |0x03|96  |AUTO:4(0)",
    "7   |RF  |4   |1   |UCBAT   |255 |1   |4   |4   |0x06|-   |0     |-   |-   |-   |0   |-   |-     |-     |-   |0   |-",
    "--- end list ---"
   ],
   "netwversion": [
    "Network:",
    "--- start list ---",
    "node|type    |version",
    "1   |BOX     |16010.10.4.0",
    "2   |VLVRH   |12035.5.3.0",
    "3   |VLVCO2  |12035.5.3.0",
    "4   |VLVCO2  |12035.5.3.0",
    "5   |UC      |12030.8.0.0",
    "6   |CLIMA   |13011.5.4.0",
    "7   |UCBAT   |---",
    "--- end list ---"
   ],
   "netwserial": [
    "Network:",
    "--- start list ---",
    "node|type    |version",
    "1   |BOX     |PS0000000001",
    "2   |VLVRH   |RS0000000002",
    "3   |VLVCO2  |RS0000000004",
    "4   |VLVCO2  |RS0000000005",
    "5   |UC      |RS0000000003",
    "6   |CLIMA   |RS0000000006",
    "7   |UCBAT   |---",
    "--- end list ---"
   ],
   "nodeparaget 2 0": [
    "Get PARA 0 of NODE 2",
    "--> 12035",
    "Done"
   ],
   "nodeparaget 3 0": [
    "Get PARA 0 of NODE 3",
    "--> 12035",
    "Done"
   ],
   "boardinfo": [
    "BootSW : 16013.2.0.0",
    "Serial : PS0000000001",
    "Board  : DUCO BMB FOCUS   3V3",
    "Family : F:30 - C:1",
    "DevId  : 0x00000000 [0x00000000]",
    "DevType: 17",
    "SubType: 1",
    "WeekCnt: 234",
    "BootCnt: 18",
    "Done"
   ],
   "nodeparaget 4 0": [
    "Get PARA 0 of NODE 4",
    "--> 12035",
    "Done"
   ],
   "sensorinfo": [
    "[SENSOR] INFO"
   ],
   "nodeparaget 5 0": [
    "Get PARA 0 of NODE 5",
    "--> 12030",
    "Done"
   ],
   "nightboostinfo": [
    "[NIGHTBOOST] CONDITIONS",
    "Temperature outside:   1000",
    "Temperature e_ref:   0 [178]",
    "Temperature e_ref Threshold:   120",
    "-----------------------------",
    "Zone ID:       2",
    "Temperature:   179",
    "Req. value:    0",
    "T_outside known                FALSE",
    "T_in_zone > T_start            FALSE",
    "-----------------------------",
    "Zone ID:       3",
    "Temperature:   231",
    "Req. value:    0",
    "T_outside known                FALSE",
    "T_in_zone > T_start            FALSE",
    "-----------------------------",
    "Zone ID:       4",
    "Temperature:   214",
    "Req. value:    0",
    "T_outside known                FALSE",
    "T_in_zone > T_start            FALSE",
    "Done"
   ],
   "nodeparaget 6 0": [
    "Get PARA 0 of NODE 6",
    "Failed"
   ],
   "ventcoolinfo": [
    "[VENTCOOL] INFO",
    "Status:                FALSE",
    "t_now:                 Monday 21:11",
    "T_e_ref                83 [.1°C]",
    "T_e_ref_threshold      120 [.1°C]",
    "T_inside:              201 [.1°C]",
    "T_inside_min:          204 [.1°C]",
    "T_inside_max:          244 [.1°C]",
    "T_inside_conf:         220 [.1°C]",
    "T_outside:             96 [.1°C]",
    "[VENTCOOL] CONDITIONS",
    "t_now > t_start:                       FALSE",
    "t_now > t_stop:                        TRUE",
    "T_e_ref > T_e_ref_threshold:           FALSE",
    "T_in > T_out + 3:                      TRUE",
    "T_in > T_in_min + 1:                   FALSE",
    "T_in > T_out + 1:                      TRUE",
    "T_in > T_in_min - 1:                   TRUE",
    "Vent cooling active last 24h:          FALSE",
    "T_in > T_in_max (>30 min last 24h):    FALSE",
    "T_in > T_in_conf (>30 min last 24h):   FALSE",
    "CO2 descending (last 15min):           FALSE",
    "Storm detected:                        FALSE"
   ],
   "nodeparaget 7 0": [
    "Get PARA 0 of NODE 7",
    "Failed"
   ],
   "autohcinfo": [
    "AUTO HEADCOUNT INFO",
    "- Active               FALSE",
    "- HeadCount Estim      0.000",
    "- Second Count         0",
    "- Output Integral      0",
    "- Save Delay Count     0",
    "- Last CO2 value       0",
    "Done"
   ],
   "nodeinfo 2": [
    "Node    2",
    "ApplSW  12035.5.3.0",
    "Serial  RS0000000002",
    "WeekCnt 233",
    "BootCnt 26",
    "Done"
   ],
   "nodeconfigget 2": [
    " 1. AutoMin        :   10 %    [10:5:100]",
    " 2. AutoMax        :  100 %    [10:5:100]",
    " 3. Capacity       :   60 m3/h [0:5:500]",
    " 5. RH Setpoint    :   80 %    [0:5:90]",
    " 6. RH Delta       :  OFF (0)  [0:1:1]",
    " 7. Manual 1       :   10 %    [0:5:75]",
    " 8. Manual 2       :   75 %    [10:5:100]",
    " 9. Manual 3       :  100 %    [75:5:100]",
    "10. Manual Timeout :   25 min  [5:5:9995]",
    "Done"
   ],
   "nodeinfo 5": [
    "Node    5",
    "ApplSW  12030.8.0.0",
    "Serial  RS0000000003",
    "WeekCnt 78",
    "BootCnt 14",
    "Done"
   ],
   "nodeconfigget 5": [
    " 7. Manual 1       :   10 %    [0:5:75]",
    " 8. Manual 2       :   75 %    [10:5:100]",
    " 9. Manual 3       :  100 %    [75:5:100]",
    "10. Manual Timeout :   25 min  [5:5:9995]",
    "Done"
   ],
   "nodeinfo 3": [
    "Node    3",
    "ApplSW  12035.5.3.0",
    "Serial  RS0000000004",
    "WeekCnt 230",
    "BootCnt 24",
    "Done"
   ],
   "nodeconfigget 3": [
    " 1. AutoMin        :   10 %    [10:5:100]",
    " 2. AutoMax        :  100 %    [10:5:100]",
    " 3. Capacity       :   60 m3/h [0:5:500]",
    " 4. CO2 Setpoint   :  900 ppm  [0:10:2000]",
    " 7. Manual 1       :   10 %    [0:5:60]",
    " 8. Manual 2       :   60 %    [10:5:100]",
    " 9. Manual 3       :  100 %    [60:5:100]",
    "10. Manual Timeout :   30 min  [5:5:9995]",
    "15. Temp Dependent :  OFF (0)  [0:1:1]",
    "Done"
   ],
   "nodeparaget 3 66": [
    "Get PARA 66 of NODE 3",
    "--> 100",
    "Done"
   ],
   "nodeparaget 3 70": [
    "Get PARA 70 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 71": [
    "Get PARA 71 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 72": [
    "Get PARA 72 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 76": [
    "Get PARA 76 of NODE 3",
    "--> 40309",
    "Done"
   ],
   "nodeparaget 3 77": [
    "Get PARA 77 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 78": [
    "Get PARA 78 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 128": [
    "Get PARA 128 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 199": [
    "Get PARA 199 of NODE 3",
    "--> 550",
    "Done"
   ],
   "nodeparaget 3 201": [
    "Get PARA 201 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 202": [
    "Get PARA 202 of NODE 3",
    "--> 10000",
    "Done"
   ],
   "nodeparaget 3 204": [
    "Get PARA 204 of NODE 3",
    "--> 100",
    "Done"
   ],
   "nodeparaget 3 205": [
    "Get PARA 205 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 208": [
    "Get PARA 208 of NODE 3",
    "--> 1",
    "Done"
   ],
   "nodeparaget 3 256": [
    "Get PARA 256 of NODE 3",
    "--> 60",
    "Done"
   ],
   "nodeinfo 4": [
    "Node    4",
    "ApplSW  12035.5.3.0",
    "Serial  RS0000000005",
    "WeekCnt 233",
    "BootCnt 19",
    "Done"
   ],
   "nodeconfigget 4": [
    " 1. AutoMin        :   10 %    [10:5:100]",
    " 2. AutoMax        :  100 %    [10:5:100]",
    " 3. Capacity       :   60 m3/h [0:5:500]",
    " 4. CO2 Setpoint   :  900 ppm  [0:10:2000]",
    " 7. Manual 1       :   10 %    [0:5:60]",
    " 8. Manual 2       :   60 %    [10:5:100]",
    " 9. Manual 3       :  100 %    [60:5:100]",
    "10. Manual Timeout :   30 min  [5:5:9995]",
    "15. Temp Dependent :  OFF (0)  [0:1:1]",
    "Done"
   ],
   "nodeinfo 6": [
    "Node    6",
    "ApplSW  13011.5.4.0",
    "Serial  RS0000000006",
    "WeekCnt 219",
    "BootCnt 3",
    "Done"
   ],
   "nodeconfigget 6": [
    " 1. AutoMin        :    0 %    [0:5:100]",
    " 2. AutoMax        :  100 %    [0:5:100]",
    " 3. Capacity       :   70 m3/h [0:5:100]",
    " 7. Manual 1       :    0 %    [0:5:50]",
    " 8. Manual 2       :   50 %    [0:5:100]",
    " 9. Manual 3       :  100 %    [50:5:100]",
    "10. Manual Timeout :   30 min  [5:5:9995]",
    "Done"
   ],
   "nodeinfo 7": [
    "Node    7",
    "Search 4 (0x10)"
   ],
   "nodeconfigget 7": [
    " 7. Manual 1       :   10 %    [0:5:60]",
    " 8. Manual 2       :   60 %    [10:5:100]",
    " 9. Manual 3       :  100 %    [60:5:100]",
    "10. Manual Timeout :   30 min  [5:5:9995]",
    "Done"
   ],
   "weatherstationinfo": [
    "---------- WEATHER STATION ----------",
    "Present:           FALSE",
    "Temp:              0 °dC",
    "Wind:              0 dm/s",
    "GPS:               FALSE",
    "Rain:              FALSE",
    "Sun South:         0 kLux",
    "Sun East:          0 kLux",
    "Sun West:          0 kLux",
    "Light:             0 Lux",
    "Last GPS Time:     00/00/0000 00:00:00",
    "Azimuth:           0 /10 Degree",
    "Elevation:         0 /10 Degree",
    "Longitude:         0 /100 Degree",
    "Latitude:          0 /100 Degree",
    "-------------------------------------",
    "Done"
   ],
   "commnlinfo": [
    "[NL PSIRF] INFO",
    "NL State       : IDLE (0 retries)",
    "NL In Link     : FALSE",
    "NL Address     : 1",
    "NL Netw HID    : 00000000 [00000000]",
    "NL Msg Fails   : 1354",
    "NL Remove NID  : 0",
    "NL Network     :  1 - 0xFF ( 1 - 0xFF)",
    "                  2 - 0x84 ( 2 - 0xFF) F:0x00",
    "                  3 - 0x6C ( 3 - 0xFF) F:0x00",
    "                  4 - 0x00 ( 4 - 0xFF) F:0x0E"
   ],
   "comminfo": [
    "COMM INFO",
    " install state          0 : OPERATIONAL",
    " module in asso         0",
    " module in parent       1",
    " module to replace      0",
    "COMM WI",
    " comm state             0 : IDLE",
    " module in pdo          132",
    " pdo msg counter        62437",
    "COMM RF",
    " comm state             2 : SUCCESS",
    " module in pdo          4",
    " pdo msg counter        4063"
   ],
   "commdllinfo": [
    "[DLL PSIRF] INFO",
    "DLL State       : RX_ACTIVE",
    "DLL CCxx Regs   : 09 2E 07 47 D3 91 20 0C 05 00 00 06 00 21 65 5C",
    "                  CA 83 13 22 F8 35 07 2F 08 16 6C 43 40 91 87 6B",
    "                  FB 56 10 E9 2A 00 1F 41 00 59 7F 3F 81 35 09",
    "DLL CCxx PA Tbl : C1 00 00 00 00 00 00 00",
    "DLL TX Delay    : 15",
    "DLL RX Buffer   : 0D 07 00 14 51 80 08 02 01 FF 20 00 52 00",
    "DLL TX Buffer   : 09 06 00 04 37 7E 08 C2 3C FF"
   ],
   "sensorctrlinfo": [
    " 0. HUM OUTPUT REQ.             :       0 (%)     ",
    " 1. CO2 OUTPUT REQ.             :       0 (%)     ",
    "Done"
   ],
   "fanperformget": [
    " - Press Total       : 241 Pa",
    " - Press Out         :  42 Pa",
    " - Press Valve 2    : 100 Pa",
    " - Press Valve 3    : 140 Pa",
    " - Press Valve 4    : 199 Pa",
    " - Power Now         :   5 W",
    " - Power Avg         :   5 W",
    " - Power Max         :  36 W",
    "Done"
   ],
   "rfarbitratorinfo": [
    "Rf allowed by user:        TRUE",
    "Rf allowed by arbitrator:  TRUE"
   ],
   "bmbreplaceinfo": [
    "BMB to SD state: IDLE",
    "SD state to BMB: IDLE"
   ],
   "swuploadstatus": [
    " - State               : IDLE - IDLE",
    " - Node                : 0",
    " - Product             : 0.0.0.0",
    " - Progress            : 0/0 (0%)",
    "Done"
   ],
   "coregeterror": [
    "No error",
    "Done"
   ],
   "rtcgettime": [
    "[RTC] MONDAY 26/10/2026 21:10:15",
    "Done"
   ],
   "logprint": [
    " 0: node   1 : POWERUP (0)",
    "Done"
   ],
   "autohcparaget": [
    " 0. ENABLED          : FALSE (0)",
    " 1. CO2 NODE         : 0",
    " 2. FLOWRATE         : 75 [m3/h]",
    " 3. VOLUME           : 150 [m3]",
    " 4. VOLUME FIXED     : FALSE (0)",
    " 5. FILTER ORDER     : 8 [0:16]",
    "Done"
   ],
   "commalp2pinfo": [
    "COMM P2P Info",
    "chn | srv |  id | active | rpl.to",
    "  1 |   1 |   0 |  FALSE |      0",
    "  1 |   3 |  92 |  FALSE |      0",
    "  1 |   4 |  86 |  FALSE |      0",
    "  1 |   6 |   0 |  FALSE |      0",
    "  1 |   9 |   0 |  FALSE |      0",
    "chn | req |  id | active | ack.to | rsp.to",
    "  1 |   2 |  90 |   TRUE |     88 |   5000",
    "  1 |   8 |  90 |   TRUE |     88 |   5000",
    "  1 |   7 |  90 |   TRUE |     88 |   5000",
    "Done"
   ],
   "corebufferinfo": [
    "CoreBuffer",
    " 0 -   51/51   - CoreTerm_SciQRx",
    " 1 -  513/513  - CoreLog_DataQ",
    " 2 -  101/101  - CoreLog_SciQTx",
    " 3 -   16/16   - Hd44780",
    " 4 -  257/257  - P2P DLL Rx",
    " 5 -  257/257  - P2P DLL Tx",
    " 6 -   16/130  - P2P out",
    " 7 -    0/21   - SenseAirS8_SciQRx",
    " 8 -   21/21   - SenseAirS8_SciQTx",
    " 9 -  297/297  - CommDllPsiRf_OutboxQ",
    "10 -  297/297  - CommDllPsiRf_InboxQ",
    "11 -  442/442  - CommNlPsiRf_Queue",
    "12 -    0/10   - NetwAct",
    "13 -   36/36   - PDO",
    "14 -  101/101  - RfSwitch",
    "15 -   73/100  - display_text_buffer",
    "16 -    2/2    - display_text_ofset_counter",
    "Use: 2771/3000"
   ],
   "coreinfo": [
    "Core",
    "- state     : APP ACTIVE ",
    "- stack hwm : 339/1023"
   ],
   "coreqinfo": [
    "CoreQ",
    " 1 -    1/50   - HWM   32 [1b] - CoreTerm_SciQRx",
    " 2 -    0/512  - HWM  285 [1b] - CoreLog_DataQ",
    " 3 -   20/100  - HWM    0 [1b] - CoreLog_SciQTx",
    " 4 -    0/256  - HWM  225 [1b] - P2P DLL Rx",
    " 5 -    0/256  - HWM  202 [1b] - P2P DLL Tx",
    " 6 -    0/20   - HWM   20 [1b] - SenseAirS8_SciQRx",
    " 7 -    0/20   - HWM   12 [1b] - SenseAirS8_SciQTx",
    " 8 -    0/8    - HWM    6 [33b] - CommDllPsiRf_OutboxQ",
    " 9 -    0/8    - HWM    0 [33b] - CommDllPsiRf_InboxQ",
    "10 -    0/16   - HWM   12 [26b] - CommNlPsiRf_Queue",
    "11 -    0/4    - HWM    4 [2b] - NetwAct",
    "12 -    0/5    - HWM    0 [6b] - PDO",
    "13 -    0/100  - HWM   85 [1b] - RfSwitch",
    "Use: 13/15",
    "Done"
   ],
   "coretaskinfo": [
    "CoreTask",
    " 1 -     1000 us - PRIO 200 [A] - Hd44780",
    " 2 -   300000 us - PRIO 128 [S] - BrdFanTimeoutTask",
    " 3 -   400000 us - PRIO 128 [S] - DataMngr",
    " 4 -  1000000 us - PRIO 130 [A] - OneSecTask",
    " 5 -     1000 us - PRIO 128 [A] - P2P TO",
    " 6 -     1000 us - PRIO 128 [A] - P2P present TO",
    " 7 -   100000 us - PRIO 128 [S] - P2PCoreAction",
    " 8 -   250000 us - PRIO 128 [A] - P2PCommIO",
    " 9 -  2000000 us - PRIO 128 [S] - P2PCommIO_TO",
    "10 -   100000 us - PRIO 128 [A] - Local Sensor",
    "11 -   250000 us - PRIO 128 [A] - P2PCommIOPara",
    "12 -   250000 us - PRIO 128 [A] - P2PCommSwUpl",
    "13 -   200000 us - PRIO 128 [A] - Sensor",
    "14 -     1000 us - PRIO 120 [S] - SenseAirS8",
    "15 -    50000 us - PRIO 128 [A] - FanSpeedFilter",
    "16 -  1000000 us - PRIO 128 [S] - CommDllPsiRfStateTO",
    "17 -     5000 us - PRIO 64 [A] - CommDllPsiRfHandlerTO",
    "18 -  1000000 us - PRIO 128 [A] - CommDllPsiRfCalib",
    "19 -    20000 us - PRIO 128 [S] - CommNlPsiRfTo",
    "20 -    75000 us - PRIO 128 [S] - CommNlPsiRfReveal",
    "21 -   150000 us - PRIO 140 [S] - SciSwitch TO",
    "22 -     3001 us - PRIO 255 [S] - Modbus_3_5",
    "23 -  1000000 us - PRIO 100 [A] - RTC task tick",
    "24 -  1000000 us - PRIO 128 [A] - RTC task update",
    "25 -     1000 us - PRIO 127 [A] - DLL MPCM",
    "26 -     1000 us - PRIO 128 [A] - NL MPCM",
    "27 -   100000 us - PRIO 127 [A] - RGBLed",
    "28 - 60000000 us - PRIO 128 [S] - FanCalib",
    "29 -     1000 us - PRIO 128 [A] - FanControl",
    "30 -    10000 us - PRIO 128 [A] - ButtonEvent",
    "31 -   500000 us - PRIO 150 [A] - DrvCharDisplay",
    "32 -   100000 us - PRIO 200 [A] - Gui",
    "33 -    10000 us - PRIO 128 [A] - P2PBmbReplace",
    "Use: 33/45",
    "Period: 1000 [us]",
    "Done"
   ],
   "datainfo": [
    "[DATAMNGR] INFO (sw16010 - v1 - OK)",
    "idx|name      |mid|size|ver|l2d|state",
    " 0 |BOARD     |  0|  12|  4| no|OK",
    " 1 |SNSR CTRL |  9|  44|  5|yes|OK",
    " 2 |RF DLL    | 12|  55|  2|yes|OK",
    " 3 |RF NL     |  2|  76|  1| no|OK",
    " 4 |RFARBITR  | 53|   1|  1|yes|OK",
    " 5 |TIME      | 48|   2|  2|yes|OK",
    " 6 |VENTCTRL  | 56|   5|  0|yes|OK",
    " 7 |NETWORK   | 41| 900|  6| no|OK",
    " 8 |DEVPARA   | 43|1800|  6| no|OK",
    " 9 |RFSWITCH  | 57|  32|  0| no|OK",
    " 10|VENTCOOL  | 49|  14|  2|yes|OK",
    " 11|NIGHTBOOST| 50|  10|  2|yes|OK",
    " 12|FAN CALIB | 42| 260|  3|yes|OK",
    " 13|FAN CTRL  | 44|  28|  7| no|OK",
    " 14|AUTOHDCNT | 52|   8|  1|yes|OK",
    "Use: 15/20",
    "Done"
   ],
   "fancalib": [
    "FAN CALIB [OK - IDLE]",
    "error : NONE (0x0000)",
    "node|speed |dPf   |Qout  |kvalue",
    "ALL |2174  |277   |210   |40705 ",
    "2   |2261  |299   |145   |466944",
    "3   |2273  |303   |134   |653712",
    "4   |2284  |305   |123   |925424",
    "Done"
   ],
   "fangetspeed": [
    "FanSpeed (fan 1)",
    "- Actual   :  775 [rpm]",
    "- Filtered :  765 [rpm]",
    "- Average  :  768 [rpm]",
    "Done"
   ],
   "fanparaget": [
    " 0. AUTO CALIB                  :       0 (OFF)   [0:1:1]",
    " 1. MAX HIGH LEVEL              :     100 (%)     [0:1:255]",
    " 2. MIN FAN SPEED               :     400 (rpm)   [0:1:65535]",
    " 3. K_LEK BOX                   : 23000000 (/2^24) [0:1:4294967295]",
    " 4. K_LEK VALVE                 : 13421773 (/2^24) [6800830:1:4294967295]",
    " 5. MAX FAN OUT                 :     100 (%)     [0:1:100]",
    " 6. K LEK FRACTION              :   34560 ((1/Kn^N)*2^16) [1:1:65535]",
    " 7. CALIB ON MAN2               :       0 (FALSE) [0:1:1]",
    " 8. GROUND BOUND                :       1 (TRUE)  [0:1:1]",
    " 9. HEAD COUNT                  :       4 (ppl)   [1:1:4]",
    "10. FAN CURVE                   :       1 ()      [0:1:1]",
    "11. P100 SPEED                  :    2000 (rpm)   [0:1:65535]",
    "12. P100 DELTA FLOW             :       0 (m^3/h*16) [-30000:1:30000]",
    "13. P200 SPEED                  :    2200 (rpm)   [0:1:65535]",
    "14. P200 DELTA FLOW             :       0 (m^3/h*16) [-30000:1:30000]",
    "15. PWM INVERTED                :       0 (FALSE) [0:1:1]",
    "Done"
   ],
   "ioparaget": [
    "MODBUS PARA (0) [RW]",
    " 0. ADDRESS          : 0 [1-253]",
    " 1. OFFFSET          : 0 [0-1]",
    " 2. SPEED            : 4800 [bps] (0) [0-6]",
    " 3. PARITY           : NONE (0) [0-2]",
    " 4. STOPBIT          : 0 [1-2]",
    "ETHERNET PARA (1) [RW]",
    " 0. IP ADDRESS       : 0.0.0.0",
    " 1. NETWORK MASK     : 0.0.0.0",
    " 2. DEFAULT GATEWAY  : 0.0.0.0",
    " 3. DHCP ACTIVE      : FALSE (0) [0-1]",
    " 4. HOSTNAME NUMBER  : 0 (duco000.local) [1-255]",
    "ETHERNET INFO (2) [RO]",
    " 0. IP ADDRESS       : 0.0.0.0",
    " 1. GATEWAY          : 0.0.0.0",
    " 2. MAC ADDRESS      : xx:xx:00:00:00:00",
    "BOARD INFO (3) [RO]",
    " 0. SW PRODUCT       : 0",
    " 1. SW VERSION       : 0",
    " 2. SW REVISION      : 0",
    " 3. SW TEST          : 0",
    " 4. UPTIME           : 0",
    "Done"
   ],
   "mpcmdllinfo": [
    "   State - RXstate - TXstate",
    "0. IDLE  - IDLE    - IDLE  ",
    "Done"
   ],
   "nightboostparaget": [
    " 1. ACTIVE               : FALSE",
    " 2. TEMPERATURE SETPOINT : 24 [°C]",
    " 3. START MONTH          : MAY",
    " 4. STOP MONTH           : SEPTEMBER",
    " 5. START TIME           :  1:00",
    " 6. STOP TIME            :  6:00",
    "Done"
   ],
   "nodeparalist": [
    "General",
    " 21 - DEVICE_SUBTYPE",
    " 22 - RF_POWER_LEVEL",
    " 24 - DEVICE_WEEKCOUNT",
    " 25 - DEVICE_BOOTCOUNT",
    " 70 - STATUS_OF_GRATING_UNIT",
    " 71 - ERROR_CODE",
    " 72 - ERROR_DATA",
    " 73 - TEMPERATURE",
    " 74 - CO2_AVERAGE_VAL",
    " 75 - HUM_SENSOR_VAL",
    " 79 - PRESSURE_VAL",
    "Sensor Control",
    "137 - CO2SETPOINT",
    "128 - CO2CTRL_GRATING",
    "164 - CO2TEMPCOMP_ACTIVE",
    "165 - CO2TOILETMODE_ACTIVE",
    "138 - HUMSETPOINT",
    "161 - HUMDELTA_ACTIVE",
    "166 - UC_SENSOR_VISUAL_LEVEL",
    "Motion",
    "199 - MAX_MOTOR_STEPS",
    "201 - HOMING_DIRECTION",
    "202 - STEP_TIME",
    "203 - STEP_SIZE",
    "204 - STEP_CURRENT",
    "205 - OPEN_DIRECTION",
    "Heating",
    "206 - INCOME_TEMP_REQUEST",
    "207 - EXTERN_TEMP_TRIGGER",
    "208 - UNIT_ENABLED",
    "209 - HEATER_SWITCH",
    "210 - HEATER_ACTIVE",
    "211 - HEATER_STATE",
    "212 - HEATER_TEMPERATURE",
    "213 - HEATER_TEMPERATURE_REQUESTED",
    "214 - HEATER_TEMPERATURE_INCOME",
    "215 - HEATER_TEMPERATURE_EXTERN",
    "Actuator",
    "195 - MANUAL_MODE_PERIOD",
    "216 - ACTUATOR_HYBRID",
    "217 - ACTUATOR_PWM_VOLTAGE",
    "218 - ACTUATOR_PWM_FREQUENCY",
    "219 - ACTUATOR_OUTPUT_AS_PWM",
    "220 - KEEP_POWERED_AT_END",
    "Done"
   ],
   "onesectaskinfo": [
    "OneSecTask",
    " 1 -    1 s [A] - UpTime",
    " 2 -    5 s [A] - RhCtrl",
    " 3 -   30 s [A] - Co2Ctrl",
    " 4 -    1 s [A] - FanSpeedAvg",
    " 5 -  300 s [A] - WSElsner",
    " 6 -    1 s [A] - VentCtrl",
    " 7 -  300 s [A] - InstallTimeout",
    " 8 -    4 s [S] - RF TO para read",
    " 9 -    4 s [S] - RF TO para read",
    "10 -  300 s [A] - NightBoost",
    "Use: 10/15",
    "Done"
   ],
   "oshwm": [
    " 0 - TERM       -  136 [3] - 0x200002C8",
    " 1 - SUPPORT    -  100 [2] - 0x200006D0",
    " 2 - DEV_PARA   -  108 [2] - 0x20000A18",
    " 3 - BOX_COMM   -   92 [2] - 0x20000D60",
    " 4 - RF_PDO     -  108 [2] - 0x200010A8",
    " 5 - WI_PDO     -  106 [2] - 0x200013F0",
    " 6 - RF_SWITCH  -   37 [2] - 0x20001738",
    " 7 - VENT_COOL  -  102 [2] - 0x20001960",
    " 8 - P2PNODCOM  -  106 [2] - 0x20001CA8",
    " 9 - IDLE       -   88 [0] - 0x20001FF0",
    "Use : 10/15",
    "Free Heap Size : 1936"
   ],
   "rfswitchinfo": [
    "--- start list ---",
    "node|wired|rf",
    "--- end list ---"
   ],
   "sensorctrlparaget": [
    " 0. HUM SETPOINT                :    6000 (.01%)  [0:1:9000]",
    " 1. HUM HYSTERESIS              :       0 (.01%)  [0:1:1000]",
    " 2. HUM DELTA ACTIVE            :       0 (FALSE) [0:1:1]",
    " 3. HUM DELTA HIGH              :      15 (min)   [0:1:255]",
    " 4. HUM DELTA TIME 0            :       2 (5s)    [0:1:32]",
    " 5. HUM DELTA TIME 1            :       4 (5s)    [0:1:32]",
    " 6. HUM DELTA TIME 2            :       6 (5s)    [0:1:32]",
    " 7. HUM DELTA TIME 3            :      12 (5s)    [0:1:32]",
    " 8. HUM DELTA TIME 4            :      24 (5s)    [0:1:32]",
    " 9. HUM DELTA HUM 0             :     300 (.01%)  [0:1:1000]",
    "10. HUM DELTA HUM 1             :     300 (.01%)  [0:1:1000]",
    "11. HUM DELTA HUM 2             :     400 (.01%)  [0:1:1000]",
    "12. HUM DELTA HUM 3             :     600 (.01%)  [0:1:1000]",
    "13. HUM DELTA HUM 4             :     800 (.01%)  [0:1:1000]",
    "14. CO2 SETPOINT                :     800 (ppm)   [0:1:65535]",
    "15. CO2 CTRL GRATING            :       0 (FALSE) [0:1:1]",
    "16. CO2 TEMP COMPENS            :       1 (TRUE)  [0:1:1]",
    "17. CO2 MAXOUT TEMP0            :     120 (.1°C)  [100:1:350]",
    "18. CO2 MAXOUT TEMP1            :     160 (.1°C)  [100:1:350]",
    "19. CO2 MAXOUT COMP             :      40 (%)     [0:1:100]",
    "20. CO2 SETPNT TEMP0            :     160 (.1°C)  [100:1:350]",
    "21. CO2 SETPNT TEMP1            :     180 (.1°C)  [100:1:350]",
    "22. CO2 SETPNT TEMP2            :     220 (.1°C)  [100:1:350]",
    "23. CO2 SETPNT TEMP3            :     240 (.1°C)  [100:1:350]",
    "24. CO2 SETPNT COMP             :     300 (%)     [0:1:1000]",
    "25. CO2 TOILET MODE             :       0 (FALSE) [0:1:1]",
    "26. CO2 TLT 30S HYST            :      20 (ppm)   [1:1:200]",
    "27. CO2 TLT 60S HYST            :      40 (ppm)   [1:1:200]",
    "28. CO2 TLT LONGDTCT            :       4 (30s)   [1:1:200]",
    "29. CO2 TLT FADELONG            :      30 (30s)   [1:1:200]",
    "30. CO2 TLT FADESHRT            :       2 (30s)   [1:1:200]",
    "31. CO2 HYSTERESIS              :     100 (ppm)   [1:1:200]",
    "Done"
   ],
   "servicecode": [
    "- Code: 0a0000000000e000t000g000",
    "- Stat: 6/7",
    "Done"
   ],
   "ventcoolparaget": [
    " 1. ACTIVE ON Monday    : FALSE",
    " 2. ACTIVE ON Tuesday   : FALSE",
    " 3. ACTIVE ON Wednesday : FALSE",
    " 4. ACTIVE ON Thursday  : FALSE",
    " 5. ACTIVE ON Friday    : FALSE",
    " 6. ACTIVE ON Saturday  : FALSE",
    " 7. ACTIVE ON Sunday    : FALSE",
    " 8. START TIME          : 22:00 (1320)",
    " 9. STOP TIME           :  6:00 (360)",
    "10. MODE                : OFF",
    "11. MAX WIND SPEED      : 110 [dm/s]",
    "Done"
   ],
   "ventctrlparaget": [
    " 0. BALANCE THRESH.  : 10 [%]",
    " 1. CTRL TEMP DEP.   : 1 (TRUE)",
    " 2. CTRL TEMP LOW    : 160 [.1°C]",
    " 3. CTRL TEMP HIGH   : 240 [.1°C]",
    " 4. MAX MOVING MOTORS: 20",
    "Done"
   ],
   "nodeconfigget 1": [
    " 1. AutoMin        :   10 %    [10:5:100]",
    " 2. AutoMax        :  100 %    [10:5:100]",
    " 3. Capacity       :    0 m3/h [0:5:750]",
    " 7. Manual 1       :   15 %    [0:5:50]",
    " 8. Manual 2       :   50 %    [15:5:100]",
    " 9. Manual 3       :  100 %    [50:5:100]",
    "10. Manual Timeout :   15 min  [5:5:9995]",
    "Done"
   ],
   "nodeinfo 1": [
    "Node    1",
    "ApplSW  Failed",
    "Serial  Failed",
    "Counter Failed",
    "Done"
   ],
   "nodeparaget 1 21": [
    "Get PARA 21 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 22": [
    "Get PARA 22 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 24": [
    "Get PARA 24 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 25": [
    "Get PARA 25 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 70": [
    "Get PARA 70 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 71": [
    "Get PARA 71 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 72": [
    "Get PARA 72 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 73": [
    "Get PARA 73 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 74": [
    "Get PARA 74 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 75": [
    "Get PARA 75 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 79": [
    "Get PARA 79 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 128": [
    "Get PARA 128 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 137": [
    "Get PARA 137 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 138": [
    "Get PARA 138 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 161": [
    "Get PARA 161 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 164": [
    "Get PARA 164 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 165": [
    "Get PARA 165 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 166": [
    "Get PARA 166 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 195": [
    "Get PARA 195 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 199": [
    "Get PARA 199 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 201": [
    "Get PARA 201 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 202": [
    "Get PARA 202 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 203": [
    "Get PARA 203 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 204": [
    "Get PARA 204 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 205": [
    "Get PARA 205 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 206": [
    "Get PARA 206 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 207": [
    "Get PARA 207 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 208": [
    "Get PARA 208 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 209": [
    "Get PARA 209 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 210": [
    "Get PARA 210 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 211": [
    "Get PARA 211 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 212": [
    "Get PARA 212 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 213": [
    "Get PARA 213 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 214": [
    "Get PARA 214 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 215": [
    "Get PARA 215 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 216": [
    "Get PARA 216 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 217": [
    "Get PARA 217 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 218": [
    "Get PARA 218 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 219": [
    "Get PARA 219 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 220": [
    "Get PARA 220 of NODE 1",
    "Failed"
   ],
   "nodeparaget 2 66": [
    "Get PARA 66 of NODE 2",
    "--> 7",
    "Done"
   ],
   "nodeparaget 2 70": [
    "Get PARA 70 of NODE 2",
    "--> 0",
    "Done"
   ],
   "nodeparaget 2 71": [
    "Get PARA 71 of NODE 2",
    "--> 0",
    "Done"
   ],
   "nodeparaget 2 72": [
    "Get PARA 72 of NODE 2",
    "--> 0",
    "Done"
   ],
   "nodeparaget 2 76": [
    "Get PARA 76 of NODE 2",
    "--> 40309",
    "Done"
   ],
   "nodeparaget 2 77": [
    "Get PARA 77 of NODE 2",
    "--> 0",
    "Done"
   ],
   "nodeparaget 2 78": [
    "Get PARA 78 of NODE 2",
    "--> 0",
    "Done"
   ],
   "nodeparaget 2 128": [
    "Get PARA 128 of NODE 2",
    "--> 0",
    "Done"
   ],
   "nodeparaget 2 199": [
    "Get PARA 199 of NODE 2",
    "--> 550",
    "Done"
   ],
   "nodeparaget 2 201": [
    "Get PARA 201 of NODE 2",
    "--> 0",
    "Done"
   ],
   "nodeparaget 2 202": [
    "Get PARA 202 of NODE 2",
    "--> 10000",
    "Done"
   ],
   "nodeparaget 2 204": [
    "Get PARA 204 of NODE 2",
    "--> 100",
    "Done"
   ],
   "nodeparaget 2 205": [
    "Get PARA 205 of NODE 2",
    "--> 0",
    "Done"
   ],
   "nodeparaget 2 208": [
    "Get PARA 208 of NODE 2",
    "--> 1",
    "Done"
   ],
   "nodeparaget 2 256": [
    "Get PARA 256 of NODE 2",
    "--> 60",
    "Done"
   ],
   "nodeparaget 4 66": [
    "Get PARA 66 of NODE 4",
    "--> 0",
    "Done"
   ],
   "nodeparaget 4 70": [
    "Get PARA 70 of NODE 4",
    "--> 0",
    "Done"
   ],
   "nodeparaget 4 71": [
    "Get PARA 71 of NODE 4",
    "--> 0",
    "Done"
   ],
   "nodeparaget 4 72": [
    "Get PARA 72 of NODE 4",
    "--> 0",
    "Done"
   ],
   "nodeparaget 4 76": [
    "Get PARA 76 of NODE 4",
    "--> 54007",
    "Done"
   ],
   "nodeparaget 4 77": [
    "Get PARA 77 of NODE 4",
    "--> 0",
    "Done"
   ],
   "nodeparaget 4 78": [
    "Get PARA 78 of NODE 4",
    "--> 0",
    "Done"
   ],
   "nodeparaget 4 128": [
    "Get PARA 128 of NODE 4",
    "--> 1",
    "Done"
   ],
   "nodeparaget 4 199": [
    "Get PARA 199 of NODE 4",
    "--> 550",
    "Done"
   ],
   "nodeparaget 4 201": [
    "Get PARA 201 of NODE 4",
    "--> 0",
    "Done"
   ],
   "nodeparaget 4 202": [
    "Get PARA 202 of NODE 4",
    "--> 10000",
    "Done"
   ],
   "nodeparaget 4 204": [
    "Get PARA 204 of NODE 4",
    "--> 100",
    "Done"
   ],
   "nodeparaget 4 205": [
    "Get PARA 205 of NODE 4",
    "--> 0",
    "Done"
   ],
   "nodeparaget 4 208": [
    "Get PARA 208 of NODE 4",
    "--> 1",
    "Done"
   ],
   "nodeparaget 4 256": [
    "Get PARA 256 of NODE 4",
    "--> 60",
    "Done"
   ],
   "nodeparaget 5 76": [
    "Get PARA 76 of NODE 5",
    "--> 15352",
    "Done"
   ],
   "nodeparaget 5 77": [
    "Get PARA 77 of NODE 5",
    "--> 0",
    "Done"
   ],
   "nodeparaget 5 78": [
    "Get PARA 78 of NODE 5",
    "--> 0",
    "Done"
   ],
   "nodeparaget 5 162": [
    "Get PARA 162 of NODE 5",
    "--> 127",
    "Done"
   ],
   "nodeparaget 5 163": [
    "Get PARA 163 of NODE 5",
    "--> 0",
    "Done"
   ],
   "nodeparaget 6 66": [
    "Get PARA 66 of NODE 6",
    "--> 0",
    "Done"
   ],
   "nodeparaget 6 70": [
    "Get PARA 70 of NODE 6",
    "--> 0",
    "Done"
   ],
   "nodeparaget 6 71": [
    "Get PARA 71 of NODE 6",
    "--> 0",
    "Done"
   ],
   "nodeparaget 6 72": [
    "Get PARA 72 of NODE 6",
    "--> 0",
    "Done"
   ],
   "nodeparaget 6 76": [
    "Get PARA 76 of NODE 6",
    "--> 40321",
    "Done"
   ],
   "nodeparaget 6 199": [
    "Get PARA 199 of NODE 6",
    "--> 3000",
    "Done"
   ],
   "nodeparaget 6 201": [
    "Get PARA 201 of NODE 6",
    "Failed"
   ],
   "nodeparaget 6 202": [
    "Get PARA 202 of NODE 6",
    "--> 850",
    "Done"
   ],
   "nodeparaget 6 203": [
    "Get PARA 203 of NODE 6",
    "--> 5",
    "Done"
   ],
   "nodeparaget 6 204": [
    "Get PARA 204 of NODE 6",
    "--> 12",
    "Done"
   ],
   "nodeparaget 6 205": [
    "Get PARA 205 of NODE 6",
    "--> 1",
    "Done"
   ],
   "nodeparaget 6 206": [
    "Get PARA 206 of NODE 6",
    "Failed"
   ],
   "nodeparaget 6 207": [
    "Get PARA 207 of NODE 6",
    "--> 120",
    "Done"
   ],
   "nodeparaget 6 208": [
    "Get PARA 208 of NODE 6",
    "--> 1",
    "Done"
   ],
   "nodeparaget 6 209": [
    "Get PARA 209 of NODE 6",
    "--> 1",
    "Done"
   ],
   "nodeparaget 6 210": [
    "Get PARA 210 of NODE 6",
    "--> 0",
    "Done"
   ],
   "nodeparaget 6 211": [
    "Get PARA 211 of NODE 6",
    "--> 0",
    "Done"
   ],
   "nodeparaget 6 212": [
    "Get PARA 212 of NODE 6",
    "--> 162",
    "Done"
   ],
   "nodeparaget 6 213": [
    "Get PARA 213 of NODE 6",
    "--> 64686",
    "Done"
   ],
   "nodeparaget 6 214": [
    "Get PARA 214 of NODE 6",
    "--> 177",
    "Done"
   ],
   "nodeparaget 6 215": [
    "Get PARA 215 of NODE 6",
    "--> 98",
    "Done"
   ],
   "nodeparaget 7 76": [
    "Get PARA 76 of NODE 7",
    "Failed"
   ],
   "nodeparaget 7 77": [
    "Get PARA 77 of NODE 7",
    "Failed"
   ],
   "nodeparaget 7 78": [
    "Get PARA 78 of NODE 7",
    "Failed"
   ],
   "nodeparaget 7 162": [
    "Get PARA 162 of NODE 7",
    "Failed"
   ],
   "nodeparaget 7 163": [
    "Get PARA 163 of NODE 7",
    "Failed"
   ]
  }
 },
 {
  "id": "silent-connect-10.4.0",
  "label": "DucoBox Silent Connect 16056.10.4.0 — afgeleid van de Focus",
  "family": "silent-connect",
  "productVersion": 16056,
  "version": "10.4.0",
  "canned": {
   "help /all": [
    "-------------------------------------------------",
    "Command Help []",
    "-------------------------------------------------",
    "AutoHcInfo                  AUTO HEADCOUNT info",
    "AutoHcParaGet               AUTO HEADCOUNT get parameter values",
    "AutoHcParaSet a b           AUTO HEADCOUNT set parameter a (0-3) to b",
    "BMBReplaceInfo              BMBREPLACE Print replace info",
    "BMBReplaceToBmb             BMBREPLACE copy data from SD card to BMB",
    "BMBReplaceToSd              BMBREPLACE copy data from BMB to SD card",
    "BoardInfo                   BOARD info",
    "BoardSet a b                BOARD set subtype",
    "BootMode                    Reset the board into bootmode",
    "CommAlP2PInfo               COMM P2P Info",
    "CommDllDefaults             Comm DLL set register to defaults",
    "CommDllInfo                 Comm DLL info",
    "CommDllSetReg a b           Comm DLL set register a (0-46|100-107) to b",
    "CommInfo                    COMM info",
    "CommNlInfo                  Comm NL info",
    "CoreBufferInfo              CORE buffer info",
    "CoreGetError                CORE get error",
    "CoreInfo                    CORE info",
    "CoreLogLevel a              CORE set log level",
    "CoreQInfo                   CORE queue info",
    "CoreTaskInfo                CORE task info",
    "DataClear a                 DATAMNGR clear data",
    "DataDefaults                DATAMNGR load default data in RAM",
    "DataInfo                    DATAMNGR info",
    "DataRaw a                   DATAMNGR print raw data",
    "DataSave                    DATAMNGR save data",
    "FanCalib                    FAN get calibration data",
    "FanCalibClear               FAN clear calibration data",
    "FanCalibNext                FAN next calibration step",
    "FanCalibSet a b             FAN set k-value of valve (a) to (b)",
    "FanCalibStart               FAN start calibration",
    "FanCalibStop                FAN stop calibration",
    "FanGetSpeed                 FAN get speed",
    "FanParaGet                  FAN get parameter values",
    "FanParaSet a b              FAN set parameter a (0-14) to b",
    "FanPerformGet               FAN get performance values",
    "FanSetCorrection a b c d    FAN set curve correction (a=p100_spd, b=p100_q, c=p200_spd, d=p200_q)",
    "FanSetOutput a              FAN set PWM to a [0-0xFFFF]",
    "FanSetSpeedEmul a           FAN set emulated speed to a",
    "Help ...                    Print HELP menu",
    "InstallerSet a              INSTALL enter (a=1) or leave (a=0) installer mode",
    "IoParaGet                   IO get parameter values",
    "IoParaSet a b c             IO set parameter (b) of module (a) to (c)",
    "LogClear                    LOG clear log",
    "LogPrint                    LOG print log",
    "MpcmDllInfo                 MPCM DLL info",
    "Network                     NETW network table",
    "NetworkClear                NETW clear network (in installer mode only)",
    "NetwSerial                  NETW serial number table",
    "NetwVersion                 NETW version table",
    "NightBoostInfo              NIGHT BOOST Info",
    "NightBoostParaGet           NIGHT BOOST get parameters",
    "NightBoostParaSet a b       NIGHT BOOST set parameters",
    "NodeConfigGet a             NODE get config para's of node a",
    "NodeConfigSet a b c         NODE set config para b of node a to c",
    "NodeInfo a                  NODE info of node (a)",
    "NodeLoadDefaults a          NODE load defaults on node (a)",
    "NodeParaGet a b             NODE get para (b) of node (a)",
    "NodeParaList                NODE parameter list",
    "NodeParaSet a b c           NODE set para (b) of node (a) to (c)",
    "NodeReset a                 NODE reset node (a)",
    "NodeSaveData a              NODE save data on node (a)",
    "NodeSetAsso a b             NODE set asso of node a to b",
    "NodeSetOverrule a b         NODE set overrule of node a to b",
    "NodeSetParent a b           NODE set parent of node a to b",
    "NodeShow a b                NODE send msg to node (a) to show/hide (b)",
    "OneSecTaskInfo              ONE SEC task info",
    "OsHwm                       OS HWM",
    "Reset                       Perform soft reset",
    "RfArbitratorInfo            Get info of the RF arbitrator",
    "RfEnable a                  RF enable ON (a=1) or OFF (a = 0)",
    "RfSwitchInfo                RFSWITCH info",
    "RtcGetTime                  Get time",
    "RtcSetTime a b c d e f      Set time (a=day of month, b=month(1-12), c=year, d=hour, e=minute, f=second)",
    "SensorCtrlInfo              SENSOR CTRL get info",
    "SensorCtrlParaGet           SENSOR CTRL get parameter values",
    "SensorCtrlParaSet a b       SENSOR CTRL set parameter a (0-31) to b",
    "SensorInfo                  SENSOR get info",
    "ServiceCode                 SERVICE CODE print",
    "SwUploadRestart             SWUPLOAD restart",
    "SwUploadStatus              SWUPLOAD status",
    "SwVersion                   Print software version",
    "TestClear                   TEST clear log",
    "TestMode                    Reset the board into testmode",
    "TestPrint                   TEST print log",
    "VentCoolInfo                VENT COOL Info",
    "VentCoolParaGet             VENT COOL get parameter values",
    "VentCoolParaSet a b         VENT COOL set parameter a (0-11) to b",
    "VentCtrlParaGet             VENT CTRL get parameter values",
    "VentCtrlParaSet a b         VENT CTRL set parameter a (0-4) to b",
    "WeatherStationInfo          Weather station info",
    "WeatherStationTrigger       Weather station trigger",
    "-------------------------------------------------",
    "Use: 92/110 (0 fail)"
   ],
   "swversion": [
    "16056.10.4.0",
    "built @ Oct  8 2019 17:20:20"
   ],
   "network": [
    "Network:",
    "--- start list ---",
    "node|netw|addr|sub |type    |ptcl|cerr|prnt|asso|stts|stat|cntdwn|%dbt|trgt|cval|snsr|ovrl|capin |capout|tree|temp|info",
    "1   |VIRT|1   |1   |BOX     |18  |0   |0   |0   |0x00|AUTO|0     |22  |23  |23  |0   |255 |0     |2880  |0x81|0   |AUTO:0(0)",
    "2   |RF  |2   |1   |UC      |17  |0   |1   |1   |0x00|-   |0     |-   |-   |-   |0   |-   |-     |-     |-   |173 |-",
    "3   |RF  |3   |1   |CLIMA   |16  |0   |1   |0   |0x00|AUTO|0     |0   |0   |0   |0   |255 |70    |1120  |0x03|96  |AUTO:4(0)",
    "4   |RF  |4   |1   |UCBAT   |255 |1   |1   |1   |0x06|-   |0     |-   |-   |-   |0   |-   |-     |-     |-   |0   |-",
    "--- end list ---"
   ],
   "netwversion": [
    "Network:",
    "--- start list ---",
    "node|type    |version",
    "1   |BOX     |16056.10.4.0",
    "2   |UC      |12030.8.0.0",
    "3   |CLIMA   |13011.5.4.0",
    "4   |UCBAT   |---",
    "--- end list ---"
   ],
   "netwserial": [
    "Network:",
    "--- start list ---",
    "node|type    |version",
    "1   |BOX     |PS0000000001",
    "2   |UC      |RS0000000003",
    "3   |CLIMA   |RS0000000006",
    "4   |UCBAT   |---",
    "--- end list ---"
   ],
   "boardinfo": [
    "BootSW : 16013.2.0.0",
    "Serial : PS0000000001",
    "Board  : DUCO BMB SILENT  3V3",
    "Family : F:30 - C:1",
    "DevId  : 0x00000000 [0x00000000]",
    "DevType: 17",
    "SubType: 1",
    "WeekCnt: 234",
    "BootCnt: 18",
    "Done"
   ],
   "sensorinfo": [
    "[SENSOR] INFO"
   ],
   "nodeparaget 2 0": [
    "Get PARA 0 of NODE 2",
    "--> 12030",
    "Done"
   ],
   "nightboostinfo": [
    "[NIGHTBOOST] CONDITIONS",
    "Temperature outside:   1000",
    "Temperature e_ref:   0 [178]",
    "Temperature e_ref Threshold:   120",
    "Done"
   ],
   "nodeparaget 3 0": [
    "Get PARA 0 of NODE 3",
    "Failed"
   ],
   "ventcoolinfo": [
    "[VENTCOOL] INFO",
    "Status:                FALSE",
    "t_now:                 Monday 21:11",
    "T_e_ref                83 [.1°C]",
    "T_e_ref_threshold      120 [.1°C]",
    "T_inside:              201 [.1°C]",
    "T_inside_min:          204 [.1°C]",
    "T_inside_max:          244 [.1°C]",
    "T_inside_conf:         220 [.1°C]",
    "T_outside:             96 [.1°C]",
    "[VENTCOOL] CONDITIONS",
    "t_now > t_start:                       FALSE",
    "t_now > t_stop:                        TRUE",
    "T_e_ref > T_e_ref_threshold:           FALSE",
    "T_in > T_out + 3:                      TRUE",
    "T_in > T_in_min + 1:                   FALSE",
    "T_in > T_out + 1:                      TRUE",
    "T_in > T_in_min - 1:                   TRUE",
    "Vent cooling active last 24h:          FALSE",
    "T_in > T_in_max (>30 min last 24h):    FALSE",
    "T_in > T_in_conf (>30 min last 24h):   FALSE",
    "CO2 descending (last 15min):           FALSE",
    "Storm detected:                        FALSE"
   ],
   "nodeparaget 4 0": [
    "Get PARA 0 of NODE 4",
    "Failed"
   ],
   "autohcinfo": [
    "AUTO HEADCOUNT INFO",
    "- Active               FALSE",
    "- HeadCount Estim      0.000",
    "- Second Count         0",
    "- Output Integral      0",
    "- Save Delay Count     0",
    "- Last CO2 value       0",
    "Done"
   ],
   "nodeinfo 2": [
    "Node    2",
    "ApplSW  12030.8.0.0",
    "Serial  RS0000000003",
    "WeekCnt 78",
    "BootCnt 14",
    "Done"
   ],
   "nodeconfigget 2": [
    " 7. Manual 1       :   10 %    [0:5:75]",
    " 8. Manual 2       :   75 %    [10:5:100]",
    " 9. Manual 3       :  100 %    [75:5:100]",
    "10. Manual Timeout :   25 min  [5:5:9995]",
    "Done"
   ],
   "nodeinfo 3": [
    "Node    3",
    "ApplSW  13011.5.4.0",
    "Serial  RS0000000006",
    "WeekCnt 219",
    "BootCnt 3",
    "Done"
   ],
   "nodeconfigget 3": [
    " 1. AutoMin        :    0 %    [0:5:100]",
    " 2. AutoMax        :  100 %    [0:5:100]",
    " 3. Capacity       :   70 m3/h [0:5:100]",
    " 7. Manual 1       :    0 %    [0:5:50]",
    " 8. Manual 2       :   50 %    [0:5:100]",
    " 9. Manual 3       :  100 %    [50:5:100]",
    "10. Manual Timeout :   30 min  [5:5:9995]",
    "Done"
   ],
   "nodeinfo 4": [
    "Node    4",
    "Search 4 (0x10)"
   ],
   "nodeconfigget 4": [
    " 7. Manual 1       :   10 %    [0:5:60]",
    " 8. Manual 2       :   60 %    [10:5:100]",
    " 9. Manual 3       :  100 %    [60:5:100]",
    "10. Manual Timeout :   30 min  [5:5:9995]",
    "Done"
   ],
   "weatherstationinfo": [
    "---------- WEATHER STATION ----------",
    "Present:           FALSE",
    "Temp:              0 °dC",
    "Wind:              0 dm/s",
    "GPS:               FALSE",
    "Rain:              FALSE",
    "Sun South:         0 kLux",
    "Sun East:          0 kLux",
    "Sun West:          0 kLux",
    "Light:             0 Lux",
    "Last GPS Time:     00/00/0000 00:00:00",
    "Azimuth:           0 /10 Degree",
    "Elevation:         0 /10 Degree",
    "Longitude:         0 /100 Degree",
    "Latitude:          0 /100 Degree",
    "-------------------------------------",
    "Done"
   ],
   "commnlinfo": [
    "[NL PSIRF] INFO",
    "NL State       : IDLE (0 retries)",
    "NL In Link     : FALSE",
    "NL Address     : 1",
    "NL Netw HID    : 00000000 [00000000]",
    "NL Msg Fails   : 1354",
    "NL Remove NID  : 0",
    "NL Network     :  1 - 0xFF ( 1 - 0xFF)",
    "                  2 - 0x84 ( 2 - 0xFF) F:0x00",
    "                  3 - 0x6C ( 3 - 0xFF) F:0x00",
    "                  4 - 0x00 ( 4 - 0xFF) F:0x0E"
   ],
   "comminfo": [
    "COMM INFO",
    " install state          0 : OPERATIONAL",
    " module in asso         0",
    " module in parent       1",
    " module to replace      0",
    "COMM WI",
    " comm state             0 : IDLE",
    " module in pdo          132",
    " pdo msg counter        62437",
    "COMM RF",
    " comm state             2 : SUCCESS",
    " module in pdo          4",
    " pdo msg counter        4063"
   ],
   "commdllinfo": [
    "[DLL PSIRF] INFO",
    "DLL State       : RX_ACTIVE",
    "DLL CCxx Regs   : 09 2E 07 47 D3 91 20 0C 05 00 00 06 00 21 65 5C",
    "                  CA 83 13 22 F8 35 07 2F 08 16 6C 43 40 91 87 6B",
    "                  FB 56 10 E9 2A 00 1F 41 00 59 7F 3F 81 35 09",
    "DLL CCxx PA Tbl : C1 00 00 00 00 00 00 00",
    "DLL TX Delay    : 15",
    "DLL RX Buffer   : 0D 07 00 14 51 80 08 02 01 FF 20 00 52 00",
    "DLL TX Buffer   : 09 06 00 04 37 7E 08 C2 3C FF"
   ],
   "sensorctrlinfo": [
    " 0. HUM OUTPUT REQ.             :       0 (%)     ",
    " 1. CO2 OUTPUT REQ.             :       0 (%)     ",
    "Done"
   ],
   "fanperformget": [
    " - Press Total       : 241 Pa",
    " - Press Out         :  42 Pa",
    " - Power Now         :   5 W",
    " - Power Avg         :   5 W",
    " - Power Max         :  36 W",
    "Done"
   ],
   "rfarbitratorinfo": [
    "Rf allowed by user:        TRUE",
    "Rf allowed by arbitrator:  TRUE"
   ],
   "bmbreplaceinfo": [
    "BMB to SD state: IDLE",
    "SD state to BMB: IDLE"
   ],
   "swuploadstatus": [
    " - State               : IDLE - IDLE",
    " - Node                : 0",
    " - Product             : 0.0.0.0",
    " - Progress            : 0/0 (0%)",
    "Done"
   ],
   "coregeterror": [
    "No error",
    "Done"
   ],
   "rtcgettime": [
    "[RTC] MONDAY 26/10/2026 21:10:15",
    "Done"
   ],
   "logprint": [
    " 0: node   1 : POWERUP (0)",
    "Done"
   ],
   "autohcparaget": [
    " 0. ENABLED          : FALSE (0)",
    " 1. CO2 NODE         : 0",
    " 2. FLOWRATE         : 75 [m3/h]",
    " 3. VOLUME           : 150 [m3]",
    " 4. VOLUME FIXED     : FALSE (0)",
    " 5. FILTER ORDER     : 8 [0:16]",
    "Done"
   ],
   "commalp2pinfo": [
    "COMM P2P Info",
    "chn | srv |  id | active | rpl.to",
    "  1 |   1 |   0 |  FALSE |      0",
    "  1 |   3 |  92 |  FALSE |      0",
    "  1 |   4 |  86 |  FALSE |      0",
    "  1 |   6 |   0 |  FALSE |      0",
    "  1 |   9 |   0 |  FALSE |      0",
    "chn | req |  id | active | ack.to | rsp.to",
    "  1 |   2 |  90 |   TRUE |     88 |   5000",
    "  1 |   8 |  90 |   TRUE |     88 |   5000",
    "  1 |   7 |  90 |   TRUE |     88 |   5000",
    "Done"
   ],
   "corebufferinfo": [
    "CoreBuffer",
    " 0 -   51/51   - CoreTerm_SciQRx",
    " 1 -  513/513  - CoreLog_DataQ",
    " 2 -  101/101  - CoreLog_SciQTx",
    " 3 -   16/16   - Hd44780",
    " 4 -  257/257  - P2P DLL Rx",
    " 5 -  257/257  - P2P DLL Tx",
    " 6 -   16/130  - P2P out",
    " 7 -    0/21   - SenseAirS8_SciQRx",
    " 8 -   21/21   - SenseAirS8_SciQTx",
    " 9 -  297/297  - CommDllPsiRf_OutboxQ",
    "10 -  297/297  - CommDllPsiRf_InboxQ",
    "11 -  442/442  - CommNlPsiRf_Queue",
    "12 -    0/10   - NetwAct",
    "13 -   36/36   - PDO",
    "14 -  101/101  - RfSwitch",
    "15 -   73/100  - display_text_buffer",
    "16 -    2/2    - display_text_ofset_counter",
    "Use: 2771/3000"
   ],
   "coreinfo": [
    "Core",
    "- state     : APP ACTIVE ",
    "- stack hwm : 339/1023"
   ],
   "coreqinfo": [
    "CoreQ",
    " 1 -    1/50   - HWM   32 [1b] - CoreTerm_SciQRx",
    " 2 -    0/512  - HWM  285 [1b] - CoreLog_DataQ",
    " 3 -   20/100  - HWM    0 [1b] - CoreLog_SciQTx",
    " 4 -    0/256  - HWM  225 [1b] - P2P DLL Rx",
    " 5 -    0/256  - HWM  202 [1b] - P2P DLL Tx",
    " 6 -    0/20   - HWM   20 [1b] - SenseAirS8_SciQRx",
    " 7 -    0/20   - HWM   12 [1b] - SenseAirS8_SciQTx",
    " 8 -    0/8    - HWM    6 [33b] - CommDllPsiRf_OutboxQ",
    " 9 -    0/8    - HWM    0 [33b] - CommDllPsiRf_InboxQ",
    "10 -    0/16   - HWM   12 [26b] - CommNlPsiRf_Queue",
    "11 -    0/4    - HWM    4 [2b] - NetwAct",
    "12 -    0/5    - HWM    0 [6b] - PDO",
    "13 -    0/100  - HWM   85 [1b] - RfSwitch",
    "Use: 13/15",
    "Done"
   ],
   "coretaskinfo": [
    "CoreTask",
    " 1 -     1000 us - PRIO 200 [A] - Hd44780",
    " 2 -   300000 us - PRIO 128 [S] - BrdFanTimeoutTask",
    " 3 -   400000 us - PRIO 128 [S] - DataMngr",
    " 4 -  1000000 us - PRIO 130 [A] - OneSecTask",
    " 5 -     1000 us - PRIO 128 [A] - P2P TO",
    " 6 -     1000 us - PRIO 128 [A] - P2P present TO",
    " 7 -   100000 us - PRIO 128 [S] - P2PCoreAction",
    " 8 -   250000 us - PRIO 128 [A] - P2PCommIO",
    " 9 -  2000000 us - PRIO 128 [S] - P2PCommIO_TO",
    "10 -   100000 us - PRIO 128 [A] - Local Sensor",
    "11 -   250000 us - PRIO 128 [A] - P2PCommIOPara",
    "12 -   250000 us - PRIO 128 [A] - P2PCommSwUpl",
    "13 -   200000 us - PRIO 128 [A] - Sensor",
    "14 -     1000 us - PRIO 120 [S] - SenseAirS8",
    "15 -    50000 us - PRIO 128 [A] - FanSpeedFilter",
    "16 -  1000000 us - PRIO 128 [S] - CommDllPsiRfStateTO",
    "17 -     5000 us - PRIO 64 [A] - CommDllPsiRfHandlerTO",
    "18 -  1000000 us - PRIO 128 [A] - CommDllPsiRfCalib",
    "19 -    20000 us - PRIO 128 [S] - CommNlPsiRfTo",
    "20 -    75000 us - PRIO 128 [S] - CommNlPsiRfReveal",
    "21 -   150000 us - PRIO 140 [S] - SciSwitch TO",
    "22 -     3001 us - PRIO 255 [S] - Modbus_3_5",
    "23 -  1000000 us - PRIO 100 [A] - RTC task tick",
    "24 -  1000000 us - PRIO 128 [A] - RTC task update",
    "25 -     1000 us - PRIO 127 [A] - DLL MPCM",
    "26 -     1000 us - PRIO 128 [A] - NL MPCM",
    "27 -   100000 us - PRIO 127 [A] - RGBLed",
    "28 - 60000000 us - PRIO 128 [S] - FanCalib",
    "29 -     1000 us - PRIO 128 [A] - FanControl",
    "30 -    10000 us - PRIO 128 [A] - ButtonEvent",
    "31 -   500000 us - PRIO 150 [A] - DrvCharDisplay",
    "32 -   100000 us - PRIO 200 [A] - Gui",
    "33 -    10000 us - PRIO 128 [A] - P2PBmbReplace",
    "Use: 33/45",
    "Period: 1000 [us]",
    "Done"
   ],
   "datainfo": [
    "[DATAMNGR] INFO (sw16010 - v1 - OK)",
    "idx|name      |mid|size|ver|l2d|state",
    " 0 |BOARD     |  0|  12|  4| no|OK",
    " 1 |SNSR CTRL |  9|  44|  5|yes|OK",
    " 2 |RF DLL    | 12|  55|  2|yes|OK",
    " 3 |RF NL     |  2|  76|  1| no|OK",
    " 4 |RFARBITR  | 53|   1|  1|yes|OK",
    " 5 |TIME      | 48|   2|  2|yes|OK",
    " 6 |VENTCTRL  | 56|   5|  0|yes|OK",
    " 7 |NETWORK   | 41| 900|  6| no|OK",
    " 8 |DEVPARA   | 43|1800|  6| no|OK",
    " 9 |RFSWITCH  | 57|  32|  0| no|OK",
    " 10|VENTCOOL  | 49|  14|  2|yes|OK",
    " 11|NIGHTBOOST| 50|  10|  2|yes|OK",
    " 12|FAN CALIB | 42| 260|  3|yes|OK",
    " 13|FAN CTRL  | 44|  28|  7| no|OK",
    " 14|AUTOHDCNT | 52|   8|  1|yes|OK",
    "Use: 15/20",
    "Done"
   ],
   "fancalib": [
    "FAN CALIB [OK - IDLE]",
    "error : NONE (0x0000)",
    "node|speed |dPf   |Qout  |kvalue",
    "ALL |2174  |277   |210   |40705 ",
    "Done"
   ],
   "fangetspeed": [
    "FanSpeed (fan 1)",
    "- Actual   :  775 [rpm]",
    "- Filtered :  765 [rpm]",
    "- Average  :  768 [rpm]",
    "Done"
   ],
   "fanparaget": [
    " 0. AUTO CALIB                  :       0 (OFF)   [0:1:1]",
    " 1. MAX HIGH LEVEL              :     100 (%)     [0:1:255]",
    " 2. MIN FAN SPEED               :     400 (rpm)   [0:1:65535]",
    " 3. K_LEK BOX                   : 23000000 (/2^24) [0:1:4294967295]",
    " 4. K_LEK VALVE                 : 13421773 (/2^24) [6800830:1:4294967295]",
    " 5. MAX FAN OUT                 :     100 (%)     [0:1:100]",
    " 6. K LEK FRACTION              :   34560 ((1/Kn^N)*2^16) [1:1:65535]",
    " 7. CALIB ON MAN2               :       0 (FALSE) [0:1:1]",
    " 8. GROUND BOUND                :       1 (TRUE)  [0:1:1]",
    " 9. HEAD COUNT                  :       4 (ppl)   [1:1:4]",
    "10. FAN CURVE                   :       1 ()      [0:1:1]",
    "11. P100 SPEED                  :    2000 (rpm)   [0:1:65535]",
    "12. P100 DELTA FLOW             :       0 (m^3/h*16) [-30000:1:30000]",
    "13. P200 SPEED                  :    2200 (rpm)   [0:1:65535]",
    "14. P200 DELTA FLOW             :       0 (m^3/h*16) [-30000:1:30000]",
    "15. PWM INVERTED                :       0 (FALSE) [0:1:1]",
    "Done"
   ],
   "ioparaget": [
    "MODBUS PARA (0) [RW]",
    " 0. ADDRESS          : 0 [1-253]",
    " 1. OFFFSET          : 0 [0-1]",
    " 2. SPEED            : 4800 [bps] (0) [0-6]",
    " 3. PARITY           : NONE (0) [0-2]",
    " 4. STOPBIT          : 0 [1-2]",
    "ETHERNET PARA (1) [RW]",
    " 0. IP ADDRESS       : 0.0.0.0",
    " 1. NETWORK MASK     : 0.0.0.0",
    " 2. DEFAULT GATEWAY  : 0.0.0.0",
    " 3. DHCP ACTIVE      : FALSE (0) [0-1]",
    " 4. HOSTNAME NUMBER  : 0 (duco000.local) [1-255]",
    "ETHERNET INFO (2) [RO]",
    " 0. IP ADDRESS       : 0.0.0.0",
    " 1. GATEWAY          : 0.0.0.0",
    " 2. MAC ADDRESS      : xx:xx:00:00:00:00",
    "BOARD INFO (3) [RO]",
    " 0. SW PRODUCT       : 0",
    " 1. SW VERSION       : 0",
    " 2. SW REVISION      : 0",
    " 3. SW TEST          : 0",
    " 4. UPTIME           : 0",
    "Done"
   ],
   "mpcmdllinfo": [
    "   State - RXstate - TXstate",
    "0. IDLE  - IDLE    - IDLE  ",
    "Done"
   ],
   "nightboostparaget": [
    " 1. ACTIVE               : FALSE",
    " 2. TEMPERATURE SETPOINT : 24 [°C]",
    " 3. START MONTH          : MAY",
    " 4. STOP MONTH           : SEPTEMBER",
    " 5. START TIME           :  1:00",
    " 6. STOP TIME            :  6:00",
    "Done"
   ],
   "nodeparalist": [
    "General",
    " 21 - DEVICE_SUBTYPE",
    " 22 - RF_POWER_LEVEL",
    " 24 - DEVICE_WEEKCOUNT",
    " 25 - DEVICE_BOOTCOUNT",
    " 70 - STATUS_OF_GRATING_UNIT",
    " 71 - ERROR_CODE",
    " 72 - ERROR_DATA",
    " 73 - TEMPERATURE",
    " 74 - CO2_AVERAGE_VAL",
    " 75 - HUM_SENSOR_VAL",
    " 79 - PRESSURE_VAL",
    "Sensor Control",
    "137 - CO2SETPOINT",
    "128 - CO2CTRL_GRATING",
    "164 - CO2TEMPCOMP_ACTIVE",
    "165 - CO2TOILETMODE_ACTIVE",
    "138 - HUMSETPOINT",
    "161 - HUMDELTA_ACTIVE",
    "166 - UC_SENSOR_VISUAL_LEVEL",
    "Motion",
    "199 - MAX_MOTOR_STEPS",
    "201 - HOMING_DIRECTION",
    "202 - STEP_TIME",
    "203 - STEP_SIZE",
    "204 - STEP_CURRENT",
    "205 - OPEN_DIRECTION",
    "Heating",
    "206 - INCOME_TEMP_REQUEST",
    "207 - EXTERN_TEMP_TRIGGER",
    "208 - UNIT_ENABLED",
    "209 - HEATER_SWITCH",
    "210 - HEATER_ACTIVE",
    "211 - HEATER_STATE",
    "212 - HEATER_TEMPERATURE",
    "213 - HEATER_TEMPERATURE_REQUESTED",
    "214 - HEATER_TEMPERATURE_INCOME",
    "215 - HEATER_TEMPERATURE_EXTERN",
    "Actuator",
    "195 - MANUAL_MODE_PERIOD",
    "216 - ACTUATOR_HYBRID",
    "217 - ACTUATOR_PWM_VOLTAGE",
    "218 - ACTUATOR_PWM_FREQUENCY",
    "219 - ACTUATOR_OUTPUT_AS_PWM",
    "220 - KEEP_POWERED_AT_END",
    "Done"
   ],
   "onesectaskinfo": [
    "OneSecTask",
    " 1 -    1 s [A] - UpTime",
    " 2 -    5 s [A] - RhCtrl",
    " 3 -   30 s [A] - Co2Ctrl",
    " 4 -    1 s [A] - FanSpeedAvg",
    " 5 -  300 s [A] - WSElsner",
    " 6 -    1 s [A] - VentCtrl",
    " 7 -  300 s [A] - InstallTimeout",
    " 8 -    4 s [S] - RF TO para read",
    " 9 -    4 s [S] - RF TO para read",
    "10 -  300 s [A] - NightBoost",
    "Use: 10/15",
    "Done"
   ],
   "oshwm": [
    " 0 - TERM       -  136 [3] - 0x200002C8",
    " 1 - SUPPORT    -  100 [2] - 0x200006D0",
    " 2 - DEV_PARA   -  108 [2] - 0x20000A18",
    " 3 - BOX_COMM   -   92 [2] - 0x20000D60",
    " 4 - RF_PDO     -  108 [2] - 0x200010A8",
    " 5 - WI_PDO     -  106 [2] - 0x200013F0",
    " 6 - RF_SWITCH  -   37 [2] - 0x20001738",
    " 7 - VENT_COOL  -  102 [2] - 0x20001960",
    " 8 - P2PNODCOM  -  106 [2] - 0x20001CA8",
    " 9 - IDLE       -   88 [0] - 0x20001FF0",
    "Use : 10/15",
    "Free Heap Size : 1936"
   ],
   "rfswitchinfo": [
    "--- start list ---",
    "node|wired|rf",
    "--- end list ---"
   ],
   "sensorctrlparaget": [
    " 0. HUM SETPOINT                :    6000 (.01%)  [0:1:9000]",
    " 1. HUM HYSTERESIS              :       0 (.01%)  [0:1:1000]",
    " 2. HUM DELTA ACTIVE            :       0 (FALSE) [0:1:1]",
    " 3. HUM DELTA HIGH              :      15 (min)   [0:1:255]",
    " 4. HUM DELTA TIME 0            :       2 (5s)    [0:1:32]",
    " 5. HUM DELTA TIME 1            :       4 (5s)    [0:1:32]",
    " 6. HUM DELTA TIME 2            :       6 (5s)    [0:1:32]",
    " 7. HUM DELTA TIME 3            :      12 (5s)    [0:1:32]",
    " 8. HUM DELTA TIME 4            :      24 (5s)    [0:1:32]",
    " 9. HUM DELTA HUM 0             :     300 (.01%)  [0:1:1000]",
    "10. HUM DELTA HUM 1             :     300 (.01%)  [0:1:1000]",
    "11. HUM DELTA HUM 2             :     400 (.01%)  [0:1:1000]",
    "12. HUM DELTA HUM 3             :     600 (.01%)  [0:1:1000]",
    "13. HUM DELTA HUM 4             :     800 (.01%)  [0:1:1000]",
    "14. CO2 SETPOINT                :     800 (ppm)   [0:1:65535]",
    "15. CO2 CTRL GRATING            :       0 (FALSE) [0:1:1]",
    "16. CO2 TEMP COMPENS            :       1 (TRUE)  [0:1:1]",
    "17. CO2 MAXOUT TEMP0            :     120 (.1°C)  [100:1:350]",
    "18. CO2 MAXOUT TEMP1            :     160 (.1°C)  [100:1:350]",
    "19. CO2 MAXOUT COMP             :      40 (%)     [0:1:100]",
    "20. CO2 SETPNT TEMP0            :     160 (.1°C)  [100:1:350]",
    "21. CO2 SETPNT TEMP1            :     180 (.1°C)  [100:1:350]",
    "22. CO2 SETPNT TEMP2            :     220 (.1°C)  [100:1:350]",
    "23. CO2 SETPNT TEMP3            :     240 (.1°C)  [100:1:350]",
    "24. CO2 SETPNT COMP             :     300 (%)     [0:1:1000]",
    "25. CO2 TOILET MODE             :       0 (FALSE) [0:1:1]",
    "26. CO2 TLT 30S HYST            :      20 (ppm)   [1:1:200]",
    "27. CO2 TLT 60S HYST            :      40 (ppm)   [1:1:200]",
    "28. CO2 TLT LONGDTCT            :       4 (30s)   [1:1:200]",
    "29. CO2 TLT FADELONG            :      30 (30s)   [1:1:200]",
    "30. CO2 TLT FADESHRT            :       2 (30s)   [1:1:200]",
    "31. CO2 HYSTERESIS              :     100 (ppm)   [1:1:200]",
    "Done"
   ],
   "servicecode": [
    "- Code: 0a0000000000e000t000g000",
    "- Stat: 6/7",
    "Done"
   ],
   "ventcoolparaget": [
    " 1. ACTIVE ON Monday    : FALSE",
    " 2. ACTIVE ON Tuesday   : FALSE",
    " 3. ACTIVE ON Wednesday : FALSE",
    " 4. ACTIVE ON Thursday  : FALSE",
    " 5. ACTIVE ON Friday    : FALSE",
    " 6. ACTIVE ON Saturday  : FALSE",
    " 7. ACTIVE ON Sunday    : FALSE",
    " 8. START TIME          : 22:00 (1320)",
    " 9. STOP TIME           :  6:00 (360)",
    "10. MODE                : OFF",
    "11. MAX WIND SPEED      : 110 [dm/s]",
    "Done"
   ],
   "ventctrlparaget": [
    " 0. BALANCE THRESH.  : 10 [%]",
    " 1. CTRL TEMP DEP.   : 1 (TRUE)",
    " 2. CTRL TEMP LOW    : 160 [.1°C]",
    " 3. CTRL TEMP HIGH   : 240 [.1°C]",
    " 4. MAX MOVING MOTORS: 20",
    "Done"
   ],
   "nodeconfigget 1": [
    " 1. AutoMin        :   10 %    [10:5:100]",
    " 2. AutoMax        :  100 %    [10:5:100]",
    " 3. Capacity       :    0 m3/h [0:5:750]",
    " 7. Manual 1       :   15 %    [0:5:50]",
    " 8. Manual 2       :   50 %    [15:5:100]",
    " 9. Manual 3       :  100 %    [50:5:100]",
    "10. Manual Timeout :   15 min  [5:5:9995]",
    "Done"
   ],
   "nodeinfo 1": [
    "Node    1",
    "ApplSW  Failed",
    "Serial  Failed",
    "Counter Failed",
    "Done"
   ],
   "nodeparaget 1 21": [
    "Get PARA 21 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 22": [
    "Get PARA 22 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 24": [
    "Get PARA 24 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 25": [
    "Get PARA 25 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 70": [
    "Get PARA 70 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 71": [
    "Get PARA 71 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 72": [
    "Get PARA 72 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 73": [
    "Get PARA 73 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 74": [
    "Get PARA 74 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 75": [
    "Get PARA 75 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 79": [
    "Get PARA 79 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 128": [
    "Get PARA 128 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 137": [
    "Get PARA 137 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 138": [
    "Get PARA 138 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 161": [
    "Get PARA 161 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 164": [
    "Get PARA 164 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 165": [
    "Get PARA 165 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 166": [
    "Get PARA 166 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 195": [
    "Get PARA 195 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 199": [
    "Get PARA 199 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 201": [
    "Get PARA 201 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 202": [
    "Get PARA 202 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 203": [
    "Get PARA 203 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 204": [
    "Get PARA 204 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 205": [
    "Get PARA 205 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 206": [
    "Get PARA 206 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 207": [
    "Get PARA 207 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 208": [
    "Get PARA 208 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 209": [
    "Get PARA 209 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 210": [
    "Get PARA 210 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 211": [
    "Get PARA 211 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 212": [
    "Get PARA 212 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 213": [
    "Get PARA 213 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 214": [
    "Get PARA 214 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 215": [
    "Get PARA 215 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 216": [
    "Get PARA 216 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 217": [
    "Get PARA 217 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 218": [
    "Get PARA 218 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 219": [
    "Get PARA 219 of NODE 1",
    "Failed"
   ],
   "nodeparaget 1 220": [
    "Get PARA 220 of NODE 1",
    "Failed"
   ],
   "nodeparaget 2 76": [
    "Get PARA 76 of NODE 2",
    "--> 15352",
    "Done"
   ],
   "nodeparaget 2 77": [
    "Get PARA 77 of NODE 2",
    "--> 0",
    "Done"
   ],
   "nodeparaget 2 78": [
    "Get PARA 78 of NODE 2",
    "--> 0",
    "Done"
   ],
   "nodeparaget 2 162": [
    "Get PARA 162 of NODE 2",
    "--> 127",
    "Done"
   ],
   "nodeparaget 2 163": [
    "Get PARA 163 of NODE 2",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 66": [
    "Get PARA 66 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 70": [
    "Get PARA 70 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 71": [
    "Get PARA 71 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 72": [
    "Get PARA 72 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 76": [
    "Get PARA 76 of NODE 3",
    "--> 40321",
    "Done"
   ],
   "nodeparaget 3 199": [
    "Get PARA 199 of NODE 3",
    "--> 3000",
    "Done"
   ],
   "nodeparaget 3 201": [
    "Get PARA 201 of NODE 3",
    "Failed"
   ],
   "nodeparaget 3 202": [
    "Get PARA 202 of NODE 3",
    "--> 850",
    "Done"
   ],
   "nodeparaget 3 203": [
    "Get PARA 203 of NODE 3",
    "--> 5",
    "Done"
   ],
   "nodeparaget 3 204": [
    "Get PARA 204 of NODE 3",
    "--> 12",
    "Done"
   ],
   "nodeparaget 3 205": [
    "Get PARA 205 of NODE 3",
    "--> 1",
    "Done"
   ],
   "nodeparaget 3 206": [
    "Get PARA 206 of NODE 3",
    "Failed"
   ],
   "nodeparaget 3 207": [
    "Get PARA 207 of NODE 3",
    "--> 120",
    "Done"
   ],
   "nodeparaget 3 208": [
    "Get PARA 208 of NODE 3",
    "--> 1",
    "Done"
   ],
   "nodeparaget 3 209": [
    "Get PARA 209 of NODE 3",
    "--> 1",
    "Done"
   ],
   "nodeparaget 3 210": [
    "Get PARA 210 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 211": [
    "Get PARA 211 of NODE 3",
    "--> 0",
    "Done"
   ],
   "nodeparaget 3 212": [
    "Get PARA 212 of NODE 3",
    "--> 162",
    "Done"
   ],
   "nodeparaget 3 213": [
    "Get PARA 213 of NODE 3",
    "--> 64686",
    "Done"
   ],
   "nodeparaget 3 214": [
    "Get PARA 214 of NODE 3",
    "--> 177",
    "Done"
   ],
   "nodeparaget 3 215": [
    "Get PARA 215 of NODE 3",
    "--> 98",
    "Done"
   ],
   "nodeparaget 4 76": [
    "Get PARA 76 of NODE 4",
    "Failed"
   ],
   "nodeparaget 4 77": [
    "Get PARA 77 of NODE 4",
    "Failed"
   ],
   "nodeparaget 4 78": [
    "Get PARA 78 of NODE 4",
    "Failed"
   ],
   "nodeparaget 4 162": [
    "Get PARA 162 of NODE 4",
    "Failed"
   ],
   "nodeparaget 4 163": [
    "Get PARA 163 of NODE 4",
    "Failed"
   ]
  }
 }
];
