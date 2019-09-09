const path = require('path');
const { logMessage } = require('../logWriter.js');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Give role and welcome message, if wrote the password right',
  args: true,
  execute(client, message, args) {
    if (message.channel.name === 'welcome') {
      let password = args.toString();
      while (password.indexOf(',') !== -1) {
        password = password.replace(',', ' ');
      }
      logMessage('debug', password);
      if (password === client.JSON_FILES.get('authorizion').WELCOME_PASSWORD) {
        logMessage('info', `[id:${message.member.id}, displayName:${message.member.displayName}, nickname:${message.member.nickname}] has joined the server.`);
        client.LIB.get('roles').giveMemberRole(message.member, 'Wholesome Kinkster');
        messageOnJoin(message.member, client, client.JSON_FILES.get('channels'), client.JSON_FILES.get('messages'));
      }
    }
    message.delete();
  },
};

function messageOnJoin(member, client, channelsJson, messagesJson) {
  const chId = channelsJson.text[messagesJson.WELCOME.CHANNEL];
  const memberArr = [];
  let messageSend = '';

  memberArr.memberName = member.id.toString();
  messageSend = client.LIB.get('messages').replaceWith(messagesJson.WELCOME.MESSAGE, '<', '>', client.LIB.get('messages').convertChannelLink, channelsJson.text);
  messageSend = client.LIB.get('messages').replaceWith(messageSend, '{', '}', client.LIB.get('messages').convertMemberLink, memberArr);
  client.channels.get(chId).send(messageSend).catch(console.error);
}
