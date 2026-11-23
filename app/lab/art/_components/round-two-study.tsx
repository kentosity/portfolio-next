"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { roundTwo, type RoundTwoName } from "./round-two";
import { createGlass } from "./renderers/glass";
import { createPaper } from "./renderers/paper";
import { createType } from "./renderers/type";
import { createGarden } from "./renderers/garden";
import type { Frame, Renderer } from "./renderers/shared";
import styles from "./round-two.module.css";

function subscribeToMotion(onChange: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function RoundTwoStudy({ name }: { name: RoundTwoName }) {
  const study = roundTwo[name];
  const [seed, setSeed] = useState(7193);
  const [intensity, setIntensity] = useState(0.55);
  const [paused, setPaused] = useState(false);
  const [variation, setVariation] = useState(0);
  const [ready, setReady] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    prefersReducedMotion,
    () => true,
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const invalidateRef = useRef<() => void>(() => {});
  const settingsRef = useRef({ intensity, paused, reducedMotion, variation });
  const targetPointerRef = useRef<[number, number]>([0.5, 0.5]);

  useEffect(() => {
    settingsRef.current = { intensity, paused, reducedMotion, variation };
    invalidateRef.current();
  }, [intensity, paused, reducedMotion, variation]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const stage = stageRef.current!;
    let renderer: Renderer | null = null;
    let frameId: number | null = null;
    let previousTime = 0;
    let inView = true;
    let running = true;
    let hasDrawn = false;
    let lastVariation = settingsRef.current.variation;
    const frame: Frame = {
      time: 0,
      pointer: [0.5, 0.5],
      intensity: 0.55,
      pulse: 100,
      variation: lastVariation,
    };

    function schedule() {
      if (running && frameId === null) frameId = requestAnimationFrame(draw);
    }

    function draw(now: number) {
      frameId = null;
      if (!running || !renderer) return;
      const settings = settingsRef.current;
      const isMoving =
        !settings.paused &&
        !settings.reducedMotion &&
        !document.hidden &&
        inView;
      const delta =
        previousTime && isMoving
          ? Math.min((now - previousTime) / 1000, 0.05)
          : 0;
      previousTime = isMoving ? now : 0;
      frame.time += delta;
      frame.pulse += delta;
      frame.intensity = settings.intensity;
      frame.variation = settings.variation;
      if (lastVariation !== settings.variation) {
        frame.pulse = settings.reducedMotion ? 0.7 : 0;
        lastVariation = settings.variation;
      }
      const target = settings.reducedMotion
        ? [0.5, 0.5]
        : targetPointerRef.current;
      if (isMoving || settings.reducedMotion) {
        frame.pointer[0] +=
          (target[0] - frame.pointer[0]) * (settings.reducedMotion ? 1 : 0.075);
        frame.pointer[1] +=
          (target[1] - frame.pointer[1]) * (settings.reducedMotion ? 1 : 0.075);
      }
      renderer.draw(frame);
      if (!hasDrawn) {
        hasDrawn = true;
        setReady(true);
      }
      canvas.dataset.time = frame.time.toFixed(4);
      canvas.dataset.variation = String(frame.variation);
      canvas.dataset.frames = String(Number(canvas.dataset.frames ?? 0) + 1);
      if (isMoving) schedule();
    }

    function resize() {
      if (!renderer) return;
      const bounds = stage.getBoundingClientRect();
      const mobile = bounds.width < 600;
      const ratioLimit = name === "prism-garden" ? (mobile ? 1.25 : 1.5) : 1;
      const ratio = Math.min(window.devicePixelRatio || 1, ratioLimit);
      renderer.resize(bounds.width, bounds.height, ratio);
      schedule();
    }

    function stopForContextLoss(event: Event) {
      event.preventDefault();
      running = false;
      if (frameId !== null) cancelAnimationFrame(frameId);
      setReady(false);
    }

    try {
      renderer =
        name === "tidal-glass"
          ? createGlass(canvas, seed)
          : name === "paper-sun"
            ? createPaper(canvas, seed)
            : name === "name-knot"
              ? createType(canvas, seed)
              : createGarden(canvas, seed);
    } catch {
      renderer?.dispose();
      renderer = null;
    }

    canvas.addEventListener("webglcontextlost", stopForContextLoss);
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      previousTime = 0;
      if (inView) schedule();
    });
    resizeObserver.observe(stage);
    visibilityObserver.observe(stage);
    document.addEventListener("visibilitychange", schedule);
    invalidateRef.current = schedule;
    resize();
    if (!renderer) setReady(false);

    return () => {
      running = false;
      if (frameId !== null) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      canvas.removeEventListener("webglcontextlost", stopForContextLoss);
      renderer?.dispose();
      invalidateRef.current = () => {};
    };
  }, [name, seed]);

  function shiftArtwork() {
    setVariation((value) => value + 1);
  }

  function savePrint() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}-${seed}.png`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  }

  return (
    <article className={styles.study}>
      <div className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>{study.medium}</p>
          <h1>{study.title}</h1>
        </div>
        <p className={styles.description}>{study.description}</p>
      </div>
      <nav className={styles.tabs} aria-label="Round two sketches">
        {Object.entries(roundTwo).map(([slug, item]) => (
          <Link
            href={`/lab/art/${slug}`}
            key={slug}
            aria-current={slug === name ? "page" : undefined}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <figure className={styles.figure}>
        <div
          ref={stageRef}
          className={styles.stage}
          style={{
            backgroundColor: study.color,
            backgroundImage: `url(/art2/${name}.png)`,
          }}
        >
          <canvas
            key={seed}
            ref={canvasRef}
            className={styles.canvas}
            style={{ opacity: ready ? 1 : 0 }}
            role="img"
            aria-label={`${study.title}. ${study.detail}`}
            aria-describedby="art-instruction"
            data-seed={seed}
            data-ready={ready}
            onPointerMove={(event) => {
              if (event.pointerType === "touch") return;
              const bounds = event.currentTarget.getBoundingClientRect();
              targetPointerRef.current = [
                (event.clientX - bounds.left) / bounds.width,
                (event.clientY - bounds.top) / bounds.height,
              ];
            }}
            onPointerLeave={() => {
              targetPointerRef.current = [0.5, 0.5];
            }}
            onClick={shiftArtwork}
          >
            {study.detail}
          </canvas>
          <noscript>
            <p className={styles.staticNotice}>
              A still print of {study.title}.
            </p>
          </noscript>
        </div>
        <figcaption className={styles.caption}>
          <span id="art-instruction">{study.instruction}</span>
          <span>Seed {seed}</span>
        </figcaption>
      </figure>
      <div className={styles.controls}>
        <label className={styles.parameter}>
          {study.parameter}
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(intensity * 100)}
            onChange={(event) => setIntensity(Number(event.target.value) / 100)}
            disabled={!ready}
          />
        </label>
        <button
          className={styles.primary}
          onClick={shiftArtwork}
          disabled={!ready}
        >
          {study.action}
        </button>
        <button
          onClick={() => setPaused((value) => !value)}
          disabled={!ready || reducedMotion}
        >
          {paused ? "Play" : "Pause"}
        </button>
        <button
          onClick={() => {
            setReady(false);
            setSeed((value) => value + 977);
          }}
        >
          New seed
        </button>
        {ready ? (
          <button onClick={savePrint}>Save print</button>
        ) : (
          <a href={`/art2/${name}.png`} download={`${name}.png`}>
            Save print
          </a>
        )}
      </div>
      <div className={styles.notes}>
        <p>{study.detail}</p>
        <span aria-live="polite">
          {reducedMotion
            ? "Reduced motion · still frame"
            : paused
              ? "Motion paused"
              : "Move, press, explore"}
        </span>
      </div>
      <p className={styles.earlier}>
        <Link href="/lab/art/sorting-room">Earlier studies</Link>
      </p>
    </article>
  );
}
