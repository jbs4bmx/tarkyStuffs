/*
    FileName: Provision.js
    License: The Unlicense
    Copyright: jbs4bmx
    Website: https://discord.gg/sptaki
    Name: AKI Provisions Pack
    Description: ModPack
    Version: 2.1.0
    Aki Version: 2.1.0
    Author(s): jbs4bmx
    Credit:
*/

"use strict";

class Provision {
    constructor() {
        this.mod = "jbs4bmx-AkiProvisionPack";
        Logger.info(`Loading: ${this.mod}`);
        ModLoader.onLoad[this.mod] = this.load.bind(this);

    }

    load() {
        // Mod Config File
        const filepath = `${ModLoader.getModPath(this.mod)}config.json`;
        const Config = JsonUtil.deserialize(VFS.readFile(filepath));

        // AKI Config Files
        const inraid = InraidConfig
        const https = HttpConfig
        const repair = RepairConfig
        const ragfair = RagfairConfig
        const locations = LocationConfig
        const insurance = InsuranceConfig
        const health = HealthConfig
        const bots = BotConfig
        const quest = QuestConfig
        const weatherValues = WeatherConfig
        const trader = TraderConfig
        const inventory = InventoryConfig

        // Database Information
        const database = DatabaseServer.tables;
        const items = database.templates.items;
        const handbook = database.templates.handbook.Items;
        const global = database.locales.global;
        const traders = database.traders;


        //############## SERVER OPTIONS ##################
        https.name = Config.Server.name;
        https.ip = Config.Server.ip;
        https.port = Config.Server.port;
        https.backendUrl = `https://${Config.Server.ip}:${Config.Server.port}`;

        inraid.MIAOnRaidEnd = Config.InRaids.MIAOnRaidEnd;
        inraid.raidMenuSettings.aiAmount = Config.InRaids.raidMenuSettings.aiAmount;
        inraid.raidMenuSettings.aiDifficulty = Config.InRaids.raidMenuSettings.aiDifficulty;
        inraid.raidMenuSettings.bossEnabled = Config.InRaids.raidMenuSettings.bossEnabled;
        inraid.raidMenuSettings.scavWars = Config.InRaids.raidMenuSettings.scavWars;
        inraid.raidMenuSettings.taggedAndCursed = Config.InRaids.raidMenuSettings.taggedAndCursed;
        inraid.save.loot = Config.InRaids.save.loot;
        inraid.save.durability = Config.InRaids.save.durability;



        //############## PLAYER OPTIONS ##################
        health.healthMultipliers.death = Config.HealthSaving.healthMultipliers.death;
        health.healthMultipliers.blacked = Config.HealthSaving.healthMultipliers.blacked;
        health.save.health = Config.HealthSaving.save.health;
        health.save.effects = Config.HealthSaving.save.effects;




        //############## HIDEOUT OPTIONS ##################




        //############## BOT OPTIONS ##################
        bots.pmc.types.assault = Config.Bots.pmcSpawn.BotsToReplaceToPMCchances.Scavs;
        bots.pmc.types.pmcBot = Config.Bots.pmcSpawn.BotsToReplaceToPMCchances.Raiders;
        bots.pmc.types.marksman = Config.Bots.pmcSpawn.BotsToReplaceToPMCchances.scavSnipers;
        bots.pmc.isUsec = Config.Bots.pmcSpawn.usecChance;

        bots.presetBatch.assault = Config.Bots.MaximumLoadoutsAmount.assault;
        bots.presetBatch.marksman = Config.Bots.MaximumLoadoutsAmount.marksman;
        bots.presetBatch.pmcBot = Config.Bots.MaximumLoadoutsAmount.pmcBot;
        bots.presetBatch.bossBully = Config.Bots.MaximumLoadoutsAmount.bossBully;
        bots.presetBatch.bossGluhar = Config.Bots.MaximumLoadoutsAmount.bossGluhar;
        bots.presetBatch.bossKilla = Config.Bots.MaximumLoadoutsAmount.bossKilla;
        bots.presetBatch.bossKojaniy = Config.Bots.MaximumLoadoutsAmount.bossKojaniy;
        bots.presetBatch.bossSanitar = Config.Bots.MaximumLoadoutsAmount.bossSanitar;
        bots.presetBatch.followerBully = Config.Bots.MaximumLoadoutsAmount.followerBully;
        bots.presetBatch.followerGluharAssault = Config.Bots.MaximumLoadoutsAmount.followerGluharAssault;
        bots.presetBatch.followerGluharScout = Config.Bots.MaximumLoadoutsAmount.followerGluharScout;
        bots.presetBatch.followerGluharSecurity = Config.Bots.MaximumLoadoutsAmount.followerGluharSecurity;
        bots.presetBatch.followerGluharSnipe = Config.Bots.MaximumLoadoutsAmount.followerGluharSnipe;
        bots.presetBatch.followerKojaniy = Config.Bots.MaximumLoadoutsAmount.followerKojaniy;
        bots.presetBatch.followerSanitar = Config.Bots.MaximumLoadoutsAmount.followerSanitar;
        bots.presetBatch.test = Config.Bots.MaximumLoadoutsAmount.test;
        bots.presetBatch.followerTest = Config.Bots.MaximumLoadoutsAmount.followerTest;
        bots.presetBatch.bossTest = Config.Bots.MaximumLoadoutsAmount.bossTest;
        bots.presetBatch.assaultGroup = Config.Bots.MaximumLoadoutsAmount.assaultGroup;
        bots.presetBatch.playerScav = Config.Bots.MaximumLoadoutsAmount.assaultGroup;
        bots.presetBatch.sectantWarrior = Config.Bots.MaximumLoadoutsAmount.sectantWarrior;
        bots.presetBatch.sectantPriest = Config.Bots.MaximumLoadoutsAmount.sectantPriest;




        //############## TRADER OPTIONS ##################
        trader.updateTime = Config.traders.assortsUpdateTime;
        trader.fenceAssortSize = Config.traders.fenceNumberOfItemsToSell;

        insurance.priceMultiplier = Config.traders.insurePriceMultiplier;
        insurance.returnChance = Config.traders.insureReturnChance;

        repair.priceMultiplier = Config.traders.repairPriceMultiplier;

        quest.redeemTime = Config.traders.questRedeemTime;

        ragfair.player.sellChance = Config.traders.FleaMarketConfiguration.player.sellChance;
        ragfair.player.sellTimeHrs = Config.traders.FleaMarketConfiguration.player.sellTimeHrs;
        ragfair.player.enableFees = Config.traders.FleaMarketConfiguration.player.enableFees;

        ragfair.traders["54cb50c76803fa8b248b4571"] = Config.traders.FleaMarketConfiguration.staticOffers.EnablePraporOffers;
        ragfair.traders["54cb57776803fa99248b456e"] = Config.traders.FleaMarketConfiguration.staticOffers.EnableTheRapistOffers;
        ragfair.traders["579dc571d53a0658a154fbec"] = Config.traders.FleaMarketConfiguration.staticOffers.EnableFenceOffers;
        ragfair.traders["58330581ace78e27b8b10cee"] = Config.traders.FleaMarketConfiguration.staticOffers.EnableSkierOffers;
        ragfair.traders["5935c25fb3acc3127c3d8cd9"] = Config.traders.FleaMarketConfiguration.staticOffers.EnablePeacekeeperOffers;
        ragfair.traders["5a7c2eca46aef81a7ca2145d"] = Config.traders.FleaMarketConfiguration.staticOffers.EnableMechanicOffers;
        ragfair.traders["5ac3b934156ae10c4430e83c"] = Config.traders.FleaMarketConfiguration.staticOffers.EnableRagmanOffers;
        ragfair.traders["54cb50c76803fa8b248b4571"] = Config.traders.FleaMarketConfiguration.staticOffers.EnableJaegerOffers;
        ragfair.traders["ragfair"] = Config.traders.FleaMarketConfiguration.staticOffers.EnableAllAvailableOffers;

        ragfair.dynamic.enable = Config.traders.FleaMarketConfiguration.dynamicOffers.enable;
        ragfair.dynamic.liveprices = Config.traders.FleaMarketConfiguration.dynamicOffers.liveprices
        ragfair.dynamic.threshold = Config.traders.FleaMarketConfiguration.dynamicOffers.threshold;
        ragfair.dynamic.batchSize = Config.traders.FleaMarketConfiguration.dynamicOffers.batchSize;
        ragfair.dynamic.price.min = Config.traders.FleaMarketConfiguration.dynamicOffers.price.min;
        ragfair.dynamic.price.max = Config.traders.FleaMarketConfiguration.dynamicOffers.price.max;
        ragfair.dynamic.endTime.min = Config.traders.FleaMarketConfiguration.dynamicOffers.endTime.min;
        ragfair.dynamic.endTime.max = Config.traders.FleaMarketConfiguration.dynamicOffers.endTime.max;
        ragfair.dynamic.condition.min = Config.traders.FleaMarketConfiguration.dynamicOffers.condition.min;
        ragfair.dynamic.condition.max = Config.traders.FleaMarketConfiguration.dynamicOffers.condition.max;
        ragfair.dynamic.stack.max = Config.traders.FleaMarketConfiguration.dynamicOffers.stack.max;
        ragfair.dynamic.stack.max = Config.traders.FleaMarketConfiguration.dynamicOffers.stack.max;
        ragfair.dynamic.rating.max = Config.traders.FleaMarketConfiguration.dynamicOffers.rating.max;
        ragfair.dynamic.rating.max = Config.traders.FleaMarketConfiguration.dynamicOffers.rating.max;
        ragfair.dynamic.currencies = Config.traders.FleaMarketConfiguration.dynamicOffers.currencies;



        //############## LOOT OPTIONS ##################
        inventory.newItemsMarkedFound = Config.traders.ItemsMarkedFIRWhenBuyingFromAllTradersAndFleaMarket;



        //############## LOCATION OPTIONS ##################
        locations.allowLootOverlay = Config.Locations.AllowLootToSpawnOnSameSpotMultipleTimes;
        locations.limits.bigmap = Config.Locations.MaximumAllowedLootToSpawn.bigmap;
        locations.limits.develop = Config.Locations.MaximumAllowedLootToSpawn.develop;
        locations.limits.factory4_day = Config.Locations.MaximumAllowedLootToSpawn.factory4_day;
        locations.limits.factory4_night = Config.Locations.MaximumAllowedLootToSpawn.factory4_night;
        locations.limits.interchange = Config.Locations.MaximumAllowedLootToSpawn.interchange;
        locations.limits.laboratory = Config.Locations.MaximumAllowedLootToSpawn.laboratory;
        locations.limits.rezervbase = Config.Locations.MaximumAllowedLootToSpawn.rezervbase;
        locations.limits.shoreline = Config.Locations.MaximumAllowedLootToSpawn.shoreline;
        locations.limits.woods = Config.Locations.MaximumAllowedLootToSpawn.woods;
        locations.limits.tarkovstreets = Config.Locations.MaximumAllowedLootToSpawn.tarkovstreets;

        weatherValues.acceleration = Config.Weather.acceleration;
        weatherValues.weather.clouds.min = Config.Weather.weather.clouds.min;
        weatherValues.weather.clouds.max = Config.Weather.weather.clouds.max;
        weatherValues.weather.windSpeed.min = Config.Weather.weather.windSpeed.min;
        weatherValues.weather.windSpeed.max = Config.Weather.weather.windSpeed.max;
        weatherValues.weather.windDirection.min = Config.Weather.weather.windDirection.min;
        weatherValues.weather.windDirection.max = Config.Weather.weather.windDirection.max;
        weatherValues.weather.windGustiness.min = Config.Weather.weather.windGustiness.min;
        weatherValues.weather.windGustiness.max = Config.Weather.weather.windGustiness.max;
        weatherValues.weather.rain.min = Config.Weather.weather.rain.min;
        weatherValues.weather.rain.max = Config.Weather.weather.rain.max;
        weatherValues.weather.rainIntensity.min = Config.Weather.weather.rainIntensity.min;
        weatherValues.weather.rainIntensity.max = Config.Weather.weather.rainIntensity.max;
        weatherValues.weather.fog.min = Config.Weather.weather.fog.min;
        weatherValues.weather.fog.max = Config.Weather.weather.fog.max;
        weatherValues.weather.temp.min = Config.Weather.weather.temp.min;
        weatherValues.weather.temp.max = Config.Weather.weather.temp.max;
        weatherValues.weather.pressure.min = Config.Weather.weather.pressure.min;
        weatherValues.weather.pressure.max = Config.Weather.weather.pressure.max;



        //############## ARMOR OPTIONS ##################
        if (Config.ARMORS.BoP.Enable) { this.AddBoP();}



        //############## MEDICATION OPTIONS ##################
        if (Config.MEDICATIONS.buffMeds) {
            if (Config.MEDICATIONS.Ifak) { this.BuffIFAK();}
            if (Config.MEDICATIONS.Afak) { this.BuffAFAK();}
            if (Config.MEDICATIONS.Salewa) { this.BuffSalewa();}
            if (Config.MEDICATIONS.Injectors) { this.BuffInjectors();}
        }



        //############## CASE OPTIONS ##################




        //############## PACK OPTIONS ##################




        //############## STASH OPTIONS ##################




        //############## README OPTIONS ##################


    }

