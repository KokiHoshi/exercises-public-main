import { is31DaysIf, is31DaysSwitch } from './index.js';

describe('is31DaysIf & is31DaysSwitch', () => {
  const thirtyOneDays = ["Jan", "Mar", "May", "Jul", "Aug", "Oct", "Dec"];
  const notThirtyOneDays = ["Feb", "Apr", "Jun", "Sep", "Nov"];
  const invalidMonths = ["", "foo", "January", "abc", null, undefined, 76];

  // 31日の月
  test.each(thirtyOneDays)("is31DaysIf('%s') => true", (month) => {
    expect(is31DaysIf(month)).toBe(true);
  });

  test.each(thirtyOneDays)("is31DaysSwitch('%s') => true", (month) => {
    expect(is31DaysSwitch(month)).toBe(true);
  });

  // 31日でない月
  test.each(notThirtyOneDays)("is31DaysIf('%s') => false", (month) => {
    expect(is31DaysIf(month)).toBe(false);
  });

  test.each(notThirtyOneDays)("is31DaysSwitch('%s') => false", (month) => {
    expect(is31DaysSwitch(month)).toBe(false);
  });

  // 無効な月はエラー
  test.each(invalidMonths)("is31DaysIf('%s') throws", (month) => {
    expect(() => is31DaysIf(month)).toThrow("Invalid month");
  });

  test.each(invalidMonths)("is31DaysSwitch('%s') throws", (month) => {
    expect(() => is31DaysSwitch(month)).toThrow("Invalid month");
  });
});
