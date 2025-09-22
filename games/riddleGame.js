// games/riddleGame.js
const riddles = require('../data/riddles.json');

// Store active games per chat
const activeGames = new Map();
const userScores = new Map();

class RiddleGame {
  static startGame(chatId, difficulty = 'easy') {
    const difficultyRiddles = riddles[difficulty] || riddles.easy;
    const randomRiddle = difficultyRiddles[Math.floor(Math.random() * difficultyRiddles.length)];
    
    const game = {
      riddle: randomRiddle,
      difficulty: difficulty,
      attempts: 0,
      maxAttempts: 3,
      startTime: Date.now()
    };
    
    activeGames.set(chatId, game);
    return game;
  }

  static checkAnswer(chatId, userAnswer) {
    const game = activeGames.get(chatId);
    if (!game) return { found: false };

    game.attempts++;
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const normalizedCorrect = game.riddle.answer.toLowerCase().trim();

    if (normalizedAnswer === normalizedCorrect) {
      activeGames.delete(chatId);
      this.updateScore(chatId, game.difficulty);
      return { correct: true, attempts: game.attempts };
    }

    if (game.attempts >= game.maxAttempts) {
      activeGames.delete(chatId);
      return { failed: true, correctAnswer: game.riddle.answer };
    }

    return { 
      incorrect: true, 
      attempts: game.attempts, 
      maxAttempts: game.maxAttempts,
      hint: game.riddle.hints[game.attempts - 1] 
    };
  }

  static updateScore(chatId, difficulty) {
    const key = `${chatId}`;
    const scores = userScores.get(key) || { easy: 0, medium: 0, hard: 0 };
    
    if (difficulty === 'easy') scores.easy += 1;
    else if (difficulty === 'medium') scores.medium += 2;
    else if (difficulty === 'hard') scores.hard += 3;
    
    userScores.set(key, scores);
    return scores;
  }

  static getScores(chatId) {
    return userScores.get(`${chatId}`) || { easy: 0, medium: 0, hard: 0 };
  }

  static getCurrentGame(chatId) {
    return activeGames.get(chatId);
  }
}

module.exports = RiddleGame;
