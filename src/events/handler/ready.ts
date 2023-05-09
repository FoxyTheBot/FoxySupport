import { bot } from '../../index';

const setReadyEvent = (): void => {
    bot.events.ready = (_, payload) => {
        console.info(`[Ready] Foxy Support is ready!`)
    }
}

export { setReadyEvent }