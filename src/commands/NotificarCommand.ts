export = {
    name: 'notificar',

    async run(client, message, args) {
        switch (args[0]) {
            case 'novidades': {
                const role = await message.guild.roles.fetch("768275121290870814");
                if (!message.member.roles.cache.find(r => r.id === role.id)) {
                    message.reply("<:meow_blush:768292358458179595> | Agora você irá receber todas as novidades da Foxy :3");
                    return message.member.roles.add(role);
                } else {
                    message.member.roles.remove(role);
                    message.reply("<:sad_cat_1:768291156026720328> | Você não irá mais receber as novidades da Foxy :c");
                }
                break;
            }

            case 'wip': {
                const role = await message.guild.roles.fetch("802973366860251158");
                if (!message.member.roles.cache.find(r => r.id === role.id)) {
                    message.reply("<:meow_blush:768292358458179595> | Agora você irá receber todas as novidades betas da Foxy :3");
                    return message.member.roles.add(role);
                } else {
                    message.member.roles.remove(role);
                    message.reply("<:sad_cat_1:768291156026720328> | Você não irá mais receber as novidades betas da Foxy :c");
                }
                break;
            }

            case 'background': {
                const role = await message.guild.roles.fetch("820429661641113614");
                if (!message.member.roles.cache.find(r => r.id === role.id)) {
                    message.reply("<:meow_blush:768292358458179595> | Agora você irá receber todos novos backgrounds :3");
                    return message.member.roles.add(role);
                } else {
                    message.member.roles.remove(role);
                    message.reply("<:sad_cat_1:768291156026720328> | Você não irá mais receber os novos backgrounds :c");
                }
                break;
            }

            default: {
                message.reply("<:meow_blush:768292358458179595> | Você deve informar o que deseja receber, `novidades`, `wip` ou `background`");
            }
        }
    }
}