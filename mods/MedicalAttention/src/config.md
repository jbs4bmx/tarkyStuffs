# Configuration Guide for Medical Attention mod

```json
{

    "AI2": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 250           // This is the amount of HP this item has. (Whole number only.)
    },

    "CAR": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 500           // This is the amount of HP this item has. (Whole number only.)
    },

    "SALEWA": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 1000          // This is the amount of HP this item has. (Whole number only.)
    },

    "IFAK": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 900,          // This is the amount of HP this item has. (Whole number only.)
        "fixFracture": true,        // Fix a broken limb. ('true' to enable : 'false' to disable)
        "fixDestroyedPart": true    // Fix a blacked out body part. ('true' to enable : 'false' to disable)
    },

    "SANITAR": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 5000,         // This is the amount of HP this item has. (Whole number only.)
        "fixFracture": true,        // Fix a broken limb. ('true' to enable : 'false' to disable)
        "fixDestroyedPart": true    // Fix a blacked out body part. ('true' to enable : 'false' to disable)
    },

    "AFAK": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 1200,         // This is the amount of HP this item has. (Whole number only.)
        "fixFracture": true,        // Fix a broken limb. ('true' to enable : 'false' to disable)
        "fixDestroyedPart": true    // Fix a blacked out body part. ('true' to enable : 'false' to disable)
    },

    "GRIZZLY": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 5000,         // This is the amount of HP this item has. (Whole number only.)
        "fixFracture": true,        // Fix a broken limb. ('true' to enable : 'false' to disable)
        "fixDestroyedPart": true    // Fix a blacked out body part. ('true' to enable : 'false' to disable)
    },

    "PILLS": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 24,           // This is the amount of HP this item has. (Whole number only.)
        "Duration": 360,            // This changes the duration of the buff measured in seconds.
        "HydrationBurn": -4         // This is the amount of hydration lost per cycle by using this item.
    },

    "BANDAGES": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 4             // This is the amount of HP this item has. (Whole number only.)
    },

    "SPLINTS": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 8             // This is the amount of HP this item has. (Whole number only.)
    },

    "TOPICALS": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 10,           // This is the amount of HP this item has. (Whole number only.)
        "Energy": 25,               // This is the amount of energy gained per cycle by using this item.
        "Hydration": 25,            // This is the amount of hydration gained per cycle by using this item.
        "Duration": 360             // This changes the duration of the buff. Measured in seconds.
    },

    "SURGICALKITS": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 10            // This is the amount of HP this item has. (Whole number only.)
    },

    "TOURNIQUETS": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 5             // This is the amount of HP this item has. (Whole number only.)
    },

    "INJECTORS": {
        "Enable": false,            // Enable or Disable modification of this item. ('true' to enable : 'false' to disable)
        "hpResource": 4,            // This is the amount of HP this item has. (Whole number only.)
        "Duration": 360,            // This changes the duration of the buff. Measured in seconds.
        "HydrationBurn": -4,        // This is the amount of hydration lost per cycle by using this item.
        "EnergyBurn": -4            // This is the amount of energy lost per cycle by using this item.
    }
}
```