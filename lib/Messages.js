exports.convertChannelLink = function (channelIdStr) {
    let str = '<#' + channelIdStr + '>';
    return str;
}

exports.convertMemberLink = function (MemberIdStr) {
    let str = '<@' + MemberIdStr + '>';
    return str;
}

exports.replaceWith = function (messageStr, startChar, endChar, convertFunc, strArr) {
    let startSubString = 1;
    let endSubString = 0;
    let subStr = 0;

    startSubString = messageStr.indexOf(startChar);
    endSubString = messageStr.indexOf(endChar, startSubString) + 1;//Will go over the startChar
    while (startSubString != -1 && endSubString != 0) {
        subStr = messageStr.substr(startSubString, endSubString - startSubString);

        newStr = messageStr.substr(0, startSubString);
        //Removing from subStr the first and last chars, which are startChar, endChar
        newStr += convertFunc(strArr[subStr.substr(1, subStr.length - 2)]);
        messageStr = newStr + messageStr.substr(endSubString);

        startSubString = messageStr.indexOf(startChar, endSubString);
        endSubString = messageStr.indexOf(endChar, startSubString) + 1;//Will go over the startChar
    }

    logMessage('info', 'messageStr=' + messageStr);
    return messageStr;
}