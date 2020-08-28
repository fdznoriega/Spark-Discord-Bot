const fs = require('fs');

module.exports = {
  name: 'remove-event',
  description: 'Removes an event from the event list',
  type: 'eventlist',
  args: true,
  execute(message, args) {
    // prepare to search for the eventlist with the message id
    let eventlistPath = `../resources/eventlists/${message.guild.id}.json`;
    // make sure it exists
    try {
      let eventlist = fs.readFileSync(eventlistPath);
    }
    catch(err) {
      console.error(err);
      message.reply('could not find your eventlist.');
      return;
    }
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
      fs.writeFileSync(eventlistPath, data);
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
