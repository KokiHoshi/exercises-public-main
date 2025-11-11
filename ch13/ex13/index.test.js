import { walk } from "./index.js";
import * as fsp from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

describe("非同期ジェネレータ walk()", () => {
  let tmpDir;

  beforeAll(async () => {
    // 一時ディレクトリを作成
    tmpDir = await fsp.mkdtemp(path.join(os.tmpdir(), "ch13-13-"));

    // 以下の構造を作る
    // tmpDir/
    // ├── A/
    // ├── B/
    // │   └── C/
    // │       └── buz.txt
    // └── foo.txt
    await fsp.mkdir(path.join(tmpDir, "A"));
    await fsp.mkdir(path.join(tmpDir, "B"));
    await fsp.mkdir(path.join(tmpDir, "B", "C"));
    await fsp.writeFile(path.join(tmpDir, "B", "C", "buz.txt"), "buzz");
    await fsp.writeFile(path.join(tmpDir, "foo.txt"), "foo");
  });

  afterAll(async () => {
    await fsp.rm(tmpDir, { recursive: true, force: true });
  });

  test("ディレクトリ構造をすべて走査して返す", async () => {
    const results = [];
    for await (const elem of walk(tmpDir)) {
      results.push(elem);
    }

    // 期待される構造（順序は問わない）
    const expected = [
      { path: "A", isDirectory: true },
      { path: "B", isDirectory: true },
      { path: path.join("B", "C"), isDirectory: true },
      { path: path.join("B", "C", "buz.txt"), isDirectory: false },
      { path: "foo.txt", isDirectory: false },
    ];

    // 結果をソートして比較（順序非依存）
    const sortByPath = (a, b) => a.path.localeCompare(b.path);
    results.sort(sortByPath);
    expected.sort(sortByPath);

    expect(results).toEqual(expected);
  });

  test("空ディレクトリの場合は空配列になる", async () => {
    const emptyDir = path.join(tmpDir, "empty");
    await fsp.mkdir(emptyDir);
    const results = [];
    for await (const elem of walk(emptyDir)) {
      results.push(elem);
    }
    expect(results).toEqual([]);
  });
});
