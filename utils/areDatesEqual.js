import moment from "moment";

export default function areDatesEqual(date1, date2) {
  const d1 = moment(date1);
  const d2 = moment(date2);

  // Compare year, month, and day
  return d1.isSame(d2, "day");
}
