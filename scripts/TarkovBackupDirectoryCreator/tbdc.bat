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
::    Author:         | Jason B. Darling
::    Date:           | [DMY] 25.07.2021
::    Edit:           | [DMY] 28.03.2024
::    Version:        | 0.3
::    License:        | MIT - https://opensource.org/licenses/MIT - Copyright (c) 2021 Jason B. Darling

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

:: ----------------------------------------------------------[Declarations]----------------------------------------------------------
setlocal enabledelayedexpansion
set dir1=client.bkup
set dir2=mods.bkup
set dir3=modules.bkup

:: ---------------------------------------------------------[Initializations]--------------------------------------------------------
cd %~dp0
call :setESC

:: -----------------------------------------------------------[Execution]------------------------------------------------------------
:main
pushd
cls
echo.  && echo.***********************************************************************
echo.*          %ESC%[36mTarkov Backup Directory Creator%ESC%[0m Script by %ESC%[32mjbs4bmx%ESC%[0m          *
echo.*%ESC%[33m---------------------------------------------------------------------%ESC%[0m*
echo.*    Please complete the entry to create your new backup directory    *
echo.*********************************************************************** && echo.

:: Get folder name or path
set /p root=Enter desired folder name or path:
ping -n 2 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1

:: Determine if root contains a drive letter. Create root folder.
echo.  && echo.%ESC%[96mChecking entered path...%ESC%[0m
ping -n 2 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
if "%root:~1,1%" == ":" ( goto yesletter ) else ( goto noletter )


:yesletter
echo.  && echo.%ESC%[34mPath contains a drive letter.%ESC%[0m Creating directory as input by user.
set folder="%root%"
echo.Path is %folder%
md "%folder%
ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
:: Make directory tree
echo.%ESC%[96mCreating directory tree in %folder%...%ESC%[0m
cd %folder%
md "%dir1%" "%dir2%" "%dir3%"
ping -n 2 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
goto continue


:noletter
echo.  && echo.%ESC%[34mPath does not contain a drive letter.%ESC%[0m Directory will be created here.
set folder="%~dp0%root%"
echo.Path is %folder%
md "%folder%"
ping -n 3 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
:: Make directory tree
echo.%ESC%[96mCreating directory tree in %folder%...%ESC%[0m
md "%folder%\%dir1%" "%folder%\%dir2%" "%folder%\%dir3%"
ping -n 2 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1


:continue
echo.  && echo.%ESC%[35mTask completed.%ESC%[0m
echo.%ESC%[96mExiting script...%ESC%[0m
ping -n 5 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
popd && exit 0


:setESC
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set ESC=%%b
  exit /B 0
)
