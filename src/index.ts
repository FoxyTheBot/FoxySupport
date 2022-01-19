import { Helper } from './client/RoxyClient';
import * as Settings from '../settings.json';

const Roxy = new Helper({ intents: ["GUILDS", "DIRECT_MESSAGES", "GUILD_MESSAGES", "GUILD_MESSAGE_TYPING", "GUILD_MEMBERS"] }, Settings);
Roxy.start();