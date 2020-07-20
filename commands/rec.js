const jikanjs = require('jikanjs');

module.exports = {
  name: 'rec',
  description: 'Adds show to recommendations',
  args: 'true',
  execute(message, args) {
    // TODO:

    // assume argument is ONE show
    const name = args.toString().replace(',', ' ');
    let answer = '';
    let topResult;
    // search for the show on MAL
    jikanjs.search('anime', name)
      .then(response => {
        topResult = response.results[0];
      })
      .catch( (err) => {
        console.error(err);
      });
    // confirm show found
    console.log(topResult.title);




    // jikanjs.search('anime', name)
    //   .then( response => {
    //     topResult = response.results[0];
    //   })
    //   .catch( (err) => {
    //     console.error(err);
    //   });
    // message.reply(`is this it? Reply: Y/N \n${topResult.title}\n${topResult.url}`);




    // jikanjs.search('anime', name)
    //   .then( response => {
    //     // fetch top result
    //     topResult = response.results[0];
    //   })
    //   .then( () => {
    //     console.log(topResult.title);
    //   })
    //   .catch( (err) => {
    //     console.error(err);
    //   });
    // message.reply(`is this it? Reply: Y/N \n${topResult.title}\n${topResult.url}`);






    // confirm top result
  }
}
