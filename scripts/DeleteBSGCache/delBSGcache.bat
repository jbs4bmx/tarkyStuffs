@echo off
title "BSG Cache Remover"
:: DESCRIPTION
::    This script deletes the cache for Battlestate Games found in the Local AppData Temp folder.
:: NOTES
::    File Name:      | delBSGCache.bat
::    Author:         | jbs4bmx
::    Date:           | [DMY] 17.02.2021
::    Edit:           | [DMY] 17.02.2021
::    Script Version: | 0.1
::    License:        | MIT -- https://opensource.org/licenses/MIT -- Copyright (c) 2021 jbs4bmx

:: ------------------------------------------------------------[Elevation]-----------------------------------------------------------
:: net FILE 1>NUL 2>NUL
:: if '%errorlevel%'=='0' ( goto gotPriv ) else ( goto getPriv )
:: :getPriv
:: if '%1'=='ELEV' ( shift & goto gotPriv )
:: setlocal disabledelayedexpansion
:: set "batchPath=%~0"
:: setlocal enabledelayedexpansion
:: echo SET UAC = CreateObject^("Shell.Application"^) > "%temp%\OEgetPrivileges.vbs"
:: echo UAC.ShellExecute "!batchPath!", "ELEV", "", "runas", 1 >> "%temp%\OEgetPrivileges.vbs"
:: "%temp%\OEgetPrivileges.vbs"
:: exit /B
:: :gotPriv

:: ---------------------------------------------------------[Initializations]--------------------------------------------------------
setlocal enabledelayedexpansion

:: ----------------------------------------------------------[Declarations]----------------------------------------------------------
set folder="%LOCALAPPDATA%\Temp\Battlestate Games"

:: -----------------------------------------------------------[Execution]------------------------------------------------------------
cls
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
echo "|                                        NOTICE                                             |"
echo "|    You now have 15 seconds to cancel this operation using CTRL+C or you can press any     |"
echo "|    other key to cancel the timeout and continue immediately.                              |"
echo "|                                                                                           |"
echo "|     It not recommended to remove the BSG cache files too often. Use this only to reset    |"
echo "|     specific settings such as the cached images for items or traders.                     |"
echo "|                                                                                           |"
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
:: 15 second pause to allow user to cancel should they want to.
timeout /t 15

cls
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
echo "|                               ******** WARNING ********                                   |"
echo "|                       PROCESSING THE REMOVAL OF BSG CACHE FILES NOW                       |"
echo "|                               ******** WARNING ********                                   |"
echo "|                                                                                           |"
echo "|           This window will close when the process has completed. Please wait...           |"
echo "|                                                                                           |"
echo "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-="
:: Remove folder if it exists on the system.
:: The argument "/s" recurses through the directory tree to remove all subfolders and files as well.
:: The argument "/q" suppresses the confirmation dialogue.
if exist %folder% rd %folder% /s /q

:: Slight pause before exiting.
ping -n 7 127.0.0.1 >NUL 2>&1 || ping -n %1 ::1 >NUL 2>&1

exit 0
