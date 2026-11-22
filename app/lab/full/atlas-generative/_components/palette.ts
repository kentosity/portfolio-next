import type { CSSProperties } from "react";

export const palette = {
  blue: "#1649cb",
  paper: "#f1f4ff",
  ink: "#12378c",
  lavender: "#d3defb",
  peach: "#efc7b5",
  sage: "#e7ecdb",
  cyan: "#c3e4ef",
  rule: "#8eaaf0",
};

export const paletteVariables = Object.fromEntries(
  Object.entries(palette).map(([name, value]) => [`--${name}`, value]),
) as CSSProperties;
