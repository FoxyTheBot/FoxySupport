package win.foxybot.roxy;

import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.OnlineStatus;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.events.ReadyEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.interactions.commands.build.Commands;
import net.dv8tion.jda.api.requests.GatewayIntent;
import net.dv8tion.jda.api.requests.restaction.CommandListUpdateAction;

import win.foxybot.roxy.commands.NotifyCommand;
import win.foxybot.roxy.commands.CanaryCommand;
import win.foxybot.roxy.commands.StatusCommand;
import win.foxybot.roxy.commands.PartnerCommand;

import javax.annotation.Nonnull;
import javax.security.auth.login.LoginException;
import java.util.EnumSet;

public class Roxy extends ListenerAdapter {
    public static void main(String[] args) throws LoginException {
        JDABuilder.createLight(Settings.TOKEN, EnumSet.noneOf(GatewayIntent.class))
                .setStatus(OnlineStatus.ONLINE)
                .setActivity(Activity.listening("Toby Fox - Hopes and Dreams"))
                .enableIntents(EnumSet.of(GatewayIntent.GUILD_MESSAGES))
                .addEventListeners(
                        new Roxy(),
                        new NotifyCommand(),
                        new CanaryCommand(),
                        new StatusCommand(),
                        new PartnerCommand())
                .build();
    }

    @Override
    public void onReady(@Nonnull ReadyEvent event) {
        System.out.println("Roxy is ready!");
        CommandListUpdateAction commands = event.getJDA().getGuildById("768267522670723094").updateCommands();

        commands.addCommands(
                Commands.slash("notificar", "Receba notificações da Foxy"),
                Commands.slash("canary", "Receba notificações da Foxy Canary"),
                Commands.slash("partner", "Receba notificações de parcerias"),
                Commands.slash("status", "Receba notificações de status da Foxy")
        );

        commands.queue();
    }
}
