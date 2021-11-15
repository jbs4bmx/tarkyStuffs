# AKI Provisions Pack

A Modpack by me!

>Author  : jbs4bmx

>Version : 1.0.0 (Supports AKI 2.1.0 and EFT 0.12.11.7.15261 - Not backwards compatible with previous versions of AKI.)



## What is this?
This is a collection of mods put into one pack for easy configuration and to improved compatibility. This was an ambitious project as it required downloading and testing everyone's mods that were included and meticulously triggering each mod's actions to ensure they worked and did not conflict with one another.

You can easily turn on and off which ever mods you wish to enable or disable.

This collection merges the following mods:
* jbs4bmx-SuperIFAK
* jbs4bmx-SuperAFAK
* jbs4bmx-AltTraderPics
* jbs4bmx-BandanaOfProtection
* jbs4bmx-MedicalAttention
* Ereshkigal-AkiConfigurator
* Ereshkigal-AllinOneMod
* Ereshkigal-AllMissingKeys
* Kiki-MysteriousKeys
* 
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*


## How do I edit my configurations.
* If you would like to replace this picture, rename the picture of your choosing to include the same string "59b91ca086f77469a81232e4" and copy it to the mod/res folder.
* If a file of the same name exists, click on "Yes" or "OK" to overwrite it.
* To change to png from jpg, and vice versa, you will need to edit the ./src/altTraderPics.js file.

>For this example (Prapor), you would need to change the filetype of the picture in the line
```javascript
https_f.server.sendFile(resp, `${filepath}59b91ca086f77469a81232e4.jpg`);
```
>to
```javascript
https_f.server.sendFile(resp, `${filepath}59b91ca086f77469a81232e4.png`);
```


## Credits
