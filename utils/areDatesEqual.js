export default function areDatesEqual(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Extract year, month, and day from Date objects
  const year1 = d1.getFullYear();
  const month1 = d1.getMonth();
  const day1 = d1.getDate();

  const year2 = d2.getFullYear();
  const month2 = d2.getMonth();
  const day2 = d2.getDate();

  // Compare year, month, and day
  return year1 === year2 && month1 === month2 && day1 === day2;
}
