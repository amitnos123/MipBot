const { logMessage, logSplit } = require('../logWriter.js');

const messages = require('./Messages.js');
logMessage('start', '---Loaded Messages.js');
const validation = require('./Validation.js');
logMessage('start', '---Loaded Validation.js');
const authorizion = require('./Authorizion.js');
logMessage('start', '---Loaded Authorizion.js');
const roles = require('./Roles.js');
logMessage('start', '---Loaded Roles.js');

module.exports = {
  messages: messages,
  validation: validation,
  authorizion: authorizion,
  roles: roles,
};
