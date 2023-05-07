const Ticket = require("./ticket.js");
const Extraction = require("./extraction.js");
const { validateEnteredFeatures } = require("../controller/validation.js");

/** Class representing a lottery game */
class Game {
  constructor() {
    this.idCount = 1;
    this.tickets = [];
    this.extraction = {};
  }

  /**
   * Create a new ticket and push it to this.tickets
   *
   * @param {string} type - The ticket's type (Ambata, Ambo, Terno, Quaterna or Cinquina)
   * @param {string} city - The ticket's city ("Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia", or "Tutte")
   * @param {number} quantity - How many numbers each ticket should have
   * @param {number} bet - Amount of the bet
   * @returns {object} - The newly generated ticket
   */
  addTicket(type, city, quantity, bet) {
    if (validateEnteredFeatures(this.idCount, type, city, quantity, bet)) {
      const ticket = new Ticket(this.idCount, type, city, quantity, bet);
      this.tickets.push(ticket);
      this.idCount++;
      return ticket;
    } else {
      return false;
    }
  }

  /**
   * Perform a new lottery extraction
   */
  performExtraction() {
    const extraction = new Extraction();
    this.extraction = extraction.extraction;
  }

  checkWinningTickets() {
    for (const ticket of this.tickets) {
      ticket.checkWinningTicket(this.extraction);
    }
  }

  /**
   * Loop through this.tickets and get the tickets that are winning
   *
   * @returns {array} - The winning tickets
   */
  getWinningTickets() {
    return this.tickets.filter((ticket) => ticket.isWinning);
  }

  /**
   * Print the tickets in the console
   */
  printTickets() {
    for (const ticket of this.tickets) {
      console.log(ticket.printTicket());
    }
  }

  /**
   * Loop throught the winning tickets and print the tickets and their gross and net winnings
   */
  printWinningTickets() {
    for (const ticket of this.getWinningTickets()) {
      console.log(
        `${ticket.printTicket()}The gross winning is: € ${ticket.grossWin.toFixed(
          2
        )}\nThe net winning is: € ${ticket.netWin.toFixed(2)}\n`
      );
    }
  }
}

module.exports = Game;
