export default function isDateInRange(today, arriveDate, departDate) {
  // Parse date strings as YYYY-MM-DD format
  const todayDate = new Date(today);
  const arriveDateObj = new Date(arriveDate);
  const departDateObj = new Date(departDate);

  // Set time to the start of the day (midnight)
  todayDate.setHours(0, 0, 0, 0);
  arriveDateObj.setHours(0, 0, 0, 0);
  departDateObj.setHours(0, 0, 0, 0);

  if (todayDate.getTime() === arriveDateObj.getTime()) {
    return -1;
  } else if (todayDate.getTime() === departDateObj.getTime()) {
    return 1;
  } else if (
    todayDate.getTime() > arriveDateObj.getTime() &&
    todayDate.getTime() < departDateObj.getTime()
  ) {
    return 0;
  } else {
    // If today is outside the range, return null or any other value as per your requirement.
    return null;
  }
}
