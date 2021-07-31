@echo off
title "Tarkov Backup Directory Creator"
:: ----------------------------------------------------------------------------------------------------------------------------------
:: SYNOPSIS
::    Directory tree creator.
:: DESCRIPTION
::    Creates a predefined folder structure for organizing and managing backups for SPT-AKI.
:: INPUTS
::    None
:: OUTPUTS
::    root\
::    root\client.bkup
::    root\mods.bkup
::    root\modules.bkup
:: NOTES
::    File Name:      | tbdc.bat
::    Author:         | jbs4bmx
::    Date:           | [DMY] 25.07.2021
::    Edit:           | [DMY] 30.07.2021
::    Version:        | 0.2
::    License:        | MIT - https://opensource.org/licenses/MIT - Copyright (c) 2021 jbs4bmx
:: ------------------------------------------------------------[Elevation]-----------------------------------------------------------
net file 1>nul 2>nul
if '%errorlevel%'=='0' ( goto gotpriv ) else ( goto getpriv )
:getpriv
if '%1'=='elev' ( shift & goto gotpriv )
setlocal disabledelayedexpansion
set "batchpath=%~0"
setlocal enabledelayedexpansion
echo set uac = createobject^("shell.application"^) > "%temp%\OEgetPrivileges.vbs"
echo UAC.ShellExecute "!batchPath!", "ELEV", "", "runas", 1 >> "%temp%\OEgetPrivileges.vbs"
"%temp%\OEgetPrivileges.vbs"
exit /b
:gotpriv

:: ---------------------------------------------------------[Initializations]--------------------------------------------------------
mode CON:COLS=80 LINES=30
color 1B
setlocal enabledelayedexpansion
cd %~dp0

:: ----------------------------------------------------------[Declarations]----------------------------------------------------------
set dir1=client.bkup
set dir2=mods.bkup
set dir3=modules.bkup

:: -----------------------------------------------------------[Execution]------------------------------------------------------------
:main
pushd
cls & echo.

:: Get folder name or path
set /p root=Enter folder name or path:
ping -n 2 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1

:: Determine if root contains a drive letter. Create root folder.
echo.Checking path...
ping -n 2 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
if "%root:~1,1%" == ":" ( goto yesletter ) else ( goto noletter )

:yesletter
echo.Path contains a drive letter. Creating directory as input.
set folder="%root%"
echo.Path is %folder%
md "%folder%
ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
:: Make directory tree
echo Creating directory tree in %folder%...
cd %folder%
ping -n 2 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
md "%dir1%" "%dir2%" "%dir3%"
goto continue

:noletter
echo.Path does not contain a drive letter. Directory will be created here.
set folder="%~dp0%root%"
echo.Path is %folder%
md "%folder%"
ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
:: Make directory tree
echo Creating directory tree in %folder%...
ping -n 2 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
md "%folder%\%dir1%" "%folder%\%dir2%" "%folder%\%dir3%"

:continue

pause
popd && exit /b 0
