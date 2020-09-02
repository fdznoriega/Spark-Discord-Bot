
const fs = require('fs');

module.exports = {
  name: 'rec',
  description: 'Adds show to candidates list',
  type: 'watchlist',
  execute(message, args) {
    // read the watchlist
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
    // simplify variables
    const name = args.join(' ');
    let candidates = watchlist.candidates;
    // iterate through candidates list to see if the item is already in
    if(candidates.map(candidate => candidate.toLowerCase()).includes(name.toLowerCase())) {
      message.channel.send(
        `\'${name}\' is already in the candidates list`
      );
      return;
    }

    // append
    watchlist.candidates.push(name);

    // update JSON
    let data = JSON.stringify(watchlist, null, 2);
    fs.writeFileSync(watchlistPath, data);

    // message
    message.channel.send(
      `Added \'${name}\' to the candidates list`
    );

  }
}
