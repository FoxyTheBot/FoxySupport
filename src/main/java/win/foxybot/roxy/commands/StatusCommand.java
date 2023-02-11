package win.foxybot.roxy.commands;

import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.entities.Role;
import javax.annotation.Nonnull;

public class StatusCommand extends ListenerAdapter {
    @Override
    public void onSlashCommandInteraction(@Nonnull SlashCommandInteractionEvent e) {
        if (!e.getName().equals("status")) return;
        Role role = e.getGuild().getRoleById("925578255577284689");
        if (e.getMember().getRoles().contains(role)) {
            e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
            e.reply("Você não receberá mais notificações de status da Foxy!").setEphemeral(true).queue();
        } else {
            e.getGuild().addRoleToMember(e.getMember(), role).queue();
            e.reply("Você receberá notificações de status da Foxy!").setEphemeral(true).queue();
        }
    }
}
