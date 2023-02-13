package win.foxybot.roxy;

import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.OnlineStatus;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.events.ReadyEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.interactions.commands.build.Commands;
import net.dv8tion.jda.api.interactions.commands.build.SubcommandData;
import net.dv8tion.jda.api.requests.GatewayIntent;
import net.dv8tion.jda.api.requests.restaction.CommandListUpdateAction;
import win.foxybot.roxy.commands.NotifyCommand;

import javax.security.auth.login.LoginException;
import java.util.EnumSet;

public class Roxy extends ListenerAdapter {
    public static void main(String[] args) throws LoginException {
        JDABuilder.createLight(Settings.TOKEN, EnumSet.noneOf(GatewayIntent.class))
                .setStatus(OnlineStatus.ONLINE).setActivity(Activity.playing("JT Music - Join Us For A Bite"))
                .addEventListeners(new Roxy(), new NotifyCommand()).build();
    }

    @Override
    public void onReady(ReadyEvent event) {
        System.out.println("Roxy is ready!");
        CommandListUpdateAction commands = event.getJDA().getGuildById("768267522670723094").updateCommands();
        commands.addCommands(
                Commands.slash("notificar", "Receba notificações da Foxy")
                        .addSubcommands(
                                new SubcommandData("novidades", "Receba notificações de novidades da Foxy"),
                                new SubcommandData("canary", "Receba notificações de atualizações da Canary"),
                                new SubcommandData("status", "Receba notificações de atualizações de status"),
                                new SubcommandData("partner", "Receba notificações de novos parceiros")));
        commands.queue();
    }
}
