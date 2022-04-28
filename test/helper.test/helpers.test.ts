import { generateShortURL } from "src/api/helpers";

describe("Test helpers/generateShortURL", () => {
  test("should return a string with a give length", () => {
    {
      const length = 0;
      const shortURL = generateShortURL(length);
      expect(shortURL).toHaveLength(length);
    }
    {
      const length = 10;
      const shortURL = generateShortURL(length);
      expect(shortURL).toHaveLength(length);
    }
  });
});
