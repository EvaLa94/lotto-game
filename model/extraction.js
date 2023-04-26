const generateRandomLotteryNumbers = require("../controller/utils.js");
const options = require("../controller/options.js");

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
    for (const city of options.ticketFeatures.cities) {
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
