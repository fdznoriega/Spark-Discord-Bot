
module.exports = {
  name: 'roll',
  description: 'Rolls an \'input\' sided die',
  args: true,
  execute(message, args) {
    if(args.length > 1) {
      message.channel.send(
        `Too many text :(`
      );
      return;
    }
    let sides = parseInt(args)


    if(!sides || sides < 1) {
      message.channel.send(
        `Please input one positive integer`
      );
      return;
    }

    message.channel.send(
      `You rolled: ${Math.floor(Math.random() * sides) + 1}`
    );




  }
}
