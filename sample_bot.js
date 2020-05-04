
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');

// create a new client
const client = new Discord.Client();

// when client is ready, run this
client.once('ready', () => {
	console.log('Ready!');
});


// updates to client on message
client.on('message', message => {
	// check for prefix start and if bot is sender
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	// split message to get args
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	// now check for entries
	if(command === 'ping') {
		return message.channel.send('pong!');
	}
	else if(command === 'beep') {
		return message.channel.send('boop');
	}
	else if(command === 'server') {
		return message.channel.send(`This server's name is: ${message.guild.name}\nThis server is located in: ${message.guild.region}`);
	}
	else if(command === 'args-info') {
		if(!args.length) {
			return message.channel.send(`No arguments found, ${message.author}!`);
		}
		else if(args[0] == 'foo') {
			return message.channel.send('bar');
		}
		message.channel.send(`Command: ${command}\nArguments: ${args}`);
	}
	else if(command === 'kick') {
		if(!message.mentions.users.size) {
			return message.reply('you need to tag a user to kick.')
		}
		const taggedUser = message.mentions.users.first();
		message.channel.send(`You tried to kick ${taggedUser.username}`);
	}
});

// log in to discord
client.login(token);
