
module.exports = {
  name: 'tier',
  description: 'Returns tiermaker url',
  execute(message, args) {
    message.channel.send(
      `https://tiermaker.com/`
    );
  }
}
