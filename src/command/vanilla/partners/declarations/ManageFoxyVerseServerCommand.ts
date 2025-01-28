import { createCommand } from "../../../structures/createCommand";
import { ApplicationCommandOptionTypes, ChannelTypes } from "discordeno";
import chatInputInteractionContext from "../../../structures/ChatInputInteractionContext";
import RegisterServerExecutor from "../RegisterServerExecutor";
import UnregisterServerExecutor from "../UnregisterServerExecutor";
import AddRetrieveChannel from "../AddRetrieveChannel";
import RemoveRetrieveChannel from "../RemoveRetrieveChannel";
import EnableRedeemFeatureExecutor from "../EnableRedeemFeatureExecutor";
import NotifyUserExecutor from "../NotifyUserExecutor";

// TODO: Hardcoded, I know. But I'll move this to Foxy's website later.

const ManageFoxyVerseServerCommand = createCommand({
    name: "foxyverse",
    description: "Comandos para gerenciar servidores relacionados à Foxy",
    category: "mod",
    options: [
        /* For bot owner */
        {
            name: "register",
            type: ApplicationCommandOptionTypes.SubCommandGroup,
            description: "Registre um servidor na FoxyVerse",
            options: [{
                name: "add",
                description: "Registre um servidor na FoxyVerse",
                type: ApplicationCommandOptionTypes.SubCommand,
                options: [{
                    name: "server_id",
                    description: "The server ID",
                    required: true,
                    type: ApplicationCommandOptionTypes.String
                },
                {
                    name: "server_admin",
                    description: "Um administrador do servidor (Poderá adicionar mais depois)",
                    required: true,
                    type: ApplicationCommandOptionTypes.User
                },
                {
                    name: "server_invite",
                    description: "O convite do servidor",
                    required: true,
                    type: ApplicationCommandOptionTypes.String
                }]
            },
            {
                name: "remove",
                description: "Desregistre um servidor da FoxyVerse",
                type: ApplicationCommandOptionTypes.SubCommand,
                options: [{
                    name: "server_id",
                    description: "The server ID",
                    required: true,
                    type: ApplicationCommandOptionTypes.String
                }]
            }]
        },

        /* For admins */
        {
            name: "manage_premium_rewards",
            type: ApplicationCommandOptionTypes.SubCommandGroup,
            description: "Gerencie recompensas premium",
            options: [
                {
                    name: "add_retrieve_channel",
                    description: "Adicione um canal para resgatar premium",
                    type: ApplicationCommandOptionTypes.SubCommand,
                    options: [{
                        name: "channel_id",
                        description: "The channel ID",
                        required: true,
                        type: ApplicationCommandOptionTypes.Channel,
                        channelTypes: [ChannelTypes.GuildText]
                    }]
                },
                {
                    name: "remove_retrieve_channel",
                    description: "Remova um canal para resgatar premium",
                    type: ApplicationCommandOptionTypes.SubCommand,
                    options: [{
                        name: "channel_id",
                        description: "The channel ID",
                        required: true,
                        type: ApplicationCommandOptionTypes.Channel,
                        channelTypes: [ChannelTypes.GuildText]
                    }]
                },
                {
                    name: "enable_feature",
                    description: "Ative as recompensas premium para pessoas que impulsionam o servidor",
                    type: ApplicationCommandOptionTypes.SubCommand,
                    options: [{
                        name: "enable",
                        description: "Ativar ou desativar as recompensas premium",
                        required: true,
                        type: ApplicationCommandOptionTypes.Boolean
                    }]
                },
                {
                    name: "notify_user",
                    description: "Notifique o usuário na DM caso seu premium tenha sido ativado",
                    type: ApplicationCommandOptionTypes.SubCommand,
                    options: [{
                        name: "enable",
                        description: "Ativar ou desativar as notificações",
                        required: true,
                        type: ApplicationCommandOptionTypes.Boolean
                    }]
                }
            ]
        },

    ],

    async execute(context: chatInputInteractionContext, endCommand) {
        const subCommand = context.getSubCommand()

        switch (subCommand) {
            case "add": {
                RegisterServerExecutor(context, endCommand)
                break;
            }

            case "remove": {
                UnregisterServerExecutor(context, endCommand)
                break;
            }

            case "add_retrieve_channel": {
                AddRetrieveChannel(context, endCommand)
                break;
            }

            case "remove_retrieve_channel": {
                RemoveRetrieveChannel(context, endCommand)
                break;
            }

            case "enable_feature": {
                EnableRedeemFeatureExecutor(context, endCommand)
                break;
            }

            case "notify_user": {
                NotifyUserExecutor(context, endCommand)
                break;
            }
        }
    }
});

export default ManageFoxyVerseServerCommand;