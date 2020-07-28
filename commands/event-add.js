const fs = require('fs');
const eventlist = require('../events.json');

module.exports = {
  name: 'add-event',
  description: 'Adds an event to the event list',
  args: true,
  execute(message, args) {
    // format arguments
    let newEvent = args.join(' ');

    // check if already in
    if(eventlist.events.includes(newEvent)) {
      message.channel.send(
        `\'${newEvent}\' is already an event`
      );
      return;
    }

    // fetch length of array
    let length = eventlist.events.length;

    // append
    eventlist.events[length] = newEvent;

    // update JSON
    let data = JSON.stringify(eventlist, null, 2);
    fs.writeFileSync('events.json', data);

    message.channel.send(
      `Added \'${newEvent}\' to the event list`
    );
  }
}
