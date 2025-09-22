module.exports = async (bot, chatId, args) => {
    const expression = args.join('');

    if (!expression) {
        return bot.sendMessage(chatId, '❌ Please provide a calculation. Example: `.calc 2+2` or `.calc 6*7/2`');
    }

    // WARNING: Using eval can be dangerous, but for a simple bot it's okay.
    // We sanitize the input to only allow math characters for safety.
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        return bot.sendMessage(chatId, '❌ Invalid characters. Only numbers and + - * / . ( ) are allowed.');
    }

    try {
        const result = eval(expression);
        bot.sendMessage(chatId, `🧮 *Calculation:* ${expression}\n✅ *Result:* ${result}`, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('Calc Error:', error);
        bot.sendMessage(chatId, '❌ Invalid mathematical expression. Please check your syntax.');
    }
};
