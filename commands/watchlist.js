
const format = require('../message-formatter.js');

module.exports = {
  name: 'shows',
  description: 'Shows the event list',
  type: 'watchlist',
  execute(message, args) {
    try {
      message.channel.send(
        `${format.watchlistMessage(message.guild.id)}`
      );
    }
    catch(err) {
      console.error(err);
      message.reply('could not find your watchlist.');
      return;
    }
  }
}
