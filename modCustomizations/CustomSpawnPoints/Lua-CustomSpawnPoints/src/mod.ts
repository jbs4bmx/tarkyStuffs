import { DependencyContainer } from "tsyringe";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";
import { LocationCallbacks } from "@spt-aki/callbacks/LocationCallbacks";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { LogBackgroundColor } from "@spt-aki/models/spt/logging/LogBackgroundColor";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS";

import pkg from "../package.json";
import modConfig from "../config/config.json";

class Mod implements IPostDBLoadMod
{
    protected Path: string;
    protected Name: string = `${pkg.author}-${pkg.name}`;
    private container: DependencyContainer;
    private defaultSpawnParms = {};

    public postDBLoad(container: DependencyContainer): void
    {
		this.container = container;
		const logger: ILogger = container.resolve<ILogger>("WinstonLogger");

        logger.info(`Loading: ${this.Name} ${pkg.version}${modConfig.Enabled === true ? "" : " [Disabled]"}`);
        if (!modConfig.Enabled)
        {
            return;
        }

        // #TODO: Ignore red lines, forever.
        const dirArray = __dirname.split("\\");
		this.Path = `${dirArray[dirArray.length - 4]}/${dirArray[dirArray.length - 3]}/${dirArray[dirArray.length - 2]}`; // Pon, Pin, Fon, Fin

        this.GetToWork();

        container.resolve<StaticRouterModService>("StaticRouterModService").registerStaticRouter(
            `${this.Name}-/client/locations`,
            [
                {
                    url: "/client/locations",
                    action: (url: string, info: any, sessionID: string, output: string): any =>
                    {
                        this.GetToWork();
                        return this.container.resolve<LocationCallbacks>("LocationCallbacks").getLocationData(url, info, sessionID);
                    }
                }
            ],
            "aki"
        );
    }

