const fs = require('fs');
const eventlist = require('../resources/eventlist.json');

module.exports = {
  name: 'remove-event',
  description: 'Removes an event from the event list',
  type: 'eventlist',
  args: true,
  execute(message, args) {
    // grab the array
    let events = eventlist.events;
    let removed = false;
    // format args
    let eventToDelete = args.join(' ');
    // iterate through events
    let counter = 0;
    events.map(event => {
      if(event.toLowerCase() === eventToDelete.toLowerCase()) {
        events.splice(counter, 1);
        removed = true;
        return;
      }
      counter++;
    });

    if(removed) {
      // update
      let data = JSON.stringify(eventlist, null, 2);
      fs.writeFileSync('./resources/eventlist.json', data);
      // say done
      message.channel.send(
        `Removed \'${eventToDelete}\' from the event list`
      );
    }
    else {
      message.channel.send(
        `\'${eventToDelete}\' is not in the event list`
      );
    }



  }
}
