import { ApplicationCommandOptionTypes } from "discordeno/types";
import { createCommand } from "../../../structures/createCommand";
import ActivityChangerExecutor from "../ActivityChangerExecutor";

const ActivityChangerCommand = createCommand({
    name: "change",
    description: "Altera a atividade da Foxy",
    category: "dev",
    devsOnly: true,

    options: [{
        name: "activity",
        description: "Altera a atividade da Foxy",
        type: ApplicationCommandOptionTypes.SubCommand,
        options: [{
            name: "type",
            description: "O tipo de atividade que você quer",
            type: ApplicationCommandOptionTypes.Number,
            required: true,
            choices: [{
                name: "Playing",
                value: 0
            }, {
                name: "Streaming",
                value: 1
            }, {
                name: "Listening",
                value: 2
            }, {
                name: "Watching",
                value: 3
            },
            {
                name: "Custom",
                value: 4
            },
            {
                name: "Competing",
                value: 5
            }]
        },
        {
            name: "status",
            description: "O status que você quer",
            type: ApplicationCommandOptionTypes.String,
            required: true,
            choices: [{
                name: "Online",
                value: "online"
            }, {
                name: "Idle",
                value: "idle"
            }, {
                name: "Do not disturb",
                value: "dnd"
            }, {
                name: "Invisible",
                value: "invisible"
            }]
        },
        {
            name: "text",
            description: "O texto da atividade",
            type: ApplicationCommandOptionTypes.String,
            required: true
        },
        {
            name: "url",
            description: "A URL da atividade",
            type: ApplicationCommandOptionTypes.String,
            required: false
        }]
    }],
    execute: async (context, endCommand) => {
        ActivityChangerExecutor(context, endCommand);
    }
});

export default ActivityChangerCommand;