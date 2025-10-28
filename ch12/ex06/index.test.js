import fs from "node:fs";
import path from "node:path";
import { walk } from "./index.js";

const tmpRoot = path.join(process.cwd(), "tmp_walk_test");

const normalizeRel = (base, p) => {
  const rel = path.relative(base, p);
  return rel === "" ? "" : rel.split(path.sep).join("/");
};

beforeEach(() => {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
  fs.mkdirSync(tmpRoot);
  fs.mkdirSync(path.join(tmpRoot, "dirA"));
  fs.mkdirSync(path.join(tmpRoot, "dirA", "dirB"));
  fs.writeFileSync(path.join(tmpRoot, "file1.txt"), "root");
  fs.writeFileSync(path.join(tmpRoot, "dirA", "a.txt"), "a");
  fs.writeFileSync(path.join(tmpRoot, "dirA", "dirB", "b.txt"), "b");
});

afterEach(() => {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
});

describe("walk()", () => {
  test("全ファイルとディレクトリを再帰的に列挙する", () => {
    const result = Array.from(walk(tmpRoot));
    const names = result.map((e) => normalizeRel(tmpRoot, e.path)).sort();
    expect(names).toEqual(
      [
        "",
        "dirA",
        "dirA/a.txt",
        "dirA/dirB",
        "dirA/dirB/b.txt",
        "file1.txt",
      ].sort()
    );
  });

  test("各エントリに isDirectory プロパティが含まれている", () => {
    for (const e of walk(tmpRoot)) {
      expect(e).toHaveProperty("path");
      expect(typeof e.isDirectory).toBe("boolean");
      expect(path.isAbsolute(e.path)).toBe(true);
    }
  });

  test("ファイルは isDirectory:false, ディレクトリは true", () => {
    const all = Array.from(walk(tmpRoot));
    const dirs = all
      .filter((e) => e.isDirectory)
      .map((e) => path.basename(e.path));
    const files = all
      .filter((e) => !e.isDirectory)
      .map((e) => path.basename(e.path));
    expect(dirs).toEqual(
      expect.arrayContaining(["dirA", "dirB", path.basename(tmpRoot)])
    );
    expect(files).toEqual(
      expect.arrayContaining(["file1.txt", "a.txt", "b.txt"])
    );
  });

  test("空ディレクトリも列挙される", () => {
    const emptyDir = path.join(tmpRoot, "empty");
    fs.mkdirSync(emptyDir);
    const names = Array.from(walk(tmpRoot)).map((e) => e.path);
    expect(names).toContain(emptyDir);
  });

  test("深い階層でもすべて辿れる", () => {
    const deep = path.join(tmpRoot, "x", "y", "z");
    fs.mkdirSync(deep, { recursive: true });
    fs.writeFileSync(path.join(deep, "deep.txt"), "d");
    const names = Array.from(walk(tmpRoot)).map((e) =>
      normalizeRel(tmpRoot, e.path)
    );
    expect(names).toEqual(
      expect.arrayContaining(["x", "x/y", "x/y/z", "x/y/z/deep.txt"])
    );
  });

  test("非ファイル種別（シンボリックリンクなど）は無視（作れない環境ではスキップ相当）", () => {
    const target = path.join(tmpRoot, "file1.txt");
    const link = path.join(tmpRoot, "link_to_file1");
    try {
      if (fs.existsSync(link)) fs.rmSync(link);
      fs.symlinkSync(target, link);
    } catch {
      return;
    }
    const rels = Array.from(walk(tmpRoot)).map((e) =>
      normalizeRel(tmpRoot, e.path)
    );
    expect(rels).not.toContain("link_to_file1");
  });
});
