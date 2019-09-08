const { logMessage, logSplit } = require('./logWriter.js');
logMessage('start', 'Defining Constants');
// Constants
const JSON_PATH = 'json_files';
const LIB_PATH = 'lib';
const COMMANDS_PATH = 'commands';

logMessage('load', 'Loading config');
const { prefix, token } = require('./config.json');

const path = require('path');
logMessage('load', 'Loaded path');

const Discord = require('discord.js');
logMessage('load', 'Loaded discord.js');

logMessage('start', 'Creating client');
const client = new Discord.Client();

const fs = require('fs');
logMessage('start', 'Loaded fs');

const { LIB } = require(path.join(__dirname, LIB_PATH));
client.LIB = LIB;

logMessage('load', 'Loading JSON files');
const { JSON_FILES } = require(path.join(__dirname, JSON_PATH));
client.JSON_FILES = JSON_FILES;

logMessage('load', 'Loading bot\'s information');
const { name, version, description, author } = require('./package.json');
client.information = new Discord.Collection();
client.information.set('name', name);
client.information.set('version', version);
client.information.set('description', description);
client.information.set('author', author);

logMessage('start', 'Syncing Commands');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, COMMANDS_PATH)).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, COMMANDS_PATH) + `/${file}`);
  logMessage('start', '---' + command.name + ' was synced');
  client.commands.set(command.name, command);
}
logMessage('start', 'Connecting to server');
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
    logMessage('info', 'On message Start');

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift();
    logMessage('debug', `${command} was called, with arguments: ${args}`);

    if (!client.commands.has(command)) {
      error404(message);
      return;
    }

    client.commands.get(command).execute(client, message, args);

    logMessage('info', 'On message End');
  }
  catch (err) {
    logMessage('error', err);
  }
});

// client.on('guildMemberAdd', member => {

// });

// Functions
function error404(message) {
  message.channel.send('Error 404: Function doesn\'t exist');
}
