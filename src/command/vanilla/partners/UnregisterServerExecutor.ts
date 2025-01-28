import { bot } from "../../..";
import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext";

const UnregisterServerExecutor = async (context: ChatInputInteractionContext, endCommand) => {
    const serverId = context.getOption<string>('server_id', false)!!;

    if (context.author.id !== 687867247116812378n) {
        context.sendReply({
            content: "Você não tem permissão para usar este comando!",
            flags: 64
        })
    }

    const guild = await bot.database.unregisterFoxyVerseGuild(serverId);

    if (!guild) {
        context.sendReply({
            content: "Este servidor não está registrado!",
            flags: 64
        });

        return endCommand();
    }

    context.sendReply({
        content: "Servidor removido com sucesso! Se eu estiver no servidor, sairei em breve.",
        flags: 64
    });

    try {
        bot.helpers.leaveGuild(serverId);
    } catch (error) {
        null;
    }

    return endCommand();
}

export default UnregisterServerExecutor;