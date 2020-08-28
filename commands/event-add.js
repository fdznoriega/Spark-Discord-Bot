const fs = require('fs');

module.exports = {
  name: 'add-event',
  description: 'Adds an event to the event list',
  type: 'eventlist',
  args: true,
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
    fs.writeFileSync(eventlistPath, data);

    message.channel.send(
      `Added \'${newEvent}\' to the event list`
    );
  }
}
