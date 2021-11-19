/*
	FileName: MedicalAttention.js
	License: The Unlicense
	Copyright: jbs4bmx
	Website: https://discord.gg/sptaki
	Name: MedicalAttention
	Description: Configure Meds to do what you want them to do.
	Version: 2.1.1
    Aki Version: 2.1.0
	Author(s): jbs4bmx
*/

"use strict";

class healer
{
	constructor()
	{
		this.mod = "jbs4bmx-MedicalAttention";
		Logger.info(`Loading: ${this.mod}`);
		ModLoader.onLoad[this.mod] = this.load.bind(this);
    }

	load()
	{
		const { AI2,CAR,SALEWA,IFAK,SANITAR,AFAK,GRIZZLY,PILLS,BANDAGES,SPLINTS,TOPICALS,SURGICALKITS,TOURNIQUETS,INJECTORS } = require('./config.json');

		const templates = DatabaseServer.tables.templates;
        let products = templates.items;

		let locationsMin = [
			"laboratory",
			"Interchange",
			"ReservBase"
		]
		let locationsMax = [
			"laboratory",
			"Interchange",
			"Shoreline",
			"RezervBase",
			"factory4_day",
			"factory4_night",
			"bigmap",
			"Woods"
		];

		for (let item in products)
		{
			let itemData = products[item];

			/* ============================== AI2 ======================================= */
			if (AI2.Enable) {
				//AI-2 Medkit
				if (itemData._id === "5755356824597772cb798962")
				{
					itemData._props.MaxHpResource = 250;
					itemData._props.medUseTime = 1;
					itemData._props.hpResourceRate = 20;
					itemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 30,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
				}
			}

			/* ============================== CAR ======================================= */
			if (CAR.Enable) {
				//Car First Aid Kit
				if (itemData._id === "590c661e86f7741e566b646a")
				{
					itemData._props.MaxHpResource = 500;
					itemData._props.medUseTime = 3;
					itemData._props.hpResourceRate = 50;
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
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
				}
			}

			/* ============================== SALEWA ==================================== */
			if (SALEWA.Enable) {
				//Salewa
				if (itemData._id === "544fb45d4bdc2dee738b4568")
				{
					itemData._props.MaxHpResource = 1000;
					itemData._props.medUseTime = 3;
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

			/* ============================== IFAK ====================================== */
			if (IFAK.Enable) {
				//IFAK
				if (itemData._id === "590c678286f77426c9660122")
				{
					itemData._props.MaxHpResource = 900;
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

			/* ============================== SANITAR =================================== */
			if (SANITAR.Enable) {
				//Sanitar Medkit (IFAK)
				if (itemData._id === "5e99711486f7744bfc4af328")
				{
					itemData._props.MaxHpResource = 6000;
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

			/* ============================== AFAK ====================================== */
			if (AFAK.Enable) {
				//AFAK
				if (itemData._id === "60098ad7c2240c0fe85c570a")
				{
					itemData._props.MaxHpResource = 1200;
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
						"cost": 25,
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

			/* ============================== GRIZZLY =================================== */
			if (GRIZZLY.Enable) {
				//Grizzly
				if (itemData._id === "590c657e86f77412b013051d")
				{
					itemData._props.MaxHpResource = 5000;
					itemData._props.medUseTime = 5;
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

			/* ============================== PILLS ===================================== */
			if(PILLS.Enable) {
				//Analgin Painkillers
				if (itemData._id === "544fb37f4bdc2dee738b4567")
				{
					itemData._props.MaxHpResource = 10;
					itemData._props.medUseTime = 2;
					itemData._props.effects_health.Hydration =
					{
						"value": -4
					};
					itemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 180,
						"fadeOut": 10
					};
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": 180,
						"fadeOut": 10
					};
				}

				//Augmentin Antibiotic Pills
				if (itemData._id === "590c695186f7741e566b64a2")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.medUseTime = 5;
					itemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 180,
						"fadeOut": 10
					};
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": 300,
						"fadeOut": 5
					};
					itemData._props.effects_health.Energy =
					{
						"value": 15
					};
					itemData._props.effects_health.Hydration =
					{
						"value": -3
					};
					itemData._props.effects_damage.Intoxication =
					{
						"duration": 0,
						"fadeOut": 0
					};
				}

				//Ibuprofen Pills
				if (itemData._id === "5af0548586f7743a532b7e99")
				{
					itemData._props.MaxHpResource = 24;
					itemData._props.effects_health.Hydration =
					{
						"value": -3
					};
					itemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 360,
						"fadeOut": 5
					};
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": 360,
						"fadeOut": 5
					};
				}
			}

			/* ============================== BANDAGES ================================== */
			if (BANDAGES.Enable) {
				//Aseptic Bandage
				if (itemData._id === "544fb25a4bdc2dfb738b4567")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.medUseTime = 2;
					itemData._props.hpResourceRate = 1;
					itemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					itemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					itemData._props.effects_damage.Contusion =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
				}

				//Army Bandage
				if (itemData._id === "5751a25924597722c463c472")
				{
					itemData._props.MaxHpResource = 10;
					itemData._props.medUseTime = 3;
					itemData._props.hpResourceRate = 1;
					itemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					itemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					itemData._props.effects_damage.Contusion =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
				}
			}

			/* ============================== SPLINTS =================================== */
			if (SPLINTS.Enable) {
				//Splint
				if (itemData._id === "544fb3364bdc2d34748b456a")
				{
					itemData._props.MaxHpResource = 3;
					itemData._props.medUseTime = 1;
					itemData._props.effects_damage.Fracture =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
				}

				//Aluminum Splint
				if (itemData._id === "5af0454c86f7746bf20992e8")
				{
					itemData._props.MaxHpResource = 10;
					itemData._props.medUseTime = 1;
					itemData._props.effects_damage.Fracture =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
				}
			}

			/* ============================== TOPICALS ================================== */
			if (TOPICALS.Enable) {
							//Vaseline
				if (itemData._id === "5755383e24597772cb798966")
				{
					itemData._props.MaxHpResource = 10;
					itemData._props.medUseTime = 2;
					itemData._props.effects_health.Energy =
					{
						"value": 0
					};
					itemData._props.effects_health.Hydration =
					{
						"value": 0
					};
					itemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 180,
						"fadeOut": 10
					};
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": 240,
						"fadeOut": 10
					};
				}

				//Golden Star Balm
				if (itemData._id === "5751a89d24597722aa0e8db0")
				{
					itemData._props.MaxHpResource = 20;
					itemData._props.effects_health.Energy =
					{
						"value": 0
					};
					itemData._props.effects_health.Hydration =
					{
						"value": 0
					};
					itemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 800,
						"fadeOut": 10
					};
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": 800,
						"fadeOut": 10
					};
				}
			}

