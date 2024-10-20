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
            name: "get_user",
            description: "Pega informações de um usuário",
            type: ApplicationCommandOptionTypes.SubCommand,
            options: [
                {
                    name: "user",
                    description: "O usuário que você quer pegar as informações",
                    type: ApplicationCommandOptionTypes.User,
                    required: true
                }
            ]
        },
        {
            name: "get_checkout",
            description: "Pega informações de um checkout",
            type: ApplicationCommandOptionTypes.SubCommand,
            options: [{
                name: "checkout",
                description: "O ID do checkout que você quer pegar as informações",
                type: ApplicationCommandOptionTypes.String,
                required: true
            }]
        },
        {
            name: "get_payment",
            description: "Pega informações de um pagamento",
            type: ApplicationCommandOptionTypes.SubCommand,
            options: [{
                name: "payment",
                description: "O ID do pagamento que você quer pegar as informações",
                type: ApplicationCommandOptionTypes.String,
                required: true
            }]
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
            name: "change_activity",
            description: "Altera a atividade da Foxy",
            type: ApplicationCommandOptionTypes.SubCommand,
            options: [{
                name: "type",
                description: "O tipo de atividade que será exibida nos status da Foxy (STREAMING requer uma URL)",
                type: ApplicationCommandOptionTypes.Number,
                required: true,
                choices: [{
                    name: "PLAYING",
                    value: 0
                }, {
                    name: "STREAMING",
                    value: 1
                }, {
                    name: "LISTENING",
                    value: 2
                }, {
                    name: "WATCHING",
                    value: 3
                },
                {
                    name: "CUSTOM_STATUS",
                    value: 4
                },
                {
                    name: "COMPETING",
                    value: 5
                }]
            },
            {
                name: "status",
                description: "O status que será exibido nos status da Foxy (Invísivel não exibirá o texto da atividade)",
                type: ApplicationCommandOptionTypes.String,
                required: true,
                choices: [{
                    name: "ONLINE",
                    value: "online"
                }, {
                    name: "IDLE",
                    value: "idle"
                }, {
                    name: "DO_NOT_DISTURB",
                    value: "dnd"
                }, {
                    name: "INVISIBLE",
                    value: "invisible"
                }]
            },
            {
                name: "text",
                description: "O texto que será exibido nos status da Foxy",
                type: ApplicationCommandOptionTypes.String,
                required: true
            },
            {
                name: "priority",
                description: "Prioridade da atividade",
                type: ApplicationCommandOptionTypes.Number,
                required: false,
                choices: [{
                    name: "NORMAL",
                    value: 0
                },
                {
                    name: "HIGH_PRIORITY",
                    value: 1
                }]
            },
            {
                name: "url",
                description: "A URL da atividade (apenas para STREAMING)",
                type: ApplicationCommandOptionTypes.String,
                required: false
            },
            {
                name: "before_activity",
                description: "Texto que será exibido antes do texto da atividade (Apenas se a prioridade for NORMAL)",
                type: ApplicationCommandOptionTypes.String,
                required: false
            }],
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