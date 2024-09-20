import { ApplicationCommandOptionTypes, MessageComponentTypes } from "discordeno/types";
import { createCommand } from "../../../structures/createCommand";
import OpenThreadButton from "../../../global/components/OpenThreadButton";
import TicketManagerExecutor from "../TicketManagerExecutor";

const TicketManagerCommand = createCommand({
    name: "ticket",
    description: "Gerencia os tickets do servidor",
    category: "dev",
    devsOnly: true,
    options: [
        {
            name: "resend",
            description: "Reenvia a mensagem de abertura do ticket",
            type: ApplicationCommandOptionTypes.SubCommand,
            options: [
                {
                    name: "channelid",
                    description: "O ID do canal para reenviar a mensagem",
                    type: ApplicationCommandOptionTypes.Channel,
                    required: true
                },
                {
                    name: "type",
                    description: "O tipo de mensagem a ser reenviada",
                    choices: [
                        { name: "Ticket de ajuda", value: 3 },
                        { name: "Ticket de fanart", value: 0 }
                    ],
                    type: ApplicationCommandOptionTypes.Number,
                    required: true
                }
            ]
        }
    ],
    commandRelatedExecutions: [OpenThreadButton],
    async execute(context, endCommand) {
       new TicketManagerExecutor().execute(context, endCommand)
    }
});

export default TicketManagerCommand;