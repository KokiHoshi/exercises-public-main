import WebSocket, { WebSocketServer } from "ws";
import { setTimeout } from "timers/promises";

const port = 3003;
const wss = new WebSocketServer({ port });
wss.on("listening", () =>
  console.log("WebSocket server listening on ws://localhost:3003"),
);

// メッセージを送ってきたクライアントにオウム返しする
wss.on("connection", (ws) => {
  ws.on("message", async (data) => {
    const messageStr = data.toString();

    try {
      const message = JSON.parse(messageStr);

      if (ws.readyState === WebSocket.OPEN) {
        // 0~5秒のランダムな時間待機してからレスポンスを返す
        const waitTIme = Math.floor(Math.random() * 1000 * 5);
        console.log(messageStr, `wait ${waitTIme}ms`);
        await setTimeout(waitTIme);

        // 不正なリクエストの場合はエラーレスポンスを返す
        if (
          message.type !== "request" ||
          typeof message.payload !== "string" ||
          message.payload.length === 0
        ) {
          const response = {
            requestId: message.requestId,
            type: "error",
            payload: "Invalid request",
          };
          ws.send(JSON.stringify(response));
          return;
        }

        // payloadの先頭に"Hello, "を追加してレスポンスを返す
        const response = {
          requestId: message.requestId,
          type: "response",
          payload: "Hello, " + message.payload,
        };
        ws.send(JSON.stringify(response));
      }
    } catch (error) {
      console.error("Invalid JSON message:", messageStr);
    }
  });
});
