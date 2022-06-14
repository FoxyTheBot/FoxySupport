import { Run } from '../client/Event';

export const bind: string = 'messageCreate';

export const run: Run = async (client, message) => {
    const role = await message.guild.roles.fetch("986398691751522354");
    const userRole = message.member.roles.cache.find(r => r.id === role.id);

    if (userRole) {
        const userData: any = await client.database.getUser(message.author.id);

        if (userData.premium === false) {
            userData.premium = true;
            userData.premiumDate = new Date();
            userData.save();
            console.info(`Premium activated for ${message.author.id}`);
        }
    }
    const prefixRegex: Object = new RegExp(`^(${client.settings.prefix}|<@!?${client.user.id}>)( )*`, "gi");

    if (!message.content.match(prefixRegex)) return;

    const args = message.content.replace(prefixRegex, "").trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        command.run(client, message, args);
    } catch (error) {
        console.error(error);
    }
}