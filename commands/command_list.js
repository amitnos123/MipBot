const path = require('path');
const { logMessage } = require('../logWriter.js');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'List of commands',
  args: true,
  execute(client, message, args) {
    let commandsList = 'MipBot commands are: ';
    for (const command of client.commands) {
      logMessage('debug', command[0]);
      commandsList += `\n${command[0]}`;
    }
    message.channel.send(commandsList);
  },
};
