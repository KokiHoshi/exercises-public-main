// index.js (13.13 解答例) — 非同期ジェネレータ版 walk
import * as fs from "node:fs/promises";
import * as path from "node:path";

/**
 * 非同期ジェネレータ: ルート直下から再帰的に { path, isDirectory } を返す
 * - ルート自身は返さない（例の期待に合わせる）
 * - 順序は任意（実装は DFS）
 */
export async function* walk(rootPath) {
  const base = path.resolve(rootPath);

  async function* visit(p, isRoot = false) {
    const st = await fs.lstat(p);

    if (st.isDirectory()) {
      // ルート以外のディレクトリは yield
      if (!isRoot) {
        yield { path: path.relative(base, p), isDirectory: true };
      }
      const entries = await fs.readdir(p, { withFileTypes: true });
      for (const ent of entries) {
        if (ent.isDirectory() || ent.isFile()) {
          yield* visit(path.join(p, ent.name), false);
        }
      }
    } else if (st.isFile()) {
      yield { path: path.relative(base, p), isDirectory: false };
    }
  }

  yield* visit(base, true);
}
