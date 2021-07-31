/* ifak.js
       license: The Unlicense
     copyright: jbs4bmx
       website: https://www.guilded.gg/senkospub
          name: SuperIFAK
   description: SuperIFAK mod by xKyle now ported to SPT-AKI with additional med features.
       version: 2.0.0
     author(s): jbs4bmx
        CREDIT: xKyle (original author)
*/

"use strict";

class ifak
{
	constructor()
	{
        this.mod = "jbs4bmx-SuperIFAK";
		Logger.log(`Loading: ${this.mod}`);
		ModLoader.onLoad[this.mod] = this.load.bind(this);
    }

	load()
	{
		const templates = DatabaseServer.tables.templates;
        let products = templates.items;

		for (let item in products)
		{
        	let itemData = products[item];

			//IFAK
			if (itemData._id === "590c678286f77426c9660122")
			{
				itemData._props.MaxHpResource = 3000;
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
        Logger.log("Super IFAK Mod: Cached Successfully");
	}
}

module.exports.ifak = ifak;