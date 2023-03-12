class Ticket {
    constructor(object){
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
}


module.exports = Ticket;