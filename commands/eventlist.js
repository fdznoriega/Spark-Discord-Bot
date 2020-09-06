const fs = require('fs');
const format = require('../message-formatter.js');

// make admin/mod only because this command is used for setup!
module.exports = {
  name: 'events',
  description: 'Shows the event list',
  type: 'eventlist',
  execute(message, args) {
    try {
      message.channel.send(
        `${format.eventlistMessage(message.guild.id)}`
      );
    }
    catch(err) {
      console.error(err);
      message.reply('could not find your eventlist.');
      return;
    }

  }
}
