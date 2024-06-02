import { ButtonStyles, ChannelTypes, MessageComponentTypes } from "discordeno/types";
import { bot } from "../../..";
import ComponentInteractionContext from "../../structures/ComponentInteractionContext";
import { createCustomId } from "../../../utils/discord/Component";
import { colors } from "../../../utils/colors";

const SendFanartButton = async (context: ComponentInteractionContext) => {
    await bot.helpers.startThreadWithoutMessage(1246848838233362584n, {
        type: ChannelTypes.PrivateThread,
        name: `Fanart de ${context.interaction.user.username} - ${new Date().toLocaleString()}`,
        autoArchiveDuration: 60,
    }).then(async (thread) => {
        context.sendDefer(true);
        context.sendReply({
            content: context.makeReply("1070906796274888795", `Seu ticket foi criado em <#${thread.id}>!`)
        });
        bot.helpers.sendMessage(thread.id, {
            content: `<@!${context.interaction.user.id}>`,
            embeds: [{
                title: ":paintbrush: | Envie sua fanart aqui!",
                description: "A equipe de avaliação já foi notificada e irá avaliar sua fanart em breve!",
                color: colors.FOXY_DEFAULT,
            }],
            components: [{
                type: MessageComponentTypes.ActionRow,
                components: [{
                    type: MessageComponentTypes.Button,
                    style: ButtonStyles.Success,
                    label: "Aceitar",
                    customId: createCustomId(1, "global", context.commandId, context.interaction.user.id, true, thread.id)
                },
                {
                    type: MessageComponentTypes.Button,
                    style: ButtonStyles.Danger,
                    label: "Recusar",
                    customId: createCustomId(1, "global", context.commandId, context.interaction.user.id, false, thread.id)
                }]
            }],
        });

        setTimeout(() => {
            bot.helpers.sendMessage(1246892692282277960n, {
                content: `<@&784511519840796682>`,
                embeds: [{
                    title: "Nova fanart enviada!",
                    description: `<@!${context.interaction.user.id}> (${context.interaction.user.id}) enviou uma nova fanart!`,
                }],
                components: [{
                    type: MessageComponentTypes.ActionRow,
                    components: [{
                        type: MessageComponentTypes.Button,
                        style: ButtonStyles.Primary,
                        label: "Avaliar",
                        customId: createCustomId(2, "global", context.commandId, thread.id),
                    }]
                }]
            })
        }, 500);

        await bot.helpers.addThreadMember(thread.id, context.interaction.user.id);
    });
}

export default SendFanartButton;