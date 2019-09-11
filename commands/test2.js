const path = require('path');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Test function 2',
  args: true,
  execute(client, message, args) {
    message.channel.send('Works1');
    message.channel.send('Works2');
    message.channel.send('Works3');
    message.channel.send('Works4');
  },
};
