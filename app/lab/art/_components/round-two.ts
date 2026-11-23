export const roundTwo = {
  "tidal-glass": {
    title: "Tidal glass",
    medium: "Liquid / light",
    description: "Pull pools of color through a sheet of liquid glass.",
    instruction: "Move to bend the glass. Press to turn the tide.",
    action: "Turn the tide",
    parameter: "Refraction",
    detail:
      "Cobalt, apricot, and electric mint fold into luminous mineral bands. A moving lens pulls the surface toward your hand.",
    color: "#071d47",
  },
  "paper-sun": {
    title: "Paper sun",
    medium: "Paper / sculpture",
    description: "Unfold a flower made from hundreds of colored pleats.",
    instruction: "Move to tilt the petals. Press to open the flower.",
    action: "Open the flower",
    parameter: "Bloom",
    detail:
      "A dense, off-center rosette casts blue shadows across a pale sheet. Coral folds open around a small, dark heart.",
    color: "#e7ecfb",
  },
  "name-knot": {
    title: "Name knot",
    medium: "Type / sculpture",
    description: "Turn a name through a continuous woven sculpture.",
    instruction: "Move to tilt the weave. Press to turn the sculpture.",
    action: "Turn the sculpture",
    parameter: "Volume",
    detail:
      "Kento Iizuka’s name wraps a continuous three-dimensional knot. Oversized letters disappear into blue and vermilion folds, then return on the other side.",
    color: "#efc7b5",
  },
  "prism-garden": {
    title: "Prism garden",
    medium: "Space / play",
    description: "Send a wave through a miniature terraced world.",
    instruction: "Move to lift the terraces. Press to send a wave.",
    action: "Send a wave",
    parameter: "Elevation",
    detail:
      "A floating island of porcelain columns, cobalt wells, and orange towers rises from a blue ground. Each wave travels through the whole island.",
    color: "#1649cb",
  },
} as const;

export type RoundTwoName = keyof typeof roundTwo;

export function isRoundTwoName(value: string): value is RoundTwoName {
  return Object.hasOwn(roundTwo, value);
}
