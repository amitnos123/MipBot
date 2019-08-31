exports.messages = require('./Messages.js');
logMessage('start', '	Loaded Messages.js');

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