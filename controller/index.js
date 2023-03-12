const Ticket = require('../model/ticket.js');

async function getInput(){
    const inquirer = await import('inquirer'); 

    const questions = [
        {
            type: 'checkbox',
            name: 'city',
            message: 'Enter one or more cities:',
            choices: ['Bari', 'Cagliari', 'Firenze', 'Genova', 'Milano', 'Napoli', 'Palermo', 'Roma', 'Torino', 'Venezia', 'Tutte'],
        },
        {
            type: 'list',
            name: 'type',
            message: 'Enter the type of the bill:',
            choices: ['Ambata', 'Ambo', 'Terno', 'Quaterna', 'Cinquina'],
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
        }
    ]
    const answers = await inquirer.default.prompt(questions);

    return answers;
}

getInput().then(answers => {
    const ticket = new Ticket(answers); 
    console.log(ticket);
})