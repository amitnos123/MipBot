const path = require('path');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Reloading files',
  args: true,
  execute(client, message, args) {
    client.LIB.get('load').information(client, '../package.json');
    client.LIB.get('load').librairies(client, '.');
    client.LIB.get('load').json(client, '../json_files');
    client.LIB.get('load').commands(client, '../commands');
  },
};
