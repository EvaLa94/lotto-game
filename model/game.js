const Ticket = require("./ticket.js");
const Extraction = require("./extraction.js");
const options = require("../controller/options.js");
const { validateEnteredFeatures } = require("../controller/validation.js");

/** Class representing a lottery game */
class Game {
  constructor() {
    this.extraction = new Extraction();
  }
  // Question parameters to generate a ticket with "inquirer"
  quantityQuestion = [
    {
      type: "number",
      name: "ticketQuantity",
      message: "How many tickets would you like to generate?",
      validate(value) {
        if (
          value > options.ticketQuantity.min - 1 &&
          value <= options.ticketQuantity.max
        ) {
          return true;
        } else {
          return `Please enter a number between ${options.ticketQuantity.min} and ${options.ticketQuantity.max}.`;
        }
      },
    },
  ];

  // Question parameters to get the number of tickets to be generated
  ticketQuestions = [
    {
      type: "checkbox",
      name: "city",
      message: "Enter one or more cities:",
      choices: options.ticketFeatures.cities.concat(["Tutte"]),
      validate(value) {
        if (value.length > 0) {
          return true;
        } else {
          return "Please select at least one city.";
        }
      },
    },
    {
      type: "list",
      name: "type",
      message: "Enter the type of the bill:",
      choices: options.ticketFeatures.type,
      validate(value) {
        if (value !== "") {
          return true;
        } else {
          return "Please select a ticket type.";
        }
      },
    },
    {
      type: "list",
      name: "quantity",
      message: "How many numbers would you like to generate?",
      choices: (answers) => {
        const numbers = [];
        let minNumber = options.ticketFeatures.typeMinNumber[answers.type];
        while (minNumber <= options.ticketFeatures.numberQuantity.max) {
          numbers.push(minNumber);
          minNumber++;
        }
        return numbers;
      },
      validate(value) {
        if (value !== "") {
          return true;
        } else {
          return "Please select a number.";
        }
      },
    },
  ];

  /**
   * Use the module "inquirer" to get answers from the user
   *
   * @async
   * @param {object} questions - Question parameters used to generate the tickets
   * @returns {object} - Return an object containing all the replies
   */
  async getInput(questions) {
    const inquirer = await import("inquirer");
    const answers = await inquirer.default.prompt(questions);
    return answers;
  }

  /**
   * Loop function that generate new tickets based on the input of the user
   *
   * @async
   * @returns {array} - Return an array containing all the generated tickets
   */
  async generateTickets(arrayOfAnswers) {
    const tickets = [];
    let i = 1;
    while (i <= this.ticketQuantity) {
      const answers = this.hasOwnProperty("isInitWithInput")
        ? arrayOfAnswers[i - 1]
        : await this.getInput(this.ticketQuestions);

      const validation = validateEnteredFeatures(i, answers);
      if (validation === true) {
        const ticket = new Ticket(i, answers);
        tickets.push(ticket);
        i++;
      } else {
        console.log(validation);
        i++;
        continue;
      }
    }
    return tickets;
  }

  /**
   * Initialize the game with the prompts in the console
   *
   * @async
   */
  async initWithPrompt() {
    this.ticketQuantity = await this.getInput(this.quantityQuestion).then(
      (answers) => answers.ticketQuantity
    );
    this.tickets = await this.generateTickets();
  }

  /**
   * Initialize the game with the input
   *
   * @async
   *
   * @param {array} arrayOfTickets - An array of objects, where each object represent the features of the ticket: type, city and quantity
   */
  async initWithInput(arrayOfTickets) {
    this.isInitWithInput = true;
    this.ticketQuantity = arrayOfTickets.length;
    this.tickets = await this.generateTickets(arrayOfTickets);
  }

  /**
   * Check if there are any winning tickets
   *
   * @param {*} arrayOfTickets - Array of tickets to be checked against the extraction
   * @returns {string} - If there are winning tickets, return the tickets printed in the ascii format, otherwise return "None of your tickets won."
   */
  checkWinningTickets(arrayOfTickets) {
    this.winningTickets = this.extraction.checkWinningTickets(arrayOfTickets);
    if (this.winningTickets.length > 0) {
      let printedTickets = "";
      for (const winningTicket of this.winningTickets) {
        printedTickets += winningTicket.printTicket() + "\n";
      }
      return printedTickets;
    } else {
      return "None of your tickets won.";
    }
  }
}

module.exports = Game;
