const Ticket = require('../model/ticket.js');
const options = require('../model/options.js');

class Game {

    quantityQuestion = [{
        type: 'number',
            name: 'ticketQuantity',
            message: 'How many tickets would you like to generate?',
            validate(value) {
                if (value > options.ticketQuantity.min - 1 && value <= options.ticketQuantity.max) {
                  return true;
                } else {
                    return `Please enter a number between ${options.ticketQuantity.min} and ${options.ticketQuantity.max}.`;
                }
              },
    }]

    ticketQuestions = [
        {
            type: 'checkbox',
            name: 'city',
            message: 'Enter one or more cities:',
            choices: options.ticketFeatues.cities.concat(['Tutte']),
            validate(value) {
                if (value.length > 0) {
                  return true;
                } else {
                    return 'Please select at least one city.';
                }
              },
        },
        {
            type: 'list',
            name: 'type',
            message: 'Enter the type of the bill:',
            choices: options.ticketFeatues.type,
            validate(value) {
                if (value !== '') {
                  return true;
                } else {
                    return 'Please select a ticket type.';
                }
              },
        },
        {
            type: 'list',
            name: 'quantity',
            message: 'How many numbers would you like to generate?',
            choices: answers => {
                const numbers = [];
                let minNumber = options.ticketFeatues.typeMinNumber[answers.type];
                while (minNumber <= options.ticketFeatues.numberQuantity.max){
                    numbers.push(minNumber);
                    minNumber++;
                }
                return numbers;
            },
            validate(value) {
                if (value !== '') {
                  return true;
                } else {
                    return 'Please select a number.';
                }
              },
        }
    ];

    async getInput(questions){
        const inquirer = await import('inquirer'); 
        const answers = await inquirer.default.prompt(questions);
        return answers;
    }

    async generateTickets(){
        const tickets = [];
        let i = 1;
        while (i <= this.ticketQuantity){
            const answers = await this.getInput(this.ticketQuestions);
            const ticket = new Ticket(i, answers); 
            tickets.push(ticket);
            i++;
        }
        return tickets;
    }

    async init(){
        this.ticketQuantity = await this.getInput(this.quantityQuestion).then(answers => answers.ticketQuantity);
        this.tickets = await this.generateTickets();
    }
}

module.exports = Game;