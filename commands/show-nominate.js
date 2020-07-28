const fs = require('fs');
const watchlist = require('../resources/watchlist.json');

module.exports = {
  name: 'nominate',
  description: 'Adds show to candidates list',
  args: 'true',
  execute(message, args) {
    // format arg to be one word
    const name = args.join(' ');
    let topResult = '';

    // Scan the candidates list to see if the item is already in
    if(watchlist.candidates.map(candidates => candidates.name).includes(name)) {
      message.channel.send(
        `\'${name}\' is already a candidate`
      );
      return;
    }



  }
}
