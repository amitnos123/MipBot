const path = require('path');
const fs = require('fs');
const todoFilePath = path.join(__dirname, '../public/todo.txt');
module.exports = {
  name: path.basename(__filename).split('.').slice(0, -1).join('.'),
  description: 'Method to work with the TODO list.' +
  '\nTo add to the list: +todo add {todoMessage}' +
  '\nTo see the list: +todo list',
  args: true,
  execute(client, message, args) {
    switch (args[0]) {
      case 'add':
        add(client, message, args);
        break;
      case 'list':
        list(client, message, args);
        break;
      default:
        message.channel.send('Error 404: Function doesn\'t exist');
    }
  },
};

function add(client, message, args) {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  args.splice(0, 1);
  const todoMessage = args.join(' ');
  fs.appendFileSync(todoFilePath, `[${date}]${todoMessage}\n`);
  message.channel.send(`Added to TODO list: ${todoMessage}`);
}

function list(client, message, args) {
  const todoList = fs.readFileSync(todoFilePath);
  message.channel.send(`TODO List:\n${todoList}`);
}
