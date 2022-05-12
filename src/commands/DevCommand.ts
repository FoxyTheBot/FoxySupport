import crypto from 'crypto';
import config from '../../settings.json';
export = {
    name: "dev",

    async run(client, message, args) {
        if (!config.authorizedUsers.includes(message.author.id)) return message.reply("<:meow_blush:768292358458179595> | Você não tem permissão para usar esse comando!");
        switch (args[0]) {
            case "premium": {
                const userData = await client.database.getUser(args[1]);
                if (!userData) return message.reply("<:meow_blush:768292358458179595> | Esse usuário não existe!");

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
                    message.reply("<:meow_blush:768292358458179595> | Você precisa informar se quer gerar um novo código ou remover o atual!");
                }
            }
                break;

            case "ban": {
                const userData = await client.database.getUser(args[1]);
                if (!userData) return message.reply("<:meow_blush:768292358458179595> | Esse usuário não existe!");

                if (args[2] === "true") {
                    userData.banned = true;
                    userData.banReason = args[3] || "Nenhuma razão informada!";
                    userData.banData = new Date();
                    await userData.save();
                    return message.reply("<:meow_blush:768292358458179595> | O usuário foi banido com sucesso!");
                } else if (args[2] === "false") {
                    userData.banned = false;
                    userData.banReason = null;
                    userData.banData = null;
                    await userData.save();
                    return message.reply("<:meow_blush:768292358458179595> | O usuário foi desbanido com sucesso!");
                }
                break;
            }

            case "foxcoins": {
                const userData = await client.database.getUser(args[1]);
                if (!userData) return message.reply("<:meow_blush:768292358458179595> | Esse usuário não existe!");

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
                }
            }
        }


    }
}