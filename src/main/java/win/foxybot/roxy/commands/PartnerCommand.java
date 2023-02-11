package win.foxybot.roxy.commands;

import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.entities.Role;

public class PartnerCommand extends ListenerAdapter {
    @Override
    public void onSlashCommandInteraction(SlashCommandInteractionEvent e) {
        if (!e.getName().equals("partner")) return;
        Role role = e.getGuild().getRoleById("975519789764194324");
        if (e.getMember().getRoles().contains(role)) {
            e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
            e.reply("Você não receberá mais notificações de status da Foxy!").setEphemeral(true).queue();
        } else {
            e.getGuild().addRoleToMember(e.getMember(), role).queue();
            e.reply("Você receberá notificações de status da Foxy!").setEphemeral(true).queue();
        }
    }
}
