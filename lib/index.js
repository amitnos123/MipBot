const { logMessage } = require('../logWriter.js');
const Discord = require('discord.js');

const LIB = new Discord.Collection();

delete require.cache[require.resolve('./Messages.js')];
const messages = require('./Messages.js');
LIB.set('messages', messages);
logMessage('start', '---Loaded Messages.js');

delete require.cache[require.resolve('./Validation.js')];
const validation = require('./Validation.js');
LIB.set('validation', validation);
logMessage('start', '---Loaded Validation.js');

delete require.cache[require.resolve('./Authorizion.js')];
const authorizion = require('./Authorizion.js');
LIB.set('authorizion', authorizion);
logMessage('start', '---Loaded Authorizion.js');

delete require.cache[require.resolve('./Roles.js')];
const roles = require('./Roles.js');
LIB.set('roles', roles);
logMessage('start', '---Loaded Roles.js');

delete require.cache[require.resolve('./Load.js')];
const load = require('./Load.js');
LIB.set('load', load);
logMessage('start', '---Loaded Load.js');

module.id = 'lib';

module.exports = {
  LIB: LIB,
};
