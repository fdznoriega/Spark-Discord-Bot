
module.exports = {
  name: 'tier',
  description: 'Returns tiermaker url',
  type: 'url',
  execute(message, args) {
    message.channel.send(
      `https://tiermaker.com/`
    );
  }
}
