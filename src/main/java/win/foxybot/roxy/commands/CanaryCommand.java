package win.foxybot.roxy.commands;

import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.entities.Role;
import javax.annotation.Nonnull;

public class CanaryCommand extends ListenerAdapter {
    @Override
    public void onSlashCommandInteraction(@Nonnull SlashCommandInteractionEvent e) {
        if (!e.getName().equals("canary")) return;
        Role role = e.getGuild().getRoleById("802973366860251158");
        if (e.getMember().getRoles().contains(role)) {
            e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
            e.reply("Você não receberá mais notificações da Foxy Canary!").setEphemeral(true).queue();
        } else {
            e.getGuild().addRoleToMember(e.getMember(), role).queue();
            e.reply("Você receberá notificações da Foxy Canary!").setEphemeral(true).queue();
        }
    }
}
