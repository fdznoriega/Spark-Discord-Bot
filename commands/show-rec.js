const fs = require('fs');
const watchlist = require('../resources/watchlist.json');

module.exports = {
  name: 'rec',
  description: 'Adds show to candidates list',
  execute(message, args) {
    const name = args.join(' ');
    let candidates = watchlist.candidates;
    // iterate through candidates list to see if the item is already in
    if(candidates.map(candidate => candidate.toLowerCase()).includes(name.toLowerCase())) {
      message.channel.send(
        `\'${name}\' is already in the candidates list`
      );
      return;
    }

    // fetch length of array
    let length = watchlist.candidates.length;

    // append
    watchlist.candidates[length] = name;

    // update JSON
    let data = JSON.stringify(watchlist, null, 2);
    fs.writeFileSync('./resources/watchlist.json', data);

    // message
    message.channel.send(
      `Added \'${name}\' to the candidates list`
    );

  }
}
