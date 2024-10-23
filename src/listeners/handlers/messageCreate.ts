import { ButtonStyles } from "discordeno/types";
import { bot } from "../..";
import { createActionRow, createButton } from "../../utils/discord/Component";
import { logger } from "../../utils/logger";

const PREMIUM_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
const PREMIUM_TYPE = "Foxy Premium II";
const DASHBOARD_URL = "https://foxybot.win/br/dashboard/subscriptions";

const calculatePremiumDate = (): Date => new Date(Date.now() + PREMIUM_DURATION_MS);

const sendUserDM = async (userId: string) => {
    const userDM = await bot.rest.runMethod(
        bot.rest, "POST",
        bot.constants.routes.USER_DM(),
        { recipient_id: userId }
    );

    return bot.rest.runMethod(
        bot.rest, "POST",
        bot.constants.routes.CHANNEL_MESSAGES(userDM?.id),
        {
            embeds: [{
                title: "Obrigado por impulsionar o servidor!",
                description: "Olá! Obrigada por impulsionar o servidor! Por ser um servidor parceiro, você ganhou 1 mês de premium da Foxy! Aproveite!",
            }],
            components: [
                createActionRow([createButton({
                    label: "Acessar painel de controle",
                    style: ButtonStyles.Link,
                    url: DASHBOARD_URL,
                })]),
            ],
        }
    );
};

const setMessageCreateEvent = (): void => {
    bot.events.messageCreate = async (_, message) => {
        if (message.isFromBot
            || !message.guildId
            || !message.member?.premiumSince) return;
        logger.info(`Usuário ${message.authorId} impulsionou o servidor ${message.guildId}!`);
        try {
            const userInfo = await bot.database.getUser(message.authorId);
            if (userInfo.userPremium.premium) return;
            
            userInfo.userPremium = {
                premium: true,
                premiumDate: calculatePremiumDate(),
                premiumType: PREMIUM_TYPE,
            };
            await userInfo.save();

            await sendUserDM(message.authorId.toString());
        } catch (error) {
            logger.error(`Erro ao enviar DM para ${message.authorId}. DM fechada?`, error);
        }
    };
};

export { setMessageCreateEvent };