const fileInput = document.getElementById("image");
const originalCanvas = document.getElementById("original");
const filteredCanvas = document.getElementById("filtered");
const statusEl = document.getElementById("status");

const originalCtx = originalCanvas.getContext("2d");
const filteredCtx = filteredCanvas.getContext("2d");

// Web Worker 起動（モジュール Worker）
const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

// Worker から結果を受信して描画
worker.addEventListener("message", (event) => {
  const { w, h, buffer, ms } = event.data;

  const out = new Uint8ClampedArray(buffer);
  const outputImageData = new ImageData(out, w, h);

  filteredCanvas.width = w;
  filteredCanvas.height = h;
  filteredCtx.putImageData(outputImageData, 0, 0);

  fileInput.disabled = false;
  statusEl.textContent = `完了 (${ms} ms)`;
});

// 画像選択時
fileInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    // canvas サイズ設定
    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    // 元画像描画
    originalCtx.drawImage(img, 0, 0);

    // ピクセル取得
    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);

    // Worker に委譲（Transferable：コピーを避ける）
    fileInput.disabled = true;
    statusEl.textContent = "処理中…";

    worker.postMessage(
      {
        w: img.width,
        h: img.height,
        buffer: imageData.data.buffer,
      },
      [imageData.data.buffer],
    );
  });

  reader.readAsDataURL(file);
});
