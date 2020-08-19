const fs = require('fs');
const watchlist = require('../resources/watchlist.json');
const format = require('../message-formatter.js');

module.exports = {
  name: 'shows',
  description: 'Shows the event list',
  type: 'watchlist',
  execute(message, args) {
    // format the watchlist to post it
    message.channel.send(
      `${format.watchlistMessage()}`
    );
  }
}
