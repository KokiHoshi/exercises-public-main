// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

// ===== 追加: 一定更新のための設定・状態 =====
// 世代更新間隔（ms）：例 100ms = 10世代/秒
const TICK_MS = 100;
// 固定タイムステップ用
let lastTime = 0;
let acc = 0;
// ========================================

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

// grid を canvas に描画する
function renderGrid(grid) {
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

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲8マスの生存数を数える（端は盤面外＝死として扱う）
      let aliveNeighbors = 0;

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;

          const r = row + dr;
          const c = col + dc;

          if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue;

          if (grid[r][c]) aliveNeighbors++;
        }
      }

      const alive = grid[row][col];

      // Conway's Game of Life のルール
      // 生存: 生きていて 2 or 3 なら生存
      // 誕生: 死んでいて 3 なら誕生
      if (alive) {
        nextGrid[row][col] = aliveNeighbors === 2 || aliveNeighbors === 3;
      } else {
        nextGrid[row][col] = aliveNeighbors === 3;
      }
    }
  }
  return nextGrid;
}

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
function update(timestamp) {
  // ===== 追加: 固定タイムステップ（更新頻度を一定にする） =====
  if (!lastTime) lastTime = timestamp;

  const delta = timestamp - lastTime;
  lastTime = timestamp;

  // 重いフレームでaccが溜まりすぎるのを防ぐ
  acc += Math.min(delta, 250);

  // ★一定間隔：TICK_MSごとにだけ世代更新
  while (acc >= TICK_MS) {
    grid = updateGrid(grid);
    acc -= TICK_MS;
  }

  // 描画は毎フレーム行う
  renderGrid(grid);
  animationId = requestAnimationFrame(update);
  // ============================================================
}

startButton.addEventListener("click", () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  // ===== 追加: タイミング用変数をリセットして開始 =====
  lastTime = 0;
  acc = 0;
  animationId = requestAnimationFrame(update);
  // =================================================
});

pauseButton.addEventListener("click", () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid);
