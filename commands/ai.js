const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (bot, chatId, args) => {
  console.log("AI command called. Args received:", args); // DEBUG LINE

  // FIX: Handle undefined 'args' by defaulting to an empty array
  const safeArgs = args || [];
  const prompt = safeArgs.join(' ').trim(); // Added .trim() to remove any accidental spaces

  console.log("Prompt formed:", prompt); // DEBUG LINE

  if (!prompt) {
    // This will tell us exactly what went wrong
    console.log("Prompt was empty! Triggering error message.");
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
    // More specific error message
    const errorMessage = '❌ Sorry, I had a brain freeze. ';
    if (error.message.includes('API_KEY')) {
      await bot.sendMessage(chatId, errorMessage + 'My API key is missing or invalid. Did you add GEMINI_API_KEY to Render?');
    } else {
      await bot.sendMessage(chatId, errorMessage + 'Please try again later.');
    }
  }
};
