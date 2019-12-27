const path = require('path');
const { logMessage } = require('../logWriter.js');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Give role and welcome message, if wrote the password right',
  args: true,
  execute(client, message, args) {
    const firstArg = args.shift();
    if (firstArg === 'have') {
      client.commands.get('I_have').execute(client, message, args);
    }
  },
};
