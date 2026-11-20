type GlyphKind = "arrow" | "align" | "shuffle" | "connection" | "wave" | "cross" | "play" | "weave" | "flower";

const paths: Record<GlyphKind, string> = {
  arrow: "M5 19 19 5M5 5h14v14",
  align: "M3 12h14m-5-5 5 5-5 5M21 4v16",
  shuffle: "M3 7h3c5 0 7 10 12 10h3m-4-4 4 4-4 4M3 17h3c5 0 7-10 12-10h3m-4-4 4 4-4 4",
  connection: "M3 3v14h17m-5-5 5 5-5 5",
  wave: "M2 9c4-8 6 8 10 0s6 8 10 0M2 16c4-8 6 8 10 0s6 8 10 0",
  cross: "M12 3v18M3 12h18",
  play: "M8 5v14l12-7Z",
  weave: "M3 3c18 0 0 18 18 18M3 21C21 21 3 3 21 3M3 12h18",
  flower: "M12 1v22M1 12h22M4 4l16 16M4 20 20 4",
};

export default function Glyph({ kind }: { kind: GlyphKind }) {
  return <svg viewBox="0 0 24 24" width="1em" height="1em" fill={kind === "play" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false"><path d={paths[kind]} /></svg>;
}
