const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
  "Life is what happens to you while you're busy making other plans. - John Lennon",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
];

module.exports = (bot, chatId) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  bot.sendMessage(chatId, `💬 ${randomQuote}`);
};
