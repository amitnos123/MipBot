const path = require('path');
const { logMessage } = require('../logWriter.js');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'To see the information the person wrote about themself',
  args: true,
  execute(client, message, args) {
    if (client.JSON_FILES.get('peopleInfo').hasOwnProperty(args[0])) {
      const personInfo = client.JSON_FILES.get('peopleInfo')[args[0]];
      const Discord = require('discord.js');
      const personEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle(args[0]);
      for (const property in personInfo) {
        if(personInfo[property] !== '') {
			personEmbed.addField(`${property}`, `${personInfo[property]}`, true);
		}
      }

      message.channel.send(personEmbed);
    }
    else {
      message.channel.send('Person wasn\'t found');
    }
  },
};
