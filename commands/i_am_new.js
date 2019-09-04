module.exports = {
  name: 'i_am_new',
  description: 'Give role and welcome message, if wrote the password write',
  args: true,
  execute(client, JSON_FILES, LIB, message, args) {
    if (args[0] === 'bob') {
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
