
module.exports = {
  name: 'flip',
  description: 'Flips a coin',
  execute(message, args) {
    let randNum = Math.random();
    let content;

    if(randNum < 0.5) {
      content = 'heads';
    }
    else {
      content = 'tails';
    }

    message.channel.send(
      `${content}`
    );
  }
}
