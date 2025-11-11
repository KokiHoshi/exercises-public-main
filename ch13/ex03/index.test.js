import {
  readdirPromise,
  statPromise,
  readdirPromisify,
  statPromisify,
} from "./index.js";
import * as fsp from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

describe("fs.* を Promise で扱う", () => {
  let tmpDir;
  const filename = "sample.txt";

  beforeAll(async () => {
    // 一時ディレクトリを作成してテスト用ファイルを生成
    tmpDir = await fsp.mkdtemp(path.join(os.tmpdir(), "fs-promises-"));
    await fsp.writeFile(path.join(tmpDir, filename), "hello");
  });

  afterAll(async () => {
    // テスト後に削除
    await fsp.rm(tmpDir, { recursive: true, force: true });
  });

  // Promise コンストラクタ版
  test("readdirPromise() は配列（ファイル一覧）を返す", async () => {
    const entries = await readdirPromise(tmpDir);
    expect(Array.isArray(entries)).toBe(true);
    expect(entries).toContain(filename);
  });

  test("statPromise() は Stats を返し、作成したファイルは isFile()", async () => {
    const st = await statPromise(path.join(tmpDir, filename));
    expect(st.isFile()).toBe(true);
  });

  test("statPromise() は存在しないパスで reject する", async () => {
    await expect(statPromise(path.join(tmpDir, "nope.txt"))).rejects.toThrow();
  });

  // util.promisify 版
  test("readdirPromisify() は配列（ファイル一覧）を返す", async () => {
    const entries = await readdirPromisify(tmpDir);
    expect(Array.isArray(entries)).toBe(true);
    expect(entries).toContain(filename);
  });

  test("statPromisify() は Stats を返し、作成したファイルは isFile()", async () => {
    const st = await statPromisify(path.join(tmpDir, filename));
    expect(st.isFile()).toBe(true);
  });

  test("statPromisify() は存在しないパスで reject する", async () => {
    await expect(
      statPromisify(path.join(tmpDir, "nope.txt"))
    ).rejects.toThrow();
  });
});
