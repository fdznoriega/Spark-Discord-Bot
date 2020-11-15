
module.exports = {
  name: 'flip',
  description: 'Flips a coin',
  type: 'probability',
  execute(message, args) {
    let result = '';
    let randomNum = Math.random();

    if(randomNum < 0.5) {
      result = 'Heads';
    }
    else {
      result = 'Tails';
    }
    message.channel.send(result);
  }
}
