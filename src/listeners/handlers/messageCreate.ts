import { bot } from "../.."
import StaffActivityManager from "../../modules/staff/StaffActivityManager";

const setMessageCreateEvent = (): void => {
    bot.events.messageCreate = async (_, message) => {
        if (message.isFromBot) return;
        if (message.guildId !== 768267522670723094n) return;
        new StaffActivityManager().getMessage(message);
    }
}

export { setMessageCreateEvent };