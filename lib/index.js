const { logMessage } = require('../logWriter.js');
const Discord = require('discord.js');

const LIB = new Discord.Collection();

const messages = require('./Messages.js');
LIB.set('messages', messages);
logMessage('start', '---Loaded Messages.js');
const validation = require('./Validation.js');
LIB.set('validation', validation);
logMessage('start', '---Loaded Validation.js');
const authorizion = require('./Authorizion.js');
LIB.set('authorizion', authorizion);
logMessage('start', '---Loaded Authorizion.js');
const roles = require('./Roles.js');
LIB.set('roles', roles);
logMessage('start', '---Loaded Roles.js');


// module.exports = {
//   messages: messages,
//   validation: validation,
//   authorizion: authorizion,
//   roles: roles,
// };

module.exports = {
  LIB: LIB,
};
