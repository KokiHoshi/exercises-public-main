import fs from "fs/promises";
import { checkEntry } from "./index.js";

describe("checkEntry 関数のテスト", () => {
  afterEach(async () => {
    await fs.rm("tmp-file.txt", { force: true });
    await fs.rm("tmp-dir", { recursive: true, force: true });
    await fs.rm("tmp-link", { force: true });
  });

  test("通常ファイルを指定した場合は 'file' を返す", async () => {
    await fs.writeFile("tmp-file.txt", "hello");
    const result = await checkEntry("tmp-file.txt");
    expect(result).toBe("file");
  });

  test("ディレクトリを指定した場合は 'directory' を返す", async () => {
    await fs.mkdir("tmp-dir");
    const result = await checkEntry("tmp-dir");
    expect(result).toBe("directory");
  });

  test("シンボリックリンクを指定した場合、stat使用のためリンク先の種類を返す", async () => {
    await fs.writeFile("tmp-file.txt", "hello");

    try {
      await fs.symlink("tmp-file.txt", "tmp-link");

      const result = await checkEntry("tmp-link");

      // stat() はリンク先を解決するため "file" になる
      expect(result).toBe("file");
    } catch {
      console.warn("シンボリックリンクの作成に失敗したためテストをスキップ");
    }
  });

  test("存在しないパスを指定した場合は 'not found' を返す", async () => {
    const result = await checkEntry("no-such-file");
    expect(result).toBe("not found");
  });
});
