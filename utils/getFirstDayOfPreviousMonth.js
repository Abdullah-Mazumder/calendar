import moment from "moment";

const getFirstDayOfPreviousMonth = (today) => {
  // Ensure that "today" is a valid Moment.js object
  const todayMoment = moment(today);

  // Subtract one month from the given date
  const previousMonth = todayMoment.clone().subtract(1, "month");

  // Set the date to the 1st day of the month
  const firstDayOfPreviousMonth = previousMonth.date(1);

  return firstDayOfPreviousMonth;
};

export default getFirstDayOfPreviousMonth;
