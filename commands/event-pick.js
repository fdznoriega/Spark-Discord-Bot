const { events } = require('../events.json');

module.exports = {
  name: 'pick-event',
  description: 'Picks an event from the event list',
  execute(message, args) {
    message.channel.send(
      `${events[Math.floor(Math.random() * events.length)]}`
    );
  }
}
