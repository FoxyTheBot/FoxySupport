package win.foxybot.support.commands;

import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.entities.Role;

public class NotifyCommand extends ListenerAdapter {
    @Override
    public void onSlashCommandInteraction(SlashCommandInteractionEvent e) {
        if (!e.getName().equals("notificar")) return;

        switch (e.getSubcommandName()) {
            case "novidades": {
                Role role = e.getGuild().getRoleById("768275121290870814");
                if (e.getMember().getRoles().contains(role)) {
                    e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
                    e.reply("Você não receberá mais novidades da Foxy").setEphemeral(true).queue();
                } else {
                    e.getGuild().addRoleToMember(e.getMember(), role).queue();
                    e.reply("Agora você irá receber todas as novidades da Foxy!").setEphemeral(true).queue();
                }
                break;
            }

            case "beta": {
                Role role = e.getGuild().getRoleById("802973366860251158");
                if (e.getMember().getRoles().contains(role)) {
                    e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
                    e.reply("Você não receberá mais as novidades em desenvolvimento da Foxy!").setEphemeral(true).queue();
                } else {
                    e.getGuild().addRoleToMember(e.getMember(), role).queue();
                    e.reply("Agora você irá receber as novidades em desenvolvimento da Foxy!").setEphemeral(true).queue();
                }
                break;
            }

            case "status": {
                Role role = e.getGuild().getRoleById("925578255577284689");
                if (e.getMember().getRoles().contains(role)) {
                    e.getGuild().removeRoleFromMember(e.getMember(), role).queue();
                    e.reply("Você não receberá mais atualizações de status da Foxy!").setEphemeral(true).queue();
                } else {
                    e.getGuild().addRoleToMember(e.getMember(), role).queue();
                    e.reply("Você receberá atualizações de status da Foxy!").setEphemeral(true).queue();
                }
            }
        }
    }
}
