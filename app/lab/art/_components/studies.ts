export const studies = {
  "sorting-room": {
    title: "Sorting room",
    heading: "A place for every piece.",
    description:
      "Scroll to gather the fragments. Move across the sheet to disturb them.",
    action: "Gather pieces",
    reset: "Scatter pieces",
    control: "Order",
    caption: "216 fragments find their place in four families.",
    change:
      "Scattered fragments gather into nested ribbons. Each piece keeps its colour and finds a place beside its family.",
    placement:
      "A homepage opening that turns into the project collection as you scroll.",
  },
  untangled: {
    title: "Untangled",
    heading: "Make relationships clear.",
    description:
      "Untangle the connections. Choose a branch to follow its path.",
    action: "Untangle",
    reset: "Tangle again",
    control: "Clarity",
    caption: "31 nodes keep the same 30 connections as the structure opens.",
    change:
      "A knot opens into a branching structure. Every connection stays intact, so the change comes from understanding the relationships.",
    placement:
      "A case-study opening that introduces a complex system and the decisions that gave it structure.",
  },
  "finding-flow": {
    title: "Finding flow",
    heading: "Give complexity a direction.",
    description:
      "Guide the currents into a shared rhythm. Move across the sheet to bend them.",
    action: "Find the flow",
    reset: "Release the flow",
    control: "Direction",
    caption:
      "96 continuous strands move between turbulence and a common direction.",
    change:
      "Individual currents form a flowing bundle. A small disturbance bends nearby strands while their shared direction holds.",
    placement:
      "A quiet homepage artwork or a transition from a problem statement to its solution.",
  },
} as const;

export type StudyName = keyof typeof studies;

export function isStudyName(value: string): value is StudyName {
  return Object.hasOwn(studies, value);
}
