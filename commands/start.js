module.exports = (bot, chatId) => {
  const welcomeText = `✨ Welcome! I'm your Ultimate Bot.
I can do all sorts of things. Use /.help to see what I can do!`;
  bot.sendMessage(chatId, welcomeText);
};
