import { AvailableForConditions } from "../models/eft/common/tables/IQuest";
export declare class QuestConditionHelper {
    getQuestConditions(q: AvailableForConditions[], furtherFilter?: (a: AvailableForConditions) => AvailableForConditions[]): AvailableForConditions[];
    getLevelConditions(q: AvailableForConditions[], furtherFilter?: (a: AvailableForConditions) => AvailableForConditions[]): AvailableForConditions[];
    getLoyaltyConditions(q: AvailableForConditions[], furtherFilter?: (a: AvailableForConditions) => AvailableForConditions[]): AvailableForConditions[];
    private filterConditions;
}
