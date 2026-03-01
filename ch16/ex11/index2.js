// 接続を大量にするクライアント

import net from "net";

const HOST = "127.0.0.1";
const PORT = 8080;

const sockets = [];
let count = 0;

async function connectOne(i) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: HOST, port: PORT }, () => {
      count++;
      sockets.push(socket);

      if (count % 100 === 0) {
        console.log("connected:", count);
      }

      resolve({ ok: true });
    });

    // 何も送らない（HTTPリクエストなし）

    socket.on("error", (err) => {
      resolve({ ok: false, error: err });
    });
  });
}

(async () => {
  for (let i = 1; i <= 50000; i++) {
    const result = await connectOne(i);

    if (!result.ok) {
      console.log("FAILED at:", i);
      console.log("reason:", result.error.code);
      break;
    }
  }

  console.log("holding connections...");
  setInterval(() => {}, 1000);
})();
