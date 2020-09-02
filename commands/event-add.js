const fs = require('fs');

module.exports = {
  name: 'add-event',
  description: 'Adds an event to the event list',
  type: 'eventlist',
  args: true,
  execute(message, args) {
    // prepare to search for the eventlist with the message id
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

    // format arguments
    let newEvent = args.join(' ');
    let events = eventlist.events;

    // check for duplicates
    if(events.map(event => event.toLowerCase()).includes(newEvent.toLowerCase())) {
      message.channel.send(
        `\'${newEvent}\' is already in the event list`
      );
      return;
    }

    // add event to events
    events.push(newEvent);

    // update JSON
    let data = JSON.stringify(eventlist, null, 2);
    fs.writeFileSync(eventlistPath, data);

    message.channel.send(
      `Added \'${newEvent}\' to the event list`
    );
  }
}
