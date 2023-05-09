import { Bot, User } from 'discordeno';
import { BotWithCache } from 'discordeno/cache-plugin';

export interface FoxySupportClient extends BotWithCache<Bot> {
    username: string;
    database: any;
    config: Object,
    owner: User,
    isProduction: boolean
}