    addLegArmor() {
        for (const itemID in database.templates.items) {
            let item = database.templates.items[itemID];
			if (item._props.armorZone) {
				if (Config.ARMORS.LegProtectionAllArmor && item._props.armorZone.includes("Stomach")) {
					if (!item._props.armorZone.includes("RightLeg"))
						item._props.armorZone.push("RightLeg");
					if (!item._props.armorZone.includes("LeftLeg"))
						item._props.armorZone.push("LeftLeg");
				}
                if (Config.ARMORS.LegProtectionAllArmor && item._props.armorZone.includes("Chest")) {
					if (!item._props.armorZone.includes("RightLeg"))
						item._props.armorZone.push("RightLeg");
					if (!item._props.armorZone.includes("LeftLeg"))
						item._props.armorZone.push("LeftLeg");
				}
			}
        }
    }

    addStomachArmor() {
        for (const itemID in database.templates.items) {
            let item = database.templates.items[itemID];
			if (item._props.armorZone) {
				if (Config.ARMORS.StomachProtectionAllArmor && !(item._props.armorZone.includes("Stomach")) && item._props.armorZone.includes("Chest"))
					item._props.armorZone.push("Stomach");
			}
        }
    }

    AddBoP() {
        Logger.info("Bandana of Protection Mod Enabled");
        Logger.info("Configuring BoP...");
        // get configuration values
        let armor = [];
        let segments = [];

        // Build Item Properties
        var itemId = "BandanaPro";
        var itemClone = "572b7fa524597762b747ce82";
        var itemCategory = "5b55501346f783093f2ec222";
        var itemFleaPrice = 1010101;
        var itemPrefabPath = "assets/content/items/equipment/facecover_buffalo/item_equipment_facecover_buffalo.bundle";
        var itemLongName = "Bandana of Protection";
        var itemShortName = "BoP";
        var itemDescription = "A bandana that provides advanced protection for the weak at heart. This bandana provides the extra courage needed by the cowardly lions of Tarkov. You could escape by following the blood stained roads out of Tarkov... or you could just plow your way through scavs and PMCs while wearing this.";
        //Ragman
        var itemTrader = "5ac3b934156ae10c4430e83c";
        var itemTraderPrice = 1234567;
        //Roubles
        var itemTraderCurrency = "5449016a4bdc2d6f028b456f";
        var itemTraderLV = 2;

        //pass info to functions below to create the item
        this.createItemHandbookEntry(itemId, itemCategory, itemFleaPrice, handbook);
        this.createItem(itemId, itemClone, itemPrefabPath, itemLongName, itemShortName, itemDescription, items, global);
        this.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLV, traders);

