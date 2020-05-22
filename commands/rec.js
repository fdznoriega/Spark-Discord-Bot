const jikanjs = require('jikanjs');

module.exports = {
  name: 'rec',
  description: 'Adds show to recommendations',
  args: 'true',
  execute(message, args) {
    // assume argument is ONE show
    const name = args.toString().replace(',', ' ');
    // try search for the show on MAL
    jikanjs.search('anime', name)
    .then( (response) => {
      // fetch top result
      topResult = response.results[0];
      message.reply(`is this it?\n${topResult.title}\n${topResult.url}`);
      // get confirmation from user
    })
    .catch( (err) => {
      console.error(err);
    });
    //




    // add item to message
    // notify
    // message.reply('your recommendation has been added.');

  }
}
