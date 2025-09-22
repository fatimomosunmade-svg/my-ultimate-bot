// commands/commands.js

// Import all our command modules
const startCommand = require('./start');
const helpCommand = require('./help');
const jokeCommand = require('./joke');
const quoteCommand = require('./quote');
const weatherCommand = require('./weather');
const calcCommand = require('./calc');
const roastCommand = require('./roast');
const ball8Command = require('./8ball');
const simprateCommand = require('./simprate'); // <-- NEW
const shipCommand = require('./ship');         // <-- NEW

// Define a list of all commands and their corresponding functions
const commandList = {
  '/start': startCommand,
  '.start': startCommand,
  '/help': helpCommand,
  '.help': helpCommand,
  '/joke': jokeCommand,
  '.joke': jokeCommand,
  '/quote': quoteCommand,
  '.quote': quoteCommand,
  '/weather': weatherCommand,
  '.weather': weatherCommand,
  '/calc': calcCommand,
  '.calc': calcCommand,
  '/roast': roastCommand,
  '.roast': roastCommand,
  '/8ball': ball8Command,
  '.8ball': ball8Command,
  '/simprate': simprateCommand, // <-- NEW
  '.simprate': simprateCommand, // <-- NEW
  '/ship': shipCommand,         // <-- NEW
  '.ship': shipCommand,         // <-- NEW
};

// This function takes a command name (e.g., '/joke') and returns the function to run
function getCommand(command) {
  return commandList[command];
}

// Export this function so our main index.js can use it
module.exports = {
  getCommand
};
