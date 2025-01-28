import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext"
import { bot } from "../../.."

const AddRetrieveChannel = async (context: ChatInputInteractionContext, endCommand) => {
    const channelId = context.getOption<BigInt>('channel_id', false).toString()
    const guild = await bot.database.getFoxyVerseGuild(context.guildId.toString())

    if (!guild) {
        context.sendReply({
            content: "O servidor onde o comando foi executado não está registrado!",
            flags: 64
        });

        return;
    }

    if (!guild.guildAdmins.includes(context.author.id.toString())) {
        return context.sendReply({
             content: "Você não tem permissão para usar este comando!",
             flags: 64
         });
     }
    
    guild.serverBenefits.givePremiumIfBoosted.textChannelToRedeem = channelId
    await guild.save()

    context.sendReply({
        content: "Canal de resgate de premium definido com sucesso!",
        flags: 64
    });

    return endCommand();
}

export default AddRetrieveChannel;