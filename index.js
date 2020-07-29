
const fs = require('fs')
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');

// create a new client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// fetch command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

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

	// after running event command, update the event list
	if(commandName === 'add-event' || commandName === 'remove-event') {
		// fetch json list
		let raw = fs.readFileSync('./resources/eventlist.json');
		let eventlist = JSON.parse(raw);
		let events = eventlist.events;
		// generate up to date event list message
		let newMessageContent = events.join('\n');
		// find 'event' channel using channel ID
		let eventChannel = client.channels.cache.get('726513238690496604');
		// check for not null
		if(eventChannel) {
			// fetch message using ID
			eventChannel.messages.fetch('737422202474987551')
			.then(
				// edit it here
				message => message.edit(newMessageContent)
			)
			.catch(
				console.error
			);
		}
		// edit message using message ID: 737402805605630024
		// replace contents with the array inside events.json

	}


});

// log in to discord
client.login(token);
