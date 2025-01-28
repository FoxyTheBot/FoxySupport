import { ButtonStyles } from "discordeno/types";
import { bot } from "../../..";
import { createActionRow, createButton } from "../../../utils/discord/Component";
import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext";
import { emotes } from "../../../structures/emotes";

const AddBackgroundExecutor = async (context: ChatInputInteractionContext, endCommand) => {
    const id = context.getOption<string>('id', false)!!;
    const name = context.getOption<string>('name', false);
    const cakes = context.getOption<number>('cakes', false);
    const description = context.getOption<string>('description', false);
    const author = context.getOption<string>('author', false);
    const filename = context.getOption<string>('filename', false) + ".png";
    const limitedEdition = context.getOption<boolean>('limitededition', false) || false;
    const rarity = context.getOption<string>('rarity', false);
    const collection = context.getOption<string>('collection', false);

    await bot.database.registerBackground({
        id,
        name,
        cakes,
        description,
        author,
        filename,
        inactive: false,
        releaseDate: new Date(),
        limitedEdition: limitedEdition,
        rarity,
        collection
    });

    context.sendReply({
        content: `Background ${name} registrado com sucesso!`,
        flags: 64
    });

    setTimeout(async () => {
        await bot.helpers.sendMessage(1286828114110054461n, {
            content: "<@&1291040494205534239>",
            embeds: [{
                title: `O background \"${name}"\ foi adicionado à loja!`,
                description: description,
                fields: [{
                    name: "Preço",
                    value: `${cakes} Cakes`,
                    inline: true
                },
                {
                    name: "Coleção",
                    value: collection,
                    inline: true
                },
                {
                    name: "Autor",
                    value: author || "Desconhecido",
                    inline: true
                }],
                image: {
                    url: `https://stuff.foxybot.win/backgrounds/${filename}`
                }
            }],
            components: [createActionRow([createButton({
                label: "Ver background na loja",
                style: ButtonStyles.Link,
                url: `https://foxybot.win/br/store`,
                emoji: {
                    id: BigInt(emotes.FOXY_WOW)
                }
            })])]
        });
    }, 500);

    return endCommand();
}

export default AddBackgroundExecutor;