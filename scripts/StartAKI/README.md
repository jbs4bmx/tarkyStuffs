
# SPT-AKI STARTUP SCRIPTS - BATCH

> Author: jbs4bmx



### WHAT ARE THESE
These are startup scripts to aid in the launching of SPT's server and launcher. The scripts will detect the presence of the server and launcher exe files and if present start them in order. They start with server first, pause temoprarily to allow the server to complete it's startup, and then they start the launcher. After starting the launcher, the script will wait for the Escape from Tarkov process to be detected and will then set CPU affinity to help enhance the performance of EFT.

CPU affinity can be edited within the script and I have included values for everything from 2-core to 16-core CPUs.
If you need to calculate your own values, I highly recommend this [Processor Affinity Calculator](https://www.gfsg.co.uk/affinitymask.aspx?SubMenuItem=utilties).



### PRODUCT DETAILS
There are two scripts.
Both scripts include values in their comments for configurations of processor affinity for 2-core to 16-core CPUs.

> Start_SPT-AKI.bat
   - For Hyper-Threaded CPUs
   - Determines whether the game runs on physical cores or logical cores by starting at either Core 0 (physical) or Core 1 (logical).

> Start_SPT-AKI_noHT.bat
   - For non-Hyper-Threaded CPUs or CPUs where Hyper-Threading has been disabled.
   - Enables every other "core" starting with either Core 0 or Core 1.



### INSTRUCTIONS:
Place either of the scripts into the root of your SPT folder.
Right-click on the script and select the option to create a shortcut.
Pin the shortcut to your taskbar, Start Menu, or move it to your desktop for easy access.



### CPU AFFINITY CHARTS
** Non-Hyper-Threaded CPUs or CPUs with HT Disabled **
|  CORES  |  AFFINITY                       |
|---------|---------------------------------|
| 2-CORE  | 1 (CPU 0)                       |
|         | 2 (CPU 1)                       |
|---------|---------------------------------|
| 4-CORE  | 5  (CPUs 0,2)                   |
|         | 10 (CPUs 1,3)                   |
|---------|---------------------------------|
| 6-CORE  | 21 (CPUs 0,2,4)                 |
|         | 42 (CPUs 1,3,5)                 |
|---------|---------------------------------|
| 8-CORE  | 85  (CUPs 0,2,4,6)              |
|         | 170 (CPUs 1,3,5,7)              |
|---------|---------------------------------|
| 10-CORE | 341 (CUPs 0,2,4,6,8)            |
|         | 682 (CPUs 1,3,5,7,9)            |
|---------|---------------------------------|
| 12-CORE | 1365 (CUPs 0,2,4,6,8,10)        |
|         | 2730 (CPUs 1,3,5,7,9,11)        |
|---------|---------------------------------|
| 14-CORE | 5461  (CUPs 0,2,4,6,8,10,12)    |
|         | 10922 (CPUs 1,3,5,7,9,11,13)    |
|---------|---------------------------------|
| 16-CORE | 21845 (CUPs 0,2,4,6,8,10,12,14) |
|         | 43690 (CPUs 1,3,5,7,9,11,13,15) |
|---------|---------------------------------|


** Hyper-Threaded CPUs **
|  CORES  |  AFFINITY                                                    |
|------------------------------------------------------------------------|
| 2-CORE  | 5  (CPUs 0,2)                                                |
|         | 10 (CPUs 1,3)                                                |
|---------|--------------------------------------------------------------|
| 4-CORE  | 85  (CPUs 0,2,4,6)                                           |
|         | 170 (CPUs 1,3,5,7)                                           |
|---------|--------------------------------------------------------------|
| 6-CORE  | 1365 (CPUs 0,2,4,6,8,10)                                     |
|         | 2730 (CPUs 1,3,5,7,9,11)                                     |
|---------|--------------------------------------------------------------|
| 8-CORE  | 21845 (CPUs 0,2,4,6,8,10,12,14)                              |
|         | 43690 (CPUs 1,3,5,7,9,11,13,15)                              |
|---------|--------------------------------------------------------------|
| 10-CORE | 349525 (CPUs 0,2,4,6,8,10,12,14,16,18)                       |
|         | 699050 (CPUs 1,3,5,7,9,11,13,15,17,19)                       |
|---------|--------------------------------------------------------------|
| 12-CORE | 5592405  (CPUs 0,2,4,6,8,10,12,14,16,18,20,22)               |
|         | 11184810 (CPUs 1,3,5,7,9,11,13,15,17,19,21,23)               |
|---------|--------------------------------------------------------------|
| 14-CORE | 89478485  (CPUs 0,2,4,6,8,10,12,14,16,18,20,22,24,26)        |
|         | 178956970 (CPUs 1,3,5,7,9,11,13,15,17,19,21,23,25,27)        |
|---------|--------------------------------------------------------------|
| 16-CORE | 1431655765 (CPUs 0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30) |
|         | 2863311530 (CPUs 1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31) |
|------------------------------------------------------------------------|



### Thanks for looking!

