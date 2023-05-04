const { options } = require("./options.js");

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
    quantity <= options.ticketFeatures.numberQuantity.max
      ? quantity
      : options.ticketFeatures.numberQuantity.max;
  while (randomNumbers.size < quantity) {
    const random = Math.floor(
      Math.random() * options.ticketFeatures.randomNumber.max +
        options.ticketFeatures.randomNumber.min
    );
    randomNumbers.add(random);
  }
  return Array.from(randomNumbers).sort((a, b) => a - b);
}

module.exports = generateRandomLotteryNumbers;
