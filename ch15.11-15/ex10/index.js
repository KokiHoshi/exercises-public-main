const fileInput = document.getElementById("image");
const originalCanvas = document.getElementById("original");
const filteredCanvas = document.getElementById("filtered");
const originalCtx = originalCanvas.getContext("2d");
const filteredCtx = filteredCanvas.getContext("2d");

// Web Worker 起動
const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

// Worker から結果を受信
worker.addEventListener("message", (event) => {
  const { w, h, buffer } = event.data;
  const out = new Uint8ClampedArray(buffer);
  const outputImageData = new ImageData(out, w, h);

  filteredCanvas.width = w;
  filteredCanvas.height = h;
  filteredCtx.putImageData(outputImageData, 0, 0);
});

// 画像選択時
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);

    // ガウシアン処理を Worker に委譲（Transferable）
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
