const fs = require('fs');
const { events } = require('../resources/eventlist.json');
const format = require('../format.js');

// make admin/mod only because this command is used for setup!
module.exports = {
  name: 'events',
  description: 'Shows the event list',
  type: 'eventlist',
  execute(message, args) {
    message.channel.send(
      `${format.eventlistMessage()}`
    );
  }
}
