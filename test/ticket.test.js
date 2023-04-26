const Ticket = require("../model/ticket.js");
const options = require("../controller/options.js");

describe("Ticket", () => {
  describe("Instantiate new ticket.", () => {
    const features = {
      type: "Ambo",
      city: ["Bari", "Cagliari", "Firenze"],
      quantity: 3,
    };
    const id = 1;
    const ticket = new Ticket(id, features);

    test("The new ticket should be an instance of the Ticket class.", () => {
      const actual = ticket instanceof Ticket;
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("The new ticket should have an id equal to the entered param id.", () => {
      const actual = ticket.id;
      const expected = id;
      expect(actual).toEqual(expected);
    });

    test("The new ticket should have a list of cities equal to the entered param cities.", () => {
      const actual = ticket.city;
      const expected = features.city;
      expect(actual).toEqual(expected);
    });

    test("The new ticket should have a number quantity equal to the entered param quantity.", () => {
      const actual = ticket.numbers.length;
      const expected = features.quantity;
      expect(actual).toEqual(expected);
    });
  });

  describe("Particular cases.", () => {
    const features = {
      type: "Ambo",
      city: ["Tutte"],
      quantity: options.ticketFeatures.numberQuantity.max + 3,
    };
    const id = 1;
    const ticket = new Ticket(id, features);

    test("Should return the maximum allowed ticket quantity if the entered quantity exceed it.", () => {
      const actual = ticket.numbers.length;
      const expected = options.ticketFeatures.numberQuantity.max;
      const notExpected = features.quantity;
      expect(actual).toEqual(expected);
      expect(actual).not.toEqual(notExpected);
    });

    test("Should return all cities if 'Tutte' has been entered.", () => {
      const actual = ticket.city;
      const expected = options.ticketFeatures.cities;
      expect(actual).toEqual(expected);
    });
  });

  describe("printTicket", () => {
    const features = {
      type: "Ambo",
      city: ["Bari", "Cagliari", "Firenze"],
      quantity: 3,
    };
    const id = 1;
    const ticket = new Ticket(id, features);

    test("It should print the ticket with the correct format.", () => {
      ticket.numbers = [23, 45, 86];
      const actual = ticket.printTicket();
      const expected = `+-------------------------------------+\n|              TICKET #1              |\n+---------+---------------------------+\n| City    | Bari - Cagliari - Firenze |\n| Type    | Ambo                      |\n| Numbers | 23 - 45 - 86              |\n+---------+---------------------------+\n`;
      expect(actual).toEqual(expected);
    });
  });
});
