const path = require('path');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Function to remove your information about yourself.',
  args: true,
  execute(client, message, args) {
    if (args.length === 0) {
      message.channel.send('Need arguments');
      return;
    }

    const peopleInfoJson = client.JSON_FILES.get('peopleInfo');
    if (!peopleInfoJson.hasOwnProperty(message.author.username)) {
      message.channel.send('Your information wasn\'t found');
      return;
    }

    for (let index = 0; index < args.length; index++) {
      const fieldName = args[index];
      if (peopleInfoJson[message.author.username].hasOwnProperty(fieldName)) {
        delete peopleInfoJson[message.author.username][fieldName];
      }
    }

    client.JSON_FILES.set('peopleInfo', peopleInfoJson);

    const fs = require('fs');

    const JSON_PATH = 'json_files';
    fs.writeFile(path.join(__dirname, '../' + JSON_PATH + '/PeopleInfo.json'), JSON.stringify(peopleInfoJson), function(err) {
      if (err) throw err;
      console.log('remove_person_info - complete');
    });

    message.channel.send('Your information was removed');
  },
};
