# Bandana of Protection

This mod adds a new version of the bandana (half-mask) and adds armor protection for body parts based on how the configuration file is edited.

>Author  : jbs4bmx

>Version : 3.0.1 (Supports SPT-AKI 3.0.0 and EFT Version 0.12.12.15.18346)


### UPDATE 3.0.1
Now adds every face cover option in the game. Choose which face cover you prefer to use by editing the options in the configuration file.
Only enable 1 option though... if you enable more than one, the last one in the list that is enabled, will be used.
Default is the original mod's bandana (HalfMask) option.


### Configuration Guide

You can specify the following configurations in the "\config\config.json" file.
1. "Main Armor" and "Head Segments" are boolean values and must be input as true or false.
   - Values other than true or false will default to true.
2. "Resources" are the property values represented by whole numbers. You can input any value from 1 to 9999999.
   - For RepairCost, marketPrice, and traderPrice, any value below 1 or greater than 9999999 will default to 100000.
   - For Durability, values below 1 or greater than 9999999 will default to 100.
   - For minTraderLevel, values below 1 or greater than 4 will default to 2.
3. "FaceCover" allows you to choose your favorite look.
   - Last option set to true will be used so remember to only set 1 option to TRUE.
   - IMPORTANT: clean temp files before launching the game client to ensure that the changes to the icon show up in the game.

``` json
{
    "MainArmor": {
        "Head": true,       // [Boolean] value must be set to true or false - true = enabled.
        "Thorax": true,     // [Boolean]
        "Stomach": true,    // [Boolean]
        "LeftArm": true,    // [Boolean]
        "RightArm": true,   // [Boolean]
        "LeftLeg": true,    // [Boolean]
        "RightLeg": true    // [Boolean]
    },
    "HeadAreas": {
        "Top": true,    // [Boolean] value must be set to true or false - true = enabled.
        "Nape": true,   // [Boolean]
        "Ears": true,   // [Boolean]
        "Eyes": true,   // [Boolean]
        "Jaws": true    // [Boolean]
    },
    "Resources": {
        "RepairCost": 1,        // [Integer] value must be a whole number - Sets the cost to repair the item. (1-9999999)
        "Durability": 1,        // [Integer] value must be a whole number - Sets the durability amount of the item. (1-9999999)
        "traderPrice": 1        // [Integer] value must be a whole number - Sets the Ragman price of the item. (1-9999999)
    },
    "FaceCover": {
        "HalfMask": true,                   // [Boolean] value must be set to true or false - true = enabled.
        "GP5GasMask": false,                // [Boolean]
        "GP7GasMask": false,                // [Boolean]
        "Respirator": false,                // [Boolean]
        "DevBalaclava": false,              // [Boolean]
        "JasonMask": false,                 // [Boolean]
        "MichealMask": false,               // [Boolean]
        "PestilyMask": false,               // [Boolean]
        "SmokeBalaclava": false,            // [Boolean]
        "TagillaGorilla": false,            // [Boolean]
        "TagillaUBEY": false,               // [Boolean]
        "GhostBalaclava": false,            // [Boolean]
        "MomexBalaclava": false,            // [Boolean]
        "ColdFearBalaclava": false,         // [Boolean]
        "Rivals2021Balaclava": false,       // [Boolean]
        "Balaclava": false,                 // [Boolean]
        "RoninBallistic": false,            // [Boolean]
        "TwitchRivals2020Mask": false,      // [Boolean]
        "TwitchRivals2020HalfMask": false,  // [Boolean]
        "GreenShemagh": false,              // [Boolean]
        "TanShemagh": false,                // [Boolean]
        "ShroudMask": false,                // [Boolean]
        "ShatteredMask": false,             // [Boolean]
        "DeadlySkull": false,               // [Boolean]
        "NeopreneMask": false,              // [Boolean]
        "GhoulMask": false,                 // [Boolean]
        "SlenderMask": false,               // [Boolean]
        "FacelessMask": false,              // [Boolean]
        "FakeMustache": false,              // [Boolean]
        "FakeWhiteBeard": false,            // [Boolean]
        "Reserved for future use": "The following items are not currently available in SPT 3.0.0",
        "BaddiesRedBeard": false,           // [Boolean]
        "BigPipe": false,                   // [Boolean]
        "HockeyPlayerCaptain": false,       // [Boolean]
        "HockeyPlayerBrawler": false,       // [Boolean]
        "HockeyPlayerQuiet": false,         // [Boolean]
        "DeathKnightMask": false,           // [Boolean]
        "GloriousEMask": false              // [Boolean]
}
```
