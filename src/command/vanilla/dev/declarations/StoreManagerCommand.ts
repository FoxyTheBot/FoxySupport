import { ApplicationCommandOptionTypes } from "discordeno/types";
import { createCommand } from "../../../structures/createCommand";
import UpdateBackgroundExecutor from "../UpdateBackgroundExecutor";

const StoreManagerCommand = createCommand({
    name: "store",
    description: "Comandos relacionados a loja",
    category: "dev",
    devsOnly: true,
    options: [{
        name: "background",
        description: "Gerencia os backgrounds",
        type: ApplicationCommandOptionTypes.SubCommandGroup,
        options: [{
            name: "update",
            description: "Atualiza um background",
            type: ApplicationCommandOptionTypes.SubCommand,
            options: [{
                name: "id",
                description: "ID do background",
                type: ApplicationCommandOptionTypes.String,
                required: true
            },
            {
                name: "name",
                description: "Novo nome do background",
                type: ApplicationCommandOptionTypes.String,
                required: false
            },
            {
                name: "cakes",
                description: "Novo preço do background",
                type: ApplicationCommandOptionTypes.Number,
                required: false
            },
            {
                name: "description",
                description: "Nova descrição do background",
                type: ApplicationCommandOptionTypes.String,
                required: false
            },
            {
                name: "author",
                description: "Novo autor do background",
                type: ApplicationCommandOptionTypes.String,
                required: false
            },
            {
                name: "inactive",
                description: "Se o background está inativo",
                type: ApplicationCommandOptionTypes.Boolean,
                required: false
            }]
        }]
    }],

    async execute(context, endCommand) {
        const subCommandsGroup = context.getSubCommandGroup();
        const subCommand = context.getSubCommand();

        if (!context.guildMember.roles.includes(768268280951472170n)) {
            context.sendReply({
                content: context.makeReply("1071151976504627290", "Você não tem permissão para usar esse comando!"),
                flags: 64
            });
            return endCommand();
        }

        switch (subCommandsGroup) {
            case "background": {
                switch (subCommand) {
                    case "update": {
                        UpdateBackgroundExecutor(context, endCommand);
                        break;
                    }
                }
            }
        }
    }
});

export default StoreManagerCommand;