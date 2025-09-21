// A simple array of jokes. Later we can use an API.
const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "What did one ocean say to the other ocean? Nothing, they just waved.",
  "Why did the scarecrow win an award? He was outstanding in his field!",
  "I'm reading a book on anti-gravity. It's impossible to put down!",
  "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them."
];

module.exports = (bot, chatId) => {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  bot.sendMessage(chatId, randomJoke);
};
