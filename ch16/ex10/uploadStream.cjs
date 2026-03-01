// upload_stream.js
const fs = require("fs");

const FILE = process.argv[2] || "bigfile.txt";
const URL = process.argv[3] || "http://localhost:8000/result/hello_stream.txt";

async function main() {
  // 進行中のピークRSSを測る
  let peak = 0;
  const timer = setInterval(() => {
    const rss = process.memoryUsage().rss;
    if (rss > peak) peak = rss;
  }, 50);

  // 実行前メモリ
  const before = process.memoryUsage().rss;

  // ストリームでアップロード
  const res = await fetch(URL, {
    method: "PUT",
    body: fs.createReadStream(FILE),
    duplex: "half", // Node fetchでストリームbodyを送るときに必要
  });

  const text = await res.text();

  // 実行後メモリ
  const after = process.memoryUsage().rss;

  clearInterval(timer);

  console.log("== upload_stream ==");
  console.log("status:", res.status);
  console.log("response:", text.trim());
  console.log("rss diff (MB):", ((after - before) / 1024 / 1024).toFixed(1));
  console.log("peak rss (MB):", (peak / 1024 / 1024).toFixed(1));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
