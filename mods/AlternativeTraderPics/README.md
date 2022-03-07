# Alternative Trader Pictures

Updates Trader icons to a much better looking alternative.

>Author  : jbs4bmx, revaxl

>Version : 2.2.3 (Supports SPT-AKI 2.2.3 and EFT Version 0.12.12.15.16909)



## Additional Mod Support
This mod supports traders from other mods as well. I will attempt to do my best to keep up with the ever changing mod list out there, but I cannot make any guarantees.

List of supported mods:
  * (ATF) Valkyrie Trader by CZ_2128
  * AIO-Seller by bluehead
  * AKGuy Super Shop by Fershte
  * Alternative Trader Pics (THIS MOD)
  * AR Shoppe (Kugel-Armalite Reloaded) by Fershte
  * BiggerBang by Thunderbags
  * Ducc Trader by ducc
  * Food&Drink Trader by Revingly
  * GearGal by Fershte
  * Hardcore Traders by Meiosis
  * Lock Picking Attorney by Revingly
  * Operator by alex
  * Priscilu by Reis
  * QuestManiac by Andrudis
  * Questor and Gunsmith by alex
  * Scav Cat by DonutxLord
  * ScavCat Redux by SixGod
  * TerraGroup Specialist by Ereshkigal



## Installation
Just place the folder named "ZZ-AlternativeTraderPics" into your "/user/mods" folder.

This mod should be loaded after all other mods that add new traders.

If you suspect that this mod is loading after an additional trader is added, the load order may need to be changed by adding an additional "Z" or more to the folders name.

After altering the name, delete BSG temp folder found in "C:\Users\{username}\AppData\Local\Temp\Battlestate Games". You can find this by typing in "%LocalAppData%" (no quotes) into the address bar of Windows File Explorer. Delete the "Battlestate Games" folder.



## Customizing
You can customize it too!

You can replace the traders with whatever pictures you like.

Follow these guidelines to make sure the new pictures fit the item frames within the game.
* Recommend square pictures but round can also be used
* Transparency is ok
* Recommended photo size = between 128x and 256x inclusive for best compatibility.
  * Pictures can be larger (512x, 1024x, etc.), but it requires more memory to store the larger file sizes while the game is running.
  * It can take longer for the game to load the images if there are a lot of large file sizes.
* Recommended filetype = jpg or png



### Example: Prapor --> ./res/59b91ca086f77469a81232e4.jpg (256x256)
* If you would like to replace this picture, rename the picture of your choosing to include the same string "59b91ca086f77469a81232e4" and copy it to the mod/res folder.
* If a file of the same name exists, click on "Yes" or "OK" to overwrite it.
* To change to png from jpg, and vice versa, you will need to edit the ./src/config.js file.

>For this example (Prapor), you would need to change the filetype of the picture in the line
```json
"extension": "jpg",
```
>to
```json
"extension": "png",
```