    public GetToWork()
    {
        const vfs = this.container.resolve<VFS>("VFS");
        const hashUtil = this.container.resolve<HashUtil>("HashUtil");
        const jsonUtil = this.container.resolve<JsonUtil>("JsonUtil");
		const logger = this.container.resolve<ILogger>("WinstonLogger");
        const databaseServer = this.container.resolve<DatabaseServer>("DatabaseServer").getTables();

        // DEBU9
        if (modConfig.DEBUG.NoFallDamage === true)
        {
            databaseServer.globals.config.Health.Falling.SafeHeight = 99999;
        }

        if (modConfig.DEBUG.UnlimitedStamina === true)
        {
            databaseServer.globals.config.Stamina.Capacity = 99999;
            databaseServer.globals.config.Stamina.OxygenCapacity = 99999;
        }
        // END OF 99999

        let updatedList = "";
        let readMe = false;
        const spawnPointsPath = `${this.Path}/config/spawnpoints/`;
        if (!vfs.exists(spawnPointsPath))
        {
            vfs.createDir(spawnPointsPath);
        }

        const dirsList = vfs.getDirs(spawnPointsPath);
        let totalSpawnPoints = { "Default": { "Bot": 0, "Player": 0, "Boss": 0 }, "Custom": { "Bot": 0, "Player": 0, "Boss": 0 } };

        // Check Disabled Folders List
        let disableList = (modConfig.DisableFolderList !== undefined && modConfig.DisableFolderList.trim().length > 0) ? modConfig.DisableFolderList.split(",").map(item => item.trim()) : undefined;
        for (let folderIndex = 0; folderIndex < dirsList.length; folderIndex++)
        {
            // Remove Empty Folder
            if (vfs.getFiles(`${spawnPointsPath}${dirsList[folderIndex]}`).length === 0)
            {
                dirsList.splice(folderIndex--, 1);
                continue;
            }

            // Remove Disabled Folder
            for (let index in disableList)
            {
                if (disableList[index].toLowerCase() === dirsList[folderIndex].toLowerCase())
                {
                    dirsList.splice(folderIndex--, 1);
                    break;
                }
            }
        }
        dirsList.unshift("default");

        for (let map in databaseServer.locations)
        {
            if (map.toLowerCase() === "base")
            {
                continue;
            }

            let mapBase = databaseServer.locations[map].base;
            if (mapBase.Locked === true || (mapBase?.EnabledCoop === undefined && mapBase?.EnableCoop === undefined))
            {
                continue;
            }

            let addedSpawnPoints = false;
            let newSpawnPointParams = [];
            let currentSpawnPoints = { "Default": { "Bot": 0, "Player": 0, "Boss": 0 }, "Custom": { "Bot": 0, "Player": 0, "Boss": 0 } };

			// DEBU9
            if (modConfig.DEBUG.UnlimitedRaidTime === true)
            {
                mapBase.EscapeTimeLimit = 99999;
            }

            if (this.defaultSpawnParms[map] === undefined && mapBase.SpawnPointParams !== undefined)
            {
                this.defaultSpawnParms[map] = jsonUtil.clone(mapBase.SpawnPointParams);
            }

            if (this.defaultSpawnParms[map] !== undefined)
            {
                newSpawnPointParams = jsonUtil.clone(this.defaultSpawnParms[map]);

                for (let key = 0; key < newSpawnPointParams.length; key++)
                {
                    let values = newSpawnPointParams[key];
                    for (let categoryIndex = 0; categoryIndex < values.Categories.length; categoryIndex++)
                    {
                        switch(values.Categories[categoryIndex])
                        {
                            case "Bot":
                            {
                                if ( (modConfig.DisableDefaultSpawnPoints.Bot[map] || false) === true)
                                {
                                    values.Categories.splice(categoryIndex--, 1);
                                }
                                else
                                {
                                    currentSpawnPoints.Default.Bot++;
                                }

                                break;
                            }

                            case "Player":
                            {
                                if ( (modConfig.DisableDefaultSpawnPoints.Player[map] || false) === true)
                                {
                                    values["Infiltration"] = "";
                                    values.Categories.splice(categoryIndex--, 1);
                                }
                                else
                                {
                                    currentSpawnPoints.Default.Player++;
                                }

                                break;
                            }

                            case "Boss":
                            {
                                if ( (modConfig.DisableDefaultSpawnPoints.Boss[map] || false) === true)
                                {
                                    values.Categories.splice(categoryIndex--, 1);
                                }
                                else
                                {
                                    currentSpawnPoints.Default.Boss++;
                                }
                            }
                        }
                    }

                    if (values.Categories.length === 0)
                    {
                        newSpawnPointParams.splice(key--, 1);
                    }
                }
            }

            for (let folderIndex in dirsList)
            {
                let filePath = Number(folderIndex) > 0 ? `${spawnPointsPath}${dirsList[folderIndex]}/${map}.json` : `${spawnPointsPath}${map}.json`;
                let config = (vfs.exists(filePath) === true) ? jsonUtil.deserialize(vfs.readFile(filePath)) : undefined;

                // Write json config or skips if spawn zone is empty
                if (config === undefined)
                {
                    if (Number(folderIndex) > 0) continue;

                    let lists = "";
                    let keys = "";
                    let infiltrations = "";
                    let infiltrationsArr = [];
                    let spawnZones = [];
                    let openZones = [];

                    // OpenZones
                    if (mapBase.OpenZones.includes(",") === false)
                    {
                        openZones.push(mapBase.OpenZones);
                    }
                    else
                    {
                        let arr = mapBase.OpenZones.split(",").map(item => item.trim());

                        for (let index in arr)
                        {
                            let zoneName = arr[index];

                            if (spawnZones.findIndex(item => item === zoneName) === -1)
                            {
                                spawnZones.push(zoneName);
                            }
                        }
                    }

                    // Waves
                    for (let [_, values] of Object.entries(mapBase.waves))
                    {
                        if (values["SpawnPoints"] === undefined || values["SpawnPoints"].length < 1)
                        {
                            continue;
                        }

                        if (spawnZones.findIndex(item => item === values["SpawnPoints"]) === -1)
                        {
                            spawnZones.push(values["SpawnPoints"]);
                        }
                    }

                    // Bosses
                    for (let [_, values] of Object.entries(mapBase.BossLocationSpawn))
                    {
                        if (values["BossZone"] === undefined || values["BossZone"].length < 1)
                        {
                            continue;
                        }

                        if (values["BossZone"].includes(",") === false)
                        {
                            if (spawnZones === undefined || spawnZones.findIndex(item => item === values["BossZone"]) === -1)
                            {
                                spawnZones.push(values["BossZone"]);
                            }
                        }
                        else
                        {
                            let arr = values["BossZone"].split(",").map(item => item.trim());

                            for (let index in arr)
                            {
                                let zoneName = arr[index];

                                if (spawnZones.findIndex(item => item === zoneName) === -1)
                                {
                                    spawnZones.push(zoneName);
                                }
                            }
                        }
                    }

                    // SpawnPointParams
                    for (let [_, values] of Object.entries(this.defaultSpawnParms[map]))
                    {
                        // Infiltration for Player Spawn Points
                        if (values["Infiltration"] !== undefined && values["Infiltration"].length > 1 && infiltrationsArr.findIndex(item => item === values["Infiltration"]) === -1)
                        {
                            infiltrationsArr.push(values["Infiltration"]);
                        }

                        // Spawn Zone
                        if (values["BotZoneName"] !== undefined && values["BotZoneName"].length > 0 && spawnZones.findIndex(item => item === values["BotZoneName"]) === -1)
                        {
                            spawnZones.push(values["BotZoneName"]);
                        }
                    }

                    // Format Infiltration Lists
                    for (let index in infiltrationsArr)
                    {
                        if (Number(index) > 0)
                        {
                            infiltrations += `, ${infiltrationsArr[index]}`;
                        }
                        else
                        {
                            infiltrations = infiltrationsArr[index];
                        }
                    }

                    // Format Spawn Zone Lists
                    for (let index in spawnZones)
                    {
                        if (Number(index) > 0)
                        {
                            lists += `, ${spawnZones[index]}`;
                            keys += `,\n\n\t"${spawnZones[index]}": [\n\t]`;
                        }
                        else
                        {
                            lists = spawnZones[index];
                            keys += `"${spawnZones[index]}": [\n\t]`;
                        }
                    }

                    if (lists.length > 0)
                    {
                        readMe = true;
                        vfs.writeFile(filePath, `{\n\t"SpawnZone Available List": "${lists}",\n\t"Infiltration Available List": "${infiltrations}",\n\n\t${keys}\n}`);
                        logger.log(`${this.Name}: Config Created "${filePath.replace("user/mods/Lua-CustomSpawnPoints/", "")}" `, LogTextColor.YELLOW, LogBackgroundColor.BLUE);
                    }
                    else
                    {
                        continue;
                    }
                }
                else
                {
                    if (config["SpawnZone Available List"] === undefined)
                    {
                        logger.error(`${this.Name}: ${map} has no "SpawnZone Available List", delete the config file to re-generate the file... `);
                        continue;
                    }

                    if (config["Infiltration Available List"] === undefined)
                    {
                        logger.error(`${this.Name}: ${map} has no "Infiltration Available List", delete the config file to re-generate the file... `);
                        continue;
                    }

                    let spawnZone = config["SpawnZone Available List"].split(",").map(item => item.trim());
                    let infiltrations = config["Infiltration Available List"].split(",").map(item => item.trim());
                    for (let [zoneName, values] of Object.entries(config))
                    {
                        if (zoneName === "SpawnZone Available List" || zoneName === "Infiltration Available List" || Object.keys(values).length === 0)
                        {
                            continue;
                        }

                        // Checking SpawnZone Name
                        let foundZone = false;
                        for (let index in spawnZone)
                        {
                            if (spawnZone[index] === zoneName)
                            {
                                foundZone = true;
                                break;
                            }
                        }

                        if (foundZone === false)
                        {
                            if (spawnZone.length === 1)
                            {
                                zoneName = spawnZone[0];
                                logger.warning(`${this.Name}: ${map} has non-exist spawn zone "${zoneName}", Fixed to "${spawnZone[0]}" `);
                            }
                            else
                            {
                                logger.error(`${this.Name}: ${map} has non-exist spawn zone "${zoneName}", Skipping... `);
                                continue;
                            }
                        }

                        for (let index in config[zoneName])
                        {
                            let zoneConfig = config[zoneName][index];
                            let bSkip = false;

                            // Checking Infiltration
                            if (zoneConfig["Infiltration"].length <= 1)
                            {
                                for (let index in zoneConfig.Categories)
                                {
                                    if (zoneConfig.Categories[index] === "Player")
                                    {
                                        if (infiltrations.length === 1)
                                        {
                                            zoneConfig["Infiltration"] = infiltrations[0];
                                            logger.warning(`${this.Name}: ${map} has "${zoneConfig.Categories[index]}" spawn zone in "${zoneName}" but [Infiltration] has empty value, Fixed value to "${infiltrations[0]}" `);
                                        }
                                        else
                                        {
                                            logger.error(`${this.Name}: ${map} has "${zoneConfig.Categories[index]}" spawn zone in "${zoneName}" but [Infiltration] has empty value, Skipping... `);
                                            bSkip = true;
                                            break;
                                        }
                                    }
                                }

                                if (bSkip) continue;
                            }
                            else
                            {
                                foundZone = false;
                                for (let index in infiltrations)
                                {
                                    if (infiltrations[index] === zoneConfig["Infiltration"])
                                    {
                                        foundZone = true;
                                        break;
                                    }
                                }

                                if (foundZone === false)
                                {
                                    logger.error(`${this.Name}: ${map} has non-exist infiltration "${zoneConfig["Infiltration"]}" in "${zoneName}", Skipping... `);
                                    continue;
                                }
                            }

                            /* Validate and Fix Parameters - Start */
                            if (zoneConfig.Position === undefined || typeof(zoneConfig.Sides) !== "object" || zoneConfig.Position.length !== 3)
                            {
                                logger.error(`${this.Name}: ${map} has bad Position values [${zoneConfig.Position[0]}, ${zoneConfig.Position[1]}, ${zoneConfig.Position[2]}] in "${zoneName}", Skipping... `);
                                continue;
                            }

                            if (zoneConfig.Rotation === undefined || typeof(zoneConfig.Rotation) !== "number" || zoneConfig.Rotation < 0 || zoneConfig.Rotation > 360)
                            {
                                logger.error(`${this.Name}: ${map} has bad Rotation value ${zoneConfig.Rotation} in "${zoneName}", Fixed value to 90.0 `);
                                zoneConfig.Rotation = 90.0;
                                continue;
                            }

                            if (zoneConfig.Sides === undefined || typeof(zoneConfig.Sides) !== "object")
                            {
                                logger.error(`${this.Name}: ${map} has bad Sides value [${zoneConfig.Sides}] in "${zoneName}", Skipping... `);
                                continue;
                            }

                            if (zoneConfig.Categories === undefined || typeof(zoneConfig.Categories) !== "object")
                            {
                                logger.error(`${this.Name}: ${map} has bad Categories value [${zoneConfig.Categories}] in "${zoneName}", Skipping... `);
                                continue;
                            }

                            if (zoneConfig.DelayToCanSpawnSec === undefined || typeof(zoneConfig.DelayToCanSpawnSec) !== "number" || zoneConfig.DelayToCanSpawnSec < 0)
                            {
                                logger.error(`${this.Name}: ${map} has bad DelayToCanSpawnSec value ${zoneConfig.DelayToCanSpawnSec} in "${zoneName}", Fixed value to 1 `);
                                zoneConfig.DelayToCanSpawnSec = 1;
                            }

                            if (zoneConfig.ColliderRadius === undefined || typeof(zoneConfig.ColliderRadius) !== "number" || zoneConfig.ColliderRadius < 0)
                            {
                                logger.error(`${this.Name}: ${map} has bad ColliderRadius value ${zoneConfig.ColliderRadius} in "${zoneName}", Fixed value to 0.0 `);
                                zoneConfig.ColliderRadius = 0.0;
                            }
                            /* Validate and Fix Parameters - End */

                            // New Playgrounds
                            newSpawnPointParams.push({
                                "Id": hashUtil.generate(),
                                "Position": {
                                    "x": zoneConfig.Position[0],
                                    "y": zoneConfig.Position[1],
                                    "z": zoneConfig.Position[2]
                                },
                                "Rotation": zoneConfig.Rotation,
                                "Sides": zoneConfig.Sides,
                                "Categories": zoneConfig.Categories,
                                "Infiltration": zoneConfig["Infiltration"],
                                "DelayToCanSpawnSec": zoneConfig.DelayToCanSpawnSec,
                                "ColliderParams": {
                                    "_parent": "SpawnSphereParams",
                                    "_props": {
                                        "Center": {
                                            "x": 0,
                                            "y": 0,
                                            "z": 0
                                        },
                                        "Radius": zoneConfig.ColliderRadius
                                    }
                                },
                                "BotZoneName": zoneName
                            });
                            addedSpawnPoints = true;
                            for (let index in zoneConfig.Categories)
                            {
                                switch(zoneConfig.Categories[index])
                                {
                                    case "Bot": currentSpawnPoints.Custom.Bot++; break;
                                    case "Player": currentSpawnPoints.Custom.Player++; break;
                                    case "Boss": currentSpawnPoints.Custom.Boss++;
                                }
                            }
                            if (modConfig.DEBUG.PrintAddedSpawnPoints === true)
                            {
                                logger.debug(`${dirsList[folderIndex]}: ${map} @ "${zoneName}" [${zoneConfig.Position[0]}, ${zoneConfig.Position[1]}, ${zoneConfig.Position[2]}] for "${zoneConfig.Sides}" and "${zoneConfig.Categories}" with ${zoneConfig.ColliderRadius} ColliderRadius\nComment: "${zoneConfig.Comment}" `);
                            }
                        }
                    }
                }
            }

            let foundSpawn = [false, false]; // Bot, Player
            for (let [_, values] of Object.entries(newSpawnPointParams))
            {
                if (values.Categories.includes("Bot") === true) foundSpawn[0] = true;
                if (values.Categories.includes("Player") === true) foundSpawn[1] = true;
                if (foundSpawn.includes(false) === false) break;
            }

            // Check missing spawn points from default spawn points
            if (foundSpawn.includes(false) === true)
            {
                if (foundSpawn[0] === false) logger.error(`${this.Name}: No spawn point for "Bot" in "${map}"... `);
                if (foundSpawn[1] === false) logger.error(`${this.Name}: No spawn point for "Player" in "${map}"... `);

                for (let key in this.defaultSpawnParms[map])
                {
                    // Find same default spawn point
                    let currentSpawnPointParms;
                    for (let newKey in newSpawnPointParams)
                    {
                        if (this.defaultSpawnParms[map][key].Id === newSpawnPointParams[newKey].Id)
                        {
                            currentSpawnPointParms = newSpawnPointParams[newKey];
                            break;
                        }
                    }

                    if (currentSpawnPointParms === undefined)
                    {
                        let spawnPoint;
                        currentSpawnPointParms = this.defaultSpawnParms[map][key];
                        if (foundSpawn[0] === false && currentSpawnPointParms.Categories.includes("Bot") === true)
                        {
                            spawnPoint = {...currentSpawnPointParms};
                            spawnPoint.Categories = ["Bot"];
                            currentSpawnPoints.Default.Bot++;

                            if ( (modConfig.DisableDefaultSpawnPoints.Boss[map] || false) === false && currentSpawnPointParms.Categories.includes("Boss") === true)
                            {
                                spawnPoint.Categories.push("Boss");
                                currentSpawnPoints.Default.Boss++;
                            }
                        }

                        if (foundSpawn[1] === false && currentSpawnPointParms["Infiltration"].length > 1 && currentSpawnPointParms.Categories.includes("Player") === true)
                        {
                            if (spawnPoint === undefined)
                            {
                                spawnPoint = {...currentSpawnPointParms};
                                spawnPoint.Categories = ["Player"];
                            }
                            else
                            {
                                spawnPoint.Categories.push("Player");
                            }
                            currentSpawnPoints.Default.Player++;
                        }

                        if (spawnPoint !== undefined) newSpawnPointParams.push(spawnPoint);
                    }
                    else
                    {
                        let defaultSpawnPoint = this.defaultSpawnParms[map][key];
                        if (foundSpawn[0] === false && defaultSpawnPoint.Categories.includes("Bot") === true)
                        {
                            currentSpawnPointParms.Categories.push("Bot");
                            currentSpawnPoints.Default.Bot++;

                            if ( (modConfig.DisableDefaultSpawnPoints.Boss[map] || false) === false && currentSpawnPointParms.Categories.includes("Boss") === false && defaultSpawnPoint.Categories.includes("Boss") === true)
                            {
                                currentSpawnPointParms.Categories.push("Boss");
                                currentSpawnPoints.Default.Boss++;
                            }
                        }

                        if (foundSpawn[1] === false && defaultSpawnPoint["Infiltration"].length > 1 && defaultSpawnPoint.Categories.includes("Player") === true)
                        {
                            currentSpawnPointParms.Categories.push("Player");
                            currentSpawnPointParms["Infiltration"] = defaultSpawnPoint["Infiltration"];
                            currentSpawnPoints.Default.Player++;
                        }
                    }
                }

                if (foundSpawn[0] === false)
                {
                    if (currentSpawnPoints.Default.Bot === 0)
                    {
                        logger.error(`${this.Name}: No spawn point for "Bot" in default spawn points list, Skipping...\n  >>  (You have to add Custom or Default Spawn Points) `);
                    }
                    else
                    {
                        foundSpawn[0] = true;
                        logger.warning(`${this.Name}: Recovered "Bot" default spawn points: ${currentSpawnPoints.Default.Bot} `);
                    }
                }

                if (foundSpawn[1] === false)
                {
                    if (currentSpawnPoints.Default.Player === 0)
                    {
                        logger.error(`${this.Name}: No spawn point for "Player" in default spawn points list, Skipping...\n  >>  (You have to add Custom or Default Spawn Points) `);
                    }
                    else
                    {
                        foundSpawn[1] = true;
                        logger.warning(`${this.Name}: Recovered "Player" default spawn points: ${currentSpawnPoints.Default.Player} `);
                    }
                }

                if (foundSpawn.includes(false) === true) continue;
            }

            if (addedSpawnPoints)
            {
                if (updatedList.length > 0)
                {
                    if (updatedList.includes(map) === false)
                    {
                        updatedList += `, ${map}`;
                    }
                }
                else
                {
                    updatedList = map;
                }
            }

            if (modConfig.PrintMapLoadLogs === true)
            {
                logger.log(`[${map}]${this.GetSpace(map, 16)}Custom Spawn Points      Bot: ${currentSpawnPoints.Custom.Bot},${this.GetSpace(currentSpawnPoints.Custom.Bot, 5)}Player: ${currentSpawnPoints.Custom.Player},${this.GetSpace(currentSpawnPoints.Custom.Player, 5)}Boss: ${currentSpawnPoints.Custom.Boss} `, LogTextColor.WHITE, LogBackgroundColor.CYAN);
                logger.log(`[${map}]${this.GetSpace(map, 16)}Default Spawn Points     Bot: ${currentSpawnPoints.Default.Bot},${this.GetSpace(currentSpawnPoints.Default.Bot, 5)}Player: ${currentSpawnPoints.Default.Player},${this.GetSpace(currentSpawnPoints.Default.Player, 5)}Boss: ${currentSpawnPoints.Default.Boss} \n`, LogTextColor.WHITE, LogBackgroundColor.CYAN);
            }

            totalSpawnPoints.Default.Bot += currentSpawnPoints.Default.Bot;
            totalSpawnPoints.Default.Player += currentSpawnPoints.Default.Player;
            totalSpawnPoints.Default.Boss += currentSpawnPoints.Default.Boss;
            totalSpawnPoints.Custom.Bot += currentSpawnPoints.Custom.Bot;
            totalSpawnPoints.Custom.Player += currentSpawnPoints.Custom.Player;
            totalSpawnPoints.Custom.Boss += currentSpawnPoints.Custom.Boss;
            mapBase.SpawnPointParams = newSpawnPointParams;
        }

        if (updatedList.length > 0)
        {
            logger.log(`${this.Name}: Custom Spawn Points    Bot: ${totalSpawnPoints.Custom.Bot},${this.GetSpace(totalSpawnPoints.Custom.Bot, 5)}Player: ${totalSpawnPoints.Custom.Player},${this.GetSpace(totalSpawnPoints.Custom.Player, 5)}Boss: ${totalSpawnPoints.Custom.Boss} `, LogTextColor.WHITE, LogBackgroundColor.BLUE);
            logger.log(`${this.Name}: Default Spawn Points   Bot: ${totalSpawnPoints.Default.Bot},${this.GetSpace(totalSpawnPoints.Default.Bot, 5)}Player: ${totalSpawnPoints.Default.Player},${this.GetSpace(totalSpawnPoints.Default.Player, 5)}Boss: ${totalSpawnPoints.Default.Boss} `, LogTextColor.WHITE, LogBackgroundColor.BLUE);
			logger.log(`${this.Name}: Successfully Loaded ${dirsList.length-1} Presets for "${updatedList}" `, LogTextColor.WHITE, LogBackgroundColor.BLUE);
        }
        else
        {
            logger.log(`${this.Name}: Default Spawn Points   Bot: ${totalSpawnPoints.Default.Bot},${this.GetSpace(totalSpawnPoints.Default.Bot, 5)}Player: ${totalSpawnPoints.Default.Player},${this.GetSpace(totalSpawnPoints.Default.Player, 5)}Boss: ${totalSpawnPoints.Default.Boss} `, LogTextColor.WHITE, LogBackgroundColor.BLUE);
        }

        if (readMe)
        {
            logger.log(`${this.Name}: Check out "!Readme/example.json" for how to make Custom Spawn Points! `, LogTextColor.WHITE, LogBackgroundColor.MAGENTA);
        }
    }

    GetSpace(str, line)
    {
        if (typeof(str) === "number") str = str.toString();
        else if (typeof(str) !== "string") return " ";
        let space = "";
        for (let i = 0; i < line-str.length; i++) space += " ";
        return space;
    }
}

module.exports = {mod: new Mod()};