import { handleInteractionCreate, Collection } from 'discordeno';
import { FoxyClient } from '../types/foxy';
import { loadCommands } from '../../command/structures/loadCommands';
import { transformInteraction } from '../internals/transformers/interactionResponse';
import { botHasGuildPermissions } from 'discordeno/permissions-plugin';
import DatabaseConnection from '../database/DatabaseConnection';
import config from '../../../config.json';

const setupFoxy = async (client: FoxyClient): Promise<void> => {
    client.clientId = BigInt(config.clientId);
    client.commands = new Collection();
    client.database = new DatabaseConnection(client);
    client.hasGuildPermission = botHasGuildPermissions;
    loadCommands();
}

const setupInternals = async (bot: FoxyClient): Promise<void> => {
    bot.transformers.reverse.interactionResponse = transformInteraction;
    bot.handlers.INTERACTION_CREATE = handleInteractionCreate;
};

export { setupFoxy, setupInternals };