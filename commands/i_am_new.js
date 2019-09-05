const path = require('path');
const { logMessage } = require('../logWriter.js');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Give role and welcome message, if wrote the password write',
  args: true,
  execute(client, JSON_FILES, LIB, message, args) {
    if (args[0] === JSON_FILES.authorizion.WELCOME_PASSWORD) {
      logMessage('info', `[id:${message.member.id}, displayName:${message.member.displayName}, nickname:${message.member.nickname}] has joined the server.`);
      LIB.roles.giveMemberRole(message.member, 'Wholesome Kinkster');
      messageOnJoin(message.member, client, LIB, JSON_FILES.channels, JSON_FILES.messages);
    }
    message.delete();
  },
};

function messageOnJoin(member, client, LIB, channelsJson, messagesJson) {
  const chId = channelsJson.text[messagesJson.WELCOME.CHANNEL];
  const memberArr = [];
  let messageSend = '';

  memberArr.memberName = member.id.toString();
  messageSend = LIB.messages.replaceWith(messagesJson.WELCOME.MESSAGE, '<', '>', LIB.messages.convertChannelLink, channelsJson.text);
  messageSend = LIB.messages.replaceWith(messageSend, '{', '}', LIB.messages.convertMemberLink, memberArr);
  client.channels.get(chId).send(messageSend).catch(console.error);
}
