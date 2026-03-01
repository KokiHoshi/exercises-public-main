import fs from "fs";
import iconv from "iconv-lite";

// Shift_JIS で保存されたファイルをバイナリとして読む
const buffer = fs.readFileSync("hello.txt");

// Shift_JIS → UTF-8 に変換
const text = iconv.decode(buffer, "shift_jis");

// コンソールに表示
console.log(text);
