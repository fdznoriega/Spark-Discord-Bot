
module.exports = {
  name: 'codenames',
  description: 'Returns codenames url',
  type: 'url',
  execute(message, args) {
    message.channel.send(
      `https://horsepaste.com/debussy`
    );
  }
}
