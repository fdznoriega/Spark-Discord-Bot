const fs = require('fs');
const watchlist = require('../resources/watchlist.json');
const format = require('../format.js');

module.exports = {
  name: 'shows',
  description: 'Shows the event list',
  execute(message, args) {
    // format the watchlist to post it
    console.log(format);
    message.channel.send(
      `${format.watchlistMessage()}`
    );
  }
}
