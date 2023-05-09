import { FoxySupportClient } from '../../types/foxy';
import { bot } from '../../index';
import DatabaseConnection from '../database/DatabaseConnection';
import config from '../../../config.json';

const SetupFoxySupport = async (client: FoxySupportClient): Promise<void> => {
    client.owner = await bot.helpers.getUser(config.ownerId);
    client.database = await new DatabaseConnection(client);
    client.config = config;
    client.isProduction = config.isProduction;
    client.username = client.username;
}

export { SetupFoxySupport }