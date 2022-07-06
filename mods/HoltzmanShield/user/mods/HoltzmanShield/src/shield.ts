/*
    Mod Version | 3.0.0
    Aki Version | >=3.0.0
    Copyright   | 2022 jbs4bmx
*/

import { DependencyContainer } from "tsyringe";
import { IMod } from "@spt-aki/models/external/mod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { CustomHandbookItemService } from "@spt-aki/services/CustomHandbookItemService";
import { CustomItemService } from "@spt-aki/services/CustomItemService";
import { CustomTraderAssortService } from "@spt-aki/services/CustomTraderAssortService";

let mydb;

class Holtzman implements IMod
{
    public load(container: DependencyContainer)
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const modLoader = container.resolve("InitialModLoader");
        const customItemService = container.resolve("CustomItemService");
        const customHandbookItemService = container.resolve("CustomHandbookItemService");
        const customTraderAssortService = container.resolve("CustomTraderAssortService");
        const databaseImporter = container.resolve("DatabaseImporter");

        logger.info("Loading: Holtzman Shield");

        mydb = databaseImporter.loadRecursive(`${modLoader.getModPath("HoltzmanShield")}database/`);

        for (const item of Object.values(mydb.templates.items)) {
            customItemService.add(item);
        }
        for (const item of mydb.templates.handbook.Items) {
            customHandbookItemService.add(item);
        }
        customTraderAssortService.add(mydb.traders.assort)
    }

    public delayedLoad(container: DependencyContainer)
    {
        const { MainArmor, HeadAreas, Resources } = require('./config.json');
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve("DatabaseServer").getTables();
        const items = db.templates.items;
        const locales = db.locales.global;

        for (const localeID in locales) {
            for (const locale in mydb.locales.en.templates) {
                locales[localeID].templates[locale] = mydb.locales.en.templates[locale];
            }
        }
        items["55d7217a4bdc2d86028b456d"]._props.Slots[14]._props.filters[0].Filter.push(
            "HShieldEvade",
            "HShieldTG",
            "HShieldUSEC",
            "HShieldYellow",
            "HShieldUntar",
            "HShieldRed",
            "HShieldWhite",
            "HShieldRivals",
            "HShieldAlpha",
            "HShieldRFArmy",
            "HShieldTrainHard",
            "HShieldGreen",
            "HShieldBlue",
            "HShieldKiba",
            "HShieldDead",
            "HShieldLabs",
            "HShieldBear"
        );

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

        items["HShieldEvade"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldEvade"]._props.RepairCost = Resources.RepairCost;
        items["HShieldEvade"]._props.Durability = Resources.Durability;
        items["HShieldEvade"]._props.MaxDurability = Resources.Durability;
        items["HShieldEvade"]._props.armorZone = armor;
        items["HShieldEvade"]._props.headSegments = segments;

        items["HShieldTG"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldTG"]._props.RepairCost = Resources.RepairCost;
        items["HShieldTG"]._props.Durability = Resources.Durability;
        items["HShieldTG"]._props.MaxDurability = Resources.Durability;
        items["HShieldTG"]._props.armorZone = armor;
        items["HShieldTG"]._props.headSegments = segments;

        items["HShieldUSEC"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldUSEC"]._props.RepairCost = Resources.RepairCost;
        items["HShieldUSEC"]._props.Durability = Resources.Durability;
        items["HShieldUSEC"]._props.MaxDurability = Resources.Durability;
        items["HShieldUSEC"]._props.armorZone = armor;
        items["HShieldUSEC"]._props.headSegments = segments;

        items["HShieldYellow"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldYellow"]._props.RepairCost = Resources.RepairCost;
        items["HShieldYellow"]._props.Durability = Resources.Durability;
        items["HShieldYellow"]._props.MaxDurability = Resources.Durability;
        items["HShieldYellow"]._props.armorZone = armor;
        items["HShieldYellow"]._props.headSegments = segments;

        items["HShieldUntar"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldUntar"]._props.RepairCost = Resources.RepairCost;
        items["HShieldUntar"]._props.Durability = Resources.Durability;
        items["HShieldUntar"]._props.MaxDurability = Resources.Durability;
        items["HShieldUntar"]._props.armorZone = armor;
        items["HShieldUntar"]._props.headSegments = segments;

        items["HShieldRed"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldRed"]._props.RepairCost = Resources.RepairCost;
        items["HShieldRed"]._props.Durability = Resources.Durability;
        items["HShieldRed"]._props.MaxDurability = Resources.Durability;
        items["HShieldRed"]._props.armorZone = armor;
        items["HShieldRed"]._props.headSegments = segments;

        items["HShieldWhite"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldWhite"]._props.RepairCost = Resources.RepairCost;
        items["HShieldWhite"]._props.Durability = Resources.Durability;
        items["HShieldWhite"]._props.MaxDurability = Resources.Durability;
        items["HShieldWhite"]._props.armorZone = armor;
        items["HShieldWhite"]._props.headSegments = segments;

        items["HShieldRivals"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldRivals"]._props.RepairCost = Resources.RepairCost;
        items["HShieldRivals"]._props.Durability = Resources.Durability;
        items["HShieldRivals"]._props.MaxDurability = Resources.Durability;
        items["HShieldRivals"]._props.armorZone = armor;
        items["HShieldRivals"]._props.headSegments = segments;

        items["HShieldAlpha"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldAlpha"]._props.RepairCost = Resources.RepairCost;
        items["HShieldAlpha"]._props.Durability = Resources.Durability;
        items["HShieldAlpha"]._props.MaxDurability = Resources.Durability;
        items["HShieldAlpha"]._props.armorZone = armor;
        items["HShieldAlpha"]._props.headSegments = segments;

        items["HShieldRFArmy"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldRFArmy"]._props.RepairCost = Resources.RepairCost;
        items["HShieldRFArmy"]._props.Durability = Resources.Durability;
        items["HShieldRFArmy"]._props.MaxDurability = Resources.Durability;
        items["HShieldRFArmy"]._props.armorZone = armor;
        items["HShieldRFArmy"]._props.headSegments = segments;

        items["HShieldTrainHard"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldTrainHard"]._props.RepairCost = Resources.RepairCost;
        items["HShieldTrainHard"]._props.Durability = Resources.Durability;
        items["HShieldTrainHard"]._props.MaxDurability = Resources.Durability;
        items["HShieldTrainHard"]._props.armorZone = armor;
        items["HShieldTrainHard"]._props.headSegments = segments;

        items["HShieldGreen"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldGreen"]._props.RepairCost = Resources.RepairCost;
        items["HShieldGreen"]._props.Durability = Resources.Durability;
        items["HShieldGreen"]._props.MaxDurability = Resources.Durability;
        items["HShieldGreen"]._props.armorZone = armor;
        items["HShieldGreen"]._props.headSegments = segments;

        items["HShieldBlue"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldBlue"]._props.RepairCost = Resources.RepairCost;
        items["HShieldBlue"]._props.Durability = Resources.Durability;
        items["HShieldBlue"]._props.MaxDurability = Resources.Durability;
        items["HShieldBlue"]._props.armorZone = armor;
        items["HShieldBlue"]._props.headSegments = segments;

        items["HShieldKiba"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldKiba"]._props.RepairCost = Resources.RepairCost;
        items["HShieldKiba"]._props.Durability = Resources.Durability;
        items["HShieldKiba"]._props.MaxDurability = Resources.Durability;
        items["HShieldKiba"]._props.armorZone = armor;
        items["HShieldKiba"]._props.headSegments = segments;

        items["HShieldDead"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldDead"]._props.RepairCost = Resources.RepairCost;
        items["HShieldDead"]._props.Durability = Resources.Durability;
        items["HShieldDead"]._props.MaxDurability = Resources.Durability;
        items["HShieldDead"]._props.armorZone = armor;
        items["HShieldDead"]._props.headSegments = segments;

        items["HShieldLabs"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldLabs"]._props.RepairCost = Resources.RepairCost;
        items["HShieldLabs"]._props.Durability = Resources.Durability;
        items["HShieldLabs"]._props.MaxDurability = Resources.Durability;
        items["HShieldLabs"]._props.armorZone = armor;
        items["HShieldLabs"]._props.headSegments = segments;

        items["HShieldBear"]._props.CreditsPrice = Resources.traderPrice;
        items["HShieldBear"]._props.RepairCost = Resources.RepairCost;
        items["HShieldBear"]._props.Durability = Resources.Durability;
        items["HShieldBear"]._props.MaxDurability = Resources.Durability;
        items["HShieldBear"]._props.armorZone = armor;
        items["HShieldBear"]._props.headSegments = segments;

        logger.info("Holtzman Shield Mod: Cached Successfully");
    }





}
module.exports = { mod: new Holtzman() }