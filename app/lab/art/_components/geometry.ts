import { palette } from "../../full/atlas-generative/_components/palette";

export type Point = { x: number; y: number };
export const artSize = { width: 1000, height: 660 };
export const familyColours = [
  palette.blue,
  palette.peach,
  palette.ink,
  palette.cyan,
];

export function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export const clamp = (value: number) => Math.max(0, Math.min(1, value));
export const mix = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;
export const smooth = (value: number) => value * value * (3 - 2 * value);
export const coordinate = (value: number) => Number(value.toFixed(2));

export function mixPoint(start: Point, end: Point, progress: number): Point {
  return { x: mix(start.x, end.x, progress), y: mix(start.y, end.y, progress) };
}

export function disturb(
  point: Point,
  pointer: Point | null,
  strength: number,
): Point {
  if (!pointer) return point;
  const offsetX = point.x - pointer.x;
  const offsetY = point.y - pointer.y;
  const distance = Math.hypot(offsetX, offsetY);
  const influence = Math.exp(-(distance * distance) / 16000) * strength;
  return { x: point.x + offsetX * influence, y: point.y + offsetY * influence };
}

export function createFragments(seed: number) {
  const random = createRandom(seed);
  return Array.from({ length: 216 }, (_, index) => {
    const family = index % 4;
    const position = Math.floor(index / 4) / 54;
    const angle = position * Math.PI * 2;
    const radius = 130 + family * 35;
    const wave = Math.sin(angle * 3) * 15;
    return {
      family,
      start: { x: 100 + random() * 800, y: 85 + random() * 490 },
      end: {
        x: 500 + Math.cos(angle) * (radius + wave) * 1.4,
        y: 330 + Math.sin(angle) * (radius + wave),
      },
      rotation: (random() - 0.5) * 320,
      endRotation: (angle * 180) / Math.PI + 90,
      width: 8 + family * 2,
      height: 19 + random() * 14,
      delay: random() * 0.2,
    };
  });
}

export type GraphNode = {
  id: number;
  parent: number | null;
  branch: number;
  start: Point;
  end: Point;
};

export function createGraph(seed: number): GraphNode[] {
  const random = createRandom(seed);
  return Array.from({ length: 31 }, (_, id) => {
    const depth = Math.floor(Math.log2(id + 1));
    const position = id - (2 ** depth - 1);
    const branch = depth < 2 ? -1 : Math.floor(position / 2 ** (depth - 2));
    const angle = random() * Math.PI * 2;
    const radius = 60 + random() * 200;
    return {
      id,
      parent: id === 0 ? null : Math.floor((id - 1) / 2),
      branch,
      start: {
        x: 500 + Math.cos(angle) * radius * 1.3,
        y: 330 + Math.sin(angle) * radius,
      },
      end: {
        x: 105 + depth * 190,
        y: 70 + ((position + 0.5) / 2 ** depth) * 520,
      },
    };
  });
}

export function isOnBranch(node: GraphNode, branch: number | null) {
  if (branch === null || node.id === 0) return true;
  if (node.id < 3) return node.id === (branch < 2 ? 1 : 2);
  return node.branch === branch;
}

export function createCurrents(seed: number) {
  const random = createRandom(seed);
  const phase = random() * Math.PI * 2;
  return Array.from({ length: 96 }, (_, line) => {
    const position = line / 95;
    const family = Math.floor(line / 24);
    const drift = random() * 0.4;
    const points = Array.from({ length: 81 }, (_, step) => {
      const progress = step / 80;
      const x = 70 + progress * 860;
      const envelope = Math.sin(progress * Math.PI);
      const centre = 330 + Math.sin(progress * Math.PI * 2 - 1) * 110;
      const spread =
        (position - 0.5) * (310 + Math.cos(progress * Math.PI * 2) * 100);
      const orderedY = centre + spread;
      const turbulence =
        Math.sin(progress * Math.PI * 4 + position * 7 + phase) * 130 +
        Math.cos(progress * Math.PI * 7 - position * 9 + drift) * 50;
      return {
        start: {
          x:
            x + Math.sin(progress * Math.PI * 3 + position * 6) * 45 * envelope,
          y: 120 + position * 420 + turbulence * envelope,
        },
        end: {
          x,
          y: orderedY + Math.sin(progress * Math.PI * 3 + phase) * envelope * 9,
        },
      };
    });
    return { family, points };
  });
}

export function linePath(points: Point[]) {
  return points
    .map(
      (point, index) =>
        `${index ? "L" : "M"}${coordinate(point.x)},${coordinate(point.y)}`,
    )
    .join(" ");
}
