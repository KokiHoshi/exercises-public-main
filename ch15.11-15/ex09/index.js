// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = COLS * RESOLUTION;
canvas.height = ROWS * RESOLUTION;

// WebSocket 接続
const ws = new WebSocket("ws://localhost:3003");

// 現在のグリッドの状態
let grid = null;

// WebSocket 接続が確立されたとき
ws.addEventListener("open", () => {
  console.log("WebSocket connected");
});

// WebSocket からメッセージを受信したとき
ws.addEventListener("message", (event) => {
  try {
    const message = JSON.parse(event.data);

    switch (message.type) {
      case "update":
        // グリッドの状態を更新して再描画
        grid = message.grid;
        renderGrid(grid);
        break;
      case "start":
        console.log("Game started");
        break;
      case "pause":
        console.log("Game paused");
        break;
    }
  } catch (error) {
    console.error("Failed to parse message:", error);
  }
});

// WebSocket 接続が閉じられたとき
ws.addEventListener("close", () => {
  console.log("WebSocket closed");
});

// WebSocket でエラーが発生したとき
ws.addEventListener("error", (error) => {
  console.error("WebSocket error:", error);
});

// grid を canvas に描画する
function renderGrid(grid) {
  if (!grid) return;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);

  // サーバーにセルの反転を送信
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        type: "toggle",
        row: row,
        col: col,
      })
    );
  }
});

// Start ボタンがクリックされたときの処理
startButton.addEventListener("click", () => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "start" }));
  }
});

// Pause ボタンがクリックされたときの処理
pauseButton.addEventListener("click", () => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "pause" }));
  }
});
