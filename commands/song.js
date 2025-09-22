// commands/song.js
const axios = require('axios');

module.exports = async (bot, chatId, args) => {
    const songQuery = args.join(' ');

    if (!songQuery) {
        return bot.sendMessage(chatId, '❌ Please provide a song name. Example: `.song runaway aurora`');
    }

    await bot.sendChatAction(chatId, 'typing');

    try {
        // Step 1: Search YouTube for the song
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(songQuery + ' official audio')}`;
        const response = await axios.get(searchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        const html = response.data;
        
        // Extract video ID using regex
        const videoIdRegex = /"videoId":"([a-zA-Z0-9_-]{11})"/;
        const match = html.match(videoIdRegex);
        
        if (!match || !match[1]) {
            throw new Error('No video found');
        }

        const videoId = match[1];
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        
        // Step 2: Create download link using a converter service
        // Using y2mate.com service (you can change to any other converter)
        const downloadPageUrl = `https://www.y2mate.com/youtube/${videoId}`;
        
        const message = `
🎵 *Song Found:* ${songQuery}

⬇️ *Download Your Song:*
${downloadPageUrl}

💡 *Instructions:*
1. Click the link above
2. Select MP3 format
3. Click Download
4. Wait a few seconds
5. Get your music!

*Note:* This service converts YouTube videos to MP3. Please respect copyrights.
        `;

        await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });

    } catch (error) {
        console.error('Song error:', error);
        await bot.sendMessage(chatId, `❌ Could not find "${songQuery}". Try a different song name or check your spelling.`);
    }
};
