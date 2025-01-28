import { User } from "discordeno/transformers";
import { bot } from "../../..";
import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext";

const RegisterServerExecutor = async (context: ChatInputInteractionContext, endCommand) => {
    const serverId = context.getOption<string>('server_id', false)!!;
    const serverAdmin = context.getOption<User>('server_admin', "users")!!.id.toString();
    const serverInvite = context.getOption<string>('server_invite', false)!!;

    if (context.author.id !== 687867247116812378n) {
        return context.sendReply({
            content: "Você não tem permissão para usar este comando!",
            flags: 64
        });
    }

    await bot.database.getFoxyVerseGuildOrRegister(serverId, serverAdmin, serverInvite);

    if (bot.helpers.getGuild(serverId)) {
        context.sendReply({
            embeds: [{
                title: "Servidor registrado com sucesso!",
                description: "O servidor foi registrado com sucesso na FoxyVerse!",
                fields: [{
                    name: "ID do servidor",
                    value: serverId,
                    inline: true
                },
                {
                    name: "Administrador do servidor",
                    value: `<@${serverAdmin}>`,
                    inline: true
                }],
                color: 0x00FF00
            }],
            flags: 64
        });

        return endCommand();
    } else {
        context.sendReply({
            embeds: [{
                title: "Servidor registrado com sucesso!",
                description: "O servidor foi registrado com sucesso na FoxyVerse!\n\n" +
                    ":warning: **Eu não estou no servidor! Então, as configurações de servidor não serão aplicadas!**",
                thumbnail: {
                    url: "https://media.discordapp.net/attachments/1068525425963302936/1327380846944190525/image_3.gif?ex=6782db3f&is=678189bf&hm=af22471ee9f62a1addaa2cc638e3e6d754f214c9914eb09975372eec9beafaf0&="
                },
                fields: [{
                    name: "ID do servidor",
                    value: serverId,
                    inline: true
                },
                {
                    name: "Administrador do servidor",
                    value: `<@${serverAdmin}>`,
                    inline: true
                }],
            }]
        });

        return endCommand();
    }
}

export default RegisterServerExecutor;