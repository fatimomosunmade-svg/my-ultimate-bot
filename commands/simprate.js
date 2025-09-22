// commands/simprate.js

module.exports = async (bot, chatId, args, msg) => {
    let target = "You";
    let targetName = "You";
    
    // Check if a user was mentioned (replied to or tagged)
    if (msg.reply_to_message) {
        target = `@${msg.reply_to_message.from.username || msg.reply_to_message.from.first_name}`;
        targetName = msg.reply_to_message.from.first_name;
    } else if (args.length > 0) {
        target = args.join(' ');
        targetName = target;
    }

    // Generate a random simprate between 0-100%
    const simprate = Math.floor(Math.random() * 101);
    
    // Create funny messages based on the percentage
    let message = "";
    if (simprate < 20) {
        message = "Ice cold! ❄️ They'd probably forget their own anniversary.";
    } else if (simprate < 40) {
        message = "A bit reserved. They show love through memes. 💻";
    } else if (simprate < 60) {
        message = "Romantic but practical. Flowers, but only on sale. 💐";
    } else if (simprate < 80) {
        message = "Major simp energy! Would write love poems daily. 📝";
    } else {
        message = "ULTIMATE SIMP! Would buy a ring on the first date! 💍";
    }

    const finalResponse = `💖 *Simp Rate Results:*\n\n${target} is ${simprate}% simp!\n${message}`;

    bot.sendMessage(chatId, finalResponse, { parse_mode: 'Markdown' });
};
