
module.exports = {
  name: 'dnd',
  description: 'Returns dnd url',
  type: 'url',
  execute(message, args) {
    message.channel.send(
      `https://app.roll20.net/campaigns/details/7738471/debussy`
    );
  }
}
