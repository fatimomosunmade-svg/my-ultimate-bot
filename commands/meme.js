// commands/meme.js
const axios = require('axios');

module.exports = async (bot, chatId, args) => {
    try {
        await bot.sendChatAction(chatId, 'upload_photo');
        
        const response = await axios.get('https://meme-api.com/gimme');
        const memeData = response.data;
        
        const caption = `🤣 *${memeData.title}* (r/${memeData.subreddit})`;
        
        await bot.sendPhoto(chatId, memeData.url, { caption: caption, parse_mode: 'Markdown' });
        
    } catch (error) {
        console.error('Meme error:', error);
        bot.sendMessage(chatId, '❌ Failed to fetch a fresh meme. Try again!');
    }
};
