import moment from "moment";

export default function isDateInRange(today, arriveDate, departDate) {
  // Parse date strings as Moment objects
  const todayDate = moment(today);
  const arriveDateObj = moment(arriveDate);
  const departDateObj = moment(departDate);

  // Set time to the start of the day (midnight)
  todayDate.startOf("day");
  arriveDateObj.startOf("day");
  departDateObj.startOf("day");

  if (todayDate.isSame(arriveDateObj, "day")) {
    return -1;
  } else if (todayDate.isSame(departDateObj, "day")) {
    return 1;
  } else if (todayDate.isBetween(arriveDateObj, departDateObj, "day", "[]")) {
    return 0;
  } else {
    // If today is outside the range, return null or any other value as per your requirement.
    return null;
  }
}
