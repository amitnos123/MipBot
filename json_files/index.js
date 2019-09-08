const { logMessage } = require('../logWriter.js');
const Discord = require('discord.js');

const JSON_FILES = new Discord.Collection();

const channels = require('./Channels.json');
JSON_FILES.set('channels', channels);
logMessage('start', '---Loaded Channels.json');
const messages = require('./Messages.json');
JSON_FILES.set('messages', messages);
logMessage('start', '---Loaded Messages.json');
const authorizion = require('./Authorizion.json');
JSON_FILES.set('authorizion', authorizion);
logMessage('start', '---Loaded Authorizion.json');

module.exports = {
  JSON_FILES: JSON_FILES,
};
