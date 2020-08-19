const { events } = require('../resources/eventlist.json');

module.exports = {
  name: 'pick-event',
  description: 'Picks an event from the event list',
  type: 'eventlist',
  execute(message, args) {
    message.channel.send(
      `${events[Math.floor(Math.random() * events.length)]}`
    );
  }
}
