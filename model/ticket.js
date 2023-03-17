const options = require('../model/options.js');
const { AsciiTable3, AlignmentEnum } = require('ascii-table3');

/** Class representing a single ticket */
class Ticket {

    /**
     * Generate the ticket
     * 
     * @param {number} id - The number of the ticket
     * @param {object} object - An object that includes the type of the ticket (string), the cities (array) and the quantity of numbers to generate (number)
     */
    constructor(id, object){
        this.id = id,
        this.type = object.type;
        this.city = this.#generateCities(object.city);
        this.numbers = this.#generateNumbers(object.quantity);
    }

    /**
     * Generate the random numbers of the ticket
     * 
     * @param {number} quantity - Quantity of numbers to be generated
     * @returns {array} - Sorted array of numbers
     */
    #generateNumbers(quantity){
        const randomNumbers = new Set();
        quantity = quantity <= options.ticketFeatues.numberQuantity.max ? quantity : options.ticketFeatues.numberQuantity.max;
        while (randomNumbers.size < quantity) {
          const random = Math.floor(Math.random() * options.ticketFeatues.randomNumber.max  + options.ticketFeatues.randomNumber.min);
          randomNumbers.add(random)
        }
        return Array.from(randomNumbers).sort((a, b) => a - b);
    }

    /**
     * Check if the entered cities includes 'Tutte'. If yes, all cities are returned
     * 
     * @param {array} list - Array of cities to be verified
     * @returns {array} - All cities if 'Tutte' was included, otherwise only the ones entered
     */
    #generateCities(list){
        return list.includes('Tutte') ? options.ticketFeatues.cities : list;
    }

    /**
     * Print the ticked in a nice ascii format, with the informations from the constructor
     * 
     * @returns {string} - Return the ticket in a string format
     */
    printTicket(){
        // 0: id // 1: city // 2: type // 3: numbers
        const values = [this.id.toString(), this.city.join(' - '), this.type, this.numbers.join(' - ')];

        const table = 
            new AsciiTable3(`TICKET #${values[0]}`)
            .setAlign(3, AlignmentEnum.CENTER)
            .addRowMatrix([
                ['City', values[1]],
                ['Type', values[2]],
                ['Numbers', values[3]],
            ]);

                return table.toString();
    }
}


module.exports = Ticket;