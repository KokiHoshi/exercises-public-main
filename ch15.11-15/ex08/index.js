const form = document.querySelector("#requests");
const sendButton = document.querySelector("#send");

// WebSocket 接続
const ws = new WebSocket("ws://localhost:3003");

// リクエストIDのカウンター
let requestIdCounter = 1;

// 各リクエストの状態を管理するMap
// key: requestId, value: { resolve, reject, timeoutId }
const pendingRequests = new Map();

// WebSocket 接続が確立されたとき
ws.addEventListener("open", () => {
  console.log("WebSocket connected");
});

// WebSocket からメッセージを受信したとき
ws.addEventListener("message", (event) => {
  try {
    const message = JSON.parse(event.data);
    const { requestId, type, payload } = message;

    const request = pendingRequests.get(requestId);
    if (!request) {
      // 対応するリクエストが見つからない（タイムアウト後など）
      return;
    }

    // タイムアウトをクリア
    clearTimeout(request.timeoutId);
    pendingRequests.delete(requestId);

    if (type === "response") {
      request.resolve(payload);
    } else if (type === "error") {
      request.reject(new Error(payload));
    }
  } catch (error) {
    console.error("Failed to parse message:", error);
  }
});

// WebSocket 接続が閉じられたとき
ws.addEventListener("close", () => {
  console.log("WebSocket closed");
  // すべての未完了リクエストをエラーにする
  for (const [requestId, request] of pendingRequests.entries()) {
    clearTimeout(request.timeoutId);
    request.reject(new Error("Connection Closed"));
  }
  pendingRequests.clear();
});

// WebSocket でエラーが発生したとき
ws.addEventListener("error", (error) => {
  console.error("WebSocket error:", error);
});

/**
 * WebSocket でリクエストを送信し、レスポンスを Promise で返す
 * @param {string} payload - リクエストペイロード
 * @param {number} timeout - タイムアウト時間（ミリ秒）
 * @returns {Promise<string>} レスポンスペイロード
 */
function sendRequest(payload, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const requestId = requestIdCounter++;

    // タイムアウトを設定
    const timeoutId = setTimeout(() => {
      pendingRequests.delete(requestId);
      reject(new Error("Request timed out"));
    }, timeout);

    // リクエスト情報を保存
    pendingRequests.set(requestId, { resolve, reject, timeoutId });

    // WebSocket がオープンしているか確認
    if (ws.readyState !== WebSocket.OPEN) {
      clearTimeout(timeoutId);
      pendingRequests.delete(requestId);
      reject(new Error("Connection Closed"));
      return;
    }

    // リクエストメッセージを送信
    const request = {
      requestId,
      type: "request",
      payload,
    };
    ws.send(JSON.stringify(request));
  });
}

// フォーム送信時の処理
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // すべての入力フィールドとレスポンス表示要素を取得
  const payloadInputs = document.querySelectorAll(".payload");
  const responseElements = document.querySelectorAll(".response");

  // すべてのレスポンスに "Loading..." を表示
  responseElements.forEach((elem) => {
    elem.textContent = "Loading...";
    elem.style.color = "black";
  });

  // 送信ボタンを無効化
  sendButton.disabled = true;

  // 各入力フィールドのリクエストを並行して送信
  const promises = Array.from(payloadInputs).map(async (input, index) => {
    const payload = input.value;
    const responseElem = responseElements[index];

    try {
      const response = await sendRequest(payload);
      responseElem.textContent = response;
      responseElem.style.color = "green";
    } catch (error) {
      responseElem.textContent = `Error: ${error.message}`;
      responseElem.style.color = "red";
    }
  });

  // すべてのリクエストが完了するまで待機
  await Promise.all(promises);

  // 送信ボタンを有効化
  sendButton.disabled = false;
});
