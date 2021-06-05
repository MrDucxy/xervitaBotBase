const fs = require('fs');
const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command", "Category", "Status");

module.exports = (client) => {
    const cmd_subFolders = fs.readdirSync('./commands/'); //Main commands directory.

    //Get each subdirectory inside of commands directory.
    for(let dir of cmd_subFolders) {
        const cmds = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js')); //Get each command inside of subdirectory.

        //Loop through commands and add them to the commands collection.
        for(let file of cmds) {
            let command = require(`../commands/${dir}/${file}`);

            if(command.name){
                client.commands.set(command.name, command);
                table.addRow(command.name, command.category, '✅ Loaded!');
            } else {
                table.addRow(file, 'N/A', '❌ Failed!');
                continue;
            }

            //Check if the command has any aliases.
            if(command.aliases && Array.isArray(command.aliases)){
                command.aliases.forEach(alias => client.aliases.set(alias, command.name));
            }
        }
    }

    console.log(table.toString());
}


/**
 * Command Template (* = required)
 * module.exports = {
 *  name: "Command name", *
 *  aliases: ["array", "of", "aliases"]
 *  category: "Category name", *
 *  description: "Command description"
 *  usage: "[args input]",
 *  run: (bot, message, args) => { *
 *      The code in here to execute
 *  }
 * }
 */