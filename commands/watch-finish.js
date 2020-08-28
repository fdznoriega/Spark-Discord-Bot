
const fs = require('fs');

module.exports = {
  name: 'finish',
  description: 'Moves show from winnner list to finished list',
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
    // prepare path using message id
    let watchlistPath = `../resources/watchlists/${message.guild.id}.json`;
    // try find the file
    try {
      let watchlist = fs.readFileSync(watchlistPath);
    }
    catch(err) {
      console.error(err);
      message.reply('could not find your watchlist.');
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
    let finishedName = winners[index].name;
    // splice it out
    winners.splice(index, 1);
    // add it to the finished list
    watchlist.finished[watchlist.finished.length] = finishedName;
    // write it to the watch list
    let data = JSON.stringify(watchlist, null, 2);
    fs.writeFileSync(watchlistPath, data);
    // say done
    message.channel.send(
      `We finished \'${finishedName}\'!`
    );


  }
}
