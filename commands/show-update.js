
const fs = require('fs');
const watchlist = require('../resources/watchlist.json');

module.exports = {
  name: 'update',
  description: 'Updates show in the winner list',
  args: true,
  execute(message, args) {
    // args must be ID and EPISODE
    if(args.length != 2) {
      message.channel.send(
        `Please input two arguments: a show ID and the next episode to watch`
      );
      return;
    }
    // check for nan inputs
    else if(isNaN(args[0]) || isNaN(args[1])) {
      message.channel.send(
        `Please input two arguments: a show ID and the next episode to watch`
      );
      return;
    }
    // access winner list
    let winners = watchlist.winners;
    // set the ID and the next episode
    let index = args[0] - 1;
    let nextEpisode = args[1];
    // check index within bounds
    if(index >= winners.length || index < 0) {
      message.channel.send(
        `Insert an ID between 1 and ${winners.length}`
      );
      return;
    }
    // update the winner
    winners[index].episode = nextEpisode
    // write it to the watch list
    let data = JSON.stringify(watchlist, null, 2);
    fs.writeFileSync('./resources/watchlist.json', data);
    // say done
    message.channel.send(
      `Updated \'${winners[index].name}\'`
    );


  }
}
