// commands/ai.js
const axios = require('axios');

module.exports = async (bot, chatId, args) => {
    const prompt = args.join(' ');

    if (!prompt) {
        return bot.sendMessage(chatId, '❌ Please ask me anything! Example: .ai What is AI?');
    }

    await bot.sendChatAction(chatId, 'typing');

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large',
            { inputs: prompt },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        let aiResponse = response.data.generated_text;
        
        if (!aiResponse) {
            aiResponse = "I'm not sure how to respond to that. Try asking me something else!";
        }

        if (aiResponse.length > 4000) {
            aiResponse = aiResponse.substring(0, 4000) + '...';
        }

        await bot.sendMessage(chatId, `🤖 ${aiResponse}`);

    } catch (error) {
        console.error('AI Error:', error);
        await bot.sendMessage(chatId, '❌ AI service error. Try again in 30 seconds!');
    }
};
