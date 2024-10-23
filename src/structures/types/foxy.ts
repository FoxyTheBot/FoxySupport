import { Bot, Collection, User } from 'discordeno';
import { ChatInputInteractionCommand } from './command';
import { botHasGuildPermissions } from 'discordeno/permissions-plugin';
import { BotWithCache } from 'discordeno/cache-plugin';
import DatabaseConnection from '../database/DatabaseConnection';
import ComponentInteractionContext from '../../command/structures/ComponentInteractionContext';
import MercadoPagoClient from '../../utils/MercadoPagoClient';
export interface IdentifiedData<T> {
  id: number;
  data: T;
}

export interface FoxyClient extends BotWithCache<Bot> {
  commands: Collection<string, ChatInputInteractionCommand>;
  owner: User;
  clientId: bigint;
  username: string;
  isProduction: boolean;
  database: DatabaseConnection;
  config: Config;
  mp: MercadoPagoClient
  locale: Function;
  isReady: boolean;
  hasGuildPermission: typeof botHasGuildPermissions;
  globalExecutions: ((context: ComponentInteractionContext<any>) => Promise<unknown>)[];
}

export interface Config {
  clientId: string;
  token: string;
  mongouri: string;
  mercadopago: {
    authToken: string;
  }
  webhooks: {
    event_log: {
      id: string;
      token: string;
    }
  }
  devGuildId: string;
  valorantAPI: string;
  authorization: string;
  api: string;
}