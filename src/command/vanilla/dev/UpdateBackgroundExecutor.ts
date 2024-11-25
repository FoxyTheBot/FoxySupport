import { bot } from "../../..";
import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext";

const UpdateBackgroundExecutor = async (context: ChatInputInteractionContext, endCommand) => {
    const id = context.getOption<string>('id', false)!!;
    const name = context.getOption<string>('name', false) ?? null;
    const cakes = context.getOption<number>('cakes', false) ?? null;
    const description = context.getOption<string>('description', false) ?? null;
    const author = context.getOption<string>('author', false) ?? null;
    const inactive = context.getOption<boolean>('inactive', false) ?? null;
    const filename = context.getOption<string>('filename', false) ?? null;
    const limitedEdition = context.getOption<boolean>('limitededition', false) ?? null;
    const rarity = context.getOption<string>('rarity', false) ?? null;

    const background = await bot.database.getBackground(id);

    if (!background) {
        context.sendReply({
            content: "Background não encontrado!",
            flags: 64
        });
        return endCommand();
    }

    if (name) background.name = name;
    if (cakes) background.cakes = cakes;
    if (description) background.description = description;
    if (author) background.author = author;
    if (inactive) background.inactive = inactive;
    if (filename) background.filename = filename;
    if (limitedEdition) background.limitedEdition = limitedEdition;
    if (rarity) background.rarity = rarity;
    
    background.save().catch(err => console.log(err));
    
    context.sendReply({
        content: "Background atualizado com sucesso!",
        flags: 64
    });
}

export default UpdateBackgroundExecutor;