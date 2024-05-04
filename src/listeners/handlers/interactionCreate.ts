import { MessageFlags } from '../../utils/discord/Message';
import { bot } from '../../index';
import ChatInputInteractionContext from '../../command/structures/ChatInputInteractionContext';
import { InteractionTypes } from 'discordeno/types';
import { componentExecutor } from '../../command/structures/ComponentExecutor';
import { logger } from '../../utils/logger';

const setInteractionCreateEvent = (): void => {
    bot.events.interactionCreate = async (_, interaction) => {
        const command = bot.commands.get(interaction.data?.name);
        const context = new ChatInputInteractionContext(interaction);

        if (interaction.type === InteractionTypes.MessageComponent || interaction.type === InteractionTypes.ModalSubmit) {
            componentExecutor(interaction);
            return;
        }

        async function FoxyHandler() {
            await new Promise(async (res) => {
                try {
                    command.execute(context, res);
                    logger.commandLog(interaction.data?.name, interaction.user, interaction.guildId ? interaction.guildId.toString() : "DM", interaction.data?.options?.map((option) => option.value).join(' ') || 'Nenhum');
                } catch (e) {
                    console.error(e);
                    context.sendReply({ content: "Houve um erro ao executar o comando", flags: MessageFlags.EPHEMERAL })
                }
            });
        }

        FoxyHandler();
    }
}

export { setInteractionCreateEvent }