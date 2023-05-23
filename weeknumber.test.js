const weeknumber = require('./weeknumber');

describe('getWeekNumber', () => {
  it('should return current week if no date is given', () => {
    const currentDate = new Date();
    const currentWeek = weeknumber.getWeekNumber();
    expect(weeknumber.getWeekNumber(currentDate)).toEqual(currentWeek);
  });

  it('should return week 52 for the first day of 2023', () => {
    const date = new Date("2023-01-01T00:00:00.000");
    expect(weeknumber.getWeekNumber(date)).toEqual(52);
  });

  it('should return week 1 for the first week of 2021 with at least 4 days', () => {
    const date = new Date("2021-01-04T00:00:00.000");
    expect(weeknumber.getWeekNumber(date)).toEqual(1);
  });

  it('should return correct week for Thursday in 2021', async () => {
    const date = new Date("2021-12-09T12:00:00.000");

    expect(weeknumber.getWeekNumber(date)).toEqual(49);
  });

  it('should return correct week for Thursday in 2023', async () => {
    const date = new Date("2023-04-06T12:00:00.000");

    expect(weeknumber.getWeekNumber(date)).toEqual(14);
  });

  it('should return correct week for a date in the middle of the year', () => {
    const date = new Date("2021-06-15T00:00:00.000");
    expect(weeknumber.getWeekNumber(date)).toEqual(24);
  });

  it('should return correct week for a date at the end of the year', () => {
    const date = new Date("2021-12-31T00:00:00.000");
    expect(weeknumber.getWeekNumber(date)).toEqual(52);
  });

  it('should return correct week for a leap year', () => {
    const date = new Date("2020-02-29T00:00:00.000");
    expect(weeknumber.getWeekNumber(date)).toEqual(9);
  });
});
