import sharp from "sharp";
import { Worker, isMainThread, parentPort } from "node:worker_threads";
import { performance } from "node:perf_hooks";

function usage() {
  console.error("Usage: node ch16/ex14/index.js <input-image> <output-image>");
}

async function runMainThread() {
  const [, , inputPath, outputPath] = process.argv;
  if (!inputPath || !outputPath) {
    usage();
    process.exit(1);
  }

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgba = new Uint8ClampedArray(data.buffer, data.byteOffset, data.byteLength);
  const width = info.width;
  const height = info.height;

  const worker = new Worker(new URL(import.meta.url));
  const t0 = performance.now();

  const result = await new Promise((resolve, reject) => {
    worker.once("message", resolve);
    worker.once("error", reject);
    worker.once("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`Worker exited with code ${code}`));
      }
    });
    worker.postMessage({ w: width, h: height, buffer: rgba.buffer }, [rgba.buffer]);
  });

  const outRgba = new Uint8ClampedArray(result.buffer);
  await sharp(Buffer.from(outRgba), {
    raw: { width, height, channels: 4 },
  }).toFile(outputPath);
  await worker.terminate();

  const totalMs = Math.round(performance.now() - t0);
  console.log(`Done: ${inputPath} -> ${outputPath}`);
  console.log(`Worker filter time: ${result.ms} ms`);
  console.log(`Total time: ${totalMs} ms`);
}

function runWorkerThread() {
  if (!parentPort) {
    throw new Error("parentPort is not available in worker thread.");
  }

  parentPort.once("message", (message) => {
    const t0 = performance.now();
    const { w, h, buffer } = message;
    const src = new Uint8ClampedArray(buffer);

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
        let r = 0;
        let g = 0;
        let b = 0;

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
        out[outIdx + 3] = src[outIdx + 3];
      }
    }

    const ms = Math.round(performance.now() - t0);
    parentPort.postMessage({ w, h, buffer: out.buffer, ms }, [out.buffer]);
  });
}

if (isMainThread) {
  runMainThread().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
} else {
  runWorkerThread();
}
