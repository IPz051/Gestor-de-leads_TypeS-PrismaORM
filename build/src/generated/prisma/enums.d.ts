export declare const LeadStatus: {
    readonly new: "new";
    readonly contacted: "contacted";
    readonly converted: "converted";
    readonly qualified: "qualified";
    readonly unresponsive: "unresponsive";
    readonly disqualified: "disqualified";
    readonly archived: "archived";
};
export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];
export declare const leadCampaignStatus: {
    readonly new: "new";
    readonly engaged: "engaged";
    readonly followUp_Scheduled: "followUp_Scheduled";
    readonly followUp_Completed: "followUp_Completed";
    readonly contacted: "contacted";
    readonly converted: "converted";
    readonly qualified: "qualified";
    readonly unresponsive: "unresponsive";
    readonly disqualified: "disqualified";
    readonly re_engaged: "re_engaged";
    readonly opted_out: "opted_out";
};
export type leadCampaignStatus = (typeof leadCampaignStatus)[keyof typeof leadCampaignStatus];
//# sourceMappingURL=enums.d.ts.map