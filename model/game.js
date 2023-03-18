const Ticket = require("../model/ticket.js");
const options = require("../model/options.js");
const validateEnteredFeatures = require("../model/validation.js");

/** Class representing a game where multiple tickets can be generated */
class Game {
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
      choices: options.ticketFeatues.cities.concat(["Tutte"]),
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
      choices: options.ticketFeatues.type,
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
        let minNumber = options.ticketFeatues.typeMinNumber[answers.type];
        while (minNumber <= options.ticketFeatues.numberQuantity.max) {
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
   * Initialize the game
   *
   * @async
   */
  async initWithPrompt() {
    this.ticketQuantity = await this.getInput(this.quantityQuestion).then(
      (answers) => answers.ticketQuantity
    );
    this.tickets = await this.generateTickets();
  }

  async initWitInput(ticketQuantity, arrayOfAnswers) {
    this.isInitWithInput = true;
    this.ticketQuantity = ticketQuantity;
    this.tickets = await this.generateTickets(arrayOfAnswers);
  }
}

module.exports = Game;
