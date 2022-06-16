import { Run } from '../client/Event';

export const bind: string = 'messageCreate';

export const run: Run = async (client, message) => {
    /* PremiumType checker */
    const roles = ["986676570431307827", "986676477833642024", "986672822690676778"]
    const userData: any = await client.database.getUser(message.author.id);

    if (userData) {
        if (userData.premium && !userData.premiumType) {
            const role = await message.guild.roles.fetch("986710043657400321");
            if (!message.member.roles.cache.find(r => r.id === role.id)) {
                message.member.roles.add(role);
            }
            userData.premiumType = "VETERAN";
            userData.save();
        }

        for (const role of roles) {
            const roleObj = await message.guild.roles.fetch(role);
            if (message.member.roles.cache.find(r => r.id === roleObj.id)) {
                switch (role) {
                    case "986676570431307827": {
                        userData.balance += 50000;
                        userData.premiumType = "INFINITY_TURBO";
                        userData.premium = true;
                        userData.premiumDate = new Date();
                        userData.save();
                        break;
                    }

                    case "986676477833642024": {
                        userData.balance += 25000;
                        userData.premiumType = "INFINITY_PRO";
                        userData.premium = true;
                        userData.premiumDate = new Date();
                        userData.save();
                        break;
                    }

                    case "986672822690676778": {
                        userData.balance += 10000;
                        userData.premiumType = "INFINITY_ESSENTIALS";
                        userData.premium = true;
                        userData.premiumDate = new Date();
                        userData.save();
                        break;
                    }
                }
            }
        }
    }

    /* End of PremiumType checker */

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