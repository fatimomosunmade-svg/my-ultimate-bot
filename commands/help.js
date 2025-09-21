module.exports = (bot, chatId) => {
  const helpText = `🤖 *Here are my commands:*
*/start* - Welcome message
*/help* - Show this help message
*/joke* - Tell a random joke
*/quote* - Share an inspirational quote

*You can also use a dot instead of a slash!*
.example: .joke`;
  // Use { parse_mode: 'Markdown' } to make the text look nicer
  bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
};
