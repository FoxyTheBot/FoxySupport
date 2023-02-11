# Hello! You are in Roxy's Repository!

### Self-hosting
 - First of all you need to clone this repository using
```shell
git clone https://github.com/FoxyTheBot/Roxy
```

- You need to install an IDE to change the code, I recommend and [IntelliJ IDEA Community Edition](https://www.jetbrains.com/idea/download/#section=windows), It's free!

### Installing Dependencies
- Go to `"Run/Debug configuration"` > `"Edit Configuration"` > `"Add New Configuration"` > `"Maven"` > `"Maven Projects"` > `"Roxy"` > `"Command Line"` > `"clean install"`

Roxy use only one dependency, JDA, so you don't need to install anything else!

### Configuring
- Create a file called Settings.java in the src/main/win/foxybot/roxy folder
- Copy the following code and paste it in the file


```java
package win.foxybot.roxy;

public class Settings {
    public static final String TOKEN = "<BOT-TOKEN>";
}

```

### Running
- Go to `"Run/Debug configuration"` > `"Edit Configuration"` > `"Add New Configuration"` > `"Application"` > `"Roxy"` > `"Main Class"` > `"win.foxybot.roxy.Roxy"` > `"OK"`