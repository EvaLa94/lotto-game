const Game = require("../model/game.js");
const { promptUser } = require("./prompt.js");

// Initialize the game in the console
const game = new Game();
promptUser(game);
