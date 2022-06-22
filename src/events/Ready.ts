import { Run } from '../client/Event';

export const bind: string = 'ready';

export const run: Run = (client) => {
    console.log("\x1b[37m\x1b[44mINFO\x1b[0m: Roxy está online!");
    let status: object[] = [
        { name: `Roberto Carlos - Guerra dos Meninos`, type: "LISTENING" },
        { name: `The Living Tombstone - It's been so long`, type: "LISTENING" },
        { name: "Undertale - Hopes and Dreams", type: "LISTENING" },
    ];

    setInterval(() => {
        const randomStatus: object = status[Math.floor(Math.random() * status.length)];
        client.user.setPresence({ activities: [randomStatus] });
    }, 15000)
}