// index.test.js
import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.js";
import * as fsp from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

describe("node:fs/promises を使った関数", () => {
  let tmpDir;
  let emptyDir;
  let oneFileDir;
  let multiFileDir;

  beforeAll(async () => {
    // 一時ディレクトリを作成
    tmpDir = await fsp.mkdtemp(path.join(os.tmpdir(), "ch13-4-"));

    // 空ディレクトリ
    emptyDir = path.join(tmpDir, "empty");
    await fsp.mkdir(emptyDir);

    // 1ファイルディレクトリ
    oneFileDir = path.join(tmpDir, "one");
    await fsp.mkdir(oneFileDir);
    await fsp.writeFile(path.join(oneFileDir, "a.txt"), "hello"); // 5 bytes

    // 複数ファイルディレクトリ
    multiFileDir = path.join(tmpDir, "multi");
    await fsp.mkdir(multiFileDir);
    await fsp.writeFile(path.join(multiFileDir, "a.txt"), "abc"); // 3 bytes
    await fsp.writeFile(path.join(multiFileDir, "b.bin"), Buffer.alloc(1024)); // 1024 bytes
  });

  afterAll(async () => {
    await fsp.rm(tmpDir, { recursive: true, force: true });
  });

  test("fetchFirstFileSize(): 空ディレクトリなら null を返す", async () => {
    const size = await fetchFirstFileSize(emptyDir);
    expect(size).toBeNull();
  });

  test("fetchFirstFileSize(): 最初のファイルのサイズを返す", async () => {
    const size = await fetchFirstFileSize(oneFileDir);
    expect(size).toBe(5);
  });

  test("fetchSumOfFileSizes(): 全ファイルのサイズ合計を返す", async () => {
    const sum = await fetchSumOfFileSizes(multiFileDir);
    expect(sum).toBe(3 + 1024);
  });

  test("fetchFirstFileSize(): 存在しないパスならエラーを投げる", async () => {
    await expect(
      fetchFirstFileSize(path.join(tmpDir, "no-such"))
    ).rejects.toThrow();
  });

  test("fetchSumOfFileSizes(): 存在しないパスならエラーを投げる", async () => {
    await expect(
      fetchSumOfFileSizes(path.join(tmpDir, "no-such"))
    ).rejects.toThrow();
  });
});
