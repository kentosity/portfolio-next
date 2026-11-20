export type PrintKind = "current" | "voice" | "routes";

export type PrintSource = {
  title: string;
  stack: string;
  reviewed: string;
  kind: PrintKind;
};

export function projectSeed(source: PrintSource) {
  const identity = `${source.title}|${source.stack}|${source.reviewed}|measured-drift-v1`;
  let seed = 2166136261;

  for (const character of identity) {
    seed = Math.imul(seed ^ character.charCodeAt(0), 16777619);
  }

  return seed >>> 0;
}

function seededRandom(seed: number) {
  let state = seed;

  return () => {
    state += 0x6d2b79f5;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const coordinate = (value: number) => value.toFixed(1);

function trace(
  points: [number, number][],
  ink: string,
  width = 1,
  opacity = 1,
) {
  const path = points
    .map(
      ([x, y], index) =>
        `${index ? "L" : "M"}${coordinate(x)},${coordinate(y)}`,
    )
    .join("");
  return `<path d="${path}" fill="none" stroke="${ink}" stroke-width="${width}" opacity="${opacity}"/>`;
}

function drawCurrent(
  random: () => number,
  channels: number,
  construction: boolean,
) {
  const phase = random() * 0.45;
  const tracks = channels * 18;
  const marks: string[] = [];

  for (let track = 0; track < tracks; track++) {
    const position = track / (tracks - 1);
    const channel = Math.floor(position * channels);
    const points: [number, number][] = [];
    const drift = random() * 1.3;

    for (let step = 0; step <= 88; step++) {
      const progress = step / 88;
      const envelope = Math.sin(progress * Math.PI);
      const current = Math.sin(progress * Math.PI * 2 - 0.9 + phase);
      const fold =
        Math.sin(progress * Math.PI * 3 + position * 2) * 19 * envelope;
      const spread =
        (position - 0.5) * (260 + 120 * Math.cos(progress * Math.PI * 2 + 0.3));
      const x = 300 + current * 100 + spread + fold + drift;
      const y = 50 + progress * 620 + Math.sin(position * Math.PI) * 16;
      points.push([x, y]);
    }

    const isAccent = channel === 1 || channel === 4;
    const ink = construction ? "#a0a99a" : isAccent ? "#242722" : "#3448b5";
    const opacity = construction && track % 18 !== 0 ? 0.22 : 0.92;
    marks.push(trace(points, ink, track % 18 === 0 ? 1.8 : 1.15, opacity));
  }

  return marks.join("");
}

function drawVoice(
  random: () => number,
  channels: number,
  construction: boolean,
) {
  const phase = random() * Math.PI;
  const marks: string[] = [];
  const layers = 112;

  for (let layer = 0; layer < layers; layer++) {
    const position = layer / layers;
    const radius = 36 + position * 220;
    const points: [number, number][] = [];
    const interruption = position > 0.65 ? 0.025 : 0;

    for (let step = 0; step <= 168; step++) {
      const angle =
        interruption + (step / 168) * (Math.PI * 2 - interruption * 2);
      const harmonic = Math.sin(angle * 3 + phase + position * 5) * 18;
      const overtone = Math.cos(angle * channels - position * 8 + phase) * 5;
      const amplitude = (harmonic + overtone) * Math.sin(position * Math.PI);
      const x = 300 + Math.cos(angle) * (radius + amplitude);
      const y = 355 + Math.sin(angle) * (radius + amplitude) * 1.13;
      points.push([x, y]);
    }

    const ink = construction
      ? "#a0a99a"
      : layer > 79 && layer < 92
        ? "#a64b3c"
        : "#242722";
    marks.push(
      trace(points, ink, 1.1, construction && layer % 16 !== 0 ? 0.18 : 0.88),
    );
  }

  return marks.join("");
}

function drawRoutes(
  random: () => number,
  channels: number,
  construction: boolean,
) {
  const marks: string[] = [];
  const stagger = 20 + random() * 25;
  const lanes = channels * 15;

  for (let lane = 0; lane < lanes; lane++) {
    const position = lane / (lanes - 1);
    const offset = position * 207;
    const turn = Math.floor(lane / 15) * 7;
    const points: [number, number][] = [
      [78 + offset, 92],
      [78 + offset, 235 - offset * 0.2],
      [338 + offset * 0.45, 235 - offset * 0.2],
      [338 + offset * 0.45, 340 + offset * 0.3],
      [140 + offset * 0.5, 340 + offset * 0.3],
      [140 + offset * 0.5, 548 - offset * 0.24],
      [480 - offset * 0.34, 548 - offset * 0.24],
      [480 - offset * 0.34, 630 + stagger - turn],
    ];

    const ink = construction
      ? "#a0a99a"
      : lane < 29 || lane > 68
        ? "#242722"
        : "#a64b3c";
    marks.push(
      trace(points, ink, 1.1, construction && lane % 15 !== 0 ? 0.18 : 0.93),
    );
  }

  return marks.join("");
}

export function createPrint(
  source: PrintSource,
  variation = 0,
  construction = false,
) {
  const seed = (projectSeed(source) + variation) >>> 0;
  const random = seededRandom(seed);
  const channels = source.stack.split(",").length;
  const draw = { current: drawCurrent, voice: drawVoice, routes: drawRoutes }[
    source.kind
  ];
  const marks = draw(random, channels, construction);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 720" width="600" height="720"><rect width="600" height="720" fill="#faf9f2"/><g stroke-linejoin="round" stroke-linecap="round">${marks}</g></svg>`;
}
