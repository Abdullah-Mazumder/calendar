import moment from "moment";

export default function daysBetweenArrivalAndDeparture(
  currentDate,
  arrivDate,
  departDate
) {
  // Parse the arrival and departure dates as Moment objects
  const today = moment(currentDate);
  const parsedArrivDate = moment(arrivDate);
  const parsedDepartDate = moment(departDate);

  // Check if today is equal to arrivDate or departDate
  if (
    today.isSame(parsedArrivDate, "day") ||
    today.isSame(parsedDepartDate, "day")
  ) {
    // Calculate the number of days between departDate and arrivDate
    return parsedDepartDate.diff(parsedArrivDate, "days");
  }

  // Check if today is between arrivDate and departDate
  if (today.isBetween(parsedArrivDate, parsedDepartDate, "day", "[]")) {
    return 0;
  }

  // If today is not equal to arrivDate and not in the range, return undefined
  return undefined;
}
