var request = require('request');

var stats = { 
	'global': {
		'count': {
			'privmsg': 0,
                        'joins': 0
		}
	},
	'channel': {
		'count': {
			'privmsg': 0,
                        'joins': 0
		}
	}
};
var deps = { 'privmsg': [], 'quit': [], 'part': [], 'join': [], 'mode': [], 'kick': [], 'invite': [], 'server': [] };

function handler(irc) {

	irc.addCallBack(
		'privmsg',
		function(data) {
			// Add to stats.
			addPrivmsgLog(irc, data);

			updateStats('privmsg');

			if(/^!stats/.test(data.message)) {
				// Command for the plugin.
				cmdHandler(irc, data);
			}
		}
	);

	irc.addCallBack(
		'quit',
		function(data) {
			addQuitLog(irc, data);

			updateStats('quit');
		}
	);

	irc.addCallBack(
		'part',
		function(data) {
			addPartLog(irc, data);

			updateStats('part');
		}
	);

	irc.addCallBack(
		'join',
		function(data) {
			addJoinLog(irc, data);

			updateStats('join');
		}
	);

	irc.addCallBack(
		'mode',
		function(data) {
			addModeLog(irc, data);

			updateStats('mode');
		}
	);

	irc.addCallBack(
		'kick',
		function(data) {
			addKickLog(irc, data);

			updateStats('kick');
		}
	);

	irc.addCallBack(
		'invite',
		function(data) {
			addInviteLog(irc, data);

			updateStats('invite');
		}
	);

	irc.addCallBack(
		'server',
		function(data) {
			addServerLog(irc, data);

			updateStats('server');
		}
	);
}

// Command Helper Functions.

function cmdHandler(irc, data) {
	// Data: time, type, nickname, host, channel, message.
	
	var groups;

	if(/^!stats\s*$/.test(data.message)) {
		cmdDefault(irc, data);
	}
	else if(groups = /^!stats show (.+)/.exec(data.message)) {
		cmdShow(irc, data, groups[1]);
	}
	else if(groups = /^!stats admin (.+)/.exec(data.message)) {
		if(statsAuth(data.nickname)) {
			cmdAdmin(irc, data, groups[1]);
		}
	}
	else if(groups = /^!stats case (.+)/.exec(data.message)) {
		cmdCase(irc, data, groups[1]);
	}
	else if(groups = /^!stats help(?: (.+))?/.exec(data.message)) {
		cmdHelp(irc, data, groups[1]);
	}
}

function cmdDefault(irc, data) {

}

function cmdAdmin(irc, data, params) {

}

function cmdCase(irc, data, params) {

}

function cmdHelp(irc, data, params) {
	irc.sendPrivMsg(data.channel, "This is some help text"
					+ ( params !== undefined
						? " for '" + params + "'."
						: "."
					)
	);
}

function cmdShow(irc, data, params) {

	irc.sendPrivMsg(data.channel, "total number of privmsgs: " + stats['global']['count']['privmsg']);

}

// Log Helper Functions.

function addPrivmsgLog(irc, data) {
	// Data: time, type, nickname, host, channel, message.

/*	if(!data.channel in stats['channel']) {
		stats['channel'][data.channel] = {};
		stats['channel'][data.channel]['user'] = {};
	}

	if(!data.nickname in stats['channel'][data.channel]['user']) {
		stats['channel'][data.channel]['user'][data.nickname] = {};
		stats['channel'][data.channel]['user'][data.nickname]['privmsg'] = [];
	}*/
        var arr = [ data ];
        var arr2 = { 'privmsg': arr };
        var arr3 = { 'user': { } };
            arr3.user[data.nickname] = arr2;
            stats[data.channel] = arr3;
}

function addQuitLog(irc, data) {
	// Data: time, type, nickname, host, message.

}

function addPartLog(irc, data) {
	// Data: time, type, nickname, host, channel, message.

}

function addJoinLog(irc, data) {
	// Data: time, type, nickname, host, channel.

}

function addModeLog(irc, data) {
	// Data: time, type, nickname, host, channel, parameter, option.

}

function addKickLog(irc, data) {
	// Data: time, type, nickname, host, channel, user, message.

}

function addInviteLog(irc, data) {
	// Data: time, type, nickname, host, user, channel.

}

function addServerLog(irc, data) {
	// Data: time, type, host, status, user, message.

}

// Statistics Helper Functions.

function updateStats(type) {

	for(var dependant in deps[type]) {
		deps[type][dependant](type);
		//dependant(type);
	}

}

// Dependants.

var counter = function(type) {

	console.log(stats);

	switch(type) {
		case 'privmsg':
			stats['global']['count']['privmsg']++;
			stats['channel']['count']['privmsg']++;
	}
}

deps.privmsg.push(counter);


// Exporter.

module.exports = function(module_holder) {
	module_holder['stats'] = handler;
};
