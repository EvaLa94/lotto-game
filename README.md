# Lottery game :moneybag:

This project simulates the creation of lottery tickets.

This is the first of three part of <a href="https://www.tomorrowdevs.com/">TomorrowDevs</a> project for Milestone 6. 
Read <a href="https://github.com/tomorrowdevs-projects/programming-basics/tree/main/projects/m6/001-lotto-game">here</a> the prompt. 

More about the Italian lottery game (written in Italian):
- https://www.sisal.it/lotto/come-si-gioca
- https://www.servizitelevideo.rai.it/televideo/pub/pagina.jsp?p=786&s=0&r=Nazionale&idmenumain=0

## Table of Contents 
- [Project description](#project-description)<br>
  - [Ticket class](#ticket-class)<br>
  - [Game class](#game-class)<br>
  - [Game options](#game-options)<br>
- [Install and Run the Project](#install-and-run-the-project)<br>
- [How to Use the Project](#how-to-use-the-project)<br>
  - [Generate a single ticket](#generate-a-single-ticket)
  - [Generate a game with initWithPrompt](#generate-a-game-with-initwithprompt)
  - [Generate a game with initWithInput](#generate-a-game-with-initwithinput)
- [Future improvements](#future-improvements)<br>

## Project description
The project is structured in the following folders: 
- :file_folder: model
  - ticket.js &rarr; This file contains the Ticket class, that represents a single ticket.
  - game.js &rarr; This file contains the Game class, that represents a game of lottery, where multiple tickets are generated.
  - options.js &rarr; This file contains the game options, that can be changed in order to customize the experience. 
  - validation &rarr; This file contains the validation for the creation of tickets.
- :file_folder: controller
    - index.js &rarr; This file initializes a new game and then prints all the generated tickets.

### Ticket class

The Ticket Class allows to generate a new ticket starting from a few features: 
- **Type**: Ambata, Ambo, Terno, Quaterna, Cinquina
- **City**: Bari, Cagliari, Firenze, Genova, Milano, Napoli, Palermo, Roma, Torino, Venezia or Tutte (all the previous cities)
- **Quantity**: quantity of numbers to be generated

The creation of a ticket looks like this:
```javascript
const ticketFeatures = {
  type: 'Ambo',
  city: [ 'Bari', 'Cagliari', 'Firenze' ],
  quantity: 3,
}

const ticket = generateTicket(1, ticketFeatures) // The first parameter is the id, i.e. the number of the ticket
```

This is the result:
```javascript
Ticket {
  id: 1,
  type: 'Ambo',
  city: [ 'Bari', 'Cagliari', 'Firenze' ],
  numbers: [ 6, 17, 25 ]
}
```

By using the *printTicket()* method, the ticket will be printed in a nice ascii format:
```
+-------------------------------------+
|              TICKET #1              |
+---------+---------------------------+
| City    | Bari - Cagliari - Firenze |
| Type    | Ambo                      |
| Numbers | 56 - 81 - 88              |
+---------+---------------------------+
```

### Game class

The Game class allows to generate a new lottery game. 
In each game, the user needs to enter in the console how many tickets they wish to generate. As per default options, the number of tickets should be included between 1 and 5. 

The game can be generated in two different ways: 
1. It can generates the tickets based on the information entered in the console by the user. In this case, after instantiating a new game, the method *initWithPrompt()* should be used.
See here the example code: 
[Generate a game with initWithPrompt](#generate-a-game-with-initwithprompt)
2. It can generates the tickets based on the information entered as parameter in the format of array of objects. In this case, after instantiating a new game, the method *initWithInput()* should be used.
See here the example code: 
[Generate a game with initWithInput](#generate-a-game-with-initwithinput)

### Game options
In this file it is possible to customize the options of the game. Do not change this file if you wish to experience a simulation closest to the actual Italian lottery game (without the winning :wink:).

What options can be customized: 

- The **minimun** and **maximum number of tickets** that can be generated. This option is used inside the Game class.

```javascript
const options = {
    ticketQuantity: { 
        min: 1,
        max: 5
    },
    [...]
}
```

- The **cities**, aka the "ruote"
```javascript
const options = {
    [...]
    ticketFeatues: {
        cities: ['Bari', 'Cagliari', 'Firenze', 'Genova', 'Milano', 'Napoli', 'Palermo', 'Roma', 'Torino', 'Venezia'],
    [...]
    }
}
```

- The ticket **type**:
```javascript
const options = {
    [...]
    ticketFeatues: {
        type: ['Ambata', 'Ambo', 'Terno', 'Quaterna', 'Cinquina'],
    [...]
    }
}
```

- Based on the ticket type, the **minimum quantity of numbers** that will be possible to generate:
```javascript
const options = {
    [...]
    ticketFeatues: {
        typeMinNumber: { 
            'Ambata': 1,
            'Ambo': 2,
            'Terno': 3,
            'Quaterna': 4,
            'Cinquina': 5
        },
    [...]
    }
}
```

- How many **numbers** will have each ticket:
```javascript
const options = {
    [...]
    ticketFeatues: {
        numberQuantity: {
            min: 1,
            max: 10
        },
    [...]
    }
}
```
- **Range of the numbers** that will be generated:
```javascript
const options = {
    [...]
    ticketFeatues: {
    [...]
        randomNumber: { 
            min: 1,
            max: 90
        }
    }

}
```


## Install and Run the Project

Download or clone this project, then open it with your favorite IDE. 
In order to install the dependencies, run the following command in your terminal:

```sh
npm install
```
In order to start a new game, run the following command in your terminal:

```sh
npm start
```

## How to Use the Project
This project offers you the following possibilities: 

### Generate a single ticket
```javascript
const ticketFeatures = {
  type: 'Ambo',
  city: [ 'Bari', 'Cagliari', 'Firenze' ],
  quantity: 3,
}

const ticket = new Ticket(1, ticketFeatures) // The first parameter is the id, i.e. the number of the ticket
```
You can use the *printTicket()* method in order to print this ticket in a nice ascii table.

### Generate a game with initWithPrompt
```javascript
const firstGame = new Game();

firstGame.initWithPrompt().then(() => {
  for (const ticket of firstGame.tickets) {
    console.log(ticket.printTicket());
  }
});
```

### Generate a game with initWithInput
```javascript
const secondGame = new Game();

const input1 = {
  type: "Ambo",
  city: ["Bari", "Cagliari", "Firenze"],
  quantity: 3,
};
const input2 = {
  type: "Ambo",
  city: ["Tutte"],
  quantity: 5,
};

secondGame.initWithInput([input1, input2]).then(() => {
  for (const ticket of secondGame.tickets) {
    console.log(ticket.printTicket());
  }
});
```

## Future improvements
- Implement part 2: <a href="https://github.com/tomorrowdevs-projects/programming-basics/tree/main/projects/m6/002-lotto-fake-extraction">Description</a>
- Implement part 3: <a href="https://github.com/tomorrowdevs-projects/programming-basics/tree/main/projects/m6/003-lotto-calculate-prizes">Description</a>
