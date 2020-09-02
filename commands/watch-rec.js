
const fs = require('fs');

module.exports = {
  name: 'rec',
  description: 'Adds show to candidates list',
  type: 'watchlist',
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

    // prepare path using message id
    let watchlistPath = `../resources/watchlists/${message.guild.id}.json`;
    let watchlist;
    // try find the file
    try {
      watchlist = fs.readFileSync(watchlistPath);
    }
    catch(err) {
      console.error(err);
      message.reply('could not find your watchlist.');
      return;
    }

    // fetch length of array
    let length = watchlist.candidates.length;

    // append
    watchlist.candidates[length] = name;

    // update JSON
    let data = JSON.stringify(watchlist, null, 2);
    fs.writeFileSync(watchlistPath, data);

    // message
    message.channel.send(
      `Added \'${name}\' to the candidates list`
    );

  }
}
