import { ApplicationCommandOptionTypes, MessageComponentTypes } from "discordeno/types";
import { createCommand } from "../../../structures/createCommand";
import { bot } from "../../../..";
import { createCustomId } from "../../../../utils/discord/Component";
import SendFanartButton from "../../../global/components/SendFanartButton";
import { colors } from "../../../../utils/colors";

const TicketManagerCommand = createCommand({
    name: "ticket",
    description: "Gerencia os tickets do servidor",
    category: "dev",
    devsOnly: true,
    options: [{
        name: "resend",
        description: "Reenvia a mensagem de abertura do ticket",
        type: ApplicationCommandOptionTypes.SubCommand,
        options: [{
            name: "channelid",
            description: "O ID do canal para reenviar a mensagem",
            type: ApplicationCommandOptionTypes.Channel,
            required: true
        }]
    }],
    commandRelatedExecutions: [SendFanartButton],
    async execute(context) {
        const channel = await context.getOption<string>("channelid", false);
        bot.helpers.sendMessage(channel, {
            embeds: [{
                color: colors.FOXY_DEFAULT,
                title: ":paintbrush: | Fanarts da Foxy",
                thumbnail: {
                    url: "https://cdn.discordapp.com/emojis/866084383843549204.png?size=2048"
                },
                description: "Envie sua primeira fanart para receber o cargo de <@&779753529631965214> e uma badge no seu perfil da Foxy!\n\nAo ganhar o cargo de desenhistas você poderá usar os canais <#779760419870998558>, <#779760356889198613> e um chat só para desenhistas\n\nFanarts mal feitas ou que não siga as regras em <#1082706802841497660> será recusada\n\nPrecisa de uma reference sheet para começar seu desenho? Você pode encontrar aqui: <#1086432906316107847>"
            }],

            components: [{
                type: MessageComponentTypes.ActionRow,
                components: [{
                    type: MessageComponentTypes.Button,
                    style: 1,
                    emoji: {
                        name: "🎨"
                    },
                    label: "Enviar sua primeira fanart",
                    customId: createCustomId(0, "global", context.commandId)
                }]
            }]
        });

        context.sendReply({
            content: "Mensagem enviada com sucesso!",
            flags: 64
        });
    }
});

export default TicketManagerCommand;