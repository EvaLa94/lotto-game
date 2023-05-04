const Game = require("../model/game.js");
const Ticket = require("../model/ticket.js");
const Extraction = require("../model/extraction.js");

describe("Game", () => {
  describe("It should create a new object instance", () => {
    const game = new Game();
    test("new Game()", () => {
      const actual = game instanceof Game;
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("It should set the idCount to 1 initially.", () => {
      const actual = game.idCount;
      const expected = 1;
      expect(actual).toEqual(expected);
    });

    test("The property ticket should be initially equal to an empty array.", () => {
      const actual = game.tickets;
      const expected = [];
      expect(actual).toEqual(expected);
    });

    test("The property extraction should be initially equal to an empty object.", () => {
      const actual = game.extraction;
      const expected = {};
      expect(actual).toEqual(expected);
    });
  });

  describe("addTicket()", () => {
    const game = new Game();
    test("It should return a new ticket if the entered parameters are validated.", () => {
      const actual = game.addTicket("Ambo", "Roma", 2, 1) instanceof Ticket;
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("It should return false if the entered parameters are not validated.", () => {
      const actual = game.addTicket("Ambo", "London", 2, 1);
      const expected = false;
      expect(actual).toEqual(expected);
    });
  });

  describe("performExtraction()", () => {
    const game = new Game();
    test("It should create a new instance of Extraction.", () => {
      const actual = game.performExtraction() instanceof Extraction;
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("It should fill the extraction property.", () => {
      const actual = game.extraction;
      const notExpected = {};
      expect(actual).not.toEqual(notExpected);
    });
  });

  describe("checkWinningTickets()", () => {
    const game = new Game();
    game.performExtraction();
    game.addTicket("Cinquina", "Roma", 5, 1);
    game.addTicket("Ambata", "Tutte", 5, 1);
    game.tickets[0].numbers = [1, 2, 3, 4, 5];
    game.tickets[1].numbers = [1, 2, 3, 4, 5];
    game.extraction.Roma = [1, 2, 3, 4, 5];
    game.extraction.Bari = [1, 2, 3, 4, 5];
    game.checkWinningTickets();

    test("The same ticket should be included only once in the winningTickets array.", () => {
      for (const winningTicket of game.getWinningTickets()) {
        const actual = game
          .getWinningTickets()
          .filter((ticket) => ticket.id === winningTicket.id).length;
        const expected = 1;
        expect(actual).toEqual(expected);
      }
    });
  });

  describe("getWinningTickets()", () => {
    const game = new Game();
    game.performExtraction();
    game.addTicket("Cinquina", "Roma", 5, 1);
    game.tickets[0].numbers = [1, 2, 3, 4, 5];
    game.extraction.Roma = [1, 2, 3, 4, 5];
    game.checkWinningTickets();

    test("The returned array's length should be greater than 0 if there is at least one winning ticket.", () => {
      const actual = game.getWinningTickets().length;
      expect(actual).toBeGreaterThan(0);
    });
  });
});
