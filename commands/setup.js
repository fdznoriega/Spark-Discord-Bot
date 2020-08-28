
const fs = require('fs');
const serverInfo = require('../resources/server-info.json');
const format = require('../message-formatter');

module.exports = {
	name: 'setup',
	description: 'Used to setup the event-list and the watch-list',
	type: 'meta',
	args: 'true',
	execute(message, args) {
    // check
		if(args.length > 1 || (args[0] != 'w' && args[0] != 'e')) {
			message.channel.send(
				`Use '!setup w' to setup the watchlist and '!setup e' to setup the event list.\n` +
				`To restart, simply delete the bot's watchlist/eventlist message and call the command again.`
			);
			return;
		}

		// grab servers array
		let servers = serverInfo.servers;
		let messageServerId = message.guild.id;
		let watchlistPath = `./resources/watchlists/${messageServerId}.json`;
		let eventlistPath = `./resources/eventlists/${messageServerId}.json`;

		// watchlist setup
		if(args[0] === 'w') {
			// callback function that key values (including sent message ID!) to JSON
			grabMsgId(function(msgId) {
				// write values into the server JSON
				for(let i = 0; i < servers.length; i++) {
					if(servers[i].id === message.guild.id) {
						console.log('Found a match');
						// assign new values on match
						servers[i].watchChannelId = message.channel.id;
						servers[i].watchMessageId = msgId;
						// update JSON
						console.log('Adding information to server-info.json');
				    let data = JSON.stringify(serverInfo, null, 2);
				    fs.writeFileSync('./resources/server-info.json', data);
						return;
					}
				}

				console.log('No match found. Creating a fresh entry to server-info.json');

				// no match -> create a fresh new entry
				servers[servers.length] = {
					id: message.guild.id,
					name: message.guild.name,
					watchChannelId: message.channel.id,
					eventChannelID: 'null',
					watchMessageId: msgId,
					eventMessageID: 'null'
				};

				// write changes to serverInfo JSON
		    let data = JSON.stringify(serverInfo, null, 2);
		    fs.writeFileSync('./resources/server-info.json', data);

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
				for(let i = 0; i < servers.length; i++) {
					if(servers[i].id === message.guild.id) {
						// assign new values on match
						servers[i].eventChannelID = message.channel.id;
						servers[i].eventMessageID = msgId;
						// update JSON
				    let data = JSON.stringify(serverInfo, null, 2);
				    fs.writeFileSync('./resources/server-info.json', data);
						return;
					}
				}

				// no match -> create a fresh server
				servers[servers.length] = {
					id: message.guild.id,
					name: message.guild.name,
					watchChannelId: 'null',
					eventChannelID: message.channel.id,
					watchMessageId: 'null',
					eventMessageID: msgId
				};

				// write changes to serverInfo JSON
		    let data = JSON.stringify(serverInfo, null, 2);
		    fs.writeFileSync('./resources/server-info.json', data);

			});

			// async procedure that sends watchlist
			function grabMsgId(callback) {
				message.channel.send(format.eventlistMessage(messageServerId))
					// grab the ID of the sent message
					.then(message => callback(message.id))
					.catch(console.err)
			}

		}

		// check if we need to make a new watchlist & eventlist


	}
};
