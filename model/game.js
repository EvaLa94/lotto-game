const Ticket = require('../model/ticket.js');

class Game {

    quantityQuestion = [{
        type: 'number',
            name: 'ticketQuantity',
            message: 'How many tickets would you like to generate?',
            validate(value) {
                if (value > 0 && value <= 10) {
                  return true;
                } else {
                    return 'Please enter a number between 1 and 10.';
                }
              },
    }]

    ticketQuestions = [
        {
            type: 'checkbox',
            name: 'city',
            message: 'Enter one or more cities:',
            choices: ['Bari', 'Cagliari', 'Firenze', 'Genova', 'Milano', 'Napoli', 'Palermo', 'Roma', 'Torino', 'Venezia', 'Tutte'],
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
            choices: ['Ambata', 'Ambo', 'Terno', 'Quaterna', 'Cinquina'],
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
                let minNumber;
                const numbers = [];
                switch (answers.type) {
                    case 'Ambata' || 'Ambo':
                        minNumber = 2;
                      break;
                    case 'Terno':
                        minNumber = 3;
                      break;
                    case 'Quaterna':
                        minNumber = 4;
                    break;
                    case 'Cinquina':
                        minNumber = 5;
                    break;
                  }
                while (minNumber <= 10){
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
        let i = this.ticketQuantity;
        while (i > 0){
            const answers = await this.getInput(this.ticketQuestions);
            const ticket = new Ticket(answers); 
            tickets.push(ticket);
            i--;
        }
        return tickets;
    }

    async init(){
        this.ticketQuantity = await this.getInput(this.quantityQuestion).then(answers => answers.ticketQuantity);
        this.tickets = await this.generateTickets();
        console.log(this.tickets)
    }
}

module.exports = Game;