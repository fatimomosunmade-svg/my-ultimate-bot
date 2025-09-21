const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (bot, chatId, args) => {
  // FIX: Handle undefined 'args' by defaulting to an empty array
  const safeArgs = args || [];
  const prompt = safeArgs.join(' ');

  if (!prompt) {
    return bot.sendMessage(chatId, '❌ Please ask me anything! Example: `.ai Explain quantum computing`');
  }

  await bot.sendChatAction(chatId, 'typing');

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Split long messages for Telegram
    if (text.length > 4096) {
      for (let i = 0; i < text.length; i += 4096) {
        await bot.sendMessage(chatId, text.substring(i, i + 4096));
      }
    } else {
      await bot.sendMessage(chatId, text);
    }

  } catch (error) {
    console.error('Gemini Error:', error);
    await bot.sendMessage(chatId, '❌ Sorry, I had a brain freeze. Maybe my API key is missing or invalid?');
  }
};
