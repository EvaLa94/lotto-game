const Ticket = require("../model/ticket");
const { options } = require("./options.js");

/**
 * Validate the entered features based on the game options
 *
 * @param {number|string} id - The ticket's id number
 * @param {string} type - The ticket's type (Ambata, Ambo, Terno, Quaterna or Cinquina)
 * @param {string} city - The ticket's city ("Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia", or "Tutte")
 * @param {number} quantity - How many numbers each ticket should have
 * @param {number} bet - Amount of the bet
 */
function validateEnteredFeatures(id, type, city, quantity, bet) {
  const checkList = [
    checkId(id),
    checkType(type),
    checkCity(city),
    checkQuantity(quantity),
    checkBet(bet),
  ];

  return checkList.every((value) => value === true);
}

// Validation of the ID
function checkId(id) {
  return typeof id === "string" || typeof id === "number"
    ? true
    : "The ID should be a string or a number";
}

// Validation of the type
function checkType(type) {
  const typeList = options.ticketFeatures.type;
  return typeList.includes(type)
    ? true
    : `The type should be one of the following: ${typeList.join(" - ")}`;
}

// Validation of the cities
function checkCity(city) {
  const possibleCities = options.ticketFeatures.cities;
  if (city === "Tutte" || possibleCities.includes(city)) {
    return true;
  } else {
    return `The entered city is not included in the lottery game`;
  }
}

// Validation of the quantity
function checkQuantity(quantity) {
  const min = options.ticketFeatures.numberQuantity.min;
  const max = options.ticketFeatures.numberQuantity.max;
  const checkMin =
    quantity >= min ? true : `The minimum entered quantity should be ${min}`;
  const checkMax =
    quantity <= max ? true : `The maximum entered quantity should be ${max}`;
  const checkList = [checkMin, checkMax];

  return checkList.every((value) => value === true)
    ? true
    : checkList.filter((value) => value !== true);
}

// Validation of the bet
function checkBet(bet) {
  return typeof bet === "number" ? true : "The bet should be a number";
}

module.exports = {
  validateEnteredFeatures,
  checkId,
  checkType,
  checkCity,
  checkQuantity,
  checkBet,
};
