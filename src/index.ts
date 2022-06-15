import { Helper } from './client/RoxyClient';
import * as Settings from '../settings.json';

const Roxy = new Helper({ intents: ["GUILDS", "DIRECT_MESSAGES", "GUILD_MESSAGES", "GUILD_MESSAGE_TYPING", "GUILD_MEMBERS"] }, Settings);
Roxy.start();

process.on('uncaughtException', err => {
    console.error('Um erro inesperado e GRAVE ocorreu!\n', err);
});

process.on("unhandledRejection", (err) => {
    console.error(err);
});