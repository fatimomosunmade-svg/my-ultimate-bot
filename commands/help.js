module.exports = (bot, chatId) => {
  const helpText = `🤖 *Here are my commands:*
*/start* - Welcome message
*/help* - Show this help message
*/joke* - Tell a random joke
*/quote* - Share an inspirational quote
*/weather* <city> - Get current weather for a city
*/calc* <equation> - Calculate a math expression

*You can also use a dot instead of a slash!*
Example: .weather London
Example: .calc 2+2`;
  // Use { parse_mode: 'Markdown' } to make the text look nicer
  bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
};
