
const fs = require('fs');
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const format = require('./format.js');

// create a new client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// fetch command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// set event commands that trigger update
const eventCommands = ["add-event","remove-event"]

// set watchlist commands that trigger update
const watchlistCommands = [
	"rec",
	"update",
	"finish",
	"hiatus",
	"banish",
	"delete",
	"win"
];

// fetch commands FROM files
for (const file of commandFiles) {
	// fetch command object
	const command = require(`./commands/${file}`);
	// set command object to a command slot in the client
	client.commands.set(command.name, command);
}

// when client is ready, run this
client.once('ready', () => {
	console.log('Ready!');
});


// updates to client on message
client.on('message', message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	// check command's arg req
	if(command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command');
	}

	// after running event command, update the event message
	if(eventCommands.includes(commandName)) {
		let eventChannel = client.channels.cache.get('726513238690496604');
		// check for not null
		if(eventChannel) {
			// fetch message using ID
			eventChannel.messages.fetch('737422202474987551')
			.then(
				// edit it here
				message => message.edit(format.eventlistMessage())
			)
			.catch(
				console.error
			);
		}
	}

	// after running the show command, update the show message
	if(watchlistCommands.includes(commandName)) {
		let watchlistChannel = client.channels.cache.get('738111678389944342');
		// check for not null
		if(watchlistChannel) {
			// fetch message using ID
			watchlistChannel.messages.fetch('738150622297325648')
			.then(
				// edit it here
				message => message.edit(format.watchlistMessage())
			)
			.catch(
				console.error
			);
		}

	}



	});

// log in to discord
client.login(token);
