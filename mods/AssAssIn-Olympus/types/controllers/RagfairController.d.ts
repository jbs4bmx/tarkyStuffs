import { RagfairOfferGenerator } from "../generators/RagfairOfferGenerator";
import { HandbookHelper } from "../helpers/HandbookHelper";
import { InventoryHelper } from "../helpers/InventoryHelper";
import { ItemHelper } from "../helpers/ItemHelper";
import { PaymentHelper } from "../helpers/PaymentHelper";
import { ProfileHelper } from "../helpers/ProfileHelper";
import { RagfairHelper } from "../helpers/RagfairHelper";
import { RagfairOfferHelper } from "../helpers/RagfairOfferHelper";
import { RagfairSellHelper } from "../helpers/RagfairSellHelper";
import { RagfairSortHelper } from "../helpers/RagfairSortHelper";
import { RagfairTaxHelper } from "../helpers/RagfairTaxHelper";
import { IPmcData } from "../models/eft/common/IPmcData";
import { Item } from "../models/eft/common/tables/IItem";
import { IItemEventRouterResponse } from "../models/eft/itemEvent/IItemEventRouterResponse";
import { IAkiProfile } from "../models/eft/profile/IAkiProfile";
import { IAddOfferRequestData, Requirement } from "../models/eft/ragfair/IAddOfferRequestData";
import { IExtendOfferRequestData } from "../models/eft/ragfair/IExtendOfferRequestData";
import { IGetItemPriceResult } from "../models/eft/ragfair/IGetItemPriceResult";
import { IGetMarketPriceRequestData } from "../models/eft/ragfair/IGetMarketPriceRequestData";
import { IGetOffersResult } from "../models/eft/ragfair/IGetOffersResult";
import { IRagfairOffer } from "../models/eft/ragfair/IRagfairOffer";
import { ISearchRequestData } from "../models/eft/ragfair/ISearchRequestData";
import { ILogger } from "../models/spt/utils/ILogger";
import { ItemEventRouter } from "../routers/ItemEventRouter";
import { ConfigServer } from "../servers/ConfigServer";
import { DatabaseServer } from "../servers/DatabaseServer";
import { RagfairServer } from "../servers/RagfairServer";
import { SaveServer } from "../servers/SaveServer";
import { PaymentService } from "../services/PaymentService";
import { RagfairOfferService } from "../services/RagfairOfferService";
import { RagfairPriceService } from "../services/RagfairPriceService";
import { RagfairRequiredItemsService } from "../services/RagfairRequiredItemsService";
import { HttpResponseUtil } from "../utils/HttpResponseUtil";
import { TimeUtil } from "../utils/TimeUtil";
export declare class RagfairController {
    private logger;
    private timeUtil;
    private httpResponse;
    private itemEventRouter;
    private ragfairServer;
    private ragfairPriceService;
    private databaseServer;
    private itemHelper;
    private saveServer;
    private ragfairSellHelper;
    private ragfairTaxHelper;
    private ragfairSortHelper;
    private ragfairOfferHelper;
    private profileHelper;
    private paymentService;
    private handbookHelper;
    private paymentHelper;
    private inventoryHelper;
    private ragfairHelper;
    private ragfairOfferService;
    private ragfairRequiredItemsService;
    private ragfairOfferGenerator;
    private configServer;
    private ragfairConfig;
    constructor(logger: ILogger, timeUtil: TimeUtil, httpResponse: HttpResponseUtil, itemEventRouter: ItemEventRouter, ragfairServer: RagfairServer, ragfairPriceService: RagfairPriceService, databaseServer: DatabaseServer, itemHelper: ItemHelper, saveServer: SaveServer, ragfairSellHelper: RagfairSellHelper, ragfairTaxHelper: RagfairTaxHelper, ragfairSortHelper: RagfairSortHelper, ragfairOfferHelper: RagfairOfferHelper, profileHelper: ProfileHelper, paymentService: PaymentService, handbookHelper: HandbookHelper, paymentHelper: PaymentHelper, inventoryHelper: InventoryHelper, ragfairHelper: RagfairHelper, ragfairOfferService: RagfairOfferService, ragfairRequiredItemsService: RagfairRequiredItemsService, ragfairOfferGenerator: RagfairOfferGenerator, configServer: ConfigServer);
    getOffers(sessionID: string, info: ISearchRequestData): IGetOffersResult;
    update(): void;
    getItemPrice(info: IGetMarketPriceRequestData): IGetItemPriceResult;
    addPlayerOffer(pmcData: IPmcData, info: IAddOfferRequestData, sessionID: string): IItemEventRouterResponse;
    createPlayerOffer(profile: IAkiProfile, requirements: Requirement[], items: Item[], sellInOnePiece: boolean, amountToSend: number): IRagfairOffer;
    getAllFleaPrices(): Record<string, number>;
    removeOffer(offerId: string, sessionID: string): IItemEventRouterResponse;
    extendOffer(info: IExtendOfferRequestData, sessionID: string): IItemEventRouterResponse;
}
