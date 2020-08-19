const fs = require('fs');
const watchlist = require('../resources/watchlist.json');

module.exports = {
  name: 'remove',
  description: 'Deletes a show from anywhere on the list',
  type: 'watchlist',
  args: true,
  execute(message, args) {
    const name = args.join(' ');
    let removed = false;
    let counter = 0;

    // check winners list
    if(watchlist.winners.length >= 1) {
      // scan winners list
      watchlist.winners.map(winner => {
        if(winner.name.toLowerCase() === name.toLowerCase()) {
          watchlist.winners.splice(counter, 1);
          removed = true;
        }
        counter++;
      });
    }


    // reset counter
    counter = 0;
    // check for empty
    if(watchlist.candidates.length >= 1) {
      watchlist.candidates.map(candidate => {
        if(candidate.toLowerCase() === name.toLowerCase()) {
          watchlist.candidates.splice(counter, 1);
          removed = true;
        }
        counter++;
      });
    }

    // reset counter
    counter = 0;
    // check empty
    if(watchlist.finished.length >= 1) {
      watchlist.finished.map(finishedShow => {
        if(finishedShow.toLowerCase() === name.toLowerCase()) {
          watchlist.finished.splice(counter, 1);
          removed = true;
        }
        counter++;
      });
    }

    // check on pause
    counter = 0;
    // check empty
    if(watchlist.onPause.length >= 1) {
      watchlist.onPause.map(showOnPause => {
        if(showOnPause.name.toLowerCase() === name.toLowerCase()) {
          watchlist.onPause.splice(counter, 1);
          removed = true;
        }
        counter++;
      });
    }

    counter = 0;
    // check empty
    if(watchlist.banished.length >= 1) {
      // check banished
      watchlist.banished.map(banishedShow => {
        if(banishedShow.toLowerCase() === name.toLowerCase()) {
          watchlist.banished.splice(counter, 1);
          removed = true;
        }
        counter++;
      });
    }

    if(removed) {
      // update JSON
      let data = JSON.stringify(watchlist, null, 2);
      fs.writeFileSync('./resources/watchlist.json', data);
      // say done
      message.channel.send(
        `\'${name}\' was removed from the list`
      );
    }
    else {
      message.channel.send(
        `\'${name}\' was not found...spelling?`
      );
    }

  }
}
