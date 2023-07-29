import moment from "moment";

export default function isEqualMonth(date1, date2) {
  // Parse the dates as Moment objects
  const d1 = moment(date1);
  const d2 = moment(date2);

  // Compare the month
  return d1.isSame(d2, "month");
}
