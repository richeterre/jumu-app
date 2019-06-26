import { flag } from "../src/helpers/countries";

test("returns the correct emoji flag for a country code", () => {
  const emojis = ["DE", "FI", "EU"].map(flag);
  expect(emojis).toStrictEqual(["🇩🇪", "🇫🇮", "🇪🇺"]);
});
