@echo off
title "SPT-AKI Start Up Script"
REM SPT-AKI START UP SCRIPT
:: SYNOPSIS
::    Launches a game! :)
:: DESCRIPTION
::    This script launches the SPT-AKI server and then starts the game launcher. It has basic logging.
:: OUTPUTS
::    {ScriptDirectory}\Start_SPT-AKI.log
:: NOTES
::    Author:         | jbs4bmx
::    Date:           | [ddMMyyyy] 18.10.2020
::    Edit:           | [ddMMyyyy] 11.02.2024
::    Script Version: | 0.7
::    Help Requests:  | https://discordapp.com/users/510535592833056777
::    License:        | https://opensource.org/licenses/MIT | Copyright (c) 2024 jbs4bmx
::                    | ----------------------------------------------------------------------------------------------------------
::    Special Note:   | Processor Affinity (CPUs without Hyper-Threading or CPUs with Hyper-Threading disabled) (SET ON LINE 108)
::                    | ----------------------------------------------------------------------------------------------------------
::                    | CORES |  Affinity  |     CPU Cores      | Core Type
::                    |-------|------------|--------------------|-----------------------------------------------------------------
::                    |     2 |          1 | 0                  | Physical
::                    |       |          2 | 1                  | Physical
::                    |-------|------------|--------------------|-----------------------------------------------------------------
::                    |     4 |          5 | 0,2                | Physical
::                    |       |         10 | 1,3                | Physical
::                    |-------|------------|--------------------|-----------------------------------------------------------------
::                    |     6 |         21 | 0,2,4              | Physical
::                    |       |         42 | 1,3,5              | Physical
::                    |-------|------------|--------------------|-----------------------------------------------------------------
::                    |     8 |        85  | 0,2,4,6            | Physical
::                    |       |        170 | 1,3,5,7            | Physical
::                    |-------|------------|--------------------|-----------------------------------------------------------------
::                    |    10 |        341 | 0,2,4,6,8          | Physical
::                    |       |        682 | 1,3,5,7,9          | Physical
::                    |-------|------------|--------------------|-----------------------------------------------------------------
::                    |    12 |       1365 | 0,2,4,6,8,10       | Physical
::                    |       |       2730 | 1,3,5,7,9,11       | Physical
::                    |-------|------------|--------------------|-----------------------------------------------------------------
::                    |    14 |       5461 | 0,2,4,6,8,10,12    | Physical
::                    |       |      10922 | 1,3,5,7,9,11,13    | Physical
::                    |-------|------------|--------------------|-----------------------------------------------------------------
::                    |    16 |      21845 | 0,2,4,6,8,10,12,14 | Physical
::                    |       |      43690 | 1,3,5,7,9,11,13,15 | Physical
::                    | ----------------------------------------------------------------------------------------------------------
::                    | The process can be set using this code (example for 8-core CPU)...
::                    | PowerShell "$Process = Get-Process EscapeFromTarkov; $Process.ProcessorAffinity=21845; $Process.PriorityClass=[System.Diagnostics.ProcessPriorityClass]::AboveNormal;"
::                    | ----------------------------------------------------------------------------------------------------------
::                    | The process can also be automated by using the following line of code...
::                    | PowerShell "$proc = Get-WmiObject -class Win32_processor; $affinity=$proc.numberoflogicalprocessors - $proc.numberofcores; switch ($affinity){2 { $affinity = 5}4{$affinity = 85}6{$affinity = 1365}8{$affinity = 21845}10{$affinity = 349525}12{$affinity = 5592405}14{$affinity = 89478485}16{$affinity = 1431655765}}; if ($affinity){$Process = Get-Process EscapeFromTarkov; $Process.ProcessorAffinity=$affinity; $Process.PriorityClass=[System.Diagnostics.ProcessPriorityClass]::AboveNormal;}"
::                    | ----------------------------------------------------------------------------------------------------------
::                    | Note: Affinity feature is currently not in place for Intel's PE core CPUs. ETA:Unknown

