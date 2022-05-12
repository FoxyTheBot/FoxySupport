import crypto from 'crypto';
import { MessageEmbed } from 'discord.js';
import config from '../../settings.json';
export = {
    name: "dev",

    async run(client, message, args) {
        if (!config.authorizedUsers.includes(message.author.id)) return message.reply("<:meow_blush:768292358458179595> | Você não tem permissão para usar esse comando!");
        if (!args[1] || isNaN(args[1])) return message.reply("<:meow_blush:768292358458179595> | Você precisa informar o ID do usuário!");
        const userData = await client.database.getUser(args[1]);
        if (!userData) return message.reply("<:meow_blush:768292358458179595> | Esse usuário não existe!");

        switch (args[0]) {
            case "premium": {
                if (args[2] === "generate"?.toLowerCase()) {
                    const key = crypto.randomBytes(32).toString('hex');
                    await client.database.registerKey(key, userData._id);
                    return message.reply(`<:meow_blush:768292358458179595> | O código de ativação foi gerado com sucesso!\n\nCódigo: ${key}`);
                } else if (args[2] === "remove"?.toLowerCase()) {
                    await client.database.removeKey(userData._id);
                    userData.premium = false;
                    userData.premiumDate = null;
                    await userData.save();
                    return message.reply("<:meow_blush:768292358458179595> | O código de ativação e o premium foram removidos do usuário!");
                } else {
                    return message.reply("<:meow_blush:768292358458179595> | Você precisa informar o comando que deseja executar!");
                }
                break;
            }

            case "ban": {
                if (args[2] === "true") {
                    userData.banned = true;
                    userData.banReason = `${args[3]} - Banido por ${message.author.tag} / ${message.author.id}` || `Sem motivo especificado - Banido por ${message.author.tag} / ${message.author.id}`;
                    userData.banData = new Date();
                    await userData.save();
                    return message.reply("<:meow_blush:768292358458179595> | O usuário foi banido com sucesso!");
                } else if (args[2] === "false") {
                    userData.banned = false;
                    userData.banReason = null;
                    userData.banData = null;
                    await userData.save();
                    return message.reply("<:meow_blush:768292358458179595> | O usuário foi desbanido com sucesso!");
                } else {
                    message.reply("<:meow_blush:768292358458179595> | Você precisa informar se quer banir ou desbanir o usuário!");
                }
                break;
            }

            case "foxcoins": {
                if (args[2] === "add") {
                    if (isNaN(args[3])) return message.reply("<:meow_blush:768292358458179595> | Você precisa informar um valor numérico!");
                    userData.foxcoins += parseInt(args[3]);
                    await userData.save();
                    return message.reply(`<:meow_blush:768292358458179595> | O usuário recebeu ${args[3]} FoxCoins!`);
                } else if (args[2] === "remove") {
                    if (isNaN(args[3])) return message.reply("<:meow_blush:768292358458179595> | Você precisa informar um valor numérico!");
                    userData.foxcoins -= parseInt(args[3]);
                    await userData.save();
                    return message.reply(`<:meow_blush:768292358458179595> | O usuário perdeu ${args[3]} FoxCoins!`);
                } else {
                    return message.reply("<:meow_blush:768292358458179595> | Você precisa informar se quer adicionar ou remover FoxCoins!");
                }
                break;
            }

            default: {
                const embed = new MessageEmbed();

                embed.setTitle("Admin Only");
                embed.setDescription("Lembre-se de executar `fh!dev <função> <ID> <valor>`");
                embed.addField("Funções", "`premium` - Ativa ou desativa o premium do usuário\n`ban` - Banir ou desbanir o usuário\n`foxcoins` - Adicionar ou remover FoxCoins do usuário");
                embed.addField("Valores", "`true`, `false` (Válidos para ban) \n `add`, `remove` (Válidos para foxcoins) \n `generate`, `remove` (Válidos para premium)");
                message.channel.send({ embeds: [embed] });
            }

        }


    }
}