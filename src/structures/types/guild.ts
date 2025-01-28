export interface FoxyVerseGuild {
    _id: string;
    serverBenefits: {
        givePremiumIfBoosted: {
            isEnabled: boolean;
            notifyUser: boolean;
            textChannelToRedeem: string;
        };
    };
    guildAdmins: string[];
    serverInvite: string;

    save(): Promise<void>;
}