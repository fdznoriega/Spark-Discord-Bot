
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
		watchCommands.push(command.name);
	}

	if(command.type === 'eventlist') {
		eventCommands.push(command.name);
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
	
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;


	// check command's arg req
	if(command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	try {
		console.log(message.content);
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command');
		return;
	}

	// after running event command, update the event message
	if(eventCommands.includes(commandName)) {
		// scan server-info.json to find server ID
		console.log('Reading the server-info file');
		let raw = fs.readFileSync(`./resources/server-info.json`);
		let serverInfo = JSON.parse(raw);

		console.log(serverInfo);

		for(let i = 0; i < serverInfo.servers.length; i++) {
			// find server ID in server info
			if(serverInfo.servers[i].id === message.guild.id) {
				console.log(`${message.guild.id} was found in server-info`);
				// grab event channel id & event message id
				let eventChannelId = serverInfo.servers[i].eventChannelId;
				console.log(`The event channel id is: ${eventChannelId}`);
				let eventMessageId = serverInfo.servers[i].eventMessageId;
				console.log(`The event message id is: ${eventChannelId}`);

				// grab event channel itself
				let eventChannel = client.channels.cache.get(eventChannelId);
				console.log(`Grabbed event channel: ${eventChannel}`);
				
				// check null
				if(eventChannel) {
					// fetch message using ID
					console.log('Editing message');
					eventChannel.messages.fetch(eventMessageId)
						.then(message => message.edit(format.eventlistMessage(message.guild.id)))
						.catch(console.error);
				}
				
				return;

			}
		}

	}

	// after running the show command, update the show message
	// TO DO: UPDATE USING METHOD IN EVENT MESSAGE
	if(watchCommands.includes(commandName)) {
		// scan server-info.json to find server ID
		console.log('Reading the server-info file');
		let raw = fs.readFileSync(`./resources/server-info.json`);
		let serverInfo = JSON.parse(raw);

		console.log(serverInfo);

		for(let i = 0; i < serverInfo.servers.length; i++) {
			// find server ID in server info
			if(serverInfo.servers[i].id === message.guild.id) {
				console.log(`${message.guild.id} was found in server-info`);
				// grab watch channel id & watch message id
				let watchChannelId = serverInfo.servers[i].watchChannelId;
				console.log(`The watch channel id is: ${watchChannelId}`);
				let watchMessageId = serverInfo.servers[i].watchMessageId;
				console.log(`The watch message id is: ${watchMessageId}`);

				// grab watch channel itself
				let watchChannel = client.channels.cache.get(watchChannelId);
				console.log(`Grabbed watch channel: ${watchChannel}`);
				
				// check null
				if(watchChannel) {
					// fetch message using ID
					console.log('Editing message');
					watchChannel.messages.fetch(watchMessageId)
						.then(message => message.edit(format.watchlistMessage(message.guild.id)))
						.catch(console.error);
				}
				
				return;

			}
		}

	}

	});

// log in to discord
client.login(config.token);
