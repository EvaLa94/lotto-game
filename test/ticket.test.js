const Ticket = require("../model/ticket.js");
const Extraction = require("../model/extraction.js");
const { optionsTicket } = require("../controller/optionGame/optionsTicket.js");

describe("Ticket", () => {
  describe("Instantiate new ticket.", () => {
    const features = {
      id: 1,
      type: "Ambo",
      city: "Bari",
      quantity: 3,
      bet: 1.5,
    };
    const ticket = new Ticket(...Object.values(features));

    test("The new ticket should be an instance of the Ticket class.", () => {
      const actual = ticket instanceof Ticket;
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("The new ticket should have an id equal to the entered param id.", () => {
      const actual = ticket.id;
      const expected = features.id;
      expect(actual).toEqual(expected);
    });

    test("The new ticket should have a cities equal to the entered param city.", () => {
      const actual = ticket.city;
      const expected = features.city;
      expect(actual).toEqual(expected);
    });

    test("The new ticket should have a number quantity equal to the entered param quantity.", () => {
      const actual = ticket.numbers.length;
      const expected = features.quantity;
      expect(actual).toEqual(expected);
    });

    test("The new ticket should have a bet equal to the entered param bet.", () => {
      const actual = ticket.bet;
      const expected = features.bet;
      expect(actual).toEqual(expected);
    });

    test("The new ticket should have a isWinning property set to false.", () => {
      const actual = ticket.isWinning;
      const expected = false;
      expect(actual).toEqual(expected);
    });

    test("The new ticket should have a grossWin property set to 0.", () => {
      const actual = ticket.grossWin;
      const expected = 0;
      expect(actual).toEqual(expected);
    });

    test("The new ticket should have a netWin property set to 0.", () => {
      const actual = ticket.netWin;
      const expected = 0;
      expect(actual).toEqual(expected);
    });
  });

  describe("Particular case.", () => {
    const features = {
      id: 1,
      type: "Ambo",
      city: "Bari",
      quantity: optionsTicket.ticketFeatures.numberQuantity.max + 3,
      bet: 1.5,
    };
    const ticket = new Ticket(...Object.values(features));

    test("Should return the maximum allowed ticket quantity if the entered quantity exceed it.", () => {
      const actual = ticket.numbers.length;
      const expected = optionsTicket.ticketFeatures.numberQuantity.max;
      const notExpected = features.quantity;
      expect(actual).toEqual(expected);
      expect(actual).not.toEqual(notExpected);
    });
  });

  describe("printTicket", () => {
    const features = {
      id: 1,
      type: "Ambo",
      city: "Bari",
      quantity: 3,
      bet: 1.5,
    };
    const ticket = new Ticket(...Object.values(features));

    test("It should print the ticket with the correct format.", () => {
      ticket.numbers = [23, 45, 86];
      const actual = ticket.printTicket();
      const expected = `+------------------------+\n|       TICKET #1        |\n+---------+--------------+\n| City    | Bari         |\n| Type    | Ambo         |\n| Numbers | 23 - 45 - 86 |\n| Bet     | 1.50 €       |\n+---------+--------------+\n`;
      expect(actual).toEqual(expected);
    });
  });

  describe("checkWinningTicket", () => {
    const extraction = new Extraction();
    const ticket = new Ticket(1, "Cinquina", "Roma", 5, 1);
    extraction.Roma = [1, 2, 3, 4, 5];
    ticket.numbers = [1, 2, 3, 4, 5];
    ticket.checkWinningTicket(extraction);

    test("A winning ticket should have a isWinning property set to true", () => {
      const actual = ticket.isWinning;
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("A winning ticket should have a grossWin property greater than 0", () => {
      const actual = ticket.grossWin;
      const expected = 0;
      expect(actual).toBeGreaterThan(expected);
    });

    test("A winning ticket should have a netWin property greater than 0", () => {
      const actual = ticket.netWin;
      const expected = 0;
      expect(actual).toBeGreaterThan(expected);
    });

    test("A winning ticket with 5 numbers of type 'Cinquina' should win a gross amount of 6.000.000€", () => {
      const actual = ticket.grossWin;
      const expected = 6000000;
      expect(actual).toEqual(expected);
    });

    test("A winning ticket with 5 numbers of type 'Cinquina' should win a net amount of 6.000.000€", () => {
      const actual = ticket.netWin;
      const expected = 5520000;
      expect(actual).toEqual(expected);
    });
  });
});
