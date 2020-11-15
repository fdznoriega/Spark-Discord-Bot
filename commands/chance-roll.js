
module.exports = {
  name: 'roll',
  description: 'Rolls a die of N sides',
  type: 'probability',
  args: true,
  execute(message, args) {
    let result = -1;

    if(args.length > 1) {
      message.channel.send('Input only one number!');
      return;
    }
    // parse string to int
    result = parseInt(args[0]);

    if(!Number.isInteger(result) || result < 1) {
      message.channel.send('Positive integers only.');
      return;
    }

    message.channel.send(
      `You rolled: ${Math.floor( (Math.random() * result) + 1 )}`
    );
  }
}
