const validation = require("../controller/validation.js");
const options = require("../controller/options.js");
const Ticket = require("../model/ticket.js");

describe("Validation.js", () => {
  describe("checkId", () => {
    test("Should return true if the entered id is a string.", () => {
      const actual = validation.checkId("id");
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("Should return true if the entered id is a number.", () => {
      const actual = validation.checkId(1);
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("Should return a message error if the entered id is not a string or a number.", () => {
      const actual = validation.checkId(["Hello", "World"]);
      const expected = "The ID should be a string or a number";
      expect(actual).toEqual(expected);
    });
  });

  describe("checkType", () => {
    test("Should return true if the entered type is an existing Lotto type.", () => {
      const actual = validation.checkType("Ambo");
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("Should not return true if the entered type is not an existing Lotto type.", () => {
      const actual = validation.checkType("Decina");
      const notExpected = true;
      expect(actual).not.toEqual(notExpected);
    });
  });

  describe("checkCity", () => {
    test("Should return true if the city is equal to 'Tutte'.", () => {
      const actual = validation.checkCity("Tutte");
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("Should not return true if the entered city is not included in the Lotto cities.", () => {
      const actual = validation.checkCity("London");
      const notExpected = true;
      expect(actual).not.toEqual(notExpected);
    });
  });

  describe("checkQuantity", () => {
    const min = options.ticketFeatures.numberQuantity.min;
    const max = options.ticketFeatures.numberQuantity.max;

    test("Should return true if the entered quantity is above the option's minimun quantity.", () => {
      const actual = validation.checkQuantity(min + 1);
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("Should return true if the entered quantity is below the option's maximum quantity.", () => {
      const actual = validation.checkQuantity(max - 1);
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("Should return an error message if the entered quantity is below the option's minimun quantity.", () => {
      const actual = validation.checkQuantity(min - 1);
      const expected = [`The minimum entered quantity should be ${min}`];
      expect(actual).toEqual(expected);
    });

    test("Should return an error message if the entered quantity is above the option's maximum quantity.", () => {
      const actual = validation.checkQuantity(max + 1);
      const expected = [`The maximum entered quantity should be ${max}`];
      expect(actual).toEqual(expected);
    });
  });

  describe("checkBet", () => {
    test("Should return true if the entered bet is a number.", () => {
      const actual = validation.checkBet(1);
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("Should return a message error if the entered id is not a number.", () => {
      const actual = validation.checkBet(["Hello", "World"]);
      const expected = "The bet should be a number";
      expect(actual).toEqual(expected);
    });
  });

  describe("validateEnteredFeatures", () => {
    test("Should return true if all the entered features are validated.", () => {
      const features = {
        id: 1,
        type: "Ambo",
        city: "Firenze",
        quantity: 3,
        bet: 1.5,
      };

      const actual = validation.validateEnteredFeatures(
        ...Object.values(features)
      );
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("Should not return true if the id is not validated.", () => {
      const features = {
        id: null,
        type: "Ambo",
        city: "Firenze",
        quantity: 3,
        bet: 1.5,
      };

      const actual = validation.validateEnteredFeatures(
        ...Object.values(features)
      );
      const notExpected = true;
      expect(actual).not.toEqual(notExpected);
    });

    test("Should not return true if the type is not validated.", () => {
      const features = {
        id: 1,
        type: "Decina",
        city: "Firenze",
        quantity: 3,
        bet: 1.5,
      };

      const actual = validation.validateEnteredFeatures(
        ...Object.values(features)
      );
      const notExpected = true;
      expect(actual).not.toEqual(notExpected);
    });

    test("Should not return true if the city is not validated.", () => {
      const features = {
        id: 1,
        type: "Ambo",
        city: "London",
        quantity: 3,
        bet: 1.5,
      };

      const actual = validation.validateEnteredFeatures(
        ...Object.values(features)
      );
      const notExpected = true;
      expect(actual).not.toEqual(notExpected);
    });

    test("Should not return true if the quantity is not validated.", () => {
      const features = {
        id: 1,
        type: "Ambo",
        city: "Firenze",
        quantity: -3,
        bet: 1.5,
      };

      const actual = validation.validateEnteredFeatures(
        ...Object.values(features)
      );
      const notExpected = true;
      expect(actual).not.toEqual(notExpected);
    });
  });

  describe("generateTicket", () => {
    test("Should generate a ticket if the features are validated.", () => {
      const features = {
        id: 1,
        type: "Ambo",
        city: "Firenze",
        quantity: 3,
        bet: 1.5,
      };
      const ticket = validation.generateTicket(...Object.values(features));
      const actual = ticket instanceof Ticket;
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("Should not generate a ticket if at least one feature is not validated.", () => {
      const features = {
        id: 1,
        type: "Decina",
        city: "Firenze",
        quantity: 3,
        bet: 1.5,
      };
      const ticket = validation.generateTicket(...Object.values(features));
      const actual = ticket instanceof Ticket;
      const expected = false;
      expect(actual).toEqual(expected);
    });
  });
});
