import { ButtonStyles, ChannelTypes, MessageComponentTypes } from "discordeno/types";
import { bot } from "../../..";
import ComponentInteractionContext from "../../structures/ComponentInteractionContext";
import { createCustomId } from "../../../utils/discord/Component";
import { colors } from "../../../utils/colors";
import { ButtonExecutor } from "../../../structures/types/buttons";
import { emotes } from "../../../structures/emotes";

const THREAD_SETTINGS = {
    fanart: {
        channelId: 1246848838233362584n,
        namePrefix: "Fanart de",
        notificationChannelId: 1246892692282277960n,
        notificationRoleId: 784511519840796682n,
        embed: {
            title: ":paintbrush: | Envie sua fanart aqui!",
            description: "A equipe de avaliação já foi notificada e irá avaliar sua fanart em breve!",
            color: colors.FOXY_DEFAULT
        },
        buttons: [
            { style: ButtonStyles.Success, label: "Aceitar", accepted: true },
            { style: ButtonStyles.Danger, label: "Recusar", accepted: false }
        ],
        notificationEmbed: {
            title: "Nova fanart enviada!",
            description: (userId: bigint) => `<@!${userId}> (${userId}) enviou uma nova fanart!`
        }
    },
    help: {
        channelId: 1274403080686796866n,
        namePrefix: "Ticket de",
        notificationChannelId: 1274406619815350364n,
        notificationRoleIds: [768268280951472170n, 768268281714311169n],
        embed: {
            title: "💖 | Em que podemos ajudar?",
            description: "Descreva o motivo do seu ticket e aguarde a nossa equipe!",
            color: 0x2F3136,
            footer: { text: "A equipe foi notificada e irá responder em breve! Tenha paciência." }
        },
        buttons: [
            {
                style: ButtonStyles.Danger, 
                label: "Fechar Ticket",
                emoji: {
                    id: BigInt(emotes.FOXY_CUPCAKE)
                },
                accepted: null
            }
        ],
        notificationEmbed: {
            title: "Novo ticket aberto!",
            description: (userId: bigint) => `<@!${userId}> (${userId}) abriu um ticket!`
        }
    }
};

const OpenThreadButton = async (context: ComponentInteractionContext) => {
    const [type] = context.sentData;
    const settings = THREAD_SETTINGS[type];

    if (!settings) return;

    const threadName = `${settings.namePrefix} ${context.interaction.user.username} - ${new Date().toLocaleString()}`;
    
    const thread = await bot.helpers.startThreadWithoutMessage(settings.channelId, {
        type: ChannelTypes.PrivateThread,
        name: threadName,
        autoArchiveDuration: 60
    });

    context.sendDefer(true);
    context.sendReply({
        content: context.makeReply("1070906796274888795", `Seu ticket foi criado em <#${thread.id}>!`)
    });

    bot.helpers.sendMessage(thread.id, {
        embeds: [settings.embed],
        components: [{
            type: MessageComponentTypes.ActionRow,
            components: settings.buttons.map(button => ({
                type: MessageComponentTypes.Button,
                style: button.style,
                label: button.label,
                emoji: button.emoji ? { id: button.emoji.id } : undefined,
                customId: createCustomId(ButtonExecutor.CLOSE_TICKET, "global", context.commandId, context.interaction.user.id, button.accepted, thread.id, type)
            }))
        }]
    });

    setTimeout(() => {
        bot.helpers.sendMessage(settings.notificationChannelId, {
            content: settings.notificationRoleIds 
                ? settings.notificationRoleIds.map(id => `<@&${id}>`).join(" | ") 
                : `<@&${settings.notificationRoleId}>`,
            embeds: [{
                title: settings.notificationEmbed.title,
                description: settings.notificationEmbed.description(context.interaction.user.id)
            }],
            components: [{
                type: MessageComponentTypes.ActionRow,
                components: [{
                    type: MessageComponentTypes.Button,
                    style: ButtonStyles.Primary,
                    label: "Assumir Ticket",
                    emoji: {
                        id: BigInt(emotes.FOXY_YAY)
                    },
                    customId: createCustomId(ButtonExecutor.ASSUME_TICKET, "global", context.commandId, thread.id),
                }]
            }]
        });
    }, 500);

    await bot.helpers.addThreadMember(thread.id, context.interaction.user.id);
};

export default OpenThreadButton;