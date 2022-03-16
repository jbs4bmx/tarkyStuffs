/*
	FileName: afak.js
	License: The Unlicense
	Copyright: jbs4bmx
	Website: https://discord.gg/sptaki
	Name: SuperAFAK
	Description: AFAK with additional med features.
	Version: 2.3.0
    Aki Version: >=2.2.0
	Author(s): jbs4bmx
*/

"use strict";

class afak
{
	constructor()
	{
        this.mod = "SuperAFAK v2.3.0";
		Logger.info(`Loading: ${this.mod}`);
		ModLoader.onLoad[this.mod] = this.load.bind(this);
    }

	load()
	{
		const templates = DatabaseServer.tables.templates;
        let products = templates.items;

		for (let item in products)
		{
        	let itemData = products[item];

			//AFAK
			if (itemData._id === "60098ad7c2240c0fe85c570a")
			{
				itemData._props.MaxHpResource = 4000;
				itemData._props.medUseTime = 1;
				itemData._props.hpResourceRate = 100;
				itemData._props.effects_damage.LightBleeding =
				{
					"delay": 0,
					"duration": 0,
					"fadeOut": 0,
					"cost": 30,
					"healthPenaltyMin": 100,
					"healthPenaltyMax": 100
				};
				itemData._props.effects_damage.HeavyBleeding =
				{
					"delay": 0,
					"duration": 0,
					"fadeOut": 0,
					"cost": 50,
					"healthPenaltyMin": 100,
					"healthPenaltyMax": 100
				};
				itemData._props.effects_damage.Fracture =
				{
					"delay": 0,
					"duration": 0,
					"fadeOut": 0,
					"healthPenaltyMin": 100,
					"healthPenaltyMax": 100
				};
				itemData._props.effects_damage.DestroyedPart =
				{
					"delay": 0,
					"duration": 0,
					"fadeOut": 0,
					"healthPenaltyMin": 100,
					"healthPenaltyMax": 100
				};
				itemData._props.effects_damage.RadExposure =
				{
					"delay": 0,
					"duration": 0,
					"fadeOut": 0,
					"cost": 75,
					"healthPenaltyMin": 100,
					"healthPenaltyMax": 100
				};
				itemData._props.effects_damage.Contusion =
				{
					"delay": 0,
					"duration": 0,
					"fadeOut": 0,
					"cost": 0,
					"healthPenaltyMin": 100,
					"healthPenaltyMax": 100
				};
			}
		}
		//Report to Console
        Logger.info("Super AFAK Mod: Cached Successfully");
	}
}

module.exports.afak = afak;