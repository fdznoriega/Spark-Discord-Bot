const { events } = require('../events.json');

module.exports = {
  name: 'events',
  description: 'Shows the event list',
  execute(message, args) {
    message.channel.send(
      `${events.join('\n')}`
    );
  }
}
