import { setGuildMemberAddEvent } from "./handler/guildMemberAdd";
import { setReadyEvent } from "./handler/ready";

const setupEventHandlers = (): void => {
    setReadyEvent();
    setGuildMemberAddEvent();
}

export { setupEventHandlers }