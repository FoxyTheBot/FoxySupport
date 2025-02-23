import { ButtonStyles, DiscordChannel, MessageComponentTypes } from "discordeno/types";
import { bot } from "../../..";
import { colors } from "../../../utils/colors";
import { createCustomId } from "../../../utils/discord/Component";
import ComponentInteractionContext from "../../structures/ComponentInteractionContext";
import { MessageFlags } from "../../../utils/discord/Message";
import { emotes } from "../../../structures/emotes";
import config from "../../../../config.json";
import { logger } from "../../../utils/logger";

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
                        emoji: {
                            id: BigInt(emotes.FOXY_YAY)
                        },
                        customId: createCustomId(1, "global", context.commandId, context.interaction.user.id, true),
                        disabled: true
                    },
                    {
                        type: MessageComponentTypes.Button,
                        style: ButtonStyles.Danger,
                        label: "Recusar",
                        emoji: {
                            id: BigInt(emotes.FOXY_PLUSHIE)
                        },
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
                    emoji: {
                        id: BigInt(emotes.FOXY_PLUSHIE)
                    },
                    customId: createCustomId(1, "global", context.commandId, context.interaction.user.id, null, threadId, "help"),
                    disabled: true
                }]
            }],
        })

        await bot.helpers.removeThreadMember(threadId, userId);
        await bot.helpers.removeThreadMember(threadId, interaction.user.id);
    };

    const handleReport = async () => {
        try {
            const DMChannel = await bot.rest.runMethod<DiscordChannel>(bot.rest, "POST", bot.constants.routes.USER_DM(), {
                recipient_id: userId
            })

            if (isAccepted === "true") {
                await bot.helpers.sendMessage(DMChannel.id, {
                    embeds: [{
                        title: `Denúncia aceita!`,
                        color: colors.GREEN,
                        fields: [{ name: "Aprovada por", value: interaction.user.username }],
                        footer: { text: "Obrigada por ajudar a manter a comunidade segura!" }
                    }],
                });
            } else {
                await bot.helpers.sendMessage(DMChannel.id, {
                    embeds: [{
                        title: `Denúncia recusada!`,
                        color: colors.RED,
                        fields: [{ name: "Rejeitada por", value: interaction.user.username }],
                        footer: { text: "Se você acha que essa decisão foi injusta, por favor, entre em contato com a equipe." }
                    }],
                })
            }

            context.sendReply({
                components: [{
                    type: MessageComponentTypes.ActionRow,
                    components: [{
                        type: MessageComponentTypes.Button,
                        style: ButtonStyles.Danger,
                        label: "Ticket Fechado",
                        emoji: {
                            id: BigInt(emotes.FOXY_PLUSHIE)
                        },
                        customId: createCustomId(1, "global", context.commandId, context.interaction.user.id, null, threadId, "report"),
                        disabled: true
                    }]
                }],
            })

            await bot.helpers.removeThreadMember(threadId, userId);
            await bot.helpers.removeThreadMember(threadId, interaction.user.id);
        } catch (e) {
            logger.error("Failed to send message to user", e);
            
            context.sendReply({
                components: [{
                    type: MessageComponentTypes.ActionRow,
                    components: [{
                        type: MessageComponentTypes.Button,
                        style: ButtonStyles.Danger,
                        label: "Ticket fechado",
                        emoji: {
                            id: BigInt(emotes.FOXY_PLUSHIE)
                        },
                        customId: createCustomId(1, "global", context.commandId, context.interaction.user.id, null, threadId, "report"),
                        disabled: true
                    }]
                }],
            })

            await bot.helpers.removeThreadMember(threadId, userId);
            await bot.helpers.removeThreadMember(threadId, interaction.user.id);
        }
    };

    if (interaction.member.roles.find(role => config.allowedRoles.includes(String(role)))) {
        switch (Number(type)) {
            case 0:
                break;
            case 2:
                await handleReport();
                break;
            case 3:
                await handleHelp();
                break;
            default:
                console.error(`Unhandled type: ${type}`);
                break;
        }
    } else {
        return null;
    }
};

export default CloseThreadButton;
