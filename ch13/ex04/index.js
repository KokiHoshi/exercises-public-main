import * as fs from "node:fs/promises";
import { join } from "node:path";

export function fetchFirstFileSize(path) {
  return fs.readdir(path).then((files) => {
    if (files.length === 0) return null;
    return fs.stat(join(path, files[0])).then((stats) => stats.size);
  });
}

export function fetchSumOfFileSizes(path) {
  return fs.readdir(path).then((files) => {
    let total = 0;
    return files
      .reduce(
        (p, file) =>
          p
            .then(() => fs.stat(join(path, file)))
            .then((st) => {
              total += st.size;
            }),
        Promise.resolve()
      )
      .then(() => total);
  });
}
