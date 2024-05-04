import { createCommand } from "../../../structures/createCommand";
import { ApplicationCommandOptionTypes } from "discordeno/types";
import FoxyToolsExecutor from "../FoxyToolsExecutor";

const FoxyToolsCommand = createCommand({
    name: "foxytools",
    description: "Ferramentas para a equipe da Foxy",
    category: "dev",
    devsOnly: true,
    options: [
        {
            name: "add_cakes",
            description: "Adiciona Cakes para algum usuário",
            type: ApplicationCommandOptionTypes.SubCommand,
            options: [
                {
                    name: "user",
                    description: "O usuário que você quer adicionar as cakes",
                    type: ApplicationCommandOptionTypes.User,
                    required: true
                },
                {
                    name: "quantity",
                    description: "A quantidade de Cakes que você quer adicionar",
                    type: ApplicationCommandOptionTypes.Number,
                    required: true
                }
            ]
        },
        {
            name: "remove_cakes",
            description: "Remove Cakes para algum usuário",
            type: ApplicationCommandOptionTypes.SubCommand,
            options: [
                {
                    name: "user",
                    description: "O usuário que você quer remover as cakes",
                    type: ApplicationCommandOptionTypes.User,
                    required: true
                },
                {
                    name: "quantity",
                    description: "A quantidade de Cakes que você quer remover",
                    type: ApplicationCommandOptionTypes.Number,
                    required: true
                }
            ]
        },
        {
            name: "foxyban",
            "description": "Bane alguém de usar a Foxy",
            type: ApplicationCommandOptionTypes.SubCommandGroup,
            options: [
                {
                    name: "add",
                    description: "Adiciona um usuário na lista de banidos",
                    type: ApplicationCommandOptionTypes.SubCommand,
                    options: [
                        {
                            name: "user",
                            description: "Usuário a ser banido",
                            type: ApplicationCommandOptionTypes.User,
                            required: true
                        },
                        {
                            name: "reason",
                            description: "Motivo do banimento",
                            type: ApplicationCommandOptionTypes.String,
                            required: true
                        }
                    ]
                },
                {
                    name: "remove",
                    description: "Remove um usuário da lista de banidos",
                    type: ApplicationCommandOptionTypes.SubCommand,
                    options: [
                        {
                            name: "user",
                            description: "Usuário a ser desbanido",
                            type: ApplicationCommandOptionTypes.User,
                            required: true
                        }
                    ]
                },
                {
                    name: "check",
                    description: "Verifica se um usuário está banido",
                    type: ApplicationCommandOptionTypes.SubCommand,
                    options: [
                        {
                            name: "user",
                            description: "Usuário a ser verificado",
                            type: ApplicationCommandOptionTypes.User,
                            required: true
                        }
                    ]
                }
            ]
        }
    ],
    execute: async (context, endCommand) => {
        FoxyToolsExecutor(context, endCommand);
    }
});

export default FoxyToolsCommand;