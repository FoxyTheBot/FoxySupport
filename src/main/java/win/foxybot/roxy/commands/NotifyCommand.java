package win.foxybot.roxy.commands;

import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.entities.Role;
import javax.annotation.Nonnull;

public class NotifyCommand extends ListenerAdapter {
    @Override
    public void onSlashCommandInteraction(SlashCommandInteractionEvent e) {
        if (!e.getName().equals("notificar")) return;

        switch (e.getSubcommandName()) {
            case "novidades": {
                Role role = e.getGuild().getRoleById("768275121290870814");
                if (e.getMember().getRoles().contains(role)) {
                    e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
                    e.reply("Você não receberá mais notificações da Foxy!").setEphemeral(true).queue();
                } else {
                    e.getGuild().addRoleToMember(e.getMember(), role).queue();
                    e.reply("Você receberá notificações da Foxy!").setEphemeral(true).queue();
                }
                break;
            }

            case "canary": {
                Role role = e.getGuild().getRoleById("802973366860251158");
                if (e.getMember().getRoles().contains(role)) {
                    e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
                    e.reply("Você não receberá mais notificações beta da Foxy").setEphemeral(true).queue();
                } else {
                    e.getGuild().addRoleToMember(e.getMember(), role).queue();
                    e.reply("Você receberá notificações da beta da Foxy").setEphemeral(true).queue();
                }
                break;
            }

            case "status": {
                Role role = e.getGuild().getRoleById("925578255577284689");
                if (e.getMember().getRoles().contains(role)) {
                    e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
                    e.reply("Você não receberá mais notificações de status da Foxy!").setEphemeral(true).queue();
                } else {
                    e.getGuild().addRoleToMember(e.getMember(), role).queue();
                    e.reply("Você receberá notificações de status da Foxy!").setEphemeral(true).queue();
                }
            }

            case "partner": {
                Role role = e.getGuild().getRoleById("975519789764194324");
                if (e.getMember().getRoles().contains(role)) {
                    e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
                    e.reply("Você não receberá mais notificações de parceria da Foxy!").setEphemeral(true).queue();
                } else {
                    e.getGuild().addRoleToMember(e.getMember(), role).queue();
                    e.reply("Você receberá notificações de parceria da Foxy!").setEphemeral(true).queue();
                }
            }
        }
    }
}
