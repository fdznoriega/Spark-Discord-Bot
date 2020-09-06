
const fs = require('fs');

module.exports = {
  name: 'update',
  description: 'Updates show in the winner list',
  type: 'watchlist',
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

    let watchlist;
    let watchlistPath = `./resources/watchlists/${message.guild.id}.json`;
    console.log(`Checking for watchlist at: ${watchlistPath}`);
    // make sure it exists
    if(fs.existsSync(watchlistPath)) {
      console.log('Found');
      raw = fs.readFileSync(watchlistPath);
      watchlist = JSON.parse(raw);
    }
    else {
      console.log('Not found');
      message.reply('could not find your watchlist.');
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
    fs.writeFileSync(watchlistPath, data);
    // say done
    message.channel.send(
      `Updated \'${winners[index].name}\'`
    );


  }
}
