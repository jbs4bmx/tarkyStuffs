import { DialogueHelper } from "../helpers/DialogueHelper";
import { SecureContainerHelper } from "../helpers/SecureContainerHelper";
import { TraderHelper } from "../helpers/TraderHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { Item } from "../models/eft/common/tables/IItem";
import { ISaveProgressRequestData } from "../models/eft/inRaid/ISaveProgressRequestData";
import { ILogger } from "../models/spt/utils/ILogger";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { SaveServer } from "../servers/SaveServer";
import { RandomUtil } from "../utils/RandomUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class InsuranceService {
    private logger;
    private databaseServer;
    private secureContainerHelper;
    private randomUtil;
    private timeUtil;
    private saveServer;
    private traderHelper;
    private dialogueHelper;
    private configServer;
    private insured;
    private templatesById;
    private insuranceConfig;
    constructor(logger: ILogger, databaseServer: DatabaseServer, secureContainerHelper: SecureContainerHelper, randomUtil: RandomUtil, timeUtil: TimeUtil, saveServer: SaveServer, traderHelper: TraderHelper, dialogueHelper: DialogueHelper, configServer: ConfigServer);
    insuranceExists(sessionId: string): boolean;
    insuranceTraderArrayExists(sessionId: string, traderId: string): boolean;
    getInsurance(sessionId: string): Record<string, Item[]>;
    getInsuranceItems(sessionId: string, traderId: string): any[];
    resetInsurance(sessionId: string): void;
    resetInsuranceTraderArray(sessionId: string, traderId: string): void;
    addInsuranceItemToArray(sessionId: string, traderId: string, itemToAdd: any): void;
    getItemPrice(_tpl: string): number;
    generateTemplatesById(): void;
    sendInsuredItems(pmcData: IPmcData, sessionID: string): void;
    storeLostGear(pmcData: IPmcData, offraidData: ISaveProgressRequestData, preRaidGear: Item[], sessionID: string): void;
    storeInsuredItemsForReturn(pmcData: IPmcData, offraidData: ISaveProgressRequestData, preRaidGear: Item[], sessionID: string): void;
    private addGearToSend;
    getPremium(pmcData: IPmcData, inventoryItem: Item, traderId: string): number;
}
