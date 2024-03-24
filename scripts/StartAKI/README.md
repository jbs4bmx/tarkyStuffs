
# SPT-AKI STARTUP SCRIPTS - BATCH

> Author: jbs4bmx



### WHAT ARE THESE
These are startup scripts to aid in the launching of SPT's server and launcher. The scripts will detect the presence of the server and launcher exe files and if present start them in order. They start with server first, pause temoprarily to allow the server to complete it's startup, and then they start the launcher. After starting the launcher, the script will wait for the Escape from Tarkov process to be detected and will then set CPU affinity to help enhance the performance of EFT.

CPU affinity can be edited within the script and I have included values for everything from 2-core to 16-core CPUs.
If you need to calculate your own values, I highly recommend this [Processor Affinity Calculator](https://www.gfsg.co.uk/affinitymask.aspx?SubMenuItem=utilties).

![Example Image](./AKI_Startup_Script.png)

### PRODUCT DETAILS
There are two scripts.
Both scripts include values in their comments for configurations of processor affinity for 2-core to 16-core CPUs.

> Start_SPT-AKI.bat
   - For Hyper-Threaded CPUs
   - Determines whether the game runs on physical cores or logical cores by starting at either Core 0 (physical) or Core 1 (logical).

> Start_SPT-AKI_noHT.bat
   - For non-Hyper-Threaded CPUs or CPUs where Hyper-Threading has been disabled.
   - Enables every other "core" starting with either Core 0 or Core 1.

> Note: Affinity feature is currently not in place for Intel's PE core CPUs. ETA:Unknown


### INSTRUCTIONS:
Place either of the scripts into the root of your SPT folder.
Right-click on the script and select the option to create a shortcut.
Pin the shortcut to your taskbar, Start Menu, or move it to your desktop for easy access.



### CPU AFFINITY CHARTS
** Non-Hyper-Threaded CPUs or CPUs with HT Disabled **
| CORES   | AFFINITY       | CPU CORES                                              | CORE TYPE            |
|---------|---------------:|--------------------------------------------------------|----------------------|
| 2-CORE  | 1<br>2         | (0)<br>(1)                                             | Physical<br>Physical |
| 4-CORE  | 5<br>10        | (0,2)<br>(1,3)                                         | Physical<br>Physical |
| 6-CORE  | 21<br>42       | (0,2,4)<br>(1,3,5)                                     | Physical<br>Physical |
| 8-CORE  | 85<br>170      | (0,2,4,6)<br>(1,3,5,7)                                 | Physical<br>Physical |
| 10-CORE | 341<br>682     | (0,2,4,6,8)<br>(1,3,5,7,9)                             | Physical<br>Physical |
| 12-CORE | 1365<br>2730   | (0,2,4,6,8,10)<br>(1,3,5,7,9,11)                       | Physical<br>Physical |
| 14-CORE | 5461<br>10922  | (0,2,4,6,8,10,12)<br>(1,3,5,7,9,11,13)                 | Physical<br>Physical |
| 16-CORE | 21845<br>43690 | (0,2,4,6,8,10,12,14)<br>(1,3,5,7,9,11,13,15)           | Physical<br>Physical |
<br>

** Hyper-Threaded CPUs **
| CORES   | AFFINITY                 | CPU CORES                                                                                    | CORE TYPE           |
|---------|-------------------------:|----------------------------------------------------------------------------------------------|---------------------|
| 2-CORE  | 5<br>10                  | (0,2)<br>(1,3)                                                                               | Physical<br>Virtual |
| 4-CORE  | 85<br>170                | (0,2,4,6)<br>(1,3,5,7)                                                                       | Physical<br>Virtual |
| 6-CORE  | 1365<br>2730             | (0,2,4,6,8,10)<br>(1,3,5,7,9,11)                                                             | Physical<br>Virtual |
| 8-CORE  | 21845<br>43690           | (0,2,4,6,8,10,12,14)<br>(1,3,5,7,9,11,13,15)                                                 | Physical<br>Virtual |
| 10-CORE | 349525<br>699050         | (0,2,4,6,8,10,12,14,16,18)<br>(1,3,5,7,9,11,13,15,17,19)                                     | Physical<br>Virtual |
| 12-CORE | 5592405<br>11184810      | (0,2,4,6,8,10,12,14,16,18,20,22)<br>(1,3,5,7,9,11,13,15,17,19,21,23)                         | Physical<br>Virtual |
| 14-CORE | 89478485<br>178956970    | (0,2,4,6,8,10,12,14,16,18,20,22,24,26)<br>(1,3,5,7,9,11,13,15,17,19,21,23,25,27)             | Physical<br>Virtual |
| 16-CORE | 1431655765<br>2863311530 | (0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30)<br>(1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31) | Physical<br>Virtual |


### Thanks for looking!
