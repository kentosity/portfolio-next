import {
  createGrain,
  createSurface,
  height,
  randomFromSeed,
  tau,
  width,
  type Renderer,
} from "./shared";

import { createPaperStage } from "./paper-stage";

const ringColors = [
  "#1649cb",
  "#b5d9ec",
  "#f6c8aa",
  "#ff633d",
  "#ec452b",
  "#ff9970",
  "#1649cb",
  "#efc7b5",
  "#ff633d",
  "#ff8760",
  "#1649cb",
];

export function createPaper(
  canvas: HTMLCanvasElement,
  seed: number,
): Renderer | null {
  const random = randomFromSeed(seed);
  const phase = random() * tau;
  const ringTwist = 0.23 + random() * 0.12;
  const grain = createGrain(seed, 24);
  const rings = ringColors.map((color, ring) => {
    const surface = createSurface(960, 960);
    const ctx = surface.context;
    const radius = 432 - ring * 34;
    const petals = 52 - ring * 2;
    ctx.translate(480, 480);
    for (let petal = 0; petal < petals; petal++) {
      const angle = (petal / petals) * tau + ring * ringTwist + phase;
      const length =
        radius +
        28 * Math.sin(angle * 2 + phase) +
        12 * Math.cos(angle * 5 + ring * 0.4);
      ctx.save();
      ctx.rotate(angle);
      const gradient = ctx.createLinearGradient(radius * 0.66, -25, length, 26);
      gradient.addColorStop(0, "#10285b");
      gradient.addColorStop(0.42, color);
      gradient.addColorStop(0.83, color);
      gradient.addColorStop(1, ring % 3 === 0 ? "#d6e9ff" : "#ffdfc6");
      ctx.fillStyle = gradient;
      ctx.shadowColor = "#0a236c85";
      ctx.shadowBlur = 7;
      ctx.shadowOffsetY = 6;
      ctx.beginPath();
      ctx.moveTo(radius * 0.61, -13);
      ctx.bezierCurveTo(radius * 0.8, -36, length - 18, -33, length, -18);
      ctx.lineTo(length - 8, 6);
      ctx.bezierCurveTo(length - 12, 22, radius * 0.86, 48, radius * 0.65, 18);
      ctx.bezierCurveTo(
        radius * 0.64,
        8,
        radius * 0.62,
        -6,
        radius * 0.67,
        -13,
      );
      ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.strokeStyle = "#fff7e97a";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(radius * 0.72, -3);
      ctx.quadraticCurveTo(radius * 0.95, -2, length - 2, -17);
      ctx.stroke();
      ctx.restore();
    }
    return surface.canvas;
  });

  const background = createSurface();
  background.context.fillStyle = "#e7ecfb";
  background.context.fillRect(0, 0, width, height);
  const halo = background.context.createRadialGradient(
    780,
    510,
    80,
    780,
    510,
    530,
  );
  halo.addColorStop(0, "#8eaaf066");
  halo.addColorStop(1, "#e7ecfb00");
  background.context.fillStyle = halo;
  background.context.fillRect(0, 0, width, height);
  background.context.drawImage(grain, 0, 0);

  const heart = createSurface(120, 120);
  const ctx = heart.context;
  ctx.translate(60, 60);
  const heartShade = ctx.createRadialGradient(-10, -12, 1, 0, 0, 54);
  heartShade.addColorStop(0, "#071d47");
  heartShade.addColorStop(0.7, "#12378c");
  heartShade.addColorStop(1, "#1649cb");
  ctx.fillStyle = heartShade;
  ctx.beginPath();
  ctx.arc(0, 0, 54, 0, tau);
  ctx.fill();
  for (let dot = 0; dot < 160; dot++) {
    const angle = dot * 2.39996;
    const radius = Math.sqrt(dot) * 3.6;
    ctx.fillStyle = dot % 5 ? "#8eaaf0" : "#ff9970";
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * radius, Math.sin(angle) * radius, 1.3, 0, tau);
    ctx.fill();
  }
  return createPaperStage(canvas, {
    background: background.canvas,
    rings,
    heart: heart.canvas,
  });
}
