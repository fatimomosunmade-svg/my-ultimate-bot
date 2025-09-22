// commands/song.js
const axios = require('axios');

module.exports = async (bot, chatId, args) => {
    const songQuery = args.join(' ');

    if (!songQuery) {
        return bot.sendMessage(chatId, '❌ Please provide a song name. Example: `.song runaway aurora`');
    }

    await bot.sendChatAction(chatId, 'typing');

    try {
        const apiKey = process.env.YOUTUBE_API_KEY;
        
        // Step 1: Search YouTube using the OFFICIAL API (No scraping!)
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(songQuery + ' official audio')}&type=video&key=${apiKey}`;
        
        const searchResponse = await axios.get(searchUrl);
        const videoId = searchResponse.data.items[0].id.videoId;
        const title = searchResponse.data.items[0].snippet.title;
        
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

        // Step 2: Create a CLEAN, safe download link using a reputable service
        // Using ssyoutube.com (much cleaner than y2mate)
        const safeDownloadUrl = `https://ssyoutube.com/watch?v=${videoId}`;
        
        const message = `
🎵 *Song Found:* ${title}

▶️ *Watch on YouTube:*
${youtubeUrl}

⬇️ *Download Safely:*
${safeDownloadUrl}

💡 *Note:* Use the download link above for a clean, ad-free experience. The download service is provided by ssyoutube.com.
        `;

        await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });

    } catch (error) {
        console.error('Song error:', error);
        await bot.sendMessage(chatId, `❌ Could not find "${songQuery}". Try a different song name.`);
    }
};
