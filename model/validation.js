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
    checkType(features),
    checkCity(features),
    checkQuantity(features),
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
const checkType = (features) => {
  const typeList = options.ticketFeatues.type;
  return typeList.includes(features.type)
    ? true
    : `The type should be one of the following: ${typeList.join(" - ")}`;
};

// Validation of the cities
const checkCity = (features) => {
  const cities = options.ticketFeatues.cities;
  if (features.city.includes("Tutte")) {
    return true;
  } else {
    return features.city.every((city) => cities.includes(city))
      ? true
      : `The following cities are not included in the lottery game: ${features.city
          .filter((city) => !cities.includes(city))
          .join(" - ")}`;
  }
};

// Validation of the quantity
const checkQuantity = (features) => {
  const min = options.ticketFeatues.numberQuantity.min;
  const max = options.ticketFeatues.numberQuantity.max;
  const checkMin =
    features.quantity >= min
      ? true
      : `The minimum entered quantity should be ${min}`;
  const checkMax =
    features.quantity <= max
      ? true
      : `The maximum entered quantity should be ${max}`;
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

module.exports = { validateEnteredFeatures, generateTicket };
