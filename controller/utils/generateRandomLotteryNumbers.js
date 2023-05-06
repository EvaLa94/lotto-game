const { optionsTicket } = require("../optionGame/optionsTicket.js");

/**
 * Generate random numbers for both the lottery ticket and the lottery extraction
 * The minimum and maximum allowed numbers are extracted from the options
 *
 * @param {number} quantity - Quantity of numbers to be generated
 * @returns {array} - Sorted array of numbers
 */
function generateRandomLotteryNumbers(quantity) {
  const randomNumbers = new Set();
  quantity =
    quantity <= optionsTicket.ticketFeatures.numberQuantity.max
      ? quantity
      : optionsTicket.ticketFeatures.numberQuantity.max;
  while (randomNumbers.size < quantity) {
    const random = Math.floor(
      Math.random() * optionsTicket.ticketFeatures.randomNumber.max +
        optionsTicket.ticketFeatures.randomNumber.min
    );
    randomNumbers.add(random);
  }
  return Array.from(randomNumbers).sort((a, b) => a - b);
}

module.exports = generateRandomLotteryNumbers;
