const { logMessage } = require('./logWriter.js');
const path = require('path');
exports.information = function(client, packagePath) {
  const { name, version, description, author } = require(packagePath);
  const Discord = require('discord.js');

  client.information = new Discord.Collection();
  client.information.set('name', name);
  client.information.set('version', version);
  client.information.set('description', description);
  client.information.set('author', author);
};

exports.librairies = function(client, librairiesPath) {
  logMessage('load', 'Loading librairies');
  const { LIB } = require(path.join(__dirname, librairiesPath));
  client.LIB = LIB;
};

exports.json = function(client, jsonPath) {
  logMessage('load', 'Loading JSON files');
  const { JSON_FILES } = require(path.join(__dirname, jsonPath));
  client.JSON_FILES = JSON_FILES;
};

