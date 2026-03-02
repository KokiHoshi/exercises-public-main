import fs from "fs/promises";

export async function checkEntry(path) {
  try {
    const stats = await fs.stat(path);

    if (stats.isFile()) {
      return "file";
    }

    if (stats.isDirectory()) {
      return "directory";
    }

    if (stats.isSymbolicLink()) {
      return "symlink";
    }

    if (stats.isSocket()) {
      return "socket";
    }

    if (stats.isFIFO()) {
      return "fifo";
    }

    if (stats.isBlockDevice()) {
      return "block device";
    }

    if (stats.isCharacterDevice()) {
      return "character device";
    }

    return "other";
  } catch (err) {
    // 存在しない場合など
    if (err.code === "ENOENT") {
      return "not found";
    }
    throw err;
  }
}
