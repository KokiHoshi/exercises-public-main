import fs from "node:fs";
import path from "node:path";
import { readLines } from "./index.js";

const tmp = path.join(process.cwd(), "testfile.txt");

beforeEach(() => {
  const data = ["line1", "line2", "line3", "最後の行"].join("\n");
  fs.writeFileSync(tmp, data, "utf8");
});

afterEach(() => {
  if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
});

describe("readLines()", () => {
  test("ファイルを1行ずつ読み込む", () => {
    const result = [];
    for (const line of readLines(tmp)) result.push(line);
    expect(result).toEqual(["line1", "line2", "line3", "最後の行"]);
  });

  test("改行コードが除去されている", () => {
    for (const line of readLines(tmp)) {
      expect(line.includes("\n")).toBe(false);
      expect(line.includes("\r")).toBe(false);
    }
  });

  test("breakしてもファイルがクローズされる", () => {
    let count = 0;
    for (const line of readLines(tmp)) {
      count++;
      if (count === 2) break;
    }
    expect(() => fs.renameSync(tmp, tmp + ".bak")).not.toThrow();
    if (fs.existsSync(tmp + ".bak")) fs.renameSync(tmp + ".bak", tmp);
  });

  test("throwされてもファイルがクローズされる", () => {
    expect(() => {
      for (const line of readLines(tmp)) {
        throw new Error("forced");
      }
    }).toThrow("forced");
    expect(() => fs.renameSync(tmp, tmp + ".bak")).not.toThrow();
    if (fs.existsSync(tmp + ".bak")) fs.renameSync(tmp + ".bak", tmp);
  });

  test("空行を含むファイルも正しく処理できる", () => {
    const content = "a\n\nb\n";
    fs.writeFileSync(tmp, content, "utf8");
    const result = Array.from(readLines(tmp));
    expect(result).toEqual(["a", "", "b"]);
  });
});
