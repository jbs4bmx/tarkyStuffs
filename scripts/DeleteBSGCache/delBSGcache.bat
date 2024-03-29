@echo off
title "BSG Cache Remover"
:: DESCRIPTION
::    This script deletes the cache for Battlestate Games found in the Local AppData Temp folder.
:: NOTES
::    Author:         | jbs4bmx
::    Date:           | [DMY] 17.02.2021
::    Edit:           | [DMY] 28.03.2024
::    Script Version: | 0.2
::    License:        | MIT -- https://opensource.org/licenses/MIT -- Copyright (c) 2024 jbs4bmx

:: ------------------------------------------------------------[Elevation]-----------------------------------------------------------
net FILE 1>NUL 2>NUL
if '%errorlevel%'=='0' ( goto gotPriv ) else ( goto getPriv )
:getPriv
if '%1'=='ELEV' ( shift & goto gotPriv )
setlocal disabledelayedexpansion
set "batchPath=%~0"
setlocal enabledelayedexpansion
echo SET UAC = CreateObject^("Shell.Application"^) > "%temp%\OEgetPrivileges.vbs"
echo UAC.ShellExecute "!batchPath!", "ELEV", "", "runas", 1 >> "%temp%\OEgetPrivileges.vbs"
"%temp%\OEgetPrivileges.vbs"
exit /B
:gotPriv

:: ----------------------------------------------------------[Declarations]----------------------------------------------------------
setlocal enabledelayedexpansion
set folder="%LOCALAPPDATA%\Temp\Battlestate Games"

:: ---------------------------------------------------------[Initializations]--------------------------------------------------------
call :setESC

:: -----------------------------------------------------------[Execution]------------------------------------------------------------
cls
echo.  && echo.***********************************************************************
echo.*                 %ESC%[95mDelete BSG Cache%ESC%[0m Script by %ESC%[32mjbs4bmx%ESC%[0m                  *
echo.*%ESC%[33m---------------------------------------------------------------------%ESC%[0m*
echo.*                        %ESC%[31m@@%ESC%[0m IMPORTANT %ESC%[31m@@%ESC%[0m                              *
echo.* You now have 15 seconds to cancel this operation using CTRL+C or    *
echo.* you can press any other key to cancel the timeout and continue      *
echo.* immediately.                                                        *
echo.* It is not recommended to remove the BSG cache files too often. Use  *
echo.* this only to reset specific settings such as the cached images for  *
echo.* items or traders.                                                   *
echo.***********************************************************************
:: 15 second pause to allow user to cancel should they want to.
timeout /t 15
cls
echo.  && echo.***********************************************************************
echo.*                 %ESC%[95mDelete BSG Cache%ESC%[0m Script by %ESC%[32mjbs4bmx%ESC%[0m                  *
echo.*%ESC%[33m---------------------------------------------------------------------%ESC%[0m*
echo.*                      %ESC%[31m******** WARNING ********%ESC%[0m                      *
echo.*            %ESC%[36mPROCESSING THE REMOVAL OF BSG CACHE FILES NOW%ESC%[0m            *
echo.*                      %ESC%[31m******** WARNING ********%ESC%[0m                      *
echo.*                                                                     *
echo.*       This window will close when the process has completed.        *
echo.*                           %ESC%[33mPlease wait...%ESC%[0m                            *
echo.*                                                                     *
echo.***********************************************************************


:ExecuteActions
:: Remove folder if it exists on the system.
if exist %folder% (
    echo.  && echo.%ESC%[36mBSG Cache directory found.%ESC%[0m
    echo.%ESC%[95mDirectory path:%ESC%[0m %folder%
    echo.Processing removal...
    rd %folder% /s /q
    ping -n 7 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
) else (
    echo.  && echo.%ESC%[33mBSG Cache directory not found.%ESC%[0m
    echo.%ESC%[31mDirectory path:%ESC%[0m %folder%
    ping -n 7 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
)

echo.  && echo.Exiting script...
ping -n 5 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1
exit 0

:setESC
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set ESC=%%b
  exit /B 0
)
