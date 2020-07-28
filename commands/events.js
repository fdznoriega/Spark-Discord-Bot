const fs = require('fs');
const { events } = require('../resources/eventlist.json');

module.exports = {
  name: 'events',
  description: 'Shows the event list',
  execute(message, args) {
    message.channel.send(
      `${events.join('\n')}`
    );
  }
}
