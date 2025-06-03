import fs from "fs";
import asciitree from "asciitree";
import { createCanvas } from "canvas";

// 修正済み convertToAsciiTree
function convertToAsciiTree(node) {
  if (node === null) return "null";
  if (node === undefined) return "undefined";
  if (typeof node !== "object") return String(node);

  let label = node.type || "unknown";
  if (node.name) label += ` (${node.name})`;
  if ("value" in node && (typeof node.value === "string" || typeof node.value === "number")) {
    label += ` (${node.value})`;
  }

  const children = {};

  for (const key in node) {
    if (["type", "start", "end", "raw"].includes(key)) continue;
    const value = node[key];

    if (Array.isArray(value)) {
      if (value.length > 0) {
        // ここ重要: asciitreeに配列を渡すとバグるので、必ずオブジェクト形式にする
        const group = {};
        value.forEach((child, i) => {
          if (child !== undefined && child !== null) {
            const childTree = convertToAsciiTree(child);
            group[`[${i}]`] = childTree;
          } else {
            group[`[${i}]`] = "(empty)";
          }
        });
        children[key] = group;
      } else {
        children[key] = "(empty)";
      }
    } else if (typeof value === "object" && value !== null) {
      const childTree = convertToAsciiTree(value);
      children[key] = childTree;
    } else if (value !== undefined) {
      children[key] = String(value);
    }
  }

  return {
    [label]: Object.keys(children).length > 0 ? children : "(empty)"
  };
}

// コマンドライン引数からファイル名を取得
const jsonFile = process.argv[2];
if (!jsonFile) {
  console.error("Usage: node index2.js <jsonfile>");
  process.exit(1);
}

// JSON読み込み
const json = fs.readFileSync(jsonFile, "utf-8");
const ast = JSON.parse(json);

// ツリー構造生成
const tree = convertToAsciiTree(ast);
const treeString = asciitree(tree);

// PNG生成
const fontSize = 14;
const fontFamily = "monospace";
const lines = treeString.split("\n");
const lineHeight = fontSize * 1.4;
const width = Math.max(...lines.map(line => line.length)) * fontSize * 0.6;
const height = lines.length * lineHeight + 20;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// 背景
ctx.fillStyle = "white";
ctx.fillRect(0, 0, width, height);

// テキスト
ctx.fillStyle = "black";
ctx.font = `${fontSize}px ${fontFamily}`;
lines.forEach((line, i) => {
  ctx.fillText(line, 10, (i + 1) * lineHeight);
});

// PNG保存
const outputFilename = jsonFile.replace(/\.json$/, ".png");
const out = fs.createWriteStream(outputFilename);
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on("finish", () => console.log(`PNGファイルを作成しました ${outputFilename}`));
