const Ticket = require("./ticket.js");
const options = require("./options.js");

/**
 * Validate the entered features based on the game options
 *
 * @param {number || string} id - The id of the ticket, usually a number
 * @param {object} features - Features of the ticket: type, city and quantity
 * @returns {*} - 'True' if all the features are validated otherwise a string containing the features not validated
 */
function validateEnteredFeatures(id, features) {
  const checkList = [
    checkId(id),
    checkType(features.type),
    checkCity(features.city),
    checkQuantity(features.quantity),
  ];

  if (checkList.every((value) => value === true)) {
    return true;
  } else {
    return checkList.filter((value) => value !== true).join("\n");
  }
}

// Validation of the ID
const checkId = (id) => {
  return typeof id === "string" || typeof id === "number"
    ? true
    : "The ID should be a string or a number";
};

// Validation of the type
const checkType = (type) => {
  const typeList = options.ticketFeatures.type;
  return typeList.includes(type)
    ? true
    : `The type should be one of the following: ${typeList.join(" - ")}`;
};

// Validation of the cities
const checkCity = (cityList) => {
  const cities = options.ticketFeatures.cities;
  if (cityList.includes("Tutte")) {
    return true;
  } else {
    return cityList.every((city) => cities.includes(city))
      ? true
      : `The following cities are not included in the lottery game: ${cityList
          .filter((city) => !cities.includes(city))
          .join(" - ")}`;
  }
};

// Validation of the quantity
const checkQuantity = (quantity) => {
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
};

/**
 * Generate a ticket after validating it. If there is something wrong with the validation, a message will report what features were not validated.
 *
 * @param {number || string} id - The id of the ticket, usually a number
 * @param {object} features - Features of the ticket: type, city and quantity
 * @returns {*} - 'True' if all the features are validated otherwise a string containing the features not validated
 */
function generateTicket(id, features) {
  const validation = validateEnteredFeatures(id, features);
  if (validation === true) {
    return new Ticket(id, features);
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
};
