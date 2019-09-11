const { logMessage } = require('../logWriter.js');
const path = require('path');

exports.information = function(client, packagePath) {
  delete require.cache[require.resolve(packagePath)];
  const { name, version, description, author } = require(packagePath);
  const Discord = require('discord.js');

  logMessage('load', 'Loading information');
  client.information = new Discord.Collection();
  client.information.set('name', name);
  client.information.set('version', version);
  client.information.set('description', description);
  client.information.set('author', author);
};

exports.librairies = function(client, librairiesPath) {
  logMessage('load', 'Loading librairies');
  const librairiesFullPath = path.join(__dirname, librairiesPath);
  delete require.cache[require.resolve(librairiesFullPath)];
  const { LIB } = require(librairiesFullPath);
  client.LIB = LIB;
};

exports.json = function(client, jsonPath) {
  logMessage('load', 'Loading JSON files');
  const jsonFullPath = path.join(__dirname, jsonPath);
  delete require.cache[require.resolve(jsonFullPath)];
  const { JSON_FILES } = require(jsonFullPath);
  client.JSON_FILES = JSON_FILES;
};

exports.commands = function(client, commandsPath) {
  logMessage('load', 'Loading Commands');
  const fs = require('fs');
  const commandFiles = fs.readdirSync(path.join(__dirname, commandsPath)).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    delete require.cache[require.resolve(commandsPath + `/${file}`)];
    const command = require(commandsPath + `/${file}`);
    logMessage('start', '---' + command.name + ' was synced');
    client.commands.set(command.name, command);
  }
};
