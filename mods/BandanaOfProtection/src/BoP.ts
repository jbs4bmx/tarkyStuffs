/*
    Mod Version | 3.0.1
    Aki Version | >=3.0.0
    Copyright   | 2022 jbs4bmx
*/

import { DependencyContainer } from "tsyringe";
import { IMod } from "@spt-aki/models/external/mod";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { CustomHandbookItemService } from "@spt-aki/services/CustomHandbookItemService";
import { CustomItemService } from "@spt-aki/services/CustomItemService";
import { CustomTraderAssortService } from "@spt-aki/services/CustomTraderAssortService";

let bopdb;

class Bandana implements IMod
{
    public load(container: DependencyContainer)
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const modLoader = container.resolve("InitialModLoader");
        const customItemService = container.resolve("CustomItemService");
        const customHandbookItemService = container.resolve("CustomHandbookItemService");
        const customTraderAssortService = container.resolve("CustomTraderAssortService");
        const databaseImporter = container.resolve("DatabaseImporter");

        logger.info("Loading: Bandana of Protection");

        bopdb = databaseImporter.loadRecursive(`${modLoader.getModPath("BandanaOfProtection")}database/`);

        for (const item of Object.values(bopdb.templates.items)) {
            customItemService.add(item);
        }
        for (const item of bopdb.templates.handbook.Items) {
            customHandbookItemService.add(item);
        }
        customTraderAssortService.add(bopdb.traders.assort)
    }

    public delayedLoad(container: DependencyContainer)
    {
        const { MainArmor, HeadAreas, Resources, FaceCover } = require('./config.json');
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve("DatabaseServer").getTables();
        const items = db.templates.items;
        const locales = db.locales.global;

        for (const localeID in locales) {
            for (const locale in bopdb.locales.en.templates) {
                locales[localeID].templates[locale] = bopdb.locales.en.templates[locale];
            }
        }
        items["55d7217a4bdc2d86028b456d"]._props.Slots[4]._props.filters[0].Filter.push("BandanaOfProtection00xxx");

        let armor = [];
        let segments = [];
        let fab = "";

        // Armor options
        if (typeof MainArmor.Head === "boolean") { if (MainArmor.Head === true) { armor.push("Head") } } else { armor.push("Head") }
        if (typeof MainArmor.Thorax === "boolean") { if (MainArmor.Thorax === true) { armor.push("Chest") } } else { armor.push("Chest") }
        if (typeof MainArmor.Stomach === "boolean") { if (MainArmor.Stomach === true) { armor.push("Stomach") } } else { armor.push("Stomach") }
        if (typeof MainArmor.LeftArm === "boolean") { if (MainArmor.LeftArm === true) { armor.push("LeftArm") } } else { armor.push("LeftArm") }
        if (typeof MainArmor.RightArm === "boolean") { if (MainArmor.RightArm === true) { armor.push("RightArm") } } else { armor.push("RightArm") }
        if (typeof MainArmor.LeftLeg === "boolean") { if (MainArmor.LeftLeg === true) { armor.push("LeftLeg") } } else { armor.push("LeftLeg") }
        if (typeof MainArmor.RightLeg === "boolean") { if (MainArmor.RightLeg === true) { armor.push("RightLeg") } } else { armor.push("RightLeg") }
        if (typeof HeadAreas.Top === "boolean") { if (HeadAreas.Top === true) { segments.push("Top") } } else { segments.push("Top") }
        if (typeof HeadAreas.Nape === "boolean") { if (HeadAreas.Nape === true) { segments.push("Nape") } } else { segments.push("Nape") }
        if (typeof HeadAreas.Ears === "boolean") { if (HeadAreas.Ears === true) { segments.push("Ears") } } else { segments.push("Ears") }
        if (typeof HeadAreas.Eyes === "boolean") { if (HeadAreas.Eyes === true) { segments.push("Eyes") } } else { segments.push("Eyes") }
        if (typeof HeadAreas.Jaws === "boolean") { if (HeadAreas.Jaws === true) { segments.push("Jaws") } } else { segments.push("Jaws") }
        // Cost and Durability options
        if (typeof Resources.RepairCost === "number") { if ((Resources.RepairCost < 1) || (Resources.RepairCost > 9999999)) { Resources.RepairCost = 1000 } } else { Resources.RepairCost = 1000 }
        if (typeof Resources.Durability === "number") { if ((Resources.Durability < 1) || (Resources.Durability > 9999999)) { Resources.Durability = 1500 } } else { Resources.Durability = 1500 }
        if (typeof Resources.traderPrice === "number") { if ((Resources.traderPrice < 1) || (Resources.traderPrice > 9999999)) { Resources.traderPrice = 69420 } } else { Resources.traderPrice = 69420 }
        // Different face cover options
        if (typeof FaceCover.HalfMask === "boolean") { if (FaceCover.HalfMask) { fab = "" } }
        if (typeof FaceCover.GP5GasMask === "boolean") { if (FaceCover.GP5GasMask) { fab = "assets/content/items/equipment/facecover_gasmask_gp5/item_equipment_facecover_gasmask_gp5.bundle" } }
        if (typeof FaceCover.GP7GasMask === "boolean") { if (FaceCover.GP7GasMask) { fab = "assets/content/items/equipment/facecover_gasmask_gp7/item_equipment_facecover_gasmask_gp7.bundle" } }
        if (typeof FaceCover.Respirator === "boolean") { if (FaceCover.Respirator) { fab = "assets/content/items/equipment/facecover_gasmask_3m/item_equipment_facecover_gasmask_3m.bundle" } }
        if (typeof FaceCover.DevBalaclava === "boolean") { if (FaceCover.DevBalaclava) { fab = "assets/content/items/equipment/facecover_balaclava/item_equipment_facecover_balaclava_development.bundle" } }
        if (typeof FaceCover.JasonMask === "boolean") { if (FaceCover.JasonMask) { fab = "assets/content/items/equipment/facecover_halloween_jason/item_equipment_facecover_halloween_jason.bundle" } }
        if (typeof FaceCover.MichealMask === "boolean") { if (FaceCover.MichealMask) { fab = "assets/content/items/equipment/facecover_halloween_michael/item_equipment_facecover_halloween_micheal.bundle" } }
        if (typeof FaceCover.PestilyMask === "boolean") { if (FaceCover.PestilyMask) { fab = "assets/content/items/equipment/facecover_pestily/item_equipment_facecover_pestily.bundle" } }
        if (typeof FaceCover.SmokeBalaclava === "boolean") { if (FaceCover.SmokeBalaclava) { fab = "assets/content/items/equipment/facecover_smoke/item_equipment_head_smoke.bundle" } }
        if (typeof FaceCover.TagillaGorilla === "boolean") { if (FaceCover.TagillaGorilla) { fab = "assets/content/items/equipment/facecover_welding/item_equipment_facecover_welding_gorilla.bundle" } }
        if (typeof FaceCover.TagillaUBEY === "boolean") { if (FaceCover.TagillaUBEY) { fab = "assets/content/items/equipment/facecover_welding/item_equipment_facecover_welding_kill.bundle" } }
        if (typeof FaceCover.GhostBalaclava === "boolean") { if (FaceCover.GhostBalaclava) { fab = "assets/content/items/equipment/facecover_balaclavaskull/item_equipment_facecover_balaclavaskull.bundle" } }
        if (typeof FaceCover.MomexBalaclava === "boolean") { if (FaceCover.MomexBalaclava) { fab = "assets/content/items/equipment/facecover_nomexbalaclava/item_equipment_facecover_nomexbalaclava.bundle" } }
        if (typeof FaceCover.ColdFearBalaclava === "boolean") { if (FaceCover.ColdFearBalaclava) { fab = "assets/content/items/equipment/facecover_coldgear/item_equipment_facecover_coldgear.bundle" } }
        if (typeof FaceCover.Rivals2021Balaclava === "boolean") { if (FaceCover.Rivals2021Balaclava) { fab = "assets/content/items/equipment/facecover_coldgear/item_equipment_facecover_coldgear_twitch.bundle" } }
        if (typeof FaceCover.Balaclava === "boolean") { if (FaceCover.Balaclava) { fab = "assets/content/items/equipment/facecover_balaclava/item_equipment_facecover_balaclava.bundle" } }
        if (typeof FaceCover.RoninBallistic === "boolean") { if (FaceCover.RoninBallistic) { fab = "assets/content/items/equipment/facecover_devtac/item_equipment_facecover_devtac.bundle" } }
        if (typeof FaceCover.TwitchRivals2020Mask === "boolean") { if (FaceCover.TwitchRivals2020Mask) { fab = "assets/content/items/equipment/facecover_redflame/item_equipment_facecover_redflame_twitch.bundle" } }
        if (typeof FaceCover.TwitchRivals2020HalfMask === "boolean") { if (FaceCover.TwitchRivals2020HalfMask) { fab = "assets/content/items/equipment/facecover_shroud/item_equipment_facecover_shroud_twitch.bundle" } }
        if (typeof FaceCover.GreenShemagh === "boolean") { if (FaceCover.GreenShemagh) { fab = "assets/content/items/equipment/facecover_shemagh/item_equipment_facecover_shemagh.bundle" } }
        if (typeof FaceCover.TanShemagh === "boolean") { if (FaceCover.TanShemagh) { fab = "assets/content/items/equipment/facecover_shemagh_02/item_equipment_facecover_shemagh_02.bundle" } }
        if (typeof FaceCover.ShroudMask === "boolean") { if (FaceCover.ShroudMask) { fab = "assets/content/items/equipment/facecover_shroud/item_equipment_facecover_shroud.bundle" } }
        if (typeof FaceCover.ShatteredMask === "boolean") { if (FaceCover.ShatteredMask) { fab = "assets/content/items/equipment/facecover_shatteredmask/item_equipment_facecover_shatteredmask.bundle" } }
        if (typeof FaceCover.DeadlySkull === "boolean") { if (FaceCover.DeadlySkull) { fab = "assets/content/items/equipment/facecover_skullmask/item_equipment_facecover_skullmask.bundle" } }
        if (typeof FaceCover.NeopreneMask === "boolean") { if (FaceCover.NeopreneMask) { fab = "assets/content/items/equipment/facecover_redflame/item_equipment_facecover_redflame.bundle" } }
        if (typeof FaceCover.GhoulMask === "boolean") { if (FaceCover.GhoulMask) { fab = "assets/content/items/equipment/facecover_halloween_vampire/item_equipment_facecover_halloween_vampire.bundle" } }
        if (typeof FaceCover.SlenderMask === "boolean") { if (FaceCover.SlenderMask) { fab = "assets/content/items/equipment/facecover_halloween_slander/item_equipment_facecover_halloween_slander.bundle" } }
        if (typeof FaceCover.FacelessMask === "boolean") { if (FaceCover.FacelessMask) { fab = "assets/content/items/equipment/facecover_halloween_kaonasi/item_equipment_facecover_halloween_kaonasi.bundle" } }
        if (typeof FaceCover.FakeMustache === "boolean") { if (FaceCover.FakeMustache) { fab = "assets/content/items/equipment/mustache/item_equipment_mustache.bundle" } }
        if (typeof FaceCover.FakeWhiteBeard === "boolean") { if (FaceCover.FakeWhiteBeard) { fab = "assets/content/items/equipment/item_beard/item_beard.bundle" } }
        // Reserved for future use when SPT gets updated to EFT 12.12.30.xxxxx
        //if (typeof FaceCover.BaddiesRedBeard === "boolean") { if (FaceCover.BaddiesRedBeard) { fab = "assets/content/items/equipment/item_equipment_facecover_beard_red.bundle" } }
        //if (typeof FaceCover.BigPipe === "boolean") { if (FaceCover.BigPipe) { fab = "assets/content/items/equipment/item_equipment_facecover_pipe.bundle" } }
        //if (typeof FaceCover.HockeyPlayerCaptain === "boolean") { if (FaceCover.HockeyPlayerCaptain) { fab = "assets/content/items/equipment/item_equipment_facecover_hockey_01.bundle" } }
        //if (typeof FaceCover.HockeyPlayerBrawler === "boolean") { if (FaceCover.HockeyPlayerBrawler) { fab = "assets/content/items/equipment/item_equipment_facecover_hockey_02.bundle" } }
        //if (typeof FaceCover.HockeyPlayerQuiet === "boolean") { if (FaceCover.HockeyPlayerQuiet) { fab = "assets/content/items/equipment/item_equipment_facecover_hockey_03.bundle" } }
        //if (typeof FaceCover.DeathKnightMask === "boolean") { if (FaceCover.DeathKnightMask) { fab = "assets/content/items/equipment/item_equipment_facecover_boss_blackknight.bundle" } }
        //if (typeof FaceCover.GloriousEMask === "boolean") { if (FaceCover.GloriousEMask) { fab = "assets/content/items/equipment/item_equipment_facecover_glorious.bundle" } }

        if (!( fab === "" )) { items["BandanaOfProtection00xxx"]._props.Prefab.path = fab; }
        items["BandanaOfProtection00xxx"]._props.CreditsPrice = Resources.traderPrice;
        items["BandanaOfProtection00xxx"]._props.RepairCost = Resources.RepairCost;
        items["BandanaOfProtection00xxx"]._props.Durability = Resources.Durability;
        items["BandanaOfProtection00xxx"]._props.MaxDurability = Resources.Durability;
        items["BandanaOfProtection00xxx"]._props.armorZone = armor;
        items["BandanaOfProtection00xxx"]._props.headSegments = segments;

        logger.info("Bandana of Protection Mod: Cached Successfully");
    }
}
module.exports = { mod: new Bandana() }