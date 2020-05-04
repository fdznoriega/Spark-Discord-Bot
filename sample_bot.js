
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');

// create a new client
const client = new Discord.Client();

// when client is ready, run this
client.once('ready', () => {
	console.log('Ready!');
});

// event that can trigger multiple times.
client.on('message', message => {
  if(message.content.startsWith(`${prefix}ping`)) {
    message.channel.send('pong!');
  }
	else if(message.content === `${prefix}beep`) {
		message.channel.send('boop');
	}
	else if(message.content === `${prefix}server`) {
		message.channel.send(`This server's name is: ${message.guild.name}\nThis server is located in: ${message.guild.region}`);
	}

});

// log in to discord
client.login(token);
