const fs = require('fs');
const { events } = require('../resources/eventlist.json');
const format = require('../format.js');

module.exports = {
  name: 'events',
  description: 'Shows the event list',
  execute(message, args) {
    message.channel.send(
      `${format.eventlistMessage()}`
    );
  }
}
