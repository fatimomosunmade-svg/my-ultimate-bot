// ------- Section 1: Import Dependencies -------
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
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

// ------- Section 4: The Bot's Brain (Fixed and Robust) -------
bot.onText(/^[\/\.]/, (msg) => {
  const chatId = msg.chat.id;
  const fullText = msg.text; // e.g., ".weather London" or "/calc 2+2"

  // A more robust way to split the command from its arguments
  // This regex splits on the first space only, keeping the rest as the argument string
  const match = fullText.match(/^([\/\.]\S+)(?:\s+(.*))?$/);

  if (!match) {
    return; // If it doesn't match our pattern, do nothing.
  }

  const primaryCommand = match[1]; // This is ".weather"
  const argumentString = match[2] || ''; // This is "London" or an empty string if no args

  // Split the argument string into an array of words
  const args = argumentString ? argumentString.split(' ') : [];

  // Get the function for this command from our handler
  const commandFunction = commandHandler.getCommand(primaryCommand);

  if (commandFunction) {
    // Pass the arguments array safely. It will always be an array, never undefined.
    commandFunction(bot, chatId, args);
  } else {
    bot.sendMessage(chatId, `❌ Sorry, I don't know the command "${primaryCommand}". Try /help to see what I can do.`);
  }
});

// ------- Section 5: The Dummy Web Server for Render -------
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
