<img height="150" src="https://cdn.discordapp.com/attachments/1068525425963302936/1088896128721899672/foxylist.png" align="left"><h1 align="">💁‍♀️ Foxy Support</h1>

<br>
<br>

### ⚠ Warning
- This bot is private, it can't be added to your server!
- If you're looking for Foxy source code, click [here](https://github.com/FoxyTheBot/Foxy)
- We do not support self-hosting, use at your own risk

### 💁‍♀️ Self-hosting
 - Firstly, you need to clone this repository using:
```shell
git clone https://github.com/FoxyTheBot/FoxySupport
```

### 💻 Requirements
- Node.js v18 or higher
- Git
- TypeScript Compiler
- Yarn

### 🛠 Installing Dependencies
- Open a terminal in the project folder
- Run `yarn` in the project root to install dependencies

### 🚀 Configuring
- Create a file called config.json
- Copy the following code and paste it in the file


```json
{
    "token": "YOUR-BOT-TOKEN",
    "ownerId": "YOUR-DISCORD-ACCOUNT-ID",
    "clientId": "YOUR-BOT-ID",
    "isProduction": false,
    "mongouri": "YOUR-MONGODB-URI you can create it in https://www.mongodb.com/"
}
```

### ✨ Compiling
- To compile source, you need to run `yarn build` or `npx tsc` in your terminal
- Check if a folder called `build/` has been created
- 
### 🏃‍♂️ Running
- Finally, to run the instance, you need to execute `yarn start` or `node .` in your terminal