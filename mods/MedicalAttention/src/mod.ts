/*
	FileName: MedicalAttention.js
	License: MIT
	Copyright: jbs4bmx
	Website: https://discord.gg/sptaki
	Name: MedicalAttention
	Description: Configure Meds to do what you want them to do.
	Version: 3.0.0u1
    Aki Version: >=3.0.0
	Author(s): jbs4bmx
*/

import { DependencyContainer } from "tsyringe";
import { IMod } from "@spt-aki/models/external/mod";

import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer"


"use strict";

class healer implements IMod
{
    public load(container: DependencyContainer): void
    { return }

	public delayedLoad(container: DependencyContainer): void
	{
        const modName = "MedicalAttention v2.2.3";
		const logger = container.resolve<ILogger>("WinstonLogger");

        logger.info(`Loading: ${modName}`);

        const {AI2,CAR,SALEWA,IFAK,SANITAR,AFAK,GRIZZLY,PILLS,BANDAGES,SPLINTS,TOPICALS,SURGICALKITS,TOURNIQUETS,INJECTORS} = require('./config.json');

        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const serverProds = databaseServer.getTables().templates.items;
		const clientProds = databaseServer.getTables().templates.clientItems.data;

		let locationsMin = [
			"laboratory",
			"Interchange",
			"ReservBase"
		]
		let locationsMax = [
			"laboratory",
			"Interchange",
			"Shoreline",
			"ReservBase",
			"factory4_day",
			"factory4_night",
			"bigmap",
			"Woods"
		];

		for (let item in serverProds)
		{
			let itemData = serverProds[item];

			/* ============================== AI2 ======================================= */
			if (AI2.Enable === true) {
				//AI-2 Medkit
				if (itemData._id === "5755356824597772cb798962")
				{
					itemData._props.MaxHpResource = AI2.hpResource
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
			if (CAR.Enable === true) {
				//Car First Aid Kit
				if (itemData._id === "590c661e86f7741e566b646a")
				{
					itemData._props.MaxHpResource = CAR.hpResource;
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
			if (SALEWA.Enable === true) {
				//Salewa
				if (itemData._id === "544fb45d4bdc2dee738b4568")
				{
					itemData._props.MaxHpResource = SALEWA.hpResource;
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
			if (IFAK.Enable === true) {
				//IFAK
				if (itemData._id === "590c678286f77426c9660122")
				{
					itemData._props.MaxHpResource = IFAK.hpResource;
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
					if (IFAK.fixFracture === true) {
						itemData._props.effects_damage.Fracture =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
					};
					if (IFAK.fixDestroyedPart === true) {
						itemData._props.effects_damage.DestroyedPart =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
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
			if (SANITAR.Enable === true) {
				//Sanitar Medkit (IFAK)
				if (itemData._id === "5e99711486f7744bfc4af328")
				{
					itemData._props.MaxHpResource = SANITAR.hpResource;
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
					if (SANITAR.fixFracture === true) {
						itemData._props.effects_damage.Fracture =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
					};
					if (SANITAR.fixDestroyedPart === true) {
						itemData._props.effects_damage.DestroyedPart =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
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
			if (AFAK.Enable === true) {
				//AFAK
				if (itemData._id === "60098ad7c2240c0fe85c570a")
				{
					itemData._props.MaxHpResource = AFAK.hpResource;
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
					if (AFAK.fixFracture === true) {
						itemData._props.effects_damage.Fracture =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
					};
					if (AFAK.fixDestroyedPart === true) {
						itemData._props.effects_damage.DestroyedPart =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
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
			if (GRIZZLY.Enable === true) {
				//Grizzly
				if (itemData._id === "590c657e86f77412b013051d")
				{
					itemData._props.MaxHpResource = GRIZZLY.hpResource;
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
					if (GRIZZLY.fixFracture === true) {
						itemData._props.effects_damage.Fracture =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
					};
					if (GRIZZLY.fixDestroyedPart === true) {
						itemData._props.effects_damage.DestroyedPart =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
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
			if(PILLS.Enable === true) {
				//Analgin Painkillers
				if (itemData._id === "544fb37f4bdc2dee738b4567")
				{
					itemData._props.MaxHpResource = PILLS.hpResource;
					itemData._props.medUseTime = 2;
					itemData._props.effects_health.Hydration =
					{
						"value": PILLS.HydrationBurn
					};
					itemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": PILLS.Duration,
						"fadeOut": 10
					};
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": PILLS.Duration,
						"fadeOut": 10
					};
				}

				//Augmentin Antibiotic Pills
				if (itemData._id === "590c695186f7741e566b64a2")
				{
					itemData._props.MaxHpResource = PILLS.hpResource;
					itemData._props.medUseTime = 5;
					itemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": PILLS.Duration,
						"fadeOut": 10
					};
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": PILLS.Duration,
						"fadeOut": 5
					};
					itemData._props.effects_health.Energy =
					{
						"value": 15
					};
					itemData._props.effects_health.Hydration =
					{
						"value": PILLS.HydrationBurn
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
					itemData._props.MaxHpResource = PILLS.hpResource;
					itemData._props.effects_health.Hydration =
					{
						"value": PILLS.HydrationBurn
					};
					itemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": PILLS.Duration,
						"fadeOut": 5
					};
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": PILLS.Duration,
						"fadeOut": 5
					};
				}
			}

			/* ============================== BANDAGES ================================== */
			if (BANDAGES.Enable === true) {
				//Aseptic Bandage
				if (itemData._id === "544fb25a4bdc2dfb738b4567")
				{
					itemData._props.MaxHpResource = BANDAGES.hpResource;
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
					itemData._props.MaxHpResource = BANDAGES.hpResource;
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
			if (SPLINTS.Enable === true) {
				//Splint
				if (itemData._id === "544fb3364bdc2d34748b456a")
				{
					itemData._props.MaxHpResource = SPLINTS.hpResource;
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
					itemData._props.MaxHpResource = SPLINTS.hpResource;
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
			if (TOPICALS.Enable === true) {
							//Vaseline
				if (itemData._id === "5755383e24597772cb798966")
				{
					itemData._props.MaxHpResource = TOPICALS.hpResource;
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
						"duration": TOPICALS.Duration,
						"fadeOut": 10
					};
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": TOPICALS.Duration,
						"fadeOut": 10
					};
				}

				//Golden Star Balm
				if (itemData._id === "5751a89d24597722aa0e8db0")
				{
					itemData._props.MaxHpResource = TOPICALS.hpResource;
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
						"duration": TOPICALS.Duration,
						"fadeOut": 10
					};
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": TOPICALS.Duration,
						"fadeOut": 10
					};
				}
			}

			/* ============================== SURGICALKITS ============================== */
			if (SURGICALKITS.Enable === true) {
				//CMS Kit
				if (itemData._id === "5d02778e86f774203e7dedbe")
				{
					itemData._props.MaxHpResource = SURGICALKITS.hpResource;
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
					itemData._props.MaxHpResource = SURGICALKITS.hpResource;
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
					itemData._props.MaxHpResource = SURGICALKITS.hpResource;
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
			if (TOURNIQUETS.Enable === true) {
				//Esmarch Tourniquet
				if (itemData._id === "5e831507ea0a7c419c2f9bd9")
				{
					itemData._props.MaxHpResource = TOURNIQUETS.hpResource;
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
					};
				}

				//Calok-B Hemostatic
				if (itemData._id === "5e8488fa988a8701445df1e4")
				{
					itemData._props.MaxHpResource = TOURNIQUETS.hpResource;
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
					};
				}

				//Hemostatic Tourniquet CAT
				if (itemData._id === "60098af40accd37ef2175f27")
				{
					itemData._props.MaxHpResource = TOURNIQUETS.hpResource;
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
					};
				}
			}

			/* ============================== INJECTORS ================================= */
			if (INJECTORS.Enable === true) {
				//Morphine Injector
				if (itemData._id === "544fb3f34bdc2d03748b456a")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.effects_health.Hydration =
					{
						"value": INJECTORS.HydrationBurn
					};
					itemData._props.effects_health.Energy =
					{
						"value": INJECTORS.EnergyBurn
					};
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 3
					};
				}

				//Combat Stimulant Injector SJ1 TGLabs
				if (itemData._id === "5c0e531286f7747fa54205c2")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Regenerative Stimulant Injector eTG-change
				if (itemData._id === "5c0e534186f7747fa1419867")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Combat Stimulant Injector SJ6 TGLabs
				if (itemData._id === "5c0e531d86f7747fa23f4d42")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Combat Stimulant Injector SJ9 TGLabs
				if (itemData._id === "5fca13ca637ee0341a484f46")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Propital
				if (itemData._id === "5c0e530286f7747fa1419862")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMax;
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 5
					};
					itemData._props.effects_damage.Contusion =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 0
					};
				}

				//Hemostatic Drug Zagustin
				if (itemData._id === "5c0e533786f7747fa23f4d47")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMax;
					itemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 5
					};
					itemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 5
					};
				}

				//Adrenaline Injector
				if (itemData._id === "5c10c8fd86f7743d7d706df3")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMax;
					itemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 5
					};
					itemData._props.effects_damage.Contusion =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 0
					};
				}

				//Meldonin
				if (itemData._id === "5ed5160a87bb8443d10680b5")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMin;
				}

				//AHF1-M
				if (itemData._id === "5ed515f6915ec335206e4152")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//3-(b-TG)
				if (itemData._id === "5ed515c8d380ab312177c0fa")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//L1 (Norepinephrine)
				if (itemData._id === "5ed515e03a40a50460332579")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMin;
				}

				//P22
				if (itemData._id === "5ed515ece452db0eb56fc028")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMin;
				}

				//Cocktail "Oldolbos"
				if (itemData._id === "5ed5166ad380ab312177c100")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMin;
				}

