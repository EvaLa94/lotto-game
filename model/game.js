const Ticket = require("./ticket.js");
const Extraction = require("./extraction.js");
const { optionsTicket } = require("../controller/optionGame/optionsTicket.js");
const { winningTable } = require("../controller/optionGame/winningTable.js");
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
   * Print the tickets in the console
   */
  printTickets() {
    for (const ticket of this.tickets) {
      console.log(ticket.printTicket());
    }
  }

  /**
   * Perform a new lottery extraction
   *
   * @returns {object} - The game's extraction
   */
  performExtraction() {
    const extraction = new Extraction();
    this.extraction = extraction.extraction;
    return extraction;
  }

  /**
   * Check if there are any winning tickets
   *
   * @returns {array} - All the winning tickets
   */
  checkWinningTickets() {
    // Loop through the tickets
    for (const ticket of this.tickets) {
      const cityArray =
        ticket.city === "Tutte"
          ? optionsTicket.ticketFeatures.cities
          : [ticket.city];

      // Loop through the cities of the ticket
      for (const city of cityArray) {
        let count = 0;
        this.extraction[city].forEach((number) => {
          if (ticket.numbers.includes(number)) {
            count++;
          }
        });

        // If the ticket is winning
        if (count >= optionsTicket.ticketFeatures.typeMinNumber[ticket.type]) {
          if (ticket.hasOwnProperty("isWinning")) {
            ticket.grossWin += this.#calculateGrossWinning(ticket);
            ticket.netWin += this.#calculateNetWinning(ticket);
          } else {
            ticket.isWinning = true;
            ticket.grossWin = this.#calculateGrossWinning(ticket);
            ticket.netWin = this.#calculateNetWinning(ticket);
          }
        }
      }
    }
  }

  /**
   * Calculate the gross winning of a winning ticket
   *
   * @private
   *
   * @param {object} ticket - A winning ticket
   * @returns {number} - The gross amount of the winning
   */
  #calculateGrossWinning(ticket) {
    const multiplier = winningTable[ticket.type][ticket.numbers.length];
    const divisor = ticket.city === "Tutte" ? 10 : 1;
    return (multiplier * ticket.bet) / divisor;
  }

  /**
   * Calculate the net winning of a winning ticket
   *
   * @private
   *
   * @param {object} ticket - A winning ticket
   * @returns {number} - The net amount of the winning
   */
  #calculateNetWinning(ticket) {
    const multiplier = winningTable[ticket.type][ticket.numbers.length];
    const divisor = ticket.city === "Tutte" ? 10 : 1;
    return (multiplier * ticket.bet * (1 - 0.08)) / divisor;
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
