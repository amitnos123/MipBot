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
                message.channel.send(channelLink("615195381285912600"));
                break;
            default:
                message.channel.send('Error 404');
                break;
        }
        console.log('DEBUG:' + 'On message End');
    }
});

client.on("guildMemberAdd", member => {
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

function channelLink(channelIdStr) {
    let str = '<#' + channelIdStr + '>';
    return str;
}

function writeToChannel() {
	
}