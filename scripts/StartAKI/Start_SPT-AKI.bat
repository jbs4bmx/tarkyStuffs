@echo off
title "SPT-AKI Start Up Script"
REM SPT-AKI START UP SCRIPT
:: SYNOPSIS
::    Launches a game! :)
:: DESCRIPTION
::    This script launches the SPT-AKI server and then starts the game launcher. It then waits for you to launch the game and
::    after detecting that an instance of EscapeFromTarkov.exe is running, it will set processor affinity to ensure that EFT has
::    the most resources available to it while running on your system.
::    This script has basic logging.
:: INPUTS
::    {ScriptDirectory}\Aki_Data\Server\database\server.json
:: OUTPUTS
::    {ScriptDirectory}\Start_SPT-AKI.log
:: NOTES
::    Author:         | jbs4bmx
::    Date:           | [ddMMyyyy] 18.10.2020
::    Edit:           | [ddMMyyyy] 24.07.2022
::    Script Version: | 0.6
::    Help Requests:  | https://discordapp.com/users/510535592833056777
::    License:        | https://opensource.org/licenses/MIT | Copyright (c) 2024 jbs4bmx
::                    | ----------------------------------------------------------------------------------------------------------
::    Special Note:   | Processor Affinity for Hyper-Threaded CPUs (SET ON LINE 108)
::                    | ----------------------------------------------------------------------------------------------------------
::                    | CORES |  Affinity  |             CPU Cores                      | Core Type
::                    |-------|------------|--------------------------------------------|-----------------------------------------
::                    |     2 |          5 | 0,2                                        | Physical
::                    |       |         10 | 1,3                                        | Virtual
::                    |-------|------------|--------------------------------------------|-----------------------------------------
::                    |     4 |         85 | 0,2,4,6                                    | Physical
::                    |       |        170 | 1,3,5,7                                    | Virtual
::                    |-------|------------|--------------------------------------------|-----------------------------------------
::                    |     6 |       1365 | 0,2,4,6,8,10                               | Physical
::                    |       |       2730 | 1,3,5,7,9,11                               | Virtual
::                    |-------|------------|--------------------------------------------|-----------------------------------------
::                    |     8 |      21845 | 0,2,4,6,8,10,12,14                         | Physical
::                    |       |      43690 | 1,3,5,7,9,11,13,15                         | Virtual
::                    |-------|------------|--------------------------------------------|-----------------------------------------
::                    |    10 |     349525 | 0,2,4,6,8,10,12,14,16,18                   | Physical
::                    |       |     699050 | 1,3,5,7,9,11,13,15,17,19                   | Virtual
::                    |-------|------------|--------------------------------------------|-----------------------------------------
::                    |    12 |    5592405 | 0,2,4,6,8,10,12,14,16,18,20,22             | Physical
::                    |       |   11184810 | 1,3,5,7,9,11,13,15,17,19,21,23             | Virtual
::                    |-------|------------|--------------------------------------------|-----------------------------------------
::                    |    14 |   89478485 | 0,2,4,6,8,10,12,14,16,18,20,22,24,26       | Physical
::                    |       |  178956970 | 1,3,5,7,9,11,13,15,17,19,21,23,25,27       | Virtual
::                    |-------|------------|--------------------------------------------|-----------------------------------------
::                    |    16 | 1431655765 | 0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30 | Physical
::                    |       | 2863311530 | 1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31 | Virtual
::                    | ----------------------------------------------------------------------------------------------------------
::                    | The process can be set using this code (example for 8-core CPU)...
::                    | PowerShell "$Process = Get-Process EscapeFromTarkov; $Process.ProcessorAffinity=21845; $Process.PriorityClass=[System.Diagnostics.ProcessPriorityClass]::AboveNormal;"
::                    | ----------------------------------------------------------------------------------------------------------
::                    | The process can also be automated by using the following line of code...
::                    | PowerShell "$proc = Get-WmiObject -class Win32_processor; $affinity=$proc.numberoflogicalprocessors - $proc.numberofcores; switch ($affinity){2 { $affinity = 5}4{$affinity = 85}6{$affinity = 1365}8{$affinity = 21845}10{$affinity = 349525}12{$affinity = 5592405}14{$affinity = 89478485}16{$affinity = 1431655765}}; if ($affinity){$Process = Get-Process EscapeFromTarkov; $Process.ProcessorAffinity=$affinity; $Process.PriorityClass=[System.Diagnostics.ProcessPriorityClass]::AboveNormal;}"
::                    | ----------------------------------------------------------------------------------------------------------
::                    | Note: Affinity feature is currently not in place for Intel's PE core CPUs. ETA:Unknown

:: ----------------------------------------------------------[Declarations]----------------------------------------------------------
set server=%~dp0Aki.Server.exe
set client=%~dp0Aki.Launcher.exe
set log=%~dp0Start_SPT-AKI.log

:: -----------------------------------------------------------[Execution]------------------------------------------------------------
::verify files exist
echo.Verifying game files...
if not exist %server% (
    echo.^[ERROR^] Server.exe is missing or incorrectly placed.
    echo.^[ERROR^] Server.exe is missing or incorrectly placed. >> %log%
) else (
    echo.^[SUCCESS^] Server.exe found.
    echo.^[SUCCESS^] Server.exe found. >> %log%
)
if not exist %client% (
    echo.^[ERROR^] Launcher.exe is missing or incorrectly placed.
    echo.^[ERROR^] Launcher.exe is missing or incorrectly placed. >> %log%
) else (
    echo.^[SUCCESS^] Launcher.exe found.
    echo.^[SUCCESS^] Launcher.exe found. >> %log%
)
ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
echo.
echo.

:: Launch Game Server
echo Starting Server...
::start "Server" /Min /i %server%
start "Server" /i %server%
if errorlevel 0 (
    echo.^[SUCCESS^] Server started successfully.
    echo.^[SUCCESS^] Server started successfully. >> %log%
    ping -n 10 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
    :: Launch Game Client
    echo.Starting Launcher...
    start "Launcher" %client%
    if errorlevel 0 (
        echo.^[SUCCESS^] Launcher started successfully.
        echo.^[SUCCESS^] Launcher started successfully. >> %log%
        ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
    ) else (
        echo.^[ERROR^] Failed to start Launcher successfully.
        echo.^[ERROR^] Failed to start Launcher successfully. >> %log%
        pause
    )
) else (
    echo.^[ERROR^] Failed to start Server successfully.
    echo.^[ERROR^] Failed to start Server successfully. >> %log%
    pause
)
echo.
echo.

:: Wait for EFT to start and then set Processor affinity
echo.Waiting for EscapeFromTarkov process...
:LOOP
tasklist | find /I "EscapeFromTarkov.exe" >NUL 2>&1
if errorlevel 1 (
    ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
    goto loopThatShit
)
:: PING null for 30 seconds to allow the game client enough time to load
ping -n 30 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
echo.Setting EFT processor affinity...
PowerShell "$Process = Get-Process EscapeFromTarkov; $Process.ProcessorAffinity=21845; $Process.PriorityClass=[System.Diagnostics.ProcessPriorityClass]::AboveNormal;"
ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1

echo.
echo.Exiting script...
ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
echo.>> %log%
popd
exit 0
