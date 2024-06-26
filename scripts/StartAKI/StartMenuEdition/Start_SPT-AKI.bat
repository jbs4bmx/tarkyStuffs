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
::    Edit:           | [ddMMyyyy] 24.03.2024
::    Script Version: | 0.13
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
setlocal enabledelayedexpansion
set ver=0.13
set server=%~dp0Aki.Server.exe
set client=%~dp0Aki.Launcher.exe
set game=%~dp0EscapeFromTarkov.exe
set config=%~dp0%Aki_Data\Server\database\server.json
set string=
set log=%~dp0Start_SPT-AKI.log
set fileChkCt=0
set launchErrCt=0
set dat=%DATE:~4,2%/%DATE:~7,2%/%DATE:~10,4%
set tim=%time:~,5%

set "targetFile=%~dp0Start_SPT-AKI.bat"
set "shortcutFile=C:\ProgramData\Microsoft\Windows\Start Menu\SPT-AKI.lnk"
set "workingDir=%~dp0"
set "iconFile=%~dp0SPT-AKI.ico"

:: ---------------------------------------------------------[Initializations]--------------------------------------------------------
:: Parsing the server config file so we can get and use the port value later
for /f "delims=" %%x in (%config%) do set "string=!string!%%x"
set string=%string:"=%
set "string=%string:~2,-1%"
set "string=%string:: ==%"
set "%string:, =" & set "%"
call :setESC

