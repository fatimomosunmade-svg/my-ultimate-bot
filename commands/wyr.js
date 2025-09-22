// commands/wyr.js
const dilemmas = [
    "Would you rather always be 10 minutes late or always be 20 minutes early?",
    "Would you rather have unlimited battery for your phone or unlimited free WiFi?",
    "Would you rather be able to talk to animals or speak all foreign languages?",
    "Would you rather be famous but unhappy or unknown but happy?",
    "Would you rather never use social media again or never watch another movie?",
    "Would you rather have a rewind button or a pause button in your life?",
    "Would you rather always have to sing instead of speak or dance instead of walk?",
    "Would you rather be a superhero or a supervillain?",
    "Would you rather lose all your money or all your pictures?",
    "Would you rather be too hot or too cold for the rest of your life?"
];

module.exports = async (bot, chatId, args) => {
    const randomDilemma = dilemmas[Math.floor(Math.random() * dilemmas.length)];
    
    const message = `🤔 *Would You Rather?*\n\n${randomDilemma}\n\n` +
                   `💬 *Discuss your choice in the chat!*`;
    
    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
};
