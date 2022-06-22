/*
    Mod Version | 3.0.0
    Aki Version | >=3.0.0
    Copyright   | 2022 jbs4bmx
*/

import { DependencyContainer } from "tsyringe";
import { IMod } from "@spt-aki/models/external/mod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";

class Holtzman implements IMod
{
    public load(container: DependencyContainer): void
    { return }

    public delayedLoad(container: DependencyContainer): void
    {
        // Load logger
        const logger = container.resolve<ILogger>("WinstonLogger");
        // Load config items
        const { MainArmor, HeadAreas, Resources } = require('./config.json');
        // Database
        const items = container.resolve<DatabaseServer>("DatabaseServer").getTables().templates.items;
        const handbook = container.resolve<DatabaseServer>("DatabaseServer").getTables().templates.handbook.Items;
        const global = container.resolve<DatabaseServer>("DatabaseServer").getTables().locales.global;
        const traders = container.resolve<DatabaseServer>("DatabaseServer").getTables().traders;

        logger.info("Holtzman Shield USEC Mod Loading...");

        // Set item placeable slot to Default Inventory slot 14 (armband)
        function getItem(id) {
            return Object.values(items).filter((item) => item._id === id)[0];
        }
        const inventory = getItem("55d7217a4bdc2d86028b456d"); //default inventory
        // Armband Slot filter. 14 = armband slot
        const placeable = inventory._props.Slots[14];

        // Set arrays for armor attributes
        let armor = [];
        let segments = [];

        // Build Item Properties, set trader to Ragman, and accept only Roubles.
        var itemId = "HShieldUSEC";
        var itemProto = "545cdb794bdc2d3a198b456a"; //6B43 heavy armor
        var itemClone = "572b7fa524597762b747ce82"; //clone bandana for our new item
        var itemParent = "57bef4c42459772e8d35a53b"; //armor item parent
        var itemCategory = "5b5f701386f774093f2ecf0f"; //handbook category for armor
        var itemFleaPrice = Resources.marketPrice;
        var itemPrefabPath = "assets/content/items/equipment/armband/item_equipment_armband_usec.bundle";
        var itemLongName = "Holtzman Shield (USEC)";
        var itemShortName = "HSUSEC";
        var itemDescription = "You've read Dune right? Or at least seen the movies? Right?...";
        var itemTrader = "5ac3b934156ae10c4430e83c"; //ragman
        var itemTraderPrice = Resources.traderPrice;
        var itemTraderCurrency = "5449016a4bdc2d6f028b456f"; //rubles
        var itemTraderLV = Resources.minTraderLevel;


        //push body armor to array "armor"
        if (typeof MainArmor.Head === "boolean") {
            if (MainArmor.Head === true) {
                armor.push("Head")
            }
        } else {
            armor.push("Head")
            logger.warning(`[HSUSEC Mod] - Resource value Head is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof MainArmor.Thorax === "boolean") {
            if (MainArmor.Thorax === true) {
                armor.push("Chest")
            }
        } else {
            armor.push("Chest")
            logger.warning(`[HSUSEC Mod] - Resource value Chest is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof MainArmor.Stomach === "boolean") {
            if (MainArmor.Stomach === true) {
                armor.push("Stomach")
            }
        } else {
            armor.push("Stomach")
            logger.warning(`[HSUSEC Mod] - Resource value Stomach is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof MainArmor.LeftArm === "boolean") {
            if (MainArmor.LeftArm === true) {
                armor.push("LeftArm")
            }
        } else {
            armor.push("LeftArm")
            logger.warning(`[HSUSEC Mod] - Resource value LeftArm is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof MainArmor.RightArm === "boolean") {
            if (MainArmor.RightArm === true) {
                armor.push("RightArm")
            }
        } else {
            armor.push("RightArm")
            logger.warning(`[HSUSEC Mod] - Resource value RightArm is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof MainArmor.LeftLeg === "boolean") {
            if (MainArmor.LeftLeg === true) {
                armor.push("LeftLeg")
            }
        } else {
            armor.push("LeftLeg")
            logger.warning(`[HSUSEC Mod] - Resource value LeftLeg is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof MainArmor.RightLeg === "boolean") {
            if (MainArmor.RightLeg === true) {
                armor.push("RightLeg")
            }
        } else {
            armor.push("RightLeg")
            logger.warning(`[HSUSEC Mod] - Resource value RightLeg is not a boolean. Defaulting to true.`, "yellow", "red");
        }

        // push head segments to array "segments"
        if (typeof HeadAreas.Top === "boolean") {
            if (HeadAreas.Top === true) {
                segments.push("Top")
            }
        } else {
            segments.push("Top")
            logger.warning(`[HSUSEC Mod] - Resource value Top is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof HeadAreas.Nape === "boolean") {
            if (HeadAreas.Nape === true) {
                segments.push("Nape")
            }
        } else {
            segments.push("Nape")
            logger.warning(`[HSUSEC Mod] - Resource value Nape is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof HeadAreas.Ears === "boolean") {
            if (HeadAreas.Ears === true) {
                segments.push("Ears")
            }
        } else {
            segments.push("Ears")
            logger.warning(`[HSUSEC Mod] - Resource value Ears is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof HeadAreas.Eyes === "boolean") {
            if (HeadAreas.Eyes === true) {
                segments.push("Eyes")
            }
        } else {
            segments.push("Eyes")
            logger.warning(`[HSUSEC Mod] - Resource value Eyes is not a boolean. Defaulting to true.`, "yellow", "red");
        }
        if (typeof HeadAreas.Jaws === "boolean") {
            if (HeadAreas.Jaws === true) {
                segments.push("Jaws")
            }
        } else {
            segments.push("Jaws")
            logger.warning(`[HSUSEC Mod] - Resource value Jaws is not a boolean. Defaulting to true.`, "yellow", "red");
        }

        if (typeof Resources.RepairCost === "number") {
            if ((Resources.RepairCost < 1) || (Resources.RepairCost > 9999999)) {
                Resources.RepairCost = 100000
            }
        } else {
            logger.warning(`[HSUSEC Mod] - Resource value RepairCost is not a number.`, "yellow", "red");
        }
        if (typeof Resources.Durability === "number") {
            if ((Resources.Durability < 1) || (Resources.Durability > 9999999)) {
                Resources.Durability = 100
            }
        } else {
            logger.warning(`[HSUSEC Mod] - Resource value Durability is not a number.`, "yellow", "red");
        }
        if (typeof Resources.minTraderLevel === "number") {
            if ((Resources.minTraderLevel < 1) || (Resources.minTraderLevel > 4)) {
                Resources.minTraderLevel = 2
            }
        } else {
            logger.warning(`[HSUSEC Mod] - Resource value minTraderLevel is not a number.`, "yellow", "red");
        }
        if (typeof Resources.marketPrice === "number") {
            if ((Resources.marketPrice < 1) || (Resources.marketPrice > 9999999)) {
                Resources.marketPrice = 100000
            }
        } else {
            logger.warning(`[HSUSEC Mod] - Resource value marketPrice is not a number.`, "yellow", "red");
        }
        if (typeof Resources.traderPrice === "number") {
            if ((Resources.traderPrice < 1) || (Resources.traderPrice > 9999999)) {
                Resources.traderPrice = 100000
            }
        } else {
            logger.warning(`[HSUSEC Mod] - Resource value traderPrice is not a number.`, "yellow", "red");
        }

        this.createItem(itemId, itemClone, itemParent, itemPrefabPath, itemLongName, itemShortName, itemDescription, items, global);
        this.createItemHandbookEntry(itemId, itemCategory, itemFleaPrice, handbook);
        this.createItemOffer(itemId, itemTrader, itemTraderPrice, itemTraderCurrency, itemTraderLV, traders);

        // change item properties
        items[itemId]._proto = itemProto;
        items[itemId]._props.CreditsPrice = itemTraderPrice;
        items[itemId]._props.RepairCost = Resources.RepairCost;
        items[itemId]._props.Durability = Resources.Durability;
        items[itemId]._props.MaxDurability = Resources.Durability;
        items[itemId]._props.armorClass = "10";
        items[itemId]._props.armorZone = armor;
        items[itemId]._props.headSegments = segments;
        items[itemId]._props.MaterialType = "BodyArmor";
        items[itemId]._props.ArmorMaterial = "UHMWPE";

        // Place the item into the filter for the Armband Slot
		placeable._props.filters[0].Filter.push("HShieldUSEC");

        logger.info("Holtzman Shield USEC Mod: Cached Successfully");
    }

    createItem(i_id, i_clone, i_parent, i_path, i_lname, i_sname, i_desc, i_items, i_global)
    {
        let item = JsonUtil.clone(i_items[i_clone]);
        item._id = i_id;
        item._parent = i_parent;
        item._props.Prefab.Path = i_path;
        // add item back to database
        i_items[i_id] = item;
        // add custom item names to all languages/locales
        for (const localeID in i_global)
        {
            i_global[localeID].templates[i_id] =
            {
                "Name": i_lname,
                "ShortName": i_sname,
                "Description": i_desc
            };
        }
    }

    createItemHandbookEntry(i_id, i_category, i_fprice, i_handbook)
    {
        // add item to handbook
        i_handbook.push(
            {
                "Id": i_id,
                "ParentId": i_category,
                "Price": i_fprice
            }
        );
    }

    createItemOffer(i_id, i_trader, i_price, i_currency, i_loyalty, i_traders)
    {
        i_traders[i_trader].assort.items.push(
            {
                "_id": i_id,
                "_tpl": i_id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd":
                {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 999999999
                }
            }
        );

        // add trader cost to item
        i_traders[i_trader].assort.barter_scheme[i_id] = [
            [
                {
                    "count": i_price,
                    "_tpl": i_currency
                }
            ]
        ];

        // add trader loyalty level to item
        i_traders[i_trader].assort.loyal_level_items[i_id] = i_loyalty;

        // add item stack to flea market
        i_traders.ragfair.assort.items.push(
            {
                "_id": i_id,
                "_tpl": i_id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd":
                {
                    "UnlimitedCount": true,
                    "StackObjectsCount": 999999
                }
            }
        );
        i_traders.ragfair.assort.loyal_level_items[i_id] = 1;
    }
}

module.exports = { mod: new Holtzman() }