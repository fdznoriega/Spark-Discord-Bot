
const fs = require('fs');
// const serverInfo = require('../resources/server-info.json');
const format = require('../message-formatter');

module.exports = {
	name: 'setup',
	description: 'Used to setup the event-list and the watch-list',
	type: 'meta',
	execute(message, args) {
		// no arguments implies first time setup
		if(args.length < 1) {
			// inform the user how to use Spark
			message.channel.send(
				`Welcome to Spark!\n` +
				`To set up your watchlist, create a watchlist channel and type the following in that channel:\n` +
				`\`\`\`!setup w\`\`\`\n` +
				`To set up your eventlist, create an eventlist channel and type the following in that channel:\n` +
				`\`\`\`!setup e\`\`\`\n` +
				`To restart, delete the bot's watchlist/eventlist message and call either command again.\n` + 
				`Type \`!help\` for further assistance.`
			);
			return;
		}
		if(args.length > 1) {
			message.channel.send(`Please input one argument or less.`);
			return;
		} 

		// open the server info json
		let raw = fs.readFileSync('./resources/server-info.json');
		let serverInfo = JSON.parse(raw);
		let servers = serverInfo.servers;

		// registration variables
		let isRegistered = false;
		let registrationIndex;

		// grab servers array and prepare other variables
		let messageServerId = message.guild.id;
		let watchlistPath = `./resources/watchlists/${messageServerId}.json`;
		let eventlistPath = `./resources/eventlists/${messageServerId}.json`;

		// check if server is registered
		for(let i = 0; i < serverInfo.servers.length; i++) {
			if(serverInfo.servers[i].id === message.guild.id) {
				console.log(`${serverInfo.servers[i].id} is already registered`);
				registrationIndex = i;
				isRegistered = true;
				break;
			}
		}
		
		// register if not so 
		if(!isRegistered) {
			// push
			serverInfo.servers.push({
				id: message.guild.id,
				name: message.guild.name,
				watchChannelId: 'null',
				eventChannelId: 'null',
				watchMessageId: 'null',
				eventMessageId: 'null'
			}); 
			// define registration index
			registrationIndex = serverInfo.servers.length - 1;
			console.log(`Registering ${message.guild.id}`);
		}

		// watchlist setup
		if(args[0] === 'w') {
			// callback function that key values (including sent message ID) to JSON
			grabMsgId(function(msgId) {
				// write values into the server JSON
				if(servers[registrationIndex].id === message.guild.id) {
					console.log('Found a match');
					// assign new values on match
					servers[registrationIndex].watchChannelId = message.channel.id;
					servers[registrationIndex].watchMessageId = msgId;
					// update JSON
					console.log('Adding information to server-info.json');
					let data = JSON.stringify(serverInfo, null, 2);
					fs.writeFileSync('./resources/server-info.json', data);
					return;
				}
				else {
					// did not find server
					console.log('No match found in the server-info json when setting up watchlist.');
					message.channel.send('Could not find your server. Did you run * !setup * ?');
				}
			});

			// async procedure that sends watchlist
			function grabMsgId(callback) {
				if(fs.existsSync(watchlistPath)) {
					message.channel.send(format.watchlistMessage(messageServerId))
						// grab the ID of the sent message
						.then(message => callback(message.id))
						.catch(console.err)
				}
				else {
					console.log('Creating new watchlist');

			    	let emptyWatchlist = {
						winners: [],
						candidates: [],
						finished: [],
						onPause: [],
						banished: []
					};
					// write a new json
					let data = JSON.stringify(emptyWatchlist, null, 2);
			    	fs.writeFileSync(watchlistPath, data);

					// send a placeholder watchlist message
					message.channel.send('use * !rec NAME * to add an item to this list!')
						// grab the ID of the sent message
						.then(message => callback(message.id))
						.catch(console.err)

				}

			}

		}

		// eventlist setup
		if(args[0] === 'e') {
			// callback function that key values (including sent message ID!) to JSON
			grabMsgId(function(msgId) {
				// write values into the server JSON
				if(servers[registrationIndex].id === message.guild.id) {
					// assign new values on match
					servers[registrationIndex].eventChannelId = message.channel.id;
					servers[registrationIndex].eventMessageId = msgId;
					// update JSON
					let data = JSON.stringify(serverInfo, null, 2);
					fs.writeFileSync('./resources/server-info.json', data);
					return;

				}
				// did not find server
				console.log('No match found in the server-info json when setting up eventlist.');
				message.channel.send('Could not find your server. Did you run * !setup * ?');

			});

			// async procedure that sends eventlist
			function grabMsgId(callback) {
				if(fs.existsSync(eventlistPath)) {
					message.channel.send(format.eventlistMessage(messageServerId))
						// grab the ID of the sent message
						.then(message => callback(message.id))
						.catch(console.err)
				}
				else {
					// create a new eventlist
					let emptyEventlist = {
						events: []
					}
					
					// write a new json
					let data = JSON.stringify(emptyEventlist, null, 2);
			    	fs.writeFileSync(eventlistPath, data);

					// send a placeholder watchlist message
					message.channel.send('use * !add-event NAME * to add an item to this list!')
						// grab the ID of the sent message
						.then(message => callback(message.id))
						.catch(console.err)
				}
			}

		}

	}
};
