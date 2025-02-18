import { MessageComponentTypes } from "discordeno/types";
import { bot } from "../../..";
import { ButtonExecutor } from "../../../structures/types/buttons";
import { colors } from "../../../utils/colors";
import { createCustomId } from "../../../utils/discord/Component";
import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext";

const TICKET_MESSAGES = {
    0: {
        title: ":paintbrush: | Fanarts da Foxy",
        description: `Envie sua primeira fanart para receber o cargo de <@&779753529631965214> e uma badge no seu perfil da Foxy!\n\nAo ganhar o cargo de desenhistas você poderá usar os canais <#779760419870998558>, <#779760356889198613> e um chat só para desenhistas\n\nFanarts mal feitas ou que não sigam as regras em <#1082706802841497660> serão recusadas\n\nPrecisa de uma reference sheet para começar seu desenho? Você pode encontrar aqui: <#1086432906316107847>`,
        emoji: "🖌️",
        label: "Enviar sua primeira fanart"
    },
    2: {
        title: "✨ | Denúncia",
        description: "Denuncie alguém que esteja quebrando as regras do servidor ou da Foxy, nossa equipe irá analisar e tomar as devidas providências.\n\nAntes de denunciar, verifique as regras em <#768268318633099325> e os Termos de Serviço da Foxy em https://foxybot.win/br/support/terms.",
        emoji: "🚨",
        label: "Enviar denúncia"
    },
    3: {
        title: "💖 | Peça ajuda",
        description: `Bem vindo(a) ao nosso sistema de tickets! Aqui você pode pedir ajuda para a nossa equipe e resolver qualquer problema que você tenha. Para abrir um ticket, clique no botão abaixo! \n\nAntes de perguntar, verifique se a resposta para a sua pergunta não está em <#1079103745213870254>.`,
        emoji: "🎫",
        label: "Abrir ticket"
    }
};

export default class TicketManagerExecutor {
    async execute(context: ChatInputInteractionContext, endCommand) {
        context.sendDefer();
        const channel = await context.getOption<string>("channelid", false);
        const type = await context.getOption<number>("type", false);
        const ticketMessage = TICKET_MESSAGES[type];

        if (ticketMessage) {
            await bot.helpers.sendMessage(channel, {
                embeds: [{
                    color: colors.FOXY_DEFAULT,
                    title: ticketMessage.title,
                    thumbnail: { url: "https://cdn.discordapp.com/emojis/866084383843549204.png?size=2048" },
                    description: ticketMessage.description
                }],
                components: [{
                    type: MessageComponentTypes.ActionRow,
                    components: [{
                        type: MessageComponentTypes.Button,
                        style: 1,
                        emoji: { name: ticketMessage.emoji },
                        label: ticketMessage.label,
                        customId: createCustomId(
                            ButtonExecutor.OPEN_TICKET,
                            "global",
                            context.commandId,
                            type,
                        )
                    }]
                }]
            });

            context.sendReply({ content: "Mensagem enviada com sucesso!" });
        } else {
            context.sendReply({ content: "Tipo de mensagem inválido!" });
        }
    }
}