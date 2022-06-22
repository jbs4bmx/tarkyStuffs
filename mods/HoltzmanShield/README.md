# Holtzman Shield

This mod adds a new version of the Evasion Armband based loosely on the shield technology from the Novel/Movies "Dune". It adds armor protection for body parts as defined in the configuration file. You may alter the level of protection by editing the values found in the 'config.json' file.

>Author  : jbs4bmx

>Version : 3.0.0 (Supports SPT-AKI 3.0.0 and EFT Version 0.12.12.15.18346)

>Requires SPT version 3.0.0



### ==================================================


### WARNING!!!
:bangbang: **ONLY SPT v3.0.0 SUPPORTED. THIS MOD IS NOT COMPATIBLE WITH OLD SPT VERSIONS.** :bangbang:

:bangbang: **This mod is provided _as-is_ with _no guarantee_ of support.** :bangbang:


### ==================================================


### How to Install this Mod.
"[SPT]" = Your SPT-AKI folder path

1. Copy contents of "HoltzmanShield_3.0.0.zip" into your [SPT] folder.
2. Profit.


### ==================================================


### Configuration Guide
Edit .\src\config.json as desired.

config.json contents
```json
{
    "MainArmor": {
        "Head": false,          // [Boolean] Set "true" to enable protection for this part of the body.
        "Chest": false,         // [Boolean] Set "true" to enable protection for this part of the body.
        "Stomach": false,       // [Boolean] Set "true" to enable protection for this part of the body.
        "LeftArm": false,       // [Boolean] Set "true" to enable protection for this part of the body.
        "RightArm": false,      // [Boolean] Set "true" to enable protection for this part of the body.
        "LeftLeg": false,       // [Boolean] Set "true" to enable protection for this part of the body.
        "RightLeg": false       // [Boolean] Set "true" to enable protection for this part of the body.
    },
    "HeadAreas": {
        "Top": false,           // [Boolean] Set "true" to enable protection for this part of the body.
        "Nape": false,          // [Boolean] Set "true" to enable protection for this part of the body.
        "Ears": false,          // [Boolean] Set "true" to enable protection for this part of the body.
        "Eyes": false,          // [Boolean] Set "true" to enable protection for this part of the body.
        "Jaws": false           // [Boolean] Set "true" to enable protection for this part of the body.
    },
    "Resources": {
        "RepairCost": 1000,     // [Number] (Any number >= 0) Sets the cost of repairing the item.
        "Durability": 1500,     // [Number] (Any number >= 0) Increases or decreases the amount of armor this item provides.
        "minTraderLevel": 1,    // [Number] (Any number between 1 and 4) Sets the minimum trader level to have before you can purchase the item.
        "marketPrice": 69420,   // [Number] (Any number >= 0) Sets the market price of the item as found in the flea market.
        "traderPrice": 69420    // [Number] (Any number >= 0) Sets the price charged by Ragman.
    },
    "other": {
        "HideWarningMessage": false     // [Boolean] Set "true" to disable this message when the server starts.
    }
}
```

:eof