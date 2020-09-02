
const fs = require('fs');

module.exports = {
  watchlistMessage(serverId) {
    // prepare to grab watchlist
    let raw;
    // read watch list
    let pathToWatchlist = `./resources/watchlists/${serverId}.json`;
    if(fs.existsSync(pathToWatchlist)) {
      console.log(`Found watchlist at: ${pathToWatchlist}`);
      raw = fs.readFileSync(`./resources/watchlists/${serverId}.json`);
    }
    else {
      console.log('Did not find watchlist. Returning.');
      return "Could not find your watchlist. Have you made one with !setup w?";
    }
    
    console.log('Formatting watchlist into message');
    let watchlist = JSON.parse(raw);
    // format
    let data = [];
    data.push("=== Winners ===");
    for(let i = 0; i < watchlist.winners.length; i++) {
      data.push(`[${i + 1}] ${watchlist.winners[i].name} (${watchlist.winners[i].episode})`)
    }
    data.push("=== Candidates ===");
    // data.push(watchlist.candidates.join('\n'));
    data.push("=== Finished ===");
    // data.push(watchlist.finished.join('\n'));
    data.push("=== On Pause ===");
    for(let i = 0; i < watchlist.onPause.length; i++) {
      data.push(`${watchlist.onPause[i].name} (${watchlist.onPause[i].episode})`)
    }
    data.push("=== Banished ===");
    data.push(watchlist.banished.join('\n'));

    return data.join('\n');

  },
  eventlistMessage(serverId) {
    // prepare to grab eventlist
    let raw;
    let pathToEventlist = `./resources/eventlists/${serverId}.json`;
    if(fs.existsSync(pathToEventlist)) {
      console.log('Found eventlist.');
      raw = fs.readFileSync(pathToEventlist);
    }
    else {
      console.log('Did not find eventlist. Returning empty.');
      return "Could not find your eventlist. Have you made one with !setup e?";
    }
    
    console.log('Formatting eventlist into message');

    let eventlist = JSON.parse(raw);
    let events = eventlist.events;
    // generate up to date event list message
    return `=== Events ===\n${events.join('\n')}`;

  }

}
