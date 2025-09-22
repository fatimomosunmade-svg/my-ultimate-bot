// commands/8ball.js

const responses = [
    "🎱 It is certain.",
    "🎱 Without a doubt.",
    "🎱 Yes definitely.",
    "🎱 You may rely on it.",
    "🎱 As I see it, yes.",
    "🎱 Most likely.",
    "🎱 Outlook good.",
    "🎱 Yes.",
    "🎱 Signs point to yes.",
    "🎱 Reply hazy, try again.",
    "🎱 Ask again later.",
    "🎱 Better not tell you now.",
    "🎱 Cannot predict now.",
    "🎱 Concentrate and ask again.",
    "🎱 Don't count on it.",
    "🎱 My reply is no.",
    "🎱 My sources say no.",
    "🎱 Outlook not so good.",
    "🎱 Very doubtful."
];

module.exports = async (bot, chatId, args) => {
    const question = args.join(' ');

    if (!question) {
        return bot.sendMessage(chatId, '❌ You need to ask a question, silly! Example: `.8ball Will I become rich?`');
    }

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const finalResponse = `*Question:* ${question}\n*Answer:* ${randomResponse}`;

    bot.sendMessage(chatId, finalResponse, { parse_mode: 'Markdown' });
};
