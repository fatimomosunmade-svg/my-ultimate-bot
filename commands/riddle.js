// commands/riddle.js
const RiddleGame = require('../games/riddleGame');

module.exports = async (bot, chatId, args, msg) => {
    const userInput = args.join(' ').toLowerCase();
    
    // Check if user wants to see scores
    if (userInput === 'score') {
        const scores = RiddleGame.getScores(chatId);
        const message = `📊 *Riddle Scores for this chat:*\n\n` +
                       `🟢 Easy: ${scores.easy} points\n` +
                       `🟡 Medium: ${scores.medium} points\n` +
                       `🔴 Hard: ${scores.hard} points\n\n` +
                       `Keep playing to increase your score!`;
        return bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    }

    // Start a new game
    const difficulties = ['easy', 'medium', 'hard'];
    let difficulty = 'easy';
    
    if (userInput && difficulties.includes(userInput)) {
        difficulty = userInput;
    }

    const game = RiddleGame.startGame(chatId, difficulty);
    
    const difficultyEmoji = {
        'easy': '🟢',
        'medium': '🟡', 
        'hard': '🔴'
    };

    const message = `🎭 *Riddle Time!* (${difficultyEmoji[difficulty]} ${difficulty.toUpperCase()})\n\n` +
                   `❓ ${game.riddle.question}\n\n` +
                   `💡 *How to play:* Just type your answer in the chat!\n` +
                   `📝 *Difficulty levels:* .riddle easy / .riddle medium / .riddle hard\n` +
                   `📊 Check scores: .riddle score`;

    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
};