        //push body armor
        if (typeof Config.ARMORS.BoP.MainArmor.Head === "boolean") {
            if (Config.ARMORS.BoP.MainArmor.Head === true) { armor.push("Head") }
        } else { armor.push("Head") }
        if (typeof Config.ARMORS.BoP.MainArmor.Thorax === "boolean") {
            if (Config.ARMORS.BoP.MainArmor.Thorax === true) { armor.push("Chest") }
        } else { armor.push("Chest") }
        if (typeof Config.ARMORS.BoP.MainArmor.Stomach === "boolean") {
            if (Config.ARMORS.BoP.MainArmor.Stomach === true) { armor.push("Stomach") }
        } else { armor.push("Stomach") }
        if (typeof Config.ARMORS.BoP.MainArmor.LeftArm === "boolean") {
            if (Config.ARMORS.BoP.MainArmor.LeftArm === true) { armor.push("LeftArm") }
        } else { armor.push("LeftArm") }
        if (typeof Config.ARMORS.BoP.MainArmor.RightArm === "boolean") {
            if (Config.ARMORS.BoP.MainArmor.RightArm === true) { armor.push("RightArm") }
        } else { armor.push("RightArm") }
        if (typeof Config.ARMORS.BoP.MainArmor.LeftLeg === "boolean") {
            if (Config.ARMORS.BoP.MainArmor.LeftLeg === true) { armor.push("LeftLeg") }
        } else { armor.push("LeftLeg") }
        if (typeof Config.ARMORS.BoP.MainArmor.RightLeg === "boolean") {
            if (Config.ARMORS.BoP.MainArmor.RightLeg === true) { armor.push("RightLeg") }
        } else { armor.push("RightLeg") }

