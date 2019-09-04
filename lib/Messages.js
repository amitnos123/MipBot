exports.convertChannelLink = function(channelIdStr) {
  const str = '<#' + channelIdStr + '>';
  return str;
};

exports.convertMemberLink = function(MemberIdStr) {
  const str = '<@' + MemberIdStr + '>';
  return str;
};

exports.replaceWith = function(messageStr, startChar, endChar, convertFunc, strArr) {
  let startSubString = 1;
  let endSubString = 0;
  let subStr = 0;

  startSubString = messageStr.indexOf(startChar);
  // Will go over the startChar
  endSubString = messageStr.indexOf(endChar, startSubString) + 1;
  while (startSubString !== -1 && endSubString !== 0) {
    subStr = messageStr.substr(startSubString, endSubString - startSubString);

    let newStr = messageStr.substr(0, startSubString);
    // Removing from subStr the first and last chars, which are startChar, endChar
    newStr += convertFunc(strArr[subStr.substr(1, subStr.length - 2)]);
    messageStr = newStr + messageStr.substr(endSubString);

    startSubString = messageStr.indexOf(startChar, endSubString);
    // Will go over the startChar
    endSubString = messageStr.indexOf(endChar, startSubString) + 1;
  }
  return messageStr;
};
