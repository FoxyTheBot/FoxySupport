<h1 align="center">💁‍♀️ Foxy Support</h1>

### ⚠ Warning
- This bot is private, it can't be added to your server!
- If you're looking for Foxy source code click [here](https://github.com/FoxyTheBot/Foxy)
### 💁‍♀️ Self-hosting
 - First of all you need to clone this repository using
```shell
git clone https://github.com/FoxyTheBot/FoxySupport
```

### 💻 Requirements
- Java 8 or higher
- Maven 3.5.0 or higher
- Git
- An IDE (We recommend [IntelliJ IDEA Community](https://www.jetbrains.com/idea/download/download-thanks.html?platform=windows&code=IIC) for Java)

### 🛠 Installing Dependencies
- Go to `"Run/Debug configuration"` > `"Edit Configuration"` > `"Add New Configuration"` > `"Maven"` > `"Maven Projects"` > `"FoxySupport"` > `"Command Line"` > `"clean install"`

Roxy use only one dependency, JDA, so you don't need to install anything else!

### 🚀 Configuring
- Create a file called Settings.java in the src/main/win/foxybot/support folder
- Copy the following code and paste it in the file


```java
package win.foxybot.support;

public class Settings {
    // Replace <BOT-TOKEN> with your bot token
    public static final String TOKEN = "<BOT-TOKEN>";
}

```

### 🏃‍♂️ Running
- Go to `"Run/Debug configuration"` > `"Edit Configuration"` > `"Add New Configuration"` > `"Application"` > `"FoxySupport"` > `"Main Class"` > `"win.foxybot.support.Roxy"` > `"OK"`