				//M.U.L.E. stimulator
				if (itemData._id === "5ed51652f6c34d2cc26336a1")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Antidote xTG-12
				if (itemData._id === "5fca138c2a7b221b2852a5c6")
				{
					itemData._props.MaxHpResource = INJECTORS.hpResource;
					itemData._props.AllowSpawnOnLocations = locationsMin;
				}

			}
		}

		for (let clientItem in clientProds)
		{
			let clientItemData = clientProds[clientItem];

			/* ============================== AI2 ======================================= */
			if (AI2.Enable === true) {
				//AI-2 Medkit
				if (clientItemData._id === "5755356824597772cb798962")
				{
					clientItemData._props.MaxHpResource = AI2.hpResource
					clientItemData._props.medUseTime = 1;
					clientItemData._props.hpResourceRate = 20;
					clientItemData._props.effects_damage.LightBleeding =
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
			if (CAR.Enable === true) {
				//Car First Aid Kit
				if (clientItemData._id === "590c661e86f7741e566b646a")
				{
					clientItemData._props.MaxHpResource = CAR.hpResource;
					clientItemData._props.medUseTime = 3;
					clientItemData._props.hpResourceRate = 50;
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 30,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 50,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 75,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Contusion =
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
			if (SALEWA.Enable === true) {
				//Salewa
				if (clientItemData._id === "544fb45d4bdc2dee738b4568")
				{
					clientItemData._props.MaxHpResource = SALEWA.hpResource;
					clientItemData._props.medUseTime = 3;
					clientItemData._props.hpResourceRate = 100;
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 30,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 50,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 75,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Contusion =
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
			if (IFAK.Enable === true)
			{
				//IFAK
				if (clientItemData._id === "590c678286f77426c9660122")
				{
					clientItemData._props.MaxHpResource = IFAK.hpResource;
					clientItemData._props.medUseTime = 1;
					clientItemData._props.hpResourceRate = 100;
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 30,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 50,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					if (IFAK.fixFracture === true) {
						clientItemData._props.effects_damage.Fracture =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
					};
					if (IFAK.fixDestroyedPart === true) {
						clientItemData._props.effects_damage.DestroyedPart =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 75,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Contusion =
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
			if (SANITAR.Enable === true) {
				//Sanitar Medkit (IFAK)
				if (clientItemData._id === "5e99711486f7744bfc4af328")
				{
					clientItemData._props.MaxHpResource = SANITAR.hpResource;
					clientItemData._props.medUseTime = 1;
					clientItemData._props.hpResourceRate = 100;
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 30,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 50,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					if (SANITAR.fixFracture === true) {
						clientItemData._props.effects_damage.Fracture =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
					};
					if (SANITAR.fixDestroyedPart === true) {
						clientItemData._props.effects_damage.DestroyedPart =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 75,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Contusion =
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
			if (AFAK.Enable === true) {
				//AFAK
				if (clientItemData._id === "60098ad7c2240c0fe85c570a")
				{
					clientItemData._props.MaxHpResource = AFAK.hpResource;
					clientItemData._props.medUseTime = 1;
					clientItemData._props.hpResourceRate = 100;
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 30,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 50,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					if (AFAK.fixFracture === true) {
						clientItemData._props.effects_damage.Fracture =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
					};
					if (AFAK.fixDestroyedPart === true) {
						clientItemData._props.effects_damage.DestroyedPart =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 25,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Contusion =
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
			if (GRIZZLY.Enable === true) {
				//Grizzly
				if (clientItemData._id === "590c657e86f77412b013051d")
				{
					clientItemData._props.MaxHpResource = GRIZZLY.hpResource;
					clientItemData._props.medUseTime = 5;
					clientItemData._props.hpResourceRate = 100;
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 30,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 50,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					if (GRIZZLY.fixFracture === true) {
						clientItemData._props.effects_damage.Fracture =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
					};
					if (GRIZZLY.fixDestroyedPart === true) {
						clientItemData._props.effects_damage.DestroyedPart =
						{
							"delay": 0,
							"duration": 0,
							"fadeOut": 0,
							"healthPenaltyMin": 100,
							"healthPenaltyMax": 100
						}
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 75,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Contusion =
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
			if(PILLS.Enable === true) {
				//Analgin Painkillers
				if (clientItemData._id === "544fb37f4bdc2dee738b4567")
				{
					clientItemData._props.MaxHpResource = PILLS.hpResource;
					clientItemData._props.medUseTime = 2;
					clientItemData._props.effects_health.Hydration =
					{
						"value": PILLS.HydrationBurn
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": PILLS.Duration,
						"fadeOut": 10
					};
					clientItemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": PILLS.Duration,
						"fadeOut": 10
					};
				}

				//Augmentin Antibiotic Pills
				if (clientItemData._id === "590c695186f7741e566b64a2")
				{
					clientItemData._props.MaxHpResource = PILLS.hpResource;
					clientItemData._props.medUseTime = 5;
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": PILLS.Duration,
						"fadeOut": 10
					};
					clientItemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": PILLS.Duration,
						"fadeOut": 5
					};
					clientItemData._props.effects_health.Energy =
					{
						"value": 15
					};
					clientItemData._props.effects_health.Hydration =
					{
						"value": PILLS.HydrationBurn
					};
					clientItemData._props.effects_damage.Intoxication =
					{
						"duration": 0,
						"fadeOut": 0
					};
				}

				//Ibuprofen Pills
				if (clientItemData._id === "5af0548586f7743a532b7e99")
				{
					clientItemData._props.MaxHpResource = PILLS.hpResource;
					clientItemData._props.effects_health.Hydration =
					{
						"value": PILLS.HydrationBurn
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": PILLS.Duration,
						"fadeOut": 5
					};
					clientItemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": PILLS.Duration,
						"fadeOut": 5
					};
				}
			}

			/* ============================== BANDAGES ================================== */
			if (BANDAGES.Enable === true) {
				//Aseptic Bandage
				if (clientItemData._id === "544fb25a4bdc2dfb738b4567")
				{
					clientItemData._props.MaxHpResource = BANDAGES.hpResource;
					clientItemData._props.medUseTime = 2;
					clientItemData._props.hpResourceRate = 1;
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Contusion =
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
				if (clientItemData._id === "5751a25924597722c463c472")
				{
					clientItemData._props.MaxHpResource = BANDAGES.hpResource;
					clientItemData._props.medUseTime = 3;
					clientItemData._props.hpResourceRate = 1;
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Contusion =
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
			if (SPLINTS.Enable === true) {
				//Splint
				if (clientItemData._id === "544fb3364bdc2d34748b456a")
				{
					clientItemData._props.MaxHpResource = SPLINTS.hpResource;
					clientItemData._props.medUseTime = 1;
					clientItemData._props.effects_damage.Fracture =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
				}

				//Aluminum Splint
				if (clientItemData._id === "5af0454c86f7746bf20992e8")
				{
					clientItemData._props.MaxHpResource = SPLINTS.hpResource;
					clientItemData._props.medUseTime = 1;
					clientItemData._props.effects_damage.Fracture =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
				}
			}

			/* ============================== TOPICALS ================================== */
			if (TOPICALS.Enable === true) {
							//Vaseline
				if (clientItemData._id === "5755383e24597772cb798966")
				{
					clientItemData._props.MaxHpResource = TOPICALS.hpResource;
					clientItemData._props.medUseTime = 2;
					clientItemData._props.effects_health.Energy =
					{
						"value": 0
					};
					clientItemData._props.effects_health.Hydration =
					{
						"value": 0
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": TOPICALS.Duration,
						"fadeOut": 10
					};
					clientItemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": TOPICALS.Duration,
						"fadeOut": 10
					};
				}

				//Golden Star Balm
				if (clientItemData._id === "5751a89d24597722aa0e8db0")
				{
					clientItemData._props.MaxHpResource = TOPICALS.hpResource;
					clientItemData._props.effects_health.Energy =
					{
						"value": 0
					};
					clientItemData._props.effects_health.Hydration =
					{
						"value": 0
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": TOPICALS.Duration,
						"fadeOut": 10
					};
					clientItemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": TOPICALS.Duration,
						"fadeOut": 10
					};
				}
			}

			/* ============================== SURGICALKITS ============================== */
			if (SURGICALKITS.Enable === true) {
				//CMS Kit
				if (clientItemData._id === "5d02778e86f774203e7dedbe")
				{
					clientItemData._props.MaxHpResource = SURGICALKITS.hpResource;
					clientItemData._props.medUseTime = 8;
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Fracture =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.DestroyedPart =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Contusion =
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
				if (clientItemData._id === "5e99735686f7744bfc4af32c")
				{
					clientItemData._props.MaxHpResource = SURGICALKITS.hpResource;
					clientItemData._props.medUseTime = 8;
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Fracture =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.DestroyedPart =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Contusion =
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
				if (clientItemData._id === "5d02797c86f774203f38e30a")
				{
					clientItemData._props.MaxHpResource = SURGICALKITS.hpResource;
					clientItemData._props.medUseTime = 12;
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Fracture =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.DestroyedPart =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.RadExposure =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0,
						"cost": 1,
						"healthPenaltyMin": 100,
						"healthPenaltyMax": 100
					};
					clientItemData._props.effects_damage.Contusion =
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
			if (TOURNIQUETS.Enable === true) {
				//Esmarch Tourniquet
				if (clientItemData._id === "5e831507ea0a7c419c2f9bd9")
				{
					clientItemData._props.MaxHpResource = TOURNIQUETS.hpResource;
					clientItemData._props.medUseTime = 3;
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
				}

				//Calok-B Hemostatic
				if (clientItemData._id === "5e8488fa988a8701445df1e4")
				{
					clientItemData._props.MaxHpResource = TOURNIQUETS.hpResource;
					clientItemData._props.medUseTime = 2;
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
				}

				//Hemostatic Tourniquet CAT
				if (clientItemData._id === "60098af40accd37ef2175f27")
				{
					clientItemData._props.MaxHpResource = TOURNIQUETS.hpResource;
					clientItemData._props.medUseTime = 2;
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": 0,
						"fadeOut": 0
					};
				}
			}

			/* ============================== INJECTORS ================================= */
			if (INJECTORS.Enable === true) {
				//Morphine Injector
				if (clientItemData._id === "544fb3f34bdc2d03748b456a")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.effects_health.Hydration =
					{
						"value": INJECTORS.HydrationBurn
					};
					clientItemData._props.effects_health.Energy =
					{
						"value": INJECTORS.EnergyBurn
					};
					clientItemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 3
					};
				}

				//Combat Stimulant Injector SJ1 TGLabs
				if (clientItemData._id === "5c0e531286f7747fa54205c2")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Regenerative Stimulant Injector eTG-change
				if (clientItemData._id === "5c0e534186f7747fa1419867")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Combat Stimulant Injector SJ6 TGLabs
				if (clientItemData._id === "5c0e531d86f7747fa23f4d42")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Combat Stimulant Injector SJ9 TGLabs
				if (clientItemData._id === "5fca13ca637ee0341a484f46")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Propital
				if (clientItemData._id === "5c0e530286f7747fa1419862")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMax;
					clientItemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 5
					};
					clientItemData._props.effects_damage.Contusion =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 0
					};
				}

				//Hemostatic Drug Zagustin
				if (clientItemData._id === "5c0e533786f7747fa23f4d47")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMax;
					clientItemData._props.effects_damage.LightBleeding =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 5
					};
					clientItemData._props.effects_damage.HeavyBleeding =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 5
					};
				}

				//Adrenaline Injector
				if (clientItemData._id === "5c10c8fd86f7743d7d706df3")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMax;
					clientItemData._props.effects_damage.Pain =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 5
					};
					clientItemData._props.effects_damage.Contusion =
					{
						"delay": 0,
						"duration": INJECTORS.Duration,
						"fadeOut": 0
					};
				}

				//Meldonin
				if (clientItemData._id === "5ed5160a87bb8443d10680b5")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMin;
				}

				//AHF1-M
				if (clientItemData._id === "5ed515f6915ec335206e4152")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//3-(b-TG)
				if (clientItemData._id === "5ed515c8d380ab312177c0fa")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//L1 (Norepinephrine)
				if (clientItemData._id === "5ed515e03a40a50460332579")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMin;
				}

				//P22
				if (clientItemData._id === "5ed515ece452db0eb56fc028")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMin;
				}

				//Cocktail "Oldolbos"
				if (clientItemData._id === "5ed5166ad380ab312177c100")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMin;
				}

				//M.U.L.E. stimulator
				if (clientItemData._id === "5ed51652f6c34d2cc26336a1")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMax;
				}

				//Antidote xTG-12
				if (clientItemData._id === "5fca138c2a7b221b2852a5c6")
				{
					clientItemData._props.MaxHpResource = INJECTORS.hpResource;
					clientItemData._props.AllowSpawnOnLocations = locationsMin;
				}

			}
		}

		logger.info(`${modName}: Cached Successfully`);
	}
}

module.exports = { mod: new healer() }