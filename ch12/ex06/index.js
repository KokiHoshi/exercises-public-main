import fs from "node:fs";
import path from "node:path";

export function* walk(rootPath) {
  function* visit(p) {
    const st = fs.lstatSync(p);
    if (st.isDirectory()) {
      yield { path: p, isDirectory: true };
      const entries = fs.readdirSync(p, { withFileTypes: true });
      for (const ent of entries) {
        if (ent.isDirectory() || ent.isFile()) {
          yield* visit(path.join(p, ent.name));
        }
      }
    } else if (st.isFile()) {
      yield { path: p, isDirectory: false };
    }
  }
  yield* visit(rootPath);
}
