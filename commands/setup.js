
const fs = require('fs');
const serverInfo = require('../resources/server-info.json');
const format = require('../message-formatter');

module.exports = {
	name: 'setup',
	description: 'Runs event setup on argument e or watchlist setup on argument w',
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

		// watchlist setup
		if(args[0] === 'w') {
			// callback function that key values (including sent message ID!) to JSON
			grabMsgId(function(msgId) {
				// write values into the server JSON
				for(let i = 0; i < servers.length; i++) {
					if(servers[i].id === message.guild.id) {
						// assign new values on match
						servers[i].watchChannelId = message.channel.id;
						servers[i].watchMessageId = msgId;
						// update JSON
				    let data = JSON.stringify(serverInfo, null, 2);
				    fs.writeFileSync('./resources/server-info.json', data);
						return;
					}
				}

				// no match -> create a fresh new entry
				servers[servers.length] = {
					id: message.guild.id,
					name: message.guild.name,
					watchChannelId: message.channel.id,
					eventChannelID: 'TBD',
					watchMessageId: msgId,
					eventMessageID: 'TBD'
				};

				// write changes to serverInfo JSON
		    let data = JSON.stringify(serverInfo, null, 2);
		    fs.writeFileSync('./resources/server-info.json', data);

			});

			// async procedure that sends watchlist
			function grabMsgId(callback) {
				message.channel.send(format.watchlistMessage())
					// grab the ID of the sent message
					.then(message => callback(message.id))
					.catch(console.err)
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
					watchChannelId: 'TBD',
					eventChannelID: message.channel.id,
					watchMessageId: 'TBD',
					eventMessageID: msgId
				};

				// write changes to serverInfo JSON
		    let data = JSON.stringify(serverInfo, null, 2);
		    fs.writeFileSync('./resources/server-info.json', data);

			});

			// async procedure that sends watchlist
			function grabMsgId(callback) {
				message.channel.send(format.eventlistMessage())
					// grab the ID of the sent message
					.then(message => callback(message.id))
					.catch(console.err)
			}

		}

		// check if we need to make a new watchlist & eventlist


	}
};
