document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const src = imageData.data;
    const w = img.width;
    const h = img.height;

    // ===== ガウシアンフィルタ（7x7） =====
    // 7x7 Gaussian kernel（σ≈1.5 相当のよく使う係数）: 合計 4096
    const kernel = [
      [1, 6, 15, 20, 15, 6, 1],
      [6, 36, 90, 120, 90, 36, 6],
      [15, 90, 225, 300, 225, 90, 15],
      [20, 120, 300, 400, 300, 120, 20],
      [15, 90, 225, 300, 225, 90, 15],
      [6, 36, 90, 120, 90, 36, 6],
      [1, 6, 15, 20, 15, 6, 1],
    ];
    const kernelSum = 4096;
    const radius = 3; // 7x7 -> 半径3

    const out = new Uint8ClampedArray(src.length);
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let r = 0,
          g = 0,
          b = 0;

        for (let ky = -radius; ky <= radius; ky++) {
          for (let kx = -radius; kx <= radius; kx++) {
            const px = clamp(x + kx, 0, w - 1);
            const py = clamp(y + ky, 0, h - 1);

            const weight = kernel[ky + radius][kx + radius];
            const idx = (py * w + px) * 4;

            r += src[idx] * weight;
            g += src[idx + 1] * weight;
            b += src[idx + 2] * weight;
          }
        }

        const outIdx = (y * w + x) * 4;
        out[outIdx] = r / kernelSum;
        out[outIdx + 1] = g / kernelSum;
        out[outIdx + 2] = b / kernelSum;
        out[outIdx + 3] = src[outIdx + 3]; // αは維持
      }
    }

    const outputImageData = new ImageData(out, w, h);
    filteredCtx.putImageData(outputImageData, 0, 0);
    // ===== ここまで =====
  });

  reader.readAsDataURL(file);
});
