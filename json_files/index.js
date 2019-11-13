const { logMessage } = require('../logWriter.js');
const Discord = require('discord.js');

const JSON_FILES = new Discord.Collection();

delete require.cache[require.resolve('./Channels.json')];
const channels = require('./Channels.json');
JSON_FILES.set('channels', channels);
logMessage('start', '---Loaded Channels.json');
delete require.cache[require.resolve('./Messages.json')];
const messages = require('./Messages.json');
JSON_FILES.set('messages', messages);
logMessage('start', '---Loaded Messages.json');
delete require.cache[require.resolve('./Authorizion.json')];
const authorizion = require('./Authorizion.json');
JSON_FILES.set('authorizion', authorizion);
logMessage('start', '---Loaded Authorizion.json');
delete require.cache[require.resolve('./Members.json')];
const members = require('./Members.json');
JSON_FILES.set('members', members);
logMessage('start', '---Loaded Members.json');
delete require.cache[require.resolve('./PeopleInfo.json')];
const peopleInfo = require('./PeopleInfo.json');
JSON_FILES.set('peopleInfo', peopleInfo);
logMessage('start', '---Loaded PeopleInfo.json');

module.id = 'JSON_FILES';

module.exports = {
  JSON_FILES: JSON_FILES,
};
