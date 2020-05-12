
module.exports = {
  name: 'server',
  description: 'Server info',
  execute(message, args) {
    message.chanel.send(
      `This server's name is: ${message.guild.name}\n
      This server is located in: ${message.guild.region}`
    );
  }
}
