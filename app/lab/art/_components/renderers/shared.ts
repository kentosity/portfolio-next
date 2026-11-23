export const width = 1400;
export const height = 1000;
export const tau = Math.PI * 2;

export type Frame = {
  time: number;
  pointer: [number, number];
  intensity: number;
  pulse: number;
  variation: number;
};

export type Renderer = {
  draw: (frame: Frame) => void;
  resize: (width: number, height: number, ratio: number) => void;
  dispose: () => void;
};

export function randomFromSeed(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSurface(w = width, h = height) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is unavailable");
  return { canvas, context };
}

export function setupCanvas(
  canvas: HTMLCanvasElement,
  draw: Renderer["draw"],
): Renderer {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is unavailable");
  return {
    draw,
    resize(w, h, ratio) {
      canvas.width = Math.round(w * ratio);
      canvas.height = Math.round(h * ratio);
      context.setTransform(
        canvas.width / width,
        0,
        0,
        canvas.height / height,
        0,
        0,
      );
    },
    dispose() {
      canvas.width = 1;
      canvas.height = 1;
    },
  };
}

export function createGrain(seed: number, alpha = 18) {
  const { canvas, context } = createSurface();
  const pixels = context.createImageData(width, height);
  const random = randomFromSeed(seed);
  for (let i = 0; i < pixels.data.length; i += 4) {
    const tone = random() > 0.5 ? 255 : 12;
    pixels.data[i] = tone;
    pixels.data[i + 1] = tone;
    pixels.data[i + 2] = tone;
    pixels.data[i + 3] = random() * alpha * 0.28;
  }
  context.putImageData(pixels, 0, 0);
  return canvas;
}

export function polygon(
  context: CanvasRenderingContext2D,
  points: number[][],
  fill: string,
) {
  context.beginPath();
  points.forEach(([x, y], i) =>
    i ? context.lineTo(x, y) : context.moveTo(x, y),
  );
  context.closePath();
  context.fillStyle = fill;
  context.fill();
}
