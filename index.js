//Loading Libs
const Discord = require('discord.js');
//const fs = require('fs');
const client = new Discord.Client();

//Constants
const PREFIX = '!';
const JSON_PATH = './json_files/';
const MAX_DELETE_ROWS = 100;

//JSON loading
const messages = require(JSON_PATH + 'messages.json');
const config = require(JSON_PATH + 'config.json');
const channels = require(JSON_PATH + 'channels.json');

//Connecting to server
client.login(config.token);

//Events
client.on('ready', function() {
    console.log('-------------------------------');
    console.log('Start');
});

client.on('message', function (message) {
    let messageSend = '';
    if (message.content[0] === PREFIX && !message.author.bot) {
        console.log('-------------------------------');
        logMessage('debug', 'On Message Start');
        console.log('message content: ' + message.content);
        let arg = message.content.substring(PREFIX.length).split(" ");
        switch (arg[0]) {
            case 'ping':
                message.channel.send('pong');
                break;
            case 'delete':
                if (arg[1]) {
                    deleteMessages(message, arg[1]);
                } else {
                    message.reply('Error, missing arguments for function');
                    return;
                }
                break;
            case 'testInt':
                message.channel.send(isInteger(arg[1]));
                break;
            case 'testLink':
                message.channel.send(convertChannelLink("615195381285912600"));
                break;
            case 'testMessage':
                messageSend = replaceWith(messages['WELCOME']['MESSAGE'], '<', '>', convertChannelLink, channels['text']);
                message.channel.send(messageSend);
                break;
            case 'testGetChannelId':
                messageSend = channels['text'][arg[1]];
                message.channel.send(messageSend);
                break;
            default:
                message.channel.send('Error 404');
                break;
        }

        //messageSend = replaceWith(messages['WELCOME']['MESSAGE'], '<', '>', convertChannelLink, channels['text']);
        //let memberArr = [];
        //memberArr['memberName'] = '615187747279470604';
        //messageSend = replaceWith(messageSend, '{', '}', convertMemberLink, memberArr);
        //logMessage('debug', messageSend);
        //message.channel.send(messageSend);
        //message.channel.send('<@' + message.member.id+ '>');

        //logMessage('debug', message.member);

        logMessage('debug', 'On message End');
    }
});

client.on("guildMemberAdd", member => {
    messageSend = replaceWith(messages['WELCOME']['MESSAGE'], '<', '>', convertChannelLink, channels['text']);
    let memberArr = [];
    memberArr['memberName'] = member.id;
    messageSend = replaceWith(messageSend, '{', '}', convertMemberLink, memberArr);
    client.channels.get(messages.WELCOME.CHANNEL_ID).send(messages.WELCOME.MESSAGE).catch(console.error);
});


//Functions
function logMessage(debugLvl, logMessage) {
    switch (debugLvl) {
        case 'debug':
            debugLvl = 'DEBUG';
            break
        case 'error':
            debugLvl = 'ERROR';
            break
        default:
            debugLvl = 'INFO';
            break
    }
    console.log(debugLvl + ':' + logMessage);
}

function isInteger(str) {
    let patt = new RegExp('^([0-9]+)$');
    return patt.test(str);
}

function deleteMessages(message, NumOfMessages) {
    if (isInteger(NumOfMessages)) {
        if (parseInt(NumOfMessages) <= MAX_DELETE_ROWS) {
            message.channel.bulkDelete(NumOfMessages);
            logMessage('debug', 'Deleted ' + NumOfMessages + ' Messages');
        } else {
            message.reply('Max delete row allowed is ' + MAX_DELETE_ROWS);
        }
    } else {
        logMessage('debug', NumOfMessages + ' isn\'t a integer');
        message.reply('\'' + NumOfMessages + '\' isn\'t a integer');
    }
}

function convertChannelLink(channelIdStr) {
    let str = '<#' + channelIdStr + '>';
    return str;
}

function convertMemberLink(channelIdStr) {
    let str = '<@' + channelIdStr + '>';
    return str;
}

//function replaceWithChannelLinks(messageStr) {
//    let startSubString = 1;
//    let endSubString = 0;
//    let subStr = 0;

//    startSubString = messageStr.indexOf('<');
//    endSubString = messageStr.indexOf('>', startSubString) + 1;//Will go over the <
//    while (startSubString != 0 && endSubString != -1) {
//        subStr = messageStr.substr(startSubString, endSubString - startSubString);
//        messageStr = messageStr.substr(0, startSubString) + convertChannelLink(channels['text'][subStr]) + messageStr.substr(endSubString);

//        startSubString = messageStr.indexOf('<', endSubString) + 1;//Won't go over the <
//        endSubString = messageStr.indexOf('>', startSubString);
//    }

//    logMessage('info', 'messageStr=' + messageStr);
//    return messageStr;
//}


function replaceWith(messageStr, startChar, endChar, convertFunc, strArr) {
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