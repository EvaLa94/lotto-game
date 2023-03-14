const options = {
    ticketQuantity: {
        min: 1,
        max: 5
    },
    ticketFeatues: {
        cities: ['Bari', 'Cagliari', 'Firenze', 'Genova', 'Milano', 'Napoli', 'Palermo', 'Roma', 'Torino', 'Venezia'],
        type: ['Ambata', 'Ambo', 'Terno', 'Quaterna', 'Cinquina'],
        typeMinNumber: {
            'Ambata': 2,
            'Ambo': 2,
            'Terno': 3,
            'Quaterna': 4,
            'Cinquina': 5
        },
        numberQuantity: {
            min: 1,
            max: 10
        },
        randomNumber: {
            min: 1,
            max: 90
        }
    }

}

module.exports = options;