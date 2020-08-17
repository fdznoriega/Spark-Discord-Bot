
const fs = require('fs');
const watchlist = require('../resources/watchlist.json');

module.exports = {
  name: 'hiatus',
  description: 'Moves show from winnner list to hiatus list',
  type: 'watchlist',
  args: true,
  execute(message, args) {
    if(args.length != 1) {
      message.channel.send(
        `Please input only 1 show ID`
      );
      return;
    }
    else if(isNaN(args[0])) {
      message.channel.send(
        `Please input a number (show ID)`
      );
      return;
    }
    // access winners list
    let winners = watchlist.winners;
    // reduce by one -> user inputs "1" to refer to arr[0]
    let index = args[0] - 1;
    // check in bounds
    if(index >= watchlist.winners.length || index < 0) {
      message.channel.send(
        `Insert an ID between 1 and ${winners.length}`
      );
      return;
    }
    // grab the name
    let name = winners[index].name;
    let episode = winners[index].episode;
    // splice it out
    winners.splice(index, 1);
    // add it to the onpause list
    watchlist.onPause[watchlist.onPause.length] =
    {
      name, episode
    }
    // write it to the watch list
    let data = JSON.stringify(watchlist, null, 2);
    fs.writeFileSync('./resources/watchlist.json', data);
    // say done
    message.channel.send(
      `\'${name}\' is now on hiatus`
    );


  }
}
