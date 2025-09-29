import {
    daysInMonth,
    countWeekdaysInclusive,
    weekdayOf,
    startOfPrevMonthLocal,
  } from "./index.js";
  
  describe("daysInMonth", () => {
    test("閏年/平年を正しく判定できる", () => {
      expect(daysInMonth(2024, 2)).toBe(29); // 閏年
      expect(daysInMonth(2023, 2)).toBe(28); // 平年
      expect(daysInMonth(2025, 1)).toBe(31);
      expect(daysInMonth(2025, 4)).toBe(30);
    });
  });
  
  describe("countWeekdaysInclusive", () => {
    test("2025-09-01(月)〜2025-09-07(日)", () => {
      // 2025/9/1(月)〜9/5(金) が平日 → 5 日
      expect(countWeekdaysInclusive("2025-09-01", "2025-09-07")).toBe(5);
    });
  
    test("順序が逆でも正しく数える", () => {
      expect(countWeekdaysInclusive("2025-09-07", "2025-09-01")).toBe(5);
    });
  });
  
  describe("weekdayOf", () => {
    test("ロケール ja-JP", () => {
      expect(weekdayOf("2025-09-16", "ja-JP")).toMatch(/火/); // 火曜日
    });
    test("ロケール en-US", () => {
      expect(weekdayOf("2025-09-16", "en-US")).toBe("Tuesday");
    });
  });
  
  describe("startOfPrevMonthLocal", () => {
    test("返り値はローカルの先月1日 00:00:00", () => {
      const now = new Date();
      const prev = startOfPrevMonthLocal();
  
      // 先月の計算
      const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      const month = now.getMonth() === 0 ? 12 : now.getMonth(); // 1〜12
  
      expect(prev.getFullYear()).toBe(year);
      expect(prev.getMonth() + 1).toBe(month); // Date.getMonth()は0始まり
      expect(prev.getDate()).toBe(1);
      expect(prev.getHours()).toBe(0);
      expect(prev.getMinutes()).toBe(0);
      expect(prev.getSeconds()).toBe(0);
      expect(prev.getMilliseconds()).toBe(0);
    });
  });
  