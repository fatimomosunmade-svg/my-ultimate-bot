// commands/quote.js
const axios = require('axios');

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" }
];

module.exports = async (bot, chatId, args) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteText = `💬 *"${randomQuote.text}"*\n\n— *${randomQuote.author}*`;
    
    bot.sendMessage(chatId, quoteText, { parse_mode: 'Markdown' });
};
