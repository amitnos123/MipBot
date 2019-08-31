logSplit();
logMessage('start','Defining Constants');
//Constants
const PREFIX = '!';
const MAX_DELETE_ROWS = 100;
const JSON_PATH = './json_files/';
const LIB_PATH = './lib/';

logMessage('start','Loading Libs');
//Loading Libs
const Discord = require('discord.js');
logMessage('start','	Loaded discord.js');
const JSON5 = require('json5');
logMessage('start','	Loaded json5');
const LIB = require(LIB_PATH);

//const fs = require('fs');

logMessage('start','Creating client');
const client = new Discord.Client();

logMessage('start','Loading JSON files');
//JSON loading
const messages = require(JSON_PATH + 'messages.json');
logMessage('start','	Loaded messages.json');
const config = require(JSON_PATH + 'config.json');
logMessage('start','	Loaded config.json');
const channels = require(JSON_PATH + 'channels.json');
logMessage('start','	Loaded channels.json');
const man = require(JSON_PATH + 'man.json');
logMessage('start','	Loaded man.json');

logMessage('start','Connecting to server');
//Connecting to server
client.login(config.token);
logMessage('start','Connected to server');

//Events
client.on('ready', function() {
	logSplit();
	logMessage('start','Bot is ready');
});

client.on('message', function (message) {
    let messageSend = '';
    if (message.content[0] === PREFIX && !message.author.bot) {
        logMessage('debug', 'On Message Start');
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
            case 'testMessage':
                messageSend = replaceWith(messages['WELCOME']['MESSAGE'], '<', '>', convertChannelLink, channels['text']);
                let memberArr = [];
				
				if(arg[1] != undefined) { memberArr['memberName'] = arg[1];}
				else { memberArr['memberName'] = '615187747279470604'; }
				
				messageSend = replaceWith(messageSend, '{', '}', convertMemberLink, memberArr);
				message.channel.send(messageSend);
                break;
            case 'testGetChannelId':
                messageSend = channels['text'][arg[1]];
                message.channel.send(messageSend);
                break;
			case 'man':
                if(man[arg[1]] != undefined) {
					messageSend = man[arg[1]];
					message.channel.send(messageSend);
				} else {
					message.channel.send('Error 404: Function doesn\'t exist in man');
				}
                break;
            default:
                message.channel.send('Error 404: Function doesn\'t exist');
                break;
        }

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
        case 'start':
            debugLvl = 'START';
            break
        case 'end':
            debugLvl = 'END';
            break
        default:
            debugLvl = 'INFO';
            break
    }
	
	let today = new Date();
	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log('['+date+' '+time+']'+debugLvl + ':' + logMessage);
}

function logSplit() {
	console.log('-------------------------------');
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

function convertMemberLink(MemberIdStr) {
    let str = '<@' + MemberIdStr + '>';
    return str;
}

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