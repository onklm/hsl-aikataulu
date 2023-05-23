const getWeekNumber = (date = new Date()) => {
  const weekNumber = Math.ceil(
    (date - new Date(date.getFullYear(), 0, 1)) / 86400000 / 7
  );
  return weekNumber;
};

module.exports = { getWeekNumber };
