// commands/commands.js

// Import all our command modules
const startCommand = require('./start');
const helpCommand = require('./help');
const jokeCommand = require('./joke');
const quoteCommand = require('./quote');
const weatherCommand = require('./weather');
const aiCommand = require('./ai'); // <-- Import the new AI command

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
  '/ai': aiCommand, // <-- Add the new commands
  '.ai': aiCommand,  // <-- Add the new commands
};

// This function takes a command name (e.g., '/joke') and returns the function to run
function getCommand(command) {
  return commandList[command];
}

// Export this function so our main index.js can use it
module.exports = {
  getCommand
};
