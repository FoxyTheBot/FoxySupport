import { ButtonStyles, MessageComponentTypes } from "discordeno/types";
import ComponentInteractionContext from "../../structures/ComponentInteractionContext";
import { createCustomId } from "../../../utils/discord/Component";
import { bot } from "../../..";
import { ButtonExecutor } from "../../../structures/types/buttons";

const AssignThread = async (context: ComponentInteractionContext) => {
    const [threadId] = context.sentData;
    context.sendReply({
        components: [{
            type: MessageComponentTypes.ActionRow,
            components: [{
                type: MessageComponentTypes.Button,
                style: ButtonStyles.Primary,
                label: "Assumir Ticket",
                customId: createCustomId(ButtonExecutor.ASSUME_TICKET, "global", context.commandId, context.interaction.user.id, threadId),
                disabled: true
            }]
        }]
    });

    await bot.helpers.addThreadMember(threadId, context.interaction.user.id);
}

export default AssignThread;