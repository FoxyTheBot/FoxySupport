package win.foxybot.support.modules.inviteblocker;


import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.events.message.MessageUpdateEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import win.foxybot.support.utils.Emotes;

import java.util.Objects;

import static net.dv8tion.jda.api.Permission.ADMINISTRATOR;

public class InviteBlockerModule extends ListenerAdapter {
    public void onMessageReceived(MessageReceivedEvent e) {
        Message message = e.getMessage();
        String messageContent = e.getMessage().getContentRaw();
        long guildId = e.getGuild().getIdLong();
        long channelId = e.getChannel().getIdLong();

        if (guildId != 768267522670723094L || channelId == 869384482552152104L || e.getMember().hasPermission(ADMINISTRATOR)) {
            return;
        }
        if (messageContent.contains("discord.gg/")
                || messageContent.contains("discord.com/invite/")
                || messageContent.contains("discordapp.com/invite/")) {
            message.delete().queue();
            e.getChannel().sendMessage(Emotes.FOXY_BAN + Objects.requireNonNull(e.getMember()).getAsMention() + ", você não pode enviar convites de servidores aqui!").queue();
        }
    }

    public void onMessageUpdate(MessageUpdateEvent e) {
        Message message = e.getMessage();
        String messageContent = e.getMessage().getContentRaw();
        long guildId = e.getGuild().getIdLong();
        long channelId = e.getChannel().getIdLong();

        if (guildId != 768267522670723094L || channelId == 869384482552152104L || e.getMember().hasPermission(ADMINISTRATOR)) {
            return;
        } else if (messageContent.contains("discord.gg")
                || messageContent.contains("discord.com/invite")
                || messageContent.contains("discordapp.com/invite")) {
            message.delete().queue();
            e.getChannel().sendMessage(Emotes.FOXY_BAN + Objects.requireNonNull(e.getMember()).getAsMention() + ", boa tentativa editar mensagens, mas você não pode enviar convites de servidores aqui!").queue();
        }
    }
}
