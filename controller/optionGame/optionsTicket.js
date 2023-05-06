// All the general options of the game can be changed inside this object

const optionsTicket = {
  ticketQuantity: {
    // Minimun and maximum number of tickets that can be generated
    min: 1,
    max: 5,
  },
  ticketFeatures: {
    cities: [
      "Bari",
      "Cagliari",
      "Firenze",
      "Genova",
      "Milano",
      "Napoli",
      "Palermo",
      "Roma",
      "Torino",
      "Venezia",
    ],
    type: ["Ambata", "Ambo", "Terno", "Quaterna", "Cinquina"],
    typeMinNumber: {
      // Based on the ticket type, the minimum quantity of numbers that will be possible to generate
      Ambata: 1,
      Ambo: 2,
      Terno: 3,
      Quaterna: 4,
      Cinquina: 5,
    },
    numberQuantity: {
      // How many numbers will have each ticket
      min: 1,
      max: 10,
    },
    randomNumber: {
      // Range of the numbers that will be generated
      min: 1,
      max: 90,
    },
  },
};

module.exports = { optionsTicket };
