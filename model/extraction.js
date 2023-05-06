const generateRandomLotteryNumbers = require("../controller/utils/generateRandomLotteryNumbers.js");
const { optionsTicket } = require("../controller/optionGame/optionsTicket.js");

/** Class representing a single extraction */
class Extraction {
  constructor() {
    this.extraction = this.#extractNumbers();
  }

  /**
   * Generate random lottery number for each lottery city
   * @private
   */
  #extractNumbers() {
    const extraction = {};
    for (const city of optionsTicket.ticketFeatures.cities) {
      extraction[city] = generateRandomLotteryNumbers(5);
    }
    return extraction;
  }

  /**
   * Log the extraction in the console
   */
  printExtraction() {
    console.log(this.extraction);
  }
}

module.exports = Extraction;
