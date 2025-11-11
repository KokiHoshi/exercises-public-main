import * as fs from "node:fs/promises";
import { join } from "node:path";

export function fetchSumOfFileSizes(dirPath) {
  return fs
    .readdir(dirPath)
    .then((files) => Promise.all(files.map((f) => fs.stat(join(dirPath, f)))))
    .then((stats) => stats.reduce((sum, st) => sum + st.size, 0));
}