        //push head segments
        if (typeof Config.ARMORS.BoP.HeadAreas.Top === "boolean") {
            if (Config.ARMORS.BoP.HeadAreas.Top === true) { segments.push("Top") }
        } else { segments.push("Top") }
        if (typeof Config.ARMORS.BoP.HeadAreas.Nape === "boolean") {
            if (Config.ARMORS.BoP.HeadAreas.Nape === true) { segments.push("Nape") }
        } else { segments.push("Nape") }
        if (typeof Config.ARMORS.BoP.HeadAreas.Ears === "boolean") {
            if (Config.ARMORS.BoP.HeadAreas.Ears === true) { segments.push("Ears") }
        } else { segments.push("Ears") }
        if (typeof Config.ARMORS.BoP.HeadAreas.Eyes === "boolean") {
            if (Config.ARMORS.BoP.HeadAreas.Eyes === true) { segments.push("Eyes") }
        } else { segments.push("Eyes") }
        if (typeof Config.ARMORS.BoP.HeadAreas.Jaws === "boolean") {
            if (Config.ARMORS.BoP.HeadAreas.Jaws === true) { segments.push("Jaws") }
        } else { segments.push("Jaws") }

        //change item properties
        items[itemId]._props.RepairCost = 14250;
        items[itemId]._props.Durability = 1000;
        items[itemId]._props.MaxDurability = 1000;
        items[itemId]._props.armorClass = 10;
        items[itemId]._props.armorZone = armor;
        items[itemId]._props.headSegments = segments;
        items[itemId]._props.MaterialType = "BodyArmor";
        items[itemId]._props.ArmorMaterial = "UHMWPE";

