import * as fs from "node:fs";
import { promisify } from "node:util";

//　Promise コンストラクタ版
export function readdirPromise(path, options) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

export function statPromise(path, options) {
  return new Promise((resolve, reject) => {
    fs.stat(path, options, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats);
    });
  });
}

// util.promisify版
export const readdirPromisify = promisify(fs.readdir);
export const statPromisify = promisify(fs.stat);

// 使用例
async function main() {
  console.log("Promise コンストラクタ版");
  try {
    const files1 = await readdirPromise(".");
    console.log("Files:", files1);
    const info1 = await statPromise(files1[0]);
    console.log("First file info:", info1);
  } catch (err) {
    console.error("Error:", err);
  }

  console.log("\nutil.promisify 版");
  try {
    const files2 = await readdirPromisify(".");
    console.log("Files:", files2);
    const info2 = await statPromisify(files2[0]);
    console.log("First file info:", info2);
  } catch (err) {
    console.error("Error:", err);
  }
}

//main();
