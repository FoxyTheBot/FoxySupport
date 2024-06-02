import { startBot } from 'discordeno';
import FoxyInstance from './structures/client/FoxyClient';
import { FoxyClient } from './structures/types/foxy';
import { logger } from './utils/logger';
import { enableCachePlugin } from 'discordeno/cache-plugin'
import { setupEventsHandler } from './listeners';

const bot = new FoxyInstance().bot as FoxyClient;
enableCachePlugin(bot);
setupEventsHandler();
startBot(bot);

export { bot };

process.on('unhandledRejection', (err: Error) => {
    return logger.error(err);
});

process.on('uncaughtException', (err) => {
    logger.criticalError(err.stack);
});