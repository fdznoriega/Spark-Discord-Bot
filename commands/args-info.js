
module.exports = {
  name: 'args-info',
  description: 'Info on args',
  args: true,
  execute(message, args) {
    if(args[0] === 'foo') {
      return message.channel.send('bar');
    }
    else {
      message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    }
  }
}
