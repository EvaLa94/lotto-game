const Ticket = require('../model/ticket.js');
const Game = require('../model/game.js');

const game = new Game;
game
.init()
.then(() => {
    for (const ticket of game.tickets){
        console.log(ticket.printTicket());
    }
})