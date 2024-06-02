import { ButtonStyles, MessageComponentTypes } from "discordeno/types";
import { bot } from "../../..";
import { colors } from "../../../utils/colors";
import { createCustomId } from "../../../utils/discord/Component";
import ComponentInteractionContext from "../../structures/ComponentInteractionContext";

const RateFanartButton = async (context: ComponentInteractionContext) => {
    const [userId, isAccepted, threadId] = context.sentData;
    if (!context.interaction.member.roles.includes(784511519840796682n)) {
        context.sendDefer(true);
       return context.sendReply({
            content: "Você não tem permissão para fazer isso!",
            flags: 64
        });
    }
    try {
        if (isAccepted === "true") {
            await bot.helpers.addRole(768267522670723094n, userId, 779753529631965214n);
        }
        await bot.helpers.sendMessage(1246876263487115368n, {
            content: `<@!${userId}>`,
            embeds: [{
                title: `Sua fanart foi ${isAccepted === "true" ? "aceita" : "recusada"}!`,
                color: isAccepted === "true" ? colors.GREEN : colors.RED,
                fields: [
                    {
                        name: "Avaliador",
                        value: context.interaction.user.username
                    }
                ],
            }]
        });
        context.sendReply({
            components: [{
                type: MessageComponentTypes.ActionRow,
                components: [{
                    type: MessageComponentTypes.Button,
                    style: ButtonStyles.Success,
                    label: "Aceitar",
                    customId: createCustomId(1, "global", context.commandId, context.interaction.user.id, true),
                    disabled: true
                },
                {
                    type: MessageComponentTypes.Button,
                    style: ButtonStyles.Danger,
                    label: "Recusar",
                    customId: createCustomId(1, "global", context.commandId, context.interaction.user.id, false),
                    disabled: true
                }]
            }],
        });

        await bot.helpers.removeThreadMember(threadId, userId);
        await bot.helpers.removeThreadMember(threadId, context.interaction.user.id);
    } catch (e) {
        console.error(e);
    }
}

export default RateFanartButton;