        //Report to Console
        Logger.info("Bandana of Protection: Cached Successfully");
    }

    BuffIFAK() {
        Logger.info("IFAK Buff Enabled");
        Logger.info("Configuring IFAK...");
        for (const itemID in database.templates.items) {
            let item = database.templates.items[itemID];
            if (item._id === "590c678286f77426c9660122") {
                item._props.MaxHpResource = Config.MEDICATIONS.IfakCapacity;
				item._props.medUseTime = 1;
				item._props.hpResourceRate = 100;
                item._props.effects_damage.LightBleeding = {
                    "delay": 0,
                    "duration": 0,
                    "fadeOut": 0,
                    "cost": 30,
                    "healthPenaltyMin": 100,
                    "healthPenaltyMax": 100
                };
                item._props.effects_damage.HeavyBleeding = {
                    "delay": 0,
                    "duration": 0,
                    "fadeOut": 0,
                    "cost": 50,
                    "healthPenaltyMin": 100,
                    "healthPenaltyMax": 100
                };
				item._props.effects_damage.RadExposure = {
					"delay": 0,
					"duration": 0,
					"fadeOut": 0,
					"cost": 75,
					"healthPenaltyMin": 100,
					"healthPenaltyMax": 100
				};
				item._props.effects_damage.Contusion = {
					"delay": 0,
					"duration": 0,
					"fadeOut": 0,
					"cost": 0,
					"healthPenaltyMin": 100,
					"healthPenaltyMax": 100
				};
                if (Config.MEDICATIONS.IfakFixFractures) {
                    item._props.effects_damage.Fracture = {
                        "delay": 0,
                        "duration": 0,
                        "fadeOut": 0,
                        "healthPenaltyMin": 100,
                        "healthPenaltyMax": 100
                    };
                    item._props.effects_damage.DestroyedPart = {
                        "delay": 0,
                        "duration": 0,
                        "fadeOut": 0,
                        "healthPenaltyMin": 100,
                        "healthPenaltyMax": 100
                    };
                };
			}
        }
        Logger.info("IFAK Buff: Cached Successfully");
    }

    BuffAFAK() {
        Logger.info("AFAK Buff Enabled");
        Logger.info("Configuring AFAK...");
        for (const itemID in database.templates.items) {
            let item = database.templates.items[itemID];
            if (item._id === "60098ad7c2240c0fe85c570a") {
                item._props.MaxHpResource = Config.MEDICATIONS.AfakCapacity;
				item._props.medUseTime = 1;
				item._props.hpResourceRate = 100;
                item._props.effects_damage.LightBleeding = {
                    "delay": 0,
                    "duration": 0,
                    "fadeOut": 0,
                    "cost": 30,
                    "healthPenaltyMin": 100,
                    "healthPenaltyMax": 100
                };
                item._props.effects_damage.HeavyBleeding = {
                    "delay": 0,
                    "duration": 0,
                    "fadeOut": 0,
                    "cost": 50,
                    "healthPenaltyMin": 100,
                    "healthPenaltyMax": 100
                };
                item._props.effects_damage.RadExposure = {
                    "delay": 0,
                    "duration": 0,
                    "fadeOut": 0,
                    "cost": 75,
                    "healthPenaltyMin": 100,
                    "healthPenaltyMax": 100
                };
                item._props.effects_damage.Contusion = {
                    "delay": 0,
                    "duration": 0,
                    "fadeOut": 0,
                    "cost": 0,
                    "healthPenaltyMin": 100,
                    "healthPenaltyMax": 100
                };
                if (Config.MEDICATIONS.AfakFixFractures) {
                    item._props.effects_damage.Fracture = {
                        "delay": 0,
                        "duration": 0,
                        "fadeOut": 0,
                        "healthPenaltyMin": 100,
                        "healthPenaltyMax": 100
                    };
                    item._props.effects_damage.DestroyedPart = {
                        "delay": 0,
                        "duration": 0,
                        "fadeOut": 0,
                        "healthPenaltyMin": 100,
                        "healthPenaltyMax": 100
                    };
                };
			}
        }
        Logger.info("AFAK Buff: Cached Successfully");
    }

    BuffSalewa() {
        Logger.info("Salewa Buff Enabled");
        Logger.info("Configuring Salewa...");
        for (const itemID in database.templates.items) {
            let item = database.templates.items[itemID];
            if (item._id === "544fb45d4bdc2dee738b4568") {
                item._props.MaxHpResource = 3000;
				item._props.medUseTime = 1;
				item._props.hpResourceRate = 100;
				item._props.effects_damage.LightBleeding = {
                    "delay": 0,
                    "duration": 0,
                    "fadeOut": 0,
                    "cost": 30,
                    "healthPenaltyMin": 100,
                    "healthPenaltyMax": 100
                };
                item._props.effects_damage.HeavyBleeding = {
                    "delay": 0,
                    "duration": 0,
                    "fadeOut": 0,
                    "cost": 50,
                    "healthPenaltyMin": 100,
                    "healthPenaltyMax": 100
                };
                item._props.effects_damage.RadExposure = {
                    "delay": 0,
                    "duration": 0,
                    "fadeOut": 0,
                    "cost": 75,
                    "healthPenaltyMin": 100,
                    "healthPenaltyMax": 100
                };
                item._props.effects_damage.Contusion = {
                    "delay": 0,
                    "duration": 0,
                    "fadeOut": 0,
                    "cost": 0,
                    "healthPenaltyMin": 100,
                    "healthPenaltyMax": 100
                };
                if (Config.MEDICATIONS.SalewaFixFractures) {
                    item._props.effects_damage.Fracture = {
                        "delay": 0,
                        "duration": 0,
                        "fadeOut": 0,
                        "healthPenaltyMin": 100,
                        "healthPenaltyMax": 100
                    };
                    item._props.effects_damage.DestroyedPart = {
                        "delay": 0,
                        "duration": 0,
                        "fadeOut": 0,
                        "healthPenaltyMin": 100,
                        "healthPenaltyMax": 100
                    };
                };
			}
        }
        Logger.info("Salewa Buff: Cached Successfully");
    }

    BuffInjectors() {
        Logger.info("Injectors Buff Enabled");
        Logger.info("Configuring Injectors...");
        //p22
		items["5ed515ece452db0eb56fc028"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//propital
		items["5c0e530286f7747fa1419862"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//meldonin
		items["5ed5160a87bb8443d10680b5"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//mule
		items["5ed51652f6c34d2cc26336a1"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//l1
		items["5ed515e03a40a50460332579"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//zagustin
		items["5c0e533786f7747fa23f4d47"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//obdolbos
		items["5ed5166ad380ab312177c100"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//antidote
		items["5fca138c2a7b221b2852a5c6"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//ahf1m
		items["5ed515f6915ec335206e4152"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//btg
		items["5ed515c8d380ab312177c0fa"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//sj1
		items["5c0e531286f7747fa54205c2"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//adrenaline
		items["5c10c8fd86f7743d7d706df3"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//sj9
		items["5fca13ca637ee0341a484f46"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//etg
		items["5c0e534186f7747fa1419867"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//sj6
		items["5c0e531d86f7747fa23f4d42"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
		//morphine
		items["544fb3f34bdc2d03748b456a"]._props.MaxHpResource = Config.MEDICATIONS.InjectorsCapacity;
        Logger.info("Injectors Buff: Cached Successfully");
    }

    createItemHandbookEntry(i_id, i_category, i_fprice, i_handbook) {
        //add item to handbook
        i_handbook.push(
            {
                "Id": i_id,
                "ParentId": i_category,
                "Price": i_fprice
            }
        );
    }

    createItem(i_id, i_clone, i_path, i_lname, i_sname, i_desc, i_items, i_global) {
        let item = JsonUtil.clone(i_items[i_clone]);
        item._id = i_id;
        //add item back to database
        i_items[i_id] = item;
        //add custom item names to all languages/locales
        for (const localeID in i_global) {
            i_global[localeID].templates[i_id] = {
                "Name": i_lname,
                "ShortName": i_sname,
                "Description": i_desc
            };
        }
    }

    createItemOffer(i_id, i_trader, i_price, i_currency, i_loyalty, i_traders) {
        i_traders[i_trader].assort.items.push(
            {
                "_id": i_id,
                "_tpl": i_id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 999999999
                }
            }
        );
        //add trader cost to item
        i_traders[i_trader].assort.barter_scheme[i_id] = [
            [
                {
                    "CreditsPrice": i_price,
                    "_tpl": i_currency
                }
            ]
        ];
        //add trader loyalty level to item
        i_traders[i_trader].assort.loyal_level_items[i_id] = i_loyalty;
        //add item stack to fleamarket
        i_traders.ragfair.assort.items.push(
            {
                "_id": i_id,
                "_tpl": i_id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 999999
                }
            }
        );
        i_traders.ragfair.assort.loyal_level_items[i_id] = 1;
    }

}

module.exports.Provision = Provision;