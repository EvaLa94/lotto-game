const Game = require("../model/game.js");

/*
describe("description", () => {
  test("description.", () => {
    const actual = ;
    const expected = ;
    expect(actual).toEqual(expected);
  });
});
*/

describe("Game", () => {
  const game = new Game();

  const ticket1 = {
    type: "Ambo",
    city: ["Bari", "Cagliari", "Firenze"],
    quantity: 3,
  };
  const ticket2 = {
    type: "Ambo",
    city: ["Tutte"],
    quantity: 5,
  };

  describe("generateTickets", () => {
    const listOfTickets = game.generateTickets([ticket1, ticket2]);
    test("It should generate tickets that are instances of Ticket class.", () => {
      listOfTickets.then(() => {
        for (const singleTicket of listOfTickets) {
          const actual = singleTicket instanceof Ticket;
          const expected = true;
          expect(actual).toEqual(expected);
        }
      });
    });

    test("It should generate as many tickets as the entered information.", () => {
      const listOfTickets = game.generateTickets([ticket1, ticket2]);
      listOfTickets.then(() => {
        const actual = listOfTickets.length;
        const expected = 2;
        expect(actual).toEqual(expected);
      });
    });
  });

  describe("initWithInput", () => {
    game.initWithInput([ticket1, ticket2]);
    test("It should add the ticketQuantity property.", () => {
      const actual = game.ticketQuantity;
      const expected = 2;
      expect(actual).toEqual(expected);
    });

    test("It should add the tickets property.", () => {
      const actual = game.tickets.length;
      const expected = 2;
      expect(actual).toEqual(expected);
    });
  });
});
