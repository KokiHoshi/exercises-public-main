export class HiraganaChar {
  constructor(ch) {
    if (typeof ch !== "string" || ch.length !== 1) {
      throw new TypeError("HiraganaChar expects a single character string");
    }
    if (!/^[\u3040-\u309F]$/.test(ch)) {
      throw new RangeError("HiraganaChar expects a hiragana character");
    }

    this.char = ch;
    this.code = ch.charCodeAt(0); // UTF-16 コード単位
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      // 数字が期待されるとき → UTF-16コード単位
      return this.code;
    }
    if (hint === "string") {
      // 文字列が期待されるとき → ひらがな
      return this.char;
    }
    // "default" やその他 → ひらがな
    return this.char;
  }
}
