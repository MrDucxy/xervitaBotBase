module.exports = {
    name: "ping",
    aliases: ["pong", "latency"],
    category: "Misc",
    description: "Gets the bot's latency.",
    usage: "ping",
    run: (client, message, args) => {
        message.reply("Pong!");
    }
}