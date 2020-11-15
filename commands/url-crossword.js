
module.exports = {
    name: 'crossword',
    description: 'Returns nyt crossword url',
    type: 'url',
    aliases: ['cw', 'nyt'],
    execute(message, args) {
      message.channel.send(
        `https://www.nytimes.com/crosswords`
      );
    }
  }