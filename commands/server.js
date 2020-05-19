
module.exports = {
  name: 'server',
  description: 'Server info',
  execute(message, args) {
    message.channel.send(
      `This server's name is: ${message.guild.name}\nThis server is located in: ${message.guild.region}`
    );
  }
}
