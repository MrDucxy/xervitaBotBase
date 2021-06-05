const discord = require("discord.js");
const client = new discord.Client();
const botConfig = require("./config/bot.json"); //Fetch the bot's config file.

client.commands = new discord.Collection(); //Store all bot commands.
client.aliases = new discord.Collection(); //Store all bot command aliases.
client.events = new discord.Collection(); //Stores all bot events.

['command', 'event'].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.login(botConfig.token); //Bot login and go online.
