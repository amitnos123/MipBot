const path = require('path');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Test function',
  args: true,
  execute(client, message, args) {
    // inside a command, event listener, etc.
    const Discord = require('discord.js');
    const exampleEmbed = new Discord.RichEmbed()
      .setColor('#0099ff')
      .setTitle('Some title')
      .setURL('https://discord.js.org/')
      .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
      .setDescription('Some description here')
      .setThumbnail('https://i.imgur.com/wSTFkRM.png')
      .addField('Regular field title', 'Some value here')
      .addBlankField()
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .addField('Inline field title', 'Some value here', true)
      .setImage('https://i.imgur.com/wSTFkRM.png')
      .setTimestamp()
      .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

    message.channel.send(exampleEmbed).then(messageSend => console.log(`Sent message: ${messageSend.content}`))
      .catch(console.error);
    message.channel.send('MIP123').then(messageSend => console.log(`Sent message: ${messageSend.content}`))
      .catch(console.error);
  },
};
