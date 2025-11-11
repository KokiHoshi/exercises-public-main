import { fetchSumOfFileSizes } from "./index.js";
import * as fsp from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";

describe("13.10 Promise.all を使った fetchSumOfFileSizes", () => {
  let tmpDir;
  let emptyDir;
  let oneFileDir;
  let multiFileDir;

  beforeAll(async () => {
    tmpDir = await fsp.mkdtemp(path.join(os.tmpdir(), "ch13-10-"));

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

  test("空ディレクトリなら 0 を返す", async () => {
    const sum = await fetchSumOfFileSizes(emptyDir);
    expect(sum).toBe(0);
  });

  test("1ファイルならそのサイズを返す", async () => {
    const sum = await fetchSumOfFileSizes(oneFileDir);
    expect(sum).toBe(5);
  });

  test("複数ファイルなら合計サイズを返す", async () => {
    const sum = await fetchSumOfFileSizes(multiFileDir);
    expect(sum).toBe(3 + 1024);
  });

  test("存在しないパスならエラーを投げる", async () => {
    await expect(
      fetchSumOfFileSizes(path.join(tmpDir, "no-such"))
    ).rejects.toThrow();
  });
});
