class Ticket {
    constructor(id, object){
        this.id = id,
        this.type = object.type;
        this.city = this.generateCities(object.city);
        this.numbers = this.generateNumbers(object.quantity);
    }

    generateNumbers(quantity){
        const randomNumbers = new Set();
        quantity = quantity <= 10 ? quantity : 10;
        while (randomNumbers.size < quantity) {
          const random = Math.floor(Math.random() * 90  + 1);
          randomNumbers.add(random)
        }
        return Array.from(randomNumbers).sort((a, b) => a - b);
    }

    generateCities(list){
        return list.includes('Tutte') ? ['Bari', 'Cagliari', 'Firenze', 'Genova', 'Milano', 'Napoli', 'Palermo', 'Roma', 'Torino', 'Venezia'] : list;
    }

    printTicket(){
        // 0: id // 1: city // 2: type // 3: numbers
        const values = [this.id.toString(), this.city.join(' - '), this.type, this.numbers.join(' - ')];
        const lengths = values.map(value => value.length);
        
        const maxLength = Math.max(...lengths) + 11;
        const partialLength = maxLength-11;
        const extLine = `+${'-'.repeat(maxLength+1)}+`;
        const midLine = `+---------+${'-'.repeat(partialLength+2)}+`;
        const output = `
${extLine}
|${' '.repeat((maxLength-8)/2)}TICKET #${values[0]}${' '.repeat((maxLength)/2-lengths[0]-2)}|
${midLine}
| City    | ${values[1]}${' '.repeat(partialLength - lengths[1])} |
${midLine}
| Type    | ${values[2]}${' '.repeat(partialLength - lengths[2])} |
${midLine}
| Numbers | ${values[3]}${' '.repeat(partialLength - lengths[3])} |
${midLine}
`
        return output;
    }
}


module.exports = Ticket;