:: ----------------------------------------------------------[Declarations]----------------------------------------------------------
setlocal enabledelayedexpansion
set ver="0.7"
set server=%~dp0Aki.Server.exe
set client=%~dp0Aki.Launcher.exe
set config=%~dp0%Aki_Data\Server\database\server.json
set string=
set log=%~dp0Start_SPT-AKI.log
set fileChkCt=0
set launchErrCt=0

:: ---------------------------------------------------------[Initializations]--------------------------------------------------------
:: Parsing the server config file so we can get and use the port value later
for /f "delims=" %%x in (%config%) do set "string=!string!%%x"
set string=%string:"=%
set "string=%string:~2,-2%"
set "string=%string:: ==%"
set "%string:, =" & set "%"

:: -----------------------------------------------------------[Execution]------------------------------------------------------------
:fileVerificationChecks
::verify files exist
echo.Verifying game files... && echo.Verifying game files... >>%log%
if not exist %server% (
    set /a fileChkCt=fileChkCt+1
    echo.^[ERROR^] %server% not found. >>%log%
) else (
    echo.%server% is present. >>%log%
)
if not exist %client% (
    set /a fileChkCt=fileChkCt+1
    echo.^[ERROR^] %client% not found. >>%log%
) else (
    echo.%client% is present. >>%log%
)
if %fileChkCt% gtr 0 (
    echo.^[ERROR^] One or more files are missing or incorrectly placed. && echo.Check the log file for details.
    pause
    goto exitScript
)
ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1


:startServer
:: Launch Game Server
echo. && echo. && echo.Starting %server%...
start "Server" /i %server%
if errorlevel 0 (
    ping -n 2 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
    GOTO serverStatusCheck
) else (
    echo.    ^| ^[ERROR^] Failed to start %server% successfully. && echo.^[ERROR^] Failed to start %server% successfully. >>%log%
    pause
    goto exitScript
)


:serverStatusCheck
:: Cycle until we know that the server is running
echo.    ^| %server% started - awaiting status...
netstat -o -n -a | findstr %Port% >NUL 2>&1 && if errorlevel 0 goto startClient
ping -n 2 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
goto serverStatusCheck


:startClient
:: Launch Game Client
echo.    ^| ^[SUCCESS^] %server% started successfully.
echo.^[SUCCESS^] %server% started successfully. >>%log%
echo. && echo. && echo.Starting Launcher...
start "Launcher" %client%
if errorlevel 0 (
    echo.    ^| ^[SUCCESS^] %client% started successfully. && echo.^[SUCCESS^] %client% started successfully. >>%log%
    ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
    goto setAffinity
) else (
    echo.    ^| ^[ERROR^] Failed to start %client% successfully. && echo.^[ERROR^] Failed to start %client% successfully. >>%log%
    pause
    goto exitScript
)


:setAffinity
:: Wait for EFT to start and then set Processor affinity
echo. && echo. && echo.Waiting for EscapeFromTarkov process...
:loopThatShit
tasklist | find /I "EscapeFromTarkov.exe" >NUL 2>&1
if errorlevel 1 (
    ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
    goto loopThatShit
)
:: PING null for 30 seconds to allow the game client enough time to load
ping -n 30 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
echo.    ^| EFT is running - setting EFT processor affinity...
PowerShell "$proc = Get-WmiObject -class Win32_processor; $affinity=$proc.numberoflogicalprocessors - $proc.numberofcores; switch ($affinity){2 { $affinity = 5}4{$affinity = 85}6{$affinity = 1365}8{$affinity = 21845}10{$affinity = 349525}12{$affinity = 5592405}14{$affinity = 89478485}16{$affinity = 1431655765}}; if ($affinity){$Process = Get-Process EscapeFromTarkov; $Process.ProcessorAffinity=$affinity; $Process.PriorityClass=[System.Diagnostics.ProcessPriorityClass]::AboveNormal;}"
ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1


:exitScript
echo. && echo. && echo.Exiting script...
ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
echo.>>%log%
popd
exit 0
