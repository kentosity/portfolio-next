"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
} from "react";
import { palette } from "../../full/atlas-generative/_components/palette";
import {
  artSize,
  clamp,
  coordinate,
  createCurrents,
  createFragments,
  createGraph,
  disturb,
  familyColours,
  isOnBranch,
  linePath,
  mix,
  mixPoint,
  smooth,
  type Point,
} from "./geometry";
import { studies, type StudyName } from "./studies";
import styles from "./art.module.css";

const branchNames = ["Inputs", "Boundaries", "Interfaces", "Outcomes"];
const branchDescriptions = [
  "Inputs show where a system begins and what it needs.",
  "Boundaries give each part a clear responsibility.",
  "Interfaces show how those parts work together.",
  "Outcomes connect the structure to what people need.",
];

function subscribeToMotion(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function Fragments({
  seed,
  order,
  pointer,
}: {
  seed: number;
  order: number;
  pointer: Point | null;
}) {
  const fragments = useMemo(() => createFragments(seed), [seed]);
  return fragments.map((fragment, index) => {
    const progress = smooth(clamp(order - fragment.delay * (1 - order)));
    const position = disturb(
      mixPoint(fragment.start, fragment.end, progress),
      pointer,
      0.32,
    );
    const rotation = mix(fragment.rotation, fragment.endRotation, progress);
    return (
      <rect
        key={index}
        data-fragment={index}
        x={-fragment.width / 2}
        y={-fragment.height / 2}
        width={fragment.width}
        height={fragment.height}
        rx={fragment.family === 1 ? 5 : 1}
        fill={familyColours[fragment.family]}
        stroke={fragment.family === 3 ? palette.rule : "none"}
        strokeWidth="0.65"
        transform={`translate(${coordinate(position.x)} ${coordinate(position.y)}) rotate(${coordinate(rotation)})`}
      />
    );
  });
}

function Graph({
  seed,
  order,
  branch,
  onBranch,
}: {
  seed: number;
  order: number;
  branch: number | null;
  onBranch: (branch: number | null) => void;
}) {
  const nodes = useMemo(() => createGraph(seed), [seed]);
  const positions = nodes.map((node) =>
    mixPoint(node.start, node.end, smooth(order)),
  );
  return (
    <>
      {nodes
        .filter((node) => node.parent !== null)
        .map((node) => {
          const start = positions[node.parent!];
          const end = positions[node.id];
          const isActive = isOnBranch(node, branch);
          const midpoint = mix(start.x, end.x, 0.5);
          return (
            <g key={node.id} data-edge={node.id} opacity={isActive ? 1 : 0.12}>
              {Array.from({ length: 7 }, (_, strand) => {
                const offset = (strand - 3) * 2;
                const bend = (1 - order) * Math.sin(node.id * 2.4) * 170;
                return (
                  <path
                    key={strand}
                    d={`M${start.x},${start.y + offset} C${midpoint + bend},${start.y + offset} ${midpoint - bend},${end.y + offset} ${end.x},${end.y + offset}`}
                    stroke={
                      node.branch === 1 || node.branch === 3
                        ? palette.ink
                        : palette.blue
                    }
                    strokeWidth="0.8"
                    fill="none"
                  />
                );
              })}
            </g>
          );
        })}
      {nodes.map((node) => (
        <g
          key={node.id}
          data-node={node.id}
          opacity={isOnBranch(node, branch) ? 1 : 0.25}
          onPointerEnter={() => {
            if (node.branch >= 0) onBranch(node.branch);
          }}
        >
          <circle
            cx={positions[node.id].x}
            cy={positions[node.id].y}
            r={node.id === 0 ? 18 : 10}
            fill={node.branch % 2 === 0 ? palette.paper : palette.peach}
            stroke={palette.blue}
            strokeWidth="1.6"
          />
          <circle
            cx={positions[node.id].x}
            cy={positions[node.id].y}
            r="2.5"
            fill={palette.blue}
          />
        </g>
      ))}
    </>
  );
}

function Currents({
  seed,
  order,
  pointer,
}: {
  seed: number;
  order: number;
  pointer: Point | null;
}) {
  const currents = useMemo(() => createCurrents(seed), [seed]);
  return currents.map((current, index) => {
    const points = current.points.map((point) =>
      disturb(mixPoint(point.start, point.end, smooth(order)), pointer, 0.28),
    );
    const colour =
      current.family === 1
        ? palette.ink
        : current.family === 2
          ? palette.blue
          : palette.rule;
    return (
      <path
        key={index}
        data-current={index}
        d={linePath(points)}
        stroke={colour}
        strokeWidth={index % 24 === 0 ? 2 : 0.95}
        fill="none"
        opacity="0.9"
      />
    );
  });
}

export function ArtStudy({ name }: { name: StudyName }) {
  const study = studies[name];
  const [seed, setSeed] = useState(2718);
  const [order, setOrder] = useState(name === "untangled" ? 0.4 : 0.18);
  const [pointer, setPointer] = useState<Point | null>(null);
  const [branch, setBranch] = useState<number | null>(null);
  const [followsScroll, setFollowsScroll] = useState(name === "sorting-room");
  const [isAnimating, setIsAnimating] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const currentOrderRef = useRef(order);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );

  function updateOrder(value: number) {
    currentOrderRef.current = value;
    setOrder(value);
  }

  function stopAnimation() {
    if (animationRef.current !== null)
      cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
    setIsAnimating(false);
  }

  function animateOrder(target: number) {
    stopAnimation();
    setFollowsScroll(false);
    setPointer(null);
    if (reducedMotion) {
      updateOrder(target);
      return;
    }

    const startOrder = currentOrderRef.current;
    const startTime = performance.now();
    setIsAnimating(true);
    function advance(now: number) {
      const progress = clamp((now - startTime) / 1400);
      const easedProgress = 1 - (1 - progress) ** 3;
      updateOrder(mix(startOrder, target, easedProgress));
      if (progress < 1) animationRef.current = requestAnimationFrame(advance);
      else {
        animationRef.current = null;
        setIsAnimating(false);
      }
    }
    animationRef.current = requestAnimationFrame(advance);
  }

  useEffect(() => {
    if (!followsScroll || reducedMotion) return;
    function followScroll() {
      const progress = clamp(window.scrollY / (window.innerHeight * 0.65));
      const updatedOrder = 0.18 + progress * 0.82;
      currentOrderRef.current = updatedOrder;
      setOrder(updatedOrder);
    }
    window.addEventListener("scroll", followScroll, { passive: true });
    return () => window.removeEventListener("scroll", followScroll);
  }, [followsScroll, reducedMotion]);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    function pauseMotion() {
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      if (pointerFrameRef.current !== null)
        cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = null;
      setPointer(null);
      setIsAnimating(false);
    }
    function pauseWhenHidden() {
      if (document.hidden) pauseMotion();
    }
    function pauseWhenMotionChanges() {
      if (motionPreference.matches) pauseMotion();
    }
    document.addEventListener("visibilitychange", pauseWhenHidden);
    motionPreference.addEventListener("change", pauseWhenMotionChanges);
    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      motionPreference.removeEventListener("change", pauseWhenMotionChanges);
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
      if (pointerFrameRef.current !== null)
        cancelAnimationFrame(pointerFrameRef.current);
    };
  }, []);

  function movePointer(event: PointerEvent<SVGSVGElement>) {
    if (reducedMotion || event.pointerType === "touch" || name === "untangled")
      return;
    const matrix = event.currentTarget.getScreenCTM();
    if (!matrix) return;
    const position = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      matrix.inverse(),
    );
    if (pointerFrameRef.current !== null)
      cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = requestAnimationFrame(() => {
      setPointer({ x: position.x, y: position.y });
      pointerFrameRef.current = null;
    });
  }

  function clearPointer() {
    if (pointerFrameRef.current !== null)
      cancelAnimationFrame(pointerFrameRef.current);
    pointerFrameRef.current = null;
    setPointer(null);
  }

  function downloadArt() {
    if (!svgRef.current) return;
    const artwork = svgRef.current.cloneNode(true) as SVGSVGElement;
    artwork.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    artwork.removeAttribute("class");
    const blob = new Blob([new XMLSerializer().serializeToString(artwork)], {
      type: "image/svg+xml",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}-${seed}.svg`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <>
      <section className={styles.intro}>
        <h1>{study.title}</h1>
        <div>
          <h2>{study.heading}</h2>
          <p>{study.description}</p>
        </div>
      </section>
      <figure className={styles.figure}>
        <div className={styles.sheet}>
          <svg
            ref={svgRef}
            className={styles.artwork}
            viewBox={`0 0 ${artSize.width} ${artSize.height}`}
            width="1000"
            height="660"
            role="img"
            aria-labelledby="art-title art-description"
            data-order={order.toFixed(3)}
            data-seed={seed}
            onPointerMove={movePointer}
            onPointerLeave={clearPointer}
          >
            <title id="art-title">{`${study.title}, arrangement ${seed}`}</title>
            <desc id="art-description">
              {study.change} {Math.round(order * 100)} percent{" "}
              {study.control.toLowerCase()}.
            </desc>
            <rect width="1000" height="660" fill={palette.paper} />
            {name === "finding-flow" && (
              <circle
                cx="505"
                cy="330"
                r="158"
                fill={palette.peach}
                opacity="0.62"
              />
            )}
            {name === "sorting-room" && (
              <Fragments
                seed={seed}
                order={order}
                pointer={reducedMotion ? null : pointer}
              />
            )}
            {name === "untangled" && (
              <Graph
                seed={seed}
                order={order}
                branch={branch}
                onBranch={setBranch}
              />
            )}
            {name === "finding-flow" && (
              <Currents
                seed={seed}
                order={order}
                pointer={reducedMotion ? null : pointer}
              />
            )}
          </svg>
          <span className={styles.signature}>
            Kento Iizuka <span>{study.title}</span>
          </span>
        </div>
        <figcaption>{study.caption}</figcaption>
      </figure>
      <section className={styles.controls} aria-label="Artwork controls">
        <label className={styles.rangeLabel} htmlFor="art-order">
          {study.control}
          <output htmlFor="art-order">{Math.round(order * 100)}%</output>
          <input
            id="art-order"
            type="range"
            min="0"
            max="100"
            value={Math.round(order * 100)}
            onChange={(event) => {
              stopAnimation();
              setFollowsScroll(false);
              updateOrder(Number(event.target.value) / 100);
            }}
          />
        </label>
        <div className={styles.actions}>
          <button
            className={styles.primary}
            onClick={() => animateOrder(order > 0.95 ? 0 : 1)}
          >
            {order > 0.95 ? study.reset : study.action}
          </button>
          {isAnimating && <button onClick={stopAnimation}>Pause</button>}
          <button
            onClick={() => {
              stopAnimation();
              clearPointer();
              setSeed((value) => value + 1);
            }}
          >
            New arrangement
          </button>
          <button onClick={downloadArt}>Save SVG</button>
        </div>
        <div className={styles.preferences}>
          <span>Arrangement {seed}</span>
          {name === "sorting-room" && (
            <label>
              <input
                type="checkbox"
                checked={followsScroll}
                disabled={reducedMotion}
                onChange={(event) => {
                  stopAnimation();
                  setFollowsScroll(event.target.checked);
                }}
              />{" "}
              Scroll gathers pieces
            </label>
          )}
          {reducedMotion && (
            <span>
              Reduced motion is on. Controls update the artwork directly.
            </span>
          )}
        </div>
      </section>
      {name === "untangled" && (
        <section className={styles.branches} aria-label="Follow a branch">
          <div className={styles.branchButtons}>
            <button
              aria-pressed={branch === null}
              onClick={() => setBranch(null)}
            >
              Whole system
            </button>
            {branchNames.map((label, index) => (
              <button
                key={label}
                aria-pressed={branch === index}
                onClick={() => setBranch(index)}
              >
                {label}
              </button>
            ))}
          </div>
          <p aria-live="polite">
            {branch === null
              ? "Choose a branch to see its connections through the system."
              : branchDescriptions[branch]}
          </p>
        </section>
      )}
      <section className={styles.notes}>
        <div>
          <h2>What changes</h2>
          <p>{study.change}</p>
        </div>
        <div>
          <h2>Where it belongs</h2>
          <p>{study.placement}</p>
        </div>
      </section>
      <nav className={styles.otherStudies} aria-label="More art studies">
        {Object.entries(studies)
          .filter(([slug]) => slug !== name)
          .map(([slug, other]) => (
            <Link key={slug} href={`/lab/art/${slug}`}>
              <span>Explore</span>
              {other.title}
            </Link>
          ))}
      </nav>
    </>
  );
}
