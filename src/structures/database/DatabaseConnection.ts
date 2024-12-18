import mongoose from 'mongoose';
import { logger } from '../../utils/logger';
import { mongouri } from '../../../config.json';
import { bot } from '../../index';
import { User } from 'discordeno/transformers';
import { FoxyClient } from '../types/foxy';
import { Schemas } from './schemas/Schemas';
import { Checkout } from '../types/checkout';
import { Item } from '../types/item';

export default class DatabaseConnection {
    public client: FoxyClient;
    public key: any;
    public user: any;
    public commands: any;
    public guilds: any;
    public staff: any;
    public riotAccount: any;
    public backgrounds: any;
    public checkoutList: any;
    public items: any;

    constructor(client) {
        mongoose.set("strictQuery", true)
        mongoose.connect(mongouri).catch((error) => {
            logger.error(`Failed to connect to database: `, error);
        });
        logger.info(`[DATABASE] Connected to database!`);

        this.user = mongoose.model('user', Schemas.userSchema);
        this.commands = mongoose.model('commands', Schemas.commandsSchema);
        this.guilds = mongoose.model('guilds', Schemas.guildSchema);
        this.key = mongoose.model('key', Schemas.keySchema);
        this.backgrounds = mongoose.model('backgrounds', Schemas.backgroundSchema);
        this.riotAccount = mongoose.model('riotAccount', Schemas.riotAccountSchema);
        this.items = mongoose.model('storeItems', Schemas.storeSchema);
        this.checkoutList = mongoose.model('checkoutList', Schemas.checkoutList);
        this.client = client;
    }

    async getUser(userId: BigInt): Promise<any> {
        if (!userId) null;
        const user: User = await bot.helpers.getUser(String(userId));
        let document = await this.user.findOne({ _id: user.id });
        
        if (!document) return;
        return document;
    }

    async registerCommand(commandName: string, commandDescription: string): Promise<void> {
        let commandFromDB = await this.commands.findOne({ commandName: commandName });

        if (!commandFromDB) {
            commandFromDB = new this.commands({
                commandName: commandName,
                commandUsageCount: 0,
                description: commandDescription,
                isInactive: false,
                subcommands: null,
                usage: null
            }).save();
        } else {
            commandFromDB.description = commandDescription
            await commandFromDB.save();

            return;
        }
    }
    async updateCommand(commandName: string): Promise<void> {
        let commandFromDB = await this.commands.findOneAndUpdate(
            { commandName: commandName },
            { $inc: { commandUsageCount: 1 } },
            { upsert: true, new: true }
        );

        let command = await bot.commands.get(commandName);

        if (!command || command.devsOnly) return null;

        return commandFromDB;
    }

    async getAllCommands(): Promise<void> {
        let commandsData = await this.commands.find({});
        return commandsData.map(command => command.toJSON());
    }

    async getCode(code: string): Promise<any> {
        const riotAccount = this.riotAccount.findOne({ authCode: code });
        if (!riotAccount) return null;
        return riotAccount;
    }

    async getAllUsageCount(): Promise<Number> {
        let commandsData = await this.commands.find({});
        let usageCount = 0;
        commandsData.map(command => usageCount += command.commandUsageCount);
        return usageCount;

    }

    async getGuild(guildId: BigInt): Promise<any> {
        let document = await this.guilds.findOne({ _id: guildId });
        return document;
    }

    async addGuild(guildId: BigInt): Promise<any> {
        let document = await this.guilds.findOne({ _id: guildId });

        if (!document) {
            document = new this.guilds({
                _id: guildId,
                GuildJoinLeaveModule: {
                    isEnabled: false,
                    joinMessage: null,
                    alertWhenUserLeaves: false,
                    leaveMessage: null,
                    joinChannel: null,
                    leaveChannel: null,
                },
                valAutoRoleModule: {
                    isEnabled: false,
                    unratedRole: null,
                    ironRole: null,
                    bronzeRole: null,
                    silverRole: null,
                    goldRole: null,
                    platinumRole: null,
                    diamondRole: null,
                    ascendantRole: null,
                    immortalRole: null,
                    radiantRole: null,
                },
                premiumKeys: []

            }).save()
        }

        return document;
    }

    async removeGuild(guildId: BigInt): Promise<any> {
        let document = await this.guilds.findOne({ _id: guildId });

        if (document) {
            document.delete();
        } else {
            return null;
        }

        return document;
    }

    async getAllUsers(): Promise<void> {
        let usersData = await this.user.find({});
        return usersData.map(user => user.toJSON());
    }

    async getProductFromStore(productId: string): Promise<Item> {
        let document = await this.items.findOne({ itemId: productId });
        return document;
    }

    async getCheckout(checkoutId: string): Promise<Checkout | null> {
        let checkout = await this.checkoutList.findOne({ checkoutId: checkoutId });
        return checkout ?? null;
    }

    async getAllGuilds(): Promise<void> {
        let guildsData = await this.guilds.find({});
        return guildsData.length;
    }

    async getAllBackgrounds(): Promise<Background[]> {
        let backgroundsData = await this.backgrounds.find({});
        return backgroundsData.map(background => background.toJSON());
    }

    async getBackground(backgroundId: string): Promise<any> {
        let background = await this.backgrounds.findOne({ id: backgroundId });
        return background;
    }

    async registerBackground(data: Background): Promise<void> {
        let background = await this.backgrounds.findOne({ id: data.id });
        if (background) return null;

        background = new this.backgrounds(data).save();
    }
}