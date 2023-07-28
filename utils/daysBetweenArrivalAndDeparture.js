export default function daysBetweenArrivalAndDeparture(
  currentDate,
  arrivDate,
  departDate
) {
  // Parse the arrival and departure dates as JavaScript Date objects
  const today = new Date(currentDate);
  const parsedArrivDate = new Date(arrivDate);
  const parsedDepartDate = new Date(departDate);

  // Calculate the difference between departDate and arrivDate in milliseconds
  const timeDifference = parsedDepartDate.getTime() - parsedArrivDate.getTime();

  // Check if today is equal to arrivDate
  if (
    today.getTime() === parsedArrivDate.getTime() ||
    today.getTime() === parsedDepartDate.getTime()
  ) {
    // Calculate the number of days between departDate and arrivDate
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
  }

  // Check if today is between arrivDate and departDate
  if (
    today.getTime() > parsedArrivDate.getTime() &&
    today.getTime() < parsedDepartDate.getTime()
  ) {
    return 0;
  }

  // If today is not equal to arrivDate and not in the range, return undefined
  return undefined;
}
