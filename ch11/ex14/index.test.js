// ch11/ex14/index.test.js
import { sortJapanese, toJapaneseDateString } from "./index.js";

describe("日本語のソート", () => {
  test("大文字・小文字を区別せずにソートできる", () => {
    const input = ["ツバキ", "つばき", "バラ", "ばら"];
    const result = sortJapanese(input);
    // "つばき" と "ツバキ" が同一扱い、"ばら" と "バラ" も同一扱い
    expect(result[0]).toMatch(/つばき|ツバキ/);
    expect(result[1]).toMatch(/つばき|ツバキ/);
    expect(result[2]).toMatch(/ばら|バラ/);
    expect(result[3]).toMatch(/ばら|バラ/);
  });

  test("濁点・半濁点を区別せずにソートできる", () => {
    const input = ["はな", "ばら", "ぱん"];
    const result = sortJapanese(input);
    // はな, ばら, ぱん の順で並んでいて良い
    expect(result).toEqual(["はな", "ばら", "ぱん"]);
  });
});

describe("和暦化", () => {
  test("令和の日付を和暦で返す", () => {
    const d = new Date(2024, 3, 2); // 2024-04-02
    expect(toJapaneseDateString(d)).toBe("令和6年4月2日");
  });

  test("平成の日付を和暦で返す", () => {
    const d = new Date(1990, 0, 1); // 1990-01-01
    expect(toJapaneseDateString(d)).toBe("平成2年1月1日");
  });
});
