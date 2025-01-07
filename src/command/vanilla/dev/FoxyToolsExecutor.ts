import ChatInputInteractionContext from "../../structures/ChatInputInteractionContext";
import { bot } from '../../../index';
import { User } from "discordeno/transformers";
import { createEmbed } from "../../../utils/discord/Embed";
import axios from "axios";
import config from "../../../../config.json";
import { MessageFlags } from "../../../utils/discord/Message";

export default async function FoxyToolsExecutor(context: ChatInputInteractionContext, endCommand) {
    const command = context.getSubCommand();
    const user = context.getOption<User>('user', 'users')!!;
    context.sendDefer(true);

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
                            inline: true
                        },
                        {
                            name: "Cakes",
                            value: userData.userCakes.balance.toLocaleString('pt-BR'),
                            inline: true
                        },
                        {
                            name: "Banido",
                            value: userData.isBanned ? "Sim" : "Não",
                            inline: true
                        },
                        {
                            name: "Motivo do banimento",
                            value: userData.banReason ? userData.banReason : "Não definido",
                            inline: true
                        },
                        {
                            name: "Data do banimento",
                            value: userData.banDate ? new Date(userData.banDate).toLocaleString() : "Não definido",
                            inline: true
                        },
                        {
                            name: "Expiração do premium",
                            value: userData.userPremium.premiumDate ? new Date(userData.userPremium.premiumDate).toLocaleString() : "Não definido",
                            inline: true
                        },
                        {
                            name: "Último premium",
                            value: userData.userPremium.premiumType ? userData.userPremium.premiumType : "Não definido",
                            inline: true
                        }
                    ]
                }]
            })
            break;
        }

        case "get_checkout": {
            const checkoutId = context.getOption<string>('checkout', false);
            const checkoutInfo = await bot.database.getCheckout(checkoutId);
            const itemInfo = await bot.database.getProductFromStore(checkoutInfo.itemId);

            if (!checkoutInfo) {
                context.sendReply({
                    content: "Não foi possível encontrar a transação",
                    flags: MessageFlags.EPHEMERAL
                });
                return endCommand();
            }

            const user = await bot.helpers.getUser(checkoutInfo.userId);

            const embed = createEmbed({
                title: "Informações sobre a transação",
                fields: [
                    {
                        name: "ID da transação",
                        value: `\`\`\`${checkoutInfo.checkoutId}\`\`\``,
                    },
                    {
                        name: "ID do usuário",
                        value: `\`\`\`${user.id}\`\`\``,
                    },
                    {
                        name: "Item",
                        value: await itemInfo.itemName,
                    },
                    {
                        name: "Referência do pagamento",
                        value: checkoutInfo.paymentId ?? "Não definido",
                    },
                    {
                        name: "Pagamento aprovado",
                        value: checkoutInfo.isApproved ? "Sim" : "Não",
                    }]
            });

            context.sendReply({
                embeds: [embed],
                flags: MessageFlags.EPHEMERAL
            });

            break;
        }

        case "get_payment": {
            const paymentInfo = await bot.mp.getPayment(context.getOption<string>('payment', false));
            const embed = createEmbed({
                title: "Informações sobre o pagamento",
                fields: [
                    {
                        name: "ID do pagamento",
                        value: paymentInfo.id.toString(),
                        inline: true
                    },
                    {
                        name: "Status",
                        value: paymentInfo.status,
                        inline: true
                    },
                    {
                        name: "Método de pagamento",
                        value: paymentInfo.payment_method_id,
                        inline: true
                    },
                    {
                        name: "Valor",
                        value: paymentInfo.transaction_amount.toString() + " " + paymentInfo.currency_id,
                        inline: true
                    },
                    {
                        name: "Data",
                        value: new Date(paymentInfo.date_created).toLocaleString(),
                        inline: true
                    },
                    {
                        name: "Descrição",
                        value: paymentInfo.description,
                        inline: true
                    },
                    {
                        name: "ID do usuário",
                        value: paymentInfo.external_reference,
                        inline: true
                    }
                ],

                footer: {
                    text: "Informações fornecidas pela API do Mercado Pago"
                }
            });

            context.sendReply({
                embeds: [embed],
                flags: MessageFlags.EPHEMERAL
            });

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
                content: context.makeReply("1070906796274888795", "Status alterado com sucesso!"),
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