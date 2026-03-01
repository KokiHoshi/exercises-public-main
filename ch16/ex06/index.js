import fs from "fs/promises";

const FILE = "index.bin";

// 初期データ
const initial = Buffer.from([0x41, 0x42, 0x43, 0x0a]); // "ABC\n"
await fs.writeFile(FILE, initial);

// 16バイトまで拡張（4 → 16）
await fs.truncate(FILE, 16);

console.log("created:", FILE);
console.log("initial size:", initial.length, "-> new size:", 16);
