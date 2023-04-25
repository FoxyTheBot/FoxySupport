package win.foxybot.support.events;

import net.dv8tion.jda.api.events.session.ReadyEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.interactions.commands.build.Commands;
import net.dv8tion.jda.api.interactions.commands.build.SubcommandData;
import net.dv8tion.jda.api.requests.restaction.CommandListUpdateAction;

import java.util.Objects;

public class Ready extends ListenerAdapter {
    public void onReady(ReadyEvent event) {
        System.out.println("Foxy Support is ready!");
        CommandListUpdateAction commands = Objects.requireNonNull(event.getJDA().getGuildById("768267522670723094")).updateCommands();
        commands.addCommands(
                Commands.slash("notificar", "Receba notificações da Foxy")
                        .addSubcommands(
                                new SubcommandData("novidades", "Receba notificações de novidades da Foxy"),
                                new SubcommandData("beta", "Receba notificações de atualizações da Canary"),
                                new SubcommandData("status", "Receba notificações de atualizações de status")));
        commands.queue();
    }
}