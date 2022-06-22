# Medical Attention

Enhanced Medications. All meds, kits, injectors, and balms enhanced for your pleasure.

This is meant to be a replacement for SuperIFAK and SuperAFAK mods, however, you may still use those mods if you keep the IFAK and AFAK settings for this mod disabled. If you do not keep them disabled in this mod, the the three mods can conflict with one another and your server may not load and/or their functionality could be broken in game

HP resource values for all items are listed below...
Some items have extra features added but are not listed here. To see those changes, please review the code in src folder.


>Author  : jbs4bmx

>Version : 3.0.0 (Supports SPT-AKI 3.0.0 and EFT Version 0.12.12.15.18346)


### /* ========== CONFIGURABLE MEDICAL SUPPLIES ========== */

Medical Supplies are customizable.
Edit .\src\config.json to change the HP Resource or functionality of Medical Supplies.

Example of config.json
```jsonc
{

    "AI2": {
        "Enable": false,
        "hpResource": 250
    },

    "CAR": {
        "Enable": false,
        "hpResource": 500
    },

    "SALEWA": {
        "Enable": false,
        "hpResource": 1000
    },

    "IFAK": {
        "Enable": false,
        "hpResource": 900,
        "fixFracture": true,
        "fixDestroyedPart": true
    },

    "SANITAR": {
        "Enable": false,
        "hpResource": 5000,
        "fixFracture": true,
        "fixDestroyedPart": true
    },

    "AFAK": {
        "Enable": false,
        "hpResource": 1200,
        "fixFracture": true,
        "fixDestroyedPart": true
    },

    "GRIZZLY": {
        "Enable": false,
        "hpResource": 5000,
        "fixFracture": true,
        "fixDestroyedPart": true
    },

    "PILLS": {
        "Enable": false,
        "hpResource": 24,
        "Duration": 360,
        "HydrationBurn": -4
    },

    "BANDAGES": {
        "Enable": false,
        "hpResource": 4
    },

    "SPLINTS": {
        "Enable": false,
        "hpResource": 8
    },

    "TOPICALS": {
        "Enable": false,
        "hpResource": 10,
        "Energy": 25,
        "Hydration": 25,
        "Duration": 360
    },

    "SURGICALKITS": {
        "Enable": false,
        "hpResource": 10
    },

    "TOURNIQUETS": {
        "Enable": false,
        "hpResource": 5
    },

    "INJECTORS": {
        "Enable": false,
        "hpResource": 4,
        "Duration": 360,
        "HydrationBurn": -4,
        "EnergyBurn": -4
    }
}
```


**WARNING** - There is one caveat to using this mod after enabling "fix fractures" and/or "fix destroyed body parts" on Ifak, Afak, Sanitar Med Kit, or Grizzly...
>When healing fractures or destroyed parts with enhanced med kits, your character cannot move.
>It is a side-effect of adding the "surgical kit"-like features to med kits.
>Take cover to heal if you have these features enabled!
