exports.giveMemberRole = function(member, roleName) {
  const giveRole = member.guild.roles.find(role => role.name === roleName);
  member.addRole(giveRole);
};
