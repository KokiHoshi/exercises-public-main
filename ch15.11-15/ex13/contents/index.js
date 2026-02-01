"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  // 通信中なら二重起動しない（連打対策）
  if (button.disabled) return;
  // 通信開始時にボタンを非活性化
  button.disabled = true;
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  // EventSource で SSE 接続開始
  const es = new EventSource("/message");

  // 受信処理
  es.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);

      // 表示（改行も活かす）
      messageElement.textContent += data.value;

      // done:true なら接続終了
      if (data.done) {
        es.close();
        button.disabled = false;
      }
    } catch {
      // JSON でなかった等の保険
      messageElement.textContent += event.data;
    }
  });

  // エラー時も終了扱い（ボタンを戻す）
  es.addEventListener("error", () => {
    es.close();
    button.disabled = false;
  });
}
