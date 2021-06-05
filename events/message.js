const botConfig = require('../config/bot.json')

module.exports = (client, message) => {
    let prefix = botConfig.defaultPrefix;

    if(message.author.bot || !message.guild || message.channel.type == "dm" || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
    if (cmd.length === 0) return;
  
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
  
    if (command) {
      command.run(client, message, args);
    }
}