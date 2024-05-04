import { Interaction } from 'discordeno/transformers';
import { AllowedMentionsTypes, InteractionResponseTypes } from 'discordeno/types';
import { MessageFlags } from '../../utils/discord/Message';
import { bot } from '../../index';
import ComponentInteractionContext from './ComponentInteractionContext';
import { ComponentInteraction } from '../../structures/types/interaction';


const componentExecutor = async (interaction: Interaction): Promise<void> => {
  const receivedCommandName = interaction.message?.interaction?.name;

  if (!receivedCommandName) return;
  if (!interaction.data?.customId) return;

  const [commandName] = receivedCommandName.split(' ');

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
  const user = await bot.database.getUser(interaction.user.id);
  const command = bot.commands.get(commandName);

  if (!command) return errorReply("Comando não encontrado.");
  if (!command.commandRelatedExecutions || command.commandRelatedExecutions.length === 0) return;

  const [executorIndex, interactionTarget] = interaction.data.customId.split('|');

  if (interactionTarget.length > 1 && interactionTarget !== `${interaction.user.id}`)
    return errorReply(
      "Você não pode apertar esse botão",
    );

  const execute = command.commandRelatedExecutions[Number(executorIndex)];

  if (!execute) return errorReply("Interação desconhecida.");

  const context = new ComponentInteractionContext(interaction as ComponentInteraction);

  await new Promise((res) => {
    execute(context).catch((err) => {
      errorReply(
        `Ocorreu um erro ao executar o comando.`
      );

      console.error(err);
      // eslint-disable-next-line no-param-reassign
      if (typeof err === 'string') err = new Error(err);
    });

    res(undefined);
  });
};

export { componentExecutor };