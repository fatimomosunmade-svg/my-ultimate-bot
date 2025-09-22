const axios = require('axios');

module.exports = async (bot, chatId, args) => {
    const city = args.join(' ');

    if (!city) {
        return bot.sendMessage(chatId, '❌ Please provide a city name. Example: `.weather Lagos`');
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        // Send a "typing..." action
        await bot.sendChatAction(chatId, 'typing');

        const response = await axios.get(url);
        const data = response.data;

        const weatherText = `
🌆 *City:* ${data.name}, ${data.sys.country}
🌡️ *Temperature:* ${data.main.temp}°C
🧐 *Feels like:* ${data.main.feels_like}°C
📋 *Description:* ${data.weather[0].description}
💨 *Wind Speed:* ${data.wind.speed} m/s
💧 *Humidity:* ${data.main.humidity}%
        `;

        bot.sendMessage(chatId, weatherText, { parse_mode: 'Markdown' });

    } catch (error) {
        console.error('Weather Error:', error);
        if (error.response && error.response.status === 404) {
            bot.sendMessage(chatId, `❌ Sorry, I couldn't find the city "${city}". Please check the spelling.`);
        } else if (error.response && error.response.status === 401) {
            bot.sendMessage(chatId, '❌ My weather API key is invalid or missing.');
        } else {
            bot.sendMessage(chatId, '❌ Failed to get weather data. Please try again later.');
        }
    }
};
