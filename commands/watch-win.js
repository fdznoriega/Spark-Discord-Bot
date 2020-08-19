const fs = require('fs');
const watchlist = require('../resources/watchlist.json');

module.exports = {
  name: 'win',
  description: 'Adds show from the winners list',
  type: 'watchlist',
  execute(message, args) {
    // check for empty list
    if(watchlist.candidates.length < 1) {
      message.channel.send(
        `Looks like the list is empty. Why not add something?`
      );
      return;
    }
    // variables!
    const showToAdd = args.join(' ')
    let removed = false;

    let index = 0;
    watchlist.candidates.map(candidate => {
      if(candidate.toLowerCase() === showToAdd.toLowerCase()) {
        watchlist.candidates.splice(index, 1);
        removed = true;
      }
      index++;
    });

    // check if was not removed -> not found
    if(!removed) {
      message.channel.send(
        `Could not find \'${showToAdd}\'. Check spelling?`
      );
      return;
    }

    // write new object into winners section
    let name = showToAdd;
    let episode = "1";

    // add it to the winners list
    watchlist.winners[watchlist.winners.length] =
    {
      name, episode
    }

    // update
    let data = JSON.stringify(watchlist, null, 2);
    fs.writeFileSync('./resources/watchlist.json', data);
    // say done
    message.channel.send(
      `\'${showToAdd}\' is now a winner!`
    );

  }
}
