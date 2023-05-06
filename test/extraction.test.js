const Extraction = require("../model/extraction.js");
const { optionsTicket } = require("../controller/optionGame/optionsTicket.js");

describe("Extraction", () => {
  describe("Constructor", () => {
    const extraction = new Extraction();

    test("It should create a new extraction instance", () => {
      const actual = extraction instanceof Extraction;
      const expected = true;
      expect(actual).toEqual(expected);
    });

    test("It should extract numbers for each lottery city", () => {
      for (const city of optionsTicket.ticketFeatures.cities) {
        const actual = extraction.extraction.hasOwnProperty(city);
        const expected = true;
        expect(actual).toEqual(expected);
      }
    });

    test("It should extract 5 numbers for each city", () => {
      for (const extractedNumbers of Object.values(extraction.extraction)) {
        const actual = extractedNumbers.length;
        const expected = 5;
        expect(actual).toEqual(expected);
      }
    });
  });
});
