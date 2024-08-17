import { setReadyEvent } from "./handlers/ready";
import { setInteractionCreateEvent } from "./handlers/interactionCreate";
import { setGuildMemberAddEvent } from "./handlers/guildMemberAdd";
import { setMessageCreateEvent } from "./handlers/messageCreate";

const setupEventsHandler = (): void => {
    setReadyEvent();
    setInteractionCreateEvent();
    setGuildMemberAddEvent();
    setMessageCreateEvent();
}

export { setupEventsHandler }