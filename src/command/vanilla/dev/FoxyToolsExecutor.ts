import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext";
import { bot } from '../../../index';
import { User } from "discordeno/transformers";
import { createEmbed } from "../../../utils/discord/Embed";
import axios from "axios";
import config from "../../../../config.json";

export default async function FoxyToolsExecutor(context: ChatInputInteractionContext, endCommand) {
    const command = context.getSubCommand();
    const user = context.getOption<User>('user', 'users')!!;

    if (!context.guildMember.roles.includes(768268280951472170n)) {
        context.sendReply({
            content: context.makeReply("1071151976504627290", "Você não tem permissão para usar esse comando!"),
            flags: 64
        });
        return endCommand();
    }

    switch (command) {
        case "add_cakes": {
            const userData = await bot.database.getUser(user.id);
            const quantity = context.getOption<Number>('quantity', false);

            if (userData.isBanned) {
                context.sendReply({ content: "O usuário está banido!", flags: 64 });
                return endCommand();
            }

            userData.userCakes.balance += Number(quantity);
            userData.userTransactions.push({
                to: user.id,
                from: context.author.id,
                quantity: Number(quantity),
                date: Date.now(),
                received: true,
                type: "addByAdmin"
            });
            userData.save();
            context.sendReply({ content: `Prontinho! Foi adicionado ${quantity} cakes para ${user.username}` })
            endCommand();
            break;
        }

        case "remove_cakes": {
            const quantity = context.getOption<Number>('quantity', false);
            const userData = await bot.database.getUser(user.id);

            if (userData.isBanned) {
                context.sendReply({ content: "O usuário está banido!", flags: 64 });
                return endCommand();
            }

            userData.userCakes.balance -= Number(quantity);
            userData.save();
            context.sendReply({ content: `Foram removidos ${quantity} Cakes de ${user.username}` })

            endCommand();
            break;
        }

        case "add": {
            const userData = await bot.database.getUser(user.id);
            if (userData.isBanned) {
                context.sendReply({
                    content: `${user.username} já está banido!`
                });
                return endCommand();
            }
            const reason = context.getOption<string>("reason", false)
            userData.isBanned = true;
            userData.banReason = reason;
            userData.banDate = Date.now();
            userData.save().catch(err => console.log(err));

            context.sendReply({
                content: `Usuário ${user.username} banido com sucesso!`,
            });
            return endCommand();
        }

        case "get_user": {
            const user = context.getOption<User>('user', 'users')!!;
            const userData = await bot.database.getUser(user.id);

            context.sendReply({
                embeds: [{
                    title: `Informações sobre ${user.username}`,
                    fields: [
                        {
                            name: "ID",
                            value: user.id.toString(),
                        },
                        {
                            name: "Cakes",
                            value: userData.userCakes.balance.toLocaleString('pt-BR'),
                        },
                        {
                            name: "Banido",
                            value: userData.isBanned ? "Sim" : "Não",
                        },
                        {
                            name: "Motivo do banimento",
                            value: userData.banReason ? userData.banReason : "Não definido",
                        },
                        {
                            name: "Data do banimento",
                            value: userData.banDate ? new Date(userData.banDate).toLocaleString() : "Não definido",
                        },
                        {
                            name: "Backgrounds",
                            value: userData.userProfile.backgroundList.map(bg => bg).join(", ") || "Nenhum background",
                        },
                        {
                            name: "Decorations",
                            value: userData.userProfile.decorationList.map(deco => deco).join(", ") || "Nenhuma decoração",
                        }
                    ]

                }]
            })
            break;
        }
        case "change_activity": {
            let activity = context.getOption<string>('text', false);
            const status = context.getOption<string>('status', false);
            const url = context.getOption<string>('url', false);
            const type = context.getOption<number>('type', false);
            const priority = context.getOption<number>('priority', false) ?? 0;
            const beforeActivity = context.getOption<string>('before_activity', false) ?? "foxybot.win";
    
            if (priority !== 1) {
                activity = `${activity} | ${beforeActivity}`;
            }
    
            const api = axios.create({
                baseURL: config.api,
                headers: {
                    Authorization: config.authorization
                }
            })
            api.post(`/status/update`, {
                "name": activity,
                "status": status,
                "url": url ?? null,
                "type": type
            });
    
            context.sendReply({
                content: "Prontinho! Atividade alterada com sucesso!",
                flags: 64
            })
            return endCommand();
        }

        case "remove": {
            const userData = await bot.database.getUser(user.id);
            if (!userData.isBanned) {
                context.sendReply({
                    content: `${user.username} não está banido!`,
                    flags: 64
                });
                return endCommand();
            }

            userData.isBanned = false;
            userData.banReason = null;
            userData.banDate = null;
            userData.save().catch(err => console.log(err));

            context.sendReply({
                content: `O banimento de ${user.username} foi removido com sucesso!`,
            });
            return endCommand();
        }

        case "check": {
            const userData = await bot.database.getUser(user.id);
            const embed = createEmbed({
                title: "Informações sobre o banimento",
                fields: [
                    {
                        name: "Usuário",
                        value: `${user.username} / ${user.id}`,
                        inline: true
                    },
                    {
                        name: "Está banido?",
                        value: userData.isBanned ? "Sim" : "Não",
                    },
                    {
                        name: "Motivo do banimento",
                        value: userData.banReason ? userData.banReason : "Não definido",
                    },
                    {
                        name: "Data do banimento",
                        value: userData.banDate ? new Date(userData.banDate).toLocaleString() : "Não definido",
                    }
                ]
            });

            context.sendReply({
                embeds: [embed]
            });

            return endCommand();
        }
    }
}