import { bot } from "../../..";
import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext";

const backgroundsBatch = new Map<string, Background>();

const AddBackgroundExecutor = async (context: ChatInputInteractionContext, endCommand: () => void) => {
  const id = context.getOption<string>('id', false)!!;
  const name = context.getOption<string>('name', false);
  let cakes: number;
  const description = context.getOption<string>('description', false);
  const author = context.getOption<string>('author', false);
  const filename = context.getOption<string>('filename', false) + ".png";
  const limitedEdition = context.getOption<boolean>('limitededition', false) || false;
  const rarity = context.getOption<string>('rarity', false);
  const collection = context.getOption<string>('collection', false);

  switch (rarity) {
    case "COMMON": cakes = 5000; break;
    case "UNCOMMON": cakes = 10000; break;
    case "RARE": cakes = 20000; break;
    case "EPIC": cakes = 40000; break;
    case "LEGENDARY": cakes = 80000; break;
    default: cakes = 0;
  }

  const background: Background = {
    id,
    name,
    cakes,
    description,
    author,
    filename,
    inactive: false,
    releaseDate: new Date(),
    limitedEdition,
    rarity,
    collection,
  };

  await bot.database.registerBackground(background);

  backgroundsBatch.set(id, background);

  await context.sendReply({
    content: `Background ${name} registrado com sucesso!`,
    flags: 64,
  });

  return endCommand();
};

export { backgroundsBatch };
export default AddBackgroundExecutor;
