function stripAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export class IgnoreAccentPattern {
  constructor(pattern) {
    this.originalPattern = pattern;

    if (typeof pattern === "string" || pattern instanceof String) {
      this.type = "string";
      this.patternString = stripAccents(String(pattern));
      this.flags = "";
    } else if (pattern instanceof RegExp) {
      this.type = "regexp";
      this.patternString = stripAccents(pattern.source);
      this.flags = pattern.flags;
    } else {
      throw new TypeError("pattern must be string or RegExp");
    }
  }

  [Symbol.search](str) {
    const target = stripAccents(String(str));

    if (this.type === "string") {
      return target.indexOf(this.patternString);
    } else {
      const re = new RegExp(this.patternString, this.flags);
      return target.search(re);
    }
  }

  [Symbol.match](str) {
    const target = stripAccents(String(str));

    if (this.type === "string") {
      return target.match(this.patternString);
    } else {
      const re = new RegExp(this.patternString, this.flags);
      return target.match(re);
    }
  }
}
