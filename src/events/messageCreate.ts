import { Run } from '../client/Event';

export const bind: string = 'messageCreate';

export const run: Run = async (client, message) => {
    /* PremiumType checker */
    try {
        const userData: any = await client.database.getUser(message.author.id);
        if (userData) {
            if (userData.premium && !userData.premiumType) {
                userData.premiumType = "VETERAN";
                userData.save();
            }

            const roles = await message.member.roles.cache.filter(r => r.id);
            const listedRoles = roles.sort((a, b) => b.position - a.position).map(role => role.id);
            if (listedRoles.includes("986676570431307827")) {
                if (!userData.initialFoxCoins) {
                    userData.balance += 50000;
                    userData.initialFoxCoins = true;
                }
                userData.premiumType = "INFINITY_TURBO";
                userData.premium = true;
                userData.repCount++;
                userData.premiumDate = new Date();
                userData.save();

            } else if (listedRoles.includes("986676477833642024")) {
                if (!userData.initialFoxCoins) {
                    userData.balance += 25000;
                    userData.initialFoxCoins = true;
                }
                userData.premiumType = "INFINITY_PRO";
                userData.premium = true;
                userData.premiumDate = new Date();
                userData.save();
            } else if (listedRoles.includes("986672822690676778")) {
                if (!userData.initialFoxCoins) {
                    userData.balance += 10000;
                    userData.initialFoxCoins = true;
                }
                userData.premiumType = "INFINITY_ESSENTIALS";
                userData.premium = true;
                userData.premiumDate = new Date();
                userData.save();
            } else if (listedRoles.includes("986710043657400321")) {
                userData.premiumType = "VETERAN";
                userData.premium = true;
                userData.premiumDate = new Date();
                userData.save();
            } else {
                userData.premiumType = null;
                userData.premium = null;
                userData.premiumDate = null;
                userData.save();
            }
        }

    } catch (e) {
        return;
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