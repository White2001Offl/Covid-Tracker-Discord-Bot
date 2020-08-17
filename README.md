# Covid-Tracker-Discord-Bot
A user friendly Discord Bot to track down Covid Cases.


## Dependencies
```javascript
npm install discord.js
npm install quick.db
npm install random-hex
npm install node-fetch
npm install cron
```

**These are the dependencies required to run this BOT**


## Setup

* First, You need Node JS v8.0+ To be installed
* Clone this Github Repo and then run `npm init -y` in the home directory to create a package.json
* Then install the above [dependencies](https://github.com/White2001Offl/Covid-Tracker-Discord-Bot/blob/master/README.md#dependencies)
* If you face error while installing `quick.db` Check the below [Error Fixes](https://github.com/White2001Offl/Covid-Tracker-Discord-Bot/blob/master/README.md#error-fixes)
* Then add your bot token in [Config.json File](https://github.com/White2001Offl/Covid-Tracker-Discord-Bot/blob/master/config.json)
* You can change your prefix in config.json
* Then run `node bot.js` And All should work fine


## Features
* It can do Auto Post in the specific channel which you provide in `config` command i.e., World Stats and the country Stats which you opted in `config` command.
* You can change to your wish. Check the [crontab](https://crontab.guru/) Website on how to use the time.
* Now, You can add More than 1 country in your config. More countries = More time it takes to validate each country code. I recommend to add till 3 for best.
* By default its set to send a message for every 6 hours.


## Error Fixes
* **If you face error while installing `quick.db` Check the below TroubleShoot**

```javascript
NOTE: REQUIRES NODE V8
Stuff before installation:

- You can use CMD like the Powershell to do those steps there is not a specific terminal to use
 
- Node-gyp needs python 2.x or 3.x and Visual C++ Build Tools.
 
- If you are on windows vista / 7 you will need to install the .NET Framework 4.5.1 which can be downloaded here:
  https://www.microsoft.com/en-us/download/details.aspx?id=40773


1- Click on the windows-key of your keyboard to open the windows menu

2- Type cmd/powershell (It's totally your choice) and right click on the first result

3- Click "Run as Administrator"

4- When the terminal is opened type "npm install --global windows-build-tools --vs2015" (without quotes) in it and the installation will start. (Sometimes this can take long)

5- When the installation is finished you can close the terminal.

6- Now you must go to the directory where you want to install Quick.db.

7- Then write "npm install quick.db"

Credit to Zelak & Mio for this guide.
```

**If you still Face any issue. Message me.**

## Contact
Discord - `White2001#0530`


Telegram - `@WhiteGrim_Nulled`


Discord Server - `https://discord.gg/dwSDNhE`
