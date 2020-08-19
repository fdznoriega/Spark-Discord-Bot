
module.exports = {
  name: 'beep',
  description: 'Beep.',
  type: 'meta',
  execute(message, args) {
    message.channel.send('boop');
  }
}
