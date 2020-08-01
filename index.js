
const fs = require('fs');
const config = require('./config.json');

const Discord = require('discord.js');
const format = require('./format.js');

// create a new client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// fetch command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// fetch files that trigger event/watch update
const eventCommands = ['add-event', 'remove-event'];
const watchCommands = [
	'banish',
	'finish',
	'hiatus',
	'rec',
	'win',
	'update',
	'remove'
];


// fetch commands FROM files
for (const file of commandFiles) {
	// fetch command object
	const command = require(`./commands/${file}`);
	// set command object to a command slot in the client
	client.commands.set(command.name, command);
}


// ===== CODE THAT WOULD USE FOLDERS ======

// // fetch folder names (remove DS store and other js files that have not been organized
// const folders = fs.readdirSync('./commands').filter(
// 	file => file.charAt(0) != '.' && !file.endsWith('.js')
// );
//
// // array of watchlist/eventlist commands that will force refresh
// let eventlistFiles = [];
// let watchlistFiles = [];
//
// // iterate through folders
// for(let i = 0; i < folders.length; i++) {
// 	// reset command files array
// 	let commandFiles = [];
// 	// check if event list or watch list
// 	if(folders[i] === 'eventlist') {
// 		// fill event list, then add to command files
// 		eventlistFiles = fs.readdirSync(`./commands/${folders[i]}`).filter(file => file.endsWith('.js'));
// 		commandFiles = commandFiles.concat(eventlistFiles);
// 	}
// 	else if(folders[i] === 'watchlist') {
// 		// fill watchlist, then add to command files
// 		watchlistFiles = fs.readdirSync(`./commands/${folders[i]}`).filter(file => file.endsWith('.js'));
// 		commandFiles = commandFiles.concat(watchlistFiles);
// 	}
// 	else {
// 		// grab normally
// 		commandFiles = fs.readdirSync(`./commands/${folders[i]}`).filter(file => file.endsWith('.js'));
// 	}
//
// 	// set commands now since we have folder location and commands list
// 	for(let j = 0; j < commandFiles.length; j++) {
// 		const command = require(`./commands/${folders[i]}/${commandFiles[j]}`);
// 		client.commands.set(command.name, command);
// 	}
//
// }

// ===== CODE THAT WOULD USE FOLDERS ABOVE ======



// when client is ready, run this
client.once('ready', () => {
	console.log('Ready!');
	// client.user.setAvatar('resources/spark.png');
	client.user.setActivity();

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
	}

	// after running event command, update the event message
	if(eventCommands.includes(commandName)) {
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
