// commands/trivia.js
const axios = require('axios');

module.exports = async (bot, chatId, args) => {
    try {
        const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
        const trivia = response.data.results[0];
        
        // Decode HTML entities and shuffle answers
        const decodeHTML = (html) => {
            const txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        };

        const question = trivia.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
        const correctAnswer = trivia.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
        const incorrectAnswers = trivia.incorrect_answers.map(a => a.replace(/&quot;/g, '"').replace(/&#039;/g, "'"));
        
        const allAnswers = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);
        
        const answersText = allAnswers.map((answer, index) => {
            return `${index + 1}. ${answer}`;
        }).join('\n');

        const message = `🎯 *Trivia Time!* (${trivia.difficulty.toUpperCase()})\n\n` +
                       `📝 *Category:* ${trivia.category}\n\n` +
                       `❓ ${question}\n\n` +
                       `${answersText}\n\n` +
                       `💡 *Reply with the number* of the correct answer!`;

        // Store the correct answer for this chat
        const triviaGame = {
            question: question,
            correctAnswer: correctAnswer,
            answerIndex: allAnswers.indexOf(correctAnswer) + 1
        };
        
        // Simple in-memory storage (for demo)
        global.triviaGames = global.triviaGames || {};
        global.triviaGames[chatId] = triviaGame;

        bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });

    } catch (error) {
        console.error('Trivia error:', error);
        bot.sendMessage(chatId, '❌ Failed to fetch trivia question. Try again!');
    }
};
