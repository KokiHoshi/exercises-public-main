import { COLS, RESOLUTION, ROWS, TICK_MS } from "./constants.js";
import { renderGrid } from "./renderGrid.js";
import { updateGrid } from "./updateGrid.js";

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

let animationId = null;
let lastTime = 0;
let acc = 0;

const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

canvas.addEventListener("click", (evt) => {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);

  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid, ctx, ROWS, COLS, RESOLUTION);
});

function update(timestamp) {
  if (!lastTime) {
    lastTime = timestamp;
  }

  const delta = timestamp - lastTime;
  lastTime = timestamp;

  acc += Math.min(delta, 250);

  while (acc >= TICK_MS) {
    grid = updateGrid(grid, ROWS, COLS);
    acc -= TICK_MS;
  }

  renderGrid(grid, ctx, ROWS, COLS, RESOLUTION);
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
  if (animationId) {
    return;
  }

  lastTime = 0;
  acc = 0;
  animationId = requestAnimationFrame(update);
});

pauseButton.addEventListener("click", () => {
  if (!animationId) {
    return;
  }

  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid, ctx, ROWS, COLS, RESOLUTION);
