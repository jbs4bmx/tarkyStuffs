
# SPT Startup Scripts

> Author: jbs4bmx

### What are these?
These are startup scripts to aid in the launching of SPT's server and launcher. The scripts will detect the presence of the server and launcher exe files and if present start them in order. They start with server first, pause temoprarily to allow the server to complete it's startup, and then they start the launcher. After starting the launcher, the script will wait for the Escape from Tarkov process to be detected and will then set CPU affinity to help enhance the performance of EFT.

CPU affinity can be edited within the script and I have included values for everything from 2-core to 16-core CPUs.
If you need to calculate your own values, I highly recommend this [Processor Affinity Calculator](https://www.gfsg.co.uk/affinitymask.aspx?SubMenuItem=utilties).


### Product Details:
There are two scripts.
One of the scripts is for Hyper-Threaded CPUs, while the other one is for non-Hyper-Threaded CPUs or CPUs where Hyper-Threading has been disabled.
Both have values for enabling every other "core" starting with either 0 or 1. For Hyper-Threaded CPUs, this will determine whether or not the game runs on physical cores, or logical cores.


### Instructions:
Place either of the scripts into the root of your SPT folder.
Right-click on the script and select the option to create a shortcut.
Pin the shortcut to your taskbar, Start Menu, or move it to your desktop for easy access.
