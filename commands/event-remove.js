const fs = require('fs');
const eventlist = require('../resources/eventlist.json');

module.exports = {
  name: 'remove-event',
  description: 'Removes an event from the event list',
  args: true,
  execute(message, args) {
    // grab the array
    let events = eventlist.events;
    // format args
    let eventToDelete = args.join(' ');
    // iterate through events
    if(events.includes(eventToDelete)) {
      // delete it!
      let index = events.indexOf(eventToDelete);
      events.splice(index, 1);
      // update
      let data = JSON.stringify(eventlist, null, 2);
      fs.writeFileSync('events.json', data);
      // say done
      message.channel.send(
        `Removed \'${eventToDelete}\' from the event list`
      );
    }
    else {
      // say not found
      message.channel.send(
        `\'${eventToDelete}\' is not in the event list`
      );
    }



  }
}
