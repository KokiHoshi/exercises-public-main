self.addEventListener("message", (event) => {
  const t0 = performance.now();

  const { w, h, buffer } = event.data;
  const src = new Uint8ClampedArray(buffer);

  // 7x7 Gaussian kernel（合計 4096）
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
  const radius = 3;

  const out = new Uint8ClampedArray(src.length);
  const clamp = (v, min, max) => (v < min ? min : v > max ? max : v);

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
      out[outIdx + 3] = src[outIdx + 3]; // α維持
    }
  }

  const t1 = performance.now();
  const ms = Math.round(t1 - t0);

  // Transferable で返却
  self.postMessage({ w, h, buffer: out.buffer, ms }, [out.buffer]);
});
