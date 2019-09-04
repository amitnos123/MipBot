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


function logMessage(debugLvl, message) {
  switch (debugLvl) {
    case 'debug':
      debugLvl = 'DEBUG';
      break;
    case 'error':
      debugLvl = 'ERROR';
      break;
    case 'start':
      debugLvl = 'START';
      break;
    case 'end':
      debugLvl = 'END';
      break;
    default:
      debugLvl = 'INFO';
      break;
  }

  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  console.log('[' + date + ' ' + time + ']' + debugLvl + ':' + message);
}

// eslint-disable-next-line no-unused-vars
function logSplit() {
  console.log('-------------------------------');
}
