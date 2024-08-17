import { bot } from "../..";
import { Message } from 'discordeno';

export default class StaffActivityManager {
    constructor() { }

    public async getMessage(message: Message) {
        if (message.guildId !== 768267522670723094n) return;
        if (message.member.user.toggles.bot) return;
        const userAsMember = await bot.members.get(message.authorId)
            ?? await bot.helpers.getMember(message.guildId, message.authorId);

        if (!userAsMember) return;

        if (userAsMember.roles.includes(768268280951472170n || 768268281714311169n)) {
            if (message.content.length < 5) return;
            const userData = await bot.database.getStaff(message.authorId);
            if (!userData || userData.isDemoted) return;
            userData.messagesSent++;
            userData.lastMessage = Date.now();
            await userData.save();
        }
    }
}