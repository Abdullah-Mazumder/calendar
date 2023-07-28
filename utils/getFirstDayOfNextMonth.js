import moment from "moment";

const getFirstDayOfNextMonth = (today) => {
  // Ensure that "today" is a valid Moment.js object
  const todayMoment = moment(today);

  // Add one month to the given date
  const nextMonth = todayMoment.clone().add(1, "month");

  // Set the date to the 1st day of the next month
  const firstDayOfNextMonth = nextMonth.date(1);

  return firstDayOfNextMonth;
};

export default getFirstDayOfNextMonth;
