import { backgroundsBatch } from "./AddBackgroundExecutor";
import { bot } from "../../..";
import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext";
import config from "../../../../config.json";
import { colors } from "../../../utils/colors";

const AnnounceBatchExecutor = async (context: ChatInputInteractionContext, endCommand: () => void) => {
    if (backgroundsBatch.size === 0) {
        await context.sendReply({
            content: "Não há backgrounds para anunciar.",
            flags: 64,
        });
        return endCommand();
    }

    const embeds = [...backgroundsBatch.values()].map(bg => ({
        title: `O background "${bg.name}" foi adicionado à loja!`,
        description: bg.description,
        color: colors.RANDOM,
        fields: [
            { name: "Preço", value: `**${bg.cakes.toLocaleString("pt-BR")}** Cakes`, inline: true },
            { name: "Coleção", value: bg.collection || "Desconhecida", inline: true },
            { name: "Autor", value: bg.author || "Desconhecido", inline: true },
        ],
        image: { url: `https://stuff.foxybot.xyz/backgrounds/${bg.filename}` },
    }));

    await bot.helpers.sendMessage(config.channels.newStoreItem, {
        content: "<@&1291040494205534239>",
        embeds,
    });

    context.sendReply({
        content: "Backgrounds anunciados!",
        flags: 64
    });

    backgroundsBatch.clear();

    return endCommand();
};

export default AnnounceBatchExecutor;
