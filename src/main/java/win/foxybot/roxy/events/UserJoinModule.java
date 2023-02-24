package win.foxybot.roxy.events;

import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.events.guild.member.GuildMemberJoinEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

import java.util.Objects;

public class UserJoinModule extends ListenerAdapter {
    public void onGuildMemberJoin(GuildMemberJoinEvent event) {
        Guild foxyGuild = event.getJDA().getGuildById("768267522670723094");

        assert foxyGuild != null;
        if (event.getMember().getUser().isBot()) {
            return;
        }

        Objects.requireNonNull(foxyGuild.getTextChannelById("768268325528403989"))
                .getManager().setTopic("<:foxy_howdy:853366973751885854> Chat Geral | Estamos com " + foxyGuild.getMemberCount() + " membros! \n\n**<:foxy_drinking_coffee:1071119512352591974> Convite do servidor: https://discord.gg/6mG2xDtuZD**\n" +
                        "**<:foxy_yay:1070906796274888795> Adicione a Foxy em seu servidor: https://foxybot.win/add**\n" +
                        "**<:foxysunglasses:890688144280784926> Website da Foxy: https://foxybot.win**\n" +
                        "**:heart: Vote na Foxy: https://top.gg/bot/1006520438865801296/vote**\n" +
                        "**<:GitHub:746399300728258710> Código-Fonte da Foxy: https://github.com/FoxyTheBot/Foxy**\n" +
                        "\n" +
                        "Aqui você pode falar sobre qualquer coisa, portanto que siga as <#768268318633099325> né\n" +
                        "\n" +
                        "Use comandos da Foxy e outros bots em <#772182949276680232>\n" +
                        "\n" +
                        "<:ShiroFoxy:934469525997518848> Obrigado por usar a <@1006520438865801296> :3").queue();

        EmbedBuilder embed = new EmbedBuilder();
        embed.setTitle("<:foxy_wow:853366914054881310> Bem-Vindo(a) a Cafeteria da Foxy!");
        embed.setDescription("Olá, " + event.getMember().getAsMention() + "! Bem-Vindo(a) a Cafeteria da Foxy! Caso" +
                "tenha dúvidas fique a vontade para ir em <#1065999538332119131>, caso tenha alguma sugestão ou bug" +
                "vá para <#1065996156208947220>!");
        embed.setFooter("Para quem não me conhece, eu sou a Roxy! Melhor amiga da Foxy :3");
        embed.setThumbnail(event.getMember().getEffectiveAvatarUrl());
        Objects.requireNonNull(foxyGuild.getTextChannelById("1067208168301666444")).sendMessage(event.getMember().getAsMention()).setEmbeds(embed.build()).queue();
    }
}
