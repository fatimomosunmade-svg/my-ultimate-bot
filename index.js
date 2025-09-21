// ------- Section 1: Import Dependencies -------
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
require('dotenv').config();

// Import our command handler
const commandHandler = require('./commands/commands');

// ------- Section 2: Initialize Everything -------
const app = express();
const port = process.env.PORT || 3000;
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// ------- Section 3: Middleware & Setup -------
app.use(express.json());
app.use(express.static('public'));

// ------- Section 4: The Bot's Brain (Using the Handler) -------
bot.onText(/^[\/\.]/, (msg) => {
  const chatId = msg.chat.id;
  const fullCommand = msg.text; // e.g., "/joke"
  const commandParts = fullCommand.split(' '); // In case of commands with arguments later
  const primaryCommand = commandParts[0]; // This is "/joke"

  // Get the function for this command from our handler
  const commandFunction = commandHandler.getCommand(primaryCommand);

  if (commandFunction) {
    // If we found the command, run it and pass the bot and chatId
    commandFunction(bot, chatId);
  } else {
    // If the command wasn't found in our list
    bot.sendMessage(chatId, `❌ Sorry, I don't know the command "${primaryCommand}". Try /help to see what I can do.`);
  }
});

// ------- Section 5: The Dummy Web Server for Render -------
// This is a simple route to make Render happy and show something on the web.
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>🤖 Ultimate Bot Server is Running!</h1>
        <p>Your Telegram bot is the real star. This is just its home page.</p>
      </body>
    </html>
  `);
});

// ------- Section 6: Start The Server -------
app.listen(port, '0.0.0.0', () => { // Listen on all interfaces
  console.log(`🚀 Ultimate Bot server is running on port ${port}`);
  console.log(`🤖 Telegram bot is live and polling for messages...`);
});
