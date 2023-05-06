const Game = require("../model/game.js");
const { optionsTicket } = require("./optionGame/optionsTicket.js");
const { checkQuantity, checkBet } = require("./validation.js");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Main function
async function promptUser(game) {
  console.log(yellow, `Choose your move:`);

  console.log(`1. Add a new ticket
2. Print tickets
3. Extract (new) numbers
4. Print the extraction
5. Check for winning tickets and print them
0. Exit`);

  readline.question("> ", async (answer) => {
    const callback = actionOptions[answer];
    if (answer === "1") {
      await addTicket(game);
    } else if (callback) {
      callback(game);
    } else if (answer === "0") {
      console.log(blue, "The game has ended.");
      readline.close();
    } else {
      console.log(red, "Invalid option");
      promptUser(game);
    }
  });
}

// Colors
const yellow = "\x1b[33m%s\x1b[0m";
const red = "\x1b[31m%s\x1b[0m";
const green = "\x1b[32m%s\x1b[0m";
const blue = "\x1b[34m%s\x1b[0m";

// Action options

const actionOptions = {
  1: addTicket,
  2: printTickets,
  3: performExtraction,
  4: printExtraction,
  5: checkWinningTickets,
};

// Add a ticket
async function addTicket(game) {
  const type = await chooseType(game);
  const city = await chooseCity(game);
  const quantity = await chooseQuantity(game, type);
  const bet = await chooseBet(game);
  game.addTicket(type, city, quantity, bet);
  console.log(green, "Ticket added!");
  promptUser(game);
}

function chooseType(game) {
  // Set the type options
  const typeOptions = {};
  for (let i = 0; i < optionsTicket.ticketFeatures.type.length; i++) {
    typeOptions[i + 1] = optionsTicket.ticketFeatures.type[i];
  }

  // Print the options in the console
  console.log(yellow, `Choose the ticket type:`);
  console.log("0. Cancel operation");
  for (const [key, value] of Object.entries(typeOptions)) {
    console.log(`${key}. ${value}`);
  }

  // Return entered option
  return new Promise((resolve, reject) => {
    readline.question("> ", (answer) => {
      const chosenType = typeOptions[answer];
      if (answer === "0") {
        console.log(red, "Operation canceled");
        promptUser(game);
      } else if (chosenType) {
        resolve(chosenType);
      } else {
        console.log(red, "Invalid input");
        chooseType(game).then(resolve);
      }
    });
  });
}

function chooseCity(game) {
  // Set the city options
  const cityOptions = {};
  for (let i = 0; i < optionsTicket.ticketFeatures.cities.length; i++) {
    cityOptions[i + 1] = optionsTicket.ticketFeatures.cities[i];
  }
  cityOptions[optionsTicket.ticketFeatures.cities.length + 1] = "Tutte";

  // Print the options in the console
  console.log(yellow, `Choose the ticket city:`);
  console.log("0. Cancel operation");
  for (const [key, value] of Object.entries(cityOptions)) {
    console.log(`${key}. ${value}`);
  }

  // Return entered option
  return new Promise((resolve, reject) => {
    readline.question("> ", (answer) => {
      const chosenCity = cityOptions[answer];
      if (answer === "0") {
        console.log(red, "Operation canceled");
        promptUser(game);
      } else if (chosenCity) {
        resolve(chosenCity);
      } else {
        console.log(red, "Invalid input");
        chooseCity(game).then(resolve);
      }
    });
  });
}

function chooseQuantity(game, type) {
  console.log(
    yellow,
    `Choose how many numbers should have the ticket, or enter 0 to cancel the operation`
  );

  return new Promise((resolve, reject) => {
    readline.question("> ", (answer) => {
      if (answer === "0") {
        console.log(red, "Operation canceled");
        promptUser(game);
      } else if (checkQuantity(answer, type) === true) {
        resolve(answer);
      } else {
        console.log(red, checkQuantity(answer, type));
        chooseQuantity(game, type).then(resolve);
      }
    });
  });
}

function chooseBet(game) {
  console.log(
    yellow,
    `Choose how much to bet, or enter 0 to cancel the operation`
  );

  return new Promise((resolve, reject) => {
    readline.question("> ", (answer) => {
      if (answer === "0") {
        console.log(red, "Operation canceled");
        promptUser(game);
      } else if (checkBet(answer) === true) {
        resolve(+answer);
      } else {
        console.log(red, checkBet(answer));
        chooseBet(game).then(resolve);
      }
    });
  });
}

// Extraction

function performExtraction(game) {
  if (game.getWinningTickets().length > 0) {
    console.log(
      red,
      "There are already some winning tickets, it is not possible to perform a new extraction."
    );
  } else {
    game.performExtraction();
    console.log(green, "The extraction has been performed!");
  }

  promptUser(game);
}

function printExtraction(game) {
  if (Object.keys(game.extraction).length === 0) {
    console.log(red, "You need to perform an extraction!");
  } else {
    console.log("Extracted numbers:");
    for (const [key, value] of Object.entries(game.extraction)) {
      console.log(key, value);
    }
  }

  promptUser(game);
}

// Print tickets

function printTickets(game) {
  if (game.tickets.length > 0) {
    for (const ticket of game.tickets) {
      console.log(ticket.printTicket());
    }
  } else console.log(red, "There are no tickets, please add one.");
  promptUser(game);
}

// Winning tickets

function checkWinningTickets(game) {
  if (Object.keys(game.extraction).length === 0) {
    console.log(red, "You should perform an extraction!");
  } else if (Object.keys(game.tickets).length === 0) {
    console.log(red, "You should add at least one ticket!");
  } else {
    game.checkWinningTickets();
    if (game.getWinningTickets().length > 0) {
      game.printWinningTickets();
    } else {
      console.log(yellow, "None of your tickets won!");
    }
  }
  promptUser(game);
}

module.exports = { promptUser };
