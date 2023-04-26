const Game = require("../model/game.js");
const { validateEnteredFeatures, generateTicket } = require("./validation.js");

// Initialize a new game where the answers are entered in the console
const firstGame = new Game();
firstGame.initWithPrompt().then(() => {
  for (const ticket of firstGame.tickets) {
    console.log(ticket.printTicket());
  }
});
/*
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

secondGame.initWithInput([input1, input2]).then(() => {
  for (const ticket of secondGame.tickets) {
    console.log(ticket.printTicket());
  }
});

// Generate a new ticket without creating a game
const ticket = generateTicket(1, input1);
console.log(ticket.printTicket());
*/
