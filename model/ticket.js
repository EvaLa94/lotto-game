const generateRandomLotteryNumbers = require("../controller/utils/generateRandomLotteryNumbers.js");
const { winningTable } = require("../controller/optionGame/winningTable.js");
const { optionsTicket } = require("../controller/optionGame/optionsTicket.js");
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
    this.isWinning = false;
    this.grossWin = 0;
    this.netWin = 0;
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

  /**
   * Check if the ticket is winning
   */
  checkWinningTicket(extraction) {
    const cityArray =
      this.city === "Tutte" ? optionsTicket.ticketFeatures.cities : [this.city];

    // Loop through the cities of the ticket
    for (const city of cityArray) {
      let count = 0;
      extraction[city].forEach((number) => {
        if (this.numbers.includes(number)) {
          count++;
        }
      });

      // If the ticket is winning
      if (count >= optionsTicket.ticketFeatures.typeMinNumber[this.type]) {
        this.isWinning = true;
        this.grossWin += this.#calculateGrossWinning();
        this.netWin += this.#calculateNetWinning();
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
  #calculateGrossWinning() {
    const multiplier = winningTable[this.type][this.numbers.length];
    const divisor = this.city === "Tutte" ? 10 : 1;
    return (multiplier * this.bet) / divisor;
  }

  /**
   * Calculate the net winning of a winning ticket
   *
   * @private
   *
   * @param {object} ticket - A winning ticket
   * @returns {number} - The net amount of the winning
   */
  #calculateNetWinning() {
    const multiplier = winningTable[this.type][this.numbers.length];
    const divisor = this.city === "Tutte" ? 10 : 1;
    return (multiplier * this.bet * (1 - 0.08)) / divisor;
  }
}

module.exports = Ticket;
