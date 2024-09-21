import { ButtonStyles } from "discordeno/types";
import { bot } from "../../..";
import { createActionRow, createButton } from "../../../utils/discord/Component";
import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext";

const AddBackgroundExecutor = async (context: ChatInputInteractionContext, endCommand) => {
    const id = context.getOption<string>('id', false)!!;
    const name = context.getOption<string>('name', false);
    const cakes = context.getOption<number>('cakes', false);
    const description = context.getOption<string>('description', false);
    const author = context.getOption<string>('author', false);
    const filename = context.getOption<string>('filename', false) + ".png";
    
    await bot.database.registerBackground({
        id,
        name,
        cakes,
        description,
        author,
        filename,
        inactive: false
    });

    context.sendReply({
        content: `Background ${name} registrado com sucesso!`,
        flags: 64
    });

    setTimeout(async () => {
        await bot.helpers.sendMessage(1286828114110054461n, {
            embeds: [{
                title: "Novo background na loja!",
                description: `O background **${name}** foi adicionado à loja!`,
                fields: [{
                    name: "Preço",
                    value: `${cakes} Cakes`
                }],
                image: {
                    url: `https://cakey.foxybot.win/assets/backgrounds/${filename}`
                }
            }],
            components: [createActionRow([createButton({
                label: "Ver background na loja",
                style: ButtonStyles.Link,
                url: `https://foxybot.win/br/store`
            })])]
        });
    }, 500);

    return endCommand();
}

export default AddBackgroundExecutor;