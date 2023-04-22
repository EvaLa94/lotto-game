const generateRandomLotteryNumbers = require("./utils.js");
const options = require("./options.js");

/** Class representing a single extraction */
class Extraction {
  constructor() {
    this.#extractNumbers();
  }

  /**
   * Generate random lottery number for each lottery city
   * @private
   */
  #extractNumbers() {
    for (const city of options.ticketFeatures.cities) {
      this[city] = generateRandomLotteryNumbers(5);
    }
  }

  /**
   * Log the extraction in the console
   */
  printExtraction() {
    for (const city of options.ticketFeatures.cities) {
      console.log(this[city]);
    }
  }

  /**
   * Check if there are any winning tickets
   *
   * @param {array} arrayOfTickets - Array of tickets to be checked against the extraction
   * @returns {array} Array of winning tickets
   */
  checkWinningTickets(arrayOfTickets) {
    const winningTickets = [];

    // Loop through the tickets
    for (const ticket of arrayOfTickets) {
      // Loop through each city of the ticket
      for (const city of ticket.city) {
        // Ticket's type is Ambata
        if (ticket.type === "Ambata") {
          ambataLoop: for (const number of this[city]) {
            if (ticket.numbers.includes(number)) {
              // If an exact number has been found, create an array of the other possible options
              let remainingNumbers = Array.from(ticket.numbers);
              remainingNumbers.splice(remainingNumbers.indexOf(number), 1);
              remainingNumbers = remainingNumbers.flatMap((remainingNumber) => [
                remainingNumber - 1,
                remainingNumber + 1,
              ]);

              // Loop through the other possible options
              for (const remainingNumber of remainingNumbers) {
                if (
                  this[city].includes(remainingNumber) &&
                  remainingNumber !== number
                ) {
                  winningTickets.push(ticket);
                  break ambataLoop;
                }
              }
            }
          }

          // Ticket's type is one of the following: Ambo, Terno, Quaterna, Cinquina
        } else {
          let count = 0;

          this[city].forEach((number) => {
            if (ticket.numbers.includes(number)) {
              count++;
            }
          });

          if (count >= options.ticketFeatures.typeMinNumber[ticket.type]) {
            winningTickets.push(ticket);
          }
        }
      }
    }
    return winningTickets;
  }
}

module.exports = Extraction;
