const path = require('path');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Function to insert\\update your information you want on your self to be shown the by bot. Need o give an even number of agruments, which will be "FieldName FieldValue". For example, if you do with agurments: username MipBot, it will insert a new field which it title will be username and the value which will be shown is Mipbot.',
  args: true,
  execute(client, message, args) {
    if (args.length === 0) {
      message.channel.send('Need arguments');
      return;
    }
    if (args.length % 2 !== 0) {
      message.channel.send('Arguments number must be even');
      return;
    }

    const peopleInfoJson = client.JSON_FILES.get('peopleInfo');
    if (!peopleInfoJson.hasOwnProperty(message.author.username)) {
      peopleInfoJson[message.author.username] = {};
    }

    for (let index = 0; index < args.length; index += 2) {
      const fieldName = args[index];
      const fieldValue = args[index + 1];
      peopleInfoJson[message.author.username][fieldName] = fieldValue;
    }

    client.JSON_FILES.set('peopleInfo', peopleInfoJson);

    const fs = require('fs');

    const JSON_PATH = 'json_files';
    fs.writeFile(path.join(__dirname, '../' + JSON_PATH + '/PeopleInfo.json'), JSON.stringify(peopleInfoJson), function(err) {
      if (err) throw err;
      console.log('update_person_info - complete');
    });

    message.channel.send('Your information was updated');
  },
};
