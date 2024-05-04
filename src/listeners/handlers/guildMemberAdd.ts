import { DiscordChannel } from "discordeno/types";
import { bot } from "../..";
import { createEmbed } from "../../utils/discord/Embed";
import { getUserAvatar } from "../../utils/discord/User";

const setGuildMemberAddEvent = async (): Promise<void> => {
    bot.events.guildMemberAdd = async (_, member, user) => {
        if (user.toggles.bot) return;

        const embed = createEmbed({
            title: "<:foxy_wow:853366914054881310> Bem-Vindo(a) a Cafeteria da Foxy!",
            description: `Olá, ${user.username}! ` +
                "Bem-Vindo(a) a Cafeteria da Foxy! Caso " +
                "tenha dúvidas fique a vontade para ir em <#1065999538332119131>, caso tenha alguma sugestão ou bug " +
                "vá para <#1065996156208947220>!",
            thumbnail: {
                url: getUserAvatar(user, { size: 2048, enableGif: true })
            }
        });

        const channel = await bot.helpers.getChannel("1067208168301666444");
        bot.helpers.sendMessage(channel.id, {
            content: `<@!${user.id}>`,
            embeds: [embed] 
        });

        setTimeout(async () => {
            const userInfo = await bot.helpers.getUser(user.id);
            if (userInfo.id === bot.id) throw new Error(bot.constants.Errors.YOU_CAN_NOT_DM_THE_BOT_ITSELF)
            const DMChannel = await bot.rest.runMethod<DiscordChannel>(bot.rest, "POST", bot.constants.routes.USER_DM(), {
                recipient_id: userInfo.id.toString()
            })

            const dmEmbed = createEmbed({
                title: "<:foxy_yay:1070906796274888795> **|** Bem-Vindo(a) a Cafeteria da Foxy!",
                description: "Aqui você pode falar com outras pessoas e fazer amizades, reportar problemas ou sugerir novas funcionalidades!",
                fields: [{
                    "name": "<:foxy_hm:1084105543200809060> Precisa de ajuda?",
                    "value": "Então fale sobre seu problema em <#1065999538332119131> ou <#1065996156208947220> para bugs e sugestões!"
                },
                {
                    name: "<:foxy_cry:1071151976504627290> Ué? A Foxy caiu?",
                    value: "Acompanhe os status da Foxy em <#768268399667052605>"
                },
                {
                    name: "<:foxy_pray:1084184966998536303> Quer ver novas atualizações?",
                    value: "Então visite o canal <#768268319269584897>, para ser notificado vá em <#772182949276680232> e digite `/notificar` e irei lhe mostrar as opções de notificações que você pode receber!"
                },
                {
                    name: "<:foxy_drinking_coffee:1071119512352591974> Quer enviar alguma fanart?",
                    value: "Você pode enviar sua primeira fanart em <#779758770799771679> se for aceita você receberá o cargo <@&779753529631965214>(Desenhistas) no servidor!"
                },
                {
                    name: "<:foxy_wow:853366914054881310> Quer me adicionar em seu servidor?",
                    value: "Então [clique aqui](https://discord.com/oauth2/authorize?client_id=1006520438865801296&scope=bot&permissions=8) para me adicionar em seu servidor!"
                }]
            })
            bot.helpers.sendMessage(DMChannel.id, { embeds: [dmEmbed] }).catch(() => { })
        }, 500);
    }
}

export { setGuildMemberAddEvent }