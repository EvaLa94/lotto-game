const generateRandomLotteryNumbers = require("../controller/utils/utils");
const { AsciiTable3, AlignmentEnum } = require("ascii-table3");

/** Class representing a single ticket */
class Ticket {
  /**
   * Generate the ticket
   *
   * @param {number|string} id - The ticket's id number
   * @param {string} type - The ticket's type (Ambata, Ambo, Terno, Quaterna or Cinquina)
   * @param {string} city - The ticket's city ("Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia", or "Tutte")
   * @param {number} quantity - How many numbers each ticket should have
   * @param {number} bet - Amount of the bet
   */
  constructor(id, type, city, quantity, bet) {
    this.id = id;
    this.type = type;
    this.city = city;
    this.numbers = this.#generateNumbers(quantity);
    this.bet = bet;
  }

  /**
   * Generate the random numbers of the ticket
   *
   * @param {number} quantity - Quantity of numbers to be generated
   * @returns {array} - Sorted array of numbers
   */
  #generateNumbers(quantity) {
    return generateRandomLotteryNumbers(quantity);
  }

  /**
   * Print the ticked in a nice ascii format, with the informations from the constructor
   *
   * @returns {string} - Return the ticket in a string format
   */
  printTicket() {
    const table = new AsciiTable3(`TICKET #${this.id.toString()}`)
      .setAlign(3, AlignmentEnum.CENTER)
      .addRowMatrix([
        ["City", this.city],
        ["Type", this.type],
        ["Numbers", this.numbers.join(" - ")],
        ["Bet", `${this.bet.toFixed(2)} €`],
      ]);

    return table.toString();
  }
}

module.exports = Ticket;
