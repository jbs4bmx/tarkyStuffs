/*
    Mod Version | 3.0.0
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
        const { MainArmor, HeadAreas, Resources } = require('./config.json');
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
        if (typeof Resources.RepairCost === "number") { if ((Resources.RepairCost < 1) || (Resources.RepairCost > 9999999)) { Resources.RepairCost = 1000 } } else { Resources.RepairCost = 1000 }
        if (typeof Resources.Durability === "number") { if ((Resources.Durability < 1) || (Resources.Durability > 9999999)) { Resources.Durability = 1500 } } else { Resources.Durability = 1500 }
        if (typeof Resources.traderPrice === "number") { if ((Resources.traderPrice < 1) || (Resources.traderPrice > 9999999)) { Resources.traderPrice = 69420 } } else { Resources.traderPrice = 69420 }

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