			/* ============================== SURGICALKITS ============================== */
			if (SURGICALKITS.Enable) {
				//CMS Kit
				if (itemData._id === "5d02778e86f774203e7dedbe")
				{
					itemData._props.MaxHpResource = 10;
					itemData._props.medUseTime = 8;
					itemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					itemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
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
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					itemData._props.effects_damage.Contusion =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
				}

				//Sanitar Medical Surgical Kit
				if (itemData._id === "5e99735686f7744bfc4af32c")
				{
					itemData._props.MaxHpResource = 50;
					itemData._props.medUseTime = 8;
					itemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					itemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
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
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					itemData._props.effects_damage.Contusion =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
				}

				//Surv12 Field Surgical Kit
				if (itemData._id === "5d02797c86f774203f38e30a")
				{
					itemData._props.MaxHpResource = 20;
					itemData._props.medUseTime = 12;
					itemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					itemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
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
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					itemData._props.effects_damage.Contusion =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
				}
			}

			/* ============================== TOURNIQUETS =============================== */
			if (TOURNIQUETS.Enable) {
				//Esmarch Tourniquet
				if (itemData._id === "5e831507ea0a7c419c2f9bd9")
				{
					itemData._props.MaxHpResource = 2;
					itemData._props.medUseTime = 3;
					itemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
					itemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					}
				}

				//Calok-B Hemostatic
				if (itemData._id === "5e8488fa988a8701445df1e4")
				{
					itemData._props.MaxHpResource = 8;
					itemData._props.medUseTime = 2;
					itemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
					itemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					}
				}

				//Hemostatic Tourniquet CAT
				if (itemData._id === "60098af40accd37ef2175f27")
				{
					itemData._props.MaxHpResource = 3;
					itemData._props.medUseTime = 2;
					itemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
					itemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					}
				}
			}

			/* ============================== INJECTORS ================================= */
			if (INJECTORS.Enable) {
				//Morphine Injector
				if (itemData._id === "544fb3f34bdc2d03748b456a")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.effects_health.Hydration =
					{
						"value": -5
					};
					itemData._props.effects_health.Energy =
					{
						"value": -3
					};
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": 600,
						"fadeOut": 3
					};
				}

				//Combat Stimulant Injector SJ1 TGLabs
				if (itemData._id === "5c0e531286f7747fa54205c2")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Regenerative Stimulant Injector eTG-change
				if (itemData._id === "5c0e534186f7747fa1419867")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Combat Stimulant Injector SJ6 TGLabs
				if (itemData._id === "5c0e531d86f7747fa23f4d42")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Combat Stimulant Injector SJ9 TGLabs
				if (itemData._id === "5fca13ca637ee0341a484f46")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Propital
				if (itemData._id === "5c0e530286f7747fa1419862")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMax;
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": 480,
						"fadeOut": 5
					};
					itemData._props.effects_damage.Contusion =
					{
						"delay": 0,
						"duration": 480,
						"fadeOut": 0
					};
				}

				//Hemostatic Drug Zagustin
				if (itemData._id === "5c0e533786f7747fa23f4d47")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMax;
					itemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 360,
						"fadeOut": 5
					};
					itemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 360,
						"fadeOut": 5
					};
				}

				//Adrenaline Injector
				if (itemData._id === "5c10c8fd86f7743d7d706df3")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMax;
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": 240,
						"fadeOut": 5
					};
					itemData._props.effects_damage.Contusion =
					{
						"delay": 0,
						"duration": 240,
						"fadeOut": 0
					};
				}

				//Meldonin
				if (itemData._id === "5ed5160a87bb8443d10680b5")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMin;
				}

				//AHF1-M
				if (itemData._id === "5ed515f6915ec335206e4152")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//3-(b-TG)
				if (itemData._id === "5ed515c8d380ab312177c0fa")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//L1 (Norepinephrine)
				if (itemData._id === "5ed515e03a40a50460332579")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMin;
				}

				//P22
				if (itemData._id === "5ed515ece452db0eb56fc028")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMin;
				}

				//Cocktail "Oldolbos"
				if (itemData._id === "5ed5166ad380ab312177c100")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMin;
				}

				//M.U.L.E. stimulator
				if (itemData._id === "5448f3a64bdc2d60728b456a")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Antidote xTG-12
				if (itemData._id === "5fca138c2a7b221b2852a5c6")
				{
					itemData._props.MaxHpResource = 4;
					itemData._props.AllowSpawnOnLocations = locationsMin;
				}
			}


		}
		//Report to Console
        Logger.info("Medical Attention Mod: Cached Successfully");
	}
}

module.exports.healMe = healer;