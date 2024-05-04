import axios from "axios";
import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext";
import config from "../../../../config.json";

export default async function ActivityChangerExecutor(context: ChatInputInteractionContext, endCommand) {
    if (!context.guildMember.roles.includes(768268280951472170n)) {
        context.sendReply({
            content: context.makeReply("1071151976504627290", "Você não tem permissão para usar esse comando!"),
            flags: 64
        });
        return endCommand();
    }

    const activity = context.getOption<string>('text', false);
    const status = context.getOption<string>('status', false);
    const url = context.getOption<string>('url', false);
    const type = context.getOption<number>('type', false);
    const api = axios.create({
        baseURL: config.api,
        headers: {
            Authorization: config.authorization
        }
    })
    api.post(`/status/update`, {
        "name": activity,
        "status": status,
        "url": url ?? null,
        "type": type
    });

    context.sendReply({
        content: "Prontinho! Atividade alterada com sucesso!",
        flags: 64
    })
    return endCommand();
}