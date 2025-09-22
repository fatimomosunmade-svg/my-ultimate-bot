// commands/riddle.js
const RiddleGame = require('../games/riddleGame');

module.exports = async (bot, chatId, args, msg) => {
    const userInput = args.join(' ').toLowerCase();
    const currentGame = RiddleGame.getCurrentGame(chatId);

    // If there's an active game, check the answer
    if (currentGame && userInput) {
        const result = RiddleGame.checkAnswer(chatId, userInput);
        
        if (result.correct) {
            const scores = RiddleGame.getScores(chatId);
            const points = result.attempts === 1 ? '🎯 Perfect! ' : '';
            
            const message = `${points}✅ *CORRECT!* The answer is "${currentGame.riddle.answer}"!\n\n` +
                          `📊 *Your Score:*\n` +
                          `🟢 Easy: ${scores.easy} points\n` +
                          `🟡 Medium: ${scores.medium} points\n` +
                          `🔴 Hard: ${scores.hard} points\n\n` +
                          `Type *.riddle* for another challenge!`;
            
            return bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
        }

        if (result.incorrect) {
            const hintMsg = result.hint ? `\n💡 *Hint:* ${result.hint}` : '';
            return bot.sendMessage(chatId, `❌ Wrong answer! Attempts: ${result.attempts}/${result.maxAttempts}.${hintMsg}`, { parse_mode: 'Markdown' });
        }

        if (result.failed) {
            return bot.sendMessage(chatId, `💀 *Game Over!* The correct answer was: "${result.correctAnswer}"\n\nType *.riddle* to try again!`, { parse_mode: 'Markdown' });
        }
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
                   `📝 *Difficulty levels:* .riddle easy / .riddle medium / .riddle hard`;

    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
};
