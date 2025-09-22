// commands/ship.js

module.exports = async (bot, chatId, args, msg) => {
    if (args.length < 2) {
        return bot.sendMessage(chatId, '❌ Need two people to ship! Example: `.ship @user1 @user2` or reply to two messages');
    }

    let user1 = args[0].replace('@', '');
    let user2 = args[1].replace('@', '');
    
    // If replying to messages, we could get actual usernames, but for now use provided args
    const compatibility = Math.floor(Math.random() * 101);
    
    // Create a ship name (combine first 3 letters of each name)
    const shipName = user1.slice(0, 3) + user2.slice(0, 3);
    
    // Generate funny compatibility message
    let message = "";
    if (compatibility < 30) {
        message = "💔 Disaster waiting to happen! Run while you can!";
    } else if (compatibility < 60) {
        message = "💖 Maybe with some couple's therapy...";
    } else if (compatibility < 80) {
        message = "💕 Pretty good match! Cute couple alert!";
    } else {
        message = "💘 SOULMATES! When's the wedding?";
    }

    const finalResponse = `💑 *Shipping Results:*\n\n${user1} + ${user2} = ${shipName}\nCompatibility: ${compatibility}%\n${message}`;

    bot.sendMessage(chatId, finalResponse, { parse_mode: 'Markdown' });
};
