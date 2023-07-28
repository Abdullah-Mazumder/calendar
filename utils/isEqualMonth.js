export default function isEqualMonth(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const month1 = d1.getMonth();

  const month2 = d2.getMonth();

  // Compare year, month, and day
  return month1 === month2;
}
