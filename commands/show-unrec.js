const fs = require('fs');
const watchlist = require('../resources/watchlist2.json');

module.exports = {
  name: 'unrec',
  description: 'Removes show from the candidates list',
  execute(message, args) {
    // check for empty list
    if(watchlist.candidates.length < 1) {
      message.channel.send(
        `Looks like the list is empty. Why not add something?`
      );
      return;
    }
    // variables!
    const showToRemove = args.join(' ');
    let removed = false;

    // find the show and the index so i'll use a for loop
    for(let i = 0; i < watchlist.candidates.length; i++) {
      if(watchlist.candidates[i].toLowerCase() === showToRemove.toLowerCase()) {
        watchlist.candidates.splice(i, 1);
        removed = true;
        console.log(`Removed ${showToRemove}`);
        break;
      }
    }

    // check if not removed
    if(!removed) {
      message.channel.send(
        `Could not find \'${showToRemove}\'. Check spelling?`
      );
      return;
    }

    // update
    let data = JSON.stringify(watchlist, null, 2);
    fs.writeFileSync('./resources/watchlist2.json', data);
    // say done
    message.channel.send(
      `\'${showToRemove}\' was removed from the list`
    );

  }
}
