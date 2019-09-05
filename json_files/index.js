const { logMessage } = require('../logWriter.js');

const channels = require('./Channels.json');
logMessage('start', '---Loaded Channels.json');
const messages = require('./Messages.json');
logMessage('start', '---Loaded Messages.json');
const authorizion = require('./Authorizion.json');
logMessage('start', '---Loaded Authorizion.json');

module.exports = {
  channels: channels,
  messages: messages,
  authorizion: authorizion,
};
