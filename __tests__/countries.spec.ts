import { flags } from "../src/helpers/countries";

test("returns the correct emoji flags for a list of country codes", () => {
  const result = flags(["DE", "FI", "EU"]);
  expect(result).toStrictEqual("🇩🇪🇫🇮🇪🇺");
});
