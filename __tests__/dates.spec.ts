import { isoTimeToString } from "../src/helpers/dates";

test("converts an ISO 8601 time string to a user-facing string", () => {
  const result = isoTimeToString("09:45:31");
  expect(result).toBe("09:45");
});

test("uses 24-hour format", () => {
  const result = isoTimeToString("13:00:00");
  expect(result).toBe("13:00");
});
