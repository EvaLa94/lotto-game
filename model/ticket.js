const options = require('../model/options.js');
const { AsciiTable3, AlignmentEnum } = require('ascii-table3');

class Ticket {
    constructor(id, object){
        this.id = id,
        this.type = object.type;
        this.city = this.generateCities(object.city);
        this.numbers = this.generateNumbers(object.quantity);
    }

    generateNumbers(quantity){
        const randomNumbers = new Set();
        quantity = quantity <= options.ticketFeatues.numberQuantity.max ? quantity : options.ticketFeatues.numberQuantity.max;
        while (randomNumbers.size < quantity) {
          const random = Math.floor(Math.random() * options.ticketFeatues.randomNumber.max  + options.ticketFeatues.randomNumber.min);
          randomNumbers.add(random)
        }
        return Array.from(randomNumbers).sort((a, b) => a - b);
    }

    generateCities(list){
        return list.includes('Tutte') ? options.ticketFeatues.cities : list;
    }

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