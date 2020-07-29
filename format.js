
const fs = require('fs');

module.exports = {
  watchlistMessage() {
    // read watch list
    let raw = fs.readFileSync('./resources/watchlist.json');
    let watchlist = JSON.parse(raw);
    // format
    let data = [];
    data.push("=== Winners ===");
    for(let i = 0; i < watchlist.winners.length; i++) {
      data.push(`[${i + 1}] ${watchlist.winners[i].name} (${watchlist.winners[i].episode})`)
    }
    data.push("=== Candidates ===");
    data.push(watchlist.candidates.join('\n'));
    data.push("=== Finished ===");
    data.push(watchlist.finished.join('\n'));
    data.push("=== On Paws uwu ~~ ===");
    for(let i = 0; i < watchlist.onPause.length; i++) {
      data.push(`${watchlist.onPause[i].name} (${watchlist.onPause[i].episode})`)
    }
    data.push("=== Banished ===");
    data.push(watchlist.banished.join('\n'));

    return data.join('\n');

  },
  eventlistMessage() {
    // read event list
    let raw = fs.readFileSync('./resources/eventlist.json');
    let eventlist = JSON.parse(raw);
    let events = eventlist.events;
    // generate up to date event list message
    return events.join('\n');

  }

}
