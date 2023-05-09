import { createBot, Intents, startBot } from 'discordeno';
import { enableCachePlugin } from 'discordeno/cache-plugin';
import { token, clientId } from '../config.json';
import { SetupFoxySupport } from './structures/client/FoxySupportClient';
import { setupEventHandlers } from './events';
import { FoxySupportClient } from './types/foxy';

const bot = createBot({
    token: token,
    intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent | Intents.GuildMembers,
    botId: BigInt(clientId)
}) as FoxySupportClient;

enableCachePlugin(bot);
SetupFoxySupport(bot);
setupEventHandlers();

startBot(bot);

export { bot }

process.on('unhandledRejection', (err: Error) => {
    return console.error(err);
});

process.on('uncaughtException', (err) => {
    console.error(err.stack);
    process.exit(1);
});