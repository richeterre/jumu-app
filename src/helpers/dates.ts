import { DateTime } from "luxon";

// Formats an ISO time (e.g. 09:45:00) to a user-facing string
export const isoTimeToString = (isoTime: string) =>
  DateTime.fromISO(isoTime).toLocaleString(DateTime.TIME_24_SIMPLE);
