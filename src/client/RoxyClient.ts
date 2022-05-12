import { Client, Collection } from 'discord.js';
import { RoxyEvent } from './Event';
import { RoxyCommands } from './Command';
import { HelperSettings } from './Settings';
import DatabaseManager from './DatabaseManager';
import * as fs from 'fs';

export class Helper extends Client {
    public commands: Collection<string, RoxyCommands> = new Collection();
    public events: Collection<string, RoxyEvent> = new Collection();
    public settings: HelperSettings;
    public database: DatabaseManager;

    constructor(args, settings: HelperSettings) {
        super(args);
        this.settings = settings;
        this.database = new DatabaseManager(this.settings.db, { useNewUrlParser: true, useUnifiedTopology: true, writeConcern: "majority" }, this);
    }

    loadCommands() {
        const commandFiles = fs.readdirSync('./build/src/commands').filter((file: string) => file.endsWith('.js'));
        commandFiles.forEach(async (file: string) => {
            console.info(`\x1b[37m\x1b[44mINFO\x1b[0m: Carregando comando: ${file}...`);
            const commandFile: RoxyCommands = await import(`../commands/${file}`);
            this.commands.set(commandFile.name, commandFile);
        });
    }

    loadEvents() {
        const eventFiles = fs.readdirSync('./build/src/events/').filter((file: string) => file.endsWith('.js'));
        eventFiles.forEach(async (file: string) => {
            console.info(`\x1b[37m\x1b[44mINFO\x1b[0m: Carregando evento: ${file}...`);
            const eventFile: RoxyEvent = await import(`../events/${file}`);
            this.events.set(eventFile.bind, eventFile);
            this.on(eventFile.bind, eventFile.run.bind(null, this));
        });
        console.info('\x1b[37m\x1b[44mINFO\x1b[0m: Eventos carregados!');
    }
    start() {
        console.info('\x1b[37m\x1b[44mINFO\x1b[0m: Iniciando a Roxy...');
        this.loadEvents();
        this.loadCommands();
        super.login(this.settings.token);
    }
}