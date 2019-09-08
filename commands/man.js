const path = require('path');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Manual for commands, like in Linux',
  args: true,
  execute(client, message, args) {
    message.channel.send(client.commands.get(args[0]).description);
  },
};
