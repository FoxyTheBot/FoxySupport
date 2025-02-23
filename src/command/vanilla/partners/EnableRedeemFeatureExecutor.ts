import { bot } from "../../..";
import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext";

const EnableRedeemFeatureExecutor = async (context: ChatInputInteractionContext, endCommand) => {
    const guild = await bot.database.getFoxyVerseGuild(context.guildId.toString());
    const isEnabled = await context.getOption<boolean>('enable', false)!!;

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
     
    guild.serverBenefits.givePremiumIfBoosted.isEnabled = isEnabled;
    await guild.save();

    context.sendReply({
        content: "Recurso de resgate de premium ativado com sucesso!",
        flags: 64
    });

    return endCommand();
}

export default EnableRedeemFeatureExecutor;