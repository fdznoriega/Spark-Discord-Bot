
const fs = require('fs');
const config = require('./config.json');
const Discord = require('discord.js');
const format = require('./message-formatter.js');

// create a new client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// fetch files that trigger event/watch update
const eventCommands = [];
const watchCommands = [];

// fetch commands FROM files
for (const file of commandFiles) {
	// fetch command object
	const command = require(`./commands/${file}`);
	// check type for refresh toggles
	if(command.type === 'watchlist') {
		watchCommands[watchCommands.length] = command.name;
	}

	if(command.type === 'eventlist') {
		eventCommands[eventCommands.length] = command.name;
	}
	// set command object to a command slot in the client
	client.commands.set(command.name, command);
}

// when client is ready, run this
client.once('ready', () => {
	console.log('Ready!');
});


// updates to client on message
client.on('message', message => {
	if(!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).split(/ +/);
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
		return;
	}

	// after running event command, update the event message
	if(eventCommands.includes(commandName)) {
		// TODO: CHECK WHAT SERVER THIS WAS SENT IN AND UPDATE ALL VALUES
		let eventChannel = client.channels.cache.get(config.eventChannelId);
		// check for not null
		if(eventChannel) {
			// fetch message using ID
			eventChannel.messages.fetch(config.eventMessageId)
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
	if(watchCommands.includes(commandName)) {
		let watchlistChannel = client.channels.cache.get(config.watchChannelId);
		// check for not null
		if(watchlistChannel) {
			// fetch message using ID
			watchlistChannel.messages.fetch(config.watchMessageId)
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
client.login(config.token);
