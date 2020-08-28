const fs = require('fs');

module.exports = {
  name: 'pick-event',
  description: 'Picks an event from the event list',
  type: 'eventlist',
  execute(message, args) {
    // prepare to search for the eventlist with the message id
    let eventlistPath = `../resources/eventlists/${message.guild.id}.json`;
    // make sure it exists
    try {
      let eventlist = fs.readFileSync(eventlistPath)
    }
    catch(err) {
      console.error(err);
      message.reply('could not find your eventlist.');
      return;
    }
    let events = eventlist.events;

    message.channel.send(
      `${events[Math.floor(Math.random() * events.length)]}`
    );
  }
}
