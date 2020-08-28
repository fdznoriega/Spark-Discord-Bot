
const fs = require('fs');

module.exports = {
  watchlistMessage(watchMsgId) {
    // read watch list
    try {
      let raw = fs.readFileSync(`./resources/watchlists/${watchMsgId}.json`);
    }
    catch(error) {
      console.error(error);
      return;
    }

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
    data.push("=== On Pause ===");
    for(let i = 0; i < watchlist.onPause.length; i++) {
      data.push(`${watchlist.onPause[i].name} (${watchlist.onPause[i].episode})`)
    }
    data.push("=== Banished ===");
    data.push(watchlist.banished.join('\n'));

    return data.join('\n');

  },
  eventlistMessage(eventMsgId) {
    // read event list
    try {
      let raw = fs.readFileSync(`./resources/eventlists/${eventMsgId}.json`);
    }
    catch(error) {
      console.error(error);
      return;
    }

    let eventlist = JSON.parse(raw);
    let events = eventlist.events;
    // generate up to date event list message
    return events.join('\n');

  }

}
