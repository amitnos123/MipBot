const path = require('path');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Test function',
  args: true,
  execute(client, message, args) {
    message.channel.send(client.JSON_FILES.get('authorizion').WELCOME_PASSWORD);
  },
};
