export default function isWeekend(date) {
  // Ensure that the input is a valid Date object
  if (!(date instanceof Date)) {
    throw new Error("Invalid input. Please provide a valid Date object.");
  }

  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const dayOfWeek = date.getDay();

  // Check if the day is Saturday (6) or Sunday (0)
  return dayOfWeek === 0 || dayOfWeek === 6;
}
