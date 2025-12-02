import { HiraganaChar } from "./index.js";

describe("HiraganaChar with Symbol.toPrimitive", () => {
  test("基本的なプロパティ", () => {
    const a = new HiraganaChar("あ");
    expect(a.char).toBe("あ");
    expect(a.code).toBe("あ".charCodeAt(0));
  });

  test("数値コンテキストでは UTF-16 コード単位", () => {
    const a = new HiraganaChar("あ");
    const i = new HiraganaChar("い");

    expect(Number(a)).toBe("あ".charCodeAt(0));
    expect(+a).toBe("あ".charCodeAt(0));

    // <, > で 50音順（UTF-16コード単位順）に比較できること
    expect(a < i).toBe(true);
    expect(i > a).toBe(true);

    // 引き算も数値として扱われる
    expect(i - a).toBe("い".charCodeAt(0) - "あ".charCodeAt(0));
  });

  test("文字列コンテキストではひらがな", () => {
    const a = new HiraganaChar("あ");

    // 文字列変換
    expect(String(a)).toBe("あ");
    expect(a + "").toBe("あ");
    expect(`${a}`).toBe("あ");

    // defaultヒント（+ で文字列と連結）はひらがな
    expect("ひらがな:" + a).toBe("ひらがな:あ");
  });

  test("ソートで50音順になること（UTF-16コード単位順）", () => {
    const chars = ["た", "あ", "は", "か"].map((ch) => new HiraganaChar(ch));
    // 数値比較（numberヒント）を利用
    chars.sort((x, y) => x - y);

    // 並びを文字列に戻して確認
    const sorted = chars.map((x) => String(x));
    // UTF-16 コード単位順 = だいたい50音順
    expect(sorted).toStrictEqual(["あ", "か", "た", "は"]);
  });

  test("不正な入力には例外", () => {
    expect(() => new HiraganaChar("あい")).toThrow();
    expect(() => new HiraganaChar("a")).toThrow();
    expect(() => new HiraganaChar("ア")).toThrow();
  });
});
