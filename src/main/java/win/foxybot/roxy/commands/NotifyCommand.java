package win.foxybot.roxy.commands;

import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.entities.Role;
import javax.annotation.Nonnull;

public class NotifyCommand extends ListenerAdapter {
    @Override
    public void onSlashCommandInteraction(@Nonnull SlashCommandInteractionEvent e) {
        if (!e.getName().equals("notificar")) return;
        Role role = e.getGuild().getRoleById("768275121290870814");
        if (e.getMember().getRoles().contains(role)) {
            e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
            e.reply("Você não receberá mais notificações da Foxy!").setEphemeral(true).queue();
        } else {
            e.getGuild().addRoleToMember(e.getMember(), role).queue();
            e.reply("Você receberá notificações da Foxy!").setEphemeral(true).queue();
        }
    }
}
