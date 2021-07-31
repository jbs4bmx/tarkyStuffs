# DeleteBSGCache
A script to delete the game cache for EfT


A simple Windows Batch script to delete the BSG cache folder in a User's Local AppData folder. Recommended to run prior to loading mods in SPT-AKI that may edit pre-cached elements of the game.

Admin Privileges are not required to run this script.

You'll be greeted with this screen upon running the script:
```
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
|                                        NOTICE                                             |
|    You now have 15 seconds to cancel this operation using CTRL+C or you can press any     |
|    other key to cancel the timeout and continue immediately.                              |
|                                                                                           |
|     It not recommended to remove the BSG cache files too often. Use this only to reset    |
|     specific settings such as the cached images for items or traders.                     |
|                                                                                           |
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
```

And then this screen if you continue:
```
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
|                               ******** WARNING ********                                   |
|                       PROCESSING THE REMOVAL OF BSG CACHE FILES NOW                       |
|                               ******** WARNING ********                                   |
|                                                                                           |
|           This window will close when the process has completed. Please wait...           |
|                                                                                           |
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
```

The script will remove the "**Battlestate Games**" folder located at _**C:\\Users\\{USERNAME}\\AppData\\Local\\Temp\\Battlestate Games**_
