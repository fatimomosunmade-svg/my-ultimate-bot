// ------- Section 1: Import Dependencies -------
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Import our command handler
const commandHandler = require('./commands/commands');
const RiddleGame = require('./games/riddleGame'); // <-- NEW IMPORT

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
    // Also pass the original msg object as the 4th argument for commands that need it (like .roast)
    commandFunction(bot, chatId, args, msg);
  } else {
    bot.sendMessage(chatId, `❌ Sorry, I don't know the command "${primaryCommand}". Try /help to see what I can do.`);
  }
});

// ------- NEW SECTION: Riddle Game Message Listener -------
// This listens to ALL messages to check if they're answers to active riddles
bot.on('message', (msg) => {
  // Ignore command messages (they're handled by the onText above)
  if (msg.text && (msg.text.startsWith('/') || msg.text.startsWith('.'))) {
    return;
  }

  const chatId = msg.chat.id;
  const userAnswer = msg.text;

  // Check if there's an active riddle game in this chat
  const currentGame = RiddleGame.getCurrentGame(chatId);
  
  if (currentGame && userAnswer) {
    // Process the answer
    const result = RiddleGame.checkAnswer(chatId, userAnswer);
    
    if (result.correct) {
      const scores = RiddleGame.getScores(chatId);
      const points = result.attempts === 1 ? '🎯 Perfect! ' : '';
      
      const message = `${points}✅ *CORRECT!* The answer is "${currentGame.riddle.answer}"!\n\n` +
                    `📊 *Score for ${msg.from.first_name}:*\n` +
                    `🟢 Easy: ${scores.easy} points\n` +
                    `🟡 Medium: ${scores.medium} points\n` +
                    `🔴 Hard: ${scores.hard} points\n\n` +
                    `Type *.riddle* for another challenge!`;
      
      bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    }
    else if (result.incorrect) {
      const hintMsg = result.hint ? `\n💡 *Hint:* ${result.hint}` : '';
      bot.sendMessage(chatId, `❌ Wrong answer! Attempts: ${result.attempts}/${result.maxAttempts}.${hintMsg}`, { parse_mode: 'Markdown' });
    }
    else if (result.failed) {
      bot.sendMessage(chatId, `💀 *Game Over!* The correct answer was: "${result.correctAnswer}"\n\nType *.riddle* to try again!`, { parse_mode: 'Markdown' });
    }
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
