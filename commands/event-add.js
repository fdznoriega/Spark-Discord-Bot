const fs = require('fs');
const eventlist = require('../resources/eventlist.json');

module.exports = {
  name: 'add-event',
  description: 'Adds an event to the event list',
  type: 'eventlist',
  args: true,
  execute(message, args) {
    // format arguments
    let newEvent = args.join(' ');
    let events = eventlist.events;
    // check if aleady in the event list
    if(events.map(event => event.toLowerCase()).includes(newEvent.toLowerCase())) {
      message.channel.send(
        `\'${newEvent}\' is already in the event list`
      );
      return;
    }

    // fetch length of array
    let length = eventlist.events.length;

    // append
    eventlist.events[length] = newEvent;

    // update JSON
    let data = JSON.stringify(eventlist, null, 2);
    fs.writeFileSync('./resources/eventlist.json', data);

    message.channel.send(
      `Added \'${newEvent}\' to the event list`
    );
  }
}
