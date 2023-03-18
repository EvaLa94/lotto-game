const Game = require("../model/game.js");

// Initialize a new game where the answers are entered in the console
const firstGame = new Game();
firstGame.initWithPrompt().then(() => {
  for (const ticket of game.tickets) {
    console.log(ticket.printTicket());
  }
});

// Initialize a new game where the answers are entered directly from the code
const secondGame = new Game();
const input1 = {
  type: "Ambo",
  city: ["Bari", "Cagliari", "Firenze"],
  quantity: 3,
};
const input2 = {
  type: "Ambo",
  city: ["Tutte"],
  quantity: 5,
};

secondGame.initWitInput(2, [input1, input2]).then(() => {
  for (const ticket of game.tickets) {
    console.log(ticket.printTicket());
  }
});
