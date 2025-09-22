// commands/roast.js

// A list of savage but playful roasts
const roasts = [
    "If laughter is the best medicine, your face must be curing the world.",
    "You're like a cloud. When you disappear, it's a beautiful day.",
    "I'd agree with you but then we'd both be wrong.",
    "Your secrets are always safe with me. I never even listen when you tell me them.",
    "It's cute how you're trying to use your whole vocabulary in one sentence.",
    "You have the perfect face for radio.",
    "I was going to give you a nasty look, but I see you already have one.",
    "You bring everyone so much joy... when you leave the room.",
    "I don't know what your problem is, but I'll bet it's hard to pronounce.",
    "You're the reason this group has a warning label."
];

module.exports = async (bot, chatId, args, msg) => {
    let target = "someone";
    
    // Check if a user was mentioned (replied to or tagged)
    if (msg.reply_to_message) {
        // If used as a reply, roast the person who was replied to
        target = `${msg.reply_to_message.from.first_name}`;
    } else if (args.length > 0) {
        // If a username is provided as an argument
        target = args.join(' ');
    }

    const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
    const finalRoast = `🔥 ${target}, ${randomRoast}`;

    bot.sendMessage(chatId, finalRoast);
};
