import { setReadyEvent } from "./handlers/ready";
import { setInteractionCreateEvent } from "./handlers/interactionCreate";
import { setGuildMemberAddEvent } from "./handlers/guildMemberAdd";

const setupEventsHandler = (): void => {
    setReadyEvent();
    setInteractionCreateEvent();
    setGuildMemberAddEvent();
}

export { setupEventsHandler }