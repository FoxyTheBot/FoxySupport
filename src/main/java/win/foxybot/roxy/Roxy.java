package win.foxybot.roxy;

import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.OnlineStatus;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.requests.GatewayIntent;
import win.foxybot.roxy.commands.NotifyCommand;
import win.foxybot.roxy.events.Ready;
import win.foxybot.roxy.events.UserJoinModule;
import win.foxybot.roxy.events.UserRemoveModule;

import javax.security.auth.login.LoginException;
import java.util.EnumSet;

public class Roxy extends ListenerAdapter {
    public static void main(String[] args) throws LoginException {
        JDABuilder.createLight(Settings.TOKEN, EnumSet.noneOf(GatewayIntent.class)).enableIntents(GatewayIntent.GUILD_MEMBERS)
                .setStatus(OnlineStatus.ONLINE).setActivity(Activity.listening("https://twitch.tv/wing4merbr"))
                .addEventListeners(new Roxy(), new NotifyCommand(), new Ready(), new UserJoinModule(), new UserRemoveModule()).build();
    }
}
