import {
  createGrain,
  height,
  polygon,
  randomFromSeed,
  setupCanvas,
  tau,
  width,
  type Renderer,
} from "./shared";

export function createGarden(
  canvas: HTMLCanvasElement,
  seed: number,
): Renderer {
  const context = canvas.getContext("2d")!;
  const random = randomFromSeed(seed);
  const phase = random() * tau;
  const grain = createGrain(seed, 14);
  const cells: {
    x: number;
    y: number;
    height: number;
    material: number;
    detail: number;
  }[] = [];
  for (let y = 0; y < 27; y++) {
    for (let x = 0; x < 27; x++) {
      const dx = x - 13;
      const dy = y - 13;
      const radius = Math.hypot(dx, dy);
      const edge = 12 + Math.sin(Math.atan2(dy, dx) * 5 + phase) * 1.3;
      if (radius > edge || radius < 2.6) continue;
      const ridge =
        (Math.sin(x * 0.37 + phase) * Math.cos(y * 0.31) +
          Math.sin((x + y) * 0.23 + phase) * 0.27 +
          1) *
        0.5;
      cells.push({
        x: dx,
        y: dy,
        height: 20 + Math.floor(ridge * 6) * 19 + random() * 6,
        material: ridge > 0.73 ? 2 : ridge < 0.26 ? 1 : 0,
        detail: random(),
      });
    }
  }
  cells.sort((a, b) => a.x + a.y - b.x - b.y);
  const materials = [
    ["#e5f2f8", "#90bedb", "#c3e4ef"],
    ["#376aef", "#0c2b81", "#1c4ec6"],
    ["#ff9469", "#b93c2e", "#f26743"],
  ];

  return setupCanvas(
    canvas,
    ({ time, pointer, intensity, pulse, variation }) => {
      context.fillStyle = "#1649cb";
      context.fillRect(0, 0, width, height);
      const cameraX = (pointer[0] - 0.5) * 26;
      const cameraY = (pointer[1] - 0.5) * 18;
      const project = (x: number, y: number, z: number) => [
        700 + (x - y) * 27 + (cameraX * z) / 200,
        550 + (x + y) * 14 - z + (cameraY * z) / 200,
      ];
      context.save();
      context.translate(720, 630);
      context.scale(1, 0.46);
      const shadow = context.createRadialGradient(0, 0, 90, 0, 0, 560);
      shadow.addColorStop(0, "#071d47bb");
      shadow.addColorStop(1, "#071d4700");
      context.fillStyle = shadow;
      context.fillRect(-580, -580, 1160, 1160);
      context.restore();
      for (const cell of cells) {
        const distance = Math.hypot(cell.x, cell.y);
        const handDistance = Math.hypot(
          cell.x - (pointer[0] - 0.5) * 25,
          cell.y - (pointer[1] - 0.5) * 25,
        );
        const lift =
          Math.exp(-handDistance * handDistance * 0.04) * 58 * intensity;
        const wave =
          Math.exp(-pulse * 0.55) * Math.sin(distance * 0.65 - pulse * 4) * 30;
        const z =
          cell.height * (0.7 + intensity * 0.6) +
          lift +
          Math.sin(time * 0.55 + distance * 0.3 + variation) * 5 +
          wave;
        const { x, y } = cell;
        const a = project(x, y, z);
        const b = project(x + 0.94, y, z);
        const c = project(x + 0.94, y + 0.94, z);
        const d = project(x, y + 0.94, z);
        const baseB = project(x + 0.94, y, -42);
        const baseC = project(x + 0.94, y + 0.94, -42);
        const baseD = project(x, y + 0.94, -42);
        const colors = materials[cell.material];
        polygon(context, [d, c, baseC, baseD], colors[1]);
        polygon(context, [b, c, baseC, baseB], colors[2]);
        if (cell.height > 85 && cell.detail > 0.6) {
          context.strokeStyle = "#f1f4ff25";
          context.lineWidth = 0.8;
          for (let seam = -16; seam < z - 12; seam += 19) {
            const from = project(x + 0.95, y + 0.95, seam);
            const to = project(x + 0.95, y, seam);
            context.beginPath();
            context.moveTo(from[0], from[1]);
            context.lineTo(to[0], to[1]);
            context.stroke();
          }
        }
        polygon(context, [a, b, c, d], colors[0]);
        if (cell.detail > 0.42 && cell.detail < 0.58) {
          context.strokeStyle = cell.material === 1 ? "#c3e4ef66" : "#1649cb33";
          context.lineWidth = 0.7;
          for (let step = 1; step < 5; step++) {
            const from = project(x + 0.1, y + step * 0.17, z + 0.8);
            const to = project(x + 0.84, y + step * 0.17, z + 0.8);
            context.beginPath();
            context.moveTo(from[0], from[1]);
            context.lineTo(to[0], to[1]);
            context.stroke();
          }
        }
        if (cell.detail > 0.78) {
          const inset = [
            project(x + 0.2, y + 0.2, z + 0.5),
            project(x + 0.74, y + 0.2, z + 0.5),
            project(x + 0.74, y + 0.74, z + 0.5),
            project(x + 0.2, y + 0.74, z + 0.5),
          ];
          polygon(context, inset, cell.material === 1 ? "#87b2ff" : "#1649cb");
        }
        if (cell.detail < 0.1) {
          const center = project(x + 0.47, y + 0.47, z + 7);
          context.fillStyle = cell.material === 2 ? "#f1f4ff" : "#ff7048";
          context.beginPath();
          context.ellipse(center[0], center[1], 5, 7, 0, 0, tau);
          context.fill();
        }
      }
      context.drawImage(grain, 0, 0, width, height);
    },
  );
}
