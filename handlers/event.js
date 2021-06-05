const fs = require('fs');

module.exports = (client) => {
    const events = fs.readdirSync(`./events/`).filter(file => file.endsWith('.js')); //Gets each event from the main events folder.
    
    //Loops through the events and sets them.
    for (let file of events) {
        const event = require(`../events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client))
    }
}