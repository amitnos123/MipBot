const path = require('path');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Bot ping',
  args: true,
  execute(client, message, args) {
    message.channel.send(`Current ping is ${client.ping}(ms)`);
  },
};
