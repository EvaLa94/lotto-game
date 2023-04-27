const Ticket = require("../model/ticket");
const options = require("./options.js");

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

  if (checkList.every((value) => value === true)) {
    return true;
  } else {
    return checkList.filter((value) => value !== true).join("\n");
  }
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

/**
 * Generate a ticket after validating it. If there is something wrong with the validation, a message will report what features were not validated.
 *
 * @param {number|string} id - The ticket's id number
 * @param {string} type - The ticket's type (Ambata, Ambo, Terno, Quaterna or Cinquina)
 * @param {string} city - The ticket's city ("Bari", "Cagliari", "Firenze", "Genova", "Milano", "Napoli", "Palermo", "Roma", "Torino", "Venezia", or "Tutte")
 * @param {number} quantity - How many numbers each ticket should have
 * @param {number} bet - Amount of the bet
 * @returns {*} - 'True' if all the features are validated otherwise a string containing the features not validated
 */
function generateTicket(id, type, city, quantity, bet) {
  const validation = validateEnteredFeatures(id, type, city, quantity, bet);
  if (validation === true) {
    return new Ticket(id, type, city, quantity, bet);
  } else {
    return `There was one or more errors while generating the ticket:\n${validation}\nThe Ticket was not generated`;
  }
}

module.exports = {
  validateEnteredFeatures,
  generateTicket,
  checkId,
  checkType,
  checkCity,
  checkQuantity,
  checkBet,
};
