import * as fs from "node:fs/promises";
import { join } from "node:path";

/**
 * fetchFirstFileSize:
 * 指定ディレクトリ内の最初のファイルのサイズを返す（ファイルがなければ null）
 */
export async function fetchFirstFileSize(dirPath) {
  const files = await fs.readdir(dirPath);
  if (files.length === 0) return null;
  const stats = await fs.stat(join(dirPath, files[0]));
  return stats.size;
}

/**
 * 指定ディレクトリ内の全ファイルサイズ合計を返す（順次 stat）
 */
export async function fetchSumOfFileSizes(dirPath) {
  const files = await fs.readdir(dirPath);
  let total = 0;
  for (const f of files) {
    const st = await fs.stat(join(dirPath, f));
    total += st.size;
  }
  return total;
}

/**
 * Promise.all で並列に stat を実行して合計
 */
export async function fetchSumOfFileSizesParallel(dirPath) {
  const files = await fs.readdir(dirPath);
  const stats = await Promise.all(files.map((f) => fs.stat(join(dirPath, f))));
  return stats.reduce((sum, st) => sum + st.size, 0);
}
