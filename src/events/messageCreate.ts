import { Run } from '../client/Event';
import * as faq from '../../faq.json';

export const bind: string = 'messageCreate';

export const run: Run = (client, message) => {
    if(faq[message.content]) {
        message.reply(faq[message.content]);
    }

    const prefixRegex:Object = new RegExp(`^(${client.settings.prefix}|<@!?${client.user.id}>)( )*`, "gi");

    if (!message.content.match(prefixRegex)) return;

    const args = message.content.replace(prefixRegex, "").trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if(!command) return;

    try {
        command.run(client, message, args);
    } catch(error) {
        console.error(error);
    }
}