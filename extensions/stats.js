var request = require('request');

var stats = { };
var deps = { 'privmsg': {}, 'quit': {}, 'part': {}, 'join': {}, 'mode': {}, 'kick': {}, 'invite': {}, 'server': {}};

function handler(irc) {

	irc.addCallBack(
		'privmsg',
		function(data) {
			if(/^!stats/.test(data.message)) {
				// Command for the plugin.
				cmdHandler(irc, data);
			}

			// Add to stats.
			addPrivmsgLog(irc, data);

			updateStats('privmsg');
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

// Command Functions.

function cmdHandler(irc, data) {
	// Data: time, type, nickname, host, channel, message. 

}

// Log Helper Functions.

function addPrivmsgLog(irc, data) {
	// Data: time, type, nickname, host, channel, message.

	if(data.nickname in stats['user']) {
		
	}
	else {

	}
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


}

// Exporter.

module.exports = function(module_holder) {
	module_holder['stats'] = handler;
};
