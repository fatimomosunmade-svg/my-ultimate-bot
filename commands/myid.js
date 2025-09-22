// commands/myid.js
module.exports = async (bot, chatId, args, msg) => {
    const userId = msg.from.id;
    const userName = msg.from.first_name;
    
    const response = `👤 *Your Telegram Info:*\n\n🆔 *User ID:* \`${userId}\`\n📛 *Name:* ${userName}\n💬 *Chat ID:* \`${chatId}\``;
    
    bot.sendMessage(chatId, response, { parse_mode: 'Markdown' });
};