:: -----------------------------------------------------------[Execution]------------------------------------------------------------
:Begin
if not exist %shortcutFile% (
    echo.%ESC%[33mStart Menu shortcut not found.%ESC%[0m
    echo.%ESC%[32mCreating Start Menu shortcut...%ESC%[0m
    powershell -Command "$WScriptShell = New-Object -ComObject WScript.Shell; $Shortcut = $WScriptShell.CreateShortcut('%shortcutFile%'); $Shortcut.TargetPath = '%targetFile%'; $ShortCut.IconLocation = "%iconFile%"; $ShortCut.WorkingDirectory = "%workingDir%"; $ShortCut.Description = "SPT-AKI Startup Script by jbs4bmx"; $Shortcut.Save()"
    ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
)

cls
echo.***********************************************************************
echo.*                  %ESC%[36mSPT-AKI%ESC%[0m Startup Script by %ESC%[32mjbs4bmx%ESC%[0m                  *
echo.*%ESC%[33m---------------------------------------------------------------------%ESC%[0m*
echo.*                        %ESC%[31m@@ IMPORTANT @@%ESC%[0m                              *
echo.* Please do not close this window. This script will automatically     *
echo.* close once Escape From Tarkov has launched and processor affinity   *
echo.* has been set to use all physical CPU cores.                         *
echo.***********************************************************************
echo.
echo.%ESC%[33mScript Version:%ESC%[0m %ESC%[95m%ver%%ESC%[0m
echo.%ESC%[33mStartup Time:%ESC%[0m %ESC%[95m%dat%_%tim%%ESC%[0m


echo.================================== >>%log%
echo.SPT-AKI Startup Script >>%log%
echo.Script Version: %ver% >>%log%
echo.Startup Time: %dat%_%tim% >>%log%
echo.================================== >>%log%
echo.


:fileVerificationChecks
::verify files exist
echo.%ESC%[96mVerifying game files...%ESC%[0m
echo.Verifying game files... >>%log%
if not exist %server% (
    set /a fileChkCt=fileChkCt+1
    echo.    %ESC%[33m^|%ESC%[0m ^%ESC%[31m[ERROR^]%ESC%[0m %server% not found.
    echo.^[ERROR^] %server% not found. >>%log%
) else (
    echo.    %ESC%[33m^|%ESC%[0m %server% is %ESC%[32mpresent%ESC%[0m.
    echo.%server% is present. >>%log%
)
if not exist %client% (
    set /a fileChkCt=fileChkCt+1
    echo.    %ESC%[33m^|%ESC%[0m ^%ESC%[31m[ERROR^]%ESC%[0m %client% not found.
    echo.^[ERROR^] %client% not found. >>%log%
) else (
    echo.    %ESC%[33m^|%ESC%[0m %client% is %ESC%[32mpresent%ESC%[0m.
    echo.%client% is present. >>%log%
)
if not exist %game% (
    set /a fileChkCt=fileChkCt+1
    echo.    %ESC%[33m^|%ESC%[0m ^%ESC%[31m[ERROR^]%ESC%[0m %game% not found.
    echo.^[ERROR^] %game% not found. >>%log%
) else (
    echo.    %ESC%[33m^|%ESC%[0m %game% is %ESC%[32mpresent%ESC%[0m.
    echo.%game% is present. >>%log%
)
if %fileChkCt% gtr 0 (
    echo.    %ESC%[33m^|%ESC%[0m ^%ESC%[31m[ERROR^]%ESC%[0m One or more files are missing or incorrectly placed.
    echo.    %ESC%[33m^|%ESC%[0m Script Path: %~dp0Start_SPT-AKI.bat
    echo.    %ESC%[33m^|%ESC%[0m Server config Path: %config%
    echo.    %ESC%[33m^|%ESC%[0m Install this script in the root directory of the SPT installation.
    echo.    %ESC%[33m^|%ESC%[0m The root directory must contain the following files...
    echo.        ^| Aki.Server.exe
    echo.        ^| Aki.Launcher.exe
    echo.        ^| EscapeFromTarkov.exe
    echo.        ^| Start_SPT-AKI.bat
    echo.^[ERROR^] One or more files are missing or incorrectly placed. >>%log%
    echo.    ^| Script Path: %~dp0Start_SPT-AKI.bat >>%log%
    echo.    ^| Server config Path: %config% >>%log%
    echo.    ^| Install this script in the root directory of the SPT installation. >>%log%
    echo.    ^| The root directory must contain the following files... >>%log%
    echo.        ^| Aki.Server.exe >>%log%
    echo.        ^| Aki.Launcher.exe >>%log%
    echo.        ^| EscapeFromTarkov.exe >>%log%
    echo.        ^| Start_SPT-AKI.bat >>%log%
    pause
    goto exitScript
)
ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1


:startServer
:: Launch Game Server
echo.
echo.
echo.%ESC%[96mStarting server: ^(%server%^)...%ESC%[0m
echo.Starting server: ^(%server%^)... >>%log%
start "Server" /i %server%
if errorlevel 0 (
    ping -n 2 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
    GOTO serverStatusCheck
) else (
    echo.    %ESC%[33m^|%ESC%[0m ^%ESC%[31m[ERROR^]%ESC%[0m Failed to start %server% successfully.
    echo.^[ERROR^] Failed to start %server% successfully. >>%log%
    pause
    goto exitScript
)


:serverStatusCheck
:: Cycle until we know that the server is running
echo.    %ESC%[33m^|%ESC%[0m %server% started - awaiting status...
netstat -o -n -a | findstr %Port% >NUL 2>&1 && if errorlevel 0 goto startClient
ping -n 2 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
goto serverStatusCheck


:startClient
:: Launch Game Client
echo.    %ESC%[33m^|%ESC%[0m ^%ESC%[32m[SUCCESS^]%ESC%[0m %server% started successfully on localhost ^(127.0.0.1:%Port%^).
echo.^[SUCCESS^] %server% started successfully on localhost ^(127.0.0.1:%Port%^). >>%log%
echo.
echo.
echo.%ESC%[96mStarting launcher ^(%client%^)...%ESC%[0m
echo.Starting launcher ^(%client%^)... >>%log%
start "Launcher" %client%
if errorlevel 0 (
    echo.    %ESC%[33m^|%ESC%[0m ^%ESC%[32m[SUCCESS^]%ESC%[0m %client% started successfully.
    echo.^[SUCCESS^] %client% started successfully. >>%log%
    ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
    ::goto exitScript
    goto setAffinity
) else (
    echo.    %ESC%[33m^|%ESC%[0m ^%ESC%[31m[ERROR^]%ESC%[0m Failed to start %client% successfully.
    echo.^[ERROR^] Failed to start %client% successfully. >>%log%
    pause
    goto exitScript
)


:setAffinity
:: Wait for EFT to start and then set Processor affinity
echo.
echo.
echo.%ESC%[96mWaiting for game process to start ^(%game%^)...%ESC%[0m
echo.Waiting for game process to start ^(%game%^)... >>%log%
:loopThatShit
tasklist | find /I "EscapeFromTarkov.exe" >NUL 2>&1
if errorlevel 1 (
    ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
    goto loopThatShit
)
:: PING null for 30 seconds to allow the game client enough time to load
ping -n 30 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
echo.    %ESC%[33m^|%ESC%[0m EFT is %ESC%[32mrunning%ESC%[0m - setting EFT processor affinity...
echo.EFT is running - setting EFT processor affinity... >>%log%
PowerShell "$proc = Get-WmiObject -class Win32_processor; $affinity=$proc.numberoflogicalprocessors - $proc.numberofcores; switch ($affinity){2 { $affinity = 5}4{$affinity = 85}6{$affinity = 1365}8{$affinity = 21845}10{$affinity = 349525}12{$affinity = 5592405}14{$affinity = 89478485}16{$affinity = 1431655765}}; if ($affinity){$Process = Get-Process EscapeFromTarkov; $Process.ProcessorAffinity=$affinity; $Process.PriorityClass=[System.Diagnostics.ProcessPriorityClass]::AboveNormal;}"
ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1


:exitScript
echo.
echo.
echo.%ESC%[35mProcessor affinity set.%ESC%[0m
echo.Processor affinity set. >>%log%
echo.%ESC%[96mExiting script...%ESC%[0m
echo.Exiting script... >> %log% && echo." " >>%log%
ping -n 10 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
echo." ">>%log%
popd
exit 0

:setESC
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set ESC=%%b
  exit /B 0
)
