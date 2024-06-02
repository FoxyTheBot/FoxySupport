import { handleInteractionCreate, Collection, Intents, createBot } from 'discordeno';
import { FoxyClient } from '../types/foxy';
import { loadCommands } from '../../command/structures/loadCommands';
import { transformInteraction } from '../internals/transformers/interactionResponse';
import { botHasGuildPermissions } from 'discordeno/permissions-plugin';
import DatabaseConnection from '../database/DatabaseConnection';
import config from '../../../config.json';
import SendFanartButton from '../../command/global/components/SendFanartButton';
import RateFanartButton from '../../command/global/components/RateFanartButton';
import AssignThread from '../../command/global/components/AssignThreadButton';

export default class FoxySupportInstance {
    public bot: FoxyClient;
    constructor() {
        this.startInstance();
    }

    private async startInstance(): Promise<void> {
        this.bot = this.createBotInstance();
        await this.setupDefinitions();
        await this.setupInternals();
    }

    private createBotInstance(): FoxyClient {
        return createBot({
            token: config.token,
            intents: 37379 as Intents,
            botId: BigInt(config.clientId),
        }) as FoxyClient;
    }

    private async setupDefinitions(): Promise<void> {
        this.bot.clientId = BigInt(config.clientId);
        this.bot.commands = new Collection();
        this.bot.database = new DatabaseConnection(this.bot);
        this.bot.hasGuildPermission = botHasGuildPermissions;
        this.bot.globalExecutions = [SendFanartButton, RateFanartButton, AssignThread];
    }

    private async setupInternals(): Promise<void> {
        await loadCommands();
        this.bot.transformers.reverse.interactionResponse = transformInteraction;
        this.bot.handlers.INTERACTION_CREATE = handleInteractionCreate;
    }
}