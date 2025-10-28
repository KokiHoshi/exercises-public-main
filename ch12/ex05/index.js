import fs from "node:fs";
import { StringDecoder } from "node:string_decoder";

export function* readLines(filePath, bufferSize = 64 * 1024) {
  let fd;
  const buf = Buffer.allocUnsafe(bufferSize);
  const decoder = new StringDecoder("utf8");
  let carry = "";

  try {
    fd = fs.openSync(filePath, "r");
    while (true) {
      const n = fs.readSync(fd, buf, 0, buf.length, null);
      if (n <= 0) break;
      carry += decoder.write(buf.subarray(0, n));
      let i;
      while ((i = carry.indexOf("\n")) !== -1) {
        let line = carry.slice(0, i);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        yield line;
        carry = carry.slice(i + 1);
      }
    }
    carry += decoder.end();
    if (carry.length) {
      if (carry.endsWith("\r")) carry = carry.slice(0, -1);
      yield carry;
    }
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}
