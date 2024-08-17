import { handleInteractionCreate, Collection, Intents, createBot } from 'discordeno';
import { FoxyClient } from '../types/foxy';
import { loadCommands } from '../../command/structures/loadCommands';
import { transformInteraction } from '../internals/transformers/interactionResponse';
import { botHasGuildPermissions } from 'discordeno/permissions-plugin';
import DatabaseConnection from '../database/DatabaseConnection';
import config from '../../../config.json';
import AssignThread from '../../command/global/components/AssignThreadButton';
import OpenThreadButton from '../../command/global/components/OpenThreadButton';
import CloseThreadButton from '../../command/global/components/CloseThreadButton';

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
        this.bot.globalExecutions = [OpenThreadButton, CloseThreadButton, AssignThread];
    }

    private async setupInternals(): Promise<void> {
        await loadCommands();
        this.bot.transformers.reverse.interactionResponse = transformInteraction;
        this.bot.handlers.INTERACTION_CREATE = handleInteractionCreate;
    }
}