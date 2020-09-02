const fs = require('fs');

module.exports = {
  name: 'pick-event',
  description: 'Picks an event from the event list',
  type: 'eventlist',
  execute(message, args) {
    let eventlist;
    let eventlistPath = `./resources/eventlists/${message.guild.id}.json`;
    console.log(`Checking for eventlist at: ${eventlistPath}`);
    // make sure it exists
    if(fs.existsSync(eventlistPath)) {
      console.log('Found');
      raw = fs.readFileSync(eventlistPath);
      eventlist = JSON.parse(raw);
    }
    else {
      console.log('Not found');
      message.reply('could not find your eventlist.');
      return;
    }
    let events = eventlist.events;

    message.channel.send(
      `${events[Math.floor(Math.random() * events.length)]}`
    );
  }
}
