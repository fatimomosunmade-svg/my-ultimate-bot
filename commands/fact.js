// commands/fact.js
const facts = [
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.",
    "Octopuses have three hearts. Two pump blood to the gills, while the third pumps it to the rest of the body.",
    "A day on Venus is longer than a year on Venus. It takes Venus 243 Earth days to rotate once, but only 225 Earth days to orbit the Sun.",
    "Bananas are berries, but strawberries aren't. Botanically, bananas qualify as berries while strawberries do not.",
    "The shortest war in history was between Britain and Zanzibar in 1896. Zanzibar surrendered after 38 minutes.",
    "There are more possible iterations of a game of chess than there are atoms in the known universe.",
    "A group of flamingos is called a 'flamboyance'.",
    "The inventor of the Pringles can is buried in one. Fred Baur asked for his ashes to be buried in a Pringles can.",
    "Scotland has 421 words for 'snow'. Including 'snaw' (snow), 'sneesl' (to start raining or snowing), and 'skelf' (a large snowflake).",
    "The first computer mouse was made of wood. Doug Engelbart created it in 1964."
];

module.exports = async (bot, chatId, args) => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    
    const message = `🧠 *Did You Know?*\n\n${randomFact}`;
    
    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
};
