const logDir = 'log';

logSplit();
logMessage('start', 'Loaded logWriter');

module.exports = {
  logMessage: logMessage,
  logSplit: logSplit,
};

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
    case 'load':
      debugLvl = 'LOAD';
      break;
    default:
      debugLvl = 'INFO';
      break;
  }

  const fs = require('fs');
  const path = require('path');

  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  console.log(`[${date} ${time}]${debugLvl}:${message}`);
  fs.appendFileSync(path.join(__dirname, `${logDir}/log-${date}.txt`), `[${time}]${debugLvl}:${message}\n`);
}

function logSplit() {
  const fs = require('fs');
  const path = require('path');

  const logSplitStr = '-------------------------------';
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  console.log(logSplitStr);
  fs.appendFileSync(path.join(__dirname, `${logDir}/log-${date}.txt`), `${logSplitStr}\n`);
}
