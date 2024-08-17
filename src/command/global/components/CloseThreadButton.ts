import { ButtonStyles, MessageComponentTypes } from "discordeno/types";
import { bot } from "../../..";
import { colors } from "../../../utils/colors";
import { createCustomId } from "../../../utils/discord/Component";
import ComponentInteractionContext from "../../structures/ComponentInteractionContext";
import { ButtonExecutor } from "../../../structures/types/buttons";
import { MessageFlags } from "../../../utils/discord/Message";

const CloseThreadButton = async (context: ComponentInteractionContext) => {
    const [userId, isAccepted, threadId, type] = context.sentData;
    const { interaction } = context;
    const userRole = 784511519840796682n;
    const roleToAdd = 779753529631965214n;
    const channelId = 1246876263487115368n;

    const handleFanart = async () => {
        if (!interaction.member.roles.includes(userRole)) {
            return context.sendReply({
                content: "Você não tem permissão para fazer isso.",
                flags: MessageFlags.EPHEMERAL
            });
        }

        try {
            if (isAccepted === "true") {
                await bot.helpers.addRole(768267522670723094n, userId, roleToAdd);
            }

            await bot.helpers.sendMessage(channelId, {
                content: `<@!${userId}>`,
                embeds: [{
                    title: `Sua fanart foi ${isAccepted === "true" ? "aceita" : "recusada"}!`,
                    color: isAccepted === "true" ? colors.GREEN : colors.RED,
                    fields: [{ name: "Avaliador", value: interaction.user.username }],
                }],
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
            })
            await bot.helpers.removeThreadMember(threadId, userId);
            await bot.helpers.removeThreadMember(threadId, interaction.user.id);
        } catch (e) {
            console.error(e);
        }
    };

    const handleHelp = async () => {
        context.sendReply({
            components: [{
                type: MessageComponentTypes.ActionRow,
                components: [{
                    type: MessageComponentTypes.Button,
                    style: ButtonStyles.Danger,
                    label: "Fechar Ticket",
                    customId: createCustomId(1, "global", context.commandId, context.interaction.user.id, null, threadId, "help"),
                    disabled: true
                }]
            }],
        })

        await bot.helpers.removeThreadMember(threadId, userId);
        await bot.helpers.removeThreadMember(threadId, interaction.user.id);
    };

    switch (type) {
        case "fanart":
            await handleFanart();
            break;
        case "help":
            await handleHelp();
            break;
        default:
            console.error(`Unhandled type: ${type}`);
            break;
    }
};

export default CloseThreadButton;
