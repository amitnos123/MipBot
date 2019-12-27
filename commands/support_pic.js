const path = require('path');
const Discord = require('discord.js');
const fs = require('fs');
const imageFolderPath = path.join(__dirname, '../public/support_images/');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Show a supporting picture, may help you when you feel down',
  args: true,
  async execute(client, message, args) {
    fs.readdir(imageFolderPath, (err, files) => {
      if(args.length === 1) {
        if(args[0] === 'all') {
          let attachments = [];
          for(let index = 0; index < files.length; index++){
          
            attachments.push({'attachment': imageFolderPath + files[index], 'name' : 'support_image_' + index + '.jpg' });
  
            if(attachments.length === 9 || index + 1 === files.length) {
              message.channel.send('', {'files' : attachments});
              attachments = [];
            }
          }
          return;
        }
        if(args[0] === 'number') {
          message.channel.send('There are ' + files.length + ' support pictures');
          return;
        }
      }
      const fileNumber = Math.floor(Math.random() * files.length) + 1;
      const attachment = new Discord.Attachment(imageFolderPath + files[fileNumber], 'support_image.jpg');

      message.channel.send('', attachment);

    });
  },
};
