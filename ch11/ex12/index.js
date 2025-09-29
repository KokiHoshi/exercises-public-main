import fs from "fs";

/** ファイルサイズ超過 */
export class FileTooLargeError extends Error {
  constructor(path, size, limit) {
    super(`File "${path}" is too large: ${size} bytes (limit: ${limit} bytes)`);
    this.name = "FileTooLargeError";
    this.path = path;
    this.size = size;
    this.limit = limit;
  }
}

/**
 * 指定ファイルが許容サイズを超えていたら FileTooLargeError を投げる
 * @param {string} path - ファイルパス
 * @param {number} limit - 許容バイト数
 */
export function checkFileSize(path, limit) {
  const stat = fs.statSync(path);
  if (stat.size > limit) {
    throw new FileTooLargeError(path, stat.size, limit);
  }
  return stat.size;
}
