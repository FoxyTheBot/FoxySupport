import { Interaction } from 'discordeno/transformers';
import { AllowedMentionsTypes, InteractionResponseTypes } from 'discordeno/types';
import { MessageFlags } from '../../utils/discord/Message';
import { bot } from '../../index';
import ComponentInteractionContext from './ComponentInteractionContext';
import { ComponentInteraction } from '../../structures/types/interaction';

const componentExecutor = async (interaction: Interaction): Promise<void> => {
  if (!interaction.data?.customId) return;

  const errorReply = async (content: string): Promise<void> => {
    await bot.helpers
      .sendInteractionResponse(interaction.id, interaction.token, {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: content,
          flags: MessageFlags.EPHEMERAL,
          allowedMentions: { parse: [AllowedMentionsTypes.UserMentions] },
        },
      })
      .catch(() => null);
  };

  const [executorIndex, interactionTarget, commandId, ...data] = interaction.data.customId.split('|');

  if (interactionTarget !== "global" && interactionTarget !== `${interaction.user.id}`)
    return errorReply("Você não pode apertar esse botão");

  // Ensure the command name is properly extracted
  const command = bot.commands.get(commandId);

  if (!command) {
    if (interactionTarget !== "global") {
      return errorReply("Comando não encontrado.");
    } else {
      const context = new ComponentInteractionContext(interaction as ComponentInteraction);
      const execute = bot.globalExecutions[Number(executorIndex)]
     return await new Promise((res) => {
        execute(context).catch((err) => {
          errorReply("Ocorreu um erro ao executar o comando");

          console.error(err);
          if (typeof err === 'string') err = new Error(err);
        });

        res(undefined);
      });
    }
  }

  if (!command.commandRelatedExecutions || command.commandRelatedExecutions.length === 0) return;
  const execute = command.commandRelatedExecutions[Number(executorIndex)];
  if (!execute) return errorReply("Interação desconhecida.");

  const context = new ComponentInteractionContext(interaction as ComponentInteraction);

  await new Promise((res) => {
    execute(context).catch((err) => {
      errorReply("Ocorreu um erro ao executar o comando");

      console.error(err);
      if (typeof err === 'string') err = new Error(err);
    });

    res(undefined);
  });
};

export { componentExecutor };
