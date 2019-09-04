logSplit();
logMessage('start', 'Defining Constants');
// Constants
const JSON_PATH = './json_files/';
const LIB_PATH = './lib/';
const COMMANDS_PATH = 'E:\\discord_bots\\MipBot\\commands\\';

logMessage('start', 'Loading config');
const { prefix, token } = require('./config.json');

logMessage('start', 'Loading Libs');
// Loading Libs
const Discord = require('discord.js');
logMessage('start', 'Loaded discord.js');
const fs = require('fs');
logMessage('start', 'Loaded fs');
// const JSON5 = require('json5');
// logMessage('start', 'Loaded json5');
const LIB = require(LIB_PATH);

logMessage('start', 'Creating client');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const path = require('path');
logMessage('debug', path.dirname(COMMANDS_PATH));

logMessage('start', 'Syncing Commands');
const commandFiles = fs.readdirSync(COMMANDS_PATH).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(COMMANDS_PATH + `${file}`);
  client.commands.set(command.name, command);
}

logMessage('start', 'Loading JSON files');
// JSON loading
const messages = require(JSON_PATH + 'messages.json');
logMessage('start', 'Loaded messages.json');
const channels = require(JSON_PATH + 'channels.json');
logMessage('start', 'Loaded channels.json');
const man = require(JSON_PATH + 'man.json');
logMessage('start', 'Loaded man.json');

const JSON_FILES = {
  messages: messages,
  channels: channels,
  man: man,
};

logMessage('start', 'Connecting to server');
// Connecting to server
client.login(token);
logMessage('start', 'Connected to server');

// Events
client.on('ready', () => {
  logSplit();
  logMessage('start', 'Bot is ready');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  try {
    logMessage('debug', 'On message Start');

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift();

    if (!client.commands.has(command)) {
      error404(message);
      return;
    }

    client.commands.get(command).execute(client, JSON_FILES, LIB, message, args);

    logMessage('debug', 'On message End');
  }
  catch (err) {
    logMessage('error', err);
  }
});

// client.on('guildMemberAdd', member => {

// });

// Functions
function logMessage(debugLvl, message) {
  switch (debugLvl) {
    case 'debug':
      debugLvl = 'DEBUG';
      break;
    case 'error':
      debugLvl = 'ERROR';
      break;
    case 'start':
      debugLvl = 'START';
      break;
    case 'end':
      debugLvl = 'END';
      break;
    default:
      debugLvl = 'INFO';
      break;
  }

  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  console.log('[' + date + ' ' + time + ']' + debugLvl + ':' + message);
}

function logSplit() {
  console.log('-------------------------------');
}

function error404(message) {
  message.channel.send('Error 404: Function doesn\'t exist');
}
