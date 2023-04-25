package win.foxybot.support;

import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.OnlineStatus;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.requests.GatewayIntent;
import win.foxybot.support.modules.inviteblocker.InviteBlockerModule;
import win.foxybot.support.modules.notifyroles.NotifyCommand;
import win.foxybot.support.events.Ready;
import win.foxybot.support.modules.memberupdate.UserJoinModule;
import win.foxybot.support.modules.memberupdate.UserRemoveModule;

import javax.security.auth.login.LoginException;
import java.util.EnumSet;

public class Main extends ListenerAdapter {
    public static void main(String[] args) throws LoginException {
        JDABuilder.createLight(Settings.TOKEN, EnumSet.noneOf(GatewayIntent.class)).enableIntents(GatewayIntent.GUILD_MEMBERS, GatewayIntent.GUILD_MESSAGES, GatewayIntent.GUILD_MEMBERS, GatewayIntent.MESSAGE_CONTENT)
                .setStatus(OnlineStatus.ONLINE).setActivity(Activity.playing("twitch.tv/wing4merbr"))
                .addEventListeners(
                        new Main(),
                        new NotifyCommand(),
                        new Ready(),
                        new UserJoinModule(),
                        new UserRemoveModule(),
                        new InviteBlockerModule()).build();
    }
}
