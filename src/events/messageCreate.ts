import { Run } from '../client/Event';
import * as faq from '../../faq.json';

export const bind: string = 'messageCreate';

export const run: Run = (client, message) => {
    if(faq[message.content]) {
        message.reply(faq[message.content]);
    }
}