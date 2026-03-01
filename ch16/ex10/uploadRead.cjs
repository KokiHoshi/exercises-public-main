// upload_read.js
const fs = require("fs/promises");

const FILE = process.argv[2] || "bigfile.txt";
const URL = process.argv[3] || "http://localhost:8000/result/hello_read.txt";

async function main() {
  // 進行中のピークRSSを測る
  let peak = 0;
  const timer = setInterval(() => {
    const rss = process.memoryUsage().rss;
    if (rss > peak) peak = rss;
  }, 50);

  // fs.read を使って全量Bufferへ
  const fh = await fs.open(FILE, "r");
  let buffer;
  try {
    const st = await fh.stat();
    buffer = Buffer.allocUnsafe(st.size); // ファイルサイズ分を一気に確保

    let offset = 0;
    while (offset < buffer.length) {
      const { bytesRead } = await fh.read(
        buffer,
        offset,
        buffer.length - offset,
        offset,
      );
      if (bytesRead === 0) break;
      offset += bytesRead;
    }
  } finally {
    await fh.close();
  }

  const before = process.memoryUsage().rss;

  // Bufferを一括で送る
  const res = await fetch(URL, {
    method: "PUT",
    body: buffer,
  });

  const text = await res.text();
  const after = process.memoryUsage().rss;

  clearInterval(timer);

  console.log("== upload_read ==");
  console.log("status:", res.status);
  console.log("response:", text.trim());
  console.log("rss diff (MB):", ((after - before) / 1024 / 1024).toFixed(1));
  console.log("peak rss (MB):", (peak / 1024 / 1024).toFixed(1));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
